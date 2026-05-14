// src/components/threeDView/ui/ThreeDViewHeader.jsx

import { ArrowLeft, Box, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

/**
 * Top header for the 3D View page.
 *
 * Shows:
 * - back button
 * - page title
 * - detected parasite
 * - confidence badge
 */
export function ThreeDViewHeader({ detectionData, onBack }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b border-white/10 backdrop-blur-sm bg-slate-900/50"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <Box className="h-6 w-6 text-blue-400" />
              <h1 className="text-xl font-semibold">3D Visualization</h1>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-sm text-slate-400">Detected Parasite</p>

              <p className="font-semibold text-lg">
                {detectionData.parasiteName}
              </p>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
              <CheckCircle2 className="h-5 w-5 text-green-400" />

              <span className="font-semibold text-lg">
                {detectionData.confidence}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
