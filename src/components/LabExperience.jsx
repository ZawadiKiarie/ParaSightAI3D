import { Environment, OrbitControls } from "@react-three/drei";
import { useControls } from "leva";
import { Avatar } from "./Avatar";
import { Model8 } from "./LabModel8";
import { useEffect, useRef } from "react";
import { useSetAtom } from "jotai";

export const LabExperience = ({ moveInput, lookInput }) => {
  const { rotation, position } = useControls({
    rotation: {
      x: 0.0,
      y: 0,
      z: 0.0,
    },
    position: {
      x: -35,
      y: -5,
      z: -5,
    },
  });

  return (
    <>
      <Environment preset="city" />
      <Model8
        position={[position.x, position.y, position.z]}
        rotation={[rotation.x, rotation.y, rotation.z]}
        scale={3}
        moveInput={moveInput}
        lookInput={lookInput}
      />
    </>
  );
};
