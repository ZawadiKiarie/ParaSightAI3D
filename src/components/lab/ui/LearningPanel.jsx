// src/components/lab/ui/LearningPanel.jsx

import { X } from "lucide-react";

/**
 * Builds dynamic learning content from the detected parasite result.
 *
 * Exported here so LabSimulation/useLabWorkflow can build content
 * for the LearningPanel based on the AI result.
 */
export const buildLearningContent = (result) => ({
  overview: {
    label: "Overview",
    title: `${result.parasiteName} Learning Summary`,
    body: [
      `This station summarizes the completed diagnostic workflow for ${result.parasiteName}.`,
      `The system prepared a sample, captured a microscopy image, analyzed it using AI, and mapped the result to the ${result.stage} 3D model.`,
      "The goal is to help users connect practical laboratory workflow with AI-assisted interpretation and interactive 3D learning.",
    ],
  },

  diagnosticFeatures: {
    label: "Diagnostic Features",
    title: `Key Features of ${result.parasiteName}`,
    body: result.features.length
      ? result.features.map((feature) => `• ${feature}`)
      : [
          "No diagnostic feature list has been configured for this parasite stage yet.",
        ],
  },

  lifecycle: {
    label: "Lifecycle",
    title: "Parasite Lifecycle Context",
    body: [
      `${result.parasiteName} is currently being shown in the ${result.stage} stage.`,
      "Lifecycle interpretation helps users understand why a specific parasite form may appear in a microscopy sample.",
      "This section can later be expanded with parasite-specific lifecycle diagrams and stage transitions.",
    ],
  },

  comparison: {
    label: "Comparison",
    title: "Comparison and Interpretation",
    body: [
      `The detected parasite is ${result.parasiteName}, with a confidence score of ${result.confidence}%.`,
      "Users should compare shape, internal structures, nuclei, cytoplasm, and other diagnostic features with similar parasites.",
      "The AI result supports interpretation, while the 3D model helps the user understand why the parasite class may have been suggested.",
    ],
  },
});

/**
 * Final learning station panel.
 *
 * Left side: topic buttons.
 * Right side: selected learning content.
 */
export function LearningPanel({
  activeLearningTab,
  setActiveLearningTab,
  learningContent,
  onFinish,
  onClose,
}) {
  const activeContent = learningContent[activeLearningTab];

  if (!activeContent) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm px-4 py-4">
      <div className="relative w-[86vw] max-w-5xl h-[min(760px,calc(100vh-32px))] overflow-hidden bg-black/82 border border-white/10 shadow-2xl text-white">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 text-white/60 hover:text-white transition"
          aria-label="Close learning panel"
        >
          <X size={22} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] h-full min-h-0">
          <div className="border-r border-white/10 bg-white/5 p-6 overflow-y-auto">
            <p className="text-cyan-200/70 text-xs tracking-[0.35em] uppercase mb-4">
              Station 05
            </p>

            <h2 className="text-2xl font-light tracking-[0.15em] uppercase mb-6">
              Guided Learning
            </h2>

            <div className="space-y-3">
              {Object.entries(learningContent).map(([key, item]) => (
                <button
                  key={key}
                  onClick={() => setActiveLearningTab(key)}
                  className={`w-full px-4 py-3 border text-left transition ${
                    activeLearningTab === key
                      ? "border-cyan-200 bg-cyan-300/15 text-cyan-100"
                      : "border-white/10 bg-white/5 text-white/70 hover:border-cyan-200/40"
                  }`}
                >
                  <p className="text-sm tracking-[0.12em] uppercase">
                    {item.label}
                  </p>
                </button>
              ))}
            </div>

            <div className="mt-6 border border-cyan-200/20 bg-cyan-300/5 p-4">
              <p className="text-cyan-100 text-sm leading-relaxed">
                Select a topic to review what you learned during the virtual lab
                workflow.
              </p>
            </div>
          </div>

          <div className="p-7 md:p-8 overflow-y-auto min-h-0">
            <p className="text-cyan-200/70 text-xs tracking-[0.35em] uppercase mb-4">
              Learning Content
            </p>

            <h3 className="text-3xl font-light tracking-[0.12em] uppercase mb-6 pr-12">
              {activeContent.title}
            </h3>

            <div className="space-y-4">
              {activeContent.body.map((paragraph, index) => (
                <div
                  key={index}
                  className="border border-white/10 bg-white/5 p-5"
                >
                  <p className="text-white/75 text-sm md:text-base leading-relaxed">
                    {paragraph}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 border border-cyan-200/20 bg-cyan-300/5 p-5">
              <p className="text-cyan-100 text-sm leading-relaxed">
                When you are done reviewing the learning content, finish the
                session to complete the guided lab experience.
              </p>
            </div>

            <div className="mt-6 mb-2 flex flex-wrap gap-3">
              <button
                onClick={onFinish}
                className="px-6 py-3 border border-cyan-200/40 text-cyan-100 hover:bg-cyan-200 hover:text-black transition"
              >
                Finish Session
              </button>

              <button
                onClick={onClose}
                className="px-6 py-3 border border-white/25 text-white/70 hover:bg-white hover:text-black transition"
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
