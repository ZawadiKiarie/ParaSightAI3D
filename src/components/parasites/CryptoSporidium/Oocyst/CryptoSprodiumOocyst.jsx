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
import OocystBodyMaterial from "../../../shaders/OocystCryptoBodyShader";
import { createCryptoMaterials } from "../../../shaders/CryptoMaterials";

export function CryptoSporidiumOocyst(props) {
  const { nodes } = useGLTF("/models/CryptosporidiumsppOocyst-v1.glb");

  const hoveredMarkerId = useAtomValue(hoveredMarkerAtom);
  const view = useAtomValue(viewAtom);
  const focusedMarkerId = useAtomValue(focusedMarkerIdAtom);

  const {
    residualBodyMaterial,
    sporozoiteMaterial,
    conoidMaterial,
    rhoptryMaterial,
    micronemeMaterial,
    nucleusMaterial,
    mitosomeMaterial,
  } = useMemo(() => createCryptoMaterials(), []);

  const isolatedGroupRef = useRef();
  const wallGroupRef = useRef();
  const sporozoiteGroupRef = useRef();
  const nucleiGroupRef = useRef();
  const apicalGroupRef = useRef();
  const residualGroupRef = useRef();
  const wallMaterialRef = useRef();

  const isIsolated = view === "ISOLATED";

  const isWallHovered = hoveredMarkerId === "oocystWall";
  const isSporozoitesHovered = hoveredMarkerId === "sporozoites";
  const isNucleiHovered = hoveredMarkerId === "nuclei";
  const isApicalHovered = hoveredMarkerId === "apicalComplex";
  const isResidualHovered = hoveredMarkerId === "residualBody";

  const showWall =
    !isIsolated ||
    focusedMarkerId === "oocystWall" ||
    focusedMarkerId === "sporozoites";
  const showSporozoites = !isIsolated || focusedMarkerId === "sporozoites";
  const showNuclei = !isIsolated || focusedMarkerId === "nuclei";
  const showApical = !isIsolated || focusedMarkerId === "apicalComplex";
  const showResidual = !isIsolated || focusedMarkerId === "residualBody";

  useFrame((state, delta) => {
    const ease = 1 - Math.exp(-8 * delta);

    const wallTargetScale = isWallHovered ? 1.05 : 1;
    const sporozoiteTargetScale = isSporozoitesHovered ? 1.1 : 1;
    const nucleiTargetScale = isNucleiHovered ? 1.14 : 1;
    const apicalTargetScale = isApicalHovered ? 1.12 : 1;
    const residualTargetScale = isResidualHovered ? 1.12 : 1;

    if (wallGroupRef.current) {
      const next = THREE.MathUtils.lerp(
        wallGroupRef.current.scale.x,
        wallTargetScale,
        ease,
      );
      wallGroupRef.current.scale.setScalar(next);
    }

    if (sporozoiteGroupRef.current) {
      const next = THREE.MathUtils.lerp(
        sporozoiteGroupRef.current.scale.x,
        sporozoiteTargetScale,
        ease,
      );
      sporozoiteGroupRef.current.scale.setScalar(next);
    }

    if (nucleiGroupRef.current) {
      const next = THREE.MathUtils.lerp(
        nucleiGroupRef.current.scale.x,
        nucleiTargetScale,
        ease,
      );
      nucleiGroupRef.current.scale.setScalar(next);
    }

    if (apicalGroupRef.current) {
      const next = THREE.MathUtils.lerp(
        apicalGroupRef.current.scale.x,
        apicalTargetScale,
        ease,
      );
      apicalGroupRef.current.scale.setScalar(next);
    }

    if (residualGroupRef.current) {
      const next = THREE.MathUtils.lerp(
        residualGroupRef.current.scale.x,
        residualTargetScale,
        ease,
      );
      residualGroupRef.current.scale.setScalar(next);
    }

    if (
      wallMaterialRef.current &&
      wallMaterialRef.current.opacity !== undefined
    ) {
      const targetOpacity =
        isSporozoitesHovered ||
        isNucleiHovered ||
        isApicalHovered ||
        isResidualHovered
          ? 0.14
          : isWallHovered
            ? 0.72
            : isIsolated && focusedMarkerId !== "oocystWall"
              ? 0.08
              : 0.42;

      wallMaterialRef.current.opacity = THREE.MathUtils.lerp(
        wallMaterialRef.current.opacity,
        targetOpacity,
        ease,
      );
    }

    if (residualBodyMaterial && residualBodyMaterial.opacity !== undefined) {
      const targetOpacity =
        isIsolated && focusedMarkerId !== "residualBody" ? 0.08 : 0.95;
      residualBodyMaterial.opacity = THREE.MathUtils.lerp(
        residualBodyMaterial.opacity,
        targetOpacity,
        ease,
      );
    }

    if (sporozoiteMaterial && sporozoiteMaterial.opacity !== undefined) {
      const targetOpacity =
        isIsolated && focusedMarkerId !== "sporozoites" ? 0.08 : 0.96;
      sporozoiteMaterial.opacity = THREE.MathUtils.lerp(
        sporozoiteMaterial.opacity,
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

    if (conoidMaterial && conoidMaterial.opacity !== undefined) {
      const targetOpacity =
        isIsolated && focusedMarkerId !== "apicalComplex" ? 0.08 : 0.98;
      conoidMaterial.opacity = THREE.MathUtils.lerp(
        conoidMaterial.opacity,
        targetOpacity,
        ease,
      );
    }

    if (rhoptryMaterial && rhoptryMaterial.opacity !== undefined) {
      const targetOpacity =
        isIsolated && focusedMarkerId !== "apicalComplex" ? 0.08 : 0.96;
      rhoptryMaterial.opacity = THREE.MathUtils.lerp(
        rhoptryMaterial.opacity,
        targetOpacity,
        ease,
      );
    }

    if (micronemeMaterial && micronemeMaterial.opacity !== undefined) {
      const targetOpacity =
        isIsolated && focusedMarkerId !== "apicalComplex" ? 0.08 : 0.95;
      micronemeMaterial.opacity = THREE.MathUtils.lerp(
        micronemeMaterial.opacity,
        targetOpacity,
        ease,
      );
    }

    if (mitosomeMaterial && mitosomeMaterial.opacity !== undefined) {
      const targetOpacity =
        isIsolated && focusedMarkerId !== "apicalComplex" ? 0.08 : 0.94;
      mitosomeMaterial.opacity = THREE.MathUtils.lerp(
        mitosomeMaterial.opacity,
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
              name="oocystbody"
              geometry={nodes.oocystbody.geometry}
              position={[0, 1, 0]}
            >
              <OocystBodyMaterial
                ref={wallMaterialRef}
                opacity={0.42}
                baseColor="#709a31"
                shadowColor="#1f2f0d"
                wallTint="#46570b"
                noiseScale={14.6}
                flowSpeed={10.08}
                brightness={0.01}
                wallStrength={1.74}
                granuleStrength={2.06}
                fresnelStrength={0.0}
                wobbleStrength={0.044}
                wobbleSpeed={1.42}
              />
            </mesh>
          </group>
        )}

        {showResidual && (
          <group ref={residualGroupRef}>
            <mesh
              name="ResidualboDY"
              geometry={nodes.ResidualboDY.geometry}
              material={residualBodyMaterial}
              position={
                isIsolated && focusedMarkerId === "residualBody"
                  ? [0, 0, 0]
                  : [0.099, 0.844, -0.196]
              }
              rotation={[-0.968, -0.453, -Math.PI / 2]}
              scale={0.07}
            />
          </group>
        )}

        {showSporozoites && (
          <group ref={sporozoiteGroupRef}>
            <mesh
              name="Sporozoite1"
              geometry={nodes.Sporozoite1.geometry}
              material={sporozoiteMaterial}
              position={
                isIsolated && focusedMarkerId === "sporozoites"
                  ? [-0.2, 0.12, -0.14]
                  : [-0.116, 1.152, -0.489]
              }
              rotation={[-3.064, -0.743, -0.381]}
              scale={0.519}
            />
            <mesh
              name="Sporozoite1001"
              geometry={nodes.Sporozoite1001.geometry}
              material={sporozoiteMaterial}
              position={
                isIsolated && focusedMarkerId === "sporozoites"
                  ? [0.22, -0.08, 0.02]
                  : [0.456, 0.823, -0.017]
              }
              rotation={[1.28, 0.004, 0.026]}
              scale={0.519}
            />
            <mesh
              name="Sporozoite1002"
              geometry={nodes.Sporozoite1002.geometry}
              material={sporozoiteMaterial}
              position={
                isIsolated && focusedMarkerId === "sporozoites"
                  ? [0.04, 0.26, 0.18]
                  : [-0.007, 1.329, 0.359]
              }
              rotation={[-0.482, -0.227, -2.688]}
              scale={0.519}
            />
            <mesh
              name="Sporozoite1003"
              geometry={nodes.Sporozoite1003.geometry}
              material={sporozoiteMaterial}
              position={
                isIsolated && focusedMarkerId === "sporozoites"
                  ? [-0.28, 0.18, -0.04]
                  : [-0.357, 1.264, -0.06]
              }
              rotation={[-0.313, -1.162, 2.824]}
              scale={0.519}
            />
          </group>
        )}

        {showApical && (
          <group ref={apicalGroupRef}>
            <mesh
              name="Conoid1"
              geometry={nodes.Conoid1.geometry}
              material={conoidMaterial}
              position={[-0.139, 1.429, -0.281]}
              rotation={[1.194, 0.327, -0.108]}
              scale={[0.027, 0.042, 0.027]}
            />
            <mesh
              name="Conoid1001"
              geometry={nodes.Conoid1001.geometry}
              material={conoidMaterial}
              position={[0.441, 0.847, -0.363]}
              rotation={[-0.89, -0.389, 0.324]}
              scale={[0.027, 0.042, 0.027]}
            />
            <mesh
              name="Conoid1002"
              geometry={nodes.Conoid1002.geometry}
              material={conoidMaterial}
              position={[-0.097, 1.529, 0.09]}
              rotation={[1.68, 0.864, -2.887]}
              scale={[0.027, 0.042, 0.027]}
            />
            <mesh
              name="Conoid1003"
              geometry={nodes.Conoid1003.geometry}
              material={conoidMaterial}
              position={[-0.196, 1.57, -0.091]}
              rotation={[1.396, 0.546, -1.478]}
              scale={[0.027, 0.042, 0.027]}
            />

            <mesh
              name="Rhoptries2"
              geometry={nodes.Rhoptries2.geometry}
              material={rhoptryMaterial}
              position={[-0.197, 1.394, -0.334]}
              rotation={[0.999, 0.042, -0.076]}
              scale={[0.022, 0.033, 0.022]}
            />
            <mesh
              name="Rhoptries1"
              geometry={nodes.Rhoptries1.geometry}
              material={rhoptryMaterial}
              position={[-0.135, 1.391, -0.406]}
              rotation={[0.999, 0.042, -0.076]}
              scale={[0.022, 0.033, 0.022]}
            />
            <mesh
              name="Rhoptries2001"
              geometry={nodes.Rhoptries2001.geometry}
              material={rhoptryMaterial}
              position={[0.418, 0.783, -0.31]}
              rotation={[-0.971, -0.726, 0.277]}
              scale={[0.022, 0.033, 0.022]}
            />
            <mesh
              name="Rhoptries1001"
              geometry={nodes.Rhoptries1001.geometry}
              material={rhoptryMaterial}
              position={[0.5, 0.786, -0.264]}
              rotation={[-0.971, -0.726, 0.277]}
              scale={[0.022, 0.033, 0.022]}
            />
            <mesh
              name="Rhoptries2002"
              geometry={nodes.Rhoptries2002.geometry}
              material={rhoptryMaterial}
              position={[-0.081, 1.549, 0.172]}
              rotation={[1.905, 1.189, -3.086]}
              scale={[0.022, 0.033, 0.022]}
            />
            <mesh
              name="Rhoptries1002"
              geometry={nodes.Rhoptries1002.geometry}
              material={rhoptryMaterial}
              position={[-0.138, 1.482, 0.205]}
              rotation={[1.905, 1.189, -3.086]}
              scale={[0.022, 0.033, 0.022]}
            />
            <mesh
              name="Rhoptries2003"
              geometry={nodes.Rhoptries2003.geometry}
              material={rhoptryMaterial}
              position={[-0.262, 1.546, -0.041]}
              rotation={[0.999, 0.649, -1.257]}
              scale={[0.022, 0.033, 0.022]}
            />
            <mesh
              name="Rhoptries1003"
              geometry={nodes.Rhoptries1003.geometry}
              material={rhoptryMaterial}
              position={[-0.308, 1.507, -0.113]}
              rotation={[0.999, 0.649, -1.257]}
              scale={[0.022, 0.033, 0.022]}
            />

            <mesh
              name="Mitosome1"
              geometry={nodes.Mitosome1.geometry}
              material={mitosomeMaterial}
              position={[-0.116, 1.152, -0.489]}
              rotation={[-0.157, -0.061, -1.483]}
              scale={0.024}
            />
            <mesh
              name="Mitosome1001"
              geometry={nodes.Mitosome1001.geometry}
              material={mitosomeMaterial}
              position={[0.456, 0.823, -0.017]}
              rotation={[-2.492, -0.589, -2.174]}
              scale={0.024}
            />
            <mesh
              name="Mitosome1002"
              geometry={nodes.Mitosome1002.geometry}
              material={mitosomeMaterial}
              position={[-0.007, 1.329, 0.359]}
              rotation={[-2.77, 0.46, 0.433]}
              scale={0.024}
            />
            <mesh
              name="Mitosome1003"
              geometry={nodes.Mitosome1003.geometry}
              material={mitosomeMaterial}
              position={[-0.357, 1.264, -0.06]}
              rotation={[-0.965, 1.1, -0.918]}
              scale={0.024}
            />

            {Object.keys(nodes)
              .filter((key) => key.startsWith("Microneme"))
              .map((key) => (
                <mesh
                  key={key}
                  name={key}
                  geometry={nodes[key].geometry}
                  material={micronemeMaterial}
                  position={nodes[key].position}
                  rotation={nodes[key].rotation}
                  scale={nodes[key].scale}
                />
              ))}
          </group>
        )}

        {showNuclei && (
          <group ref={nucleiGroupRef}>
            <mesh
              name="Nucleus1"
              geometry={nodes.Nucleus1.geometry}
              material={nucleusMaterial}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [-0.18, 0.1, -0.12]
                  : [-0.116, 1.16, -0.601]
              }
              rotation={[0.325, 0.08, 0.003]}
              scale={[0.066, 0.086, 0.066]}
            />
            <mesh
              name="Nucleus1001"
              geometry={nodes.Nucleus1001.geometry}
              material={nucleusMaterial}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [0.2, -0.08, 0.04]
                  : [0.527, 0.753, 0.036]
              }
              rotation={[-1.876, -0.703, -0.304]}
              scale={[0.066, 0.086, 0.066]}
            />
            <mesh
              name="Nucleus1002"
              geometry={nodes.Nucleus1002.geometry}
              material={nucleusMaterial}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [0.04, 0.24, 0.18]
                  : [-0.075, 1.31, 0.446]
              }
              rotation={[3.082, 0.83, 2.191]}
              scale={[0.066, 0.086, 0.066]}
            />
            <mesh
              name="Nucleus1003"
              geometry={nodes.Nucleus1003.geometry}
              material={nucleusMaterial}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [-0.26, 0.16, -0.02]
                  : [-0.463, 1.247, -0.094]
              }
              rotation={[0.367, 1.237, -0.681]}
              scale={[0.066, 0.086, 0.066]}
            />
          </group>
        )}
      </group>
    </group>
  );
}

useGLTF.preload("/models/CryptosporidiumsppOocyst-v1.glb");
