// LabExperience.jsx
import { Environment } from "@react-three/drei";
import { Model8 } from "./LabModel8";
import { memo } from "react";

export const LabExperience = memo(
  ({
    moveInput,
    lookInput,
    onPlayerMovedEnough,
    onStationClick,

    samplePrepStep,
    samplePrepCameraActive,
    samplePrepCompleted,
    onStartSamplePrep,
    onAddSample,
    onApplyStain,
  }) => {
    return (
      <>
        <Environment preset="city" />

        <Model8
          position={[-35, -5, -5]}
          scale={3}
          moveInput={moveInput}
          lookInput={lookInput}
          onPlayerMovedEnough={onPlayerMovedEnough}
          onStationClick={onStationClick}
          samplePrepStep={samplePrepStep}
          samplePrepCameraActive={samplePrepCameraActive}
          samplePrepCompleted={samplePrepCompleted}
          onStartSamplePrep={onStartSamplePrep}
          onAddSample={onAddSample}
          onApplyStain={onApplyStain}
        />
      </>
    );
  },
);
