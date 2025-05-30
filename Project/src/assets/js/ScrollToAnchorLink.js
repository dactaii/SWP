import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ScrollToAnchorLink = ({ to, anchorId, children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e) => {
    e.preventDefault();

    if (location.pathname === to) {
      
      const element = document.getElementById(anchorId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(to, { state: { scrollToId: anchorId } });
    }
  };

  return (
    <a href={`${to}#${anchorId}`} onClick={handleClick}>
      {children}
    </a>
  );
};

export default ScrollToAnchorLink;
