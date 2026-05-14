// src/pages/3DView.jsx

import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

import { useThreeDViewState } from "../components/threeDView/hooks/useThreeDViewState";

import { ThreeDViewHeader } from "../components/threeDView/ui/ThreeDViewHeader";
import { MicroscopicImageCard } from "../components/threeDView/ui/MicroscopicImageCard";
import { DetectionSummaryCard } from "../components/threeDView/ui/DetectionSummaryCard";
import { ModelPreviewCard } from "../components/threeDView/ui/ModelPreviewCard";
import { ReadyExplorationBanner } from "../components/threeDView/ui/ReadyExplorationBanner";

/**
 * 3DView is the standalone AI-to-3D visualization page.
 *
 * This page is now mainly responsible for layout.
 *
 * The actual responsibilities are separated:
 * - useThreeDViewState:
 *   handles selected parasite, life stage, controls, quick focus,
 *   and guided-learning atom synchronization.
 *
 * - threeDView/config:
 *   handles AI result mapping to parasite ID and life stage.
 *
 * - threeDView/canvas:
 *   renders the real interactive 3D parasite model.
 *
 * - threeDView/ui:
 *   renders the visible page sections and controls.
 *
 * You can test manually with props:
 *
 * <ThreeDView parasiteName="Giardia lamblia" initialStage="cyst" />
 *
 * Later, when connecting the AI model, pass:
 *
 * <ThreeDView
 *   aiResult={{
 *     parasiteName: "Giardia lamblia",
 *     stage: "cyst",
 *     confidence: 92,
 *     microscopeImage: "/uploads/result-image.png",
 *     description: "AI detected Giardia lamblia cyst from the uploaded image.",
 *   }}
 * />
 */
export default function ThreeDView({
  parasiteName = "EntamoebaHystolytica",
  initialStage = "trophozoite",
  aiResult = null,
}) {
  const navigate = useNavigate();

  const view = useThreeDViewState({
    parasiteName,
    initialStage,
    aiResult,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white">
      <ThreeDViewHeader
        detectionData={view.detectionData}
        onBack={() => navigate(-1)}
      />

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <MicroscopicImageCard
              image={view.microscopeImage}
              parasiteName={view.detectionData.parasiteName}
              lifeStage={view.lifeStage}
            />

            <DetectionSummaryCard
              detectionData={view.detectionData}
              lifeStage={view.lifeStage}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ModelPreviewCard view={view} />
          </motion.div>
        </div>

        <ReadyExplorationBanner />
      </div>
    </div>
  );
}
