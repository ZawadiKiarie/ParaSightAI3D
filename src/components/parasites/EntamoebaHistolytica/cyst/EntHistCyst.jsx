import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useAtomValue } from "jotai";
import {
  hoveredMarkerAtom,
  viewAtom,
  focusedMarkerIdAtom,
} from "../../../../store/store";
import { EntHistCystCytoplasmMaterial } from "../../../shaders/EntHistCystShader";
import {
  NuclearEnvelopeMaterial,
  ChromatinLayerMaterial,
  KaryosomeMaterial,
  ChromatoidBodyMaterial,
} from "../../../shaders/EntHistCystStructureMaterials";

export function EntHistCystModel(props) {
  const { nodes } = useGLTF("/models/EntHistCyst-v1.glb");

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

  const showNuclei =
    !isIsolated ||
    focusedMarkerId === "nuclei" ||
    focusedMarkerId === "karyosome";

  const showChromatoid = !isIsolated || focusedMarkerId === "chromatoid";

  const showWall = !isIsolated || focusedMarkerId === "cystWall";

  const showInnerMembrane =
    !isIsolated ||
    focusedMarkerId === "cystWall" ||
    focusedMarkerId === "nuclei" ||
    focusedMarkerId === "karyosome" ||
    focusedMarkerId === "chromatoid";

  useFrame((state, delta) => {
    const ease = 1 - Math.exp(-8 * delta);

    const nucleiTargetScale = isNucleiHovered || isKaryosomeHovered ? 1.16 : 1;

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

    if (outerWallRef.current) {
      const targetOpacity =
        isNucleiHovered || isKaryosomeHovered || isChromatoidHovered
          ? 0.18
          : isWallHovered
            ? 0.92
            : isIsolated && focusedMarkerId !== "cystWall"
              ? 0.08
              : 0.8;

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
        isNucleiHovered || isKaryosomeHovered || isChromatoidHovered
          ? 0.22
          : isWallHovered
            ? 0.78
            : isIsolated && focusedMarkerId !== "cystWall"
              ? 0.16
              : 0.68;

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
        {showWall && (
          <group ref={wallGroupRef}>
            <mesh
              name="outer_cyst_membrane"
              geometry={nodes.outer_cyst_membrane.geometry}
              position={[0, 1, 0]}
            >
              <meshPhysicalMaterial
                ref={outerWallRef}
                color={"#a2df96"}
                transparent
                opacity={0.8}
                transmission={0.1}
                thickness={1.0}
                roughness={0.2}
                metalness={0}
                ior={1}
                depthWrite={false}
              />
            </mesh>
          </group>
        )}

        {showInnerMembrane && (
          <mesh
            name="inner_cyst_membrane"
            geometry={nodes.inner_cyst_membrane.geometry}
          >
            <EntHistCystCytoplasmMaterial
              ref={innerMembraneRef}
              uOpacity={0.68}
              uDensity={1.55}
              uBaseColor={"#bcc99a"}
              uCloudColor={"#cfdcb0"}
              uShadowColor={"#97a671"}
              uMotionStrength={0.01}
              uNoiseScale={3.4}
              uRimStrength={0.22}
            />
          </mesh>
        )}

        {showChromatoid && (
          <group ref={chromatoidGroupRef}>
            <mesh
              name="chromatoid_body_1"
              geometry={nodes.chromatoid_body_1.geometry}
              position={
                isIsolated && focusedMarkerId === "chromatoid"
                  ? [-0.18, 0.3, -0.05]
                  : [-0.405, 1.449, -0.206]
              }
              rotation={[0, 0, -0.977]}
            >
              <ChromatoidBodyMaterial />
            </mesh>

            <mesh
              name="chromatoid_body_2"
              geometry={nodes.chromatoid_body_2.geometry}
              position={
                isIsolated && focusedMarkerId === "chromatoid"
                  ? [0.15, -0.05, 0.04]
                  : [0.523, 0.681, 0.023]
              }
              rotation={[0, 0, -0.396]}
            >
              <ChromatoidBodyMaterial />
            </mesh>

            <mesh
              name="chromatoid_body_3"
              geometry={nodes.chromatoid_body_3.geometry}
              position={
                isIsolated && focusedMarkerId === "chromatoid"
                  ? [-0.26, -0.18, -0.16]
                  : [-0.476, 0.839, -0.389]
              }
              rotation={[-1.186, 0.034, -0.581]}
            >
              <ChromatoidBodyMaterial />
            </mesh>
          </group>
        )}

        {showNuclei && (
          <group ref={nucleiGroupRef}>
            <mesh
              name="nuclear_envelope"
              geometry={nodes.nuclear_envelope.geometry}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [-0.22, 0.18, 0.22]
                  : [0, 0.772, 0.4]
              }
            >
              <NuclearEnvelopeMaterial />
            </mesh>
            <mesh
              name="karyosome"
              geometry={nodes.karyosome.geometry}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [-0.22, 0.18, 0.22]
                  : [0, 0.772, 0.4]
              }
            >
              <KaryosomeMaterial />
            </mesh>
            <mesh
              name="chromatin_layer"
              geometry={nodes.chromatin_layer.geometry}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [-0.22, 0.18, 0.22]
                  : [0, 0.772, 0.4]
              }
            >
              <ChromatinLayerMaterial />
            </mesh>

            <mesh
              name="nuclear_envelope001"
              geometry={nodes.nuclear_envelope001.geometry}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [0.22, 0.36, 0.14]
                  : [0.094, 1.45, 0.27]
              }
            >
              <NuclearEnvelopeMaterial />
            </mesh>
            <mesh
              name="karyosome001"
              geometry={nodes.karyosome001.geometry}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [0.22, 0.36, 0.14]
                  : [0.094, 1.45, 0.27]
              }
            >
              <KaryosomeMaterial />
            </mesh>
            <mesh
              name="chromatin_layer001"
              geometry={nodes.chromatin_layer001.geometry}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [0.22, 0.36, 0.14]
                  : [0.094, 1.45, 0.27]
              }
            >
              <ChromatinLayerMaterial />
            </mesh>

            <mesh
              name="nuclear_envelope002"
              geometry={nodes.nuclear_envelope002.geometry}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [-0.08, -0.08, -0.14]
                  : [0, 1.066, -0.222]
              }
            >
              <NuclearEnvelopeMaterial />
            </mesh>
            <mesh
              name="karyosome002"
              geometry={nodes.karyosome002.geometry}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [-0.08, -0.08, -0.14]
                  : [0, 1.066, -0.222]
              }
            >
              <KaryosomeMaterial />
            </mesh>
            <mesh
              name="chromatin_layer002"
              geometry={nodes.chromatin_layer002.geometry}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [-0.08, -0.08, -0.14]
                  : [0, 1.066, -0.222]
              }
            >
              <ChromatinLayerMaterial />
            </mesh>

            <mesh
              name="nuclear_envelope003"
              geometry={nodes.nuclear_envelope003.geometry}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [0.06, -0.34, -0.18]
                  : [0.015, 0.575, -0.262]
              }
            >
              <NuclearEnvelopeMaterial />
            </mesh>
            <mesh
              name="karyosome003"
              geometry={nodes.karyosome003.geometry}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [0.06, -0.34, -0.18]
                  : [0.015, 0.575, -0.262]
              }
            >
              <KaryosomeMaterial />
            </mesh>
            <mesh
              name="chromatin_layer003"
              geometry={nodes.chromatin_layer003.geometry}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [0.06, -0.34, -0.18]
                  : [0.015, 0.575, -0.262]
              }
            >
              <ChromatinLayerMaterial />
            </mesh>
          </group>
        )}

        {isIsolated && focusedMarkerId === "karyosome" && (
          <group ref={nucleiGroupRef}>
            <mesh
              name="karyosome_focus_1"
              geometry={nodes.karyosome.geometry}
              position={[-0.2, 0.18, 0.2]}
            >
              <KaryosomeMaterial />
            </mesh>
            <mesh
              name="karyosome_focus_2"
              geometry={nodes.karyosome001.geometry}
              position={[0.2, 0.34, 0.14]}
            >
              <KaryosomeMaterial />
            </mesh>
            <mesh
              name="karyosome_focus_3"
              geometry={nodes.karyosome002.geometry}
              position={[-0.02, -0.02, -0.12]}
            >
              <KaryosomeMaterial />
            </mesh>
            <mesh
              name="karyosome_focus_4"
              geometry={nodes.karyosome003.geometry}
              position={[0.05, -0.28, -0.16]}
            >
              <KaryosomeMaterial />
            </mesh>
          </group>
        )}
      </group>
    </group>
  );
}

useGLTF.preload("/models/EntHistCyst-v1.glb");
