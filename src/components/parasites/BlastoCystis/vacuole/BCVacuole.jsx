import React, { useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useAtomValue } from "jotai";
import {
  hoveredMarkerAtom,
  viewAtom,
  focusedMarkerIdAtom,
} from "../../../../store/store";
import PeripheralCytoplasmMaterial from "../../../shaders/PeripheralCytoplasmMaterial";
import { createBlastocystisMaterials } from "../../../shaders/BlastocystisMaterials";

export function BCVacuole(props) {
  const { nodes } = useGLTF("/models/BlastoCystisVacuole-v1.glb");

  const hoveredMarkerId = useAtomValue(hoveredMarkerAtom);
  const view = useAtomValue(viewAtom);
  const focusedMarkerId = useAtomValue(focusedMarkerIdAtom);

  const {
    innerMembraneMaterial,
    vacuoleMaterial,
    nucleusMaterial,
    nucleolusMaterial,
    granuleMaterial,
    mloMaterial,
  } = useMemo(() => createBlastocystisMaterials(), []);

  const isolatedGroupRef = useRef();
  const vacuoleGroupRef = useRef();
  const peripheralRingGroupRef = useRef();
  const nucleiGroupRef = useRef();
  const granuleGroupRef = useRef();

  const isIsolated = view === "ISOLATED";

  const isVacuoleHovered = hoveredMarkerId === "vacuole";
  const isPeripheralRingHovered = hoveredMarkerId === "peripheralRing";
  const isNucleiHovered = hoveredMarkerId === "nuclei";
  const isGranulesHovered = hoveredMarkerId === "granules";

  const showVacuole = !isIsolated || focusedMarkerId === "vacuole";
  const showPeripheralRing =
    !isIsolated || focusedMarkerId === "peripheralRing";
  const showNuclei = !isIsolated || focusedMarkerId === "nuclei";
  const showGranules = !isIsolated || focusedMarkerId === "granules";

  useFrame((state, delta) => {
    const ease = 1 - Math.exp(-8 * delta);

    const vacuoleTargetScale = isVacuoleHovered ? 1.08 : 1;
    const ringTargetScale = isPeripheralRingHovered ? 1.05 : 1;
    const nucleiTargetScale = isNucleiHovered ? 1.14 : 1;
    const granuleTargetScale = isGranulesHovered ? 1.12 : 1;

    if (vacuoleGroupRef.current) {
      const next = THREE.MathUtils.lerp(
        vacuoleGroupRef.current.scale.x,
        vacuoleTargetScale,
        ease,
      );
      vacuoleGroupRef.current.scale.setScalar(next);
    }

    if (peripheralRingGroupRef.current) {
      const next = THREE.MathUtils.lerp(
        peripheralRingGroupRef.current.scale.x,
        ringTargetScale,
        ease,
      );
      peripheralRingGroupRef.current.scale.setScalar(next);
    }

    if (nucleiGroupRef.current) {
      const next = THREE.MathUtils.lerp(
        nucleiGroupRef.current.scale.x,
        nucleiTargetScale,
        ease,
      );
      nucleiGroupRef.current.scale.setScalar(next);
    }

    if (granuleGroupRef.current) {
      const next = THREE.MathUtils.lerp(
        granuleGroupRef.current.scale.x,
        granuleTargetScale,
        ease,
      );
      granuleGroupRef.current.scale.setScalar(next);
    }

    if (innerMembraneMaterial && innerMembraneMaterial.opacity !== undefined) {
      const targetOpacity =
        isVacuoleHovered || isNucleiHovered || isGranulesHovered
          ? 0.12
          : isPeripheralRingHovered
            ? 0.72
            : isIsolated && focusedMarkerId !== "peripheralRing"
              ? 0.08
              : 0.34;

      innerMembraneMaterial.opacity = THREE.MathUtils.lerp(
        innerMembraneMaterial.opacity,
        targetOpacity,
        ease,
      );
    }

    if (vacuoleMaterial && vacuoleMaterial.opacity !== undefined) {
      const targetOpacity = isPeripheralRingHovered
        ? 0.52
        : isIsolated && focusedMarkerId !== "vacuole"
          ? 0.12
          : 0.82;

      vacuoleMaterial.opacity = THREE.MathUtils.lerp(
        vacuoleMaterial.opacity,
        targetOpacity,
        ease,
      );
    }

    if (nucleusMaterial && nucleusMaterial.opacity !== undefined) {
      const targetOpacity =
        isIsolated && focusedMarkerId !== "nuclei" ? 0.08 : 0.94;

      nucleusMaterial.opacity = THREE.MathUtils.lerp(
        nucleusMaterial.opacity,
        targetOpacity,
        ease,
      );
    }

    if (nucleolusMaterial && nucleolusMaterial.opacity !== undefined) {
      const targetOpacity =
        isIsolated && focusedMarkerId !== "nuclei" ? 0.08 : 1.0;

      nucleolusMaterial.opacity = THREE.MathUtils.lerp(
        nucleolusMaterial.opacity,
        targetOpacity,
        ease,
      );
    }

    if (granuleMaterial && granuleMaterial.opacity !== undefined) {
      const targetOpacity =
        isIsolated && focusedMarkerId !== "granules" ? 0.08 : 0.9;

      granuleMaterial.opacity = THREE.MathUtils.lerp(
        granuleMaterial.opacity,
        targetOpacity,
        ease,
      );
    }

    if (mloMaterial && mloMaterial.opacity !== undefined) {
      const targetOpacity =
        isIsolated && focusedMarkerId !== "granules" ? 0.08 : 0.96;

      mloMaterial.opacity = THREE.MathUtils.lerp(
        mloMaterial.opacity,
        targetOpacity,
        ease,
      );
    }

    if (isIsolated && isolatedGroupRef.current) {
      const targetRotY = state.pointer.x * 0.32;
      const targetRotX = -state.pointer.y * 0.22;

      isolatedGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        isolatedGroupRef.current.rotation.y,
        targetRotY,
        0.06,
      );

      isolatedGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        isolatedGroupRef.current.rotation.x,
        targetRotX,
        0.06,
      );
    }
  });

  return (
    <group {...props} dispose={null}>
      <group ref={isolatedGroupRef}>
        {showPeripheralRing && (
          <group ref={peripheralRingGroupRef}>
            <mesh
              name="Outer_Membrane"
              geometry={nodes.Outer_Membrane.geometry}
              position={[0, 1, 0]}
            >
              <PeripheralCytoplasmMaterial
                opacity={
                  isVacuoleHovered || isNucleiHovered || isGranulesHovered
                    ? 0.22
                    : isPeripheralRingHovered
                      ? 0.9
                      : isIsolated && focusedMarkerId !== "peripheralRing"
                        ? 0.1
                        : 0.78
                }
                color="#20360d"
                shadowColor="#0c210a"
                membraneTint="#1b290c"
                noiseScale={3.6}
                flowSpeed={0.54}
                brightness={0.08}
                rimThickness={0.3}
                beadStrength={0.26}
                fresnelStrength={0.1}
                wobbleStrength={0.022}
                wobbleSpeed={2.42}
              />
            </mesh>

            <mesh
              name="Inner_Membrane"
              geometry={nodes.Inner_Membrane.geometry}
              material={innerMembraneMaterial}
              position={[0, 1, 0]}
            />
          </group>
        )}

        {showVacuole && (
          <group ref={vacuoleGroupRef}>
            <mesh
              name="Vacuole"
              geometry={nodes.Vacuole.geometry}
              material={vacuoleMaterial}
              position={[0, 1, 0]}
            />
          </group>
        )}

        {showNuclei && (
          <group ref={nucleiGroupRef}>
            <mesh
              name="Nucleus3"
              geometry={nodes.Nucleus3.geometry}
              material={nucleusMaterial}
              position={[0.012, 1, 0.828]}
              rotation={[0, 0, 0.89]}
            />
            <mesh
              name="Nucleus4"
              geometry={nodes.Nucleus4.geometry}
              material={nucleusMaterial}
              position={[0.548, 1.444, 0.416]}
              rotation={[-0.547, 0.894, 2.197]}
            />
            <mesh
              name="Nucleus5"
              geometry={nodes.Nucleus5.geometry}
              material={nucleusMaterial}
              position={[0.748, 1, -0.405]}
              rotation={[3.012, 1.414, -1.284]}
            />
            <mesh
              name="Nucleus1"
              geometry={nodes.Nucleus1.geometry}
              material={nucleusMaterial}
              position={[0.035, 1.278, -0.786]}
              rotation={[-2.802, 0.416, -1.298]}
            />
            <mesh
              name="Nucleus2"
              geometry={nodes.Nucleus2.geometry}
              material={nucleusMaterial}
              position={[-0.794, 0.863, -0.153]}
              rotation={[Math.PI, 1.305, 0.355]}
            />

            <mesh
              name="Nucleolus1"
              geometry={nodes.Nucleolus1.geometry}
              material={nucleolusMaterial}
              position={[0.035, 1.278, -0.786]}
            />
            <mesh
              name="Nucleolus2"
              geometry={nodes.Nucleolus2.geometry}
              material={nucleolusMaterial}
              position={[-0.794, 0.863, -0.153]}
            />
            <mesh
              name="Nucleolus3"
              geometry={nodes.Nucleolus3.geometry}
              material={nucleolusMaterial}
              position={[0.012, 1, 0.828]}
            />
            <mesh
              name="Nucleolus4"
              geometry={nodes.Nucleolus4.geometry}
              material={nucleolusMaterial}
              position={[0.548, 1.444, 0.416]}
            />
            <mesh
              name="Nucleolus5"
              geometry={nodes.Nucleolus5.geometry}
              material={nucleolusMaterial}
              position={[0.748, 1, -0.405]}
            />
          </group>
        )}

        {showGranules && (
          <group ref={granuleGroupRef}>
            <mesh
              name="Vacuole_granules"
              geometry={nodes.Vacuole_granules.geometry}
              material={granuleMaterial}
              position={[0.019, 0.992, 0.006]}
              rotation={[2.086, 1.003, 2.6]}
            />

            <mesh
              name="VacuoleMLO1"
              geometry={nodes.VacuoleMLO1.geometry}
              material={mloMaterial}
              position={[-0.582, 0.912, 0.604]}
              rotation={[-0.507, -0.063, 0.548]}
            />
            <mesh
              name="VacuoleMLO2"
              geometry={nodes.VacuoleMLO2.geometry}
              material={mloMaterial}
              position={[0.536, 0.912, 0.604]}
              rotation={[-0.22, 0.925, 1.41]}
            />
            <mesh
              name="VacuoleMLO3"
              geometry={nodes.VacuoleMLO3.geometry}
              material={mloMaterial}
              position={[-0.313, 0.912, -0.761]}
              rotation={[-2.937, -1.187, -3.045]}
            />
          </group>
        )}
      </group>
    </group>
  );
}

useGLTF.preload("/models/BlastoCystisVacuole-v1.glb");
