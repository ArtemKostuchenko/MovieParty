import { useCallback, useEffect, useRef } from "react";
import freeice from "freeice";
import useStateCallback from "./useStateCallback";
import useSocket from "./useSocket";

const useWebRTC = () => {
  const { socket } = useSocket();
  const [roomClients, setRoomClients] = useStateCallback([]);
  const peerConnections = useRef({});
  const stream = useRef(null);
  const peerAudioReferences = useRef({
    ["user_local_audio"]: null,
  });

  const addNewRoomClient = useCallback(
    (newClient, cb) => {
      setRoomClients((roomClients) => {
        if (!roomClients.includes(newClient)) {
          return [...roomClients, newClient];
        }
        return roomClients;
      }, cb);
    },
    [roomClients, setRoomClients]
  );

  const requestAudio = async () => {
    stream.current = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    stream.current.getTracks().forEach((track) => (track.enabled = false));

    addNewRoomClient("user_local_audio", () => {
      const userLocalAudio = peerAudioReferences.current["user_local_audio"];

      if (userLocalAudio) {
        userLocalAudio.volume = 0;
        userLocalAudio.srcObject = stream.current;
      }
    });
  };

  const provideAudioRef = useCallback((roomClientId, instanceRef) => {
    peerAudioReferences.current[roomClientId] = instanceRef;
  }, []);

  const handleWebRTCPeer = async ({ peerId, createOffer }) => {
    if (peerId in peerConnections.current) return;

    peerConnections.current[peerId] = new RTCPeerConnection({
      iceServers: freeice(),
    });

    peerConnections.current[peerId].onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("web_rtc_relay_ice", {
          peerId,
          iceCandidate: event.candidate,
        });
      }
    };

    peerConnections.current[peerId].ontrack = ({ streams: [remoteStream] }) => {
      addNewRoomClient(peerId, () => {
        peerAudioReferences.volume = 0;
        peerAudioReferences.current[peerId].srcObject = remoteStream;
      });
    };

    stream.current.getTracks().forEach((track) => {
      peerConnections.current[peerId].addTrack(track, stream.current);
    });

    if (createOffer) {
      const createdOffer = await peerConnections.current[peerId].createOffer();

      await peerConnections.current[peerId].setLocalDescription(createdOffer);

      socket.emit("web_rtc_relay_sdp", {
        peerId,
        sessionDescription: createdOffer,
      });
    }
  };

  const handleWebRTCUnPeer = async ({ peerId }) => {
    if (peerId in peerConnections.current) {
      peerConnections.current[peerId].close();
    }

    delete peerConnections.current[peerId];
    delete peerAudioReferences.current[peerId];
    setRoomClients((roomClients) =>
      roomClients.filter((roomClientId) => roomClientId !== peerId)
    );
  };

  const handleWebRTCSessionDescription = async ({
    peerId,
    sessionDescription,
  }) => {
    await peerConnections.current[peerId].setRemoteDescription(
      new RTCSessionDescription(sessionDescription)
    );

    if (sessionDescription.type === "offer") {
      const answer = await peerConnections.current[peerId].createAnswer();

      await peerConnections.current[peerId].setLocalDescription(answer);

      socket.emit("web_rtc_relay_sdp", {
        peerId,
        sessionDescription: answer,
      });
    }
  };

  const handleWebRTCIceCandidate = async ({ peerId, iceCandidate }) => {
    peerConnections.current[peerId].addIceCandidate(
      new RTCIceCandidate(iceCandidate)
    );
  };

  const unMuteMicrophone = async () => {
    if (stream.current) {
      stream.current.getTracks().forEach((track) => (track.enabled = true));
    }
  };

  const muteMicrophone = async () => {
    if (stream.current) {
      stream.current.getTracks().forEach((track) => (track.enabled = false));
    }
  };

  useEffect(() => {
    socket.on("web_rtc_peer", handleWebRTCPeer);
    socket.on("web_rtc_un_peer", handleWebRTCUnPeer);
    socket.on("web_rtc_session_description", handleWebRTCSessionDescription);
    socket.on("web_rtc_ice_candidate", handleWebRTCIceCandidate);
  }, [socket]);

  useEffect(() => {
    requestAudio();
    return () => {
      if (stream.current) {
        stream.current.getTracks().forEach((track) => track.stop());
        socket.emit("web_rtc_leave");
      }
    };
  }, []);

  return { roomClients, provideAudioRef, muteMicrophone, unMuteMicrophone };
};

export default useWebRTC;
