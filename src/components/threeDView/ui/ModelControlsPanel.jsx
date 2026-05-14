// src/components/threeDView/ui/ModelControlsPanel.jsx

import { PARASITE_DATA, STAGE_LABELS } from "../../ParasiteConfig";

/**
 * Controls below the 3D canvas.
 *
 * Handles:
 * - manual test parasite selection
 * - life stage selection
 * - zoom slider
 * - internal structure toggle
 * - transparency slider
 * - optional cross-section / highlight toggles
 * - quick focus buttons
 */
export function ModelControlsPanel({
  selectedParasiteId,
  lifeStage,
  availableStages,
  markers,

  modelZoom,
  setModelZoom,
  zoomLimits,

  transparency,
  setTransparency,
  transparencyLimits,

  showInternalStructures,
  handleToggleInternalStructures,

  crossSection,
  setCrossSection,

  highlightMode,
  handleToggleHighlightMode,

  activeFocus,

  handleParasiteChange,
  handleStageChange,
  handleQuickFocus,

  showAdvancedControls = false,
}) {
  return (
    <div className="space-y-4 pt-2">
      <div className="space-y-2 p-4 rounded-lg bg-white/5 border border-white/10">
        <label className="text-sm font-medium text-slate-200">
          Test Parasite Mapping
        </label>

        <select
          value={selectedParasiteId}
          onChange={(e) => handleParasiteChange(e.target.value)}
          className="w-full mt-2 rounded-lg bg-slate-900 border border-white/10 px-4 py-3 text-sm text-slate-200 outline-none focus:border-blue-400"
        >
          {Object.entries(PARASITE_DATA).map(([id, parasite]) => (
            <option key={id} value={id}>
              {parasite.name}
            </option>
          ))}
        </select>

        <p className="text-xs text-slate-500">
          Later this value will come from the AI model result.
        </p>
      </div>

      <div className="flex items-center justify-between gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-slate-200">
            Life Stage
          </label>

          <span className="px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30 text-sm">
            {STAGE_LABELS[lifeStage] || lifeStage}
          </span>
        </div>

        <div className="flex flex-wrap justify-end gap-2">
          {availableStages.map((stageOption) => (
            <button
              key={stageOption}
              onClick={() => handleStageChange(stageOption)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                lifeStage === stageOption
                  ? "bg-blue-500 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              {STAGE_LABELS[stageOption] || stageOption}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2 p-4 rounded-lg bg-white/5 border border-white/10">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-200">
            Zoom Level
          </label>

          <span className="text-sm text-slate-400">
            {Math.round(modelZoom * 100)}%
          </span>
        </div>

        <input
          type="range"
          min={zoomLimits.min}
          max={zoomLimits.max}
          step={zoomLimits.step}
          value={modelZoom}
          onChange={(e) => setModelZoom(Number(e.target.value))}
          className="w-full h-2 rounded-full bg-slate-700 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-blue-500 [&::-webkit-slider-thumb]:to-purple-500 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gradient-to-r [&::-moz-range-thumb]:from-blue-500 [&::-moz-range-thumb]:to-purple-500 [&::-moz-range-thumb]:border-0"
        />
      </div>

      <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
        <label className="text-sm font-medium text-slate-200">
          Show Internal Structures
        </label>

        <button
          onClick={handleToggleInternalStructures}
          className={`relative w-11 h-6 rounded-full transition-colors ${
            showInternalStructures ? "bg-blue-500" : "bg-slate-600"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
              showInternalStructures ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      <div className="space-y-2 p-4 rounded-lg bg-white/5 border border-white/10">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-200">
            Transparency
          </label>

          <span className="text-sm text-slate-400">{transparency[0]}%</span>
        </div>

        <input
          type="range"
          min={transparencyLimits.min}
          max={transparencyLimits.max}
          step={transparencyLimits.step}
          value={transparency[0]}
          onChange={(e) => setTransparency([parseInt(e.target.value)])}
          className="w-full h-2 rounded-full bg-slate-700 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-blue-500 [&::-webkit-slider-thumb]:to-purple-500 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gradient-to-r [&::-moz-range-thumb]:from-blue-500 [&::-moz-range-thumb]:to-purple-500 [&::-moz-range-thumb]:border-0"
        />
      </div>

      {showAdvancedControls && (
        <>
          <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
            <label className="text-sm font-medium text-slate-200">
              Cross Section
            </label>

            <button
              onClick={() => setCrossSection(!crossSection)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                crossSection ? "bg-blue-500" : "bg-slate-600"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  crossSection ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
            <label className="text-sm font-medium text-slate-200">
              Highlight Mode
            </label>

            <button
              onClick={handleToggleHighlightMode}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                highlightMode ? "bg-blue-500" : "bg-slate-600"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  highlightMode ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </>
      )}

      <div className="space-y-3 p-4 rounded-lg bg-white/5 border border-white/10">
        <label className="text-sm font-medium text-slate-200">
          Quick Focus
        </label>

        {markers.length ? (
          <div className="grid grid-cols-2 gap-2">
            {markers.map((marker) => (
              <button
                key={marker.id}
                onClick={() => handleQuickFocus(marker.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeFocus === marker.id
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                    : "border border-white/20 hover:bg-white/10 text-slate-300"
                }`}
              >
                {marker.label}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400">
            No quick-focus markers have been configured for this stage.
          </p>
        )}
      </div>
    </div>
  );
}
