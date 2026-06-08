/**
 * Landing.jsx
 *
 * Main public landing page for ParaSightAI3D.
 * It combines the navigation bar, hero section, system overview,
 * experience preview, and footer into one complete homepage.
 *
 * This page introduces the platform before the user logs in and guides
 * them toward entering the system through the navigation/hero actions.
 */

import { ExperiencePreview } from "../components/landingpage/ExperiencePreview";
import { Footer } from "../components/landingpage/Footer";
import { HeroSection } from "../components/landingpage/HeroSection";
import { Navigation } from "../components/landingpage/Navigation";
import { SystemOverview } from "../components/landingpage/SystemOverview";

function Landing() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-purple-950 text-white overflow-x-hidden">
        <Navigation />
        <main>
          <HeroSection />
          <SystemOverview />
          <ExperiencePreview />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Landing;
