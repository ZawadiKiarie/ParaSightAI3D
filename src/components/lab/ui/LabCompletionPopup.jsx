// src/components/lab/ui/LabCompletionPopup.jsx

/**
 * Final popup shown after the user finishes the learning station.
 */
export function LabCompletionPopup({ onRestart, onDashboard }) {
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

          {/* {onDashboard && (
            <button
              onClick={onDashboard}
              className="px-6 py-3 border border-white/30 text-white hover:bg-white hover:text-black transition"
            >
              Return to Dashboard
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
}
