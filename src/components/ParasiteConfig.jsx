import { BCVacuole } from "./parasites/BlastoCystis/vacuole/BCVacuole";
import { BlastoCystisCyst } from "./parasites/BlastoCystis/cyst/BCCyst";
import { CryptoSporidiumOocyst } from "./parasites/CryptoSporidium/Oocyst/CryptoSprodiumOocyst";
import { CBOocyst } from "./parasites/CystoisosporaBelli/oocyst/CystoisosporaBelliOocyst";
import { DFTrophozoite } from "./parasites/DientameobaFragilis/trophozoite/DFTrophozoite";
import { EColiCystModel } from "./parasites/EntameobaColi/cyst/EColiCyst";
import { EColiModel2 } from "./parasites/EntameobaColi/trophozoite/EColiBody2";
import { HartmanniCystModel } from "./parasites/EntamoebaHartmanni/cyst/HartmanniCyst";
import { HartmanniModel } from "./parasites/EntamoebaHartmanni/trophozoite/HartmanniBody";
import { EntHistCystModel } from "./parasites/EntamoebaHistolytica/cyst/EntHistCyst";
import { EntHistTrophModel } from "./parasites/EntamoebaHistolytica/trophozoite/EntHistTrophozoite";
import { GLCystModel } from "./parasites/GiardiaLamblia/cyst/GLCyst";
import { GLTrophozoite } from "./parasites/GiardiaLamblia/trophozoite/GLTrophozoite";

