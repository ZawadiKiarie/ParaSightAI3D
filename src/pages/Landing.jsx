import { ExperiencePreview } from "../components/ExperiencePreview";
import { Footer } from "../components/Footer";
import { HeroSection } from "../components/HeroSection";
import { Navigation } from "../components/Navigation";
import { SystemOverview } from "../components/SystemOverview";

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
