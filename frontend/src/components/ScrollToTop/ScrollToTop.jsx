import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = ({ animate = false }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (animate) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, animate]);

  return null;
};

export default ScrollToTop;
