import { ArrowLeft, CheckCircle2, Eye, Play, Box } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ThreeDView() {
  const [lifeStage, setLifeStage] = useState("trophozoite");
  const [showInternalStructures, setShowInternalStructures] = useState(true);
  const [transparency, setTransparency] = useState([50]);
  const [crossSection, setCrossSection] = useState(false);
  const [highlightMode, setHighlightMode] = useState(false);
  const [activeFocus, setActiveFocus] = useState(null);
  const navigate = useNavigate();

  const focusButtons = [
    { id: "nucleus", label: "Nucleus" },
    { id: "karyosome", label: "Karyosome" },
    { id: "chromatin", label: "Chromatin" },
    { id: "vacuoles", label: "Vacuoles" },
    { id: "cytoplasm", label: "Cytoplasm" },
    { id: "pseudopodia", label: "Pseudopodia" },
  ];

  const detectionData = {
    parasiteName: "Entamoeba histolytica",
    confidence: 92,
    description:
      "A protozoan parasite that causes amoebic dysentery and liver abscesses. Found in contaminated food and water.",
    diagnosticFeatures: [
      "Ingested red blood cells visible",
      "Irregular cytoplasm with pseudopodia",
      "Single nucleus with central karyosome",
      "Size: 15-20 μm in diameter",
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white">
      {/* Top Bar */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-white/10 backdrop-blur-sm bg-slate-900/50"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors"
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

      {/* Main Content Area */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* LEFT PANEL - Microscopic Image & Detection Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {/* Microscopic Image */}
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-2xl">
              <h3 className="text-lg font-semibold text-slate-200 mb-4">
                Microscopic Image
              </h3>
              <div className="relative aspect-square rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-white/20 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1705912110381-b5b7d565fcf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJhc2l0ZSUyMG1pY3Jvc2NvcGV8ZW58MXx8fHwxNzc3ODE5NjYzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Microscopic view of Entamoeba histolytica"
                  className="w-full h-full object-cover"
                />
                {/* Detection Overlay Indicators */}
                <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-green-500/90 backdrop-blur-sm border border-green-400/50 text-xs font-semibold text-white shadow-lg">
                  Detected
                </div>
                <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-white/20 text-xs text-white">
                  15-20 μm
                </div>
              </div>
            </div>

            {/* Detection Summary Card */}
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-2xl">
              <div className="space-y-6">
                <div>
                  <h2 className="text-sm font-medium text-slate-400 mb-4">
                    Detection Summary
                  </h2>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    {detectionData.parasiteName}
                  </h3>
                </div>

                {/* Confidence Score */}
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
                    ></div>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-md bg-green-500/20 text-green-300 border border-green-500/30 text-sm">
                      High Confidence
                    </span>
                    <span className="px-3 py-1 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30 text-sm">
                      Verified
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="pt-4 border-t border-white/10">
                  <p className="text-slate-300 leading-relaxed">
                    {detectionData.description}
                  </p>
                </div>

                {/* Diagnostic Features */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-slate-200 flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-blue-400"></div>
                    Key Diagnostic Features
                  </h4>
                  <ul className="space-y-2">
                    {detectionData.diagnosticFeatures.map((feature, index) => (
                      <motion.li
                        key={index}
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
                </div>

                {/* Primary Action in Card */}
                {/* <div className="pt-4">
                  <button className="w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-6 text-lg shadow-lg shadow-purple-500/30 rounded-lg transition-all">
                    <Eye className="h-5 w-5 mr-2" />
                    View Full 3D Learning
                  </button>
                </div> */}
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE - 3D Preview Area */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* 3D Preview Card */}
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-200">
                    3D Model Preview
                  </h3>
                  <span className="px-3 py-1 rounded-md border border-purple-500/50 text-purple-300 text-sm">
                    Interactive
                  </span>
                </div>

                {/* 3D Preview Container */}
                <div className="relative aspect-square rounded-xl bg-gradient-to-br from-slate-800/50 to-indigo-900/50 border border-white/10 overflow-hidden">
                  {/* Background grid effect */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `
                      linear-gradient(to right, rgba(99, 102, 241, 0.3) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(99, 102, 241, 0.3) 1px, transparent 1px)
                    `,
                      backgroundSize: "30px 30px",
                    }}
                  ></div>

                  {/* 3D Model Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{
                        rotateY: 360,
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        rotateY: {
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear",
                        },
                        scale: {
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      }}
                      className="relative w-64 h-64"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* Stylized 3D Cell Representation */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/40 to-blue-500/40 backdrop-blur-sm border-2 border-purple-400/50 shadow-2xl shadow-purple-500/50">
                        {/* Inner nucleus */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 shadow-lg shadow-blue-500/50"></div>

                        {/* Pseudopodia-like extensions */}
                        <motion.div
                          animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.7, 0.9, 0.7],
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="absolute -top-8 left-1/4 w-20 h-20 rounded-full bg-purple-500/30 blur-xl"
                        />
                        <motion.div
                          animate={{
                            scale: [1, 1.15, 1],
                            opacity: [0.6, 0.8, 0.6],
                          }}
                          transition={{ duration: 2.5, repeat: Infinity }}
                          className="absolute -bottom-6 right-1/4 w-24 h-24 rounded-full bg-blue-500/30 blur-xl"
                        />
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.7, 0.5],
                          }}
                          transition={{ duration: 3.5, repeat: Infinity }}
                          className="absolute top-1/3 -right-8 w-20 h-20 rounded-full bg-indigo-500/30 blur-xl"
                        />
                      </div>
                    </motion.div>
                  </div>

                  {/* Floating Labels */}
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-xs text-white">
                    Rotating Preview
                  </div>
                </div>

                {/* Controls */}
                <div className="space-y-4 pt-2">
                  {/* Life Stage Toggle */}
                  <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3">
                      <label
                        htmlFor="life-stage"
                        className="text-sm font-medium text-slate-200"
                      >
                        Life Stage
                      </label>
                      <span className="px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30 text-sm">
                        {lifeStage === "cyst" ? "Cyst" : "Trophozoite"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400">Cyst</span>
                      <button
                        id="life-stage"
                        onClick={() =>
                          setLifeStage(
                            lifeStage === "trophozoite"
                              ? "cyst"
                              : "trophozoite",
                          )
                        }
                        className={`relative w-11 h-6 rounded-full transition-colors ${
                          lifeStage === "trophozoite"
                            ? "bg-blue-500"
                            : "bg-slate-600"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                            lifeStage === "trophozoite"
                              ? "translate-x-5"
                              : "translate-x-0"
                          }`}
                        ></span>
                      </button>
                      <span className="text-xs text-slate-400">
                        Trophozoite
                      </span>
                    </div>
                  </div>

                  {/* Zoom Indicator */}
                  <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-sm font-medium text-slate-200">
                      Zoom Level
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 rounded-full bg-slate-700">
                        <div className="w-2/3 h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                      </div>
                      <span className="text-sm text-slate-400">66%</span>
                    </div>
                  </div>

                  {/* Show Internal Structures */}
                  <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                    <label
                      htmlFor="internal-structures"
                      className="text-sm font-medium text-slate-200"
                    >
                      Show Internal Structures
                    </label>
                    <button
                      id="internal-structures"
                      onClick={() =>
                        setShowInternalStructures(!showInternalStructures)
                      }
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        showInternalStructures ? "bg-blue-500" : "bg-slate-600"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                          showInternalStructures
                            ? "translate-x-5"
                            : "translate-x-0"
                        }`}
                      ></span>
                    </button>
                  </div>

                  {/* Transparency Slider */}
                  <div className="space-y-2 p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-slate-200">
                        Transparency
                      </label>
                      <span className="text-sm text-slate-400">
                        {transparency[0]}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={transparency[0]}
                      onChange={(e) =>
                        setTransparency([parseInt(e.target.value)])
                      }
                      className="w-full h-2 rounded-full bg-slate-700 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-blue-500 [&::-webkit-slider-thumb]:to-purple-500 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gradient-to-r [&::-moz-range-thumb]:from-blue-500 [&::-moz-range-thumb]:to-purple-500 [&::-moz-range-thumb]:border-0"
                    />
                  </div>

                  {/* Cross Section */}
                  <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                    <label
                      htmlFor="cross-section"
                      className="text-sm font-medium text-slate-200"
                    >
                      Cross Section
                    </label>
                    <button
                      id="cross-section"
                      onClick={() => setCrossSection(!crossSection)}
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        crossSection ? "bg-blue-500" : "bg-slate-600"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                          crossSection ? "translate-x-5" : "translate-x-0"
                        }`}
                      ></span>
                    </button>
                  </div>

                  {/* Highlight Mode */}
                  <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                    <label
                      htmlFor="highlight-mode"
                      className="text-sm font-medium text-slate-200"
                    >
                      Highlight Mode
                    </label>
                    <button
                      id="highlight-mode"
                      onClick={() => setHighlightMode(!highlightMode)}
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        highlightMode ? "bg-blue-500" : "bg-slate-600"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                          highlightMode ? "translate-x-5" : "translate-x-0"
                        }`}
                      ></span>
                    </button>
                  </div>

                  {/* Quick Focus Buttons */}
                  <div className="space-y-3 p-4 rounded-lg bg-white/5 border border-white/10">
                    <label className="text-sm font-medium text-slate-200">
                      Quick Focus
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {focusButtons.map((button) => (
                        <button
                          key={button.id}
                          onClick={() =>
                            setActiveFocus(
                              activeFocus === button.id ? null : button.id,
                            )
                          }
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            activeFocus === button.id
                              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                              : "border border-white/20 hover:bg-white/10 text-slate-300"
                          }`}
                        >
                          {button.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Area */}
            <div className="space-y-3">
              <button
                onClick={() => navigate("/guidedlearning")}
                className="w-full flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-6 text-lg shadow-lg shadow-indigo-500/30 rounded-lg transition-all"
              >
                <Play className="h-5 w-5 mr-2" />
                Start Guided Learning
              </button>
              {/* <button className="w-full flex items-center justify-center border border-white/20 hover:bg-white/10 text-white font-semibold py-6 text-lg rounded-lg transition-all">
                <Box className="h-5 w-5 mr-2" />
                Explore in 3D
              </button> */}
            </div>
          </motion.div>
        </div>

        {/* Bottom Info Banner */}
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
                    Engage with the full 3D model to understand structure, life
                    cycle, and diagnostic features
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
