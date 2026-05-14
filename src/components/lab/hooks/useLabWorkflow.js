// src/components/lab/hooks/useLabWorkflow.js

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { STATION_CONTENT } from "../config/labStations";
import { buildLabDetectionResult } from "../config/labResultMapper";
import { DEFAULT_LAB_RESULT } from "../config/labConstants";
import { useLabGuidedAtoms } from "./useLabGuidedAtoms";

/**
 * Builds dynamic learning panel content from the current AI result.
 *
 * This makes the learning station depend on the detected parasite instead of
 * hardcoded text.
 */
export const buildLearningContent = (result) => ({
  overview: {
    label: "Overview",
    title: `${result.parasiteName} Learning Summary`,
    body: [
      `This station summarizes the completed diagnostic workflow for ${result.parasiteName}.`,
      `The system prepared a sample, captured a microscopy image, analyzed it using AI, and mapped the result to the ${result.stage} 3D model.`,
      "The goal is to help users connect practical laboratory workflow with AI-assisted interpretation and interactive 3D learning.",
    ],
  },

  diagnosticFeatures: {
    label: "Diagnostic Features",
    title: `Key Features of ${result.parasiteName}`,
    body: result.features.length
      ? result.features.map((feature) => `• ${feature}`)
      : [
          "No diagnostic feature list has been configured for this parasite stage yet.",
        ],
  },

  lifecycle: {
    label: "Lifecycle",
    title: "Parasite Lifecycle Context",
    body: [
      `${result.parasiteName} is currently being shown in the ${result.stage} stage.`,
      "Lifecycle interpretation helps users understand why a specific parasite form may appear in a microscopy sample.",
      "This section can later be expanded with parasite-specific lifecycle diagrams and stage transitions.",
    ],
  },

  comparison: {
    label: "Comparison",
    title: "Comparison and Interpretation",
    body: [
      `The detected parasite is ${result.parasiteName}, with a confidence score of ${result.confidence}%.`,
      "Users should compare shape, internal structures, nuclei, cytoplasm, and other diagnostic features with similar parasites.",
      "The AI result supports interpretation, while the 3D model helps the user understand why the parasite class may have been suggested.",
    ],
  },
});

/**
 * Main lab workflow hook.
 *
 * This hook stores all the state and handlers for the lab simulation:
 * - welcome modal
 * - station information modals
 * - sample preparation
 * - microscope workflow
 * - AI analysis workflow
 * - 3D chamber workflow
 * - learning panel
 * - full lab restart
 *
 * LabSimulation.jsx can then focus mostly on rendering the Canvas and UI panels.
 */
