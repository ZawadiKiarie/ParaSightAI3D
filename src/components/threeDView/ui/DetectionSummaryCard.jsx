// src/components/threeDView/ui/DetectionSummaryCard.jsx

import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { STAGE_LABELS } from "../../ParasiteConfig";

/**
 * Shows the AI detection summary:
 * - parasite name
 * - life stage
 * - confidence score
 * - description
 * - diagnostic feature list
 */
export function DetectionSummaryCard({ detectionData, lifeStage }) {
  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-2xl">
      <div className="space-y-6">
        <div>
          <h2 className="text-sm font-medium text-slate-400 mb-4">
            Detection Summary
          </h2>

          <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            {detectionData.parasiteName}
          </h3>

          <p className="text-sm text-slate-400">
            Life stage:{" "}
            <span className="text-blue-300">
              {STAGE_LABELS[lifeStage] || lifeStage}
            </span>
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-300">
              Confidence Score
            </span>

            <span className="text-2xl font-bold text-green-400">
              {detectionData.confidence}%
            </span>
          </div>

          <div className="h-3 w-full rounded-full bg-slate-700 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
              style={{ width: `${detectionData.confidence}%` }}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-md bg-green-500/20 text-green-300 border border-green-500/30 text-sm">
              High Confidence
            </span>

            <span className="px-3 py-1 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30 text-sm">
              AI-Mapped 3D Model
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10">
          <p className="text-slate-300 leading-relaxed">
            {detectionData.description}
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-slate-200 flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-blue-400" />
            Key Diagnostic Features
          </h4>

          {detectionData.diagnosticFeatures?.length ? (
            <ul className="space-y-2">
              {detectionData.diagnosticFeatures.map((feature, index) => (
                <motion.li
                  key={`${feature}-${index}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3 text-sm text-slate-300"
                >
                  <CheckCircle2 className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-400">
              No diagnostic features have been configured for this stage yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
