import React, { useCallback, useEffect, useState, useRef } from "react";

const useStateCallback = (initState) => {
  const [stateCallback, setStateCallback] = useState(initState);
  const callbackRef = useRef(null);

  const setState = useCallback((newState, cb) => {
    callbackRef.current = cb;
    setStateCallback((prev) => {
      if (typeof newState === "function") {
        return newState(prev);
      } else {
        return newState;
      }
    });
  });

  useEffect(() => {
    if (callbackRef.current) {
      callbackRef.current(stateCallback);
      callbackRef.current = null;
    }
  }, [stateCallback]);

  return [stateCallback, setState];
};

export default useStateCallback;
