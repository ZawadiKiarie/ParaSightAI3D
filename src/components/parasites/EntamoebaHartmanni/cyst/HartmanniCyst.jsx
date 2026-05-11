import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useAtomValue } from "jotai";
import {
  hoveredMarkerAtom,
  viewAtom,
  focusedMarkerIdAtom,
} from "../../../../store/Store";
import { HartmanniCystCytoplasmMaterial } from "../../../shaders/HartmanniCystCytoplasmShader";
import {
  HartmanniOuterCystWallMaterial,
  HartmanniNuclearEnvelopeMaterial,
  HartmanniChromatinLayerMaterial,
  HartmanniKaryosomeMaterial,
  HartmanniChromatoidBodyMaterial,
} from "../../../shaders/HartmanniCystStructureMaterials";

export function HartmanniCystModel(props) {
  const { nodes } = useGLTF("/models/HartmanniCyst-v1.glb");

  const hoveredMarkerId = useAtomValue(hoveredMarkerAtom);
  const view = useAtomValue(viewAtom);
  const focusedMarkerId = useAtomValue(focusedMarkerIdAtom);

  const isolatedGroupRef = useRef();
  const nucleiGroupRef = useRef();
  const chromatoidGroupRef = useRef();
  const wallGroupRef = useRef();
  const innerMembraneRef = useRef();
  const outerWallRef = useRef();

  const isIsolated = view === "ISOLATED";

  const isNucleiHovered = hoveredMarkerId === "nuclei";
  const isChromatoidHovered = hoveredMarkerId === "chromatoid";
  const isWallHovered = hoveredMarkerId === "cystWall";
  const isKaryosomeHovered = hoveredMarkerId === "karyosome";
  const isChromatinHovered = hoveredMarkerId === "chromatin";

  const isNuclearHovered =
    isNucleiHovered || isKaryosomeHovered || isChromatinHovered;

  const showNuclei =
    !isIsolated ||
    focusedMarkerId === "nuclei" ||
    focusedMarkerId === "karyosome" ||
    focusedMarkerId === "chromatin";

  const showChromatoid = !isIsolated || focusedMarkerId === "chromatoid";
  const showWall = !isIsolated || focusedMarkerId === "cystWall";

  const showInnerMembrane =
    !isIsolated ||
    focusedMarkerId === "cystWall" ||
    focusedMarkerId === "nuclei" ||
    focusedMarkerId === "karyosome" ||
    focusedMarkerId === "chromatin" ||
    focusedMarkerId === "chromatoid";

  useFrame((state, delta) => {
    const ease = 1 - Math.exp(-8 * delta);

    const nucleiTargetScale = isNuclearHovered ? 1.16 : 1;
    const chromatoidTargetScale = isChromatoidHovered ? 1.18 : 1;
    const wallTargetScale = isWallHovered ? 1.05 : 1;

    if (nucleiGroupRef.current) {
      const current = nucleiGroupRef.current.scale.x;
      const next = THREE.MathUtils.lerp(current, nucleiTargetScale, ease);
      nucleiGroupRef.current.scale.setScalar(next);
    }

    if (chromatoidGroupRef.current) {
      const current = chromatoidGroupRef.current.scale.x;
      const next = THREE.MathUtils.lerp(current, chromatoidTargetScale, ease);
      chromatoidGroupRef.current.scale.setScalar(next);
    }

    if (wallGroupRef.current) {
      const current = wallGroupRef.current.scale.x;
      const next = THREE.MathUtils.lerp(current, wallTargetScale, ease);
      wallGroupRef.current.scale.setScalar(next);
    }

    if (outerWallRef.current && outerWallRef.current.opacity !== undefined) {
      const targetOpacity =
        isNuclearHovered || isChromatoidHovered
          ? 0.18
          : isWallHovered
            ? 0.92
            : isIsolated && focusedMarkerId !== "cystWall"
              ? 0.08
              : 0.82;

      outerWallRef.current.opacity = THREE.MathUtils.lerp(
        outerWallRef.current.opacity,
        targetOpacity,
        ease,
      );
    }

    if (
      innerMembraneRef.current &&
      innerMembraneRef.current.uOpacity !== undefined
    ) {
      const targetOpacity =
        isNuclearHovered || isChromatoidHovered
          ? 0.22
          : isWallHovered
            ? 0.8
            : isIsolated && focusedMarkerId !== "cystWall"
              ? 0.16
              : 0.62;

      innerMembraneRef.current.uOpacity = THREE.MathUtils.lerp(
        innerMembraneRef.current.uOpacity,
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
        {showChromatoid && (
          <group ref={chromatoidGroupRef}>
            <mesh
              name="chromatoid_body_2"
              geometry={nodes.chromatoid_body_2.geometry}
              position={
                isIsolated && focusedMarkerId === "chromatoid"
                  ? [0.14, 0.06, 0.04]
                  : [0.299, 1.069, -0.046]
              }
            >
              <HartmanniChromatoidBodyMaterial />
            </mesh>

            <mesh
              name="chromatoid_body_3"
              geometry={nodes.chromatoid_body_3.geometry}
              position={
                isIsolated && focusedMarkerId === "chromatoid"
                  ? [-0.16, -0.14, -0.12]
                  : [0.169, 0.864, -0.286]
              }
            >
              <HartmanniChromatoidBodyMaterial />
            </mesh>
          </group>
        )}

        {showInnerMembrane && (
          <mesh
            name="inner_cyst_membrane"
            geometry={nodes.inner_cyst_membrane.geometry}
          >
            <HartmanniCystCytoplasmMaterial
              ref={innerMembraneRef}
              uOpacity={0.62}
              uDensity={1.18}
              uBaseColor={"#d7d8b8"}
              uCloudColor={"#e4e5ca"}
              uShadowColor={"#aeb08d"}
              uNoiseScale={4.2}
              uSoftness={0.82}
              uRimStrength={0.14}
              uMotionStrength={0.006}
              uGranuleStrength={0.18}
            />
          </mesh>
        )}

        {showWall && (
          <group ref={wallGroupRef}>
            <mesh
              name="outer_cyst_membrane"
              geometry={nodes.outer_cyst_membrane.geometry}
              position={[0, 1, 0]}
            >
              <HartmanniOuterCystWallMaterial ref={outerWallRef} />
            </mesh>
          </group>
        )}

        {showNuclei && (
          <group ref={nucleiGroupRef}>
            <mesh
              name="chromatin_layer"
              geometry={nodes.chromatin_layer.geometry}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [-0.2, 0.04, 0.16]
                  : [0, 0.772, 0.4]
              }
            >
              <HartmanniChromatinLayerMaterial />
            </mesh>

            <mesh
              name="chromatin_layer001"
              geometry={nodes.chromatin_layer001.geometry}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [0.18, 0.34, 0.1]
                  : [0.094, 1.45, 0.27]
              }
            >
              <HartmanniChromatinLayerMaterial />
            </mesh>

            <mesh
              name="chromatin_layer002"
              geometry={nodes.chromatin_layer002.geometry}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [-0.08, 0.28, -0.24]
                  : [0, 1.415, -0.478]
              }
            >
              <HartmanniChromatinLayerMaterial />
            </mesh>

            <mesh
              name="chromatin_layer003"
              geometry={nodes.chromatin_layer003.geometry}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [0.06, -0.06, -0.18]
                  : [0.015, 0.747, -0.429]
              }
            >
              <HartmanniChromatinLayerMaterial />
            </mesh>

            <mesh
              name="karyosome"
              geometry={nodes.karyosome.geometry}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [-0.2, 0.04, 0.16]
                  : [0, 0.772, 0.4]
              }
            >
              <HartmanniKaryosomeMaterial />
            </mesh>

            <mesh
              name="karyosome001"
              geometry={nodes.karyosome001.geometry}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [0.18, 0.34, 0.1]
                  : [0.094, 1.45, 0.27]
              }
            >
              <HartmanniKaryosomeMaterial />
            </mesh>

            <mesh
              name="karyosome002"
              geometry={nodes.karyosome002.geometry}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [-0.08, 0.28, -0.24]
                  : [0, 1.415, -0.478]
              }
            >
              <HartmanniKaryosomeMaterial />
            </mesh>

            <mesh
              name="karyosome003"
              geometry={nodes.karyosome003.geometry}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [0.06, -0.06, -0.18]
                  : [0.015, 0.747, -0.429]
              }
            >
              <HartmanniKaryosomeMaterial />
            </mesh>

            <mesh
              name="nuclear_envelope"
              geometry={nodes.nuclear_envelope.geometry}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [-0.2, 0.04, 0.16]
                  : [0, 0.772, 0.4]
              }
            >
              <HartmanniNuclearEnvelopeMaterial />
            </mesh>

            <mesh
              name="nuclear_envelope001"
              geometry={nodes.nuclear_envelope001.geometry}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [0.18, 0.34, 0.1]
                  : [0.094, 1.45, 0.27]
              }
            >
              <HartmanniNuclearEnvelopeMaterial />
            </mesh>

            <mesh
              name="nuclear_envelope002"
              geometry={nodes.nuclear_envelope002.geometry}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [-0.08, 0.28, -0.24]
                  : [0, 1.415, -0.478]
              }
            >
              <HartmanniNuclearEnvelopeMaterial />
            </mesh>

            <mesh
              name="nuclear_envelope003"
              geometry={nodes.nuclear_envelope003.geometry}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [0.06, -0.06, -0.18]
                  : [0.015, 0.747, -0.429]
              }
            >
              <HartmanniNuclearEnvelopeMaterial />
            </mesh>
          </group>
        )}

        {isIsolated && focusedMarkerId === "karyosome" && (
          <group ref={nucleiGroupRef}>
            <mesh
              geometry={nodes.karyosome.geometry}
              position={[-0.18, 0.04, 0.16]}
            >
              <HartmanniKaryosomeMaterial />
            </mesh>
            <mesh
              geometry={nodes.karyosome001.geometry}
              position={[0.16, 0.34, 0.1]}
            >
              <HartmanniKaryosomeMaterial />
            </mesh>
            <mesh
              geometry={nodes.karyosome002.geometry}
              position={[-0.06, 0.28, -0.22]}
            >
              <HartmanniKaryosomeMaterial />
            </mesh>
            <mesh
              geometry={nodes.karyosome003.geometry}
              position={[0.05, -0.06, -0.16]}
            >
              <HartmanniKaryosomeMaterial />
            </mesh>
          </group>
        )}

        {isIsolated && focusedMarkerId === "chromatin" && (
          <group ref={nucleiGroupRef}>
            <mesh
              geometry={nodes.chromatin_layer.geometry}
              position={[-0.18, 0.04, 0.16]}
            >
              <HartmanniChromatinLayerMaterial />
            </mesh>
            <mesh
              geometry={nodes.chromatin_layer001.geometry}
              position={[0.16, 0.34, 0.1]}
            >
              <HartmanniChromatinLayerMaterial />
            </mesh>
            <mesh
              geometry={nodes.chromatin_layer002.geometry}
              position={[-0.06, 0.28, -0.22]}
            >
              <HartmanniChromatinLayerMaterial />
            </mesh>
            <mesh
              geometry={nodes.chromatin_layer003.geometry}
              position={[0.05, -0.06, -0.16]}
            >
              <HartmanniChromatinLayerMaterial />
            </mesh>
          </group>
        )}
      </group>
    </group>
  );
}

useGLTF.preload("/models/HartmanniCyst-v1.glb");
