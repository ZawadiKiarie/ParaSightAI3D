// src/components/lab/ui/AIAnalysisPanel.jsx

import { X } from "lucide-react";

/**
 * AI analysis overlay.
 *
 * This panel receives the captured microscope image,
 * simulates AI detection, displays the parasite result,
 * and allows the user to map it to the 3D chamber.
 */
export function AIAnalysisPanel({
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
                  <img
                    src={aiDetectionResult.microscopeImage}
                    alt="Captured microscope"
                    className="w-[85%] h-[75%] rounded border border-cyan-200/20 object-cover"
                  />
                )}

                {isAnalyzing && (
                  <div className="relative w-[85%] h-[75%] rounded border border-cyan-200/20 overflow-hidden">
                    <img
                      src={aiDetectionResult.microscopeImage}
                      alt="Analyzing microscope"
                      className="absolute inset-0 w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-cyan-200/10 animate-pulse" />
                    <div className="absolute top-0 bottom-0 w-12 bg-cyan-200/25 blur-md animate-[aiSweep_1.2s_linear_infinite]" />
                  </div>
                )}

                {hasResult && (
                  <div className="relative w-[85%] h-[75%] rounded border border-yellow-200/30 overflow-hidden">
                    <img
                      src={aiDetectionResult.microscopeImage}
                      alt="AI detection result"
                      className="absolute inset-0 w-full h-full object-cover"
                    />

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
