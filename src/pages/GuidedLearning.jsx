import { Canvas } from "@react-three/fiber";
import OverlayUI from "../components/guidedlearning/OverlayUI";
import { Suspense } from "react";
import { BackgroundGradient } from "../components/guidedlearning/BackgroundGradient";
import { FloatingBubbles } from "../components/guidedlearning/FloatingBubbles";
import { InteractiveCrosshair } from "../components/guidedlearning/InteractiveCrosshair";
import { SpecimenStage } from "../components/guidedlearning/SpecimenStage";
import { useAtomValue } from "jotai";
import { viewAtom } from "../store/Store";
import { AnimatePresence } from "motion/react";
import { ListOverlay } from "../components/guidedlearning/ListOverlay";
import { StageToggle } from "../components/guidedlearning/StageToggle";
import { FocusFeatureOverlay } from "../components/guidedlearning/FocusFeatureOverlay";
import { IsolatedFeatureOverlay } from "../components/guidedlearning/IsolatedFeatureOvelay";

function GuidedLearning() {
  const view = useAtomValue(viewAtom);

  return (
    <div className="experience">
      <Canvas className="experience-canvas">
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <BackgroundGradient />
          <FloatingBubbles count={70} />
          <InteractiveCrosshair />
          <SpecimenStage />
        </Suspense>
      </Canvas>

      <AnimatePresence mode="wait">
        {view === "HOME" && <OverlayUI key="home-ui" />}

        {view === "LIST" && (
          <div key="list-ui-wrapper">
            <ListOverlay />
            <StageToggle />
          </div>
        )}

        {view === "FOCUS" && <FocusFeatureOverlay key="focus-ui" />}

        {view === "ISOLATED" && <IsolatedFeatureOverlay key="isolated-ui" />}
      </AnimatePresence>
    </div>
  );
}

export default GuidedLearning;
