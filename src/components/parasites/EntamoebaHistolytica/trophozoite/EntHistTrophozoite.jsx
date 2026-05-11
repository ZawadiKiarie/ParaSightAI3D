import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { EntHistNucleus } from "./EntHistNucleus";
import { FoodVacuole } from "./EmptyVacuole";
import { VacuolesWRBC } from "./EntHistVacuoleWRBC";
import { VolumetricParasiteMaterial } from "../../../shaders/FireShader";
import { WarpedCytoplasmMaterial } from "../../../shaders/WarpedCytoplasmMaterial";
import { useAtomValue } from "jotai";
import {
  hoveredMarkerAtom,
  viewAtom,
  focusedMarkerIdAtom,
} from "../../../../store/Store";

export function EntHistTrophModel(props) {
  const group = useRef();
  const isolatedGroupRef = useRef();
  const nucleusGroupRef = useRef();
  const rbcGroupRef = useRef();
  const cytoplasmMaterialRef = useRef();
  const outerMembraneMaterialRef = useRef();

  const hoveredMarkerId = useAtomValue(hoveredMarkerAtom);
  const view = useAtomValue(viewAtom);
  const focusedMarkerId = useAtomValue(focusedMarkerIdAtom);

  const { nodes, animations } = useGLTF("/models/enthystbody-v1.glb");
  const { actions } = useAnimations(animations, group);

  const isNucleusHovered =
    hoveredMarkerId === "nucleus" ||
    hoveredMarkerId === "karyosome" ||
    hoveredMarkerId === "chromatin";

  const isRBCHovered = hoveredMarkerId === "RBC";
  const isCytoplasmHovered = hoveredMarkerId === "cytoplasm";
  const isIsolated = view === "ISOLATED";

  const showNucleus =
    !isIsolated ||
    focusedMarkerId === "nucleus" ||
    focusedMarkerId === "karyosome" ||
    focusedMarkerId === "chromatin";

  const showRBC = !isIsolated || focusedMarkerId === "RBC";
  const showCytoplasm = !isIsolated || focusedMarkerId === "cytoplasm";
  const showOuterMembrane = !isIsolated && focusedMarkerId !== "cytoplasm";

  useEffect(() => {
    const actionNames = ["Cube.002Action", "Cube.002Action.001"];

    actionNames.forEach((name) => {
      const action = actions?.[name];
      if (action) {
        action.reset().fadeIn(0.5).play();
      }
    });

    return () => {
      actionNames.forEach((name) => {
        actions?.[name]?.fadeOut(0.5);
      });
    };
  }, [actions]);

  useFrame((state, delta) => {
    const lerpFactor = 1 - Math.exp(-8 * delta);

    const targetNucleusScale = isNucleusHovered ? 1.35 : 1;
    const targetRbcScale = isRBCHovered ? 1.28 : 1;

    const targetCytoplasmOpacity =
      isNucleusHovered || isRBCHovered ? 0.16 : isCytoplasmHovered ? 0.88 : 0.6;

    const targetHeat = isCytoplasmHovered ? 1.3 : 1.2;

    const targetOuterOpacity =
      isNucleusHovered || isRBCHovered
        ? 0.08
        : isCytoplasmHovered
          ? 0.32
          : 0.45;

    if (nucleusGroupRef.current) {
      const current = nucleusGroupRef.current.scale.x;
      const next = THREE.MathUtils.lerp(
        current,
        targetNucleusScale,
        lerpFactor,
      );
      nucleusGroupRef.current.scale.setScalar(next);
    }

    if (rbcGroupRef.current) {
      const current = rbcGroupRef.current.scale.x;
      const next = THREE.MathUtils.lerp(current, targetRbcScale, lerpFactor);
      rbcGroupRef.current.scale.setScalar(next);
    }

    if (cytoplasmMaterialRef.current) {
      cytoplasmMaterialRef.current.uOpacity = THREE.MathUtils.lerp(
        cytoplasmMaterialRef.current.uOpacity,
        targetCytoplasmOpacity,
        lerpFactor,
      );

      cytoplasmMaterialRef.current.uHeat = THREE.MathUtils.lerp(
        cytoplasmMaterialRef.current.uHeat,
        targetHeat,
        lerpFactor,
      );
    }

    if (outerMembraneMaterialRef.current) {
      outerMembraneMaterialRef.current.uOpacity = THREE.MathUtils.lerp(
        outerMembraneMaterialRef.current.uOpacity,
        targetOuterOpacity,
        lerpFactor,
      );
    }

    if (isIsolated && isolatedGroupRef.current) {
      const targetRotY = state.pointer.x * 0.35;
      const targetRotX = -state.pointer.y * 0.25;

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
      <group name="Scene" ref={isolatedGroupRef}>
        {showNucleus && (
          <group ref={nucleusGroupRef}>
            <EntHistNucleus
              position={[0, 0, 0]}
              scale={isIsolated ? 0.34 : 0.2}
              rotation={[0, -Math.PI / 2, 0]}
            />
          </group>
        )}

        {showCytoplasm && (
          <mesh
            name="Cytoplasm"
            geometry={nodes.Cytoplasm.geometry}
            material={nodes.Cytoplasm.material}
            morphTargetDictionary={nodes.Cytoplasm.morphTargetDictionary}
            morphTargetInfluences={nodes.Cytoplasm.morphTargetInfluences}
            scale={[1, 0.708, 1]}
          >
            <VolumetricParasiteMaterial
              ref={cytoplasmMaterialRef}
              opacity={isIsolated ? 0.95 : 0.6}
              heat={isIsolated ? 1.32 : 1.2}
            />
          </mesh>
        )}

        {showOuterMembrane && (
          <mesh
            name="OuterMembrane"
            geometry={nodes.OuterMembrane.geometry}
            material={nodes.OuterMembrane.material}
            morphTargetDictionary={nodes.OuterMembrane.morphTargetDictionary}
            morphTargetInfluences={nodes.OuterMembrane.morphTargetInfluences}
            scale={[1.114, 0.789, 1.114]}
          >
            <WarpedCytoplasmMaterial
              ref={outerMembraneMaterialRef}
              opacity={0.45}
            />
          </mesh>
        )}

        {!isIsolated && (
          <group name="Vacuoles">
            <FoodVacuole position={[0.5, 0.2, 0.3]} scale={0.15} />
          </group>
        )}

        {showRBC && (
          <group name="VacuolesRBC" ref={rbcGroupRef}>
            <VacuolesWRBC
              position={isIsolated ? [0, 0, 0] : [0.65, 0.12, 0.13]}
              scale={isIsolated ? 0.24 : 0.11}
            />
          </group>
        )}
      </group>
    </group>
  );
}

useGLTF.preload("/models/enthystbody-v1.glb");
