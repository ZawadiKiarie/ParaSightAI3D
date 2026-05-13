import { Canvas } from "@react-three/fiber";
import { LabExperience } from "../components/LabExperience";
import { useRef, useState, useCallback, useEffect } from "react";
import { LoadingScreen } from "../components/LoadingScreen";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PARASITE_DATA } from "../components/ParasiteConfig";

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

function AIAnalysisPanel({
  aiStep,
  aiProgress,
  aiResultSaved,
  aiDetectionResult,
  onRunAIDetection,
  onViewIn3D,
  onSaveResult,
  onClose,
  onGoTo3DChamber,
}) {
  const hasResult = aiStep === "result" || aiStep === "mapped";
  const isAnalyzing = aiStep === "analyzing";
  const isMapped = aiStep === "mapped";

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm px-4 py-6">
      <div className="relative w-[88vw] max-w-5xl max-h-[90vh] overflow-hidden bg-black/80 border border-white/10 shadow-2xl text-white">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 text-white/60 hover:text-white transition"
        >
          <X size={22} />
        </button>

        <div className="max-h-[90vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-[0.95fr_1.05fr]">
            <div className="p-6 md:p-8 border-r border-white/10 bg-white/5">
              <p className="text-cyan-200/70 text-xs tracking-[0.35em] uppercase mb-4">
                Station 03
              </p>

              <h2 className="text-white text-3xl font-light tracking-[0.15em] uppercase mb-4">
                AI Analysis
              </h2>

              <div className="w-full h-64 border border-cyan-200/20 bg-slate-950 flex items-center justify-center overflow-hidden">
                {aiStep === "idle" && (
                  <p className="text-white/40 text-sm">
                    Waiting for captured microscope image.
                  </p>
                )}

                {aiStep === "received" && (
                  <div className="w-[85%] h-[75%] rounded border border-cyan-200/20 bg-[radial-gradient(circle_at_45%_45%,rgba(255,255,255,0.95),rgba(103,232,249,0.45),rgba(15,23,42,1))]" />
                )}

                {isAnalyzing && (
                  <div className="relative w-[85%] h-[75%] rounded border border-cyan-200/20 bg-[radial-gradient(circle_at_45%_45%,rgba(255,255,255,0.95),rgba(103,232,249,0.45),rgba(15,23,42,1))] overflow-hidden">
                    <div className="absolute inset-0 bg-cyan-200/10 animate-pulse" />
                    <div className="absolute top-0 bottom-0 w-12 bg-cyan-200/25 blur-md animate-[aiSweep_1.2s_linear_infinite]" />
                  </div>
                )}

                {hasResult && (
                  <div className="relative w-[85%] h-[75%] rounded border border-yellow-200/30 bg-[radial-gradient(circle_at_45%_45%,rgba(255,255,255,0.95),rgba(253,224,71,0.35),rgba(15,23,42,1))]">
                    <div className="absolute left-[42%] top-[38%] w-16 h-12 rounded-full border-2 border-yellow-300 shadow-[0_0_20px_rgba(253,224,71,0.7)]" />
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 md:p-8">
              <p className="text-cyan-200/70 text-xs tracking-[0.35em] uppercase mb-3">
                ParaSightAI
              </p>

              <h3 className="text-2xl font-light tracking-[0.14em] uppercase mb-3">
                Detection Workflow
              </h3>

              {aiStep === "received" && (
                <>
                  <p className="text-cyan-100 text-sm mb-2">
                    Captured image received, ready to analyze.
                  </p>

                  <p className="text-white/60 text-sm leading-relaxed mb-6">
                    The microscopy image has been received from the microscope
                    station. Run AI detection to analyze the sample.
                  </p>

                  <button
                    onClick={onRunAIDetection}
                    className="w-full px-5 py-3 border border-cyan-200/40 text-cyan-100 hover:bg-cyan-200 hover:text-black transition"
                  >
                    Run AI Detection
                  </button>
                </>
              )}

              {isAnalyzing && (
                <>
                  <p className="text-cyan-100 text-sm mb-2">
                    Analyzing sample...
                  </p>

                  <p className="text-white/55 text-sm leading-relaxed mb-5">
                    Detecting parasite morphology and generating confidence
                    score.
                  </p>

                  <div className="w-full h-2 bg-white/10 overflow-hidden mb-2">
                    <div
                      className="h-full bg-cyan-200 transition-all duration-300"
                      style={{ width: `${aiProgress}%` }}
                    />
                  </div>

                  <p className="text-white/45 text-sm">
                    {aiProgress}% complete
                  </p>
                </>
              )}

              {hasResult && (
                <>
                  <p className="text-yellow-100 text-sm mb-3">
                    Detection result available.
                  </p>

                  <div className="space-y-2 text-sm text-white/70 mb-6">
                    <p>
                      Class:{" "}
                      <span className="text-white">
                        {aiDetectionResult.parasiteName}
                      </span>
                    </p>
                    <p>
                      Stage:{" "}
                      <span className="text-white">
                        {aiDetectionResult.stage}
                      </span>
                    </p>
                    <p>
                      Confidence:{" "}
                      <span className="text-cyan-100">
                        {aiDetectionResult.confidence}%
                      </span>
                    </p>
                    <p>
                      Location:{" "}
                      <span className="text-white">
                        {aiDetectionResult.location}
                      </span>
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={onViewIn3D}
                      className="px-4 py-3 border border-cyan-200/40 text-cyan-100 hover:bg-cyan-200 hover:text-black transition"
                    >
                      View in 3D
                    </button>

                    <button
                      onClick={onSaveResult}
                      className="px-4 py-3 border border-white/30 text-white hover:bg-white hover:text-black transition"
                    >
                      {aiResultSaved ? "Saved" : "Save Result"}
                    </button>
                  </div>

                  {isMapped && (
                    <>
                      <div className="mt-6 border border-cyan-200/20 bg-cyan-300/5 p-4">
                        <p className="text-cyan-100 text-sm leading-relaxed">
                          Mapped visualization ready. The corresponding 3D model
                          has appeared on the 3D platform. Proceed to the 3D
                          chamber.
                        </p>
                      </div>

                      <button
                        onClick={onGoTo3DChamber}
                        className="mt-5 w-full px-5 py-3 border border-white/30 text-white hover:bg-white hover:text-black transition"
                      >
                        Go to 3D Chamber
                      </button>
                    </>
                  )}
                </>
              )}

              {aiStep === "idle" && (
                <p className="text-white/50 text-sm">
                  Waiting for microscope workflow to send the captured image.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes aiSweep {
            0% { transform: translateX(-80px); }
            100% { transform: translateX(280px); }
          }
        `}
      </style>
    </div>
  );
}

function ChamberInfoPanel({ aiDetectionResult, features, onClose }) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm px-4 py-6">
      <div className="relative w-[82vw] max-w-4xl max-h-[88vh] overflow-hidden bg-black/80 border border-white/10 shadow-2xl text-white">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 text-white/60 hover:text-white transition"
        >
          <X size={22} />
        </button>

        <div className="max-h-[88vh] overflow-y-auto p-8">
          <p className="text-cyan-200/70 text-xs tracking-[0.35em] uppercase mb-4">
            3D Chamber / AI Result
          </p>

          <h2 className="text-3xl font-light tracking-[0.15em] uppercase mb-6">
            Parasite Result Summary
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            <div className="border border-cyan-200/20 bg-cyan-300/5 p-5">
              <p className="text-white/45 text-xs uppercase tracking-[0.2em] mb-2">
                Detected Class
              </p>
              <p className="text-cyan-100 text-xl">
                {aiDetectionResult.parasiteName}
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 p-5">
              <p className="text-white/45 text-xs uppercase tracking-[0.2em] mb-2">
                Stage
              </p>
              <p className="text-white text-xl">{aiDetectionResult.stage}</p>
            </div>

            <div className="border border-white/10 bg-white/5 p-5">
              <p className="text-white/45 text-xs uppercase tracking-[0.2em] mb-2">
                Confidence
              </p>
              <p className="text-cyan-100 text-xl">
                {aiDetectionResult.confidence}%
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 p-5">
              <p className="text-white/45 text-xs uppercase tracking-[0.2em] mb-2">
                Image Location
              </p>
              <p className="text-white text-xl">{aiDetectionResult.location}</p>
            </div>
          </div>

          <h3 className="text-white text-sm tracking-[0.25em] uppercase mb-4">
            Diagnostic Features
          </h3>

          <div className="space-y-3">
            {features.map((feature, index) => (
              <div
                key={feature}
                className="flex gap-4 border border-white/10 bg-white/5 px-4 py-3"
              >
                <span className="text-cyan-200/70 text-sm">0{index + 1}</span>
                <p className="text-white/75 text-sm leading-relaxed">
                  {feature}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 border border-cyan-200/20 bg-cyan-300/5 p-5">
            <p className="text-cyan-100 text-sm leading-relaxed">
              Use the control panel on the right screen to rotate, zoom, and
              focus on key diagnostic features in the 3D model.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChamberControlsPanel({
  markers,
  selectedFeatureId,
  setSelectedFeatureId,
  modelRotationY,
  setModelRotationY,
  modelZoom,
  setModelZoom,
  onClose,
}) {
  return (
    <div className="absolute inset-0 z-50 pointer-events-none">
      <div className="absolute top-6 right-6 bottom-6 w-[360px] max-w-[calc(100vw-2rem)] bg-black/78 border border-white/10 backdrop-blur-md shadow-2xl text-white pointer-events-auto overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white/60 hover:text-white transition"
        >
          <X size={20} />
        </button>

        <div className="h-full overflow-y-auto p-6 pr-8">
          <p className="text-cyan-200/70 text-xs tracking-[0.35em] uppercase mb-3">
            3D Chamber
          </p>

          <h2 className="text-2xl font-light tracking-[0.15em] uppercase mb-5">
            Model Controls
          </h2>

          <div className="space-y-5 mb-7">
            <label className="block">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white/70">Rotate Model</span>
                <span className="text-white/45">{modelRotationY}°</span>
              </div>

              <input
                type="range"
                min="0"
                max="360"
                value={modelRotationY}
                onChange={(e) => setModelRotationY(Number(e.target.value))}
                className="w-full"
              />
            </label>

            <label className="block">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white/70">Zoom</span>
                <span className="text-white/45">{modelZoom.toFixed(1)}x</span>
              </div>

              <input
                type="range"
                min="0.6"
                max="2.2"
                step="0.1"
                value={modelZoom}
                onChange={(e) => setModelZoom(Number(e.target.value))}
                className="w-full"
              />
            </label>
          </div>

          <h3 className="text-white text-xs tracking-[0.25em] uppercase mb-4">
            Quick Focus
          </h3>

          <div className="space-y-3">
            {markers.map((marker) => (
              <button
                key={marker.id}
                onClick={() => setSelectedFeatureId(marker.id)}
                className={`w-full px-4 py-3 border text-left transition ${
                  selectedFeatureId === marker.id
                    ? "border-cyan-200 bg-cyan-300/15 text-cyan-100"
                    : "border-white/10 bg-white/5 text-white/70 hover:border-cyan-200/40"
                }`}
              >
                <p className="text-sm">{marker.label}</p>
                <p className="text-white/35 text-xs mt-1">{marker.id}</p>
              </button>
            ))}
          </div>

          {selectedFeatureId && (
            <button
              onClick={() => setSelectedFeatureId(null)}
              className="mt-5 w-full px-5 py-3 border border-white/20 text-white/70 hover:bg-white hover:text-black transition"
            >
              Clear Focus
            </button>
          )}

          <div className="mt-6 border border-cyan-200/20 bg-cyan-300/5 p-4">
            <p className="text-cyan-100 text-sm leading-relaxed">
              Use quick focus to zoom toward a diagnostic feature on the 3D
              parasite model.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const LEARNING_CONTENT = {
  overview: {
    label: "Overview",
    title: "ParaSightAI Learning Summary",
    body: [
      "This learning station summarizes the complete diagnostic workflow demonstrated in the virtual lab.",
      "The process begins with preparing a microscopy slide, observing the sample under a microscope, capturing an image, analyzing it with AI, and mapping the result to a 3D parasite model.",
      "The goal is to help users connect practical laboratory workflow with AI-assisted interpretation and interactive 3D learning.",
    ],
  },

  diagnosticFeatures: {
    label: "Diagnostic Features",
    title: "Key Diagnostic Features",
    body: [
      "Diagnostic features are visual structures used to recognize and distinguish parasite species.",
      "For Giardia lamblia cysts, important features include cyst shape, internal nuclei, axonemes, median bodies, and cytoplasmic structures.",
      "In ParaSightAI, these features can be explored through 3D visualization to support better understanding than static 2D images alone.",
    ],
  },

  lifecycle: {
    label: "Lifecycle",
    title: "Parasite Lifecycle Context",
    body: [
      "A parasite lifecycle explains how the organism moves between stages and hosts.",
      "Understanding lifecycle stages helps users know why different parasite forms may appear in microscopy samples.",
      "The 3D learning module can later be expanded to show stage transitions such as cyst, trophozoite, oocyst, or egg depending on the parasite.",
    ],
  },

  comparison: {
    label: "Comparison",
    title: "Comparison and Interpretation",
    body: [
      "Parasite identification often requires comparing similar-looking organisms.",
      "Users should compare shape, size, internal structures, number of nuclei, and other diagnostic features.",
      "The AI result should support interpretation, while the 3D model helps the user study why a parasite class may have been suggested.",
    ],
  },
};

function LearningPanel({
  activeLearningTab,
  setActiveLearningTab,
  onFinish,
  onClose,
}) {
  const activeContent = LEARNING_CONTENT[activeLearningTab];

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm px-4 py-4">
      <div className="relative w-[86vw] max-w-5xl h-[min(760px,calc(100vh-32px))] overflow-hidden bg-black/82 border border-white/10 shadow-2xl text-white">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 text-white/60 hover:text-white transition"
          aria-label="Close learning panel"
        >
          <X size={22} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] h-full min-h-0">
          <div className="border-r border-white/10 bg-white/5 p-6 overflow-y-auto">
            <p className="text-cyan-200/70 text-xs tracking-[0.35em] uppercase mb-4">
              Station 05
            </p>

            <h2 className="text-2xl font-light tracking-[0.15em] uppercase mb-6">
              Guided Learning
            </h2>

            <div className="space-y-3">
              {Object.entries(LEARNING_CONTENT).map(([key, item]) => (
                <button
                  key={key}
                  onClick={() => setActiveLearningTab(key)}
                  className={`w-full px-4 py-3 border text-left transition ${
                    activeLearningTab === key
                      ? "border-cyan-200 bg-cyan-300/15 text-cyan-100"
                      : "border-white/10 bg-white/5 text-white/70 hover:border-cyan-200/40"
                  }`}
                >
                  <p className="text-sm tracking-[0.12em] uppercase">
                    {item.label}
                  </p>
                </button>
              ))}
            </div>

            <div className="mt-6 border border-cyan-200/20 bg-cyan-300/5 p-4">
              <p className="text-cyan-100 text-sm leading-relaxed">
                Select a topic to review what you learned during the virtual lab
                workflow.
              </p>
            </div>
          </div>

          <div className="p-7 md:p-8 overflow-y-auto min-h-0">
            <p className="text-cyan-200/70 text-xs tracking-[0.35em] uppercase mb-4">
              Learning Content
            </p>

            <h3 className="text-3xl font-light tracking-[0.12em] uppercase mb-6 pr-12">
              {activeContent.title}
            </h3>

            <div className="space-y-4">
              {activeContent.body.map((paragraph, index) => (
                <div
                  key={index}
                  className="border border-white/10 bg-white/5 p-5"
                >
                  <p className="text-white/75 text-sm md:text-base leading-relaxed">
                    {paragraph}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 border border-cyan-200/20 bg-cyan-300/5 p-5">
              <p className="text-cyan-100 text-sm leading-relaxed">
                When you are done reviewing the learning content, finish the
                session to complete the guided lab experience.
              </p>
            </div>

            <div className="mt-6 mb-2 flex flex-wrap gap-3">
              <button
                onClick={onFinish}
                className="px-6 py-3 border border-cyan-200/40 text-cyan-100 hover:bg-cyan-200 hover:text-black transition"
              >
                Finish Session
              </button>

              <button
                onClick={onClose}
                className="px-6 py-3 border border-white/25 text-white/70 hover:bg-white hover:text-black transition"
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

function LabCompletionPopup({ onRestart, onDashboard }) {
  return (
    <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/55 backdrop-blur-md px-4 py-6">
      <div className="relative w-[78vw] max-w-3xl bg-black/85 border border-cyan-200/20 shadow-2xl text-white p-8 md:p-10">
        <p className="text-cyan-200/80 text-xs tracking-[0.35em] uppercase mb-4">
          Session Complete
        </p>

        <h2 className="text-3xl md:text-5xl font-light tracking-[0.18em] uppercase mb-6">
          Lab Completed
        </h2>

        <p className="text-white/75 text-base leading-relaxed mb-6">
          You have completed the ParaSightAI virtual diagnostic workflow: sample
          preparation, microscope observation, AI analysis, 3D visualization,
          and guided learning.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
          <button
            onClick={onRestart}
            className="px-6 py-3 border border-cyan-200/40 text-cyan-100 hover:bg-cyan-200 hover:text-black transition"
          >
            Restart Lab
          </button>

          {/* <button
            onClick={onDashboard}
            className="px-6 py-3 border border-white/30 text-white hover:bg-white hover:text-black transition"
          >
            Return to Dashboard
          </button> */}
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

  const [samplePrepStep, setSamplePrepStep] = useState("idle");
  const [samplePrepPanelOpen, setSamplePrepPanelOpen] = useState(false);
  const [samplePrepCompleted, setSamplePrepCompleted] = useState(false);

  const [microscopeActive, setMicroscopeActive] = useState(false);
  const [microscopeCompleted, setMicroscopeCompleted] = useState(false);
  const [microscopeStep, setMicroscopeStep] = useState("idle");

  const [microscopeFocus, setMicroscopeFocus] = useState(25);
  const [microscopeZoom, setMicroscopeZoom] = useState(35);
  const [microscopeBrightness, setMicroscopeBrightness] = useState(100);

  const [aiStep, setAiStep] = useState("idle");
  const [aiProgress, setAiProgress] = useState(0);
  const [aiResultSaved, setAiResultSaved] = useState(false);
  const [showMappedModel, setShowMappedModel] = useState(false);
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [aiCompleted, setAiCompleted] = useState(false);

  const aiTimerRef = useRef(null);

  const aiDetectionResult = {
    parasiteId: "GiardiaLamblia",
    stage: "cyst",
    parasiteName: "Giardia lamblia",
    confidence: 92,
    location: "central field",
  };

  const [chamberInfoPanelOpen, setChamberInfoPanelOpen] = useState(false);
  const [chamberControlsPanelOpen, setChamberControlsPanelOpen] =
    useState(false);
  const [selectedFeatureId, setSelectedFeatureId] = useState(null);
  const [modelRotationY, setModelRotationY] = useState(0);
  const [modelZoom, setModelZoom] = useState(1);

  const mappedParasite =
    aiDetectionResult &&
    PARASITE_DATA[aiDetectionResult.parasiteId]?.[aiDetectionResult.stage];

  const mappedFeatures = mappedParasite?.features || [];
  const mappedMarkers = mappedParasite?.markers || [];

  const navigate = useNavigate();

  const [labRunKey, setLabRunKey] = useState(0);

  const [learningPanelOpen, setLearningPanelOpen] = useState(false);
  const [learningCompleted, setLearningCompleted] = useState(false);
  const [activeLearningTab, setActiveLearningTab] = useState("overview");
  const [showCompletionPopup, setShowCompletionPopup] = useState(false);

  const handleOpenLearningPanel = () => {
    setLearningPanelOpen(true);
    setActiveLearningTab("overview");
  };

  const handleCloseLearningPanel = () => {
    setLearningPanelOpen(false);
  };

  const handleFinishLearningSession = () => {
    setLearningPanelOpen(false);
    setLearningCompleted(true);
    setShowCompletionPopup(true);
  };

  const resetLabState = () => {
    if (aiTimerRef.current) {
      clearInterval(aiTimerRef.current);
      aiTimerRef.current = null;
    }

    moveInputRef.current = { x: 0, y: 0 };
    lookInputRef.current = { x: 0, y: 0 };

    setShowWelcomeModal(false);
    setHasShownWelcomeModal(false);
    setActiveStation(null);

    setSamplePrepStep("idle");
    setSamplePrepPanelOpen(false);
    setSamplePrepCompleted(false);

    setMicroscopeActive(false);
    setMicroscopeCompleted(false);
    setMicroscopeStep("idle");
    setMicroscopeFocus(25);
    setMicroscopeZoom(35);
    setMicroscopeBrightness(100);

    setAiStep("idle");
    setAiProgress(0);
    setAiResultSaved(false);
    setShowMappedModel(false);
    setAiPanelOpen(false);
    setAiCompleted(false);

    setChamberInfoPanelOpen(false);
    setChamberControlsPanelOpen(false);
    setSelectedFeatureId(null);
    setModelRotationY(0);
    setModelZoom(1);

    setLearningPanelOpen(false);
    setLearningCompleted(false);
    setActiveLearningTab("overview");
    setShowCompletionPopup(false);

    setLabRunKey((key) => key + 1);
  };

  const handleReturnToDashboard = () => {
    navigate("/dashboard");
  };

  const handleOpenChamberInfo = () => {
    if (!showMappedModel) return;
    setChamberInfoPanelOpen(true);
  };

  const handleOpenChamberControls = () => {
    if (!showMappedModel) return;
    setChamberControlsPanelOpen(true);
  };

  const handleCloseChamberInfo = () => {
    setChamberInfoPanelOpen(false);
  };

  const handleCloseChamberControls = () => {
    setChamberControlsPanelOpen(false);
  };

  useEffect(() => {
    return () => {
      if (aiTimerRef.current) {
        clearInterval(aiTimerRef.current);
      }
    };
  }, []);

  const handleRunAIDetection = () => {
    if (aiStep !== "received") return;

    if (aiTimerRef.current) {
      clearInterval(aiTimerRef.current);
    }

    setAiStep("analyzing");
    setAiProgress(0);

    let progress = 0;

    aiTimerRef.current = setInterval(() => {
      progress += 10;
      setAiProgress(Math.min(progress, 100));

      if (progress >= 100) {
        clearInterval(aiTimerRef.current);
        aiTimerRef.current = null;

        setTimeout(() => {
          setAiStep("result");
        }, 300);
      }
    }, 250);
  };

  const handleViewIn3D = () => {
    if (aiStep !== "result" && aiStep !== "mapped") return;

    setAiStep("loading3d");
    setShowMappedModel(false);

    setTimeout(() => {
      setShowMappedModel(true);
      setAiStep("mapped");
    }, 1200);
  };

  const handleSaveResult = () => {
    if (aiStep !== "result" && aiStep !== "mapped") return;

    setAiResultSaved(true);
  };

  const handleOpenAIAnalysis = () => {
    if (aiStep === "idle" || aiCompleted) return;
    setAiPanelOpen(true);
  };

  const handleCloseAIAnalysis = () => {
    setAiPanelOpen(false);
  };

  const handleGoTo3DChamber = () => {
    setAiPanelOpen(false);
    setAiCompleted(true);
  };

  const handleSendToAI = () => {
    setMicroscopeActive(false);
    setMicroscopeCompleted(true);
    setMicroscopeStep("sent");

    setAiStep("received");
    setAiProgress(0);
    setAiResultSaved(false);
    setShowMappedModel(false);
    setAiPanelOpen(false);
    setAiCompleted(false);
  };

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
            key={labRunKey}
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
            aiStep={aiStep}
            aiProgress={aiProgress}
            aiResultSaved={aiResultSaved}
            showMappedModel={showMappedModel}
            aiDetectionResult={aiDetectionResult}
            onRunAIDetection={handleRunAIDetection}
            onViewIn3D={handleViewIn3D}
            onSaveResult={handleSaveResult}
            aiPanelOpen={aiPanelOpen}
            aiCompleted={aiCompleted}
            onOpenAIAnalysis={handleOpenAIAnalysis}
            chamberInfoPanelOpen={chamberInfoPanelOpen}
            chamberControlsPanelOpen={chamberControlsPanelOpen}
            selectedFeatureId={selectedFeatureId}
            modelRotationY={modelRotationY}
            modelZoom={modelZoom}
            onOpenChamberInfo={handleOpenChamberInfo}
            onOpenChamberControls={handleOpenChamberControls}
            learningPanelOpen={learningPanelOpen}
            learningCompleted={learningCompleted}
            onOpenLearningPanel={handleOpenLearningPanel}
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

        {aiPanelOpen && (
          <AIAnalysisPanel
            aiStep={aiStep}
            aiProgress={aiProgress}
            aiResultSaved={aiResultSaved}
            aiDetectionResult={aiDetectionResult}
            onRunAIDetection={handleRunAIDetection}
            onViewIn3D={handleViewIn3D}
            onSaveResult={handleSaveResult}
            onClose={handleCloseAIAnalysis}
            onGoTo3DChamber={handleGoTo3DChamber}
          />
        )}

        {chamberInfoPanelOpen && (
          <ChamberInfoPanel
            aiDetectionResult={aiDetectionResult}
            features={mappedFeatures}
            onClose={handleCloseChamberInfo}
          />
        )}

        {chamberControlsPanelOpen && (
          <ChamberControlsPanel
            markers={mappedMarkers}
            selectedFeatureId={selectedFeatureId}
            setSelectedFeatureId={setSelectedFeatureId}
            modelRotationY={modelRotationY}
            setModelRotationY={setModelRotationY}
            modelZoom={modelZoom}
            setModelZoom={setModelZoom}
            onClose={handleCloseChamberControls}
          />
        )}

        {learningPanelOpen && (
          <LearningPanel
            activeLearningTab={activeLearningTab}
            setActiveLearningTab={setActiveLearningTab}
            onFinish={handleFinishLearningSession}
            onClose={handleCloseLearningPanel}
          />
        )}

        {showCompletionPopup && (
          <LabCompletionPopup
            onRestart={resetLabState}
            onDashboard={handleReturnToDashboard}
          />
        )}

        {!samplePrepPanelOpen &&
          !microscopeActive &&
          !aiPanelOpen &&
          !chamberInfoPanelOpen &&
          !chamberControlsPanelOpen &&
          !learningPanelOpen &&
          !showCompletionPopup && (
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
