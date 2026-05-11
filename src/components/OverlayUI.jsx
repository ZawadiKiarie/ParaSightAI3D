import { SoundToggle } from "./SoundToggle";
import { StartButton } from "./StartExperienceButton";
import { motion } from "motion/react";

const OverlayUI = () => {
  return (
    <motion.div
      className="overlay-container"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }} // Seamless fade out
    >
      <div className="top-section">
        <motion.div
          className="title-group"
          exit={{ x: -100, opacity: 0 }} // Slide left on exit
        >
          <div className="title-with-logo">
            <img src="\logo\ParaSightAI2.svg" className="logo-img" />
            <h1 className="main-title">ParaSightAI Lab</h1>
          </div>
          <p className="sub-title">
            Interactive <br /> Visualization
          </p>
        </motion.div>

        <motion.div
          className="bullet-group"
          exit={{ x: 100, opacity: 0 }} // Slide right on exit
        >
          <ul className="bullet-list">
            <li>
              <span className="diamond glow-purple" />
              Real-time Pathogen Analysis
            </li>

            <li>
              <span className="diamond glow-purple" />
              Neural Identification Engine
            </li>

            <li>
              <span className="diamond glow-purple" />
              3D Morphological Mapping
            </li>

            <li>
              <span className="diamond glow-purple" />
              Diagnostic Precision Tools
            </li>
          </ul>
        </motion.div>
      </div>

      <div className="bottom-section">
        <div className="sound-container">
          <SoundToggle audioUrl="\audio\bgsound.mp3" />
        </div>
        <StartButton />
        <div className="credits-placeholder">JKUAT 2026</div>
      </div>
    </motion.div>
  );
};

export default OverlayUI;
