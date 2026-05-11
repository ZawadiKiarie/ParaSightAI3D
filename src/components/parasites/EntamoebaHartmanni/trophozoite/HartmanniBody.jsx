import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useAtomValue } from "jotai";
import {
  hoveredMarkerAtom,
  viewAtom,
  focusedMarkerIdAtom,
} from "../../../../store/Store";
import { ParasiteMaterial } from "../../../shaders/OpalShader";
import { HartManniNucleus } from "./HartmanniNucleus";
import { FoodVacuole } from "../../EntamoebaHistolytica/trophozoite/EmptyVacuole";

export function HartmanniModel(props) {
  const group = useRef();
  const isolatedGroupRef = useRef();
  const nucleusGroupRef = useRef();
  const vacuoleGroupRef = useRef();
  const innerMembraneMaterialRef = useRef();
  const outerMembraneMaterialRef = useRef();

  const hoveredMarkerId = useAtomValue(hoveredMarkerAtom);
  const view = useAtomValue(viewAtom);
  const focusedMarkerId = useAtomValue(focusedMarkerIdAtom);

  const { nodes, animations } = useGLTF(
    "/models/Hartmannitrophozoitebody-v1.glb",
  );
  const { actions } = useAnimations(animations, group);

  const isIsolated = view === "ISOLATED";

  const isNucleusHovered = hoveredMarkerId === "nucleus";
  const isKaryosomeHovered = hoveredMarkerId === "karyosome";
  const isChromatinHovered = hoveredMarkerId === "chromatin";
  const isNoRbcHovered = hoveredMarkerId === "noRBCs";

  const isNuclearHovered =
    isNucleusHovered || isKaryosomeHovered || isChromatinHovered;

  const showNucleus =
    !isIsolated ||
    focusedMarkerId === "nucleus" ||
    focusedMarkerId === "karyosome" ||
    focusedMarkerId === "chromatin";

  const showVacuoles = !isIsolated || focusedMarkerId === "noRBCs";

  const showOuterMembrane = !isIsolated;
  const showInnerMembrane = !isIsolated || focusedMarkerId === "noRBCs";

  useEffect(() => {
    const actionNames = ["MeshAction", "MeshAction.001"];

    actionNames.forEach((name) => {
      const action = actions?.[name];
      if (action) {
        action.reset().fadeIn(0.5).play();
      } else {
        console.warn(`Animation not found: ${name}`);
      }
    });

    return () => {
      actionNames.forEach((name) => actions?.[name]?.fadeOut(0.5));
    };
  }, [actions]);

  useFrame((state, delta) => {
    const ease = 1 - Math.exp(-8 * delta);

    const nucleusTargetScale = isNuclearHovered ? 1.3 : 1;
    const vacuoleTargetScale = isNoRbcHovered ? 1.22 : 1;

    if (nucleusGroupRef.current) {
      const current = nucleusGroupRef.current.scale.x;
      const next = THREE.MathUtils.lerp(current, nucleusTargetScale, ease);
      nucleusGroupRef.current.scale.setScalar(next);
    }

    if (vacuoleGroupRef.current) {
      const current = vacuoleGroupRef.current.scale.x;
      const next = THREE.MathUtils.lerp(current, vacuoleTargetScale, ease);
      vacuoleGroupRef.current.scale.setScalar(next);
    }

    if (outerMembraneMaterialRef.current) {
      const targetOpacity = isNuclearHovered || isNoRbcHovered ? 0.14 : 0.8;

      outerMembraneMaterialRef.current.opacity = THREE.MathUtils.lerp(
        outerMembraneMaterialRef.current.opacity,
        targetOpacity,
        ease,
      );
    }

    if (
      innerMembraneMaterialRef.current &&
      innerMembraneMaterialRef.current.uOpacity !== undefined
    ) {
      const targetOpacity = isNuclearHovered
        ? 0.18
        : isNoRbcHovered
          ? 0.24
          : isIsolated && focusedMarkerId !== "noRBCs"
            ? 0.08
            : 0.68;

      const targetIntensity = isNoRbcHovered ? 1.18 : 1.0;

      innerMembraneMaterialRef.current.uOpacity = THREE.MathUtils.lerp(
        innerMembraneMaterialRef.current.uOpacity,
        targetOpacity,
        ease,
      );

      innerMembraneMaterialRef.current.uIntensity = THREE.MathUtils.lerp(
        innerMembraneMaterialRef.current.uIntensity,
        targetIntensity,
        ease,
      );
    }

    if (isIsolated && isolatedGroupRef.current) {
      const targetRotY = state.pointer.x * 0.34;
      const targetRotX = -state.pointer.y * 0.24;

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
    <group ref={group} {...props} dispose={null}>
      <group ref={isolatedGroupRef} name="Scene">
        {showNucleus && (
          <group ref={nucleusGroupRef}>
            <HartManniNucleus
              position={isIsolated ? [0, 0, 0] : [0, 0, 0]}
              scale={isIsolated ? 0.36 : 0.25}
              rotation={[0, -Math.PI / 2, 0]}
            />
          </group>
        )}

        {showOuterMembrane && (
          <mesh
            name="outermembrane"
            renderOrder={2}
            geometry={nodes.outermembrane.geometry}
            morphTargetDictionary={nodes.outermembrane.morphTargetDictionary}
            morphTargetInfluences={nodes.outermembrane.morphTargetInfluences}
            position={[0.124, 0.972, -0.651]}
          >
            <meshPhysicalMaterial
              ref={outerMembraneMaterialRef}
              color={"#cceed3"}
              transparent
              opacity={0.8}
              transmission={0.1}
              thickness={1.0}
              roughness={0.2}
              metalness={0}
              ior={1.33}
              depthWrite={false}
            />
          </mesh>
        )}

        {showInnerMembrane && (
          <mesh
            name="innermembrane"
            renderOrder={1}
            geometry={nodes.innermembrane.geometry}
            morphTargetDictionary={nodes.innermembrane.morphTargetDictionary}
            morphTargetInfluences={nodes.innermembrane.morphTargetInfluences}
            position={[0.124, 0.972, -0.651]}
          >
            <ParasiteMaterial ref={innerMembraneMaterialRef} />
          </mesh>
        )}

        {showVacuoles && (
          <group name="Vacuoles" ref={vacuoleGroupRef}>
            <FoodVacuole
              position={isIsolated ? [0, 0, 0] : [0.5, 1.2, 0.3]}
              scale={isIsolated ? 0.26 : 0.15}
            />
          </group>
        )}
      </group>
    </group>
  );
}

useGLTF.preload("/models/Hartmannitrophozoitebody-v1.glb");
