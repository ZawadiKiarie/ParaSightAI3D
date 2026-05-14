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
