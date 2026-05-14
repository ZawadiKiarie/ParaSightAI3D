// src/components/lab/ui/ChamberControlsPanel.jsx

import { X } from "lucide-react";

/**
 * Right chamber screen panel.
 *
 * Controls:
 * - model rotation
 * - model zoom
 * - quick feature isolation/focus
 */
export function ChamberControlsPanel({
  markers,
  selectedFeatureId,
  onSelectFeature,
  onClearFeature,
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
                onClick={() => onSelectFeature(marker.id)}
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
              onClick={onClearFeature}
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
