// src/components/lab/ui/SamplePrepPanel.jsx

/**
 * Right-side panel used during the sample preparation workflow.
 */
export function SamplePrepPanel({
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
