// src/components/lab/config/labStations.js

/**
 * Text content for the station information bubbles.
 *
 * These are the short explanations shown when the user clicks
 * each glowing information bubble in the 3D lab.
 */

export const STATION_CONTENT = {
  samplePrep: {
    label: "Station 01",
    title: "Sample Preparation Station",
    subtitle: "Prepare the microscopy sample before analysis.",
    overview:
      "This station introduces the first stage of the diagnostic workflow: preparing a stool sample and slide before microscopic examination.",
    instructions: [
      "Observe the sample bottle, stain bottle, and microscope slide.",
      "Understand how a sample is placed on a slide for examination.",
      "Follow the preparation flow before moving to the microscope station.",
    ],
    outcome:
      "By the end of this station, the user understands that accurate parasite detection begins with proper sample preparation.",
  },

  microscope: {
    label: "Station 02",
    title: "Microscope Station",
    subtitle: "Examine the prepared slide under a virtual microscope.",
    overview:
      "This station represents the microscopy stage where the prepared slide is viewed to identify possible parasite structures.",
    instructions: [
      "Move closer to the microscope area.",
      "Observe the slide placed on the microscope stage.",
      "Use this station to understand how parasites are first observed in 2D microscopy images.",
    ],
    outcome:
      "The user learns that microscopy images are the visual input used for parasite identification.",
  },

  ai: {
    label: "Station 03",
    title: "AI Analysis Station",
    subtitle: "Send the microscopy image for AI-assisted detection.",
    overview:
      "This station explains how ParaSightAI analyzes a microscopy image and returns possible parasite detection results.",
    instructions: [
      "Review the analysis screen.",
      "Understand that the AI model detects parasite class, confidence score, and location.",
      "Use the output as a diagnostic support result, not as a final medical decision.",
    ],
    outcome:
      "The user understands how the AI module supports faster parasite identification from microscopy images.",
  },

  threeD: {
    label: "Station 04",
    title: "3D Visualization Station",
    subtitle: "View the detected parasite as an interactive 3D model.",
    overview:
      "This station shows how detection results can be connected to a 3D parasite model for better interpretation and learning.",
    instructions: [
      "Observe the 3D visualization platform.",
      "Use the model to study the parasite shape and diagnostic structures.",
      "Connect the AI result to the matching parasite model.",
    ],
    outcome:
      "The user learns how ParaSightAI moves beyond static 2D images by supporting interactive 3D interpretation.",
  },

  learningPanel: {
    label: "Station 05",
    title: "Guided Learning Panel",
    subtitle: "Learn parasite features through guided explanations.",
    overview:
      "This station focuses on teaching important diagnostic features used to distinguish parasites.",
    instructions: [
      "Open the learning panel.",
      "Study parasite features such as cyst shape, nuclei, chromatin, and internal structures.",
      "Use the guided explanations to improve recognition skills.",
    ],
    outcome:
      "The user gains a clearer understanding of what features to look for when identifying intestinal parasites.",
  },
};
