import { useAtomValue, useSetAtom } from "jotai";
import {
  viewAtom,
  parasiteAtom,
  stageAtom,
  focusedFeatureIndexAtom,
  focusedMarkerIdAtom,
  hoveredMarkerAtom,
} from "../store/store";
import { PARASITE_DATA, getAvailableStages } from "./ParasiteConfig";
import { motion, AnimatePresence } from "motion/react";

export const FocusFeatureOverlay = () => {
  const view = useAtomValue(viewAtom);
  const currentParasite = useAtomValue(parasiteAtom);
  const stage = useAtomValue(stageAtom);
  const focusedFeatureIndex = useAtomValue(focusedFeatureIndexAtom);

  const setView = useSetAtom(viewAtom);
  const setFocusedFeatureIndex = useSetAtom(focusedFeatureIndexAtom);
  const setFocusedMarkerId = useSetAtom(focusedMarkerIdAtom);
  const setHoveredMarker = useSetAtom(hoveredMarkerAtom);

  const currentParasiteData = PARASITE_DATA[currentParasite];
  const availableStages = getAvailableStages(currentParasite);
  const safeStage = availableStages.includes(stage)
    ? stage
    : availableStages[0];
  const currentStageData = currentParasiteData?.[safeStage];

  const markers = currentStageData?.markers ?? [];
  const features = currentStageData?.features ?? [];

  if (view !== "FOCUS" || !features.length) return null;

  const currentIndex = Math.max(
    0,
    Math.min(focusedFeatureIndex, features.length - 1),
  );

  const currentLabel = features[currentIndex] ?? "";
  const nextIndex = (currentIndex + 1) % features.length;
  const prevIndex = (currentIndex - 1 + features.length) % features.length;
  const nextLabel = features[nextIndex] ?? "";
  const prevLabel = features[prevIndex] ?? "";

  const goToIndex = (index) => {
    setFocusedFeatureIndex(index);
    setFocusedMarkerId(markers[index]?.id ?? null);
    setHoveredMarker(null);
  };

  const leaveFocus = () => {
    setHoveredMarker(null);
    setFocusedMarkerId(null);
    setView("LIST");
  };

  return (
    <AnimatePresence>
      <motion.div
        className="focus-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <button
          type="button"
          className="focus-back-button"
          onClick={leaveFocus}
          aria-label="Go back"
        >
          ‹
        </button>

        <div className="focus-bottom-wrap">
          <div className="focus-bottom-bar">
            <div className="focus-bottom-left-pill">
              <span className="focus-bottom-icon">◉</span>
              <span className="focus-bottom-title">{currentLabel}</span>
            </div>

            <div className="focus-bottom-actions">
              <div className="focus-nav-group">
                <button
                  type="button"
                  className="focus-nav-btn prev"
                  onClick={() => goToIndex(prevIndex)}
                  aria-label={`Previous feature: ${prevLabel}`}
                >
                  <span className="focus-nav-symbol">‹</span>

                  <div className="focus-tooltip tooltip-left">
                    <span className="focus-tooltip-small">PREVIOUS</span>
                    <span className="focus-tooltip-title">{prevLabel}</span>
                  </div>
                </button>

                <button
                  type="button"
                  className="focus-nav-btn next active"
                  onClick={() => goToIndex(nextIndex)}
                  aria-label={`Next feature: ${nextLabel}`}
                >
                  <span className="focus-nav-symbol">›</span>

                  <div className="focus-tooltip tooltip-right">
                    <span className="focus-tooltip-small">NEXT</span>
                    <span className="focus-tooltip-title">{nextLabel}</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
