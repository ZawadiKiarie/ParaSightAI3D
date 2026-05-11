import React, { useState, useEffect, useRef } from "react";
import { Howl } from "howler";

export const SoundToggle = ({ audioUrl }) => {
  const [isMuted, setIsMuted] = useState(true);
  const soundRef = useRef(null);

  useEffect(() => {
    // Initialize Howl
    soundRef.current = new Howl({
      src: [audioUrl],
      loop: true,
      volume: 0.5,
      autoplay: false,
    });

    return () => {
      soundRef.current.unload();
    };
  }, [audioUrl]);

  const toggleSound = () => {
    if (isMuted) {
      soundRef.current.play();
    } else {
      soundRef.current.pause();
    }
    setIsMuted(!isMuted);
  };

  return (
    <div className="sound-toggle-wrapper" onClick={toggleSound}>
      {/* Visualizer Pill */}
      <div className={`visualizer-pill ${isMuted ? "muted" : "active"}`}>
        <div className="wave-container">
          {[...Array(9)].map((_, i) => (
            <span key={i} className="wave-bar"></span>
          ))}
        </div>
      </div>

      {/* Text Label Pill */}
      <div className="status-pill">
        <span className="status-text">SOUND {isMuted ? "OFF" : "ON"}</span>
      </div>
    </div>
  );
};
