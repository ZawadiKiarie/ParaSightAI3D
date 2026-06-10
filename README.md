# ParaSightAI Frontend Documentation

## Overview

The ParaSightAI frontend is a React-based web application that provides the user interface for AI-assisted intestinal parasite detection, interactive 3D parasite visualization, guided learning, lab simulation, authentication, dashboard access, and report management.

The frontend connects to the backend API for user authentication, image upload, AI detection results, saved reports, profile information, and PDF report export. It also contains the interactive 3D visualization module built using React Three Fiber, Three.js, Drei, Jotai, and GLSL shaders.

## Main Frontend Features

### 1. Landing Page

The landing page introduces ParaSightAI as an AI-powered parasite detection and 3D microscopy visualization platform. It contains the navigation bar, hero section, system overview, experience preview, and footer.

Main components:

```text
Landing.jsx
Navigation.jsx
HeroSection.jsx
SystemOverview.jsx
ExperiencePreview.jsx
Footer.jsx
```

### 2. Authentication

The authentication module allows users to register and log in. After successful authentication, the user token is stored in `sessionStorage`, and the logged-in user profile is loaded into global state.

Main file:

```text
Auth.jsx
```

Main responsibilities:

```text
- Handle sign-in and sign-up form inputs
- Validate user details
- Send authentication requests to the backend
- Store token in sessionStorage
- Redirect authenticated users to the dashboard
```

### 3. Dashboard

The dashboard is the main entry point after login. It displays a personalized welcome message, module cards, profile dropdown, logout action, and recent detection activity.

Main components:

```text
Dashboard.jsx
DashboardHeader.jsx
ModuleGrid.jsx
RecentActivity.jsx
```

Dashboard modules include:

```text
- AI Detection
- 3D Visualization
- Lab Simulation
- Reports
```

### 4. AI Detection Workspace

The AI Detection page allows users to upload a microscopy image for parasite detection. The image can be selected manually or dragged and dropped into the upload area.

Main file:

```text
DetectionWorkspace.jsx
```

Main responsibilities:

```text
- Accept image uploads
- Preview selected image
- Validate selected file
- Send image as FormData to backend /upload route
- Redirect user to the detection results page
```

### 5. Detection Results

The Detection Results page displays the AI output after image analysis. It shows detected parasite information, confidence score, bounding boxes, and actions for opening the result in 3D or viewing the saved report.

Main file:

```text
DetectionResults.jsx
```

Main responsibilities:

```text
- Display uploaded microscopy image
- Draw bounding boxes on canvas
- Show parasite class and confidence score
- Provide “View in 3D” action
- Provide report navigation
```

### 6. Result-Mapped 3D Visualization

The result-mapped 3D view connects AI detection output to the correct parasite model. It uses the detected `parasiteId` and stage to load the matching 3D model and diagnostic feature list.

Main files:

```text
3DView.jsx
useThreeDViewState.js
```

Main responsibilities:

```text
- Read AI detection result from route state
- Extract parasiteId and stage
- Load matching parasite model
- Display AI result summary
- Show interactive 3D model preview
- Provide zoom, rotation, transparency, highlight, and feature focus controls
```

### 7. Guided Learning Module

The Guided Learning module allows users to explore parasite morphology without needing to upload an image. It supports parasite selection, life-stage switching, diagnostic markers, feature focus mode, and isolated feature explanations.

Main files:

```text
GuidedLearning.jsx
OverlayUI.jsx
ListOverlay.jsx
StageToggle.jsx
SpecimenStage.jsx
DiagnosticMarker.jsx
FocusFeatureOverlay.jsx
IsolatedFeature.jsx
FeatureContent.js
```

Guided learning flow:

```text
Home Overlay
→ Parasite Selection
→ Stage Toggle
→ Diagnostic Marker View
→ Feature Focus Mode
→ Isolated Feature Explanation
```

### 8. 3D Parasite Modelling and Rendering

The parasite models were created manually in Blender and converted into React-compatible JSX mesh components using `gltfjsx`.

Example conversion command:

```bash
npx gltfjsx@6.5.3 public/models/ModelName.glb -o src/components/Path/ModelName.jsx -k -r public
```

The models are rendered in the browser using React Three Fiber and Three.js. Custom shader materials are used to create transparent, organic, glowing, and cytoplasm-like biological effects.

3D technologies used:

```text
- React Three Fiber
- Three.js
- Drei
- GLSL shaders
- Blender
- gltfjsx
```

### 9. Lab Simulation

The lab simulation is an immersive 3D environment that demonstrates the diagnostic workflow. The user moves through stations such as sample preparation, microscope interaction, AI analysis, 3D visualization chamber, and learning wall.

Main workflow:

```text
Enter Lab
→ Sample Preparation
→ Microscope Station
→ AI Analysis Screen
→ 3D Visualization Chamber
→ Learning Wall
```

Main interaction strategy:

```text
- Clickable stations
- Guided UI panels
- Object highlighting
- Step-based workflow
- 3D mapped parasite display
```

### 10. Reports Module

The reports module allows authenticated users to view saved detection reports, search/filter reports, open full report details, update clinical notes, confirm results, and export PDF reports.

Main files:

```text
ReportsList.jsx
ReportDetails.jsx
```

Main responsibilities:

```text
- Fetch reports belonging to the logged-in user
- Display report table
- Search and filter report records
- Show detailed report information
- Update notes
- Confirm report status
- Export report as PDF
```

## Frontend State Management

The frontend uses Jotai for global state management. Important state values include:

```text
- Logged-in user
- Selected parasite
- Selected life stage
- Current guided learning view
- Hovered marker
- Focused feature
```

This allows the 3D visualization and guided learning components to remain synchronized.

## Frontend Routing

The application uses React Router to connect the main pages.

Example routes:

```text
/                     Landing page
/auth                 Login and registration
/dashboard            User dashboard
/detection            AI image upload
/detection/results    AI detection results
/3d-view              Result-mapped 3D visualization
/guided-learning      Guided learning module
/lab                  3D lab simulation
/reports              Reports list
/reports/:id          Report details
```

## Frontend Technologies

```text
React
React Router
Tailwind CSS
Framer Motion / Motion
Lucide React
Jotai
React Three Fiber
Three.js
Drei
GLSL Shaders
Blender
gltfjsx
```

## Running the Frontend

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Frontend Code Quality Notes

The frontend applies modular design by separating pages, UI components, 3D components, hooks, shaders, and learning content.

Examples of separation of responsibility:

```text
3DView.jsx                Controls result-mapped 3D page layout
useThreeDViewState.js     Manages 3D view logic and state
SpecimenStage.jsx         Renders selected parasite model
DiagnosticMarker.jsx      Handles marker interaction
StageToggle.jsx           Handles life-stage switching
FeatureContent.js         Stores guided learning content
ReportsList.jsx           Displays saved reports
ReportDetails.jsx         Displays one full report
```

The frontend also follows DRY principles by reusing components and storing parasite/feature content separately from rendering logic.
