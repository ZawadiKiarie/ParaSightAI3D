export const INFO_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "recognition", label: "Recognition" },
  { id: "significance", label: "Diagnostic Value" },
  { id: "differential", label: "Differential" },
  { id: "reporting", label: "Reporting" },
];

const makeFeatureTemplate = ({
  title,
  subtitle,
  overview,
  recognition,
  significance,
  differential,
  reporting,
}) => ({
  title,
  subtitle,
  sections: {
    overview: {
      heading: "Overview",
      blocks: [
        {
          type: "lead",
          content: overview.lead,
        },
        {
          type: "bullets",
          title: "Key Points",
          items: overview.points,
        },
      ],
    },
    recognition: {
      heading: "How to Recognize It",
      blocks: [
        {
          type: "bullets",
          title: "What to Look For",
          items: recognition.lookFor,
        },
        {
          type: "bullets",
          title: "How It Usually Appears",
          items: recognition.appearance,
        },
      ],
    },
    significance: {
      heading: "Diagnostic Value",
      blocks: [
        {
          type: "lead",
          content: significance.lead,
        },
        {
          type: "bullets",
          title: "Why It Matters",
          items: significance.points,
        },
      ],
    },
    differential: {
      heading: "Common Confusions",
      blocks: [
        {
          type: "bullets",
          title: "Possible Misinterpretations",
          items: differential.confusions,
        },
        {
          type: "bullets",
          title: "How to Confirm",
          items: differential.confirmation,
        },
      ],
    },
    reporting: {
      heading: "Reporting Guidance",
      blocks: [
        {
          type: "bullets",
          title: "How to Document",
          items: reporting.documentation,
        },
        {
          type: "bullets",
          title: "Cautions",
          items: reporting.cautions,
        },
      ],
    },
  },
});

