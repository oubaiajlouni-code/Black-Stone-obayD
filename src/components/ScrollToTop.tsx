import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scroll to top on route change */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Force instant scroll to avoid smooth scroll behavior delay
    });
  }, [pathname]);
  return null;
};

export default ScrollToTop;
