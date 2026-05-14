// src/components/lab/config/labResultMapper.js

import { PARASITE_DATA } from "../../ParasiteConfig";
import { DEFAULT_LAB_RESULT, LAB_STAGE_ORDER } from "./labConstants";

/**
 * This file is the AI-to-3D mapping layer.
 *
 * Its job:
 * 1. Receive an AI result or test result.
 * 2. Resolve the parasite name into the internal ParasiteConfig key.
 * 3. Resolve the life stage into a stage that actually exists for that parasite.
 * 4. Return all data needed by the lab:
 *    - parasiteId
 *    - parasiteName
 *    - stage
 *    - confidence
 *    - microscopeImage
 *    - diagnostic features
 *    - markers
 *    - 3D stage data
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

export const normalizeText = (value = "") => {
  return String(value).trim().toLowerCase().replace(/\s+/g, " ");
};

/**
 * Converts either:
 * - an internal parasite ID like "GiardiaLamblia"
 * - or an AI/display name like "Giardia lamblia"
 *
 * into the correct ParasiteConfig key.
 */
export const resolveParasiteId = (parasiteNameOrId) => {
  if (!parasiteNameOrId) {
    return resolveParasiteId(DEFAULT_LAB_RESULT.parasiteName);
  }

  // Already an internal key from ParasiteConfig
  if (PARASITE_DATA[parasiteNameOrId]) {
    return parasiteNameOrId;
  }

  const normalized = normalizeText(parasiteNameOrId);

  return (
    PARASITE_ALIASES[normalized] ||
    resolveParasiteId(DEFAULT_LAB_RESULT.parasiteName)
  );
};

/**
 * Gets only the life stages that actually exist for a parasite.
 * Example:
 * Giardia may have trophozoite and cyst.
 * Cryptosporidium may have oocyst only.
 */
export const getAvailableLabStages = (parasiteId) => {
  const parasite = PARASITE_DATA[parasiteId];

  if (!parasite) return [];

  return LAB_STAGE_ORDER.filter((stage) => parasite[stage]);
};

/**
 * Resolves the requested life stage.
 *
 * If the requested stage does not exist for that parasite,
 * it falls back to the first available stage.
 */
export const resolveStage = (parasiteId, requestedStage) => {
  const availableStages = getAvailableLabStages(parasiteId);

  if (!availableStages.length) return null;

  const normalizedStage = normalizeText(requestedStage);

  if (availableStages.includes(normalizedStage)) {
    return normalizedStage;
  }

  return availableStages[0];
};

/**
 * Builds the final lab result object used by:
 * - microscope station
 * - AI analysis panel
 * - 3D chamber
 * - learning panel
 */
export const buildLabDetectionResult = (result = {}) => {
  const mergedResult = {
    ...DEFAULT_LAB_RESULT,
    ...result,
  };

  const resolvedParasiteId = resolveParasiteId(
    mergedResult.parasiteId || mergedResult.parasiteName,
  );

  const resolvedStage = resolveStage(resolvedParasiteId, mergedResult.stage);

  const parasiteData = PARASITE_DATA[resolvedParasiteId];
  const stageData = parasiteData?.[resolvedStage];

  return {
    parasiteId: resolvedParasiteId,
    parasiteName: parasiteData?.name || mergedResult.parasiteName,
    stage: resolvedStage,
    confidence: mergedResult.confidence,
    location: mergedResult.location,
    microscopeImage: mergedResult.microscopeImage,

    // These come directly from ParasiteConfig for the selected parasite/stage
    features: stageData?.features || [],
    markers: stageData?.markers || [],
    stageData,
  };
};