export const FEATURE_CONTENT = {
  EntamoebaHystolytica: {
    trophozoite: {
      nucleus: makeFeatureTemplate({
        title: "One Nucleus",
        subtitle: "Primary nuclear landmark of the trophozoite",
        overview: {
          lead: "The trophozoite of Entamoeba histolytica has a single nucleus. This is one of the first structures a lab technician should confirm before interpreting finer nuclear details.",
          points: [
            "Expected number: one nucleus in the trophozoite stage.",
            "Usually identified before assessing karyosome position and chromatin pattern.",
            "Should be interpreted together with overall trophozoite morphology.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for one rounded nuclear structure within the cytoplasm.",
            "It should be distinct from food vacuoles and ingested inclusions.",
            "Check that the structure is internal to the organism and not an external overlap.",
          ],
          appearance: [
            "Usually appears as a rounded internal body.",
            "Visibility may vary with stain quality and focal plane.",
            "May appear clearer after adjusting focus and comparing with nearby vacuoles.",
          ],
        },
        significance: {
          lead: "The presence of a single nucleus supports identification of the trophozoite stage and helps separate it from cyst forms, which contain multiple nuclei when mature.",
          points: [
            "Confirms trophozoite-stage interpretation when seen with compatible body morphology.",
            "Provides the reference point for evaluating karyosome and peripheral chromatin.",
            "Should not be used alone for species-level confirmation.",
          ],
        },
        differential: {
          confusions: [
            "Can be mistaken for a vacuole if the nuclear membrane is faint.",
            "May be obscured by granular cytoplasm or overlapping material.",
            "Debris and stain artifacts can simulate rounded internal bodies.",
          ],
          confirmation: [
            "Verify that the internal body shows a true nuclear pattern, not just an empty round space.",
            "Next inspect the karyosome and peripheral chromatin.",
            "Confirm trophozoite body shape and cytoplasmic character.",
          ],
        },
        reporting: {
          documentation: [
            "Document as trophozoite with one nucleus observed when clearly visualized.",
            "Correlate with karyosome position and chromatin distribution before final interpretation.",
          ],
          cautions: [
            "Do not overcall a nucleus if stain quality is poor.",
            "Do not rely on the nucleus alone for final species confirmation.",
          ],
        },
      }),

      karyosome: makeFeatureTemplate({
        title: "Small Central Karyosome",
        subtitle: "High-value nuclear detail",
        overview: {
          lead: "The karyosome is the dense central structure within the nucleus. In Entamoeba histolytica trophozoites it is typically small and centrally placed.",
          points: [
            "A central karyosome is an important nuclear detail.",
            "Best interpreted only after the nucleus itself is confidently identified.",
            "Useful in species differentiation when combined with chromatin pattern.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for a small dense dot near the center of the nucleus.",
            "Assess whether it is central rather than eccentric.",
            "Check more than one focus level if visibility is uncertain.",
          ],
          appearance: [
            "Typically small and compact.",
            "Should not dominate the whole nucleus.",
            "Usually more helpful when the nuclear outline is also visible.",
          ],
        },
        significance: {
          lead: "A small central karyosome supports the expected nuclear morphology of Entamoeba histolytica trophozoites.",
          points: [
            "Helps distinguish from amoebae with eccentric or irregular karyosome position.",
            "Should be assessed together with fine peripheral chromatin.",
            "Improves confidence when multiple supporting features are present.",
          ],
        },
        differential: {
          confusions: [
            "Can be missed if the nucleus is poorly focused.",
            "Can appear off-center due to angle, distortion, or incomplete visualization.",
            "May be confused with stain artifact if the nucleus itself is not well defined.",
          ],
          confirmation: [
            "Re-evaluate the full nucleus boundary before deciding position.",
            "Confirm chromatin distribution around the nuclear edge.",
            "Compare with other trophozoites in the same field if present.",
          ],
        },
        reporting: {
          documentation: [
            "Record as central karyosome when clearly seen within a well-defined nucleus.",
            "Use as supportive nuclear morphology rather than a stand-alone finding.",
          ],
          cautions: [
            "Do not label as central if the nucleus is only partially visible.",
            "Avoid overinterpreting distorted or folded specimens.",
          ],
        },
      }),

      chromatin: makeFeatureTemplate({
        title: "Fine Peripheral Chromatin",
        subtitle: "Important nuclear edge pattern",
        overview: {
          lead: "Peripheral chromatin refers to the chromatin distribution along the inner nuclear membrane. In Entamoeba histolytica trophozoites it is typically fine and evenly distributed.",
          points: [
            "This is a high-value discriminating feature.",
            "Best assessed after identifying the nucleus and karyosome.",
            "Pattern quality matters more than simple presence or absence.",
          ],
        },
        recognition: {
          lookFor: [
            "Inspect the edge of the nucleus for delicate chromatin lining.",
            "Look for even, fine distribution rather than coarse clumping.",
            "Check whether the pattern is continuous or regularly spaced around the nuclear margin.",
          ],
          appearance: [
            "Usually fine rather than coarse.",
            "More even than patchy in the expected morphology.",
            "Can become hard to see in poor staining or dense cytoplasm.",
          ],
        },
        significance: {
          lead: "Fine peripheral chromatin is one of the most useful supporting features for recognizing Entamoeba histolytica trophozoites.",
          points: [
            "Helps separate from organisms with coarse or irregular peripheral chromatin.",
            "Strengthens interpretation when paired with a small central karyosome.",
            "Supports species-level recognition when the rest of morphology agrees.",
          ],
        },
        differential: {
          confusions: [
            "Patchy stain or noise may falsely simulate chromatin lining.",
            "Peripheral debris may be mistaken for nuclear edge detail.",
            "Overstaining may make chromatin appear coarser than it is.",
          ],
          confirmation: [
            "Inspect the full nuclear outline, not only one edge.",
            "Compare with karyosome position and overall nucleus shape.",
            "If uncertain, treat as supportive but not definitive.",
          ],
        },
        reporting: {
          documentation: [
            "Describe as fine peripheral chromatin when evenly seen around the nuclear margin.",
            "Use together with karyosome position in the final morphology note.",
          ],
          cautions: [
            "Do not overcall fine chromatin if only a fragment of the nuclear edge is visible.",
            "Be cautious in thick or poorly stained preparations.",
          ],
        },
      }),

      RBC: makeFeatureTemplate({
        title: "Ingested RBCs",
        subtitle: "Very high-value feature",
        overview: {
          lead: "Ingested red blood cells are among the most important findings in Entamoeba histolytica trophozoites. When confidently internal, they strongly support this identification.",
          points: [
            "One of the strongest supportive findings for E. histolytica trophozoites.",
            "Must be truly internal to the organism, not lying above or below it.",
            "Should be interpreted with the surrounding cytoplasm and trophozoite outline.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for round red-cell-like inclusions inside the trophozoite cytoplasm.",
            "Confirm that they are enclosed within the organism rather than overlapping externally.",
            "Assess whether the surrounding cytoplasm belongs to the trophozoite.",
          ],
          appearance: [
            "Usually seen as contained RBC-like bodies within vacuolar spaces or cytoplasm.",
            "May vary in clarity depending on stain, focus, and overlap.",
            "Can appear more obvious after isolating the surrounding structure visually.",
          ],
        },
        significance: {
          lead: "Confidently identified ingested RBCs are a major diagnostic clue favoring Entamoeba histolytica over noninvasive look-alikes.",
          points: [
            "Strongly increases confidence in E. histolytica trophozoite interpretation.",
            "Much more diagnostically important than non-specific food vacuoles.",
            "Should be treated as a high-priority confirmatory feature.",
          ],
        },
        differential: {
          confusions: [
            "Can be confused with food vacuoles containing debris.",
            "Can be falsely simulated by overlapping background erythrocytes.",
            "Artifact and partial overlap may create the illusion of ingestion.",
          ],
          confirmation: [
            "Check that the RBC-like bodies are clearly inside the trophozoite boundary.",
            "Confirm trophozoite morphology and inspect the nucleus.",
            "Evaluate the same field in different focal planes if needed.",
          ],
        },
        reporting: {
          documentation: [
            "Document as trophozoite containing ingested RBCs when internality is clear.",
            "Pair with other nuclear and cytoplasmic findings in the morphology note.",
          ],
          cautions: [
            "Do not report RBC ingestion if overlap cannot be excluded.",
            "Use careful wording if the finding is suggestive but not unequivocal.",
          ],
        },
      }),

      cytoplasm: makeFeatureTemplate({
        title: "Granular / Ground-Glass Cytoplasm",
        subtitle: "Supportive texture feature",
        overview: {
          lead: "The cytoplasm of Entamoeba histolytica trophozoites is often described as granular or ground-glass in appearance. This is useful as a supportive texture feature.",
          points: [
            "Helpful for overall morphological interpretation.",
            "Not specific enough to stand alone.",
            "Best used together with nuclear details and RBC ingestion.",
          ],
        },
        recognition: {
          lookFor: [
            "Inspect the internal body texture rather than just the outer contour.",
            "Look for a fine granular, softly clouded internal appearance.",
            "Compare with more vacuolated or dirtier-looking cytoplasm in other amoebae.",
          ],
          appearance: [
            "Usually appears softly granular rather than empty and clear.",
            "May look denser in some areas and lighter in others.",
            "Granularity can be affected by lighting, stain, and rendering angle.",
          ],
        },
        significance: {
          lead: "Granular or ground-glass cytoplasm supports the expected trophozoite appearance but should not be treated as a decisive feature by itself.",
          points: [
            "Useful as a supporting texture cue.",
            "Strengthens the overall pattern when nuclear features match.",
            "More valuable when combined with RBC ingestion and correct nucleus morphology.",
          ],
        },
        differential: {
          confusions: [
            "May be confused with dirty or debris-filled cytoplasm.",
            "Poor slide quality may exaggerate apparent granularity.",
            "Rendering or lighting can make texture seem stronger than it is.",
          ],
          confirmation: [
            "Use texture as supportive evidence, not final evidence.",
            "Always confirm nucleus, karyosome, and chromatin pattern.",
            "If RBC ingestion is present, weigh that more heavily.",
          ],
        },
        reporting: {
          documentation: [
            "Record as granular or ground-glass cytoplasm only as a supportive morphological feature.",
            "Use in combination with stronger diagnostic findings.",
          ],
          cautions: [
            "Do not over-rely on cytoplasmic texture in isolation.",
            "Avoid making species-level calls from texture alone.",
          ],
        },
      }),
    },

    cyst: {
      nuclei: makeFeatureTemplate({
        title: "4 Nuclei",
        subtitle: "Key maturity feature of the cyst",
        overview: {
          lead: "A mature Entamoeba histolytica cyst classically contains four nuclei. This is one of the most important features for recognizing the mature cyst stage.",
          points: [
            "Expected number in a mature cyst: four nuclei.",
            "Immature cysts may show fewer nuclei, so count carefully.",
            "Nuclear number should be interpreted together with chromatoid bodies and cyst wall shape.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for multiple rounded nuclei distributed within the cyst interior.",
            "Confirm that the nuclei are internal and distinct from debris or vacuolar spaces.",
            "Count them carefully rather than estimating at a glance.",
          ],
          appearance: [
            "Typically small, rounded nuclei inside the cyst.",
            "Some nuclei may be more obvious than others depending on focal plane.",
            "A full set of four strongly supports a mature cyst.",
          ],
        },
        significance: {
          lead: "Four nuclei are a defining maturity clue for the Entamoeba histolytica cyst and help distinguish the mature cyst from earlier stages.",
          points: [
            "Strongly supports mature cyst interpretation.",
            "Helps differentiate from immature cysts with fewer nuclei.",
            "Should be correlated with central karyosome and chromatoid body pattern.",
          ],
        },
        differential: {
          confusions: [
            "Partial visibility may make a four-nuclei cyst appear to have fewer nuclei.",
            "Debris or overlapping structures may mimic a nuclear profile.",
            "Counting can be difficult in dense or poorly focused preparations.",
          ],
          confirmation: [
            "Change focus and inspect the full cyst interior before final counting.",
            "Confirm karyosome position within visible nuclei.",
            "Check for compatible cyst wall and chromatoid bodies.",
          ],
        },
        reporting: {
          documentation: [
            "Record as cyst with four nuclei when all nuclei are clearly visualized.",
            "If fewer are seen, note whether the cyst may be immature or partially visualized.",
          ],
          cautions: [
            "Do not force a count if the preparation is unclear.",
            "Avoid reporting maturity from one uncertain focal plane.",
          ],
        },
      }),

      chromatoid: makeFeatureTemplate({
        title: "Chromatoid Bodies",
        subtitle: "Supportive internal cyst structures",
        overview: {
          lead: "Chromatoid bodies are internal structures within the cyst that provide useful supportive evidence when identifying Entamoeba histolytica cysts.",
          points: [
            "Useful supportive feature in cyst recognition.",
            "Should be evaluated along with nuclear count and cyst outline.",
            "Shape and visibility can vary with maturity and slide quality.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for elongated or rod-like internal bodies within the cyst.",
            "Check whether they are distinct from debris and internal folds.",
            "Assess their position relative to the nuclei and cyst interior.",
          ],
          appearance: [
            "Usually appear as compact internal chromatoid structures.",
            "May be single or multiple depending on the specimen.",
            "Often easier to appreciate after identifying the cyst boundary first.",
          ],
        },
        significance: {
          lead: "Chromatoid bodies support cyst identification and help reinforce interpretation when seen with compatible nuclear and wall features.",
          points: [
            "Helpful supportive finding in Entamoeba histolytica cyst morphology.",
            "Adds confidence when four nuclei are also present.",
            "More valuable when interpreted as part of the complete cyst pattern.",
          ],
        },
        differential: {
          confusions: [
            "Can be mistaken for debris, stain precipitate, or internal artifact.",
            "Partial chromatoid structures may be overlooked or misread.",
            "Other internal inclusions may falsely suggest chromatoid material.",
          ],
          confirmation: [
            "Confirm that the structures lie within the cyst and not outside it.",
            "Re-evaluate nuclei and karyosome pattern.",
            "Use the overall rounded cyst morphology to support the finding.",
          ],
        },
        reporting: {
          documentation: [
            "Describe chromatoid bodies as supportive internal cyst structures when clearly seen.",
            "Pair with nuclear count and cyst wall appearance in the report.",
          ],
          cautions: [
            "Do not report chromatoid bodies when internal debris cannot be excluded.",
            "Avoid relying on this feature alone.",
          ],
        },
      }),

      cystWall: makeFeatureTemplate({
        title: "Rounded Cyst Wall",
        subtitle: "Outer structural feature of the cyst",
        overview: {
          lead: "The rounded cyst wall defines the outer contour of the Entamoeba histolytica cyst and is an important structural feature when staging the organism.",
          points: [
            "Provides the outer boundary for evaluating internal structures.",
            "Supports cyst-stage interpretation rather than trophozoite-stage interpretation.",
            "Best assessed together with nuclear count and internal content.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for a smooth rounded outer boundary enclosing the internal structures.",
            "Assess whether the contour is regular and cyst-like rather than amoeboid.",
            "Check that the wall fully encloses nuclei and chromatoid bodies.",
          ],
          appearance: [
            "Usually rounded and well-contained.",
            "Appears as a clear outer outline around the cyst contents.",
            "Can become less distinct in poor contrast or overlapping material.",
          ],
        },
        significance: {
          lead: "A rounded cyst wall supports recognition of a cyst form and helps separate it from trophozoite morphology.",
          points: [
            "Important for confirming stage.",
            "Provides context for interpreting nuclei and chromatoid bodies.",
            "Supports mature-cyst morphology when paired with four nuclei.",
          ],
        },
        differential: {
          confusions: [
            "Folded debris or circular artifacts may mimic a cyst outline.",
            "Overlapping material can distort the apparent wall shape.",
            "A poorly visualized wall may make the organism appear irregular.",
          ],
          confirmation: [
            "Confirm that the wall encloses true internal cyst structures.",
            "Check for multiple nuclei and internal chromatoid bodies.",
            "Use shape and content together rather than shape alone.",
          ],
        },
        reporting: {
          documentation: [
            "Describe as rounded cyst wall when the contour is clearly seen.",
            "Use as stage-supporting evidence rather than a stand-alone conclusion.",
          ],
          cautions: [
            "Do not overcall a cyst from outline alone.",
            "Ensure the structure is biological and not an artifact.",
          ],
        },
      }),

      karyosome: makeFeatureTemplate({
        title: "Centrally Located Karyosome",
        subtitle: "Supportive nuclear detail within cyst nuclei",
        overview: {
          lead: "Each visible nucleus in the Entamoeba histolytica cyst should be assessed for a centrally located karyosome. This is a supportive nuclear detail that strengthens cyst identification.",
          points: [
            "Best assessed after nuclei are clearly identified.",
            "Used with nuclear number and chromatin pattern.",
            "Helpful as a supportive confirmation feature.",
          ],
        },
        recognition: {
          lookFor: [
            "Inspect each visible nucleus for a dense central dot.",
            "Assess whether the karyosome is centered rather than displaced.",
            "Check more than one nucleus if some are unclear.",
          ],
          appearance: [
            "Usually small and central within each nucleus.",
            "Should not dominate the nucleus.",
            "May be easier to see in some nuclei than others.",
          ],
        },
        significance: {
          lead: "A centrally located karyosome supports the expected nuclear morphology of Entamoeba histolytica cyst nuclei.",
          points: [
            "Strengthens interpretation when four nuclei are present.",
            "Helpful for confirming that internal bodies identified as nuclei are true nuclei.",
            "Adds confidence to species-consistent cyst morphology.",
          ],
        },
        differential: {
          confusions: [
            "Can be hard to see in partially visualized nuclei.",
            "Poor staining may make the karyosome look eccentric or indistinct.",
            "Artifact may simulate internal nuclear dots.",
          ],
          confirmation: [
            "Verify the nuclear boundary first.",
            "Compare several nuclei within the same cyst.",
            "Use together with cyst wall and chromatoid bodies.",
          ],
        },
        reporting: {
          documentation: [
            "Document centrally located karyosome as supportive nuclear morphology when clearly seen.",
            "Mention it alongside nuclear count rather than in isolation.",
          ],
          cautions: [
            "Do not assign precise position if the nucleus is incomplete or poorly focused.",
            "Use conservative wording when only one nucleus is interpretable.",
          ],
        },
      }),
    },
  },

  EntamoebaHartmanni: {
    trophozoite: {
      nucleus: makeFeatureTemplate({
        title: "One Nucleus",
        subtitle: "Primary nuclear landmark of the trophozoite",
        overview: {
          lead: "Entamoeba hartmanni trophozoites contain a single nucleus. This is the first structure to confirm before interpreting finer nuclear details such as karyosome position and peripheral chromatin.",
          points: [
            "Expected number: one nucleus in the trophozoite stage.",
            "Best assessed before evaluating nuclear detail.",
            "Should be interpreted together with size and the absence of ingested RBCs.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for one rounded nuclear structure within the trophozoite cytoplasm.",
            "Ensure it is internal to the organism and not an external overlap.",
            "Differentiate it from food vacuoles and other internal inclusions.",
          ],
          appearance: [
            "Usually appears as a compact rounded internal body.",
            "May be subtle in low contrast or dense preparations.",
            "Often easier to confirm after isolating the nuclear region visually.",
          ],
        },
        significance: {
          lead: "A single nucleus supports trophozoite-stage interpretation and provides the basis for evaluating other nuclear features used in recognition.",
          points: [
            "Confirms trophozoite-stage morphology rather than mature cyst morphology.",
            "Provides the reference point for central karyosome and fine peripheral chromatin assessment.",
            "Should not be used alone for species-level distinction.",
          ],
        },
        differential: {
          confusions: [
            "May be confused with a vacuole if the nuclear outline is faint.",
            "Can be obscured by cytoplasmic texture or poor focus.",
            "Artifact and debris may simulate a rounded internal body.",
          ],
          confirmation: [
            "Confirm the nuclear boundary before interpreting internal detail.",
            "Next check for central karyosome and fine peripheral chromatin.",
            "Correlate with the absence of ingested RBCs.",
          ],
        },
        reporting: {
          documentation: [
            "Document as trophozoite with one nucleus when clearly visualized.",
            "Use together with the rest of the nuclear pattern for interpretation.",
          ],
          cautions: [
            "Do not overcall a nucleus if the outline is unclear.",
            "Avoid relying on this feature alone.",
          ],
        },
      }),

      karyosome: makeFeatureTemplate({
        title: "Central Karyosome",
        subtitle: "Supportive nuclear detail",
        overview: {
          lead: "The karyosome in Entamoeba hartmanni trophozoites is typically central. This helps support correct interpretation of the nucleus when paired with fine peripheral chromatin.",
          points: [
            "Central position is the key point to assess.",
            "Best interpreted after the nucleus is confidently identified.",
            "Useful as part of the overall nuclear pattern.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for a dense internal dot near the center of the nucleus.",
            "Assess whether it is central rather than eccentric.",
            "Check multiple focus levels if the structure appears ambiguous.",
          ],
          appearance: [
            "Usually small and centrally placed.",
            "Should not appear markedly eccentric.",
            "Most useful when the full nuclear edge is also visible.",
          ],
        },
        significance: {
          lead: "A central karyosome supports the expected nuclear morphology of Entamoeba hartmanni trophozoites.",
          points: [
            "Useful supportive feature in distinguishing similar amoebae.",
            "Should be assessed together with fine peripheral chromatin.",
            "Improves confidence when the trophozoite lacks ingested RBCs.",
          ],
        },
        differential: {
          confusions: [
            "May seem off-center if the nucleus is only partially in focus.",
            "Poor stain can make the karyosome indistinct.",
            "Artifact can simulate an internal nuclear dot.",
          ],
          confirmation: [
            "Verify the full nuclear boundary first.",
            "Compare with chromatin pattern around the nuclear edge.",
            "Use together with other trophozoite features rather than alone.",
          ],
        },
        reporting: {
          documentation: [
            "Record as central karyosome when clearly seen within a well-defined nucleus.",
            "Use as supportive nuclear morphology.",
          ],
          cautions: [
            "Avoid precise interpretation if the nucleus is incomplete or distorted.",
            "Do not separate this from the rest of the nuclear pattern in your note.",
          ],
        },
      }),

      chromatin: makeFeatureTemplate({
        title: "Fine Peripheral Chromatin",
        subtitle: "Important nuclear edge detail",
        overview: {
          lead: "Fine peripheral chromatin is part of the expected nuclear pattern in Entamoeba hartmanni trophozoites. It should be interpreted together with the central karyosome.",
          points: [
            "High-value nuclear edge feature.",
            "Most useful when the nucleus is clearly visible.",
            "Should be described by quality and distribution, not merely presence.",
          ],
        },
        recognition: {
          lookFor: [
            "Inspect the nuclear edge for delicate chromatin lining.",
            "Look for fine and fairly even distribution.",
            "Avoid overcalling patchy stain as true chromatin pattern.",
          ],
          appearance: [
            "Usually fine rather than coarse.",
            "Appears around the nuclear margin rather than clumped centrally.",
            "May be hard to appreciate in poor preparations.",
          ],
        },
        significance: {
          lead: "Fine peripheral chromatin supports the expected nuclear morphology of Entamoeba hartmanni trophozoites and helps separate it from coarser-pattern organisms.",
          points: [
            "Supports recognition when paired with a central karyosome.",
            "Helps distinguish from organisms with more irregular or coarse chromatin.",
            "Should be interpreted in context with trophozoite size and absence of RBC ingestion.",
          ],
        },
        differential: {
          confusions: [
            "Patchy artifact may mimic peripheral chromatin.",
            "Overstaining can make the margin look coarser than it is.",
            "Poor focus can obscure even distribution.",
          ],
          confirmation: [
            "Inspect the full nuclear circumference when possible.",
            "Correlate with karyosome position.",
            "Treat uncertain edge detail as supportive, not definitive.",
          ],
        },
        reporting: {
          documentation: [
            "Describe as fine peripheral chromatin when the margin is clearly visualized.",
            "Pair with central karyosome in the morphology note.",
          ],
          cautions: [
            "Do not overcall this feature if only a segment of the edge is visible.",
            "Be cautious in thick or low-contrast preparations.",
          ],
        },
      }),

      noRBCs: makeFeatureTemplate({
        title: "No Ingested RBCs",
        subtitle: "Important exclusion feature",
        overview: {
          lead: "Entamoeba hartmanni trophozoites do not show ingested red blood cells. This absence is important when distinguishing them from Entamoeba histolytica trophozoites.",
          points: [
            "This is an exclusion feature rather than a positive inclusion feature.",
            "Absence of RBC ingestion supports a noninvasive interpretation pattern.",
            "Should be evaluated together with overall nuclear morphology and organism size.",
          ],
        },
        recognition: {
          lookFor: [
            "Inspect internal vacuolar spaces and cytoplasm for absence of true internal red blood cells.",
            "Check that visible inclusions are food vacuoles or non-RBC material rather than erythrocytes.",
            "Confirm that the trophozoite does not contain engulfed RBC-like bodies.",
          ],
          appearance: [
            "Food vacuoles may be present without true RBC ingestion.",
            "The cytoplasm may contain inclusions, but not diagnostic internal RBCs.",
            "This feature is based on what is not seen as much as what is seen.",
          ],
        },
        significance: {
          lead: "Absence of ingested RBCs is a practical differentiating point when separating Entamoeba hartmanni from Entamoeba histolytica trophozoites.",
          points: [
            "Supports distinction from E. histolytica when other features align.",
            "Should not be interpreted alone without nuclear morphology.",
            "Useful as part of the full differential assessment.",
          ],
        },
        differential: {
          confusions: [
            "Background RBC overlap may falsely suggest internal erythrocytes.",
            "Food vacuoles may be misread as RBC ingestion.",
            "Poor contrast can make interpretation of internality difficult.",
          ],
          confirmation: [
            "Verify whether any RBC-like body is truly internal to the trophozoite.",
            "Reassess the nucleus, karyosome, and peripheral chromatin.",
            "Use careful comparison with known E. histolytica-like morphology.",
          ],
        },
        reporting: {
          documentation: [
            "Report the trophozoite pattern without claiming RBC ingestion unless unequivocally seen.",
            "Use absence of ingested RBCs as supportive differential evidence.",
          ],
          cautions: [
            "Absence is only meaningful when the organism is well visualized.",
            "Do not state absence confidently if overlap or poor visualization prevents assessment.",
          ],
        },
      }),
    },

    cyst: {
      nuclei: makeFeatureTemplate({
        title: "4 Nuclei",
        subtitle: "Mature cyst nuclear count",
        overview: {
          lead: "A mature Entamoeba hartmanni cyst typically contains four nuclei. This is one of the core maturity features to confirm when identifying the cyst stage.",
          points: [
            "A mature cyst is expected to show four nuclei.",
            "Immature cysts may contain fewer nuclei.",
            "Nuclear count should be assessed together with cyst shape, chromatoid bars, and nuclear detail.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for four distinct internal nuclei distributed within the cyst.",
            "Confirm they are internal cyst nuclei rather than debris or optical artifacts.",
            "Count carefully across focal planes if all nuclei are not visible at once.",
          ],
          appearance: [
            "The nuclei are usually small and rounded.",
            "Some may appear clearer than others depending on focus.",
            "A full set of four supports mature cyst interpretation.",
          ],
        },
        significance: {
          lead: "The presence of four nuclei strongly supports interpretation as a mature Entamoeba hartmanni cyst.",
          points: [
            "Helps stage the organism as a mature cyst.",
            "Supports distinction from immature cysts with fewer nuclei.",
            "Should be correlated with central karyosome and even chromatin distribution.",
          ],
        },
        differential: {
          confusions: [
            "Some nuclei may be missed if the cyst is not fully in focus.",
            "Internal debris may mimic a nuclear structure.",
            "Partial visualization can lead to undercounting.",
          ],
          confirmation: [
            "Examine the entire cyst interior across focus levels.",
            "Check nuclear detail such as karyosome and chromatin to confirm true nuclei.",
            "Use the cyst outline and chromatoid bars as supporting context.",
          ],
        },
        reporting: {
          documentation: [
            "Document as a cyst with four nuclei when all nuclei are confidently visualized.",
            "If fewer are seen, note whether the cyst may be immature or incompletely visualized.",
          ],
          cautions: [
            "Do not force a four-nuclei call if visibility is poor.",
            "Avoid exact counting from a single uncertain focal plane.",
          ],
        },
      }),

      chromatoid: makeFeatureTemplate({
        title: "Rounded / Elongated Chromatoid Bars",
        subtitle: "Supportive internal cyst bodies",
        overview: {
          lead: "Chromatoid bars are supportive internal structures in Entamoeba hartmanni cysts. Their presence adds confidence when interpreted alongside nuclear count and cyst shape.",
          points: [
            "Useful supportive feature for cyst interpretation.",
            "Should be read with the rest of the cyst morphology, not alone.",
            "May vary in visibility depending on maturity and preparation quality.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for compact internal bar-like structures within the cyst.",
            "Assess whether they are distinct from debris or stain precipitate.",
            "Check their position relative to nuclei and the cyst boundary.",
          ],
          appearance: [
            "May appear rounded or elongated.",
            "Usually seen as discrete internal dense bodies.",
            "Often easiest to identify after the cyst wall and nuclei are recognized.",
          ],
        },
        significance: {
          lead: "Chromatoid bars support cyst identification and add weight to a Hartmanni cyst interpretation when the nuclear pattern is also compatible.",
          points: [
            "Supportive rather than stand-alone feature.",
            "Useful in strengthening the overall cyst pattern.",
            "More informative when seen with four nuclei and a spherical cyst wall.",
          ],
        },
        differential: {
          confusions: [
            "Can be confused with internal debris or precipitated stain.",
            "May be overlooked if faint or partially obscured.",
            "Irregular inclusions may falsely suggest chromatoid material.",
          ],
          confirmation: [
            "Confirm the bars lie inside the cyst rather than outside or overlying it.",
            "Reassess nuclei and cyst outline.",
            "Interpret as one part of the full morphological pattern.",
          ],
        },
        reporting: {
          documentation: [
            "Describe chromatoid bars as supportive internal cyst structures when clearly visualized.",
            "Pair with nuclear count and nuclear morphology in the report.",
          ],
          cautions: [
            "Do not overcall chromatoid bars when debris cannot be excluded.",
            "Avoid basing the identification on this feature alone.",
          ],
        },
      }),

      cystWall: makeFeatureTemplate({
        title: "Spherical Shape",
        subtitle: "Outer cyst contour",
        overview: {
          lead: "The Entamoeba hartmanni cyst is characteristically spherical in shape. This outer contour helps establish that the organism is in the cyst stage.",
          points: [
            "Spherical shape supports cyst-stage interpretation.",
            "Provides the external boundary for evaluating internal structures.",
            "Should be interpreted with nuclear count and chromatoid bars.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for a rounded, enclosed cyst outline.",
            "Check that internal structures lie within a defined spherical boundary.",
            "Assess whether the shape is cyst-like rather than irregular or amoeboid.",
          ],
          appearance: [
            "Typically round to spherical.",
            "The wall encloses the nuclei and internal bars.",
            "Shape may appear slightly distorted in poor preparations or overlaps.",
          ],
        },
        significance: {
          lead: "A spherical cyst contour is important for confirming stage and giving context to the internal nuclear findings.",
          points: [
            "Supports interpretation as a cyst rather than trophozoite.",
            "Helps frame the evaluation of internal nuclei and bars.",
            "Useful supportive stage feature when the internal pattern is compatible.",
          ],
        },
        differential: {
          confusions: [
            "Round debris or artifacts may mimic a cyst outline.",
            "Overlapping material can distort the apparent shape.",
            "A faint wall may make the organism appear less regular than it truly is.",
          ],
          confirmation: [
            "Check that the wall encloses true internal cyst structures.",
            "Correlate with multiple nuclei and supportive nuclear detail.",
            "Use shape and internal content together.",
          ],
        },
        reporting: {
          documentation: [
            "Describe the cyst as spherical when the outer boundary is clearly visualized.",
            "Use as stage-supporting evidence alongside internal morphology.",
          ],
          cautions: [
            "Do not identify the organism from shape alone.",
            "Make sure the outline is biological and not a preparation artifact.",
          ],
        },
      }),

      karyosome: makeFeatureTemplate({
        title: "Centrally Located Karyosome",
        subtitle: "Supportive nuclear feature of each cyst nucleus",
        overview: {
          lead: "Each visible nucleus in an Entamoeba hartmanni cyst should be assessed for a centrally located karyosome. This is an important nuclear detail within the cyst stage.",
          points: [
            "Best assessed after the nuclei themselves are identified.",
            "Useful with nuclear count and chromatin distribution.",
            "Supports recognition of the expected nuclear pattern.",
          ],
        },
        recognition: {
          lookFor: [
            "Inspect each visible nucleus for a central dense dot.",
            "Assess whether the dot is centrally placed rather than eccentric.",
            "Compare multiple nuclei if one is unclear.",
          ],
          appearance: [
            "Usually appears as a small central internal body within the nucleus.",
            "Should not dominate the nucleus.",
            "May be easier to see in some nuclei than others.",
          ],
        },
        significance: {
          lead: "A central karyosome supports the expected nuclear morphology of Entamoeba hartmanni cyst nuclei.",
          points: [
            "Adds confidence that the internal structures are true nuclei.",
            "Supports the typical Hartmanni cyst nuclear pattern.",
            "Most useful when the chromatin distribution is also compatible.",
          ],
        },
        differential: {
          confusions: [
            "Poor focus may make the karyosome appear eccentric or indistinct.",
            "Artifact may simulate a nuclear dot.",
            "Incomplete nuclear visualization may make position unreliable.",
          ],
          confirmation: [
            "Verify the nuclear boundary first.",
            "Compare several nuclei in the same cyst.",
            "Use together with chromatin distribution and nuclear count.",
          ],
        },
        reporting: {
          documentation: [
            "Document centrally located karyosome as supportive nuclear morphology when clearly seen.",
            "Mention alongside the number of nuclei rather than in isolation.",
          ],
          cautions: [
            "Do not assign precise position when the nucleus is incomplete or blurred.",
            "Use cautious wording if only one or two nuclei are clearly interpretable.",
          ],
        },
      }),

      chromatin: makeFeatureTemplate({
        title: "Evenly Distributed Chromatin",
        subtitle: "Nuclear edge pattern of the cyst",
        overview: {
          lead: "Even chromatin distribution along the nuclear margin is part of the expected cyst nuclear pattern in Entamoeba hartmanni.",
          points: [
            "This is a supportive nuclear feature.",
            "Best evaluated after nuclei and karyosome are clearly identified.",
            "Should be assessed for distribution and fineness, not just presence.",
          ],
        },
        recognition: {
          lookFor: [
            "Inspect the edge of each visible nucleus for evenly distributed chromatin.",
            "Look for a balanced margin pattern rather than coarse patchy clumps.",
            "Assess more than one nucleus when possible.",
          ],
          appearance: [
            "Usually appears as fairly even chromatin around the nuclear margin.",
            "More regular than random or patchy artifact.",
            "May be subtle if the preparation is thick or poorly focused.",
          ],
        },
        significance: {
          lead: "Evenly distributed chromatin supports the expected Hartmanni cyst nuclear morphology and strengthens interpretation when seen with four nuclei and a central karyosome.",
          points: [
            "Useful supportive feature for cyst recognition.",
            "Helps confirm that observed internal bodies are true nuclei.",
            "Works best as part of the overall cyst pattern.",
          ],
        },
        differential: {
          confusions: [
            "Patchy stain or optical noise may mimic chromatin.",
            "Overstaining can make the margin seem coarser than it is.",
            "Only seeing part of the nucleus can lead to misinterpretation.",
          ],
          confirmation: [
            "Inspect the full nuclear edge when possible.",
            "Correlate with central karyosome and nuclear count.",
            "Treat uncertain edge detail as supportive, not decisive.",
          ],
        },
        reporting: {
          documentation: [
            "Describe chromatin as evenly distributed when clearly visualized around the nuclear margin.",
            "Pair with karyosome position and nuclear count in the final note.",
          ],
          cautions: [
            "Do not overcall the feature when only a small part of the nucleus is seen.",
            "Be conservative in poorly stained specimens.",
          ],
        },
      }),
    },
  },

  EntamoebaColi: {
    trophozoite: {
      nucleus: makeFeatureTemplate({
        title: "Single Nucleus",
        subtitle: "Primary nuclear landmark of the trophozoite",
        overview: {
          lead: "Entamoeba coli trophozoites have a single nucleus. This should be identified first before interpreting the more distinctive nuclear details such as the eccentric karyosome and coarse peripheral chromatin.",
          points: [
            "Expected number: one nucleus in the trophozoite stage.",
            "The nucleus is a starting point for species-level interpretation.",
            "Should be assessed together with the cytoplasm and pseudopod shape.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for one rounded internal nuclear structure within the trophozoite.",
            "Confirm it is truly internal and not an overlapping inclusion.",
            "Differentiate it from vacuoles and other inclusions in the dirty cytoplasm.",
          ],
          appearance: [
            "Usually appears as a single rounded nuclear body.",
            "May be partially obscured by dense or dirty cytoplasm.",
            "Visibility can improve with careful focus and isolation of the nuclear region.",
          ],
        },
        significance: {
          lead: "A single nucleus supports trophozoite-stage interpretation and provides the basis for assessing the more diagnostic E. coli nuclear pattern.",
          points: [
            "Confirms trophozoite rather than mature cyst morphology.",
            "Provides the reference point for evaluating karyosome position and chromatin texture.",
            "Should not be used alone for final species identification.",
          ],
        },
        differential: {
          confusions: [
            "Can be mistaken for a vacuole or internal debris.",
            "Dense cytoplasm may obscure the nuclear boundary.",
            "Artifacts may simulate a rounded internal body.",
          ],
          confirmation: [
            "Confirm the nuclear boundary before interpreting internal detail.",
            "Then evaluate karyosome position and coarse chromatin pattern.",
            "Correlate with dirty cytoplasm and pseudopod morphology.",
          ],
        },
        reporting: {
          documentation: [
            "Document as trophozoite with a single nucleus when the structure is clearly visualized.",
            "Pair with the eccentric karyosome and coarse chromatin description in the final note.",
          ],
          cautions: [
            "Do not overcall the nucleus if the margin is unclear.",
            "Avoid identifying the species from this feature alone.",
          ],
        },
      }),

      chromatin: makeFeatureTemplate({
        title: "Coarse Peripheral Chromatin",
        subtitle: "Distinctive nuclear edge pattern",
        overview: {
          lead: "The peripheral chromatin in Entamoeba coli trophozoites is typically coarse and irregularly prominent compared with the finer pattern seen in other amoebae.",
          points: [
            "This is a useful discriminating nuclear feature.",
            "Best interpreted after the nucleus itself is clearly identified.",
            "Should be described by texture and distribution, not just presence.",
          ],
        },
        recognition: {
          lookFor: [
            "Inspect the nuclear edge for coarse, clumped chromatin rather than a delicate fine lining.",
            "Look for a heavier, more irregular chromatin pattern around the nuclear margin.",
            "Assess the full margin when possible rather than judging from one segment.",
          ],
          appearance: [
            "Usually appears coarser and darker than fine peripheral chromatin.",
            "May look uneven or more granular around the nuclear edge.",
            "Can become exaggerated or blurred in poor staining.",
          ],
        },
        significance: {
          lead: "Coarse peripheral chromatin is an important feature that helps separate Entamoeba coli trophozoites from species with finer nuclear margin patterns.",
          points: [
            "Supports distinction from organisms such as E. histolytica and E. hartmanni.",
            "Most useful when paired with an eccentric karyosome.",
            "Improves confidence when the rest of the trophozoite pattern is compatible.",
          ],
        },
        differential: {
          confusions: [
            "Patchy artifact or overstaining may falsely exaggerate chromatin coarseness.",
            "Only seeing a partial nuclear edge can mislead the interpretation.",
            "Poor focus may make the chromatin appear more irregular than it truly is.",
          ],
          confirmation: [
            "Inspect the whole nuclear circumference when possible.",
            "Correlate with the eccentric karyosome.",
            "Treat uncertain coarse detail as supportive rather than definitive.",
          ],
        },
        reporting: {
          documentation: [
            "Describe as coarse peripheral chromatin when the nuclear edge is clearly seen.",
            "Include it with the karyosome description in the morphology note.",
          ],
          cautions: [
            "Do not overcall the feature when only a small portion of the nucleus is visible.",
            "Be cautious in thick, poorly stained, or artifact-heavy fields.",
          ],
        },
      }),

      karyosome: makeFeatureTemplate({
        title: "Eccentric Karyosome",
        subtitle: "Key nuclear detail",
        overview: {
          lead: "The karyosome in Entamoeba coli trophozoites is typically eccentric rather than centrally placed. This is one of the most helpful nuclear features for recognition.",
          points: [
            "Eccentric position is the main feature to assess.",
            "Best interpreted only after the nucleus is clearly identified.",
            "Works best when paired with coarse peripheral chromatin.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for a dense internal dot that is clearly off-center within the nucleus.",
            "Assess its position relative to the full nuclear boundary.",
            "Check more than one focus level if the position seems ambiguous.",
          ],
          appearance: [
            "Usually appears as a distinct dark internal body away from the center.",
            "Should not appear centrally placed in a typical E. coli trophozoite.",
            "May seem less eccentric if the nuclear outline is incomplete.",
          ],
        },
        significance: {
          lead: "An eccentric karyosome is one of the most useful supporting features for recognizing Entamoeba coli trophozoites.",
          points: [
            "Helps distinguish E. coli from amoebae with a central karyosome.",
            "Strengthens interpretation when the peripheral chromatin is also coarse.",
            "Should be assessed as part of the full nuclear pattern.",
          ],
        },
        differential: {
          confusions: [
            "A poorly visualized nucleus can make the karyosome position unreliable.",
            "Artifact may simulate an eccentric internal dot.",
            "Distortion of the nucleus can alter the apparent position.",
          ],
          confirmation: [
            "Verify the full nuclear margin first.",
            "Compare with the chromatin pattern around the edge.",
            "Use together with cytoplasmic character and pseudopod shape.",
          ],
        },
        reporting: {
          documentation: [
            "Document as an eccentric karyosome when the off-center position is clearly seen.",
            "Pair with coarse peripheral chromatin in the final morphology description.",
          ],
          cautions: [
            "Do not assign eccentric position if the nucleus is incomplete or blurred.",
            "Avoid relying on this feature alone without confirming the rest of the pattern.",
          ],
        },
      }),

      cytoplasm: makeFeatureTemplate({
        title: "Dirty Cytoplasm",
        subtitle: "Supportive cytoplasmic texture feature",
        overview: {
          lead: "Entamoeba coli trophozoites often show a dirty, debris-filled appearing cytoplasm. This is a supportive texture feature rather than a decisive one on its own.",
          points: [
            "A useful supportive feature in overall trophozoite assessment.",
            "Often contrasts with cleaner or more finely granular cytoplasm in other amoebae.",
            "Should be interpreted together with nuclear morphology and pseudopodia.",
          ],
        },
        recognition: {
          lookFor: [
            "Inspect the internal cytoplasm for a dirty, debris-laden, or uneven texture.",
            "Look for vacuolar inclusions and a less clean internal appearance.",
            "Assess whether the cytoplasm appears more cluttered than smooth.",
          ],
          appearance: [
            "Usually looks dirtier and more irregular than a clean granular cytoplasm.",
            "May contain bacteria-like inclusions, vacuoles, or heterogeneous internal material.",
            "Can look more opaque or visually noisy in some regions.",
          ],
        },
        significance: {
          lead: "Dirty cytoplasm supports the expected overall appearance of Entamoeba coli trophozoites but should not be used as a stand-alone feature.",
          points: [
            "Helpful as supportive context for the nuclear pattern.",
            "Adds weight when the eccentric karyosome and coarse chromatin are present.",
            "Not specific enough to confirm the species by itself.",
          ],
        },
        differential: {
          confusions: [
            "Poor slide preparation may falsely make cytoplasm look dirty.",
            "Background debris may exaggerate the appearance.",
            "Lighting and rendering may alter the perceived internal texture.",
          ],
          confirmation: [
            "Use cytoplasmic texture as supportive evidence only.",
            "Correlate with nucleus, chromatin, and karyosome pattern.",
            "Compare with pseudopod morphology and overall trophozoite behavior.",
          ],
        },
        reporting: {
          documentation: [
            "Describe the cytoplasm as dirty or debris-filled only as a supportive feature.",
            "Combine it with stronger nuclear findings in the morphology note.",
          ],
          cautions: [
            "Do not make a species-level call from cytoplasmic texture alone.",
            "Be cautious when slide quality is poor or the field is artifact-heavy.",
          ],
        },
      }),

      pseudopodia: makeFeatureTemplate({
        title: "Short and Blunt Pseudopodia",
        subtitle: "Supportive shape and motility-related feature",
        overview: {
          lead: "Entamoeba coli trophozoites tend to show short, blunt pseudopodia rather than the more directional and sharply defined form seen in some other amoebae.",
          points: [
            "Helpful supportive trophozoite-shape feature.",
            "Should be assessed with the rest of the morphology, not alone.",
            "Most useful when the organism contour is clearly visible.",
          ],
        },
        recognition: {
          lookFor: [
            "Look at the outer contour for broad, short, blunt extensions rather than long sharply directed pseudopodia.",
            "Assess whether the outline appears more irregular and less streamlined.",
            "Check the organism edge rather than only internal structures.",
          ],
          appearance: [
            "Usually appears as broad, short protrusions of the membrane.",
            "Less sharply pointed than a more directional pseudopod.",
            "May be subtle depending on the organism’s current form or angle.",
          ],
        },
        significance: {
          lead: "Short and blunt pseudopodia support the typical overall shape of Entamoeba coli trophozoites and help reinforce interpretation alongside nuclear findings.",
          points: [
            "Useful as supportive external morphology.",
            "Helps distinguish the organism’s overall contour from other amoebae.",
            "Most valuable when combined with eccentric karyosome and coarse chromatin.",
          ],
        },
        differential: {
          confusions: [
            "Temporary shape changes may alter the apparent pseudopod form.",
            "Poor focus or partial visibility may hide the true contour.",
            "Overlap with nearby structures can distort the edge.",
          ],
          confirmation: [
            "Inspect the full body outline if possible.",
            "Correlate with dirty cytoplasm and the nuclear pattern.",
            "Treat pseudopod shape as supportive, not decisive, if only partly visible.",
          ],
        },
        reporting: {
          documentation: [
            "Describe the trophozoite outline as showing short, blunt pseudopodia when clearly seen.",
            "Use it as supportive external morphology alongside the nuclear description.",
          ],
          cautions: [
            "Do not overinterpret pseudopod shape from a single partial view.",
            "Be cautious when the organism contour is distorted or incompletely visualized.",
          ],
        },
      }),
    },

    cyst: {
      nuclei: makeFeatureTemplate({
        title: "8 Nuclei",
        subtitle: "Mature cyst nuclear count",
        overview: {
          lead: "A mature Entamoeba coli cyst is classically characterized by a high nuclear count, commonly up to eight nuclei. This is one of the most useful maturity features of the cyst stage.",
          points: [
            "A mature cyst may contain as many as eight nuclei.",
            "Fewer visible nuclei may indicate an immature cyst or incomplete visualization.",
            "Nuclear count should be interpreted with cyst wall thickness, chromatoid bodies, glycogen, and nuclear detail.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for multiple internal nuclei distributed within the cyst.",
            "Count carefully across focal planes because not all nuclei may be equally visible at once.",
            "Confirm that the round internal bodies are true nuclei rather than debris or inclusions.",
          ],
          appearance: [
            "The nuclei are small rounded structures within the cyst interior.",
            "Some may appear more distinct than others depending on focus.",
            "A higher nuclear count is a strong clue toward E. coli cyst maturity.",
          ],
        },
        significance: {
          lead: "A high nuclear count is one of the strongest supportive features for a mature Entamoeba coli cyst and helps distinguish it from cysts with fewer nuclei.",
          points: [
            "Supports identification of a mature E. coli cyst.",
            "Helps separate it from species whose mature cysts have fewer nuclei.",
            "Should be considered together with eccentric karyosome and other cyst features.",
          ],
        },
        differential: {
          confusions: [
            "Not all nuclei may be visible in a single focal plane.",
            "Debris or optical artifacts may mimic additional nuclei.",
            "Underfocusing or overfocusing can make true nuclei less obvious.",
          ],
          confirmation: [
            "Scan through focal depth before settling on the count.",
            "Confirm nuclear morphology with karyosome and chromatin features.",
            "Use the overall cyst appearance as supporting context.",
          ],
        },
        reporting: {
          documentation: [
            "Document the number of nuclei seen and note if the cyst appears mature.",
            "If fewer nuclei are visible, mention whether visualization may be incomplete.",
          ],
          cautions: [
            "Do not force an exact count when visibility is poor.",
            "Avoid assigning maturity based only on a partial view.",
          ],
        },
      }),

      chromatoid: makeFeatureTemplate({
        title: "Splinter-like Chromatoid Bodies",
        subtitle: "Internal supportive cyst structures",
        overview: {
          lead: "Entamoeba coli cysts may contain chromatoid bodies that appear splinter-like or irregularly elongated. These are supportive internal structures in cyst interpretation.",
          points: [
            "A useful supportive feature in the cyst stage.",
            "Should be assessed together with nuclei, wall, and glycogen.",
            "Shape can help distinguish them from smoother or more rounded bodies.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for internal elongated or splinter-like dense bodies.",
            "Check that they are inside the cyst and not external debris.",
            "Assess whether their shape is more irregular and splintered than smooth rods.",
          ],
          appearance: [
            "Usually appear as dense internal bodies with splinter-like form.",
            "They may vary in size and visibility.",
            "Often easier to appreciate once the cyst wall and internal layout are established.",
          ],
        },
        significance: {
          lead: "Splinter-like chromatoid bodies are supportive of E. coli cyst morphology and add confidence when seen with high nuclear count and compatible nuclear detail.",
          points: [
            "Supportive rather than stand-alone feature.",
            "Useful in strengthening the full cyst interpretation.",
            "Most valuable when combined with multiple nuclei and cyst wall features.",
          ],
        },
        differential: {
          confusions: [
            "Can be mistaken for internal debris or stain precipitate.",
            "Partial structures may be overlooked.",
            "Other dense internal inclusions can simulate chromatoid material.",
          ],
          confirmation: [
            "Verify that the structures are enclosed within the cyst boundary.",
            "Correlate with the nuclear count and glycogen pattern.",
            "Interpret them as part of the total cyst morphology.",
          ],
        },
        reporting: {
          documentation: [
            "Describe chromatoid bodies as splinter-like when their shape is clearly appreciated.",
            "Use them as supportive internal morphology alongside the nuclear description.",
          ],
          cautions: [
            "Do not overcall chromatoid bodies if internal debris cannot be excluded.",
            "Avoid basing the cyst identification on this feature alone.",
          ],
        },
      }),

      cystWall: makeFeatureTemplate({
        title: "Thick Cyst Wall",
        subtitle: "Outer structural feature",
        overview: {
          lead: "The cyst wall of Entamoeba coli is an important external structure that encloses the many nuclei and internal bodies. Thickness of the wall is a useful supportive stage feature.",
          points: [
            "Defines the outer boundary of the cyst.",
            "Helps support cyst-stage rather than trophozoite-stage interpretation.",
            "Provides the context for assessing internal structures.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for a clearly enclosed outer boundary surrounding all internal contents.",
            "Assess whether the wall appears relatively thick and well-defined.",
            "Check that the outline is consistent with a mature cyst form.",
          ],
          appearance: [
            "Usually appears as a distinct enclosing outer contour.",
            "Thickness may be more apparent in well-focused views.",
            "Can appear less distinct in poor contrast or overlapping fields.",
          ],
        },
        significance: {
          lead: "A thick cyst wall supports interpretation of the organism as a mature cyst and helps frame the evaluation of nuclei, glycogen, and chromatoid bodies.",
          points: [
            "Supports stage recognition.",
            "Provides the enclosing structure for internal morphology.",
            "Useful when interpreted together with the many nuclei and internal inclusions.",
          ],
        },
        differential: {
          confusions: [
            "Round debris or artifacts may mimic a cyst outline.",
            "Overlapping material can distort the apparent thickness or contour.",
            "Poor focus may make the wall seem thinner or incomplete.",
          ],
          confirmation: [
            "Check that the wall encloses true internal biological structures.",
            "Correlate with the high nuclear count and internal bodies.",
            "Use shape and content together rather than wall appearance alone.",
          ],
        },
        reporting: {
          documentation: [
            "Describe the cyst wall as thick or well-defined when clearly visualized.",
            "Use it as stage-supporting evidence in the morphology note.",
          ],
          cautions: [
            "Do not identify the cyst solely from wall appearance.",
            "Make sure the outline is not due to artifact or overlap.",
          ],
        },
      }),

      karyosome: makeFeatureTemplate({
        title: "Eccentric Karyosome",
        subtitle: "Characteristic nuclear detail of the cyst nuclei",
        overview: {
          lead: "The karyosome in Entamoeba coli cyst nuclei is typically eccentric rather than central. This is an important nuclear detail that complements the high nuclear count.",
          points: [
            "Best assessed after confirming the nuclei.",
            "Useful with chromatin pattern and nuclear count.",
            "A major supportive feature of E. coli nuclear morphology.",
          ],
        },
        recognition: {
          lookFor: [
            "Inspect each visible nucleus for a dense dot that sits off-center.",
            "Compare several nuclei because some may show the feature more clearly.",
            "Assess position relative to the full nuclear boundary.",
          ],
          appearance: [
            "Usually appears as a dense eccentric internal body within the nucleus.",
            "May vary in visibility depending on focus and nuclear orientation.",
            "Should not consistently appear central in the typical pattern.",
          ],
        },
        significance: {
          lead: "An eccentric karyosome is a valuable feature supporting the nuclear morphology of Entamoeba coli cysts.",
          points: [
            "Helps distinguish E. coli cyst nuclei from nuclei with a central karyosome.",
            "Most useful when interpreted alongside the chromatin pattern.",
            "Adds confidence when many nuclei are present in a mature cyst.",
          ],
        },
        differential: {
          confusions: [
            "Poor focus may make the karyosome position difficult to judge.",
            "Artifacts may simulate internal nuclear dots.",
            "Incomplete nuclear margins can make position seem misleading.",
          ],
          confirmation: [
            "Verify the nuclear boundary first.",
            "Compare multiple nuclei in the cyst.",
            "Use together with nuclear count and chromatin distribution.",
          ],
        },
        reporting: {
          documentation: [
            "Document eccentric karyosome as supportive nuclear morphology when clearly seen.",
            "Mention it with the nuclear count and chromatin description.",
          ],
          cautions: [
            "Do not assign eccentric position if the nucleus is incomplete or blurred.",
            "Use cautious wording when only a few nuclei are interpretable.",
          ],
        },
      }),

      glycogen: makeFeatureTemplate({
        title: "Diffuse Glycogen Mass",
        subtitle: "Internal cyst inclusion",
        overview: {
          lead: "A glycogen mass may be present within the Entamoeba coli cyst and can appear as an internal diffuse inclusion. It is a supportive internal feature rather than a stand-alone diagnostic sign.",
          points: [
            "Useful supportive finding within the cyst interior.",
            "Should be interpreted with the nuclear count and chromatoid bodies.",
            "May vary depending on maturity and visibility.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for a diffuse internal mass within the cyst rather than a sharply bounded nucleus.",
            "Assess whether the structure appears as a broader internal inclusion.",
            "Differentiate it from chromatoid bodies and debris.",
          ],
          appearance: [
            "Usually appears as a diffuse or cloud-like internal body.",
            "May occupy a central portion of the cyst interior.",
            "Can vary in prominence depending on the cyst state and preparation.",
          ],
        },
        significance: {
          lead: "A glycogen mass is a supportive cyst inclusion that adds context to the internal organization of the Entamoeba coli cyst.",
          points: [
            "Supports cyst-stage interpretation.",
            "Useful as an additional internal feature when nuclei and chromatoid bodies are also recognized.",
            "Not specific enough to define the cyst on its own.",
          ],
        },
        differential: {
          confusions: [
            "Can be confused with diffuse debris or poorly resolved internal material.",
            "May overlap visually with other internal inclusions.",
            "Low contrast can make its boundaries difficult to interpret.",
          ],
          confirmation: [
            "Check that the inclusion lies within the cyst boundary.",
            "Correlate with the rest of the cyst morphology.",
            "Treat as a supportive internal feature rather than a decisive one.",
          ],
        },
        reporting: {
          documentation: [
            "Describe glycogen as a diffuse internal mass when clearly visualized.",
            "Use it as a supportive feature alongside the nuclear and wall findings.",
          ],
          cautions: [
            "Do not overcall glycogen if the internal material is poorly resolved.",
            "Avoid relying on this feature alone for identification.",
          ],
        },
      }),
    },
  },

  GiardiaLamblia: {
    trophozoite: {
      nuclei: makeFeatureTemplate({
        title: "Two Nuclei",
        subtitle: "Major internal landmark of the trophozoite",
        overview: {
          lead: "Giardia lamblia trophozoites characteristically have two prominent nuclei. This paired nuclear arrangement is one of the most recognizable features of the organism.",
          points: [
            "The trophozoite should show two nuclei rather than one.",
            "The paired nuclei are a major visual landmark for recognition.",
            "They should be interpreted with body shape, symmetry, and flagella.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for two distinct nuclei positioned in the anterior half of the trophozoite.",
            "Check that the two nuclei appear paired rather than randomly scattered.",
            "Use the nuclei together with the overall pear-shaped outline.",
          ],
          appearance: [
            "Usually appear as two rounded internal bodies.",
            "They are often among the easiest internal structures to appreciate.",
            "The paired arrangement contributes strongly to the organism’s face-like appearance.",
          ],
        },
        significance: {
          lead: "The presence of two nuclei is one of the most important recognition features of Giardia trophozoites and strongly supports identification when combined with the overall body plan.",
          points: [
            "Helps distinguish Giardia from amoeboid trophozoites with one nucleus.",
            "Supports identification of the trophozoite stage.",
            "Should be used together with flagella and ventral structures for stronger confidence.",
          ],
        },
        differential: {
          confusions: [
            "One nucleus may be less visible depending on focus or angle.",
            "Overlapping structures may obscure the paired arrangement.",
            "Artifacts may distract from the true nuclear pairing in poor preparations.",
          ],
          confirmation: [
            "Adjust focus to confirm both nuclei clearly.",
            "Correlate with pear-shaped form and bilateral symmetry.",
            "Look for associated flagella and ventral adhesive structures.",
          ],
        },
        reporting: {
          documentation: [
            "Document the presence of two nuclei when clearly visualized.",
            "Combine this with body shape and flagellar features in the morphology note.",
          ],
          cautions: [
            "Do not rely only on seeing one nucleus if the second may simply be out of focus.",
            "Use the paired nuclei as part of the full Giardia pattern, not in isolation.",
          ],
        },
      }),

      body: makeFeatureTemplate({
        title: "Pear-Shaped Body",
        subtitle: "Overall trophozoite outline",
        overview: {
          lead: "The Giardia trophozoite has a characteristic pear-shaped or teardrop-like body. This overall outline is a major external recognition feature.",
          points: [
            "Body shape is one of the fastest gross-recognition clues.",
            "The broad anterior and tapering posterior help define the trophozoite.",
            "Best interpreted together with nuclei, flagella, and symmetry.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for a broad anterior portion tapering toward the posterior end.",
            "Assess the full outline rather than focusing only on internal structures.",
            "Check that the body contour fits a symmetrical pear-like shape.",
          ],
          appearance: [
            "Usually appears broad in front and narrower behind.",
            "The contour is smoother and more defined than an amoeboid outline.",
            "Its shape helps distinguish Giardia from rounder cyst forms and amoeboid parasites.",
          ],
        },
        significance: {
          lead: "Pear-shaped body form is an important gross morphological feature that strongly supports Giardia trophozoite recognition.",
          points: [
            "Supports distinction from amoebae and cystic stages.",
            "Gives context to the placement of nuclei and flagella.",
            "Useful as an early screening feature before checking finer details.",
          ],
        },
        differential: {
          confusions: [
            "Distortion or incomplete visibility may alter the apparent contour.",
            "Angle of view can make the body look narrower or less symmetrical.",
            "Poor preparation may obscure the posterior taper.",
          ],
          confirmation: [
            "Inspect the full outline across focus levels.",
            "Correlate with two nuclei and flagella.",
            "Use bilateral symmetry to support the impression of the body shape.",
          ],
        },
        reporting: {
          documentation: [
            "Describe the trophozoite as pear-shaped when the outline is clearly appreciable.",
            "Use this as a supportive gross morphological feature.",
          ],
          cautions: [
            "Do not make a final identification from shape alone.",
            "Be cautious when the contour is distorted by overlap or poor focus.",
          ],
        },
      }),

      flagella: makeFeatureTemplate({
        title: "8 Flagella",
        subtitle: "Characteristic motility-related external structures",
        overview: {
          lead: "Giardia trophozoites possess multiple flagella, commonly described as eight in total. These are important structural features supporting trophozoite recognition.",
          points: [
            "Flagella are a key hallmark of Giardia trophozoites.",
            "They help distinguish Giardia from amoeboid organisms lacking this flagellar pattern.",
            "Visibility may vary depending on focus and slide quality.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for fine filamentous extensions emerging from the trophozoite body.",
            "Assess whether multiple flagella are visible around the organism.",
            "Check both anterior and trailing flagellar extensions when possible.",
          ],
          appearance: [
            "Flagella appear as slender thread-like structures.",
            "Not all may be equally visible in one view.",
            "Their arrangement supports the organized, bilaterally planned Giardia body form.",
          ],
        },
        significance: {
          lead: "The presence of multiple flagella strongly supports Giardia trophozoite recognition and helps separate it from non-flagellated protozoa.",
          points: [
            "Important supportive feature of the trophozoite stage.",
            "Reinforces identification when seen with paired nuclei and ventral features.",
            "Useful in distinguishing Giardia from amoeboid trophozoites.",
          ],
        },
        differential: {
          confusions: [
            "Fine flagella may be missed if the preparation is thick or out of focus.",
            "Debris or fibers on the slide may be mistaken for flagella.",
            "Not all flagella may be visible at the same time.",
          ],
          confirmation: [
            "Confirm that the filaments connect to the organism body.",
            "Reassess with focus changes to separate true flagella from artifact.",
            "Use nuclei, shape, and symmetry to support the interpretation.",
          ],
        },
        reporting: {
          documentation: [
            "Record the presence of multiple flagella when clearly visualized.",
            "Use them as supportive trophozoite morphology together with the paired nuclei.",
          ],
          cautions: [
            "Do not reject Giardia only because all flagella are not visible in one field.",
            "Avoid mistaking slide fibers or debris for flagella.",
          ],
        },
      }),

      disk: makeFeatureTemplate({
        title: "Ventral Adhesive Disk",
        subtitle: "Key attachment structure",
        overview: {
          lead: "The ventral adhesive disk is a major structural feature of the Giardia trophozoite. It is used by the organism to attach to intestinal surfaces and is highly valuable in recognition.",
          points: [
            "This is one of the classic defining features of Giardia trophozoites.",
            "It is an attachment-related ventral structure.",
            "Best interpreted with body shape and bilateral symmetry.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for the ventral region that appears organized as an attachment surface beneath the body.",
            "Assess the central ventral aspect rather than only the outer contour.",
            "Use the surrounding symmetry and nuclear placement to orient the structure.",
          ],
          appearance: [
            "Often appreciated as a distinctive ventral structural zone rather than a simple isolated spot.",
            "Its perception may depend on angle and quality of view.",
            "It contributes to the organized appearance of the trophozoite ventral surface.",
          ],
        },
        significance: {
          lead: "The ventral adhesive disk is one of the most diagnostically useful structures of Giardia trophozoites and strongly supports recognition when correctly appreciated.",
          points: [
            "Helps distinguish Giardia from organisms lacking this specialized attachment structure.",
            "Supports trophozoite-stage identification.",
            "Adds major confidence when paired with two nuclei and flagella.",
          ],
        },
        differential: {
          confusions: [
            "The structure may be hard to appreciate in some orientations.",
            "Poor contrast can reduce visibility of the ventral region.",
            "Internal and external features may blend together if focus is suboptimal.",
          ],
          confirmation: [
            "Orient the organism using the nuclei and body shape.",
            "Correlate with bilateral symmetry and the overall Giardia plan.",
            "Treat the disk as a strong supportive feature when the view is good.",
          ],
        },
        reporting: {
          documentation: [
            "Document the ventral adhesive disk when clearly appreciable.",
            "Use it as a major supportive finding in the morphology note.",
          ],
          cautions: [
            "Do not force the interpretation if the ventral view is poor.",
            "Use this structure alongside the rest of the Giardia pattern, not alone.",
          ],
        },
      }),

      symmetry: makeFeatureTemplate({
        title: "Bilaterial Symmetry",
        subtitle: "Organized body-plan feature",
        overview: {
          lead: "Giardia trophozoites exhibit bilateral symmetry. This organized body plan is a strong visual clue and helps explain the mirrored arrangement of major structures.",
          points: [
            "Bilateral symmetry is a major recognition feature.",
            "It helps organize interpretation of the nuclei, body contour, and flagella.",
            "This symmetry contributes to the classic Giardia appearance.",
          ],
        },
        recognition: {
          lookFor: [
            "Assess whether the organism appears mirrored across its central axis.",
            "Look for paired structures and balanced left-right organization.",
            "Use symmetry to support recognition of the body, nuclei, and ventral region.",
          ],
          appearance: [
            "Usually appears more orderly and mirrored than amoeboid forms.",
            "The nuclei and body contour help make the symmetry easier to appreciate.",
            "The overall shape can seem face-like because of this organized arrangement.",
          ],
        },
        significance: {
          lead: "Bilateral symmetry is highly supportive of Giardia trophozoite recognition and helps distinguish it from irregular amoeboid organisms.",
          points: [
            "Supports the classic Giardia body plan.",
            "Strengthens interpretation when seen with two nuclei and flagella.",
            "Useful as a whole-organism pattern feature rather than an isolated detail.",
          ],
        },
        differential: {
          confusions: [
            "Distortion, angle, or partial visibility may reduce the appearance of symmetry.",
            "Poor slide preparation can make the body seem less organized.",
            "Partial overlap with debris may hide one side of the organism.",
          ],
          confirmation: [
            "Inspect the full body outline and internal arrangement.",
            "Correlate with paired nuclei and flagella.",
            "Use symmetry as part of the total organism pattern.",
          ],
        },
        reporting: {
          documentation: [
            "Describe bilateral symmetry as a supportive whole-organism feature when clearly appreciable.",
            "Use it with other classic Giardia trophozoite findings in the note.",
          ],
          cautions: [
            "Do not depend on symmetry alone if the organism is distorted or partly seen.",
            "Interpret it as a supportive pattern feature, not a stand-alone diagnostic sign.",
          ],
        },
      }),
    },

    cyst: {
      nuclei: makeFeatureTemplate({
        title: "4 Nuclei",
        subtitle: "Mature cyst nuclear count",
        overview: {
          lead: "A mature Giardia lamblia cyst typically contains four nuclei. This is one of the most important internal features for recognizing the mature cyst stage.",
          points: [
            "A mature Giardia cyst is expected to show four nuclei.",
            "Immature cysts may show fewer nuclei.",
            "Nuclear count should be interpreted together with axonemes, cyst shape, and internal structures.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for four distinct internal nuclei within the cyst.",
            "Count carefully across focal planes because not all nuclei may be equally obvious at once.",
            "Confirm the nuclei are true internal structures rather than artifact or debris.",
          ],
          appearance: [
            "The nuclei appear as rounded internal bodies.",
            "Some nuclei may be more visible than others depending on focus.",
            "A full set of four strongly supports mature cyst interpretation.",
          ],
        },
        significance: {
          lead: "The presence of four nuclei is a key maturity feature of Giardia cysts and strongly supports recognition of the mature cyst form.",
          points: [
            "Helps distinguish mature cysts from immature forms with fewer nuclei.",
            "Supports stage identification when paired with oval shape and internal axonemes.",
            "Provides a major internal landmark for the cyst.",
          ],
        },
        differential: {
          confusions: [
            "Not all nuclei may be visible in one focal plane.",
            "Debris or optical noise can be mistaken for nuclear profiles.",
            "Poor contrast may make the count appear lower than it really is.",
          ],
          confirmation: [
            "Adjust focus to inspect the full cyst interior.",
            "Correlate with central karyosomes and internal fibrils.",
            "Use the oval cyst outline as supporting context.",
          ],
        },
        reporting: {
          documentation: [
            "Document the number of nuclei seen and indicate if the cyst appears mature.",
            "Use the nuclear count together with the other internal cyst features in the morphology note.",
          ],
          cautions: [
            "Do not force a count when the preparation is unclear.",
            "Avoid deciding maturity from a single poor focal plane.",
          ],
        },
      }),

      axonemes: makeFeatureTemplate({
        title: "Internal Axonemes Visible",
        subtitle: "Characteristic internal fibrillar structures",
        overview: {
          lead: "Internal axonemes are important structural features within the Giardia cyst. They represent internal flagellar-related fibrillar elements and are a useful recognition clue.",
          points: [
            "These are important supportive internal structures in Giardia cysts.",
            "They are often seen as fibrillar lines or internal filamentous elements.",
            "Best interpreted together with nuclei and cyst shape.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for internal fibrillar or filament-like structures within the cyst interior.",
            "Assess whether they are organized and enclosed within the cyst.",
            "Differentiate them from scratches, debris, or staining artifact.",
          ],
          appearance: [
            "Usually appear as internal linear or fibrillar structures.",
            "Their visibility may vary depending on the angle and contrast.",
            "They often become more meaningful when seen alongside the nuclei.",
          ],
        },
        significance: {
          lead: "Visible internal axonemes are a strong supportive feature for Giardia cyst recognition and help distinguish it from simpler round cysts lacking this internal organization.",
          points: [
            "Support Giardia cyst identification when paired with four nuclei.",
            "Reflect the organized internal architecture of the cyst.",
            "Add confidence when the overall cyst morphology is compatible.",
          ],
        },
        differential: {
          confusions: [
            "Fibers, scratches, or streak artifacts can mimic internal axonemes.",
            "Poor focus may make real internal fibrils disappear or seem fragmented.",
            "Debris crossing the cyst can be mistaken for an internal structure.",
          ],
          confirmation: [
            "Confirm that the fibrillar structures are enclosed within the cyst wall.",
            "Check for associated nuclei and oval cyst shape.",
            "Use multiple focus levels to separate true internal axonemes from artifacts.",
          ],
        },
        reporting: {
          documentation: [
            "Describe internal axonemes when clearly visualized inside the cyst.",
            "Use them as a supportive structural feature together with nuclear count and wall shape.",
          ],
          cautions: [
            "Do not overcall axonemes if the lines may be external debris or artifact.",
            "Interpret them as part of the full Giardia cyst pattern.",
          ],
        },
      }),

      cystWall: makeFeatureTemplate({
        title: "Oval Cyst Shape",
        subtitle: "External contour of the cyst",
        overview: {
          lead: "The Giardia cyst has a characteristic oval outline. This external contour is one of the first gross-recognition features for identifying the cyst stage.",
          points: [
            "Oval shape is a major gross morphological clue.",
            "The wall encloses the nuclei and internal fibrillar structures.",
            "Best interpreted with the internal pattern rather than shape alone.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for a smooth oval or ellipsoidal cyst outline.",
            "Check that the internal structures are enclosed within this contour.",
            "Assess whether the outline is regular rather than amoeboid or spherical.",
          ],
          appearance: [
            "Usually appears oval rather than perfectly round.",
            "The outer wall provides a clear boundary around the internal contents.",
            "The shape may be slightly altered by orientation or preparation quality.",
          ],
        },
        significance: {
          lead: "Oval cyst shape supports Giardia cyst recognition and helps distinguish the cyst from trophozoites and other protozoan forms with different outlines.",
          points: [
            "Supports cyst-stage interpretation.",
            "Provides context for interpreting nuclei and internal axonemes.",
            "Useful as a fast screening clue before finer internal assessment.",
          ],
        },
        differential: {
          confusions: [
            "Round or oval debris may mimic a cyst contour.",
            "Compression or distortion may alter the apparent outline.",
            "Poor edge visibility may make the cyst seem less regular.",
          ],
          confirmation: [
            "Confirm that the wall encloses true internal cyst structures.",
            "Correlate with four nuclei and internal axonemes.",
            "Use the full internal-external pattern rather than shape alone.",
          ],
        },
        reporting: {
          documentation: [
            "Describe the cyst as oval when the outer contour is clearly appreciable.",
            "Use the wall shape as supportive stage morphology in the report.",
          ],
          cautions: [
            "Do not identify Giardia cyst from shape alone.",
            "Ensure the structure is biological and not artifact or overlap.",
          ],
        },
      }),

      karyosome: makeFeatureTemplate({
        title: "Central Karyosomes",
        subtitle: "Internal nuclear detail",
        overview: {
          lead: "Each visible Giardia cyst nucleus contains a karyosome. The internal nuclear dot is a useful supportive feature once the nuclei themselves are identified.",
          points: [
            "Best assessed after confirming the nuclei.",
            "Supports that the internal bodies are true nuclei.",
            "Should be interpreted together with the number and arrangement of nuclei.",
          ],
        },
        recognition: {
          lookFor: [
            "Inspect each visible nucleus for a dense internal dot.",
            "Check whether the dot is positioned centrally within the nucleus.",
            "Compare across several nuclei because visibility may vary.",
          ],
          appearance: [
            "Usually appears as a small internal dense body within each nucleus.",
            "May be easier to see in some nuclei than others.",
            "Most useful when the nuclear outline is also appreciable.",
          ],
        },
        significance: {
          lead: "Central karyosomes support interpretation of the internal structures as true nuclei and strengthen the overall Giardia cyst pattern.",
          points: [
            "Helpful for confirming nuclear identity.",
            "Supports the organized internal appearance of the cyst.",
            "Most valuable when interpreted with four nuclei and internal axonemes.",
          ],
        },
        differential: {
          confusions: [
            "Poor focus may obscure the internal nuclear dot.",
            "Artifacts may simulate internal nuclear points.",
            "If the nuclear boundary is unclear, the karyosome position may be unreliable.",
          ],
          confirmation: [
            "Verify the nucleus itself before interpreting the internal dot.",
            "Compare multiple nuclei within the same cyst.",
            "Use the karyosome as supportive rather than stand-alone evidence.",
          ],
        },
        reporting: {
          documentation: [
            "Document central karyosomes when clearly seen within identifiable nuclei.",
            "Mention them as supportive internal nuclear detail in the morphology note.",
          ],
          cautions: [
            "Do not overinterpret karyosome position if the nuclei are incomplete or poorly focused.",
            "Use cautious wording when only part of the nuclear set is clearly seen.",
          ],
        },
      }),

      medianBodies: makeFeatureTemplate({
        title: "Median Bodies",
        subtitle: "Supportive internal cytoskeletal structures",
        overview: {
          lead: "Median bodies are supportive internal structures of Giardia and contribute to the organized internal architecture seen in the cyst.",
          points: [
            "Useful supportive feature within the cyst interior.",
            "Best interpreted with the nuclei and internal fibrillar structures.",
            "Part of the organized internal body plan of Giardia.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for discrete internal dense bodies distinct from nuclei and axonemes.",
            "Assess their position relative to the central cyst interior.",
            "Differentiate them from debris and other irregular inclusions.",
          ],
          appearance: [
            "Usually appear as internal structured bodies rather than diffuse inclusions.",
            "They may be subtle depending on focus and model orientation.",
            "More meaningful when interpreted with the rest of the cyst’s internal organization.",
          ],
        },
        significance: {
          lead: "Median bodies provide additional support for Giardia cyst recognition by reinforcing the characteristic internal organization of the organism.",
          points: [
            "Supportive rather than stand-alone feature.",
            "Adds confidence when seen with nuclei and internal axonemes.",
            "Helps demonstrate the organized internal plan of the cyst.",
          ],
        },
        differential: {
          confusions: [
            "Can be confused with dense debris or internal artifact.",
            "Poor focus may cause them to blend with other internal bodies.",
            "Without the rest of the Giardia pattern, they may be difficult to interpret confidently.",
          ],
          confirmation: [
            "Confirm the presence of other Giardia-consistent cyst features first.",
            "Differentiate them from nuclei by their shape and position.",
            "Use them as supportive internal morphology rather than decisive evidence.",
          ],
        },
        reporting: {
          documentation: [
            "Describe median bodies as supportive internal structures when clearly visualized.",
            "Pair them with the nuclei and axoneme findings in the final morphology note.",
          ],
          cautions: [
            "Do not overcall median bodies if the internal contents are poorly resolved.",
            "Interpret them only as part of the total Giardia cyst pattern.",
          ],
        },
      }),
    },
  },

  BlastoCystis: {
    vacuole: {
      vacuole: makeFeatureTemplate({
        title: "Large Central Vacuole",
        subtitle: "Dominant structural feature of the vacuolar form",
        overview: {
          lead: "The vacuolar form of Blastocystis is characterized by a large central vacuole occupying most of the cell volume. This is the defining feature of the form and the first structure to recognize.",
          points: [
            "The central vacuole is the most visually dominant part of the organism.",
            "It displaces the cytoplasm toward the periphery, creating the classic vacuolar form appearance.",
            "It should be interpreted together with the thin peripheral cytoplasmic rim and peripheral nuclei.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for a very large centrally placed vacuolar space occupying most of the organism.",
            "Check that the vacuole is enclosed by a thin outer cytoplasmic ring rather than appearing as an empty artifact.",
            "Confirm that nuclei and other inclusions are pushed toward the periphery rather than floating centrally.",
          ],
          appearance: [
            "Usually appears as a large pale or translucent central compartment.",
            "Often dominates the cell so strongly that the peripheral cytoplasm seems like a thin border around it.",
            "The vacuole should appear structural and enclosed, not like an accidental gap in the specimen.",
          ],
        },
        significance: {
          lead: "A large central vacuole is the hallmark of the Blastocystis vacuolar form and is essential for distinguishing this form from more compact protozoan stages.",
          points: [
            "Strongly supports recognition of the vacuolar form of Blastocystis.",
            "Helps distinguish the organism from cystic or amoeboid organisms without a dominant central vacuole.",
            "Provides the structural context for interpreting peripheral nuclei and inclusions.",
          ],
        },
        differential: {
          confusions: [
            "A preparation artifact or empty-looking space may be mistaken for a true vacuole.",
            "Collapsed or poorly preserved organisms may distort the central vacuolar appearance.",
            "Debris with a ring-like outline can falsely resemble a vacuolar form.",
          ],
          confirmation: [
            "Confirm that the vacuole is bounded by a real peripheral cytoplasmic ring.",
            "Look for peripheral nuclei or inclusions to support the interpretation.",
            "Use the full organism pattern rather than relying on the vacuole alone.",
          ],
        },
        reporting: {
          documentation: [
            "Describe the organism as showing a large central vacuole when this compartment is clearly visualized.",
            "Use the vacuole together with peripheral nuclei and cytoplasmic rim features in the morphology note.",
          ],
          cautions: [
            "Do not interpret an empty-appearing central space as a true vacuole unless the surrounding cellular structure is also evident.",
            "Avoid relying on the vacuole alone if the organism boundary is poorly defined.",
          ],
        },
      }),

      peripheralRing: makeFeatureTemplate({
        title: "Thin Peripheral Cytoplasmic Ring",
        subtitle: "Peripheral cytoplasmic rim around the central vacuole",
        overview: {
          lead: "In the vacuolar form of Blastocystis, the cytoplasm is displaced outward by the large central vacuole, forming a thin peripheral cytoplasmic ring.",
          points: [
            "This ring is a major architectural clue of the vacuolar form.",
            "It encloses the vacuole and contains nuclei and other inclusions near the edge.",
            "It should be interpreted together with the vacuole rather than in isolation.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for a thin outer band of cytoplasm surrounding the central vacuole.",
            "Assess whether the rim appears continuous and biologically structured rather than irregular debris.",
            "Check that the nuclei or inclusions lie within this peripheral ring zone.",
          ],
          appearance: [
            "Usually appears as a thin outer cytoplasmic band around the vacuole.",
            "May look denser or slightly more textured than the central vacuole.",
            "Can vary in thickness but should remain clearly peripheral.",
          ],
        },
        significance: {
          lead: "The peripheral cytoplasmic ring is one of the key features confirming that the organism is showing the classic vacuolar architecture of Blastocystis.",
          points: [
            "Supports interpretation of the central space as a true vacuole rather than artifact.",
            "Helps define the organism’s outer structure and internal arrangement.",
            "Important for locating the peripheral nuclei and inclusions correctly.",
          ],
        },
        differential: {
          confusions: [
            "A faint or collapsed rim may be missed, making the organism look like a hollow artifact.",
            "Uneven staining may make the rim appear thicker or discontinuous.",
            "External debris can obscure the true cytoplasmic boundary.",
          ],
          confirmation: [
            "Trace the rim around the vacuole to confirm continuity.",
            "Correlate with the presence of peripheral nuclei.",
            "Use the full rounded organism contour to support the finding.",
          ],
        },
        reporting: {
          documentation: [
            "Describe the vacuolar form as having a thin peripheral cytoplasmic ring when clearly appreciable.",
            "Use this as supportive architecture alongside the large vacuole and nuclei.",
          ],
          cautions: [
            "Do not overcall the ring if the outer cell boundary is too indistinct to follow.",
            "Be cautious in distorted or partially collapsed organisms.",
          ],
        },
      }),

      nuclei: makeFeatureTemplate({
        title: "Peripheral Nuclei",
        subtitle: "Nuclei positioned within the peripheral cytoplasmic rim",
        overview: {
          lead: "The nuclei in the vacuolar form of Blastocystis are typically positioned near the cell periphery, within the thin cytoplasmic rim rather than within the central vacuole.",
          points: [
            "Peripheral nuclear position is a useful architectural clue.",
            "The nuclei should be interpreted within the context of the vacuolar form, not as centrally floating structures.",
            "Their peripheral distribution supports the identity of the organism.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for small nuclei arranged near the edge of the organism rather than in the center.",
            "Confirm that they lie in the peripheral cytoplasmic ring.",
            "Differentiate them from vacuolar granules or other inclusions.",
          ],
          appearance: [
            "Usually appear as small peripheral nuclear bodies around the vacuole.",
            "Some may be more obvious than others depending on focus and orientation.",
            "They should not appear freely suspended within the central vacuole.",
          ],
        },
        significance: {
          lead: "Peripheral nuclei are an important supportive feature of the Blastocystis vacuolar form and help confirm the internal organization of the organism.",
          points: [
            "Support interpretation of the organism as Blastocystis vacuolar form.",
            "Help distinguish true cell organization from vacuole-like artifacts.",
            "Add confidence when seen with a large central vacuole and thin peripheral cytoplasm.",
          ],
        },
        differential: {
          confusions: [
            "Granules or inclusions may be mistaken for nuclei if the preparation is unclear.",
            "Poor focus may hide some nuclei or make them appear misplaced.",
            "Artifact at the cell edge may simulate a peripheral nuclear profile.",
          ],
          confirmation: [
            "Confirm that the structures are embedded in the peripheral cytoplasmic rim.",
            "Assess their appearance relative to the central vacuole.",
            "Use the overall vacuolar architecture to support the interpretation.",
          ],
        },
        reporting: {
          documentation: [
            "Document peripheral nuclei when they are clearly seen within the cytoplasmic rim.",
            "Pair this finding with the large central vacuole and peripheral ring description.",
          ],
          cautions: [
            "Do not call peripheral nuclei if the structures could equally represent granules or artifact.",
            "Avoid overcounting if only part of the periphery is clearly visible.",
          ],
        },
      }),

      granules: makeFeatureTemplate({
        title: "Granules / Mitochondria-Like Inclusions",
        subtitle: "Supportive peripheral cytoplasmic inclusions",
        overview: {
          lead: "Blastocystis vacuolar forms may show granules and other small inclusions within the peripheral cytoplasmic region. These are supportive internal details rather than the primary diagnostic feature.",
          points: [
            "These inclusions are secondary supportive findings.",
            "They are best interpreted only after the vacuole and peripheral rim are confidently identified.",
            "They should be localized to the peripheral cytoplasmic region rather than the central vacuole.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for small granular or inclusion-like structures within the peripheral cytoplasm.",
            "Check that they are distinct from the nuclei and not just random noise.",
            "Assess whether they follow the organism’s internal organization rather than crossing boundaries artificially.",
          ],
          appearance: [
            "Usually appear as small cytoplasmic granules or compact inclusion-like bodies.",
            "They may vary in size and prominence.",
            "They are typically less dominant than the vacuole or nuclei.",
          ],
        },
        significance: {
          lead: "Granules and inclusion-like bodies are supportive morphological details that help make the organism appear biologically structured rather than artifactually vacuolated.",
          points: [
            "Useful as supportive internal detail in a well-preserved organism.",
            "Can strengthen confidence in the interpretation of the peripheral cytoplasmic rim.",
            "Should not be treated as a stand-alone identifying feature.",
          ],
        },
        differential: {
          confusions: [
            "Debris or stain artifact may mimic granules.",
            "Nuclei may be confused with granules if their internal detail is not clear.",
            "Random noise within the preparation may falsely suggest inclusions.",
          ],
          confirmation: [
            "Confirm that the inclusions lie in the peripheral cytoplasm rather than floating centrally.",
            "Differentiate them from nuclei by size, density, and organization.",
            "Use them only as supportive findings within the full Blastocystis pattern.",
          ],
        },
        reporting: {
          documentation: [
            "Describe granules or mitochondria-like inclusions as supportive cytoplasmic findings when clearly visualized.",
            "Mention them after documenting the vacuole and peripheral nuclei.",
          ],
          cautions: [
            "Do not rely on granules alone for identification.",
            "Be conservative if the inclusions could represent stain precipitate or debris.",
          ],
        },
      }),
    },
    cyst: {
      cystWall: makeFeatureTemplate({
        title: "Thick Cyst Wall",
        subtitle: "Protective outer boundary of the cyst",
        overview: {
          lead: "The Blastocystis cyst is enclosed by a comparatively thick outer wall. This wall helps define the organism as a cyst form rather than a vacuolar form.",
          points: [
            "The cyst wall is a major stage-defining feature.",
            "It provides the protective outer boundary around the compact internal contents.",
            "It should be interpreted together with the smaller overall cyst architecture and internal nuclei.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for a clearly bounded outer contour that appears thicker and more compact than the vacuolar form edge.",
            "Check that the wall encloses the internal structures completely.",
            "Assess whether the organism looks compact and cyst-like rather than dominated by a large vacuole.",
          ],
          appearance: [
            "Usually appears as a dense enclosing outer shell around the cyst.",
            "The wall is more compact and protective-looking than the delicate vacuolar form boundary.",
            "It helps create the rounded, self-contained appearance of the cyst.",
          ],
        },
        significance: {
          lead: "A thick cyst wall is one of the most important features supporting recognition of the Blastocystis cyst stage.",
          points: [
            "Supports identification of the organism as a cyst rather than a vacuolar form.",
            "Provides the structural boundary for interpreting the nuclei and cytoplasmic inclusions.",
            "Adds confidence that the organism is in a resistant, compact stage.",
          ],
        },
        differential: {
          confusions: [
            "Dense rounded debris may mimic a cyst wall.",
            "Poor focus can make the wall appear thinner or incomplete.",
            "Overlapping material may distort the apparent contour.",
          ],
          confirmation: [
            "Confirm that the wall encloses true internal biological structures.",
            "Correlate with the presence of compact cytoplasm, nuclei, and inclusions.",
            "Use the full internal and external pattern rather than the wall alone.",
          ],
        },
        reporting: {
          documentation: [
            "Describe the organism as having a thick cyst wall when the outer boundary is clearly seen.",
            "Use this as a major stage-supporting feature in the morphology note.",
          ],
          cautions: [
            "Do not identify the cyst from wall appearance alone.",
            "Be careful not to confuse a preparation artifact with a true cyst boundary.",
          ],
        },
      }),

      cytoplasm: makeFeatureTemplate({
        title: "Cytoplasmic Body",
        subtitle: "Compact internal body of the cyst",
        overview: {
          lead: "The Blastocystis cyst contains a more compact internal cytoplasmic body than the vacuolar form. This helps distinguish the cyst from the large-vacuole architecture of the vacuolar stage.",
          points: [
            "The cyst interior is more compact and less dominated by a huge central vacuole.",
            "This internal body provides context for the nuclei and storage inclusions.",
            "It should be interpreted together with the cyst wall and internal structures.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for a compact internal body occupying the enclosed cyst interior.",
            "Check that the internal mass appears structured rather than empty or artifactually hollow.",
            "Assess whether the nuclei and inclusions sit within this compact cytoplasmic region.",
          ],
          appearance: [
            "Usually appears denser and more compact than the vacuolar form interior.",
            "The internal body is enclosed by the cyst wall and contains the nuclei and inclusions.",
            "It may look granular or softly clouded depending on the rendering and focus.",
          ],
        },
        significance: {
          lead: "Compact internal cytoplasm supports recognition of the Blastocystis cyst stage by contrasting with the large central vacuole of the vacuolar form.",
          points: [
            "Helps distinguish the cyst from the vacuolar stage.",
            "Provides the medium in which nuclei and inclusions are organized.",
            "Useful as a stage-supporting internal architecture feature.",
          ],
        },
        differential: {
          confusions: [
            "A poorly visualized interior may falsely appear empty or collapsed.",
            "Dense artifact may be mistaken for true cytoplasmic material.",
            "Lighting and transparency can alter how compact the internal body looks.",
          ],
          confirmation: [
            "Confirm that the internal body lies within a true cyst wall.",
            "Correlate with nuclei and storage inclusions.",
            "Use it as part of the total cyst pattern rather than by itself.",
          ],
        },
        reporting: {
          documentation: [
            "Describe the cyst as having a compact internal cytoplasmic body when clearly appreciable.",
            "Use it together with the cyst wall and nuclei in the final morphology note.",
          ],
          cautions: [
            "Do not overinterpret internal density if the cyst boundary is uncertain.",
            "Avoid relying on this feature alone for stage determination.",
          ],
        },
      }),

      nuclei: makeFeatureTemplate({
        title: "Multiple Nuclei",
        subtitle: "Internal nuclear structures of the cyst",
        overview: {
          lead: "Blastocystis cysts contain multiple nuclei within the compact internal body. These nuclei are important supportive internal structures for identifying the cyst form.",
          points: [
            "Multiple nuclei support the compact internal organization of the cyst.",
            "They should be interpreted within the cyst body, not as free-floating inclusions.",
            "Nuclei are one of the main internal biological structures confirming the cyst is not an artifact.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for multiple distinct internal nuclei enclosed within the cyst.",
            "Check that the nuclei are separate from granules and mitochondria-like inclusions.",
            "Assess their distribution within the compact internal body rather than around a large central vacuole.",
          ],
          appearance: [
            "Usually appear as several small internal nuclear bodies.",
            "Some may be more obvious than others depending on the orientation.",
            "They should appear structured and biologically placed within the cyst interior.",
          ],
        },
        significance: {
          lead: "The presence of multiple nuclei supports recognition of the Blastocystis cyst as a true cellular stage with organized internal contents.",
          points: [
            "Confirms biological internal organization within the cyst.",
            "Supports distinction from empty rounded artifacts or debris.",
            "Strengthens cyst-stage interpretation when paired with the thick wall and compact cytoplasm.",
          ],
        },
        differential: {
          confusions: [
            "Granules or dense inclusions may be mistaken for nuclei.",
            "Poor contrast may hide some nuclei or blur their boundaries.",
            "Artifact within the cyst interior may simulate nuclear bodies.",
          ],
          confirmation: [
            "Confirm that the structures are larger and more organized than simple granules.",
            "Assess them within the full cyst architecture.",
            "Use the wall and cytoplasmic body as context for interpretation.",
          ],
        },
        reporting: {
          documentation: [
            "Document multiple nuclei when they are clearly visualized within the cyst interior.",
            "Pair this with the cyst wall and internal cytoplasmic body description.",
          ],
          cautions: [
            "Do not overcount uncertain dense bodies as nuclei.",
            "Be conservative if the internal structures are only partially resolved.",
          ],
        },
      }),

      granules: makeFeatureTemplate({
        title: "Storage Granules",
        subtitle: "Compact internal reserve inclusions",
        overview: {
          lead: "Storage granules are compact internal inclusions within the Blastocystis cyst. They are supportive internal details rather than the primary stage-defining structure.",
          points: [
            "These granules are secondary supportive internal findings.",
            "They should be interpreted after the cyst wall, cytoplasmic body, and nuclei are identified.",
            "They contribute to the compact internal appearance of the cyst.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for small dense internal granular material inside the cyst body.",
            "Check that the granules are distinct from the nuclei.",
            "Assess whether the granular cluster lies within the compact cyst interior.",
          ],
          appearance: [
            "Usually appears as a clustered granular internal body.",
            "It is smaller and denser than the main cytoplasmic body.",
            "The granules should appear as supportive inclusions rather than dominant structures.",
          ],
        },
        significance: {
          lead: "Storage granules provide supportive evidence of organized internal cyst contents and help reinforce that the cyst is a structured biological form.",
          points: [
            "Useful as an internal supportive feature.",
            "Helps make the cyst appear biologically organized rather than empty.",
            "Adds confidence when seen with nuclei and a thick cyst wall.",
          ],
        },
        differential: {
          confusions: [
            "Random internal debris may mimic granules.",
            "Small nuclei may be confused with dense granules if poorly resolved.",
            "Stain artifact may exaggerate granular appearance.",
          ],
          confirmation: [
            "Differentiate the granules from nuclei by size and organization.",
            "Confirm they lie within the cyst interior.",
            "Use them only as supportive findings within the full cyst morphology.",
          ],
        },
        reporting: {
          documentation: [
            "Describe storage granules as supportive internal inclusions when clearly seen.",
            "Mention them after documenting the wall, cytoplasm, and nuclei.",
          ],
          cautions: [
            "Do not rely on granules alone for interpretation.",
            "Be conservative if the internal granular material could be artifact.",
          ],
        },
      }),

      mlo: makeFeatureTemplate({
        title: "Mitochondria-Like Organelles",
        subtitle: "Small internal inclusion-like structures",
        overview: {
          lead: "Blastocystis cysts may show small inclusion-like structures commonly described as mitochondria-like organelles. These are supportive internal details in the compact cyst body.",
          points: [
            "These are supportive structural inclusions rather than primary identifying features.",
            "They should be interpreted only after the cyst stage has already been recognized from the larger structures.",
            "They contribute to the biologically organized appearance of the cyst interior.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for small discrete inclusion-like bodies within the cyst interior.",
            "Check that they are distinct from nuclei and storage granules.",
            "Assess whether their placement is consistent with the internal cyst body rather than external artifact.",
          ],
          appearance: [
            "Usually appear as small compact internal bodies.",
            "They may be elongated or rounded depending on orientation.",
            "They are less visually dominant than the nuclei or cyst wall.",
          ],
        },
        significance: {
          lead: "Mitochondria-like organelles are supportive internal features that help reinforce the structured biological appearance of the Blastocystis cyst.",
          points: [
            "Useful as a secondary supportive feature.",
            "Adds to the impression of organized cyst contents.",
            "Should be used only in combination with stronger wall and nuclear findings.",
          ],
        },
        differential: {
          confusions: [
            "Small debris or dense artifacts may mimic these inclusions.",
            "Granules may be confused with mitochondria-like bodies if the view is poor.",
            "Without the rest of the cyst pattern, these bodies are not specific enough to interpret alone.",
          ],
          confirmation: [
            "Confirm the cyst wall and nuclei first.",
            "Differentiate these inclusions from storage granules based on distribution and appearance.",
            "Use them only as part of the total cyst morphology.",
          ],
        },
        reporting: {
          documentation: [
            "Describe mitochondria-like organelles as supportive internal inclusions when clearly visualized.",
            "Use them as secondary supportive morphology after documenting the main cyst features.",
          ],
          cautions: [
            "Do not overcall these structures if they could represent artifact or non-specific dense material.",
            "Avoid using them as a stand-alone basis for identification.",
          ],
        },
      }),
    },
  },

  CryptoSporidium: {
    oocyst: {
      oocystWall: makeFeatureTemplate({
        title: "Spherical Oocyst Wall",
        subtitle: "Outer protective wall of the oocyst",
        overview: {
          lead: "The Cryptosporidium oocyst is enclosed by a spherical outer wall. This wall defines the organism as an oocyst and encloses the sporozoites and residual body.",
          points: [
            "The oocyst wall is a stage-defining external feature.",
            "It provides the enclosing boundary around the internal infective structures.",
            "Its rounded compact outline is important in recognition.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for a small, rounded, clearly enclosed oocyst outline.",
            "Confirm that the wall surrounds internal sporozoites and internal bodies.",
            "Assess whether the contour is smooth and self-contained.",
          ],
          appearance: [
            "Usually appears as a compact spherical or near-spherical wall.",
            "The wall encloses all internal structures of the oocyst.",
            "It gives the organism a small, tightly packaged appearance.",
          ],
        },
        significance: {
          lead: "The spherical oocyst wall is essential for recognizing the Cryptosporidium oocyst stage and distinguishing it from trophozoite-like or elongated cystic forms.",
          points: [
            "Supports oocyst-stage identification.",
            "Provides the structural context for interpreting the sporozoites and residual body.",
            "Helps distinguish the organism from larger or more elongated coccidian oocysts.",
          ],
        },
        differential: {
          confusions: [
            "Rounded debris may mimic an oocyst wall.",
            "Poor focus may obscure the completeness of the outer boundary.",
            "Overlapping material may distort the apparent contour.",
          ],
          confirmation: [
            "Confirm that the wall encloses true internal biological structures.",
            "Correlate with internal sporozoites and residual body.",
            "Use the full external and internal pattern rather than the wall alone.",
          ],
        },
        reporting: {
          documentation: [
            "Describe the organism as having a spherical oocyst wall when the enclosing contour is clearly visualized.",
            "Use this as a major stage-supporting feature in the morphology note.",
          ],
          cautions: [
            "Do not identify the oocyst from contour alone.",
            "Be careful not to mistake rounded artifact or debris for a true oocyst wall.",
          ],
        },
      }),

      sporozoites: makeFeatureTemplate({
        title: "4 Sporozoites",
        subtitle: "Key infective internal bodies",
        overview: {
          lead: "The Cryptosporidium oocyst contains four sporozoites. These are the main internal infective structures and one of the most important recognition features of the oocyst.",
          points: [
            "The presence of four sporozoites is a major diagnostic clue.",
            "They are enclosed within the oocyst wall.",
            "They should be interpreted together with the spherical wall and residual body.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for four elongated internal bodies arranged within the oocyst.",
            "Confirm that the structures are enclosed by the oocyst wall.",
            "Assess whether they appear organized rather than random internal debris.",
          ],
          appearance: [
            "Usually appear as slender, curved or elongated internal bodies.",
            "They may be differently oriented within the oocyst interior.",
            "Their organized arrangement supports identification as sporozoites.",
          ],
        },
        significance: {
          lead: "The presence of four sporozoites is one of the most important internal features supporting recognition of a Cryptosporidium oocyst.",
          points: [
            "Strongly supports interpretation as a mature oocyst.",
            "Distinguishes the organism from simpler rounded inclusions lacking internal infective bodies.",
            "Provides the main internal biological evidence that the structure is a true oocyst.",
          ],
        },
        differential: {
          confusions: [
            "Internal artifact or debris may mimic elongated sporozoite-like bodies.",
            "Poor focus may make the number of sporozoites difficult to appreciate.",
            "Only seeing one or two bodies may reduce confidence if the rest are obscured.",
          ],
          confirmation: [
            "Scan the full oocyst interior and adjust focus.",
            "Confirm that the bodies are enclosed by the oocyst wall.",
            "Correlate with the residual body and overall oocyst morphology.",
          ],
        },
        reporting: {
          documentation: [
            "Document four sporozoites when clearly visualized within the oocyst.",
            "Use them as a primary internal feature in the morphology note.",
          ],
          cautions: [
            "Do not force the count if visibility is poor.",
            "Be cautious when elongated artifact could be mistaken for true sporozoites.",
          ],
        },
      }),

      nuclei: makeFeatureTemplate({
        title: "4 Nuclei",
        subtitle: "Internal nuclear structures of the sporozoites",
        overview: {
          lead: "Each sporozoite contains a nucleus, so multiple nuclei can be identified within the oocyst. These nuclei support interpretation of the internal bodies as true sporozoites.",
          points: [
            "The nuclei are internal features of the sporozoites.",
            "They help confirm that the elongated structures are biologically organized.",
            "They should be interpreted within the full sporozoite pattern.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for nuclear bodies within the internal sporozoites.",
            "Confirm that the nuclei correspond to the sporozoite structures rather than free-floating inclusions.",
            "Assess whether the nuclei are distinct from residual body material.",
          ],
          appearance: [
            "Usually appear as small internal nuclear bodies within the sporozoites.",
            "Some may be more obvious than others depending on the orientation.",
            "They support the interpretation of the sporozoites as structured internal cells.",
          ],
        },
        significance: {
          lead: "The nuclei help confirm that the internal elongated bodies are true sporozoites and strengthen recognition of the oocyst as a biologically organized structure.",
          points: [
            "Support the identity of the internal bodies as sporozoites.",
            "Add confidence to the interpretation of a true Cryptosporidium oocyst.",
            "Useful as a secondary internal confirmation feature.",
          ],
        },
        differential: {
          confusions: [
            "Dense internal granules may be mistaken for nuclei.",
            "Poor focus may blur the internal structure of the sporozoites.",
            "Residual material may simulate nuclear-like bodies.",
          ],
          confirmation: [
            "Verify that the nuclear structures align with the sporozoites.",
            "Differentiate them from the residual body and other inclusions.",
            "Use them as supportive evidence within the total oocyst pattern.",
          ],
        },
        reporting: {
          documentation: [
            "Describe nuclei as supportive internal structures when clearly visualized within the sporozoites.",
            "Pair this with the sporozoite count and oocyst wall description.",
          ],
          cautions: [
            "Do not overcount uncertain dense bodies as nuclei.",
            "Avoid relying on the nuclei alone without confirming the sporozoites.",
          ],
        },
      }),

      apicalComplex: makeFeatureTemplate({
        title: "Apical Complex",
        subtitle: "Specialized invasion-related organellar region",
        overview: {
          lead: "The apical complex includes the specialized invasion-related structures of the sporozoite, such as the conoid, rhoptries, micronemes, and associated organelles.",
          points: [
            "This is a high-value biological structure of the sporozoite.",
            "It reflects the invasive architecture of the parasite.",
            "Best interpreted after the sporozoites themselves are recognized.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for the specialized apical end of the sporozoites where the invasion-related organelles cluster.",
            "Assess whether the conoid and associated apical organelles are grouped toward one end of the sporozoite.",
            "Use the sporozoite orientation to localize the apical region correctly.",
          ],
          appearance: [
            "Usually appears as a concentrated specialized region at one end of the sporozoite.",
            "Contains the conoid and secretory organelles such as rhoptries and micronemes.",
            "More meaningful when the sporozoites are already confidently recognized.",
          ],
        },
        significance: {
          lead: "The apical complex is an important advanced structural feature that reinforces the identity of the internal bodies as apicomplexan sporozoites.",
          points: [
            "Supports interpretation of the internal elongated bodies as true sporozoites.",
            "Reflects the characteristic invasion machinery of the parasite.",
            "Useful as a detailed confirmatory structural feature in the model.",
          ],
        },
        differential: {
          confusions: [
            "Fine internal detail may be hard to appreciate if the sporozoite is not well oriented.",
            "Small internal organelles may blend together in poor views.",
            "Without recognizing the sporozoite first, the apical region can be misinterpreted.",
          ],
          confirmation: [
            "First confirm the sporozoite body.",
            "Then assess the specialized clustered organelles at one end.",
            "Use the apical complex as supportive advanced detail rather than primary screening morphology.",
          ],
        },
        reporting: {
          documentation: [
            "Describe the apical complex as supportive advanced internal sporozoite structure when clearly appreciable.",
            "Use it after documenting the wall, sporozoites, and residual body.",
          ],
          cautions: [
            "Do not rely on the apical complex alone for basic recognition.",
            "Be conservative if the internal organellar detail is not clearly resolved.",
          ],
        },
      }),

      residualBody: makeFeatureTemplate({
        title: "Residual Body",
        subtitle: "Supportive internal residual material",
        overview: {
          lead: "The residual body is an internal body within the oocyst that represents remaining material enclosed alongside the sporozoites.",
          points: [
            "It is a supportive internal feature of the oocyst.",
            "It should be interpreted with the wall and sporozoites, not alone.",
            "It helps reinforce the internal organization of the oocyst.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for a compact internal residual mass separate from the sporozoites.",
            "Check that it lies within the oocyst and not outside it.",
            "Differentiate it from nuclei and apical structures.",
          ],
          appearance: [
            "Usually appears as a discrete internal residual body within the oocyst.",
            "It is more compact than the elongated sporozoites.",
            "Its position may vary slightly depending on orientation.",
          ],
        },
        significance: {
          lead: "The residual body is a supportive internal feature that adds confidence to the interpretation of the oocyst as a structured biological stage.",
          points: [
            "Helps distinguish a true oocyst from simple spherical artifact.",
            "Adds to the internal complexity expected of the organism.",
            "Useful as a secondary supporting feature.",
          ],
        },
        differential: {
          confusions: [
            "Dense internal debris may mimic a residual body.",
            "Poor visualization may make it blend with other internal structures.",
            "Granular artifact inside the wall may be misleading.",
          ],
          confirmation: [
            "Confirm that it lies within a true oocyst wall.",
            "Differentiate it from the sporozoites and their nuclei.",
            "Use it only as part of the total oocyst morphology.",
          ],
        },
        reporting: {
          documentation: [
            "Describe the residual body as a supportive internal feature when clearly visualized.",
            "Mention it after documenting the main wall and sporozoite findings.",
          ],
          cautions: [
            "Do not rely on the residual body alone for identification.",
            "Be cautious if the internal mass could represent artifact or non-specific debris.",
          ],
        },
      }),
    },
  },

  CystoisosporaBelli: {
    oocyst: {
      oocystShape: makeFeatureTemplate({
        title: "Elongated Ellipsoidal Oocyst",
        subtitle: "Characteristic overall contour of the oocyst",
        overview: {
          lead: "Cystoisospora belli oocysts are characteristically elongated and ellipsoidal rather than spherical. This overall outline is one of the first and most useful gross-recognition features.",
          points: [
            "The elongated ellipsoidal contour is a major stage-defining external feature.",
            "It helps distinguish Cystoisospora belli from smaller rounded coccidian oocysts.",
            "The external shape provides the overall context for the internal sporocysts and sporozoites.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for an elongated, oval-to-ellipsoidal outer contour rather than a compact spherical shape.",
            "Assess the full length-to-width relationship of the organism.",
            "Check that the internal structures are enclosed within this elongated outline.",
          ],
          appearance: [
            "Usually appears longer than wide with a smooth continuous contour.",
            "The overall body plan is more elongated than a spherical oocyst.",
            "Its shape is often one of the easiest screening clues before finer internal assessment.",
          ],
        },
        significance: {
          lead: "The elongated ellipsoidal shape is one of the most important gross morphological features supporting recognition of Cystoisospora belli oocysts.",
          points: [
            "Helps distinguish it from rounder oocysts such as Cryptosporidium.",
            "Supports recognition of the oocyst stage before internal features are examined in detail.",
            "Provides the structural context for locating the sporocysts.",
          ],
        },
        differential: {
          confusions: [
            "Elongated debris or artifact may mimic the outer contour.",
            "Distortion from preparation pressure may alter the apparent shape.",
            "Partial visibility may make the oocyst seem less elongated than it truly is.",
          ],
          confirmation: [
            "Confirm that the elongated contour encloses true internal sporocysts and sporozoites.",
            "Correlate with the smooth wall and organized internal contents.",
            "Use the full external and internal pattern rather than shape alone.",
          ],
        },
        reporting: {
          documentation: [
            "Describe the oocyst as elongated or ellipsoidal when the outer contour is clearly visualized.",
            "Use this as a major gross morphological feature in the morphology note.",
          ],
          cautions: [
            "Do not identify the oocyst solely from shape.",
            "Be cautious when the outline could be due to artifact or distortion.",
          ],
        },
      }),

      oocystWall: makeFeatureTemplate({
        title: "Smooth Outer Wall",
        subtitle: "External enclosing wall of the oocyst",
        overview: {
          lead: "The Cystoisospora belli oocyst is enclosed by a smooth outer wall that defines and protects the internal sporocysts and sporozoites.",
          points: [
            "The wall is the enclosing external boundary of the oocyst.",
            "It supports interpretation of the organism as a true oocyst rather than random elongated debris.",
            "It should be interpreted together with the elongated shape and internal sporocysts.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for a continuous smooth outer boundary enclosing the internal structures.",
            "Assess whether the wall looks regular and unbroken.",
            "Check that the wall contains the sporocysts within the oocyst body.",
          ],
          appearance: [
            "Usually appears as a smooth outer contour rather than a rugged or irregular boundary.",
            "The wall encloses the full elongated oocyst body.",
            "Its regularity helps reinforce the organized biological appearance of the organism.",
          ],
        },
        significance: {
          lead: "A smooth outer wall supports the interpretation of the organism as a structured Cystoisospora belli oocyst and provides the boundary for assessing the internal sporocysts.",
          points: [
            "Supports identification of an intact oocyst stage.",
            "Helps distinguish the organism from elongated debris lacking a true enclosing wall.",
            "Provides the structural frame for the internal sporocysts and sporozoites.",
          ],
        },
        differential: {
          confusions: [
            "Artifact or elongated debris may mimic an outer contour.",
            "Poor focus can make the wall seem broken or incomplete.",
            "Overlapping material may distort the apparent wall smoothness.",
          ],
          confirmation: [
            "Confirm that the wall encloses true internal biological structures.",
            "Correlate with the elongated shape and visible sporocysts.",
            "Use the internal organization to support the finding.",
          ],
        },
        reporting: {
          documentation: [
            "Describe the oocyst as having a smooth outer wall when the enclosing contour is clearly seen.",
            "Use this as a supportive structural feature in the morphology note.",
          ],
          cautions: [
            "Do not identify the parasite from wall appearance alone.",
            "Ensure the contour is not a non-biological artifact.",
          ],
        },
      }),

      sporocysts: makeFeatureTemplate({
        title: "2 Sporocysts",
        subtitle: "Major internal compartmental structures",
        overview: {
          lead: "A mature Cystoisospora belli oocyst contains two sporocysts. These are major internal compartments and one of the most important internal organizational features.",
          points: [
            "The presence of two sporocysts is a key internal architectural feature.",
            "Each sporocyst encloses sporozoites and supporting internal structures.",
            "They should be interpreted within the elongated oocyst wall.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for two distinct internal sporocyst bodies within the oocyst.",
            "Confirm that both are enclosed by the outer oocyst wall.",
            "Assess whether they appear as organized internal compartments rather than random inclusions.",
          ],
          appearance: [
            "Usually appear as two separate internal bodies aligned within the elongated oocyst.",
            "They are larger structural compartments than the individual sporozoites.",
            "Their presence gives the oocyst a clearly partitioned internal organization.",
          ],
        },
        significance: {
          lead: "The presence of two sporocysts is one of the key internal features supporting recognition of a mature Cystoisospora belli oocyst.",
          points: [
            "Strongly supports mature oocyst interpretation.",
            "Provides the main organizational framework for the internal sporozoites.",
            "Helps distinguish this oocyst from organisms with different internal packaging.",
          ],
        },
        differential: {
          confusions: [
            "Internal debris or fold-like structures may mimic compartmental boundaries.",
            "Poor focus may obscure one sporocyst.",
            "Partial visualization may make the internal layout seem simpler than it truly is.",
          ],
          confirmation: [
            "Adjust focus to confirm two enclosed internal compartments.",
            "Correlate with the sporozoites and residual bodies within them.",
            "Use the elongated outer oocyst shape as supporting context.",
          ],
        },
        reporting: {
          documentation: [
            "Document the presence of two sporocysts when clearly visualized within the oocyst.",
            "Use them as a major internal feature in the morphology note.",
          ],
          cautions: [
            "Do not force the count if only one compartment is convincingly seen.",
            "Be cautious if artifact or overlap could mimic internal partitioning.",
          ],
        },
      }),

      sporozoites: makeFeatureTemplate({
        title: "4 Sporozoites per Sporocyst",
        subtitle: "Internal infective bodies within each sporocyst",
        overview: {
          lead: "Each sporocyst of Cystoisospora belli contains four sporozoites. These are the key infective internal bodies and are central to recognizing the mature internal organization.",
          points: [
            "The sporozoites are contained within the sporocysts, not free-floating in the oocyst.",
            "Their organized arrangement supports the interpretation of a mature oocyst.",
            "They should be interpreted together with the sporocysts and nuclei.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for elongated internal sporozoites within each sporocyst.",
            "Assess whether the internal bodies appear organized and enclosed within the sporocyst compartments.",
            "Differentiate them from residual material and other dense internal structures.",
          ],
          appearance: [
            "Usually appear as slender, curved or elongated internal bodies.",
            "They are smaller than the sporocysts themselves and enclosed within them.",
            "Their arrangement reinforces the organized internal structure of the oocyst.",
          ],
        },
        significance: {
          lead: "The presence of sporozoites within the sporocysts is one of the most important internal features supporting recognition of a mature Cystoisospora belli oocyst.",
          points: [
            "Strongly supports mature infective-stage interpretation.",
            "Distinguishes the organism from empty or artifactually partitioned structures.",
            "Provides biological confirmation of the sporocyst compartments.",
          ],
        },
        differential: {
          confusions: [
            "Internal debris may mimic elongated sporozoite-like bodies.",
            "Poor focus may make the number or shape of the sporozoites hard to appreciate.",
            "Only some sporozoites may be clearly seen depending on orientation.",
          ],
          confirmation: [
            "Confirm that the elongated bodies lie inside the sporocysts.",
            "Correlate with the nuclei and residual bodies.",
            "Use multiple focal levels to distinguish true sporozoites from artifact.",
          ],
        },
        reporting: {
          documentation: [
            "Describe the presence of sporozoites within the sporocysts when clearly visualized.",
            "Use them as a major internal feature in the morphology note.",
          ],
          cautions: [
            "Do not force an exact count if internal visibility is poor.",
            "Be cautious when elongated internal artifact could mimic sporozoites.",
          ],
        },
      }),

      nuclei: makeFeatureTemplate({
        title: "Sporozoite Nuclei",
        subtitle: "Internal nuclear structures of the sporozoites",
        overview: {
          lead: "Each sporozoite contains a nucleus, and these nuclei help confirm that the internal elongated bodies are true structured sporozoites.",
          points: [
            "The nuclei are internal features of the sporozoites.",
            "They help distinguish organized biological bodies from simple internal debris.",
            "They should be interpreted in the context of the sporocysts and sporozoites.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for small nuclear bodies within the individual sporozoites.",
            "Confirm that the nuclei correspond to the sporozoite structures rather than lying separately.",
            "Assess whether they help reinforce the identity of the elongated bodies as true sporozoites.",
          ],
          appearance: [
            "Usually appear as small internal nuclear structures within the sporozoites.",
            "Some may be more obvious than others depending on the view and focus.",
            "They support the biological organization of the sporozoites.",
          ],
        },
        significance: {
          lead: "The nuclei help confirm that the internal elongated structures are true sporozoites and strengthen recognition of the mature oocyst.",
          points: [
            "Support the identity of the internal bodies as real sporozoites.",
            "Add confidence to the interpretation of a true organized coccidian oocyst.",
            "Useful as an internal confirmation feature rather than the first screening clue.",
          ],
        },
        differential: {
          confusions: [
            "Dense internal granules may be mistaken for nuclei.",
            "Poor focus may blur the sporozoite internal structure.",
            "Residual material may simulate nuclear-like bodies.",
          ],
          confirmation: [
            "Confirm that the nuclear structures lie within the sporozoites.",
            "Differentiate them from residual bodies and other internal inclusions.",
            "Use them as supportive evidence within the total oocyst pattern.",
          ],
        },
        reporting: {
          documentation: [
            "Describe nuclei as supportive internal structures when clearly visualized within the sporozoites.",
            "Pair this with the sporocyst and sporozoite findings.",
          ],
          cautions: [
            "Do not overcount uncertain dense bodies as nuclei.",
            "Avoid relying on nuclei alone without confirming the sporozoites.",
          ],
        },
      }),

      residualBody: makeFeatureTemplate({
        title: "Residual Bodies",
        subtitle: "Supportive internal residual material",
        overview: {
          lead: "Residual bodies are supportive internal structures within the sporocysts or oocyst that represent remaining enclosed material alongside the sporozoites.",
          points: [
            "They are supportive internal features rather than the primary recognition structures.",
            "They help reinforce the organized internal packaging of the mature oocyst.",
            "They should be interpreted with the sporocysts and sporozoites, not alone.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for compact internal residual masses separate from the sporozoites.",
            "Check that they lie within the organized internal compartments.",
            "Differentiate them from nuclei and other dense internal structures.",
          ],
          appearance: [
            "Usually appear as compact internal residual material.",
            "They are denser and less elongated than the sporozoites.",
            "Their position may vary depending on the internal organization and view.",
          ],
        },
        significance: {
          lead: "Residual bodies are supportive internal features that add confidence to the interpretation of the oocyst as a structured mature stage.",
          points: [
            "Help distinguish a true organized oocyst from artifact.",
            "Add to the internal biological complexity expected of the mature oocyst.",
            "Useful as a secondary supporting feature.",
          ],
        },
        differential: {
          confusions: [
            "Dense internal debris may mimic a residual body.",
            "Poor visualization may make residual material blend with other structures.",
            "Granular artifact may be misleading in crowded fields.",
          ],
          confirmation: [
            "Confirm that the residual material lies within the oocyst organization.",
            "Differentiate it from sporozoites and nuclei.",
            "Use it only as part of the total oocyst morphology.",
          ],
        },
        reporting: {
          documentation: [
            "Describe residual bodies as supportive internal features when clearly visualized.",
            "Mention them after documenting the main shape, wall, and sporocyst findings.",
          ],
          cautions: [
            "Do not rely on residual bodies alone for identification.",
            "Be cautious if the internal mass could represent non-specific artifact or debris.",
          ],
        },
      }),
    },
  },

  DientamoebaFragilis: {
    trophozoite: {
      nuclei: makeFeatureTemplate({
        title: "Two Nuclei",
        subtitle: "Major internal landmark of the trophozoite",
        overview: {
          lead: "Dientamoeba fragilis trophozoites commonly show two nuclei, although variation can occur. The binucleate pattern is one of the most important recognition features of the organism.",
          points: [
            "The presence of two nuclei is a major diagnostic clue.",
            "The nuclei should be interpreted together with the granular cytoplasm and irregular amoeboid outline.",
            "The binucleate appearance helps distinguish the organism from trophozoites with a single nucleus.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for two distinct internal nuclei within the trophozoite body.",
            "Confirm that both nuclei are internal to the organism and not overlapping external structures.",
            "Assess whether the two nuclei fit the overall body plan of Dientamoeba fragilis.",
          ],
          appearance: [
            "Usually appears as two rounded internal nuclear bodies.",
            "One nucleus may be more obvious than the other depending on focus.",
            "The paired nuclei are among the most important internal landmarks of the trophozoite.",
          ],
        },
        significance: {
          lead: "The presence of two nuclei is one of the most useful recognition features for Dientamoeba fragilis trophozoites and strongly supports the interpretation when the rest of the morphology is compatible.",
          points: [
            "Helps distinguish the organism from amoebae with a single nucleus.",
            "Supports trophozoite-stage identification.",
            "Should be combined with chromatin pattern and cytoplasmic appearance for stronger confidence.",
          ],
        },
        differential: {
          confusions: [
            "One nucleus may be missed if the focus is poor or the specimen is distorted.",
            "Internal vacuoles or debris may distract from the true nuclear pattern.",
            "Partial overlap with surrounding material may obscure one nucleus.",
          ],
          confirmation: [
            "Adjust focus to inspect both nuclear bodies clearly.",
            "Correlate with fragmented chromatin and granular cytoplasm.",
            "Use the full trophozoite outline and internal pattern rather than nuclei alone.",
          ],
        },
        reporting: {
          documentation: [
            "Document the presence of two nuclei when clearly visualized.",
            "Use the binucleate pattern together with the rest of the trophozoite morphology in the note.",
          ],
          cautions: [
            "Do not reject the organism only because both nuclei are not equally obvious in one focal plane.",
            "Avoid overcalling nuclei when the internal bodies are poorly resolved.",
          ],
        },
      }),

      karyosome: makeFeatureTemplate({
        title: "Central Karyosomal Granules",
        subtitle: "Dense internal nuclear detail",
        overview: {
          lead: "Each nucleus contains a karyosomal region that appears as a dense central granule-like structure. These internal nuclear dots support identification of true nuclei.",
          points: [
            "The karyosomal granules are internal features of each nucleus.",
            "They help confirm that the rounded bodies seen are true nuclei.",
            "They are best interpreted only after the nuclei themselves are recognized.",
          ],
        },
        recognition: {
          lookFor: [
            "Inspect each nucleus for a denser internal central granule or dot.",
            "Assess whether the dense body lies within a true nucleus rather than free in the cytoplasm.",
            "Compare both nuclei when possible because one may show the feature more clearly.",
          ],
          appearance: [
            "Usually appears as a compact internal dense point within the nucleus.",
            "May be more obvious in one nucleus than the other depending on angle and focus.",
            "Best appreciated when the nuclear boundary is also visible.",
          ],
        },
        significance: {
          lead: "Central karyosomal granules help confirm the identity of the nuclei and add confidence to the interpretation of the trophozoite as Dientamoeba fragilis.",
          points: [
            "Supports that the internal rounded bodies are true nuclei.",
            "Useful as a supportive internal nuclear feature.",
            "Best interpreted together with the binucleate pattern and fragmented chromatin.",
          ],
        },
        differential: {
          confusions: [
            "Artifacts can simulate small dense internal dots.",
            "Poor focus may make the internal granule hard to localize accurately.",
            "If the nuclear boundary is unclear, the dense body may be misinterpreted.",
          ],
          confirmation: [
            "Confirm the nucleus itself before interpreting the central granule.",
            "Compare with the other nucleus if visible.",
            "Use it as supportive evidence rather than a stand-alone sign.",
          ],
        },
        reporting: {
          documentation: [
            "Document central karyosomal granules when clearly seen within identifiable nuclei.",
            "Mention them as supportive nuclear detail in the morphology description.",
          ],
          cautions: [
            "Do not overinterpret the karyosomal detail if the nuclei are blurred or incomplete.",
            "Use cautious wording when only one nucleus is clearly resolved.",
          ],
        },
      }),

      chromatin: makeFeatureTemplate({
        title: "Fragmented Nuclear Chromatin",
        subtitle: "Characteristic internal nuclear pattern",
        overview: {
          lead: "Dientamoeba fragilis nuclei show a characteristic fragmented or clumped chromatin pattern rather than the smooth peripheral chromatin distribution seen in many other protozoa.",
          points: [
            "This is one of the key nuclear recognition features of Dientamoeba fragilis.",
            "The chromatin pattern is more irregular and fragmented than a neat peripheral rim.",
            "It should be assessed together with the two nuclei and karyosomal granules.",
          ],
        },
        recognition: {
          lookFor: [
            "Inspect the nuclear interior for fragmented, irregular, or clumped chromatin rather than a delicate peripheral lining.",
            "Assess whether the chromatin looks disorganized or broken into internal fragments.",
            "Use both nuclei when possible to confirm the pattern.",
          ],
          appearance: [
            "Usually appears more fragmented and irregular than a smooth peripheral chromatin rim.",
            "May look clumped or broken into internal strands or blocks.",
            "Its appearance can vary somewhat with focus and staining quality.",
          ],
        },
        significance: {
          lead: "Fragmented chromatin is one of the most useful nuclear features supporting the recognition of Dientamoeba fragilis trophozoites.",
          points: [
            "Helps distinguish Dientamoeba fragilis from amoebae with finer or more regular peripheral chromatin.",
            "Strengthens interpretation when the organism is clearly binucleate.",
            "Should be considered a high-value supportive nuclear feature.",
          ],
        },
        differential: {
          confusions: [
            "Poor staining or artifact can create a false impression of fragmentation.",
            "Only seeing part of the nucleus may make the chromatin look more irregular than it truly is.",
            "Granular cytoplasm nearby may visually interfere with nuclear detail.",
          ],
          confirmation: [
            "Confirm the nuclei first before interpreting chromatin detail.",
            "Compare both nuclei if both are visible.",
            "Use the fragmented pattern together with trophozoite shape and cytoplasmic texture.",
          ],
        },
        reporting: {
          documentation: [
            "Describe the chromatin as fragmented or irregular when that pattern is clearly seen.",
            "Use it as a major supportive nuclear feature in the morphology note.",
          ],
          cautions: [
            "Do not overcall fragmented chromatin if the nucleus is not clearly resolved.",
            "Avoid making the interpretation from one blurred focal plane.",
          ],
        },
      }),

      vacuoles: makeFeatureTemplate({
        title: "Food Vacuoles / Ingested Debris",
        subtitle: "Supportive internal inclusions",
        overview: {
          lead: "Dientamoeba fragilis trophozoites may contain vacuoles and ingested particulate material. These inclusions contribute to the granular internal appearance of the organism.",
          points: [
            "These are supportive internal trophozoite features.",
            "They should be interpreted as internal inclusions rather than primary defining structures.",
            "They are useful when seen with the two nuclei and granular cytoplasm.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for vacuolar spaces and particulate internal material within the trophozoite.",
            "Check that the inclusions are enclosed within the organism body.",
            "Differentiate these inclusions from the nuclei and chromatin structures.",
          ],
          appearance: [
            "Usually appear as internal vacuoles with particulate or ingested material.",
            "They may vary in size and prominence across the trophozoite.",
            "The inclusions contribute to the non-empty, active appearance of the cytoplasm.",
          ],
        },
        significance: {
          lead: "Food vacuoles and internal debris are supportive cytoplasmic features that help reinforce the trophozoite’s active granular internal organization.",
          points: [
            "Useful as supportive internal evidence of trophozoite structure.",
            "Adds to the granular, irregular internal appearance expected in the organism.",
            "Should not be treated as a stand-alone identifying feature.",
          ],
        },
        differential: {
          confusions: [
            "Background debris may mimic true internal inclusions.",
            "Vacuoles can be confused with poorly resolved nuclei if not interpreted carefully.",
            "External overlap may falsely suggest ingested material.",
          ],
          confirmation: [
            "Confirm that the inclusions are internal to the trophozoite boundary.",
            "Differentiate them clearly from nuclei and chromatin features.",
            "Use them only as supportive findings within the full trophozoite pattern.",
          ],
        },
        reporting: {
          documentation: [
            "Describe food vacuoles or internal particulate material as supportive cytoplasmic findings when clearly visualized.",
            "Mention them after documenting the nuclei and nuclear pattern.",
          ],
          cautions: [
            "Do not rely on vacuoles or ingested material alone for identification.",
            "Be cautious when overlap or artifact could mimic internal inclusions.",
          ],
        },
      }),

      cytoplasm: makeFeatureTemplate({
        title: "Granular Irregular Amoeboid Cytoplasm",
        subtitle: "Whole-cell body plan and texture",
        overview: {
          lead: "Dientamoeba fragilis trophozoites typically show a granular cytoplasm and an irregular amoeboid outline. This combination provides the overall body context for interpreting the nuclei and other internal features.",
          points: [
            "The organism is not smoothly symmetric; it has an irregular amoeboid contour.",
            "The cytoplasm appears granular rather than clear and empty.",
            "This feature is most useful when combined with the binucleate nuclear pattern.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for an irregular amoeboid outline rather than a neat round or bilaterally symmetric body.",
            "Inspect the cytoplasm for a granular, active-looking internal texture.",
            "Assess whether the whole cell shape supports interpretation as an amoeboid trophozoite.",
          ],
          appearance: [
            "Usually appears uneven, irregular, and amoeboid in contour.",
            "The cytoplasm is granular and may contain various inclusions.",
            "The organism looks less orderly than trophozoites such as Giardia.",
          ],
        },
        significance: {
          lead: "Granular irregular amoeboid cytoplasm is an important whole-cell supportive feature that helps place the nuclear findings in the correct morphological context.",
          points: [
            "Supports trophozoite-stage interpretation.",
            "Helps distinguish the organism from more symmetric flagellated protozoa.",
            "Works best when paired with two nuclei and fragmented chromatin.",
          ],
        },
        differential: {
          confusions: [
            "Poor slide quality can exaggerate the apparent granularity or irregularity.",
            "Distorted organisms may look more irregular than they truly are.",
            "Background artifact can interfere with outline interpretation.",
          ],
          confirmation: [
            "Use the whole-cell contour together with the nuclei and chromatin pattern.",
            "Confirm that the granular texture belongs to the organism and not the background.",
            "Treat body shape and cytoplasmic texture as supportive pattern features.",
          ],
        },
        reporting: {
          documentation: [
            "Describe the trophozoite as showing granular cytoplasm and an irregular amoeboid outline when clearly visualized.",
            "Use this as supportive whole-cell morphology together with the nuclear findings.",
          ],
          cautions: [
            "Do not identify the organism from cytoplasmic appearance alone.",
            "Be cautious when the contour is distorted or partly obscured.",
          ],
        },
      }),
    },
  },
};

export const getFeatureContent = ({
  parasiteId,
  stage,
  markerId,
  fallbackTitle = "Diagnostic Feature",
}) => {
  const content = FEATURE_CONTENT?.[parasiteId]?.[stage]?.[markerId];

  if (content) return content;

  return {
    title: fallbackTitle,
    subtitle: "Structured diagnostic note",
    sections: {
      overview: {
        heading: "Overview",
        blocks: [
          {
            type: "lead",
            content:
              "Content for this diagnostic feature has not been written yet. Use the same template structure to add practical microscope recognition notes, diagnostic value, differential points, and reporting guidance.",
          },
        ],
      },
      recognition: {
        heading: "How to Recognize It",
        blocks: [],
      },
      significance: {
        heading: "Diagnostic Value",
        blocks: [],
      },
      differential: {
        heading: "Common Confusions",
        blocks: [],
      },
      reporting: {
        heading: "Reporting Guidance",
        blocks: [],
      },
    },
  };
};
