import { useEffect, useRef } from "react";

const useFill = () => {
  const appContainer = useRef(null);

  useEffect(() => {
    appContainer.current = document.querySelector(".app");
    appContainer.current.style.height = "100%";

    return () => {
      disableFill();
    };
  }, []);

  const enableFill = () => {
    if (appContainer.current) {
      appContainer.current.style.height = "100%";
    }
  };

  const disableFill = () => {
    if (appContainer.current) {
      appContainer.current.style.height = "auto";
    }
  };

  return { enableFill, disableFill };
};

export default useFill;
