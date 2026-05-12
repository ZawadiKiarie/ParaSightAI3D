import { Canvas } from "@react-three/fiber";
import { LabExperience } from "../components/LabExperience";
import { useRef, useState, useCallback } from "react";
import { LoadingScreen } from "../components/LoadingScreen";
import { X } from "lucide-react";

const STATION_CONTENT = {
  samplePrep: {
    label: "Station 01",
    title: "Sample Preparation Station",
    subtitle: "Prepare the microscopy sample before analysis.",
    overview:
      "This station introduces the first stage of the diagnostic workflow: preparing a stool sample and slide before microscopic examination.",
    instructions: [
      "Observe the sample bottle, stain bottle, and microscope slide.",
      "Understand how a sample is placed on a slide for examination.",
      "Follow the preparation flow before moving to the microscope station.",
    ],
    outcome:
      "By the end of this station, the user understands that accurate parasite detection begins with proper sample preparation.",
  },

  microscope: {
    label: "Station 02",
    title: "Microscope Station",
    subtitle: "Examine the prepared slide under a virtual microscope.",
    overview:
      "This station represents the microscopy stage where the prepared slide is viewed to identify possible parasite structures.",
    instructions: [
      "Move closer to the microscope area.",
      "Observe the slide placed on the microscope stage.",
      "Use this station to understand how parasites are first observed in 2D microscopy images.",
    ],
    outcome:
      "The user learns that microscopy images are the visual input used for parasite identification.",
  },

  ai: {
    label: "Station 03",
    title: "AI Analysis Station",
    subtitle: "Send the microscopy image for AI-assisted detection.",
    overview:
      "This station explains how ParaSightAI analyzes a microscopy image and returns possible parasite detection results.",
    instructions: [
      "Review the analysis screen.",
      "Understand that the AI model detects parasite class, confidence score, and location.",
      "Use the output as a diagnostic support result, not as a final medical decision.",
    ],
    outcome:
      "The user understands how the AI module supports faster parasite identification from microscopy images.",
  },

  threeD: {
    label: "Station 04",
    title: "3D Visualization Station",
    subtitle: "View the detected parasite as an interactive 3D model.",
    overview:
      "This station shows how detection results can be connected to a 3D parasite model for better interpretation and learning.",
    instructions: [
      "Observe the 3D visualization platform.",
      "Use the model to study the parasite shape and diagnostic structures.",
      "Connect the AI result to the matching parasite model.",
    ],
    outcome:
      "The user learns how ParaSightAI moves beyond static 2D images by supporting interactive 3D interpretation.",
  },

  learningPanel: {
    label: "Station 05",
    title: "Guided Learning Panel",
    subtitle: "Learn parasite features through guided explanations.",
    overview:
      "This station focuses on teaching important diagnostic features used to distinguish parasites.",
    instructions: [
      "Open the learning panel.",
      "Study parasite features such as cyst shape, nuclei, chromatin, and internal structures.",
      "Use the guided explanations to improve recognition skills.",
    ],
    outcome:
      "The user gains a clearer understanding of what features to look for when identifying intestinal parasites.",
  },
};

function Joystick({ side, onChange }) {
  const [active, setActive] = useState(false);
  const [stick, setStick] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    const radius = rect.width / 2;
    const maxStickDistance = 36;

    const dx = Math.max(-1, Math.min(1, x / radius));
    const dy = Math.max(-1, Math.min(1, -y / radius));

    setStick({
      x: dx * maxStickDistance,
      y: -dy * maxStickDistance,
    });

    onChange({ x: dx, y: dy });
  };

  const stop = () => {
    setActive(false);
    setStick({ x: 0, y: 0 });
    onChange({ x: 0, y: 0 });
  };

  return (
    <div
      onPointerDown={(e) => {
        setActive(true);
        e.currentTarget.setPointerCapture(e.pointerId);
        handleMove(e);
      }}
      onPointerMove={(e) => {
        if (active) handleMove(e);
      }}
      onPointerUp={stop}
      onPointerCancel={stop}
      className={`absolute bottom-10 ${
        side === "left" ? "left-10" : "right-10"
      } w-36 h-36 rounded-full bg-white/20 border border-white/30 backdrop-blur-md flex items-center justify-center z-20 touch-none`}
    >
      <div
        style={{
          transform: `translate(${stick.x}px, ${stick.y}px)`,
        }}
        className="w-16 h-16 rounded-full bg-white/40 border border-white/40"
      />
    </div>
  );
}

