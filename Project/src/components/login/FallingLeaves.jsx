import React, { useEffect } from "react";
import leaf from "../../assets/img/backgrounds/leaf.png";

const FallingLeaves = () => {
  useEffect(() => {
    const createLeaf = () => {
      const leafEl = document.createElement("img");
      leafEl.src = leaf;
      leafEl.className = "falling-leaf";
      leafEl.style.left = Math.random() * window.innerWidth + "px";
      leafEl.style.animationDuration = 5 + Math.random() * 5 + "s";
      document.body.appendChild(leafEl);

      setTimeout(() => {
        leafEl.remove();
      }, 10000);
    };

    const interval = setInterval(createLeaf, 300);
    return () => clearInterval(interval);
  }, []);

  return null;
};

export default FallingLeaves;
