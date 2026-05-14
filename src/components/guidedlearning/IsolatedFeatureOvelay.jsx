import { motion, AnimatePresence } from "motion/react";
import { useAtomValue, useSetAtom } from "jotai";
import {
  viewAtom,
  parasiteAtom,
  stageAtom,
  focusedFeatureIndexAtom,
  focusedMarkerIdAtom,
  hoveredMarkerAtom,
  infoSectionAtom,
} from "../../store/store";
import { PARASITE_DATA, getAvailableStages } from "../ParasiteConfig";
import { INFO_SECTIONS, getFeatureContent } from "../../store/FeatureContent";

const SectionBlock = ({ block }) => {
  if (block.type === "lead") {
    return <p className="isolated-lead">{block.content}</p>;
  }

  if (block.type === "bullets") {
    return (
      <div className="isolated-content-card">
        {block.title && (
          <div className="isolated-card-title">{block.title}</div>
        )}
        <ul className="isolated-bullet-list">
          {block.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
};

export const IsolatedFeatureOverlay = () => {
  const view = useAtomValue(viewAtom);
  const parasiteId = useAtomValue(parasiteAtom);
  const stage = useAtomValue(stageAtom);
  const focusedFeatureIndex = useAtomValue(focusedFeatureIndexAtom);
  const activeSection = useAtomValue(infoSectionAtom);

  const setView = useSetAtom(viewAtom);
  const setFocusedMarkerId = useSetAtom(focusedMarkerIdAtom);
  const setHoveredMarker = useSetAtom(hoveredMarkerAtom);
  const setInfoSection = useSetAtom(infoSectionAtom);

  const parasiteData = PARASITE_DATA[parasiteId];
  const availableStages = getAvailableStages(parasiteId);
  const safeStage = availableStages.includes(stage)
    ? stage
    : availableStages[0];
  const stageData = parasiteData?.[safeStage];

  const features = stageData?.features ?? [];
  const markers = stageData?.markers ?? [];

  if (view !== "ISOLATED" || !features.length) return null;

  const currentIndex = Math.max(
    0,
    Math.min(focusedFeatureIndex, features.length - 1),
  );

  const markerId = markers[currentIndex]?.id ?? null;
  const featureLabel = features[currentIndex] ?? "Diagnostic Feature";

  const content = getFeatureContent({
    parasiteId,
    stage: safeStage,
    markerId,
    fallbackTitle: featureLabel,
  });

  const currentSectionIndex = Math.max(
    0,
    INFO_SECTIONS.findIndex((section) => section.id === activeSection),
  );

  const prevSectionIndex =
    (currentSectionIndex - 1 + INFO_SECTIONS.length) % INFO_SECTIONS.length;
  const nextSectionIndex = (currentSectionIndex + 1) % INFO_SECTIONS.length;

  const prevSection = INFO_SECTIONS[prevSectionIndex];
  const nextSection = INFO_SECTIONS[nextSectionIndex];
  const currentSection =
    content.sections?.[activeSection] ?? content.sections.overview;

  const goBack = () => {
    setHoveredMarker(null);
    setInfoSection("overview");
    setView("FOCUS");
  };

  const goToSection = (sectionId) => {
    setInfoSection(sectionId);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="isolated-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <button
          type="button"
          className="isolated-back-button"
          onClick={goBack}
          aria-label="Back"
        >
          ‹
        </button>

        <div className="isolated-top-tabs desktop-tabs">
          {INFO_SECTIONS.map((section) => (
            <button
              key={section.id}
              type="button"
              className={`isolated-tab ${activeSection === section.id ? "active" : ""}`}
              onClick={() => goToSection(section.id)}
            >
              {section.label}
            </button>
          ))}
        </div>

        <motion.div
          key={`${markerId}-${activeSection}`}
          className="isolated-info-panel"
          initial={{ x: -24, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -24, opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="isolated-panel-scroll">
            <div className="isolated-panel-shell">
              <div className="isolated-header-card">
                <h1 className="isolated-title">{content.title}</h1>
                <div className="isolated-subtitle">{content.subtitle}</div>
              </div>

              <div className="isolated-divider" />

              <div className="isolated-section">
                <h2 className="isolated-section-heading">
                  {currentSection.heading}
                </h2>

                <div className="isolated-section-content">
                  {currentSection.blocks.map((block, index) => (
                    <SectionBlock key={index} block={block} />
                  ))}
                </div>
              </div>

              <div className="isolated-bottom-nav">
                <button
                  type="button"
                  className="isolated-next-prev prev"
                  onClick={() => goToSection(prevSection.id)}
                >
                  <span className="isolated-next-prev-small">PREVIOUS</span>
                  <span className="isolated-next-prev-title">
                    {prevSection.label}
                  </span>
                  <span className="isolated-next-prev-arrow">‹</span>
                </button>

                <button
                  type="button"
                  className="isolated-next-prev next"
                  onClick={() => goToSection(nextSection.id)}
                >
                  <span className="isolated-next-prev-small">NEXT</span>
                  <span className="isolated-next-prev-title">
                    {nextSection.label}
                  </span>
                  <span className="isolated-next-prev-arrow">›</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="isolated-mobile-tabs">
          {INFO_SECTIONS.map((section) => (
            <button
              key={section.id}
              type="button"
              className={`isolated-mobile-tab ${activeSection === section.id ? "active" : ""}`}
              onClick={() => goToSection(section.id)}
            >
              {section.label}
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
