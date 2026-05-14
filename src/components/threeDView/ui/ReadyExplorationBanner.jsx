// src/components/threeDView/ui/ReadyExplorationBanner.jsx

import { Box } from "lucide-react";
import { motion } from "motion/react";

/**
 * Bottom confirmation banner showing that the AI result has been mapped
 * to the correct 3D model and life stage.
 */
export function ReadyExplorationBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mt-8 max-w-7xl mx-auto"
    >
      <div className="rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-blue-500/20">
              <Box className="h-6 w-6 text-blue-400" />
            </div>

            <div>
              <p className="font-semibold text-white">
                Ready for Interactive Exploration
              </p>

              <p className="text-sm text-slate-400">
                The AI result has been mapped to the correct 3D parasite model
                and life stage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
