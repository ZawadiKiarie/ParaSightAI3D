import React, { useEffect, useMemo, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useAtomValue } from "jotai";
import {
  hoveredMarkerAtom,
  viewAtom,
  focusedMarkerIdAtom,
} from "../../../../store/store";
import DFOuterMembraneMaterial from "../../../shaders/DFOuterMembraneMaterial";
import { createDFMaterials } from "../../../shaders/DFMaterials";

export function DFTrophozoite(props) {
  const group = useRef();
  const { nodes, animations } = useGLTF(
    "/models/DientamoebaFragilisTrophozoite-v1.glb",
  );
  const { actions } = useAnimations(animations, group);

  const hoveredMarkerId = useAtomValue(hoveredMarkerAtom);
  const view = useAtomValue(viewAtom);
  const focusedMarkerId = useAtomValue(focusedMarkerIdAtom);

  const {
    nucleusMaterial,
    karyosomeMaterial,
    spindleMaterial,
    vacuoleMaterial,
    foodBodyMaterial,
    golgiMaterial,
    granuleMaterial,
    innerMembraneMaterial,
  } = useMemo(() => createDFMaterials(), []);

  const isolatedGroupRef = useRef();
  const bodyGroupRef = useRef();
  const nucleiGroupRef = useRef();
  const karyosomeGroupRef = useRef();
  const chromatinGroupRef = useRef();
  const vacuoleGroupRef = useRef();
  const outerMaterialRef = useRef();

  const isIsolated = view === "ISOLATED";

  const isNucleiHovered = hoveredMarkerId === "nuclei";
  const isKaryosomeHovered = hoveredMarkerId === "karyosome";
  const isChromatinHovered = hoveredMarkerId === "chromatin";
  const isVacuolesHovered = hoveredMarkerId === "vacuoles";
  const isCytoplasmHovered = hoveredMarkerId === "cytoplasm";

  const showBody = !isIsolated || focusedMarkerId === "cytoplasm";
  const showNuclei = !isIsolated || focusedMarkerId === "nuclei";
  const showKaryosome = !isIsolated || focusedMarkerId === "karyosome";
  const showChromatin = !isIsolated || focusedMarkerId === "chromatin";
  const showVacuoles = !isIsolated || focusedMarkerId === "vacuoles";

  useEffect(() => {
    const actionNames = ["SphereAction", "SphereAction.001"];

    actionNames.forEach((name) => {
      const action = actions?.[name];
      if (action) {
        action.reset().fadeIn(0.5).play();
      }
    });

    return () => {
      actionNames.forEach((name) => actions?.[name]?.fadeOut(0.5));
    };
  }, [actions]);

  useFrame((state, delta) => {
    const ease = 1 - Math.exp(-8 * delta);

    const bodyTargetScale = isCytoplasmHovered ? 1.04 : 1;
    const nucleiTargetScale = isNucleiHovered ? 1.14 : 1;
    const karyosomeTargetScale = isKaryosomeHovered ? 1.16 : 1;
    const chromatinTargetScale = isChromatinHovered ? 1.12 : 1;
    const vacuoleTargetScale = isVacuolesHovered ? 1.12 : 1;

    if (bodyGroupRef.current) {
      const next = THREE.MathUtils.lerp(
        bodyGroupRef.current.scale.x,
        bodyTargetScale,
        ease,
      );
      bodyGroupRef.current.scale.setScalar(next);
    }

    if (nucleiGroupRef.current) {
      const next = THREE.MathUtils.lerp(
        nucleiGroupRef.current.scale.x,
        nucleiTargetScale,
        ease,
      );
      nucleiGroupRef.current.scale.setScalar(next);
    }

    if (karyosomeGroupRef.current) {
      const next = THREE.MathUtils.lerp(
        karyosomeGroupRef.current.scale.x,
        karyosomeTargetScale,
        ease,
      );
      karyosomeGroupRef.current.scale.setScalar(next);
    }

    if (chromatinGroupRef.current) {
      const next = THREE.MathUtils.lerp(
        chromatinGroupRef.current.scale.x,
        chromatinTargetScale,
        ease,
      );
      chromatinGroupRef.current.scale.setScalar(next);
    }

    if (vacuoleGroupRef.current) {
      const next = THREE.MathUtils.lerp(
        vacuoleGroupRef.current.scale.x,
        vacuoleTargetScale,
        ease,
      );
      vacuoleGroupRef.current.scale.setScalar(next);
    }

    if (
      outerMaterialRef.current &&
      outerMaterialRef.current.opacity !== undefined
    ) {
      const targetOpacity =
        isNucleiHovered ||
        isKaryosomeHovered ||
        isChromatinHovered ||
        isVacuolesHovered
          ? 0.16
          : isCytoplasmHovered
            ? 0.9
            : isIsolated && focusedMarkerId !== "cytoplasm"
              ? 0.08
              : 0.74;

      outerMaterialRef.current.opacity = THREE.MathUtils.lerp(
        outerMaterialRef.current.opacity,
        targetOpacity,
        ease,
      );
    }

    if (innerMembraneMaterial && innerMembraneMaterial.opacity !== undefined) {
      const targetOpacity =
        isNucleiHovered ||
        isKaryosomeHovered ||
        isChromatinHovered ||
        isVacuolesHovered
          ? 0.12
          : isCytoplasmHovered
            ? 0.86
            : isIsolated && focusedMarkerId !== "cytoplasm"
              ? 0.06
              : 0.34;

      innerMembraneMaterial.opacity = THREE.MathUtils.lerp(
        innerMembraneMaterial.opacity,
        targetOpacity,
        ease,
      );
    }

    if (nucleusMaterial && nucleusMaterial.opacity !== undefined) {
      const targetOpacity =
        isIsolated && focusedMarkerId !== "nuclei" ? 0.08 : 0.96;

      nucleusMaterial.opacity = THREE.MathUtils.lerp(
        nucleusMaterial.opacity,
        targetOpacity,
        ease,
      );
    }

    if (karyosomeMaterial && karyosomeMaterial.opacity !== undefined) {
      const targetOpacity =
        isIsolated && focusedMarkerId !== "karyosome" ? 0.08 : 0.98;

      karyosomeMaterial.opacity = THREE.MathUtils.lerp(
        karyosomeMaterial.opacity,
        targetOpacity,
        ease,
      );
    }

    if (spindleMaterial && spindleMaterial.opacity !== undefined) {
      const targetOpacity =
        isIsolated && focusedMarkerId !== "chromatin" ? 0.08 : 0.96;

      spindleMaterial.opacity = THREE.MathUtils.lerp(
        spindleMaterial.opacity,
        targetOpacity,
        ease,
      );
    }

    if (vacuoleMaterial && vacuoleMaterial.opacity !== undefined) {
      const targetOpacity =
        isIsolated && focusedMarkerId !== "vacuoles" ? 0.08 : 0.94;

      vacuoleMaterial.opacity = THREE.MathUtils.lerp(
        vacuoleMaterial.opacity,
        targetOpacity,
        ease,
      );
    }

    if (foodBodyMaterial && foodBodyMaterial.opacity !== undefined) {
      const targetOpacity =
        isIsolated && focusedMarkerId !== "vacuoles" ? 0.08 : 0.96;

      foodBodyMaterial.opacity = THREE.MathUtils.lerp(
        foodBodyMaterial.opacity,
        targetOpacity,
        ease,
      );
    }

    if (golgiMaterial && golgiMaterial.opacity !== undefined) {
      const targetOpacity =
        isIsolated && focusedMarkerId !== "vacuoles" ? 0.08 : 0.94;

      golgiMaterial.opacity = THREE.MathUtils.lerp(
        golgiMaterial.opacity,
        targetOpacity,
        ease,
      );
    }

    if (granuleMaterial && granuleMaterial.opacity !== undefined) {
      const targetOpacity =
        isIsolated && focusedMarkerId !== "cytoplasm" ? 0.08 : 0.92;

      granuleMaterial.opacity = THREE.MathUtils.lerp(
        granuleMaterial.opacity,
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
    <group ref={group} {...props} dispose={null}>
      <group ref={isolatedGroupRef}>
        {showNuclei && (
          <group ref={nucleiGroupRef}>
            <mesh
              name="Nucleus1"
              geometry={nodes.Nucleus1.geometry}
              material={nucleusMaterial}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [-0.02, -0.08, 0.16]
                  : [0, 0.873, 0.251]
              }
            />
            <mesh
              name="Nucleus2"
              geometry={nodes.Nucleus2.geometry}
              material={nucleusMaterial}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [0.02, 0.16, -0.18]
                  : [0, 1.141, -0.351]
              }
            />
          </group>
        )}

        {showKaryosome && (
          <group ref={karyosomeGroupRef}>
            <mesh
              name="Icosphere006"
              geometry={nodes.Icosphere006.geometry}
              material={karyosomeMaterial}
              position={
                isIsolated && focusedMarkerId === "karyosome"
                  ? [-0.02, -0.08, 0.16]
                  : [-0.006, 0.879, 0.246]
              }
              rotation={[0.27, -0.424, 0.113]}
            />
            <mesh
              name="Icosphere001"
              geometry={nodes.Icosphere001.geometry}
              material={karyosomeMaterial}
              position={
                isIsolated && focusedMarkerId === "karyosome"
                  ? [0.02, 0.16, -0.18]
                  : [-0.006, 1.147, -0.356]
              }
              rotation={[0.27, -0.424, 0.113]}
            />
          </group>
        )}

        {showChromatin && (
          <group ref={chromatinGroupRef}>
            <mesh
              name="Spindle5"
              geometry={nodes.Spindle5.geometry}
              material={spindleMaterial}
              position={
                isIsolated && focusedMarkerId === "chromatin"
                  ? [0, -0.18, -0.06]
                  : [0, 0.88, -0.084]
              }
              rotation={[2.256, 0, 0]}
            />
            <mesh
              name="Spindle4"
              geometry={nodes.Spindle4.geometry}
              material={spindleMaterial}
              position={
                isIsolated && focusedMarkerId === "chromatin"
                  ? [0, -0.08, -0.06]
                  : [0, 0.929, -0.084]
              }
              rotation={[2.256, 0, 0]}
            />
            <mesh
              name="Spindle3"
              geometry={nodes.Spindle3.geometry}
              material={spindleMaterial}
              position={
                isIsolated && focusedMarkerId === "chromatin"
                  ? [0, 0.0, -0.02]
                  : [0, 0.96, -0.052]
              }
              rotation={[2.256, 0, 0]}
            />
            <mesh
              name="Spindle2"
              geometry={nodes.Spindle2.geometry}
              material={spindleMaterial}
              position={
                isIsolated && focusedMarkerId === "chromatin"
                  ? [0, 0.1, -0.02]
                  : [0, 1.026, -0.052]
              }
              rotation={[2.256, 0, 0]}
            />
            <mesh
              name="Spindle1"
              geometry={nodes.Spindle1.geometry}
              material={spindleMaterial}
              position={
                isIsolated && focusedMarkerId === "chromatin"
                  ? [0, 0.22, 0.02]
                  : [0, 1.086, -0.034]
              }
              rotation={[2.256, 0, 0]}
            />
          </group>
        )}

        {showVacuoles && (
          <group ref={vacuoleGroupRef}>
            <mesh
              name="vacuole1"
              geometry={nodes.vacuole1.geometry}
              material={vacuoleMaterial}
              position={
                isIsolated && focusedMarkerId === "vacuoles"
                  ? [0.14, -0.18, -0.08]
                  : [0.099, 0.555, -0.245]
              }
            />
            <mesh
              name="vacuole2"
              geometry={nodes.vacuole2.geometry}
              material={vacuoleMaterial}
              position={
                isIsolated && focusedMarkerId === "vacuoles"
                  ? [-0.16, 0.18, 0.12]
                  : [-0.259, 1.466, 0.197]
              }
            />
            <mesh
              name="vacuole3"
              geometry={nodes.vacuole3.geometry}
              material={vacuoleMaterial}
              position={
                isIsolated && focusedMarkerId === "vacuoles"
                  ? [-0.22, -0.14, 0.18]
                  : [-0.337, 0.582, 0.36]
              }
            />

            <mesh
              name="Cube"
              geometry={nodes.Cube.geometry}
              material={foodBodyMaterial}
              position={
                isIsolated && focusedMarkerId === "vacuoles"
                  ? [0.14, -0.18, -0.04]
                  : [0.099, 0.555, -0.206]
              }
              rotation={[2.122, 1.247, -1.635]}
            />
            <mesh
              name="Cube001"
              geometry={nodes.Cube001.geometry}
              material={foodBodyMaterial}
              position={
                isIsolated && focusedMarkerId === "vacuoles"
                  ? [0.14, -0.18, -0.16]
                  : [0.099, 0.555, -0.323]
              }
              rotation={[-1.168, 1.064, 0.898]}
            />
            <mesh
              name="Cube002"
              geometry={nodes.Cube002.geometry}
              material={foodBodyMaterial}
              position={
                isIsolated && focusedMarkerId === "vacuoles"
                  ? [0.06, -0.14, -0.08]
                  : [0.018, 0.589, -0.246]
              }
              rotation={[-1.168, 1.064, 0.898]}
            />
            <mesh
              name="Icosphere"
              geometry={nodes.Icosphere.geometry}
              material={foodBodyMaterial}
              position={
                isIsolated && focusedMarkerId === "vacuoles"
                  ? [0.18, -0.26, -0.12]
                  : [0.122, 0.479, -0.274]
              }
            />
            <mesh
              name="Icosphere002"
              geometry={nodes.Icosphere002.geometry}
              material={foodBodyMaterial}
              position={
                isIsolated && focusedMarkerId === "vacuoles"
                  ? [0.18, -0.28, -0.04]
                  : [0.129, 0.469, -0.215]
              }
            />

            <mesh
              name="Cube003"
              geometry={nodes.Cube003.geometry}
              material={foodBodyMaterial}
              position={
                isIsolated && focusedMarkerId === "vacuoles"
                  ? [-0.16, 0.18, 0.16]
                  : [-0.259, 1.466, 0.236]
              }
              rotation={[2.122, 1.247, -1.635]}
            />
            <mesh
              name="Cube004"
              geometry={nodes.Cube004.geometry}
              material={foodBodyMaterial}
              position={
                isIsolated && focusedMarkerId === "vacuoles"
                  ? [-0.16, 0.18, 0.04]
                  : [-0.259, 1.466, 0.119]
              }
              rotation={[-1.168, 1.064, 0.898]}
            />
            <mesh
              name="Cube005"
              geometry={nodes.Cube005.geometry}
              material={foodBodyMaterial}
              position={
                isIsolated && focusedMarkerId === "vacuoles"
                  ? [-0.24, 0.22, 0.12]
                  : [-0.34, 1.501, 0.195]
              }
              rotation={[-1.168, 1.064, 0.898]}
            />
            <mesh
              name="Icosphere003"
              geometry={nodes.Icosphere003.geometry}
              material={foodBodyMaterial}
              position={
                isIsolated && focusedMarkerId === "vacuoles"
                  ? [-0.12, 0.08, 0.1]
                  : [-0.236, 1.391, 0.167]
              }
            />
            <mesh
              name="Icosphere004"
              geometry={nodes.Icosphere004.geometry}
              material={foodBodyMaterial}
              position={
                isIsolated && focusedMarkerId === "vacuoles"
                  ? [-0.1, 0.06, 0.18]
                  : [-0.229, 1.38, 0.227]
              }
            />

            <mesh
              name="Cube006"
              geometry={nodes.Cube006.geometry}
              material={foodBodyMaterial}
              position={
                isIsolated && focusedMarkerId === "vacuoles"
                  ? [-0.22, -0.14, 0.22]
                  : [-0.337, 0.582, 0.399]
              }
              rotation={[2.122, 1.247, -1.635]}
            />
            <mesh
              name="Cube007"
              geometry={nodes.Cube007.geometry}
              material={foodBodyMaterial}
              position={
                isIsolated && focusedMarkerId === "vacuoles"
                  ? [-0.22, -0.14, 0.1]
                  : [-0.337, 0.582, 0.281]
              }
              rotation={[-1.168, 1.064, 0.898]}
            />
            <mesh
              name="Cube008"
              geometry={nodes.Cube008.geometry}
              material={foodBodyMaterial}
              position={
                isIsolated && focusedMarkerId === "vacuoles"
                  ? [-0.3, -0.1, 0.18]
                  : [-0.417, 0.616, 0.358]
              }
              rotation={[-1.168, 1.064, 0.898]}
            />
            <mesh
              name="Icosphere005"
              geometry={nodes.Icosphere005.geometry}
              material={foodBodyMaterial}
              position={
                isIsolated && focusedMarkerId === "vacuoles"
                  ? [-0.18, -0.22, 0.14]
                  : [-0.313, 0.506, 0.33]
              }
            />
            <mesh
              name="Icosphere007"
              geometry={nodes.Icosphere007.geometry}
              material={foodBodyMaterial}
              position={
                isIsolated && focusedMarkerId === "vacuoles"
                  ? [-0.16, -0.24, 0.22]
                  : [-0.306, 0.496, 0.39]
              }
            />
            <mesh
              name="Icosphere008"
              geometry={nodes.Icosphere008.geometry}
              material={foodBodyMaterial}
              position={
                isIsolated && focusedMarkerId === "vacuoles"
                  ? [-0.08, -0.18, 0.18]
                  : [-0.228, 0.548, 0.357]
              }
            />
            <mesh
              name="Cube009"
              geometry={nodes.Cube009.geometry}
              material={foodBodyMaterial}
              position={
                isIsolated && focusedMarkerId === "vacuoles"
                  ? [-0.06, 0.16, 0.12]
                  : [-0.159, 1.455, 0.191]
              }
              rotation={[-1.168, 1.064, 0.898]}
            />

            <mesh
              name="golgi4"
              geometry={nodes.golgi4.geometry}
              material={golgiMaterial}
              position={
                isIsolated && focusedMarkerId === "vacuoles"
                  ? [-0.18, -0.04, -0.34]
                  : [-0.213, 0.788, -0.59]
              }
              rotation={[0.544, 1.547, 0]}
            />
            <mesh
              name="golgi5"
              geometry={nodes.golgi5.geometry}
              material={golgiMaterial}
              position={
                isIsolated && focusedMarkerId === "vacuoles"
                  ? [-0.18, 0.0, -0.3]
                  : [-0.213, 0.818, -0.572]
              }
              rotation={[0.544, 1.547, 0]}
            />
            <mesh
              name="golgi6"
              geometry={nodes.golgi6.geometry}
              material={golgiMaterial}
              position={
                isIsolated && focusedMarkerId === "vacuoles"
                  ? [-0.18, 0.04, -0.26]
                  : [-0.213, 0.847, -0.554]
              }
              rotation={[0.544, 1.547, 0]}
            />
            <mesh
              name="golgi3"
              geometry={nodes.golgi3.geometry}
              material={golgiMaterial}
              position={
                isIsolated && focusedMarkerId === "vacuoles"
                  ? [-0.18, -0.1, -0.38]
                  : [-0.213, 0.743, -0.598]
              }
              rotation={[0.544, 1.547, 0]}
            />
            <mesh
              name="golgi2"
              geometry={nodes.golgi2.geometry}
              material={golgiMaterial}
              position={
                isIsolated && focusedMarkerId === "vacuoles"
                  ? [-0.18, -0.14, -0.42]
                  : [-0.213, 0.713, -0.617]
              }
              rotation={[0.544, 1.547, 0]}
            />
            <mesh
              name="gogli1"
              geometry={nodes.gogli1.geometry}
              material={golgiMaterial}
              position={
                isIsolated && focusedMarkerId === "vacuoles"
                  ? [-0.18, -0.18, -0.46]
                  : [-0.213, 0.68, -0.636]
              }
              rotation={[0.544, 1.547, 0]}
            />
          </group>
        )}

        {showBody && (
          <group ref={bodyGroupRef}>
            <mesh
              name="granules"
              geometry={nodes.granules.geometry}
              material={granuleMaterial}
              position={[-0.001, 1.032, -0.07]}
              rotation={[2.942, -0.916, -Math.PI / 2]}
            />

            <mesh
              name="Outer_Membrane"
              geometry={nodes.Outer_Membrane.geometry}
              morphTargetDictionary={nodes.Outer_Membrane.morphTargetDictionary}
              morphTargetInfluences={nodes.Outer_Membrane.morphTargetInfluences}
              position={[0, 1, 0]}
            >
              <DFOuterMembraneMaterial
                ref={outerMaterialRef}
                opacity={0.74}
                baseColor="#3b490d"
                shadowColor="#000000"
                membraneTint="#404332"
                noiseScale={5.4}
                flowSpeed={10.12}
                brightness={0.05}
                granuleStrength={0.38}
                fresnelStrength={0.0}
                rimStrength={2.16}
                wobbleStrength={0.012}
                wobbleSpeed={0.42}
                morphTargets
              />
            </mesh>

            <mesh
              name="Inner_Membrane"
              geometry={nodes.Inner_Membrane.geometry}
              material={innerMembraneMaterial}
              morphTargetDictionary={nodes.Inner_Membrane.morphTargetDictionary}
              morphTargetInfluences={nodes.Inner_Membrane.morphTargetInfluences}
              position={[0, 1, 0]}
            />
          </group>
        )}
      </group>
    </group>
  );
}

useGLTF.preload("/models/DientamoebaFragilisTrophozoite-v1.glb");
