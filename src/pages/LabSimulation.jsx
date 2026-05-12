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

function SamplePrepPanel({
  samplePrepStep,
  onPlaceCoverSlip,
  onGoToMicroscope,
}) {
  const isAddSampleDone = [
    "sampleAdded",
    "stained",
    "covered",
    "ready",
  ].includes(samplePrepStep);

  const isStainDone = ["stained", "covered", "ready"].includes(samplePrepStep);
  const isCoverSlipDone = ["covered", "ready"].includes(samplePrepStep);
  const isReady = samplePrepStep === "ready";

  const progressItems = [
    { label: "Add sample", done: isAddSampleDone },
    { label: "Apply stain", done: isStainDone },
    { label: "Place cover slip", done: isCoverSlipDone },
    { label: "Slide ready", done: isReady },
  ];

  const completedCount = progressItems.filter((item) => item.done).length;
  const progress = (completedCount / progressItems.length) * 100;

  return (
    <div className="absolute top-1/2 right-8 z-40 w-[340px] -translate-y-1/2 bg-black/75 border border-white/10 backdrop-blur-md shadow-2xl text-white">
      <div className="p-6">
        <p className="text-cyan-200/80 text-xs tracking-[0.35em] uppercase mb-3">
          Sample Prep
        </p>

        <h2 className="text-2xl font-light tracking-[0.15em] uppercase mb-2">
          Prepare Slide
        </h2>

        <p className="text-white/60 text-sm leading-relaxed mb-5">
          Task: prepare the slide before observation.
        </p>

        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/50 text-xs uppercase tracking-[0.2em]">
              Progress
            </span>
            <span className="text-cyan-100 text-xs">{completedCount}/4</span>
          </div>

          <div className="w-full h-2 bg-white/10 overflow-hidden">
            <div
              className="h-full bg-cyan-200 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="space-y-3">
          {progressItems.map((item, index) => (
            <div
              key={item.label}
              className={`flex items-center gap-3 border px-3 py-3 transition ${
                item.done
                  ? "border-cyan-200/30 bg-cyan-300/10"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <div
                className={`w-5 h-5 border flex items-center justify-center text-xs ${
                  item.done
                    ? "border-cyan-200 bg-cyan-200 text-black"
                    : "border-white/30 text-transparent"
                }`}
              >
                ✓
              </div>

              <span className="text-white/75 text-sm">
                {index + 1}. {item.label}
              </span>
            </div>
          ))}
        </div>

        {samplePrepStep === "focused" && (
          <p className="mt-5 text-yellow-100/80 text-sm leading-relaxed">
            Click the glowing sample bottle to add the sample onto the slide.
          </p>
        )}

        {samplePrepStep === "sampleAdded" && (
          <p className="mt-5 text-yellow-100/80 text-sm leading-relaxed">
            Now click the glowing stain bottle to apply stain to the sample.
          </p>
        )}

        {samplePrepStep === "stained" && (
          <button
            onClick={onPlaceCoverSlip}
            className="mt-6 w-full px-5 py-3 border border-cyan-200/40 text-cyan-100 hover:bg-cyan-200 hover:text-black transition"
          >
            Place Cover Slip
          </button>
        )}

        {samplePrepStep === "covered" && (
          <p className="mt-5 text-cyan-100/80 text-sm leading-relaxed">
            Cover slip placed. Finalizing slide preparation...
          </p>
        )}

        {isReady && (
          <>
            <div className="mt-6 border border-cyan-200/30 bg-cyan-300/10 p-4">
              <p className="text-cyan-100 text-sm leading-relaxed">
                Slide is ready for observation. Proceed to the microscope
                station.
              </p>
            </div>

            <button
              onClick={onGoToMicroscope}
              className="mt-5 w-full px-5 py-3 border border-white/30 text-white hover:bg-white hover:text-black transition"
            >
              Go to Microscope Station
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function MicroscopeOverlay({
  focus,
  setFocus,
  zoom,
  setZoom,
  brightness,
  setBrightness,
  microscopeStep,
  onScan,
  onCapture,
  onSendToAI,
}) {
  const isSharp = focus >= 70;
  const hasDetected =
    microscopeStep === "detected" || microscopeStep === "captured";
  const hasCaptured = microscopeStep === "captured";

  const blurAmount = Math.max(0, 10 - focus / 10);
  const scaleAmount = 1 + zoom / 120;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm px-4 py-4">
      <div className="w-[90vw] max-w-6xl max-h-[92vh] overflow-hidden bg-black/80 border border-white/10 shadow-2xl text-white">
        <div className="max-h-[92vh] overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-5 md:p-6 border-r border-white/10 flex flex-col items-center justify-center">
              <p className="text-cyan-200/70 text-xs tracking-[0.35em] uppercase mb-4">
                Microscope View
              </p>

              <div className="relative w-[min(360px,62vw,58vh)] h-[min(360px,62vw,58vh)] rounded-full overflow-hidden border-[8px] border-black bg-slate-950 shadow-[0_0_60px_rgba(103,232,249,0.25)]">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    filter: `blur(${blurAmount}px) brightness(${brightness}%)`,
                    transform: `scale(${scaleAmount})`,
                    transition: "filter 0.2s ease, transform 0.2s ease",
                    background:
                      "radial-gradient(circle at 45% 45%, rgba(255,255,255,0.9), rgba(187,247,208,0.65) 24%, rgba(103,232,249,0.28) 45%, rgba(15,23,42,0.95) 100%)",
                  }}
                />

                <div
                  className="absolute left-[46%] top-[46%] w-20 h-14 rounded-[50%] border border-emerald-900/30 bg-emerald-300/25"
                  style={{
                    filter: `blur(${Math.max(0, blurAmount * 0.45)}px)`,
                    transform: `scale(${scaleAmount}) rotate(-18deg)`,
                    opacity: isSharp ? 0.85 : 0.45,
                  }}
                />

                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,transparent_58%,rgba(0,0,0,0.9)_100%)]" />

                {microscopeStep === "scanning" && (
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <div className="absolute left-0 right-0 h-1 bg-cyan-200/80 shadow-[0_0_22px_rgba(103,232,249,0.9)] animate-[scanLine_1.4s_ease-in-out_infinite]" />
                  </div>
                )}

                {hasDetected && (
                  <div className="absolute left-[43%] top-[43%] w-24 h-20 rounded-full border-2 border-yellow-300/90 shadow-[0_0_28px_rgba(253,224,71,0.75)] animate-pulse" />
                )}

                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10" />
                <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10" />
              </div>

              <p className="mt-4 text-white/45 text-sm text-center max-w-md">
                Adjust focus until the organism becomes clear, then scan the
                slide.
              </p>
            </div>

            <div className="p-5 md:p-6">
              <p className="text-cyan-200/70 text-xs tracking-[0.35em] uppercase mb-2">
                Station 02
              </p>

              <h2 className="text-2xl md:text-3xl font-light tracking-[0.14em] uppercase mb-3">
                Microscope Station
              </h2>

              <p className="text-white/60 text-sm leading-relaxed mb-5">
                Observe the prepared slide, adjust the microscope view, scan for
                suspicious organisms, then capture the image for AI analysis.
              </p>

              <div className="space-y-4">
                <label className="block">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/70">Focus</span>
                    <span
                      className={isSharp ? "text-cyan-200" : "text-yellow-200"}
                    >
                      {isSharp ? "Sharp" : "Blurry"}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={focus}
                    onChange={(e) => setFocus(Number(e.target.value))}
                    className="w-full"
                  />
                </label>

                <label className="block">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/70">Zoom</span>
                    <span className="text-white/50">{zoom}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full"
                  />
                </label>

                <label className="block">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/70">Brightness</span>
                    <span className="text-white/50">{brightness}%</span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="150"
                    value={brightness}
                    onChange={(e) => setBrightness(Number(e.target.value))}
                    className="w-full"
                  />
                </label>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  onClick={onScan}
                  disabled={!isSharp || microscopeStep === "scanning"}
                  className={`w-full px-5 py-3 border transition ${
                    !isSharp || microscopeStep === "scanning"
                      ? "border-white/10 text-white/30 cursor-not-allowed"
                      : "border-cyan-200/40 text-cyan-100 hover:bg-cyan-200 hover:text-black"
                  }`}
                >
                  {microscopeStep === "scanning"
                    ? "Scanning Slide..."
                    : "Scan Slide"}
                </button>

                <button
                  onClick={onCapture}
                  disabled={!hasDetected || hasCaptured}
                  className={`w-full px-5 py-3 border transition ${
                    !hasDetected || hasCaptured
                      ? "border-white/10 text-white/30 cursor-not-allowed"
                      : "border-yellow-200/50 text-yellow-100 hover:bg-yellow-200 hover:text-black"
                  }`}
                >
                  Capture Image
                </button>
              </div>

              <div className="mt-5 border border-white/10 bg-white/5 p-4 min-h-20">
                {microscopeStep === "viewing" && (
                  <p className="text-white/60 text-sm">
                    Adjust the focus until the image becomes sharp, then scan
                    the slide.
                  </p>
                )}

                {microscopeStep === "scanning" && (
                  <p className="text-cyan-100 text-sm">
                    Scanning slide... searching for suspicious organisms.
                  </p>
                )}

                {microscopeStep === "detected" && (
                  <p className="text-yellow-100 text-sm">
                    Suspicious organism detected. Capture image for analysis.
                  </p>
                )}

                {hasCaptured && (
                  <div>
                    <p className="text-cyan-100 text-sm mb-4">
                      Image captured. Send image to AI analysis.
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="w-24 h-16 rounded border border-cyan-200/30 bg-[radial-gradient(circle_at_45%_45%,rgba(255,255,255,0.9),rgba(103,232,249,0.45),rgba(15,23,42,1))]" />

                      <button
                        onClick={onSendToAI}
                        className="flex-1 px-5 py-3 border border-white/30 text-white hover:bg-white hover:text-black transition"
                      >
                        Send to AI Analysis
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes scanLine {
            0% { transform: translateY(20px); opacity: 0; }
            15% { opacity: 1; }
            50% { transform: translateY(330px); opacity: 1; }
            100% { transform: translateY(20px); opacity: 0; }
          }
        `}
      </style>
    </div>
  );
}

export const LabSimulation = () => {
  const moveInputRef = useRef({ x: 0, y: 0 });
  const lookInputRef = useRef({ x: 0, y: 0 });

  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [hasShownWelcomeModal, setHasShownWelcomeModal] = useState(false);
  const [activeStation, setActiveStation] = useState(null);

  const [samplePrepStep, setSamplePrepStep] = useState("idle");
  const [samplePrepPanelOpen, setSamplePrepPanelOpen] = useState(false);
  const [samplePrepCompleted, setSamplePrepCompleted] = useState(false);

  const [microscopeActive, setMicroscopeActive] = useState(false);
  const [microscopeCompleted, setMicroscopeCompleted] = useState(false);
  const [microscopeStep, setMicroscopeStep] = useState("idle");

  const [microscopeFocus, setMicroscopeFocus] = useState(25);
  const [microscopeZoom, setMicroscopeZoom] = useState(35);
  const [microscopeBrightness, setMicroscopeBrightness] = useState(100);

  const handleOpenMicroscope = () => {
    if (!samplePrepCompleted || microscopeCompleted) return;

    setMicroscopeActive(true);
    setMicroscopeStep("viewing");
  };

  const handleScanSlide = () => {
    if (microscopeFocus < 70) return;

    setMicroscopeStep("scanning");

    setTimeout(() => {
      setMicroscopeStep("detected");
    }, 1800);
  };

  const handleCaptureImage = () => {
    if (microscopeStep !== "detected") return;

    setMicroscopeStep("captured");
  };

  const handleSendToAI = () => {
    setMicroscopeActive(false);
    setMicroscopeCompleted(true);
    setMicroscopeStep("sent");
  };

  const handleStartSamplePrep = () => {
    if (samplePrepStep !== "idle") return;

    setSamplePrepStep("focused");
    setSamplePrepPanelOpen(true);
  };

  const handleAddSample = () => {
    if (samplePrepStep !== "focused") return;
    setSamplePrepStep("sampleAdded");
  };

  const handleApplyStain = () => {
    if (samplePrepStep !== "sampleAdded") return;
    setSamplePrepStep("stained");
  };

  const handlePlaceCoverSlip = () => {
    if (samplePrepStep !== "stained") return;

    setSamplePrepStep("covered");

    setTimeout(() => {
      setSamplePrepStep("ready");
    }, 900);
  };

  const handleGoToMicroscope = () => {
    setSamplePrepPanelOpen(false);
    setSamplePrepCompleted(true);
  };

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
            samplePrepStep={samplePrepStep}
            samplePrepCameraActive={samplePrepPanelOpen}
            samplePrepCompleted={samplePrepCompleted}
            onStartSamplePrep={handleStartSamplePrep}
            onAddSample={handleAddSample}
            onApplyStain={handleApplyStain}
            microscopeActive={microscopeActive}
            microscopeCompleted={microscopeCompleted}
            onOpenMicroscope={handleOpenMicroscope}
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
        {samplePrepPanelOpen && (
          <SamplePrepPanel
            samplePrepStep={samplePrepStep}
            onPlaceCoverSlip={handlePlaceCoverSlip}
            onGoToMicroscope={handleGoToMicroscope}
          />
        )}

        {microscopeActive && (
          <MicroscopeOverlay
            focus={microscopeFocus}
            setFocus={setMicroscopeFocus}
            zoom={microscopeZoom}
            setZoom={setMicroscopeZoom}
            brightness={microscopeBrightness}
            setBrightness={setMicroscopeBrightness}
            microscopeStep={microscopeStep}
            onScan={handleScanSlide}
            onCapture={handleCaptureImage}
            onSendToAI={handleSendToAI}
          />
        )}

        {!samplePrepPanelOpen && !microscopeActive && (
          <>
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
          </>
        )}
      </div>
    </>
  );
};