function WelcomeLabModal({ onClose }) {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
      <div className="relative w-[78vw] max-w-4xl min-h-[300px] bg-black/70 border border-white/10 backdrop-blur-sm shadow-2xl pointer-events-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white/70 hover:text-white transition"
          aria-label="Close welcome modal"
        >
          <X size={22} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] h-full">
          <div className="hidden md:flex items-center justify-center p-8">
            <div className="w-full h-44 bg-white/8 border border-white/10 flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-cyan-300/20 border border-cyan-200/40 shadow-[0_0_35px_rgba(103,232,249,0.35)]" />
                <p className="text-white/50 text-sm tracking-[0.25em] uppercase">
                  ParaSightAI Lab
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-10 flex flex-col justify-center">
            <p className="text-cyan-200/80 text-sm tracking-[0.35em] uppercase mb-4">
              Welcome
            </p>

            <h2 className="text-white text-3xl md:text-5xl font-light tracking-[0.2em] uppercase mb-6">
              Virtual Lab
            </h2>

            <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-xl">
              You are now inside the ParaSightAI 3D diagnostic lab. Walk around
              the room and click the glowing information bubbles to understand
              what happens at each station.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/60">
              <span className="border border-white/15 bg-white/5 px-4 py-2">
                Sample Preparation
              </span>
              <span className="border border-white/15 bg-white/5 px-4 py-2">
                Microscope Station
              </span>
              <span className="border border-white/15 bg-white/5 px-4 py-2">
                AI Analysis
              </span>
              <span className="border border-white/15 bg-white/5 px-4 py-2">
                3D Visualization
              </span>
            </div>

            <button
              onClick={onClose}
              className="mt-8 w-fit px-6 py-3 border border-white/30 text-white hover:bg-white hover:text-black transition"
            >
              Start Exploring
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StationModal({ station, onClose }) {
  if (!station) return null;

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/20 pointer-events-none px-4 py-6">
      <div className="relative w-[78vw] max-w-4xl max-h-[88vh] overflow-hidden bg-black/75 border border-white/10 backdrop-blur-md shadow-2xl pointer-events-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 text-white/60 hover:text-white transition"
          aria-label="Close station modal"
        >
          <X size={22} />
        </button>

        <div className="max-h-[88vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.2fr]">
            <div className="hidden md:flex flex-col justify-between p-8 border-r border-white/10 bg-white/5">
              <div>
                <p className="text-cyan-200/70 text-xs tracking-[0.35em] uppercase mb-4">
                  {station.label}
                </p>

                <h2 className="text-white text-3xl font-light tracking-[0.15em] uppercase leading-tight">
                  {station.title}
                </h2>
              </div>

              <div className="mt-10">
                <div className="w-full h-32 border border-cyan-200/20 bg-cyan-300/5 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-cyan-300/20 border border-cyan-200/40 shadow-[0_0_40px_rgba(103,232,249,0.35)]" />
                </div>

                <p className="mt-4 text-white/45 text-sm">
                  Click the glowing bubbles around the lab to explore each
                  workflow station.
                </p>
              </div>
            </div>

            <div className="p-6 md:p-8 pr-10">
              <p className="text-cyan-200/80 text-sm tracking-[0.3em] uppercase mb-3">
                {station.subtitle}
              </p>

              <p className="text-white/75 text-sm md:text-base leading-relaxed mb-6">
                {station.overview}
              </p>

              <div className="mb-6">
                <h3 className="text-white text-sm tracking-[0.25em] uppercase mb-4">
                  What to do here
                </h3>

                <div className="space-y-3">
                  {station.instructions.map((instruction, index) => (
                    <div
                      key={index}
                      className="flex gap-4 border border-white/10 bg-white/5 px-4 py-3"
                    >
                      <span className="text-cyan-200/70 text-sm">
                        0{index + 1}
                      </span>
                      <p className="text-white/70 text-sm leading-relaxed">
                        {instruction}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-cyan-200/20 bg-cyan-300/5 p-5">
                <h3 className="text-cyan-100 text-sm tracking-[0.25em] uppercase mb-3">
                  Learning Outcome
                </h3>
                <p className="text-white/75 text-sm leading-relaxed">
                  {station.outcome}
                </p>
              </div>

              <button
                onClick={onClose}
                className="mt-6 px-6 py-3 border border-white/30 text-white hover:bg-white hover:text-black transition"
              >
                Continue Exploring
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const LabSimulation = () => {
  const moveInputRef = useRef({ x: 0, y: 0 });
  const lookInputRef = useRef({ x: 0, y: 0 });

  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [hasShownWelcomeModal, setHasShownWelcomeModal] = useState(false);
  const [activeStation, setActiveStation] = useState(null);

  // Stable references — won't change between renders
  const handlePlayerMovedEnough = useCallback(() => {
    setHasShownWelcomeModal((prev) => {
      if (prev) return prev;
      setShowWelcomeModal(true);
      return true;
    });
  }, []);

  const handleStationClick = useCallback((stationKey) => {
    setActiveStation(STATION_CONTENT[stationKey]);
  }, []);

  return (
    <>
      <LoadingScreen />
      <div className="experience relative w-screen h-screen overflow-hidden">
        <Canvas className="experience-canvas">
          <LabExperience
            moveInput={moveInputRef}
            lookInput={lookInputRef}
            onPlayerMovedEnough={handlePlayerMovedEnough}
            onStationClick={handleStationClick}
          />
        </Canvas>

        {showWelcomeModal && (
          <WelcomeLabModal onClose={() => setShowWelcomeModal(false)} />
        )}
        {activeStation && (
          <StationModal
            station={activeStation}
            onClose={() => setActiveStation(null)}
          />
        )}

        <Joystick
          side="left"
          onChange={(v) => {
            moveInputRef.current = v;
          }}
        />
        <Joystick
          side="right"
          onChange={(v) => {
            lookInputRef.current = v;
          }}
        />
      </div>
    </>
  );
};
