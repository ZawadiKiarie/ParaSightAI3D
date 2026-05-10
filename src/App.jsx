import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ExperiencePreview } from "./components/ExperiencePreview";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { Navigation } from "./components/Navigation";
import { SystemOverview } from "./components/SystemOverview";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import { DetectionWorkspace } from "./pages/DetectionWorkspace";
import { DetectionResults } from "./pages/DetectionResults";
import ThreeDView from "./pages/3DView";
import ReportsList from "./pages/ReportList";
import ReportDetails from "./pages/ReportDetails";
import { LabSimulation } from "./pages/LabSimulation";

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
          <Route path="/labsimulation" element={<LabSimulation />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
