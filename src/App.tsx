import React, { useRef, useState } from "react";

import "./App.css";

function App() {
  const [angleX, setAngleX] = useState(0);
  const [angleY, setAngleY] = useState(0);
  const animationFrameRef = useRef<number | null>(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [hideLightEffect, setHideLightEffect] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cardRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - cardRect.left;
    const y = e.clientY - cardRect.top;
    const newAngleX = (y - 225) / 7;
    const newAngleY = -(x - 150) / 7;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(() => {
      setAngleX(newAngleX);
      setAngleY(newAngleY);
    });

    setMouseX(x);
    setMouseY(y);
    setHideLightEffect(false);
  };

  const handleMouseLeave = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    setAngleX(0);
    setAngleY(0);
    console.log("mouse leave", angleX, angleY);
    setHideLightEffect(true);
  };

  return (
    <div
      className="card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="card__content"
        style={{ transform: `rotateX(${angleX}deg) rotateY(${angleY}deg)` }}
      >
        <img src="image.png" />
      </div>
      {hideLightEffect ? null : (
        <div
          className="light-effect"
          style={{
            left: `${mouseX - 80}px`,
            top: `${mouseY - 80}px`,
          }}
        ></div>
      )}
    </div>
  );
}

export default App;
