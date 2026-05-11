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
import { EColiCystCytoplasmMaterial } from "../../../shaders/EColiCystCytoplasmShader";
import {
  EColiOuterCystWallMaterial,
  EColiNuclearEnvelopeMaterial,
  EColiChromatinLayerMaterial,
  EColiKaryosomeMaterial,
  EColiChromatoidBodyMaterial,
  EColiGlycogenMaterial,
} from "../../../shaders/EColiCystStructureMaterials";

export function EColiCystModel(props) {
  const { nodes } = useGLTF("/models/EColiCyst-v1.glb");

  const hoveredMarkerId = useAtomValue(hoveredMarkerAtom);
  const view = useAtomValue(viewAtom);
  const focusedMarkerId = useAtomValue(focusedMarkerIdAtom);

  const isolatedGroupRef = useRef();
  const nucleiGroupRef = useRef();
  const chromatoidGroupRef = useRef();
  const wallGroupRef = useRef();
  const glycogenGroupRef = useRef();
  const innerMembraneRef = useRef();
  const outerWallRef = useRef();

  const isIsolated = view === "ISOLATED";

  const isNucleiHovered = hoveredMarkerId === "nuclei";
  const isChromatoidHovered = hoveredMarkerId === "chromatoid";
  const isWallHovered = hoveredMarkerId === "cystWall";
  const isKaryosomeHovered = hoveredMarkerId === "karyosome";
  const isChromatinHovered = hoveredMarkerId === "chromatin";
  const isGlycogenHovered = hoveredMarkerId === "glycogen";

  const isNuclearHovered =
    isNucleiHovered || isKaryosomeHovered || isChromatinHovered;

  const showNuclei =
    !isIsolated ||
    focusedMarkerId === "nuclei" ||
    focusedMarkerId === "karyosome" ||
    focusedMarkerId === "chromatin";

  const showChromatoid = !isIsolated || focusedMarkerId === "chromatoid";
  const showWall = !isIsolated || focusedMarkerId === "cystWall";
  const showGlycogen = !isIsolated || focusedMarkerId === "glycogen";

  const showInnerMembrane =
    !isIsolated ||
    focusedMarkerId === "cystWall" ||
    focusedMarkerId === "nuclei" ||
    focusedMarkerId === "karyosome" ||
    focusedMarkerId === "chromatin" ||
    focusedMarkerId === "chromatoid" ||
    focusedMarkerId === "glycogen";

  useFrame((state, delta) => {
    const ease = 1 - Math.exp(-8 * delta);

    const nucleiTargetScale = isNuclearHovered ? 1.16 : 1;
    const chromatoidTargetScale = isChromatoidHovered ? 1.18 : 1;
    const wallTargetScale = isWallHovered ? 1.05 : 1;
    const glycogenTargetScale = isGlycogenHovered ? 1.14 : 1;

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

    if (glycogenGroupRef.current) {
      const current = glycogenGroupRef.current.scale.x;
      const next = THREE.MathUtils.lerp(current, glycogenTargetScale, ease);
      glycogenGroupRef.current.scale.setScalar(next);
    }

    if (outerWallRef.current && outerWallRef.current.opacity !== undefined) {
      const targetOpacity =
        isNuclearHovered || isChromatoidHovered || isGlycogenHovered
          ? 0.16
          : isWallHovered
            ? 0.94
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
        isNuclearHovered || isChromatoidHovered || isGlycogenHovered
          ? 0.22
          : isWallHovered
            ? 0.8
            : isIsolated && focusedMarkerId !== "cystWall"
              ? 0.16
              : 0.66;

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
        {showInnerMembrane && (
          <mesh
            name="inner_cyst_membrane001"
            geometry={nodes.inner_cyst_membrane001.geometry}
            position={[0, 0, -2.576]}
          >
            <EColiCystCytoplasmMaterial
              ref={innerMembraneRef}
              uOpacity={0.66}
              uDensity={1.32}
              uBaseColor={"#b8b18f"}
              uCloudColor={"#c8c09e"}
              uShadowColor={"#7f7a60"}
              uDirtyColor={"#8c8667"}
              uNoiseScale={3.2}
              uSoftness={0.62}
              uRimStrength={0.12}
              uMotionStrength={0.004}
              uGranuleStrength={0.34}
              uMottleStrength={0.28}
            />
          </mesh>
        )}

        {showWall && (
          <group ref={wallGroupRef}>
            <mesh
              name="outer_cyst_membrane001"
              geometry={nodes.outer_cyst_membrane001.geometry}
              position={[0, 1, -2.576]}
            >
              <EColiOuterCystWallMaterial ref={outerWallRef} />
            </mesh>
          </group>
        )}

        {showNuclei && (
          <group ref={nucleiGroupRef}>
            <mesh
              name="chromatin_layer004"
              geometry={nodes.chromatin_layer004.geometry}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [-0.22, 0.02, 0.16]
                  : [0, 0.772, -2.033]
              }
            >
              <EColiChromatinLayerMaterial />
            </mesh>

            <mesh
              name="chromatin_layer005"
              geometry={nodes.chromatin_layer005.geometry}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [0.18, 0.34, 0.08]
                  : [0.094, 1.45, -2.305]
              }
            >
              <EColiChromatinLayerMaterial />
            </mesh>

            <mesh
              name="chromatin_layer006"
              geometry={nodes.chromatin_layer006.geometry}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [-0.06, 0.3, -0.24]
                  : [0, 1.415, -3.053]
              }
            >
              <EColiChromatinLayerMaterial />
            </mesh>

            <mesh
              name="chromatin_layer007"
              geometry={nodes.chromatin_layer007.geometry}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [0.06, -0.08, -0.18]
                  : [0.015, 0.747, -3.004]
              }
            >
              <EColiChromatinLayerMaterial />
            </mesh>

            <mesh
              name="karyosome004"
              geometry={nodes.karyosome004.geometry}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [-0.22, 0.02, 0.16]
                  : [0, 0.706, -2.079]
              }
            >
              <EColiKaryosomeMaterial color="#494033" />
            </mesh>

            <mesh
              name="karyosome005"
              geometry={nodes.karyosome005.geometry}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [0.18, 0.34, 0.08]
                  : [0.094, 1.491, -2.367]
              }
            >
              <EColiKaryosomeMaterial color="#494033" />
            </mesh>

            <mesh
              name="karyosome006"
              geometry={nodes.karyosome006.geometry}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [-0.06, 0.3, -0.24]
                  : [0, 1.365, -2.973]
              }
            >
              <EColiKaryosomeMaterial color="#494033" />
            </mesh>

            <mesh
              name="karyosome007"
              geometry={nodes.karyosome007.geometry}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [0.06, -0.08, -0.18]
                  : [0.015, 0.755, -2.954]
              }
            >
              <EColiKaryosomeMaterial color="#494033" />
            </mesh>

            <mesh
              name="nuclear_envelope004"
              geometry={nodes.nuclear_envelope004.geometry}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [-0.22, 0.02, 0.16]
                  : [0, 0.772, -2.033]
              }
            >
              <EColiNuclearEnvelopeMaterial />
            </mesh>

            <mesh
              name="nuclear_envelope005"
              geometry={nodes.nuclear_envelope005.geometry}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [0.18, 0.34, 0.08]
                  : [0.094, 1.45, -2.305]
              }
            >
              <EColiNuclearEnvelopeMaterial />
            </mesh>

            <mesh
              name="nuclear_envelope006"
              geometry={nodes.nuclear_envelope006.geometry}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [-0.06, 0.3, -0.24]
                  : [0, 1.415, -3.053]
              }
            >
              <EColiNuclearEnvelopeMaterial />
            </mesh>

            <mesh
              name="nuclear_envelope007"
              geometry={nodes.nuclear_envelope007.geometry}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [0.06, -0.08, -0.18]
                  : [0.015, 0.747, -3.004]
              }
            >
              <EColiNuclearEnvelopeMaterial />
            </mesh>
          </group>
        )}

        {showChromatoid && (
          <group ref={chromatoidGroupRef}>
            <mesh
              name="Chromatoid1"
              geometry={nodes.Chromatoid1.geometry}
              position={
                isIsolated && focusedMarkerId === "chromatoid"
                  ? [0.16, 0.02, -0.08]
                  : [0.321, 0.974, -2.693]
              }
              rotation={[0.322, -0.051, -0.078]}
            >
              <EColiChromatoidBodyMaterial />
            </mesh>

            <mesh
              name="Chromatoid2"
              geometry={nodes.Chromatoid2.geometry}
              position={
                isIsolated && focusedMarkerId === "chromatoid"
                  ? [0.14, 0.02, 0.1]
                  : [0.321, 0.974, -2.38]
              }
              rotation={[-0.338, 0.156, 0.144]}
            >
              <EColiChromatoidBodyMaterial />
            </mesh>

            <mesh
              name="Chromatoid3"
              geometry={nodes.Chromatoid3.geometry}
              position={
                isIsolated && focusedMarkerId === "chromatoid"
                  ? [0.08, 0.34, 0.02]
                  : [0.28, 1.53, -2.43]
              }
              rotation={[-0.961, 0.36, 0.329]}
            >
              <EColiChromatoidBodyMaterial />
            </mesh>

            <mesh
              name="Chromatoid4"
              geometry={nodes.Chromatoid4.geometry}
              position={
                isIsolated && focusedMarkerId === "chromatoid"
                  ? [-0.18, 0.16, -0.16]
                  : [-0.315, 1.214, -2.812]
              }
              rotation={[1.132, -0.121, 0.718]}
            >
              <EColiChromatoidBodyMaterial />
            </mesh>
          </group>
        )}

        {showGlycogen && (
          <group ref={glycogenGroupRef}>
            <mesh
              name="Glycogen"
              geometry={nodes.Glycogen.geometry}
              position={
                isIsolated && focusedMarkerId === "glycogen"
                  ? [0, 0, 0]
                  : [0, 0.995, -2.576]
              }
            >
              <EColiGlycogenMaterial />
            </mesh>
          </group>
        )}

        {isIsolated && focusedMarkerId === "karyosome" && (
          <group ref={nucleiGroupRef}>
            <mesh
              geometry={nodes.karyosome004.geometry}
              position={[-0.2, 0.02, 0.16]}
            >
              <EColiKaryosomeMaterial color="#494033" />
            </mesh>
            <mesh
              geometry={nodes.karyosome005.geometry}
              position={[0.16, 0.34, 0.08]}
            >
              <EColiKaryosomeMaterial color="#494033" />
            </mesh>
            <mesh
              geometry={nodes.karyosome006.geometry}
              position={[-0.05, 0.28, -0.22]}
            >
              <EColiKaryosomeMaterial color="#494033" />
            </mesh>
            <mesh
              geometry={nodes.karyosome007.geometry}
              position={[0.06, -0.08, -0.16]}
            >
              <EColiKaryosomeMaterial color="#494033" />
            </mesh>
          </group>
        )}

        {isIsolated && focusedMarkerId === "chromatin" && (
          <group ref={nucleiGroupRef}>
            <mesh
              geometry={nodes.chromatin_layer004.geometry}
              position={[-0.2, 0.02, 0.16]}
            >
              <EColiChromatinLayerMaterial />
            </mesh>
            <mesh
              geometry={nodes.chromatin_layer005.geometry}
              position={[0.16, 0.34, 0.08]}
            >
              <EColiChromatinLayerMaterial />
            </mesh>
            <mesh
              geometry={nodes.chromatin_layer006.geometry}
              position={[-0.05, 0.28, -0.22]}
            >
              <EColiChromatinLayerMaterial />
            </mesh>
            <mesh
              geometry={nodes.chromatin_layer007.geometry}
              position={[0.06, -0.08, -0.16]}
            >
              <EColiChromatinLayerMaterial />
            </mesh>
          </group>
        )}
      </group>
    </group>
  );
}

useGLTF.preload("/models/EColiCyst-v1.glb");
