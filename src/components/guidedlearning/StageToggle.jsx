import { useEffect } from "react";
import { useAtom } from "jotai";
import { parasiteAtom, stageAtom } from "../../store/store";
import {
  PARASITE_DATA,
  getAvailableStages,
  STAGE_LABELS,
} from "../ParasiteConfig";
import { motion } from "motion/react";

export const StageToggle = () => {
  const [currentParasite] = useAtom(parasiteAtom);
  const [stage, setStage] = useAtom(stageAtom);

  const availableStages = getAvailableStages(currentParasite);
  const activeIndex = availableStages.indexOf(stage);

  useEffect(() => {
    if (!availableStages.length) return;

    if (!availableStages.includes(stage)) {
      setStage(availableStages[0]);
    }
  }, [currentParasite, stage, setStage, availableStages]);

  if (!PARASITE_DATA[currentParasite] || availableStages.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="stage-toggle-container"
    >
      <div
        className={`stage-toggle-pill ${availableStages.length === 1 ? "single" : ""}`}
        style={{
          "--toggle-count": availableStages.length,
          "--active-index": activeIndex,
        }}
      >
        <div className="stage-toggle-indicator" />

        {availableStages.map((stageKey) => (
          <button
            key={stageKey}
            type="button"
            className={`stage-toggle-button ${stage === stageKey ? "active" : ""}`}
            onClick={() => setStage(stageKey)}
          >
            {STAGE_LABELS[stageKey]}
          </button>
        ))}
      </div>
    </motion.div>
  );
};
