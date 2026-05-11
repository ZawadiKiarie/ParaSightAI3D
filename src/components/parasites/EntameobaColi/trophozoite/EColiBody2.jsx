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
import { DirtyCytoplasmMaterial } from "../../../shaders/DirtyCytoplasmShader";
import { EColiNucleus } from "./EColiNucleus";
import { EColiVacuolesWRBC } from "./EColiVacuolesWRBC";
import { EColiVacuolesWBacteria } from "./EColiVacuolesWBacteria";

export function EColiModel2(props) {
  const group = useRef();
  const isolatedGroupRef = useRef();
  const nucleusGroupRef = useRef();
  const bacteriaGroupRef = useRef();
  const rbcVacuoleGroupRef = useRef();
  const outerMembraneMaterialRef = useRef();

  const hoveredMarkerId = useAtomValue(hoveredMarkerAtom);
  const view = useAtomValue(viewAtom);
  const focusedMarkerId = useAtomValue(focusedMarkerIdAtom);

  const { nodes, animations } = useGLTF("/models/EColiBody-v1.glb");
  const { actions } = useAnimations(animations, group);

  const isIsolated = view === "ISOLATED";

  const isNucleusHovered = hoveredMarkerId === "nucleus";
  const isKaryosomeHovered = hoveredMarkerId === "karyosome";
  const isChromatinHovered = hoveredMarkerId === "chromatin";
  const isCytoplasmHovered = hoveredMarkerId === "cytoplasm";
  const isPseudopodiaHovered = hoveredMarkerId === "pseudopodia";

  const isNuclearHovered =
    isNucleusHovered || isKaryosomeHovered || isChromatinHovered;

  const showNucleus =
    !isIsolated ||
    focusedMarkerId === "nucleus" ||
    focusedMarkerId === "karyosome" ||
    focusedMarkerId === "chromatin";

  const showCytoplasm =
    !isIsolated ||
    focusedMarkerId === "cytoplasm" ||
    focusedMarkerId === "pseudopodia";

  const showOuterMembrane = !isIsolated || focusedMarkerId === "pseudopodia";

  const showBacteriaVacuoles = !isIsolated || focusedMarkerId === "cytoplasm";

  const showRbcLikeVacuoles = !isIsolated || focusedMarkerId === "cytoplasm";

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

    const nucleusTargetScale = isNuclearHovered ? 1.28 : 1;
    const bacteriaTargetScale = isCytoplasmHovered ? 1.16 : 1;
    const rbcTargetScale = isCytoplasmHovered ? 1.14 : 1;

    if (nucleusGroupRef.current) {
      const current = nucleusGroupRef.current.scale.x;
      const next = THREE.MathUtils.lerp(current, nucleusTargetScale, ease);
      nucleusGroupRef.current.scale.setScalar(next);
    }

    if (bacteriaGroupRef.current) {
      const current = bacteriaGroupRef.current.scale.x;
      const next = THREE.MathUtils.lerp(current, bacteriaTargetScale, ease);
      bacteriaGroupRef.current.scale.setScalar(next);
    }

    if (rbcVacuoleGroupRef.current) {
      const current = rbcVacuoleGroupRef.current.scale.x;
      const next = THREE.MathUtils.lerp(current, rbcTargetScale, ease);
      rbcVacuoleGroupRef.current.scale.setScalar(next);
    }

    if (outerMembraneMaterialRef.current) {
      const targetOpacity =
        isNuclearHovered || isCytoplasmHovered
          ? 0.18
          : isPseudopodiaHovered
            ? 0.95
            : isIsolated && focusedMarkerId !== "pseudopodia"
              ? 0.08
              : 0.8;

      outerMembraneMaterialRef.current.opacity = THREE.MathUtils.lerp(
        outerMembraneMaterialRef.current.opacity,
        targetOpacity,
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
            <EColiNucleus
              position={isIsolated ? [0, 0, 0] : [0, 0.8, 0]}
              scale={isIsolated ? 0.38 : 0.25}
              rotation={[0, -Math.PI / 2, 0]}
            />
          </group>
        )}

        {showOuterMembrane && (
          <mesh
            name="outermembrane"
            geometry={nodes.outermembrane.geometry}
            morphTargetDictionary={nodes.outermembrane.morphTargetDictionary}
            morphTargetInfluences={nodes.outermembrane.morphTargetInfluences}
            position={
              isIsolated && focusedMarkerId === "pseudopodia"
                ? [0, 1, 0]
                : [0, 1, 0]
            }
          >
            <meshPhysicalMaterial
              ref={outerMembraneMaterialRef}
              morphTargets={true}
              color={"#c2cf75"}
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

        {showCytoplasm && (
          <mesh
            name="innermembranecytopasm"
            geometry={nodes.innermembranecytopasm.geometry}
            morphTargetDictionary={
              nodes.innermembranecytopasm.morphTargetDictionary
            }
            morphTargetInfluences={
              nodes.innermembranecytopasm.morphTargetInfluences
            }
            position={[0, 1, 0]}
          >
            <DirtyCytoplasmMaterial
              opacity={
                isNuclearHovered
                  ? 0.14
                  : isCytoplasmHovered
                    ? 0.54
                    : isPseudopodiaHovered
                      ? 0.48
                      : isIsolated && focusedMarkerId !== "cytoplasm"
                        ? 0.12
                        : 0.38
              }
              noiseScale={13.0}
              flowSpeed={0.96}
              brightness={isCytoplasmHovered ? 0.28 : 0.2}
              color="#c2cf75"
              fresnelStrength={isPseudopodiaHovered ? 0.12 : 0.06}
              morphTargets={true}
            />
          </mesh>
        )}

        {showBacteriaVacuoles && (
          <group name="BacteriaVacuoles" ref={bacteriaGroupRef}>
            <EColiVacuolesWBacteria
              position={isIsolated ? [0, 0, 0] : [0.5, 1.2, 0.3]}
              scale={isIsolated ? 0.24 : 0.15}
            />
          </group>
        )}

        {showRbcLikeVacuoles && (
          <group name="RbcLikeVacuoles" ref={rbcVacuoleGroupRef}>
            <EColiVacuolesWRBC
              position={isIsolated ? [0.18, -0.14, -0.08] : [-0.24, 0.5, 0.02]}
              scale={isIsolated ? 0.18 : 0.13}
              rotation={[1, 0, 0.5]}
            />
          </group>
        )}
      </group>
    </group>
  );
}

useGLTF.preload("/models/EColiBody-v1.glb");
