import { useAtom, useSetAtom } from "jotai";
import { motion, AnimatePresence } from "motion/react";
import {
  viewAtom,
  parasiteAtom,
  stageAtom,
  hoveredMarkerAtom,
  focusedMarkerIdAtom,
  focusedFeatureIndexAtom,
} from "../../store/store";
import { PARASITE_DATA, getAvailableStages } from "../ParasiteConfig";
import { useEffect, useState } from "react";

export const ListOverlay = () => {
  const [view] = useAtom(viewAtom);
  const [currentParasite, setParasite] = useAtom(parasiteAtom);
  const [stage] = useAtom(stageAtom);

  const setHoveredMarker = useSetAtom(hoveredMarkerAtom);
  const setFocusedMarkerId = useSetAtom(focusedMarkerIdAtom);
  const setFocusedFeatureIndex = useSetAtom(focusedFeatureIndexAtom);
  const setView = useSetAtom(viewAtom);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  const currentParasiteData = PARASITE_DATA[currentParasite];
  const availableStages = getAvailableStages(currentParasite);
  const safeStage = availableStages.includes(stage)
    ? stage
    : availableStages[0];
  const currentStageData = currentParasiteData?.[safeStage];

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);

      if (!mobile) {
        setIsMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setHoveredMarker(null);
  }, [currentParasite, safeStage, setHoveredMarker]);

  if (view !== "LIST") return null;

  return (
    <div className="overlay-ui-container">
      {isMobile && (
        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <img
            src="/logo/ParaSightAI2.svg"
            className="header-icon"
            alt="menu"
          />
        </button>
      )}

      <AnimatePresence>
        {(!isMobile || isMobileMenuOpen) && (
          <motion.div
            initial={
              isMobile
                ? { x: -100, opacity: 0 }
                : { x: -40, opacity: 0, y: "-50%" }
            }
            animate={
              isMobile ? { x: 0, opacity: 1 } : { x: 0, opacity: 1, y: "-50%" }
            }
            exit={
              isMobile
                ? { x: -100, opacity: 0 }
                : { x: -40, opacity: 0, y: "-50%" }
            }
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="modal-side left"
          >
            <div className="modal-header centered">
              <span>EXPLORE SPECIES</span>
            </div>

            <div className="list-container">
              {Object.keys(PARASITE_DATA).map((id) => (
                <button
                  type="button"
                  key={id}
                  className={`list-item ${currentParasite === id ? "active" : ""}`}
                  onClick={() => {
                    setHoveredMarker(null);
                    setFocusedMarkerId(null);
                    setFocusedFeatureIndex(0);
                    setParasite(id);
                    if (isMobile) setIsMobileMenuOpen(false);
                  }}
                >
                  <div className="list-item-left">
                    <span className="item-number">{PARASITE_DATA[id].id}</span>
                    <span className="item-label">{PARASITE_DATA[id].name}</span>
                  </div>

                  <span className="item-arrow">›</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isMobile && (
        <motion.div
          initial={{ x: 40, opacity: 0, y: "-50%" }}
          animate={{ x: 0, opacity: 1, y: "-50%" }}
          exit={{ x: 40, opacity: 0, y: "-50%" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="modal-side right"
          onMouseLeave={() => setHoveredMarker(null)}
        >
          <div className="modal-header centered">
            <span>DIAGNOSTIC FEATURES</span>
          </div>

          <div className="list-container">
            {currentStageData?.features.map((feature, i) => {
              const linkedMarkerId = currentStageData?.markers?.[i]?.id ?? null;

              return (
                <button
                  type="button"
                  key={`${safeStage}-${i}-${feature}`}
                  className="list-item"
                  onClick={() => {
                    if (!linkedMarkerId) return;
                    setFocusedMarkerId(linkedMarkerId);
                    setFocusedFeatureIndex(i);
                    setView("FOCUS");
                  }}
                  onMouseEnter={() => {
                    if (linkedMarkerId) {
                      setHoveredMarker(linkedMarkerId);
                    }
                  }}
                  onMouseLeave={() => setHoveredMarker(null)}
                >
                  <div className="list-item-left">
                    <div className="feature-bullet" />
                    <span className="feature-text">{feature}</span>
                  </div>

                  <span className="item-arrow">›</span>
                </button>
              );
            })}
          </div>
        </motion.div>
      )}

      {isMobile && (
        <div className="mobile-bottom-info">
          <div className="current-selection-label">
            <h2>{PARASITE_DATA[currentParasite].name}</h2>
            <p>{safeStage.toUpperCase()} STAGE</p>
          </div>
          <div className="marker-hint">Tap markers for details</div>
        </div>
      )}
    </div>
  );
};
