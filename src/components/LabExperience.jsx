import { Environment, OrbitControls } from "@react-three/drei";
import { Model8 } from "./LabModel8";
import { useEffect, useRef } from "react";
import { useSetAtom } from "jotai";

export const LabExperience = ({ moveInput, lookInput }) => {
  return (
    <>
      <Environment preset="city" />
      <Model8
        position={[-35, -5, -5]}
        scale={3}
        moveInput={moveInput}
        lookInput={lookInput}
      />
    </>
  );
};
