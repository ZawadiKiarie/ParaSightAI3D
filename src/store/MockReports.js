export const mockReports = [
  {
    id: "RPT-2026-001",
    date: "2026-04-07",
    parasiteName: "Plasmodium falciparum",
    confidence: 94.5,
    status: "Confirmed",
    user: "Dr. Sarah Chen",
    imageUrl:
      "https://images.unsplash.com/photo-1775583921546-b676c0b1624c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWNyb3Njb3B5JTIwcGFyYXNpdGUlMjBtYWxhcmlhJTIwYmxvb2R8ZW58MXx8fHwxNzc1NjkwNDcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    notes:
      "Clear ring-stage trophozoites observed. Patient shows symptoms consistent with malaria. Recommended immediate treatment protocol.",
    detectionDetails: {
      sampleId: "SMPL-20260407-A1",
      processingTime: "2.3s",
      imageResolution: "2048x1536",
      detectionMethod: "CNN-Based Detection v3.2",
    },
  },
  {
    id: "RPT-2026-002",
    date: "2026-04-06",
    parasiteName: "Giardia lamblia",
    confidence: 88.2,
    status: "Confirmed",
    user: "Dr. Michael Rodriguez",
    imageUrl:
      "https://images.unsplash.com/photo-1630959305529-67447c685b9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWNyb3Njb3BlJTIwbWVkaWNhbCUyMGxhYm9yYXRvcnklMjBzYW1wbGV8ZW58MXx8fHwxNzc1NjkwNDcyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    notes:
      "Trophozoite forms identified in stool sample. Characteristic pear-shaped morphology visible.",
    detectionDetails: {
      sampleId: "SMPL-20260406-B3",
      processingTime: "1.8s",
      imageResolution: "2048x1536",
      detectionMethod: "CNN-Based Detection v3.2",
    },
  },
  {
    id: "RPT-2026-003",
    date: "2026-04-05",
    parasiteName: "Trypanosoma cruzi",
    confidence: 91.7,
    status: "Pending Review",
    user: "Dr. Sarah Chen",
    imageUrl:
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaW9sb2dpY2FsJTIwbWljcm9zY29weSUyMGNlbGwlMjBzYW1wbGV8ZW58MXx8fHwxNzc1NjkwNDcyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    notes:
      "Trypomastigote forms detected in blood smear. Requires confirmatory testing and clinical correlation.",
    detectionDetails: {
      sampleId: "SMPL-20260405-C2",
      processingTime: "3.1s",
      imageResolution: "2048x1536",
      detectionMethod: "CNN-Based Detection v3.2",
    },
  },
  {
    id: "RPT-2026-004",
    date: "2026-04-04",
    parasiteName: "Entamoeba histolytica",
    confidence: 76.3,
    status: "Not Confirmed",
    user: "Dr. Emily Watson",
    imageUrl:
      "https://images.unsplash.com/photo-1768498950637-88d073faa491?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWJvcmF0b3J5JTIwbWVkaWNhbCUyMGRpYWdub3N0aWMlMjB0ZXN0aW5nfGVufDF8fHx8MTc3NTY5MDQ3Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    notes:
      "Initial detection flagged, but manual review determined negative result. Possibly non-pathogenic E. dispar.",
    detectionDetails: {
      sampleId: "SMPL-20260404-D1",
      processingTime: "2.6s",
      imageResolution: "2048x1536",
      detectionMethod: "CNN-Based Detection v3.2",
    },
  },
  {
    id: "RPT-2026-005",
    date: "2026-04-03",
    parasiteName: "Plasmodium vivax",
    confidence: 89.9,
    status: "Confirmed",
    user: "Dr. Michael Rodriguez",
    imageUrl:
      "https://images.unsplash.com/photo-1685799666411-adfec5b98693?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXRyaSUyMGRpc2glMjBiYWN0ZXJpYWwlMjBjdWx0dXJlfGVufDF8fHx8MTc3NTY5MDQ3M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    notes:
      "Enlarged infected erythrocytes with Schüffner's dots visible. Consistent with P. vivax infection.",
    detectionDetails: {
      sampleId: "SMPL-20260403-E5",
      processingTime: "2.1s",
      imageResolution: "2048x1536",
      detectionMethod: "CNN-Based Detection v3.2",
    },
  },
  {
    id: "RPT-2026-006",
    date: "2026-04-02",
    parasiteName: "Leishmania donovani",
    confidence: 92.4,
    status: "Confirmed",
    user: "Dr. Sarah Chen",
    imageUrl:
      "https://images.unsplash.com/photo-1775583921546-b676c0b1624c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWNyb3Njb3B5JTIwcGFyYXNpdGUlMjBtYWxhcmlhJTIwYmxvb2R8ZW58MXx8fHwxNzc1NjkwNDcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    notes:
      "Amastigotes identified within macrophages. Clinical presentation supports visceral leishmaniasis diagnosis.",
    detectionDetails: {
      sampleId: "SMPL-20260402-F2",
      processingTime: "2.8s",
      imageResolution: "2048x1536",
      detectionMethod: "CNN-Based Detection v3.2",
    },
  },
  {
    id: "RPT-2026-007",
    date: "2026-04-01",
    parasiteName: "Toxoplasma gondii",
    confidence: 81.5,
    status: "Pending Review",
    user: "Dr. Emily Watson",
    imageUrl:
      "https://images.unsplash.com/photo-1630959305529-67447c685b9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWNyb3Njb3BlJTIwbWVkaWNhbCUyMGxhYm9yYXRvcnklMjBzYW1wbGV8ZW58MXx8fHwxNzc1NjkwNDcyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    notes:
      "Tachyzoites suspected in tissue sample. Awaiting serological confirmation.",
    detectionDetails: {
      sampleId: "SMPL-20260401-G3",
      processingTime: "3.4s",
      imageResolution: "2048x1536",
      detectionMethod: "CNN-Based Detection v3.2",
    },
  },
  {
    id: "RPT-2026-008",
    date: "2026-03-31",
    parasiteName: "Schistosoma mansoni",
    confidence: 95.8,
    status: "Confirmed",
    user: "Dr. Michael Rodriguez",
    imageUrl:
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaW9sb2dpY2FsJTIwbWljcm9zY29weSUyMGNlbGwlMjBzYW1wbGV8ZW58MXx8fHwxNzc1NjkwNDcyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    notes:
      "Characteristic oval eggs with lateral spine identified in stool sample. High confidence detection.",
    detectionDetails: {
      sampleId: "SMPL-20260331-H1",
      processingTime: "1.9s",
      imageResolution: "2048x1536",
      detectionMethod: "CNN-Based Detection v3.2",
    },
  },
];
