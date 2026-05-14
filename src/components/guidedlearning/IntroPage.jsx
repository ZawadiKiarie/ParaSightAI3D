import { Center, Float } from "@react-three/drei";
import { BackgroundGradient } from "./BackgroundGradient";
import { EntHistTrophModel } from "../parasites/EntamoebaHistolytica/trophozoite/EntHistTrophozoite";
import { FloatingBubbles } from "./FloatingBubbles";
import { InteractiveCrosshair } from "./InteractiveCrosshair";

export const IntroPage = () => {
  return (
    <group>
      <ambientLight intensity={0.5} />

      <Center>
        <Float speed={1.5} rotationIntensity={1.2} floatIntensity={1.5}>
          <EntHistTrophModel scale={2.0} position={[1, 0, 0]} />
        </Float>
      </Center>
      <BackgroundGradient />
      <FloatingBubbles count={70} />
      <InteractiveCrosshair />
    </group>
  );
};