export const PARASITE_DATA = {
  EntamoebaHystolytica: {
    id: "01",
    name: "Entamoeba Histolytica",

    trophozoite: {
      Component: <EntHistTrophModel rotation={[0, Math.PI, 0]} />,
      features: [
        "One Nucleus",
        "Small central karyosome",
        "Fine Peripheral Chromatin",
        "Ingested RBCs",
        "granular/ground-glass cytoplasm",
      ],
      markers: [
        { id: "nucleus", label: "One Nucleus", position: [-0.08, 0.29, 0.58] },
        {
          id: "karyosome",
          label: "Central karyosome",
          position: [0.05, 0.19, 0.42],
        },
        {
          id: "chromatin",
          label: "Peripheral Chromatin",
          position: [0.2, 0.14, 0.12],
        },
        { id: "RBC", label: "Ingested RBC", position: [-0.47, 0.26, 0.42] },
        {
          id: "cytoplasm",
          label: "granular cytoplasm",
          position: [0.66, 0.02, 0.21],
        },
      ],
      listScale: 1.9,
      focusScale: 2.55,
      isolatedScale: 2.95,
      focusFrameOffset: [0, 0.28, 0],
      isolatedFrameOffset: [0, 0.18, 0],
    },

    cyst: {
      Component: <EntHistCystModel />,
      features: [
        "4 Nuclei",
        "Chromatoid bodies",
        "Rounded cyst wall",
        "Centrally located karyosome",
      ],
      markers: [
        { id: "nuclei", label: "4 Nuclei", position: [0.12, 1.08, 0.58] },
        {
          id: "chromatoid",
          label: "Chromatoid bodies",
          position: [-0.42, 1.25, -0.12],
        },
        {
          id: "cystWall",
          label: "Rounded cyst wall",
          position: [0.84, 1.02, 0.22],
        },
        {
          id: "karyosome",
          label: "Centrally located karyosome",
          position: [0.0, 0.77, 0.56],
        },
      ],
      listScale: 1.9,
      focusScale: 2.35,
      isolatedScale: 2.7,
      focusFrameOffset: [0, 1.05, 0],
      isolatedFrameOffset: [0, 0.82, 0],
    },
  },

  EntamoebaHartmanni: {
    id: "02",
    name: "Entamoeba Hartmanni",

    trophozoite: {
      Component: <HartmanniModel />,
      scale: 0.5,
      features: [
        "One Nucleus",
        "Central Karyosome",
        "Fine Peripheral Chromatin",
        "No Ingested RBCs",
      ],
      markers: [
        { id: "nucleus", label: "One Nucleus", position: [0.01, 1.0, 0.22] },
        {
          id: "karyosome",
          label: "Central Karyosome",
          position: [0.05, 0.99, 0.16],
        },
        {
          id: "chromatin",
          label: "Fine Peripheral Chromatin",
          position: [-0.05, 1.0, 0.13],
        },
        {
          id: "noRBCs",
          label: "No Ingested RBCs",
          position: [0.24, 1.1, 0.14],
        },
      ],
      listScale: 1.9,
      focusScale: 2.55,
      isolatedScale: 2.95,
      focusFrameOffset: [0, 1.3, 0],
      isolatedFrameOffset: [0, 0.22, 0],
    },

    cyst: {
      Component: <HartmanniCystModel />,
      features: [
        "4 Nuclei",
        "Rounded/Elongated Chromatoid Bars",
        "Spherical Shape",
        "centrally-located kayrosome",
        "evenly-distributed chromatin",
      ],
      markers: [
        { id: "nuclei", label: "4 Nuclei", position: [0.08, 1.08, 0.54] },
        {
          id: "chromatoid",
          label: "Chromatoid Bars",
          position: [0.18, 0.96, -0.08],
        },
        {
          id: "cystWall",
          label: "Spherical Shape",
          position: [0.78, 1.02, 0.18],
        },
        {
          id: "karyosome",
          label: "Central Karyosome",
          position: [0.02, 0.82, 0.44],
        },
        {
          id: "chromatin",
          label: "Evenly Distributed Chromatin",
          position: [-0.18, 1.2, 0.08],
        },
      ],
      listScale: 1.9,
      focusScale: 2.28,
      isolatedScale: 2.6,
      focusFrameOffset: [0, 1.02, 0],
      isolatedFrameOffset: [0, 0.82, 0],
    },
  },

  EntamoebaColi: {
    id: "03",
    name: "Entamoeba Coli",

    trophozoite: {
      Component: <EColiModel2 />,
      features: [
        "Single Nucleus",
        "Coarse Peripheral Chromatin",
        "Eccentric karyosome",
        "dirty cytoplasm",
        "short and blunt pseudopodia",
      ],
      markers: [
        {
          id: "nucleus",
          label: "Single Nucleus",
          position: [0.02, 0.82, 0.28],
        },
        {
          id: "chromatin",
          label: "Coarse Peripheral Chromatin",
          position: [-0.1, 0.94, 0.24],
        },
        {
          id: "karyosome",
          label: "Eccentric karyosome",
          position: [0.14, 1.06, 0.08],
        },
        {
          id: "cytoplasm",
          label: "dirty cytoplasm",
          position: [0.42, 1.02, 0.26],
        },
        {
          id: "pseudopodia",
          label: "short and blunt pseudopodia",
          position: [0.72, 0.92, -0.02],
        },
      ],
      listScale: 1.9,
      focusScale: 2.5,
      isolatedScale: 2.85,
      focusFrameOffset: [0, 0.72, 0],
      isolatedFrameOffset: [0, 0.28, 0],
    },

    cyst: {
      Component: <EColiCystModel />,
      features: [
        "8 Nuclei",
        "Splinter-like Chromatoid bodies",
        "Thick cyst wall",
        "Eccentric karyosome",
        "Diffuse glycogen mass",
      ],
      markers: [
        { id: "nuclei", label: "8 Nuclei", position: [0.04, 1.06, -2.08] },
        {
          id: "chromatoid",
          label: "Splinter-like Chromatoid bodies",
          position: [0.3, 1.18, -2.52],
        },
        {
          id: "cystWall",
          label: "Thick cyst wall",
          position: [0.82, 1.02, -2.42],
        },
        {
          id: "karyosome",
          label: "Eccentric karyosome",
          position: [0.1, 0.82, -2.18],
        },
        {
          id: "glycogen",
          label: "Diffuse glycogen mass",
          position: [-0.02, 0.98, -2.58],
        },
      ],
      listScale: 1.9,
      focusScale: 2.32,
      isolatedScale: 2.65,
      focusFrameOffset: [0, 1.3, 0],
      isolatedFrameOffset: [-0.5, 0.55, 0],
    },
  },

  GiardiaLamblia: {
    id: "04",
    name: "Giardia Lamblia",

    trophozoite: {
      Component: <GLTrophozoite />,
      scale: 0.5,
      features: [
        "Two nuclei",
        "Pear-shaped body",
        "8 flagella",
        "Ventral adhesive disk",
        "Bilaterial symmetry",
      ],
      markers: [
        { id: "nuclei", label: "Two nuclei", position: [-0.063, 2.42, -2.92] },
        {
          id: "body",
          label: "Pear-shaped body",
          position: [0.28, 2.08, -2.92],
        },
        { id: "flagella", label: "8 flagella", position: [-0.3, 2.36, -2.24] },
        {
          id: "disk",
          label: "Ventral adhesive disk",
          position: [-0.02, 1.92, -2.92],
        },
        {
          id: "symmetry",
          label: "Bilaterial symmetry",
          position: [0.0, 2.62, -2.92],
        },
      ],
      listScale: 1.9,
      focusScale: 2.28,
      isolatedScale: 2.62,
      focusFrameOffset: [0, 2.72, 0],
      isolatedFrameOffset: [0.05, 0.36, 0],
    },

    cyst: {
      Component: <GLCystModel />,
      scale: 0.5,
      features: [
        "4 Nuclei",
        "Internal axonemes visible",
        "Oval cyst Shape",
        "Central karyosomes",
        "Median bodies",
      ],
      markers: [
        { id: "nuclei", label: "4 Nuclei", position: [0.0, 2.68, 2.66] },
        {
          id: "axonemes",
          label: "Internal axonemes visible",
          position: [0.08, 1.72, 2.63],
        },
        {
          id: "cystWall",
          label: "Oval cyst Shape",
          position: [0.58, 2.16, 2.64],
        },
        {
          id: "karyosome",
          label: "Central karyosomes",
          position: [0.0, 2.9, 2.32],
        },
        {
          id: "medianBodies",
          label: "Median bodies",
          position: [0.16, 1.4, 2.62],
        },
      ],
      listScale: 1.9,
      focusScale: 2.24,
      isolatedScale: 2.58,
      focusFrameOffset: [0, 2.8, 0],
      isolatedFrameOffset: [0.64, 0.22, 0],
    },
  },

  BlastoCystis: {
    id: "05",
    name: "BlastoCystis",

    vacuole: {
      Component: <BCVacuole />,
      features: [
        "Large central vacuole",
        "Thin peripheral cytoplasmic ring",
        "Peripheral nuclei",
        "Granules / mitochondria-like inclusions",
      ],
      markers: [
        {
          id: "vacuole",
          label: "Large central vacuole",
          position: [0.18, 1.02, 0.28],
        },
        {
          id: "peripheralRing",
          label: "Thin peripheral cytoplasmic ring",
          position: [0.82, 1.18, 0.12],
        },
        {
          id: "nuclei",
          label: "Peripheral nuclei",
          position: [0.04, 1.0, 0.88],
        },
        {
          id: "granules",
          label: "Granules / MLOs",
          position: [-0.58, 0.92, 0.62],
        },
      ],
      listScale: 1.9,
      focusScale: 2.28,
      isolatedScale: 2.62,
      focusFrameOffset: [0, 1.0, 0],
      isolatedFrameOffset: [0.72, 0.18, 0],
    },

    cyst: {
      Component: <BlastoCystisCyst />,
      features: [
        "Thick cyst wall",
        "Cytoplasmic body",
        "Multiple nuclei",
        "Storage granules",
        "Mitochondria-like organelles",
      ],
      markers: [
        {
          id: "cystWall",
          label: "Thick cyst wall",
          position: [-3.08, 1.06, 0.08],
        },
        {
          id: "cytoplasm",
          label: "Cytoplasmic body",
          position: [-3.78, 1.02, 0.28],
        },
        {
          id: "nuclei",
          label: "Multiple nuclei",
          position: [-3.96, 1.48, 0.18],
        },
        {
          id: "granules",
          label: "Storage granules",
          position: [-3.8, 0.98, 0.02],
        },
        {
          id: "mlo",
          label: "Mitochondria-like organelles",
          position: [-3.32, 1.08, -0.36],
        },
      ],
      listScale: 1.9,
      focusScale: 2.24,
      isolatedScale: 2.6,
      focusFrameOffset: [-4, 1.5, 0],
      isolatedFrameOffset: [0.68, 0.2, 0],
    },
  },

  CryptoSporidium: {
    id: "06",
    name: "CryptoSporidium",
    oocyst: {
      Component: <CryptoSporidiumOocyst />,
      features: [
        "Spherical oocyst wall",
        "4 sporozoites",
        "4 nuclei",
        "Apical complex",
        "Residual body",
      ],
      markers: [
        {
          id: "oocystWall",
          label: "Spherical oocyst wall",
          position: [0.76, 1.02, 0.12],
        },
        {
          id: "sporozoites",
          label: "4 sporozoites",
          position: [-0.08, 1.18, -0.42],
        },
        {
          id: "nuclei",
          label: "4 nuclei",
          position: [-0.1, 1.16, -0.6],
        },
        {
          id: "apicalComplex",
          label: "Apical complex",
          position: [-0.14, 1.42, -0.28],
        },
        {
          id: "residualBody",
          label: "Residual body",
          position: [0.1, 0.84, -0.2],
        },
      ],
      listScale: 1.9,
      focusScale: 2.24,
      isolatedScale: 2.6,
      focusFrameOffset: [0, 1.02, 0],
      isolatedFrameOffset: [0.66, 0.18, 0],
    },
  },

  CystoisosporaBelli: {
    id: "07",
    name: "Cystoisospora Belli",
    oocyst: {
      Component: <CBOocyst />,
      features: [
        "Elongated ellipsoidal oocyst",
        "Smooth outer wall",
        "2 sporocysts",
        "4 sporozoites per sporocyst",
        "Sporozoite nuclei",
        "Residual bodies",
      ],
      markers: [
        {
          id: "oocystShape",
          label: "Elongated ellipsoidal oocyst",
          position: [0.76, 1.0, 0.08],
        },
        {
          id: "oocystWall",
          label: "Smooth outer wall",
          position: [0.56, 1.26, 0.08],
        },
        {
          id: "sporocysts",
          label: "2 sporocysts",
          position: [0.02, 1.0, 0.46],
        },
        {
          id: "sporozoites",
          label: "4 sporozoites per sporocyst",
          position: [-0.02, 1.09, 0.68],
        },
        {
          id: "nuclei",
          label: "Sporozoite nuclei",
          position: [-0.01, 1.07, 0.76],
        },
        {
          id: "residualBody",
          label: "Residual bodies",
          position: [0.19, 0.85, 0.3],
        },
      ],
      listScale: 1.9,
      focusScale: 2.2,
      isolatedScale: 2.55,
      focusFrameOffset: [0, 1.0, 0],
      isolatedFrameOffset: [0.68, 0.18, 0],
    },
  },

  DientamoebaFragilis: {
    id: "08",
    name: "Dientamoeba Fragilis",

    trophozoite: {
      Component: <DFTrophozoite />,
      features: [
        "Two nuclei",
        "Central karyosomal granules",
        "Fragmented nuclear chromatin",
        "Food vacuoles / ingested debris",
        "Granular irregular amoeboid cytoplasm",
      ],
      markers: [
        {
          id: "nuclei",
          label: "Two nuclei",
          position: [0.02, 1.02, -0.02],
        },
        {
          id: "karyosome",
          label: "Central karyosomal granules",
          position: [-0.01, 0.88, 0.25],
        },
        {
          id: "chromatin",
          label: "Fragmented nuclear chromatin",
          position: [0.12, 0.98, -0.06],
        },
        {
          id: "vacuoles",
          label: "Food vacuoles / ingested debris",
          position: [0.1, 0.56, -0.24],
        },
        {
          id: "cytoplasm",
          label: "Granular irregular amoeboid cytoplasm",
          position: [0.62, 1.04, 0.12],
        },
      ],
      listScale: 1.9,
      focusScale: 2.36,
      isolatedScale: 2.72,
      focusFrameOffset: [0, 1.02, 0],
      isolatedFrameOffset: [0.7, 0.2, 0],
    },
  },
};

export const STAGE_ORDER = ["trophozoite", "vacuole", "cyst", "oocyst"];

export const STAGE_LABELS = {
  trophozoite: "TROPHOZOITE",
  vacuole: "VACUOLE",
  cyst: "CYST",
  oocyst: "OOCYST",
};

export const getAvailableStages = (parasiteId) => {
  const parasite = PARASITE_DATA[parasiteId];
  if (!parasite) return [];

  return STAGE_ORDER.filter((stage) => parasite[stage]);
};
