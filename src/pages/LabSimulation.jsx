// src/pages/LabSimulation.jsx

import { Canvas } from "@react-three/fiber";

import { LoadingScreen } from "../components/lab/LoadingScreen";
import { LabExperience } from "../components/lab/LabExperience";

import { useLabWorkflow } from "../components/lab/hooks/useLabWorkflow";

import { Joystick } from "../components/lab/ui/Joystick";
import { WelcomeLabModal } from "../components/lab/ui/WelcomeLabModal";
import { StationModal } from "../components/lab/ui/StationModal";
import { SamplePrepPanel } from "../components/lab/ui/SamplePrepPanel";
import { MicroscopeOverlay } from "../components/lab/ui/MicroscopeOverlay";
import { AIAnalysisPanel } from "../components/lab/ui/AIAnalysisPanel";
import { ChamberInfoPanel } from "../components/lab/ui/ChamberInfoPanel";
import { ChamberControlsPanel } from "../components/lab/ui/ChamberControlsPanel";
import { LearningPanel } from "../components/lab/ui/LearningPanel";
import { LabCompletionPopup } from "../components/lab/ui/LabCompletionPopup";

/**
 * LabSimulation is the main page for the immersive 3D lab.
 *
 * It connects:
 * - the 3D Canvas
 * - the lab workflow hook
 * - all UI overlays
 * - the joystick controls
 *
 * The actual workflow state is handled inside useLabWorkflow.
 */
export const LabSimulation = ({
  testParasiteName = "Giardia lamblia",
  testStage = "cyst",
  testConfidence = 92,
  testMicroscopeImage = "/textures/microscope/giardia-cyst.png",
  aiResult = null,
}) => {
  const lab = useLabWorkflow({
    testParasiteName,
    testStage,
    testConfidence,
    testMicroscopeImage,
    aiResult,
  });

  return (
    <>
      <LoadingScreen />

      <div className="experience relative w-screen h-screen overflow-hidden">
        <Canvas className="experience-canvas">
          <LabExperience
            key={lab.labRunKey}
            moveInput={lab.moveInputRef}
            lookInput={lab.lookInputRef}
            onPlayerMovedEnough={lab.handlePlayerMovedEnough}
            onStationClick={lab.handleStationClick}
            samplePrepStep={lab.samplePrepStep}
            samplePrepCameraActive={lab.samplePrepPanelOpen}
            samplePrepCompleted={lab.samplePrepCompleted}
            onStartSamplePrep={lab.handleStartSamplePrep}
            onAddSample={lab.handleAddSample}
            onApplyStain={lab.handleApplyStain}
            microscopeActive={lab.microscopeActive}
            microscopeCompleted={lab.microscopeCompleted}
            onOpenMicroscope={lab.handleOpenMicroscope}
            aiStep={lab.aiStep}
            aiProgress={lab.aiProgress}
            aiResultSaved={lab.aiResultSaved}
            showMappedModel={lab.showMappedModel}
            aiDetectionResult={lab.aiDetectionResult}
            onRunAIDetection={lab.handleRunAIDetection}
            onViewIn3D={lab.handleViewIn3D}
            onSaveResult={lab.handleSaveResult}
            aiPanelOpen={lab.aiPanelOpen}
            aiCompleted={lab.aiCompleted}
            onOpenAIAnalysis={lab.handleOpenAIAnalysis}
            chamberInfoPanelOpen={lab.chamberInfoPanelOpen}
            chamberControlsPanelOpen={lab.chamberControlsPanelOpen}
            selectedFeatureId={lab.selectedFeatureId}
            modelRotationY={lab.modelRotationY}
            modelZoom={lab.modelZoom}
            onOpenChamberInfo={lab.handleOpenChamberInfo}
            onOpenChamberControls={lab.handleOpenChamberControls}
            learningPanelOpen={lab.learningPanelOpen}
            learningCompleted={lab.learningCompleted}
            onOpenLearningPanel={lab.handleOpenLearningPanel}
          />
        </Canvas>

        {lab.showWelcomeModal && (
          <WelcomeLabModal onClose={lab.closeWelcomeModal} />
        )}

        {lab.activeStation && (
          <StationModal
            station={lab.activeStation}
            onClose={lab.closeStationModal}
          />
        )}

        {lab.samplePrepPanelOpen && (
          <SamplePrepPanel
            samplePrepStep={lab.samplePrepStep}
            onPlaceCoverSlip={lab.handlePlaceCoverSlip}
            onGoToMicroscope={lab.handleGoToMicroscope}
          />
        )}

        {lab.microscopeActive && (
          <MicroscopeOverlay
            focus={lab.microscopeFocus}
            setFocus={lab.setMicroscopeFocus}
            zoom={lab.microscopeZoom}
            setZoom={lab.setMicroscopeZoom}
            brightness={lab.microscopeBrightness}
            setBrightness={lab.setMicroscopeBrightness}
            microscopeStep={lab.microscopeStep}
            microscopeImage={lab.aiDetectionResult.microscopeImage}
            onScan={lab.handleScanSlide}
            onCapture={lab.handleCaptureImage}
            onSendToAI={lab.handleSendToAI}
          />
        )}

        {lab.aiPanelOpen && (
          <AIAnalysisPanel
            aiStep={lab.aiStep}
            aiProgress={lab.aiProgress}
            aiResultSaved={lab.aiResultSaved}
            aiDetectionResult={lab.aiDetectionResult}
            onRunAIDetection={lab.handleRunAIDetection}
            onViewIn3D={lab.handleViewIn3D}
            onSaveResult={lab.handleSaveResult}
            onClose={lab.handleCloseAIAnalysis}
            onGoTo3DChamber={lab.handleGoTo3DChamber}
          />
        )}

        {lab.chamberInfoPanelOpen && (
          <ChamberInfoPanel
            aiDetectionResult={lab.aiDetectionResult}
            features={lab.mappedFeatures}
            onClose={lab.handleCloseChamberInfo}
          />
        )}

        {lab.chamberControlsPanelOpen && (
          <ChamberControlsPanel
            markers={lab.mappedMarkers}
            selectedFeatureId={lab.selectedFeatureId}
            onSelectFeature={lab.handleSelectChamberFeature}
            onClearFeature={lab.handleClearChamberFeature}
            modelRotationY={lab.modelRotationY}
            setModelRotationY={lab.setModelRotationY}
            modelZoom={lab.modelZoom}
            setModelZoom={lab.setModelZoom}
            onClose={lab.handleCloseChamberControls}
          />
        )}

        {lab.learningPanelOpen && (
          <LearningPanel
            activeLearningTab={lab.activeLearningTab}
            setActiveLearningTab={lab.setActiveLearningTab}
            learningContent={lab.learningContent}
            onFinish={lab.handleFinishLearningSession}
            onClose={lab.handleCloseLearningPanel}
          />
        )}

        {lab.showCompletionPopup && (
          <LabCompletionPopup
            onRestart={lab.resetLabState}
            onDashboard={lab.handleReturnToDashboard}
          />
        )}

        {lab.shouldShowJoysticks && (
          <>
            <Joystick
              side="left"
              onChange={(value) => {
                lab.moveInputRef.current = value;
              }}
            />

            <Joystick
              side="right"
              onChange={(value) => {
                lab.lookInputRef.current = value;
              }}
            />
          </>
        )}
      </div>
    </>
  );
};
