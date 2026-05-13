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

    microscopeActive,
    microscopeCompleted,
    onOpenMicroscope,

    aiStep,
    aiProgress,
    aiResultSaved,
    showMappedModel,
    aiDetectionResult,
    onRunAIDetection,
    onViewIn3D,
    onSaveResult,

    aiPanelOpen,
    aiCompleted,
    onOpenAIAnalysis,

    chamberInfoPanelOpen,
    chamberControlsPanelOpen,
    selectedFeatureId,
    modelRotationY,
    modelZoom,
    onOpenChamberInfo,
    onOpenChamberControls,

    learningPanelOpen,
    learningCompleted,
    onOpenLearningPanel,
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
          microscopeActive={microscopeActive}
          microscopeCompleted={microscopeCompleted}
          onOpenMicroscope={onOpenMicroscope}
          aiStep={aiStep}
          aiProgress={aiProgress}
          aiResultSaved={aiResultSaved}
          showMappedModel={showMappedModel}
          aiDetectionResult={aiDetectionResult}
          onRunAIDetection={onRunAIDetection}
          onViewIn3D={onViewIn3D}
          onSaveResult={onSaveResult}
          aiPanelOpen={aiPanelOpen}
          aiCompleted={aiCompleted}
          onOpenAIAnalysis={onOpenAIAnalysis}
          chamberInfoPanelOpen={chamberInfoPanelOpen}
          chamberControlsPanelOpen={chamberControlsPanelOpen}
          selectedFeatureId={selectedFeatureId}
          modelRotationY={modelRotationY}
          modelZoom={modelZoom}
          onOpenChamberInfo={onOpenChamberInfo}
          onOpenChamberControls={onOpenChamberControls}
          learningPanelOpen={learningPanelOpen}
          learningCompleted={learningCompleted}
          onOpenLearningPanel={onOpenLearningPanel}
        />
      </>
    );
  },
);
