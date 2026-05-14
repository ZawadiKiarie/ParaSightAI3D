// src/components/threeDView/config/threeDViewMapper.js

import { PARASITE_DATA, getAvailableStages } from "../../ParasiteConfig";

import {
  DEFAULT_3D_VIEW_RESULT,
  OUTER_FEATURE_KEYWORDS,
} from "./threeDViewConstants";

/**
 * This file is the AI-to-3D mapping layer for the standalone 3D View page.
 *
 * It converts AI-friendly names like:
 * "Giardia lamblia"
 *
 * into internal model IDs like:
 * "GiardiaLamblia"
 *
 * This makes the page easy to connect to the real AI model later.
 */

export const PARASITE_ALIASES = {
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

/**
 * Normalizes text so different input formats can still match.
 *
 * Example:
 * "  Giardia   Lamblia  " becomes "giardia lamblia"
 */
export const normalizeText = (value = "") =>
  String(value).trim().toLowerCase().replace(/\s+/g, " ");

/**
 * Converts either an internal parasite ID or a display/AI name
 * into the correct key used inside PARASITE_DATA.
 */
export const resolveParasiteId = (parasiteNameOrId) => {
  if (!parasiteNameOrId) {
    return resolveParasiteId(DEFAULT_3D_VIEW_RESULT.parasiteName);
  }

  // Already an internal ParasiteConfig key.
  if (PARASITE_DATA[parasiteNameOrId]) {
    return parasiteNameOrId;
  }

  const normalized = normalizeText(parasiteNameOrId);

  return (
    PARASITE_ALIASES[normalized] ||
    resolveParasiteId(DEFAULT_3D_VIEW_RESULT.parasiteName)
  );
};

/**
 * Resolves the requested life stage.
 *
 * If the requested stage does not exist for that parasite,
 * we fall back to the first available stage for that parasite.
 */
export const resolveStage = (parasiteId, requestedStage) => {
  const availableStages = getAvailableStages(parasiteId);

  if (!availableStages.length) return null;

  const normalizedStage = normalizeText(requestedStage);

  if (availableStages.includes(normalizedStage)) {
    return normalizedStage;
  }

  return availableStages[0];
};

/**
 * Finds a marker that represents the "outer" or general body feature.
 *
 * This is used by the "Show Internal Structures" toggle:
 * - ON: show full model
 * - OFF: isolate the outer/body/wall/cytoplasm feature if available
 */
export const getOuterFeatureId = (markers = []) => {
  const outerMarker = markers.find((marker) => {
    const id = normalizeText(marker.id);
    const label = normalizeText(marker.label);

    return OUTER_FEATURE_KEYWORDS.some(
      (keyword) => id.includes(keyword) || label.includes(keyword),
    );
  });

  return outerMarker?.id || markers[0]?.id || null;
};

/**
 * Creates the detection summary data shown on the 3D View page.
 *
 * This keeps the page UI independent from the raw AI result.
 */
export const buildThreeDDetectionData = ({
  parasiteId,
  stage,
  aiResult = null,
}) => {
  const parasiteData = PARASITE_DATA[parasiteId];
  const stageData = parasiteData?.[stage];

  return {
    parasiteName: parasiteData?.name || "Unknown Parasite",
    confidence: aiResult?.confidence ?? DEFAULT_3D_VIEW_RESULT.confidence,
    microscopeImage:
      aiResult?.microscopeImage || DEFAULT_3D_VIEW_RESULT.microscopeImage,
    description:
      aiResult?.description ||
      `${parasiteData?.name || "This parasite"} has been mapped to its available 3D model for interactive visualization and diagnostic feature inspection.`,
    diagnosticFeatures: stageData?.features || [],
  };
};

/**
 * Builds the initial resolved state for the 3D View page.
 *
 * This allows the page to support:
 * 1. manual props for testing
 * 2. future AI result integration
 */
export const buildInitialThreeDViewState = ({
  parasiteName,
  initialStage,
  aiResult,
}) => {
  const aiParasiteName = aiResult?.parasiteId || aiResult?.parasiteName;
  const aiStage = aiResult?.stage;

  const parasiteId = resolveParasiteId(
    aiParasiteName || parasiteName || DEFAULT_3D_VIEW_RESULT.parasiteName,
  );

  const stage = resolveStage(
    parasiteId,
    aiStage || initialStage || DEFAULT_3D_VIEW_RESULT.stage,
  );

  return {
    parasiteId,
    stage,
  };
};
