// src/components/lab/ui/ChamberInfoPanel.jsx

import { X } from "lucide-react";

/**
 * Left chamber screen panel.
 *
 * Shows the AI result summary and diagnostic features.
 */
export function ChamberInfoPanel({ aiDetectionResult, features, onClose }) {
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
