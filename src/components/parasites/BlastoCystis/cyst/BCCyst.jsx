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
import { BCCystCytoplasmMaterial } from "../../../shaders/BCCystCytoplasmShader";
import {
  BCCystBodyMaterial,
  BCCystNucleusMaterial,
  BCStorageGranulesMaterial,
  BCMLOMaterial,
} from "../../../shaders/BCCystStructureMaterials";

export function BlastoCystisCyst(props) {
  const { nodes } = useGLTF("/models/BlastoCystisCyst-v1.glb");

  const hoveredMarkerId = useAtomValue(hoveredMarkerAtom);
  const view = useAtomValue(viewAtom);
  const focusedMarkerId = useAtomValue(focusedMarkerIdAtom);

  const isolatedGroupRef = useRef();
  const bodyGroupRef = useRef();
  const cytoplasmGroupRef = useRef();
  const nucleiGroupRef = useRef();
  const granulesGroupRef = useRef();
  const mloGroupRef = useRef();

  const cytoplasmMaterialRef = useRef();

  const isIsolated = view === "ISOLATED";

  const isWallHovered = hoveredMarkerId === "cystWall";
  const isCytoplasmHovered = hoveredMarkerId === "cytoplasm";
  const isNucleiHovered = hoveredMarkerId === "nuclei";
  const isGranulesHovered = hoveredMarkerId === "granules";
  const isMLOHovered = hoveredMarkerId === "mlo";

  const showBody = !isIsolated || focusedMarkerId === "cystWall";
  const showCytoplasm =
    !isIsolated ||
    focusedMarkerId === "cytoplasm" ||
    focusedMarkerId === "nuclei" ||
    focusedMarkerId === "granules" ||
    focusedMarkerId === "mlo";
  const showNuclei = !isIsolated || focusedMarkerId === "nuclei";
  const showGranules = !isIsolated || focusedMarkerId === "granules";
  const showMLO = !isIsolated || focusedMarkerId === "mlo";

  useFrame((state, delta) => {
    const ease = 1 - Math.exp(-8 * delta);

    const bodyTargetScale = isWallHovered ? 1.05 : 1;
    const cytoplasmTargetScale = isCytoplasmHovered ? 1.05 : 1;
    const nucleiTargetScale = isNucleiHovered ? 1.14 : 1;
    const granulesTargetScale = isGranulesHovered ? 1.12 : 1;
    const mloTargetScale = isMLOHovered ? 1.12 : 1;

    if (bodyGroupRef.current) {
      const next = THREE.MathUtils.lerp(
        bodyGroupRef.current.scale.x,
        bodyTargetScale,
        ease,
      );
      bodyGroupRef.current.scale.setScalar(next);
    }

    if (cytoplasmGroupRef.current) {
      const next = THREE.MathUtils.lerp(
        cytoplasmGroupRef.current.scale.x,
        cytoplasmTargetScale,
        ease,
      );
      cytoplasmGroupRef.current.scale.setScalar(next);
    }

    if (nucleiGroupRef.current) {
      const next = THREE.MathUtils.lerp(
        nucleiGroupRef.current.scale.x,
        nucleiTargetScale,
        ease,
      );
      nucleiGroupRef.current.scale.setScalar(next);
    }

    if (granulesGroupRef.current) {
      const next = THREE.MathUtils.lerp(
        granulesGroupRef.current.scale.x,
        granulesTargetScale,
        ease,
      );
      granulesGroupRef.current.scale.setScalar(next);
    }

    if (mloGroupRef.current) {
      const next = THREE.MathUtils.lerp(
        mloGroupRef.current.scale.x,
        mloTargetScale,
        ease,
      );
      mloGroupRef.current.scale.setScalar(next);
    }

    if (
      cytoplasmMaterialRef.current &&
      cytoplasmMaterialRef.current.uOpacity !== undefined
    ) {
      const targetOpacity =
        isNucleiHovered || isGranulesHovered || isMLOHovered
          ? 0.16
          : isCytoplasmHovered
            ? 0.82
            : isWallHovered
              ? 0.3
              : isIsolated && focusedMarkerId !== "cytoplasm"
                ? 0.1
                : 0.56;

      cytoplasmMaterialRef.current.uOpacity = THREE.MathUtils.lerp(
        cytoplasmMaterialRef.current.uOpacity,
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
        {showMLO && (
          <group ref={mloGroupRef}>
            <mesh
              name="CystMLO1"
              geometry={nodes.CystMLO1.geometry}
              position={
                isIsolated && focusedMarkerId === "mlo"
                  ? [-0.18, 0.02, -0.08]
                  : [-3.833, 0.676, -0.349]
              }
              rotation={[-0.086, -0.468, -0.133]}
              scale={[0.082, 0.132, 0.066]}
            >
              <BCMLOMaterial />
            </mesh>

            <mesh
              name="CystMLO2"
              geometry={nodes.CystMLO2.geometry}
              position={
                isIsolated && focusedMarkerId === "mlo"
                  ? [0.12, 0.18, -0.08]
                  : [-3.324, 1.076, -0.355]
              }
              rotation={[-3.035, 0.767, 2.974]}
              scale={[0.082, 0.132, 0.066]}
            >
              <BCMLOMaterial />
            </mesh>

            <mesh
              name="CystMLO3"
              geometry={nodes.CystMLO3.geometry}
              position={
                isIsolated && focusedMarkerId === "mlo"
                  ? [-0.06, 0.08, 0.14]
                  : [-3.706, 0.9, 0.311]
              }
              rotation={[-0.167, 0.06, -1.056]}
              scale={[0.082, 0.132, 0.066]}
            >
              <BCMLOMaterial />
            </mesh>
          </group>
        )}

        {showBody && (
          <group ref={bodyGroupRef}>
            <mesh
              name="CystBody"
              geometry={nodes.CystBody.geometry}
              position={[-3.819, 1, 0]}
            >
              <BCCystBodyMaterial />
            </mesh>
          </group>
        )}

        {showCytoplasm && (
          <group ref={cytoplasmGroupRef}>
            <mesh
              name="Cytoplasm"
              geometry={nodes.Cytoplasm.geometry}
              position={[-3.819, 1, 0]}
              scale={0.832}
            >
              <BCCystCytoplasmMaterial
                ref={cytoplasmMaterialRef}
                uOpacity={0.56}
                uDensity={1.16}
                uBaseColor={"#d7c89e"}
                uCloudColor={"#e6d8b2"}
                uShadowColor={"#b49f77"}
                uWarmTint={"#cfb789"}
                uNoiseScale={4.1}
                uSoftness={0.84}
                uRimStrength={0.1}
                uMotionStrength={0.0025}
                uGranuleStrength={0.12}
                uRadialBias={0.24}
              />
            </mesh>
          </group>
        )}

        {showNuclei && (
          <group ref={nucleiGroupRef}>
            <mesh
              name="CystNucleus1"
              geometry={nodes.CystNucleus1.geometry}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [-0.16, 0.16, 0]
                  : [-3.652, 1.323, 0]
              }
              rotation={[Math.PI / 2, 0, Math.PI / 2]}
              scale={[0.102, 0.099, 0.198]}
            >
              <BCCystNucleusMaterial />
            </mesh>

            <mesh
              name="CystNucleus3"
              geometry={nodes.CystNucleus3.geometry}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [0.18, 0.06, 0]
                  : [-4.251, 1.141, 0]
              }
              rotation={[-0.79, 0.183, -1.702]}
              scale={[0.102, 0.099, 0.198]}
            >
              <BCCystNucleusMaterial />
            </mesh>

            <mesh
              name="CystNucleus2"
              geometry={nodes.CystNucleus2.geometry}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [0.02, 0.28, 0.08]
                  : [-3.979, 1.505, 0.155]
              }
              rotation={[-1.758, 0.001, 0.056]}
              scale={[0.102, 0.099, 0.198]}
            >
              <BCCystNucleusMaterial />
            </mesh>

            <mesh
              name="CystNucleus4"
              geometry={nodes.CystNucleus4.geometry}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [0.02, -0.06, -0.08]
                  : [-3.975, 0.955, -0.125]
              }
              rotation={[0.828, -1.11, 0.631]}
              scale={[0.102, 0.099, 0.198]}
            >
              <BCCystNucleusMaterial />
            </mesh>
          </group>
        )}

        {showGranules && (
          <group ref={granulesGroupRef}>
            <mesh
              name="StorageGranules"
              geometry={nodes.StorageGranules.geometry}
              position={
                isIsolated && focusedMarkerId === "granules"
                  ? [0, 0, 0]
                  : [-3.809, 0.994, 0.013]
              }
              rotation={[0.333, 0.794, -Math.PI / 2]}
              scale={0.029}
            >
              <BCStorageGranulesMaterial />
            </mesh>
          </group>
        )}
      </group>
    </group>
  );
}

useGLTF.preload("/models/BlastoCystisCyst-v1.glb");
