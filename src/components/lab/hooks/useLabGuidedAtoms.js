// src/components/lab/hooks/useLabGuidedAtoms.js

import { useCallback } from "react";
import { useSetAtom } from "jotai";

import {
  viewAtom,
  focusedMarkerIdAtom,
  hoveredMarkerAtom,
  focusedFeatureIndexAtom,
  parasiteAtom,
  stageAtom,
  infoSectionAtom,
} from "../../../store/Store";

/**
 * This hook connects the lab simulation to the existing guided-learning system.
 *
 * Your parasite models already use these Jotai atoms to isolate features.
 * So instead of rebuilding feature isolation in the lab,
 * the lab simply updates the same atoms used by GuidedLearning.
 */
export function useLabGuidedAtoms() {
  const setView = useSetAtom(viewAtom);
  const setFocusedMarkerId = useSetAtom(focusedMarkerIdAtom);
  const setHoveredMarker = useSetAtom(hoveredMarkerAtom);
  const setFocusedFeatureIndex = useSetAtom(focusedFeatureIndexAtom);
  const setParasite = useSetAtom(parasiteAtom);
  const setStage = useSetAtom(stageAtom);
  const setInfoSection = useSetAtom(infoSectionAtom);

  /**
   * Activates isolated feature view for a selected parasite feature.
   *
   * Example:
   * User clicks "Nucleus" in the chamber controls panel
   * → selected marker ID is stored
   * → model switches to ISOLATED view
   * → only the relevant feature/structure is emphasized by the parasite component
   */
  const isolateFeature = useCallback(
    ({ parasiteId, stage, markerId, markerIndex = 0 }) => {
      setParasite(parasiteId);
      setStage(stage);

      setFocusedMarkerId(markerId);
      setHoveredMarker(markerId);
      setFocusedFeatureIndex(markerIndex >= 0 ? markerIndex : 0);
      setInfoSection("overview");
      setView("ISOLATED");
    },
    [
      setParasite,
      setStage,
      setFocusedMarkerId,
      setHoveredMarker,
      setFocusedFeatureIndex,
      setInfoSection,
      setView,
    ],
  );

  /**
   * Clears the currently isolated feature and returns the parasite model
   * to a normal visible state.
   */
  const clearFeatureIsolation = useCallback(() => {
    setFocusedMarkerId(null);
    setHoveredMarker(null);
    setFocusedFeatureIndex(0);
    setInfoSection("overview");

    // LIST keeps the model visible without the isolated view.
    setView("LIST");
  }, [
    setFocusedMarkerId,
    setHoveredMarker,
    setFocusedFeatureIndex,
    setInfoSection,
    setView,
  ]);

  /**
   * Syncs the active parasite and stage without isolating a feature.
   * Useful when the microscope sends an image to AI analysis.
   */
  const syncParasiteResult = useCallback(
    ({ parasiteId, stage }) => {
      setParasite(parasiteId);
      setStage(stage);

      setFocusedMarkerId(null);
      setHoveredMarker(null);
      setFocusedFeatureIndex(0);
      setInfoSection("overview");
      setView("LIST");
    },
    [
      setParasite,
      setStage,
      setFocusedMarkerId,
      setHoveredMarker,
      setFocusedFeatureIndex,
      setInfoSection,
      setView,
    ],
  );

  /**
   * Fully resets guided-learning atoms.
   * Use this when restarting or finishing the lab session.
   */
  const resetGuidedAtoms = useCallback(() => {
    setView("HOME");
    setFocusedMarkerId(null);
    setHoveredMarker(null);
    setFocusedFeatureIndex(0);
    setInfoSection("overview");
  }, [
    setView,
    setFocusedMarkerId,
    setHoveredMarker,
    setFocusedFeatureIndex,
    setInfoSection,
  ]);

  return {
    isolateFeature,
    clearFeatureIsolation,
    syncParasiteResult,
    resetGuidedAtoms,
  };
}
