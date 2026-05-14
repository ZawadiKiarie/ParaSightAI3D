// src/components/threeDView/ui/ModelPreviewCard.jsx

import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { ThreeDCanvas } from "../canvas/ThreeDCanvas";
import { ModelControlsPanel } from "./ModelControlsPanel";

/**
 * Right-side card containing:
 * - the interactive 3D canvas
 * - all model controls
 * - guided learning navigation button
 */
export function ModelPreviewCard({ view }) {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-2xl">
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-lg font-semibold text-slate-200">
              3D Model Preview
            </h3>

            <span className="px-3 py-1 rounded-md border border-purple-500/50 text-purple-300 text-sm">
              Interactive
            </span>
          </div>

          <ThreeDCanvas
            parasiteId={view.selectedParasiteId}
            stage={view.lifeStage}
            modelZoom={view.modelZoom}
            transparency={view.transparency[0]}
            crossSection={view.crossSection}
            highlightMode={view.highlightMode}
            activeFocus={view.activeFocus}
          />

          <ModelControlsPanel
            selectedParasiteId={view.selectedParasiteId}
            lifeStage={view.lifeStage}
            availableStages={view.availableStages}
            markers={view.markers}
            modelZoom={view.modelZoom}
            setModelZoom={view.setModelZoom}
            zoomLimits={view.zoomLimits}
            transparency={view.transparency}
            setTransparency={view.setTransparency}
            transparencyLimits={view.transparencyLimits}
            showInternalStructures={view.showInternalStructures}
            handleToggleInternalStructures={view.handleToggleInternalStructures}
            crossSection={view.crossSection}
            setCrossSection={view.setCrossSection}
            highlightMode={view.highlightMode}
            handleToggleHighlightMode={view.handleToggleHighlightMode}
            activeFocus={view.activeFocus}
            handleParasiteChange={view.handleParasiteChange}
            handleStageChange={view.handleStageChange}
            handleQuickFocus={view.handleQuickFocus}
            showAdvancedControls={false}
          />
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => navigate("/guidedlearning")}
          className="w-full flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-6 text-lg shadow-lg shadow-indigo-500/30 rounded-lg transition-all"
        >
          <Play className="h-5 w-5 mr-2" />
          Start Guided Learning
        </button>
      </div>
    </div>
  );
}
