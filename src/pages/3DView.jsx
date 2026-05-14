import { ArrowLeft, CheckCircle2, Play, Box } from "lucide-react";
import { motion } from "motion/react";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Center, Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useSetAtom } from "jotai";

import {
  PARASITE_DATA,
  getAvailableStages,
  STAGE_LABELS,
} from "../components/ParasiteConfig";

import {
  parasiteAtom,
  stageAtom,
  viewAtom,
  hoveredMarkerAtom,
  focusedMarkerIdAtom,
  focusedFeatureIndexAtom,
  infoSectionAtom,
} from "../store/Store";

/**
 * This alias map is your AI-to-3D mapping layer.
 * Later, when your AI returns "Giardia lamblia", "cyst", etc.,
 * this function will convert that AI output into the correct 3D model key.
 */
const PARASITE_ALIASES = {
  "entamoeba histolytica": "EntamoebaHystolytica",
  "entamoeba hystolytica": "EntamoebaHystolytica",
  "e. histolytica": "EntamoebaHystolytica",

  "entamoeba hartmanni": "EntamoebaHartmanni",
  "e. hartmanni": "EntamoebaHartmanni",

  "entamoeba coli": "EntamoebaColi",
  "e. coli": "EntamoebaColi",

  "giardia lamblia": "GiardiaLamblia",
  giardia: "GiardiaLamblia",
  "g. lamblia": "GiardiaLamblia",

  blastocystis: "BlastoCystis",
  "blastocystis spp": "BlastoCystis",
  "blastocystis spp.": "BlastoCystis",

  cryptosporidium: "CryptoSporidium",
  "cryptosporidium spp": "CryptoSporidium",
  "cryptosporidium spp.": "CryptoSporidium",

  "cystoisospora belli": "CystoisosporaBelli",
  cystoisospora: "CystoisosporaBelli",
  "isospora belli": "CystoisosporaBelli",

  "dientamoeba fragilis": "DientamoebaFragilis",
  dientamoeba: "DientamoebaFragilis",
};

const normalizeText = (value = "") =>
  String(value).trim().toLowerCase().replace(/\s+/g, " ");

const resolveParasiteId = (parasiteNameOrId) => {
  if (!parasiteNameOrId) return "EntamoebaHystolytica";

  if (PARASITE_DATA[parasiteNameOrId]) {
    return parasiteNameOrId;
  }

  const normalized = normalizeText(parasiteNameOrId);
  return PARASITE_ALIASES[normalized] || "EntamoebaHystolytica";
};

const resolveStage = (parasiteId, requestedStage) => {
  const availableStages = getAvailableStages(parasiteId);

  if (!availableStages.length) return null;

  const normalizedStage = normalizeText(requestedStage);

  if (availableStages.includes(normalizedStage)) {
    return normalizedStage;
  }

  return availableStages[0];
};

const getOuterFeatureId = (markers = []) => {
  const outerKeywords = [
    "body",
    "wall",
    "shape",
    "cytoplasm",
    "oocyst",
    "cystwall",
    "oocystwall",
    "oocystshape",
  ];

  const outerMarker = markers.find((marker) => {
    const id = normalizeText(marker.id);
    const label = normalizeText(marker.label);

    return outerKeywords.some(
      (keyword) => id.includes(keyword) || label.includes(keyword),
    );
  });

  return outerMarker?.id || markers[0]?.id || null;
};

function ParasiteModelPreview({
  parasiteId,
  stage,
  modelZoom,
  transparency,
  crossSection,
}) {
  const groupRef = useRef();

  const stageData = PARASITE_DATA[parasiteId]?.[stage];
  const modelComponent = stageData?.Component;

  const baseScale = stageData?.scale ?? stageData?.listScale ?? 1.4;
  const finalScale = baseScale * modelZoom;

  const clippingPlane = useMemo(
    () => new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0),
    [],
  );

  useEffect(() => {
    if (!groupRef.current) return;

    const opacity = THREE.MathUtils.clamp(transparency / 100, 0.15, 1);

    groupRef.current.traverse((child) => {
      if (!child.isMesh && !child.isSkinnedMesh) return;

      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];

      materials.forEach((mat) => {
        if (!mat) return;

        mat.transparent = true;

        /**
         * Some of your custom shader materials use uniforms for opacity.
         * Normal materials use mat.opacity.
         */
        if (mat.uniforms?.opacity) {
          mat.uniforms.opacity.value = opacity;
        } else {
          mat.opacity = opacity;
        }

        mat.clippingPlanes = crossSection ? [clippingPlane] : [];
        mat.clipIntersection = false;
        mat.needsUpdate = true;
      });
    });
  }, [transparency, crossSection, clippingPlane, parasiteId, stage]);

  if (!modelComponent) return null;

  return (
    <group ref={groupRef} scale={finalScale}>
      <Center>{modelComponent}</Center>
    </group>
  );
}

