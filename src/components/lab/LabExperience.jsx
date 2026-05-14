// src/components/lab/LabExperience.jsx

import { Environment } from "@react-three/drei";
import { memo } from "react";
import { LabModel } from "./scene/LabModel";

/**
 * LabExperience is the 3D scene wrapper.
 *
 * It adds the environment lighting and renders the main lab model.
 * All workflow props are passed directly to LabModel.
 */
export const LabExperience = memo((props) => {
  return (
    <>
      <Environment preset="city" />

      <LabModel position={[-35, -5, -5]} scale={3} {...props} />
    </>
  );
});
