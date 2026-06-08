/**
 * App.jsx
 *
 * Main routing file for the ParaSightAI3D frontend.
 * It uses React Router to connect each URL path to its page component.
 *
 * Routes included:
 * - Landing page
 * - Authentication page
 * - Dashboard page
 * - AI detection upload and results pages
 * - 3D parasite visualization
 * - Reports list and report details pages
 * - Interactive lab simulation
 * - Guided learning module
 *
 * This file only controls navigation between the main sections of the application.
 */

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import { DetectionWorkspace } from "./pages/DetectionWorkspace";
import { DetectionResults } from "./pages/DetectionResults";
import ThreeDView from "./pages/3DView";
import ReportsList from "./pages/ReportList";
import ReportDetails from "./pages/ReportDetails";
import { LabSimulation } from "./pages/LabSimulation";
import GuidedLearning from "./pages/GuidedLearning";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/detection" element={<DetectionWorkspace />} />
          <Route path="/detection/results" element={<DetectionResults />} />
          <Route path="/3dview" element={<ThreeDView />} />
          <Route path="/reports" element={<ReportsList />} />
          <Route path="/reports/:id" element={<ReportDetails />} />
          <Route
            path="/labsimulation"
            element={
              <LabSimulation
                testParasiteName="Entamoeba Histolytica"
                testStage="trophozoite"
                testConfidence={88}
                testMicroscopeImage="/textures/giardiacyst.png"
              />
            }
          />
          <Route path="/guidedlearning" element={<GuidedLearning />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
