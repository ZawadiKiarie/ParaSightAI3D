// src/components/lab/ui/StationModal.jsx

import { X } from "lucide-react";

/**
 * Station information modal opened when the user clicks a glowing bubble.
 */
export function StationModal({ station, onClose }) {
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