export function useLabWorkflow({
  testParasiteName = DEFAULT_LAB_RESULT.parasiteName,
  testStage = DEFAULT_LAB_RESULT.stage,
  testConfidence = DEFAULT_LAB_RESULT.confidence,
  testMicroscopeImage = DEFAULT_LAB_RESULT.microscopeImage,
  aiResult = null,
} = {}) {
  const navigate = useNavigate();

  const moveInputRef = useRef({ x: 0, y: 0 });
  const lookInputRef = useRef({ x: 0, y: 0 });
  const aiTimerRef = useRef(null);

  const {
    isolateFeature,
    clearFeatureIsolation,
    syncParasiteResult,
    resetGuidedAtoms,
  } = useLabGuidedAtoms();

  /**
   * This is the single dynamic result object used by the whole lab.
   * Later, when the real AI model is connected, aiResult will replace test props.
   */
  const aiDetectionResult = useMemo(() => {
    return buildLabDetectionResult(
      aiResult || {
        parasiteName: testParasiteName,
        stage: testStage,
        confidence: testConfidence,
        microscopeImage: testMicroscopeImage,
        location: DEFAULT_LAB_RESULT.location,
      },
    );
  }, [
    aiResult,
    testParasiteName,
    testStage,
    testConfidence,
    testMicroscopeImage,
  ]);

  const mappedParasite = aiDetectionResult.stageData;
  const mappedFeatures = aiDetectionResult.features;
  const mappedMarkers = aiDetectionResult.markers;

  const learningContent = useMemo(() => {
    return buildLearningContent(aiDetectionResult);
  }, [aiDetectionResult]);

  const [labRunKey, setLabRunKey] = useState(0);

  // Intro and station information
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [hasShownWelcomeModal, setHasShownWelcomeModal] = useState(false);
  const [activeStation, setActiveStation] = useState(null);

  // Sample preparation workflow
  const [samplePrepStep, setSamplePrepStep] = useState("idle");
  const [samplePrepPanelOpen, setSamplePrepPanelOpen] = useState(false);
  const [samplePrepCompleted, setSamplePrepCompleted] = useState(false);

  // Microscope workflow
  const [microscopeActive, setMicroscopeActive] = useState(false);
  const [microscopeCompleted, setMicroscopeCompleted] = useState(false);
  const [microscopeStep, setMicroscopeStep] = useState("idle");

  const [microscopeFocus, setMicroscopeFocus] = useState(25);
  const [microscopeZoom, setMicroscopeZoom] = useState(35);
  const [microscopeBrightness, setMicroscopeBrightness] = useState(100);

  // AI analysis workflow
  const [aiStep, setAiStep] = useState("idle");
  const [aiProgress, setAiProgress] = useState(0);
  const [aiResultSaved, setAiResultSaved] = useState(false);
  const [showMappedModel, setShowMappedModel] = useState(false);
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [aiCompleted, setAiCompleted] = useState(false);

  // 3D chamber workflow
  const [chamberInfoPanelOpen, setChamberInfoPanelOpen] = useState(false);
  const [chamberControlsPanelOpen, setChamberControlsPanelOpen] =
    useState(false);
  const [selectedFeatureId, setSelectedFeatureId] = useState(null);
  const [modelRotationY, setModelRotationY] = useState(0);
  const [modelZoom, setModelZoom] = useState(1);

  // Learning panel workflow
  const [learningPanelOpen, setLearningPanelOpen] = useState(false);
  const [learningCompleted, setLearningCompleted] = useState(false);
  const [activeLearningTab, setActiveLearningTab] = useState("overview");
  const [showCompletionPopup, setShowCompletionPopup] = useState(false);

  /**
   * Clear AI interval when LabSimulation unmounts.
   */
  useEffect(() => {
    return () => {
      if (aiTimerRef.current) {
        clearInterval(aiTimerRef.current);
        aiTimerRef.current = null;
      }

      document.body.style.cursor = "default";
    };
  }, []);

  /**
   * Shows the welcome modal once the user has walked a little inside the lab.
   */
  const handlePlayerMovedEnough = useCallback(() => {
    setHasShownWelcomeModal((prev) => {
      if (prev) return prev;

      setShowWelcomeModal(true);
      return true;
    });
  }, []);

  const closeWelcomeModal = useCallback(() => {
    setShowWelcomeModal(false);
  }, []);

  /**
   * Opens the information modal for a clicked station bubble.
   */
  const handleStationClick = useCallback((stationKey) => {
    setActiveStation(STATION_CONTENT[stationKey] || null);
  }, []);

  const closeStationModal = useCallback(() => {
    setActiveStation(null);
  }, []);

  // -----------------------------
  // Sample prep handlers
  // -----------------------------

  const handleStartSamplePrep = useCallback(() => {
    if (samplePrepStep !== "idle") return;

    setSamplePrepStep("focused");
    setSamplePrepPanelOpen(true);
  }, [samplePrepStep]);

  const handleAddSample = useCallback(() => {
    if (samplePrepStep !== "focused") return;

    setSamplePrepStep("sampleAdded");
  }, [samplePrepStep]);

  const handleApplyStain = useCallback(() => {
    if (samplePrepStep !== "sampleAdded") return;

    setSamplePrepStep("stained");
  }, [samplePrepStep]);

  const handlePlaceCoverSlip = useCallback(() => {
    if (samplePrepStep !== "stained") return;

    setSamplePrepStep("covered");

    setTimeout(() => {
      setSamplePrepStep("ready");
    }, 900);
  }, [samplePrepStep]);

  const handleGoToMicroscope = useCallback(() => {
    setSamplePrepPanelOpen(false);
    setSamplePrepCompleted(true);
  }, []);

  // -----------------------------
  // Microscope handlers
  // -----------------------------

  const handleOpenMicroscope = useCallback(() => {
    if (!samplePrepCompleted || microscopeCompleted) return;

    setMicroscopeActive(true);
    setMicroscopeStep("viewing");
  }, [samplePrepCompleted, microscopeCompleted]);

  const handleScanSlide = useCallback(() => {
    if (microscopeFocus < 70) return;

    setMicroscopeStep("scanning");

    setTimeout(() => {
      setMicroscopeStep("detected");
    }, 1800);
  }, [microscopeFocus]);

  const handleCaptureImage = useCallback(() => {
    if (microscopeStep !== "detected") return;

    setMicroscopeStep("captured");
  }, [microscopeStep]);

  /**
   * Sends the captured microscope image to the AI station.
   * Also syncs the selected parasite/stage to the guided-learning atom system.
   */
  const handleSendToAI = useCallback(() => {
    setMicroscopeActive(false);
    setMicroscopeCompleted(true);
    setMicroscopeStep("sent");

    setAiStep("received");
    setAiProgress(0);
    setAiResultSaved(false);
    setShowMappedModel(false);
    setAiPanelOpen(false);
    setAiCompleted(false);

    setChamberInfoPanelOpen(false);
    setChamberControlsPanelOpen(false);
    setSelectedFeatureId(null);
    setModelRotationY(0);
    setModelZoom(1);

    setLearningPanelOpen(false);
    setLearningCompleted(false);
    setActiveLearningTab("overview");
    setShowCompletionPopup(false);

    syncParasiteResult({
      parasiteId: aiDetectionResult.parasiteId,
      stage: aiDetectionResult.stage,
    });
  }, [aiDetectionResult, syncParasiteResult]);

  // -----------------------------
  // AI analysis handlers
  // -----------------------------

  const handleOpenAIAnalysis = useCallback(() => {
    if (aiStep === "idle" || aiCompleted) return;

    setAiPanelOpen(true);
  }, [aiStep, aiCompleted]);

  const handleCloseAIAnalysis = useCallback(() => {
    setAiPanelOpen(false);
  }, []);

  const handleRunAIDetection = useCallback(() => {
    if (aiStep !== "received") return;

    if (aiTimerRef.current) {
      clearInterval(aiTimerRef.current);
    }

    setAiStep("analyzing");
    setAiProgress(0);

    let progress = 0;

    aiTimerRef.current = setInterval(() => {
      progress += 10;
      setAiProgress(Math.min(progress, 100));

      if (progress >= 100) {
        clearInterval(aiTimerRef.current);
        aiTimerRef.current = null;

        setTimeout(() => {
          setAiStep("result");
        }, 300);
      }
    }, 250);
  }, [aiStep]);

  const handleViewIn3D = useCallback(() => {
    if (aiStep !== "result" && aiStep !== "mapped") return;

    setAiStep("loading3d");
    setShowMappedModel(false);

    setTimeout(() => {
      setShowMappedModel(true);
      setAiStep("mapped");
    }, 1200);
  }, [aiStep]);

  const handleSaveResult = useCallback(() => {
    if (aiStep !== "result" && aiStep !== "mapped") return;

    setAiResultSaved(true);
  }, [aiStep]);

  const handleGoTo3DChamber = useCallback(() => {
    setAiPanelOpen(false);
    setAiCompleted(true);
  }, []);

  // -----------------------------
  // 3D chamber handlers
  // -----------------------------

  const handleOpenChamberInfo = useCallback(() => {
    if (!showMappedModel) return;

    setChamberInfoPanelOpen(true);
  }, [showMappedModel]);

  const handleCloseChamberInfo = useCallback(() => {
    setChamberInfoPanelOpen(false);
  }, []);

  const handleOpenChamberControls = useCallback(() => {
    if (!showMappedModel) return;

    setChamberControlsPanelOpen(true);
  }, [showMappedModel]);

  const handleCloseChamberControls = useCallback(() => {
    setChamberControlsPanelOpen(false);
  }, []);

  const handleSelectChamberFeature = useCallback(
    (markerId) => {
      const markerIndex = mappedMarkers.findIndex(
        (marker) => marker.id === markerId,
      );

      setSelectedFeatureId(markerId);

      isolateFeature({
        parasiteId: aiDetectionResult.parasiteId,
        stage: aiDetectionResult.stage,
        markerId,
        markerIndex,
      });
    },
    [mappedMarkers, aiDetectionResult, isolateFeature],
  );

  const handleClearChamberFeature = useCallback(() => {
    setSelectedFeatureId(null);
    clearFeatureIsolation();
  }, [clearFeatureIsolation]);

  // -----------------------------
  // Learning panel handlers
  // -----------------------------

  const handleOpenLearningPanel = useCallback(() => {
    setLearningPanelOpen(true);
    setActiveLearningTab("overview");
  }, []);

  const handleCloseLearningPanel = useCallback(() => {
    setLearningPanelOpen(false);
  }, []);

  const handleFinishLearningSession = useCallback(() => {
    setLearningPanelOpen(false);
    setLearningCompleted(true);
    setShowCompletionPopup(true);

    resetGuidedAtoms();
  }, [resetGuidedAtoms]);

  // -----------------------------
  // Full lab reset and navigation
  // -----------------------------

  const resetLabState = useCallback(() => {
    if (aiTimerRef.current) {
      clearInterval(aiTimerRef.current);
      aiTimerRef.current = null;
    }

    moveInputRef.current = { x: 0, y: 0 };
    lookInputRef.current = { x: 0, y: 0 };

    setShowWelcomeModal(false);
    setHasShownWelcomeModal(false);
    setActiveStation(null);

    setSamplePrepStep("idle");
    setSamplePrepPanelOpen(false);
    setSamplePrepCompleted(false);

    setMicroscopeActive(false);
    setMicroscopeCompleted(false);
    setMicroscopeStep("idle");
    setMicroscopeFocus(25);
    setMicroscopeZoom(35);
    setMicroscopeBrightness(100);

    setAiStep("idle");
    setAiProgress(0);
    setAiResultSaved(false);
    setShowMappedModel(false);
    setAiPanelOpen(false);
    setAiCompleted(false);

    setChamberInfoPanelOpen(false);
    setChamberControlsPanelOpen(false);
    setSelectedFeatureId(null);
    setModelRotationY(0);
    setModelZoom(1);

    setLearningPanelOpen(false);
    setLearningCompleted(false);
    setActiveLearningTab("overview");
    setShowCompletionPopup(false);

    setLabRunKey((key) => key + 1);

    resetGuidedAtoms();
  }, [resetGuidedAtoms]);

  const handleReturnToDashboard = useCallback(() => {
    document.body.style.cursor = "default";
    navigate("/dashboard");
  }, [navigate]);

  const shouldShowJoysticks =
    !samplePrepPanelOpen &&
    !microscopeActive &&
    !aiPanelOpen &&
    !chamberInfoPanelOpen &&
    !chamberControlsPanelOpen &&
    !learningPanelOpen &&
    !showCompletionPopup;

  return {
    /**
     * Refs
     */
    moveInputRef,
    lookInputRef,

    /**
     * Dynamic AI/lab result
     */
    aiDetectionResult,
    mappedParasite,
    mappedFeatures,
    mappedMarkers,
    learningContent,

    /**
     * General lab state
     */
    labRunKey,
    showWelcomeModal,
    hasShownWelcomeModal,
    activeStation,
    shouldShowJoysticks,

    /**
     * Sample prep state
     */
    samplePrepStep,
    samplePrepPanelOpen,
    samplePrepCompleted,

    /**
     * Microscope state
     */
    microscopeActive,
    microscopeCompleted,
    microscopeStep,
    microscopeFocus,
    microscopeZoom,
    microscopeBrightness,

    /**
     * AI state
     */
    aiStep,
    aiProgress,
    aiResultSaved,
    showMappedModel,
    aiPanelOpen,
    aiCompleted,

    /**
     * Chamber state
     */
    chamberInfoPanelOpen,
    chamberControlsPanelOpen,
    selectedFeatureId,
    modelRotationY,
    modelZoom,

    /**
     * Learning state
     */
    learningPanelOpen,
    learningCompleted,
    activeLearningTab,
    showCompletionPopup,

    /**
     * Setters needed directly by UI controls
     */
    setMicroscopeFocus,
    setMicroscopeZoom,
    setMicroscopeBrightness,
    setModelRotationY,
    setModelZoom,
    setActiveLearningTab,

    /**
     * Actions
     */
    closeWelcomeModal,
    handlePlayerMovedEnough,
    handleStationClick,
    closeStationModal,

    handleStartSamplePrep,
    handleAddSample,
    handleApplyStain,
    handlePlaceCoverSlip,
    handleGoToMicroscope,

    handleOpenMicroscope,
    handleScanSlide,
    handleCaptureImage,
    handleSendToAI,

    handleOpenAIAnalysis,
    handleCloseAIAnalysis,
    handleRunAIDetection,
    handleViewIn3D,
    handleSaveResult,
    handleGoTo3DChamber,

    handleOpenChamberInfo,
    handleCloseChamberInfo,
    handleOpenChamberControls,
    handleCloseChamberControls,
    handleSelectChamberFeature,
    handleClearChamberFeature,

    handleOpenLearningPanel,
    handleCloseLearningPanel,
    handleFinishLearningSession,

    resetLabState,
    handleReturnToDashboard,
  };
}