function ThreeDCanvas({
  parasiteId,
  stage,
  modelZoom,
  transparency,
  crossSection,
  highlightMode,
}) {
  return (
    <div className="relative aspect-square rounded-xl bg-gradient-to-br from-slate-800/50 to-indigo-900/50 border border-white/10 overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(99, 102, 241, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px",
        }}
      />

      <Canvas
        camera={{ position: [0, 1.4, 6], fov: 38 }}
        gl={{ alpha: true }}
        onCreated={({ gl }) => {
          gl.localClippingEnabled = true;
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.2} />
          <directionalLight position={[4, 5, 6]} intensity={1.8} />
          <pointLight position={[-4, 2, -4]} intensity={1.2} color="#60a5fa" />

          <Environment preset="city" />

          <group position={[0, 0, 0]}>
            <ParasiteModelPreview
              parasiteId={parasiteId}
              stage={stage}
              modelZoom={modelZoom}
              transparency={transparency}
              crossSection={crossSection}
            />
          </group>

          {highlightMode && (
            <mesh position={[0, -1.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[1.3, 1.36, 96]} />
              <meshBasicMaterial
                color="#60a5fa"
                transparent
                opacity={0.55}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
              />
            </mesh>
          )}

          {crossSection && (
            <mesh position={[0, 0.35, 0]} rotation={[0, Math.PI / 2, 0]}>
              <planeGeometry args={[3.5, 3.5]} />
              <meshBasicMaterial
                color="#22d3ee"
                transparent
                opacity={0.14}
                side={THREE.DoubleSide}
                depthWrite={false}
              />
            </mesh>
          )}

          <OrbitControls
            enableDamping
            dampingFactor={0.08}
            enablePan={false}
            minDistance={2.2}
            maxDistance={9}
          />
        </Suspense>
      </Canvas>

      <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-xs text-white">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
}

/**
 * You can test using props:
 *
 * <ThreeDView parasiteName="GiardiaLamblia" initialStage="cyst" />
 *
 * Later, use aiResult:
 *
 * <ThreeDView
 *   aiResult={{
 *     parasiteName: "Giardia lamblia",
 *     stage: "cyst",
 *     confidence: 92,
 *   }}
 * />
 */
export default function ThreeDView({
  parasiteName = "EntamoebaHystolytica",
  initialStage = "trophozoite",
  aiResult = null,
}) {
  const navigate = useNavigate();

  const aiParasiteName = aiResult?.parasiteId || aiResult?.parasiteName;
  const aiStage = aiResult?.stage;
  const aiConfidence = aiResult?.confidence;

  const initialParasiteId = resolveParasiteId(aiParasiteName || parasiteName);
  const safeInitialStage = resolveStage(
    initialParasiteId,
    aiStage || initialStage,
  );

  const [selectedParasiteId, setSelectedParasiteId] =
    useState(initialParasiteId);
  const [lifeStage, setLifeStage] = useState(safeInitialStage);

  const [showInternalStructures, setShowInternalStructures] = useState(true);
  const [transparency, setTransparency] = useState([75]);
  const [crossSection, setCrossSection] = useState(false);
  const [highlightMode, setHighlightMode] = useState(false);
  const [activeFocus, setActiveFocus] = useState(null);
  const [modelZoom, setModelZoom] = useState(1);

  const setParasiteAtom = useSetAtom(parasiteAtom);
  const setStageAtom = useSetAtom(stageAtom);
  const setView = useSetAtom(viewAtom);
  const setHoveredMarker = useSetAtom(hoveredMarkerAtom);
  const setFocusedMarkerId = useSetAtom(focusedMarkerIdAtom);
  const setFocusedFeatureIndex = useSetAtom(focusedFeatureIndexAtom);
  const setInfoSection = useSetAtom(infoSectionAtom);

  const availableStages = getAvailableStages(selectedParasiteId);

  const stageData = PARASITE_DATA[selectedParasiteId]?.[lifeStage];
  const parasiteData = PARASITE_DATA[selectedParasiteId];

  const detectionData = {
    parasiteName: parasiteData?.name || "Unknown Parasite",
    confidence: aiConfidence ?? 92,
    description:
      aiResult?.description ||
      `${parasiteData?.name || "This parasite"} has been mapped to its available 3D model for interactive visualization and diagnostic feature inspection.`,
    diagnosticFeatures: stageData?.features || [],
  };

  const markers = stageData?.markers || [];

  useEffect(() => {
    const resolvedStage = resolveStage(selectedParasiteId, lifeStage);

    if (resolvedStage !== lifeStage) {
      setLifeStage(resolvedStage);
      setActiveFocus(null);
    }
  }, [selectedParasiteId, lifeStage]);

  useEffect(() => {
    setParasiteAtom(selectedParasiteId);
    setStageAtom(lifeStage);

    if (!activeFocus) {
      setFocusedMarkerId(null);
      setHoveredMarker(null);
      setFocusedFeatureIndex(0);
      setInfoSection("overview");
      setView("LIST");
    }
  }, [
    selectedParasiteId,
    lifeStage,
    activeFocus,
    setParasiteAtom,
    setStageAtom,
    setFocusedMarkerId,
    setHoveredMarker,
    setFocusedFeatureIndex,
    setInfoSection,
    setView,
  ]);

  useEffect(() => {
    return () => {
      setFocusedMarkerId(null);
      setHoveredMarker(null);
      setFocusedFeatureIndex(0);
      setInfoSection("overview");
      setView("HOME");
    };
  }, [
    setFocusedMarkerId,
    setHoveredMarker,
    setFocusedFeatureIndex,
    setInfoSection,
    setView,
  ]);

  const handleStageChange = (nextStage) => {
    setLifeStage(nextStage);
    setActiveFocus(null);
    setShowInternalStructures(true);
  };

  const handleQuickFocus = (markerId) => {
    const nextMarkerId = activeFocus === markerId ? null : markerId;

    setActiveFocus(nextMarkerId);

    if (!nextMarkerId) {
      setFocusedMarkerId(null);
      setHoveredMarker(null);
      setFocusedFeatureIndex(0);
      setInfoSection("overview");
      setView("LIST");
      return;
    }

    const markerIndex = markers.findIndex((marker) => marker.id === markerId);

    setFocusedMarkerId(nextMarkerId);
    setHoveredMarker(highlightMode ? nextMarkerId : null);
    setFocusedFeatureIndex(markerIndex >= 0 ? markerIndex : 0);
    setInfoSection("overview");
    setView("ISOLATED");
  };

  const handleToggleInternalStructures = () => {
    const nextValue = !showInternalStructures;
    setShowInternalStructures(nextValue);

    if (nextValue) {
      setActiveFocus(null);
      setFocusedMarkerId(null);
      setHoveredMarker(null);
      setFocusedFeatureIndex(0);
      setInfoSection("overview");
      setView("LIST");
      return;
    }

    const outerFeatureId = getOuterFeatureId(markers);

    if (outerFeatureId) {
      const markerIndex = markers.findIndex(
        (marker) => marker.id === outerFeatureId,
      );

      setActiveFocus(outerFeatureId);
      setFocusedMarkerId(outerFeatureId);
      setHoveredMarker(null);
      setFocusedFeatureIndex(markerIndex >= 0 ? markerIndex : 0);
      setInfoSection("overview");
      setView("ISOLATED");
    }
  };

  const handleToggleHighlightMode = () => {
    const nextValue = !highlightMode;
    setHighlightMode(nextValue);

    if (nextValue && activeFocus) {
      setHoveredMarker(activeFocus);
    } else {
      setHoveredMarker(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-white/10 backdrop-blur-sm bg-slate-900/50"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-6">
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

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-2xl">
              <h3 className="text-lg font-semibold text-slate-200 mb-4">
                Microscopic Image
              </h3>

              <div className="relative aspect-square rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-white/20 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1705912110381-b5b7d565fcf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJhc2l0ZSUyMG1pY3Jvc2NvcGV8ZW58MXx8fHwxNzc3ODE5NjYzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt={`Microscopic view of ${detectionData.parasiteName}`}
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-green-500/90 backdrop-blur-sm border border-green-400/50 text-xs font-semibold text-white shadow-lg">
                  Detected
                </div>

                <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-white/20 text-xs text-white">
                  {lifeStage}
                </div>
              </div>
            </div>

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

                  <div className="flex gap-2">
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

                  <ul className="space-y-2">
                    {detectionData.diagnosticFeatures.map((feature, index) => (
                      <motion.li
                        key={feature}
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
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
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
                  parasiteId={selectedParasiteId}
                  stage={lifeStage}
                  modelZoom={modelZoom}
                  transparency={transparency[0]}
                  crossSection={crossSection}
                  highlightMode={highlightMode}
                />

                <div className="space-y-4 pt-2">
                  <div className="space-y-2 p-4 rounded-lg bg-white/5 border border-white/10">
                    <label className="text-sm font-medium text-slate-200">
                      Test Parasite Mapping
                    </label>

                    <select
                      value={selectedParasiteId}
                      onChange={(e) => {
                        setSelectedParasiteId(e.target.value);
                        setActiveFocus(null);
                      }}
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

                  <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
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
                      min="0.5"
                      max="2.4"
                      step="0.05"
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
                          showInternalStructures
                            ? "translate-x-5"
                            : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

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
                      min="20"
                      max="100"
                      step="1"
                      value={transparency[0]}
                      onChange={(e) =>
                        setTransparency([parseInt(e.target.value)])
                      }
                      className="w-full h-2 rounded-full bg-slate-700 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-blue-500 [&::-webkit-slider-thumb]:to-purple-500 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gradient-to-r [&::-moz-range-thumb]:from-blue-500 [&::-moz-range-thumb]:to-purple-500 [&::-moz-range-thumb]:border-0"
                    />
                  </div>

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

                  <div className="space-y-3 p-4 rounded-lg bg-white/5 border border-white/10">
                    <label className="text-sm font-medium text-slate-200">
                      Quick Focus
                    </label>

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
                  </div>
                </div>
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
          </motion.div>
        </div>

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
                    The AI result has been mapped to the correct 3D parasite
                    model and life stage.
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
