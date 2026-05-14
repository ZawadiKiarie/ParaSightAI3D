// src/components/threeDView/hooks/useThreeDViewState.js

import { useEffect, useMemo, useState } from "react";

import { PARASITE_DATA, getAvailableStages } from "../../ParasiteConfig";

import {
  DEFAULT_3D_VIEW_RESULT,
  MODEL_ZOOM_LIMITS,
  TRANSPARENCY_LIMITS,
} from "../config/threeDViewConstants";

import {
  buildInitialThreeDViewState,
  buildThreeDDetectionData,
  getOuterFeatureId,
  resolveStage,
} from "../config/threeDViewMapper";

import { useThreeDGuidedAtoms } from "./useThreeDGuidedAtoms";

/**
 * Main state hook for the standalone 3D View page.
 *
 * This hook controls:
 * - selected parasite
 * - selected life stage
 * - model zoom
 * - transparency
 * - cross section mode
 * - highlight mode
 * - quick focus / feature isolation
 * - AI result mapping
 *
 * This keeps pages/3DView.jsx small and presentation-friendly.
 */
export function useThreeDViewState({
  parasiteName = DEFAULT_3D_VIEW_RESULT.parasiteName,
  initialStage = DEFAULT_3D_VIEW_RESULT.stage,
  aiResult = null,
} = {}) {
  const initialState = useMemo(() => {
    return buildInitialThreeDViewState({
      parasiteName,
      initialStage,
      aiResult,
    });
  }, [parasiteName, initialStage, aiResult]);

  const [selectedParasiteId, setSelectedParasiteId] = useState(
    initialState.parasiteId,
  );

  const [lifeStage, setLifeStage] = useState(initialState.stage);

  const [showInternalStructures, setShowInternalStructures] = useState(true);
  const [transparency, setTransparency] = useState([
    TRANSPARENCY_LIMITS.defaultValue,
  ]);
  const [crossSection, setCrossSection] = useState(false);
  const [highlightMode, setHighlightMode] = useState(false);
  const [activeFocus, setActiveFocus] = useState(null);
  const [modelZoom, setModelZoom] = useState(MODEL_ZOOM_LIMITS.defaultValue);

  const {
    syncParasiteStage,
    clearFeatureFocus,
    isolateFeature,
    useResetOnUnmount,
  } = useThreeDGuidedAtoms();

  useResetOnUnmount();

  const availableStages = useMemo(() => {
    return getAvailableStages(selectedParasiteId);
  }, [selectedParasiteId]);

  const stageData = PARASITE_DATA[selectedParasiteId]?.[lifeStage];
  const parasiteData = PARASITE_DATA[selectedParasiteId];

  const markers = stageData?.markers || [];

  const detectionData = useMemo(() => {
    return buildThreeDDetectionData({
      parasiteId: selectedParasiteId,
      stage: lifeStage,
      aiResult,
    });
  }, [selectedParasiteId, lifeStage, aiResult]);

  const microscopeImage =
    detectionData.microscopeImage || DEFAULT_3D_VIEW_RESULT.microscopeImage;

  /**
   * If the selected parasite changes and the current stage does not exist
   * for that parasite, choose the first available valid stage.
   */
  useEffect(() => {
    const resolvedStage = resolveStage(selectedParasiteId, lifeStage);

    if (resolvedStage && resolvedStage !== lifeStage) {
      setLifeStage(resolvedStage);
      setActiveFocus(null);
      clearFeatureFocus();
    }
  }, [selectedParasiteId, lifeStage, clearFeatureFocus]);

  /**
   * Keep the global guided-learning atom system synced with the displayed
   * parasite and stage.
   */
  useEffect(() => {
    syncParasiteStage({
      parasiteId: selectedParasiteId,
      stage: lifeStage,
    });

    if (!activeFocus) {
      clearFeatureFocus();
    }
  }, [
    selectedParasiteId,
    lifeStage,
    activeFocus,
    syncParasiteStage,
    clearFeatureFocus,
  ]);

  /**
   * User changes parasite from the testing dropdown.
   * Later, this same idea will happen automatically from AI result data.
   */
  const handleParasiteChange = (nextParasiteId) => {
    setSelectedParasiteId(nextParasiteId);
    setActiveFocus(null);
    setShowInternalStructures(true);
    clearFeatureFocus();
  };

  /**
   * User changes available life stage.
   */
  const handleStageChange = (nextStage) => {
    setLifeStage(nextStage);
    setActiveFocus(null);
    setShowInternalStructures(true);
    clearFeatureFocus();
  };

  /**
   * User clicks a quick-focus diagnostic feature.
   *
   * Clicking the same feature again clears focus.
   */
  const handleQuickFocus = (markerId) => {
    const nextMarkerId = activeFocus === markerId ? null : markerId;

    setActiveFocus(nextMarkerId);

    if (!nextMarkerId) {
      clearFeatureFocus();
      return;
    }

    const markerIndex = markers.findIndex((marker) => marker.id === markerId);

    isolateFeature({
      markerId: nextMarkerId,
      markerIndex,
      highlight: true,
    });
  };

  /**
   * Show Internal Structures toggle.
   *
   * When turned off, it tries to isolate an outer/body/wall/cytoplasm marker.
   * This gives the user a simple way to hide internal structures.
   */
  const handleToggleInternalStructures = () => {
    const nextValue = !showInternalStructures;

    setShowInternalStructures(nextValue);

    if (nextValue) {
      setActiveFocus(null);
      clearFeatureFocus();
      return;
    }

    const outerFeatureId = getOuterFeatureId(markers);

    if (!outerFeatureId) return;

    const markerIndex = markers.findIndex(
      (marker) => marker.id === outerFeatureId,
    );

    setActiveFocus(outerFeatureId);

    isolateFeature({
      markerId: outerFeatureId,
      markerIndex,
      highlight: false,
    });
  };

  /**
   * Highlight mode currently controls whether the selected feature is also
   * treated as hovered/highlighted by the parasite component.
   */
  const handleToggleHighlightMode = () => {
    const nextValue = !highlightMode;

    setHighlightMode(nextValue);

    if (activeFocus) {
      isolateFeature({
        markerId: activeFocus,
        markerIndex: markers.findIndex((marker) => marker.id === activeFocus),
        highlight: nextValue,
      });
    }
  };

  return {
    /**
     * Main selected result/model state
     */
    selectedParasiteId,
    setSelectedParasiteId,
    lifeStage,
    setLifeStage,
    availableStages,
    stageData,
    parasiteData,
    markers,

    /**
     * Detection summary data
     */
    detectionData,
    microscopeImage,

    /**
     * UI control state
     */
    showInternalStructures,
    transparency,
    crossSection,
    highlightMode,
    activeFocus,
    modelZoom,

    /**
     * UI setters
     */
    setTransparency,
    setCrossSection,
    setHighlightMode,
    setActiveFocus,
    setModelZoom,

    /**
     * Handlers
     */
    handleParasiteChange,
    handleStageChange,
    handleQuickFocus,
    handleToggleInternalStructures,
    handleToggleHighlightMode,

    /**
     * Constants useful for UI controls
     */
    zoomLimits: MODEL_ZOOM_LIMITS,
    transparencyLimits: TRANSPARENCY_LIMITS,
  };
}
