export default function ComputerScreenAI({
  aiStep,
  aiProgress,
  aiResultSaved,
  aiDetectionResult,
  onRunAIDetection,
  onViewIn3D,
  onSaveResult,
}) {
  const hasResult = aiStep === "result" || aiStep === "mapped";
  const isAnalyzing = aiStep === "analyzing";
  const isLoading3D = aiStep === "loading3d";
  const isMapped = aiStep === "mapped";

  return (
    <div className="w-[520px] h-[310px] bg-slate-950 text-white border border-cyan-200/20 overflow-hidden font-sans">
      <div className="h-full p-5 flex flex-col">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <p className="text-cyan-200/70 text-[10px] tracking-[0.35em] uppercase">
              ParaSightAI
            </p>
            <h2 className="text-lg font-light tracking-[0.18em] uppercase">
              AI Analysis
            </h2>
          </div>

          <div className="w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.9)]" />
        </div>

        {aiStep === "idle" && (
          <div className="flex-1 flex items-center justify-center text-center">
            <p className="text-white/45 text-sm">
              Waiting for captured microscope image.
            </p>
          </div>
        )}

        {aiStep === "received" && (
          <div className="flex-1 grid grid-cols-[0.9fr_1.1fr] gap-4 items-center">
            <div className="h-32 rounded border border-cyan-200/20 bg-[radial-gradient(circle_at_45%_45%,rgba(255,255,255,0.9),rgba(103,232,249,0.45),rgba(15,23,42,1))]" />

            <div>
              <p className="text-cyan-100 text-sm mb-2">
                Captured image received.
              </p>

              <p className="text-white/55 text-xs leading-relaxed mb-5">
                The microscope image is ready for AI-assisted parasite
                detection.
              </p>

              <button
                onClick={onRunAIDetection}
                className="w-full px-4 py-3 border border-cyan-200/40 text-cyan-100 text-xs uppercase tracking-[0.2em] hover:bg-cyan-200 hover:text-black transition"
              >
                Run AI Detection
              </button>
            </div>
          </div>
        )}

        {isAnalyzing && (
          <div className="flex-1 grid grid-cols-[0.9fr_1.1fr] gap-4 items-center">
            <div className="relative h-32 rounded border border-cyan-200/20 bg-[radial-gradient(circle_at_45%_45%,rgba(255,255,255,0.9),rgba(103,232,249,0.45),rgba(15,23,42,1))] overflow-hidden">
              <div className="absolute inset-0 bg-cyan-200/10 animate-pulse" />
              <div className="absolute top-0 bottom-0 w-12 bg-cyan-200/25 blur-md animate-[aiSweep_1.2s_linear_infinite]" />
            </div>

            <div>
              <p className="text-cyan-100 text-sm mb-2">Analyzing sample...</p>

              <p className="text-white/50 text-xs mb-4">
                Detecting parasite morphology and confidence score.
              </p>

              <div className="w-full h-2 bg-white/10 overflow-hidden mb-2">
                <div
                  className="h-full bg-cyan-200 transition-all duration-300"
                  style={{ width: `${aiProgress}%` }}
                />
              </div>

              <p className="text-white/45 text-xs">{aiProgress}% complete</p>
            </div>
          </div>
        )}

        {hasResult && (
          <div className="flex-1 grid grid-cols-[0.9fr_1.1fr] gap-4 items-center">
            <div className="h-32 rounded border border-yellow-200/30 bg-[radial-gradient(circle_at_45%_45%,rgba(255,255,255,0.9),rgba(253,224,71,0.35),rgba(15,23,42,1))] relative">
              <div className="absolute left-[42%] top-[38%] w-16 h-12 rounded-full border-2 border-yellow-300 shadow-[0_0_20px_rgba(253,224,71,0.7)]" />
            </div>

            <div>
              <p className="text-yellow-100 text-sm mb-2">Parasite detected</p>

              <div className="space-y-1 text-xs text-white/65 mb-4">
                <p>
                  Class:{" "}
                  <span className="text-white">
                    {aiDetectionResult.parasiteName}
                  </span>
                </p>
                <p>
                  Stage:{" "}
                  <span className="text-white">{aiDetectionResult.stage}</span>
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

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={onViewIn3D}
                  className="px-3 py-2 border border-cyan-200/40 text-cyan-100 text-[10px] uppercase tracking-[0.18em] hover:bg-cyan-200 hover:text-black transition"
                >
                  View in 3D
                </button>

                <button
                  onClick={onSaveResult}
                  className="px-3 py-2 border border-white/30 text-white text-[10px] uppercase tracking-[0.18em] hover:bg-white hover:text-black transition"
                >
                  {aiResultSaved ? "Saved" : "Save Result"}
                </button>
              </div>

              {isMapped && (
                <p className="mt-3 text-cyan-100 text-xs">
                  Mapped visualization ready. Go to the 3D chamber.
                </p>
              )}
            </div>
          </div>
        )}

        {isLoading3D && (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 border border-cyan-200/30 border-t-cyan-200 rounded-full animate-spin mb-4" />
            <p className="text-cyan-100 text-sm">
              Loading mapped visualization...
            </p>
          </div>
        )}
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
