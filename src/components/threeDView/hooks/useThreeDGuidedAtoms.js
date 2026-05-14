// src/components/threeDView/hooks/useThreeDGuidedAtoms.js

import { useCallback, useEffect } from "react";
import { useSetAtom } from "jotai";

import {
  parasiteAtom,
  stageAtom,
  viewAtom,
  hoveredMarkerAtom,
  focusedMarkerIdAtom,
  focusedFeatureIndexAtom,
  infoSectionAtom,
} from "../../../store/Store";

/**
 * This hook connects the standalone 3D View page to the same
 * guided-learning isolation system used by the GuidedLearning module.
 *
 * Your parasite mesh components already listen to these atoms:
 * - parasiteAtom
 * - stageAtom
 * - viewAtom
 * - focusedMarkerIdAtom
 * - hoveredMarkerAtom
 * - focusedFeatureIndexAtom
 *
 * So the 3D View page only needs to update these atoms to isolate features.
 */
export function useThreeDGuidedAtoms() {
  const setParasiteAtom = useSetAtom(parasiteAtom);
  const setStageAtom = useSetAtom(stageAtom);
  const setView = useSetAtom(viewAtom);
  const setHoveredMarker = useSetAtom(hoveredMarkerAtom);
  const setFocusedMarkerId = useSetAtom(focusedMarkerIdAtom);
  const setFocusedFeatureIndex = useSetAtom(focusedFeatureIndexAtom);
  const setInfoSection = useSetAtom(infoSectionAtom);

  /**
   * Syncs the currently selected parasite and life stage with
   * the global guided-learning state.
   *
   * This keeps the real parasite model components aware of which
   * parasite/stage is currently being displayed.
   */
  const syncParasiteStage = useCallback(
    ({ parasiteId, stage }) => {
      setParasiteAtom(parasiteId);
      setStageAtom(stage);
    },
    [setParasiteAtom, setStageAtom],
  );

  /**
   * Sets the model to normal/full-view mode.
   *
   * LIST is used because it keeps the model visible while making sure
   * no specific feature is isolated.
   */
  const clearFeatureFocus = useCallback(() => {
    setFocusedMarkerId(null);
    setHoveredMarker(null);
    setFocusedFeatureIndex(0);
    setInfoSection("overview");
    setView("LIST");
  }, [
    setFocusedMarkerId,
    setHoveredMarker,
    setFocusedFeatureIndex,
    setInfoSection,
    setView,
  ]);

  /**
   * Isolates a selected feature.
   *
   * Example:
   * User clicks "Nucleus"
   * -> focusedMarkerId becomes "nucleus"
   * -> view becomes "ISOLATED"
   * -> the parasite component shows the matching feature logic
   */
  const isolateFeature = useCallback(
    ({ markerId, markerIndex = 0, highlight = true }) => {
      setFocusedMarkerId(markerId);
      setHoveredMarker(highlight ? markerId : null);
      setFocusedFeatureIndex(markerIndex >= 0 ? markerIndex : 0);
      setInfoSection("overview");
      setView("ISOLATED");
    },
    [
      setFocusedMarkerId,
      setHoveredMarker,
      setFocusedFeatureIndex,
      setInfoSection,
      setView,
    ],
  );

  /**
   * Resets all guided-learning atoms when leaving the 3D View page.
   */
  const resetGuidedAtoms = useCallback(() => {
    setFocusedMarkerId(null);
    setHoveredMarker(null);
    setFocusedFeatureIndex(0);
    setInfoSection("overview");
    setView("HOME");
  }, [
    setFocusedMarkerId,
    setHoveredMarker,
    setFocusedFeatureIndex,
    setInfoSection,
    setView,
  ]);

  /**
   * Optional helper:
   * automatically reset atom state when the page/component unmounts.
   */
  const useResetOnUnmount = () => {
    useEffect(() => {
      return () => {
        resetGuidedAtoms();
      };
    }, [resetGuidedAtoms]);
  };

  return {
    syncParasiteStage,
    clearFeatureFocus,
    isolateFeature,
    resetGuidedAtoms,
    useResetOnUnmount,
  };
}
