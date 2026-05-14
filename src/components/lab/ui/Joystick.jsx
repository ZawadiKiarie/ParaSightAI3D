// src/components/lab/ui/Joystick.jsx

import { useState } from "react";

/**
 * Touch joystick used by the lab simulation.
 *
 * The left joystick controls character movement.
 * The right joystick controls camera look direction.
 */
export function Joystick({ side, onChange }) {
  const [active, setActive] = useState(false);
  const [stick, setStick] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    const radius = rect.width / 2;
    const maxStickDistance = 36;

    const dx = Math.max(-1, Math.min(1, x / radius));
    const dy = Math.max(-1, Math.min(1, -y / radius));

    setStick({
      x: dx * maxStickDistance,
      y: -dy * maxStickDistance,
    });

    onChange({ x: dx, y: dy });
  };

  const stop = () => {
    setActive(false);
    setStick({ x: 0, y: 0 });
    onChange({ x: 0, y: 0 });
  };

  return (
    <div
      onPointerDown={(e) => {
        setActive(true);
        e.currentTarget.setPointerCapture(e.pointerId);
        handleMove(e);
      }}
      onPointerMove={(e) => {
        if (active) handleMove(e);
      }}
      onPointerUp={stop}
      onPointerCancel={stop}
      className={`absolute bottom-10 ${
        side === "left" ? "left-10" : "right-10"
      } w-36 h-36 rounded-full bg-white/20 border border-white/30 backdrop-blur-md flex items-center justify-center z-20 touch-none`}
    >
      <div
        style={{
          transform: `translate(${stick.x}px, ${stick.y}px)`,
        }}
        className="w-16 h-16 rounded-full bg-white/40 border border-white/40"
      />
    </div>
  );
}
