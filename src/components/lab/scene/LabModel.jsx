// src/components/lab/scene/LabModel.jsx

import React, { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Center, useAnimations, useFBX, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useGraph, useFrame } from "@react-three/fiber";
import { SkeletonUtils } from "three-stdlib";

import { PARASITE_DATA } from "../../ParasiteConfig";

import { CHARACTER_ANIMATIONS, LAB_MODEL_PATH } from "../config/labConstants";

import { usePlayerController } from "../controls/usePlayerController";
import { useLabTextures, preloadLabTextures } from "./LabTextures";
import { useLabMaterials } from "./LabMaterials";
import { CharacterAvatar } from "../sceneObjects/CharacterAvatar";
import { InfoBubbles } from "../sceneObjects/InfoBubbles";
import { SamplePrepObjects } from "../sceneObjects/SamplePrepObjects";
import { MicroscopeObjects } from "../sceneObjects/MicroscopeObjects";
import { AIStationObjects } from "../sceneObjects/AIStationObjects";
import { ChamberObjects } from "../sceneObjects/ChamberObjects";
import { LearningPanelObjects } from "../sceneObjects/LearningPanelObjects";
import { StaticLabMeshes } from "../sceneObjects/StaticLabMeshes";

/**
 * LabModel is the main 3D lab scene.
 *
 * It is responsible for:
 * - loading the GLB lab model
 * - rendering the character, station objects, screens, and collider
 * - connecting clickable meshes to lab workflow handlers
 * - running visual effects such as glowing objects and holograms
 *
 * Player movement, camera, collision, materials, and textures are now
 * delegated to smaller files.
 */
export function LabModel({
  moveInput,
  lookInput,
  onPlayerMovedEnough,
  onStationClick,

  samplePrepStep = "idle",
  samplePrepCameraActive = false,
  samplePrepCompleted = false,
  onStartSamplePrep,
  onAddSample,
  onApplyStain,

  microscopeActive = false,
  microscopeCompleted = false,
  onOpenMicroscope,

  aiStep = "idle",
  showMappedModel = false,
  aiDetectionResult,

  aiPanelOpen = false,
  aiCompleted = false,
  onOpenAIAnalysis,

  chamberInfoPanelOpen = false,
  chamberControlsPanelOpen = false,
  selectedFeatureId = null,
  modelRotationY = 0,
  modelZoom = 1,
  onOpenChamberInfo,
  onOpenChamberControls,

  learningPanelOpen = false,
  learningCompleted = false,
  onOpenLearningPanel,

  ...props
}) {
  const { scene } = useGLTF(LAB_MODEL_PATH);
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  const group = useRef();
  const collider = useRef();
  const characterGroup = useRef();

  const bubbleRefs = useRef([]);
  const glowTextRefs = useRef([]);
  const originalBubblePositions = useRef([]);
  const hoveredBubble = useRef(null);

  const bottomSlideRef = useRef();
  const bottomSlideGlowRef = useRef();
  const topSlideRef = useRef();
  const dropRef = useRef();
  const sampleBottleRef = useRef();
  const stainBottleRef = useRef();

  const microscopeRef = useRef();
  const microscopeGlowRef = useRef();

  const aiScreenRef = useRef();
  const aiScreenGlowRef = useRef();

  const samplePrepOriginalMaterials = useRef({});

  const chamberPlatformGlowRef = useRef();
  const hologramRingRef = useRef();
  const hologramRingRef2 = useRef();
  const hologramParticlesRef = useRef();

  const mappedModelAnchorRef = useRef();
  const mappedModelPivotRef = useRef();
  const mappedModelInnerRef = useRef();
  const focusTargetRef = useRef(new THREE.Vector3(0, 0, 0));

  const leftScreenRef = useRef();
  const rightScreenRef = useRef();
  const leftScreenGlowRef = useRef();
  const rightScreenGlowRef = useRef();
  const leftScreenDisplayRef = useRef();
  const rightScreenDisplayRef = useRef();

  const learningScreenRef = useRef();
  const learningScreenDisplayRef = useRef();
  const learningScreenGlowRef = useRef();
  const pushPlaneRef = useRef();

  const computerScreenDisplayRef = useRef();

  const isDropVisible = ["sampleAdded", "stained", "covered", "ready"].includes(
    samplePrepStep,
  );

  const isTopSlideVisible = ["covered", "ready"].includes(samplePrepStep);
  const isSlideReady = samplePrepStep === "ready";

  const mappedParasite =
    aiDetectionResult &&
    PARASITE_DATA[aiDetectionResult.parasiteId]?.[aiDetectionResult.stage];

  const mappedParasiteComponent = mappedParasite?.Component;

  const selectedMarker =
    mappedParasite?.markers?.find(
      (marker) => marker.id === selectedFeatureId,
    ) || null;

  const isLearningPanelAvailable =
    aiCompleted && showMappedModel && !learningCompleted;

  const {
    bakedTextures,
    aiScreenTextures,
    chamberScreenTextures,
    learningScreenTexture,
    microscopeComputerTexture,
  } = useLabTextures();

  const {
    glassMat,
    bubbleMat,
    bubbleHoverMat,
    bottomSlideGlowMat,
    microscopeGlowMat,
    aiScreenGlowMat,
    platformGlowMat,
    hologramRingMat,
    hologramParticleMat,
    bakedMats,
  } = useLabMaterials({ bakedTextures });

  /**
   * Player movement, camera, and collision are handled by this hook.
   */
  const { animation, updatePlayerFrame } = usePlayerController({
    groupRef: group,
    colliderRef: collider,
    characterRef: characterGroup,
    moveInputRef: moveInput,
    lookInputRef: lookInput,
    samplePrepCameraActive,
    microscopeActive,
    onPlayerMovedEnough,
  });

  /**
   * Load character animations and play the current animation requested
   * by the player controller.
   */
  const { animations: idleAnimation } = useFBX(CHARACTER_ANIMATIONS.idle);
  const { animations: walkingAnimation } = useFBX(CHARACTER_ANIMATIONS.walking);

  idleAnimation[0].name = "Idle";
  walkingAnimation[0].name = "Walking";

  const { actions } = useAnimations(
    [idleAnimation[0], walkingAnimation[0]],
    characterGroup,
  );

  useEffect(() => {
    const action = actions?.[animation];

    if (!action) return;

    action.reset().fadeIn(0.5).play();

    return () => {
      action.fadeOut(0.5);
    };
  }, [actions, animation]);

  /**
   * Applies baked, glass, and bubble materials to the loaded GLB scene.
   *
   * The collider mesh is skipped so collision detection remains stable.
   */
  useLayoutEffect(() => {
    const g = group.current;
    if (!g) return;

    g.traverse((child) => {
      if (!(child.isMesh || child.isSkinnedMesh)) return;

      const n = child.name.toLowerCase();

      if (n.includes("collider")) return;
      if (n.includes("bottomslideglow")) return;
      if (n.includes("microscopeglow")) return;
      if (n.includes("aiscreenglow")) return;

      if (n.includes("glass")) {
        child.material = glassMat;
        return;
      }

      if (n.includes("bubble")) {
        child.material = bubbleMat;
        return;
      }

      if (n.includes("one")) child.material = bakedMats.TexturePackOne;
      if (n.includes("two")) child.material = bakedMats.TexturePackTwo;
      if (n.includes("three")) child.material = bakedMats.TexturePackThree;
      if (n.includes("four")) child.material = bakedMats.TexturePackFour;
    });

    const makeUniqueMaterial = (mesh, key) => {
      if (!mesh || !mesh.material) return;

      mesh.material = mesh.material.clone();

      samplePrepOriginalMaterials.current[key] = mesh.material.color
        ? mesh.material.color.clone()
        : new THREE.Color(0xffffff);
    };

    makeUniqueMaterial(bottomSlideRef.current, "bottomSlide");
    makeUniqueMaterial(topSlideRef.current, "topSlide");
    makeUniqueMaterial(dropRef.current, "drop");
    makeUniqueMaterial(sampleBottleRef.current, "sampleBottle");
    makeUniqueMaterial(stainBottleRef.current, "stainBottle");
  }, [bakedMats, glassMat, bubbleMat]);

  /**
   * Changes AI screen texture depending on whether an image has been sent.
   */
  useEffect(() => {
    if (!aiScreenRef.current) return;

    aiScreenRef.current.material = aiScreenRef.current.material.clone();

    const map =
      aiStep === "idle" ? aiScreenTextures.idle : aiScreenTextures.received;

    aiScreenRef.current.material.map = map;
    aiScreenRef.current.material.needsUpdate = true;
  }, [aiStep, aiScreenTextures]);

  const handleLearningPanelClick = (event) => {
    event.stopPropagation();

    if (isLearningPanelAvailable && onOpenLearningPanel) {
      onOpenLearningPanel();
    }
  };

  const handleAIScreenClick = (event) => {
    event.stopPropagation();

    if (aiStep !== "idle" && !aiCompleted && onOpenAIAnalysis) {
      onOpenAIAnalysis();
    }
  };

  const handleBubbleClick = (event, stationKey) => {
    event.stopPropagation();

    if (onStationClick) {
      onStationClick(stationKey);
    }
  };

  const handleBubblePointerOver = (event, index) => {
    event.stopPropagation();

    document.body.style.cursor = "pointer";
    hoveredBubble.current = index;

    const bubble = bubbleRefs.current[index];

    if (bubble) {
      bubble.material = bubbleHoverMat;
    }
  };

  const handleBubblePointerOut = (event, index) => {
    event.stopPropagation();

    document.body.style.cursor = "default";
    hoveredBubble.current = null;

    const bubble = bubbleRefs.current[index];

    if (bubble) {
      bubble.material = bubbleMat;
    }
  };

  const handleBottomSlideClick = (event) => {
    event.stopPropagation();

    if (samplePrepStep === "idle" && onStartSamplePrep) {
      onStartSamplePrep();
    }
  };

  const handleSampleBottleClick = (event) => {
    event.stopPropagation();

    if (samplePrepStep === "focused" && onAddSample) {
      onAddSample();
    }
  };

  const handleStainBottleClick = (event) => {
    event.stopPropagation();

    if (samplePrepStep === "sampleAdded" && onApplyStain) {
      onApplyStain();
    }
  };

  const handlePointerCursor = (event) => {
    event.stopPropagation();
    document.body.style.cursor = "pointer";
  };

  const handlePointerOutCursor = (event) => {
    event.stopPropagation();
    document.body.style.cursor = "default";
  };

  const handleMicroscopeClick = (event) => {
    event.stopPropagation();

    if (samplePrepCompleted && !microscopeCompleted && onOpenMicroscope) {
      onOpenMicroscope();
    }
  };

  const handleLeftScreenClick = (event) => {
    event.stopPropagation();

    if (showMappedModel && onOpenChamberInfo) {
      onOpenChamberInfo();
    }
  };

  const handleRightScreenClick = (event) => {
    event.stopPropagation();

    if (showMappedModel && onOpenChamberControls) {
      onOpenChamberControls();
    }
  };

  const hologramParticleGeometry = useMemo(() => {
    const count = 120;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.4 + Math.random() * 2.1;
      const height = Math.random() * 3.2;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    return geometry;
  }, []);

  useFrame((state, delta) => {
    /**
     * Movement/camera/collision are now handled by the player controller.
     */
    updatePlayerFrame(state.camera, delta);

    const elapsed = state.clock.getElapsedTime();
    const pulse = (Math.sin(elapsed * 4.5) + 1) / 2;

    /**
     * Floating information bubbles.
     */
    bubbleRefs.current.forEach((bubble, index) => {
      if (!bubble) return;

      if (!originalBubblePositions.current[index]) {
        originalBubblePositions.current[index] = {
          bubble: bubble.position.clone(),
          text: glowTextRefs.current[index]?.position.clone(),
        };
      }

      const base = originalBubblePositions.current[index];
      const floatOffset = Math.sin(elapsed * 0.8 + index * 0.7) * 0.12;

      bubble.position.y = base.bubble.y + floatOffset;
      bubble.rotation.y += delta * 0.25;

      const text = glowTextRefs.current[index];

      if (text && base.text) {
        text.position.y = base.text.y + floatOffset;
      }
    });

    const setMeshColor = (mesh, color, intensity = 1) => {
      if (!mesh || !mesh.material || !mesh.material.color) return;

      mesh.material.color.lerp(new THREE.Color(color), intensity);
    };

    const resetMeshColor = (mesh, key, intensity = 0.08) => {
      const original = samplePrepOriginalMaterials.current[key];

      if (!mesh || !mesh.material || !mesh.material.color || !original) return;

      mesh.material.color.lerp(original, intensity);
    };

    resetMeshColor(bottomSlideRef.current, "bottomSlide");
    resetMeshColor(sampleBottleRef.current, "sampleBottle");
    resetMeshColor(stainBottleRef.current, "stainBottle");
    resetMeshColor(dropRef.current, "drop");
    resetMeshColor(topSlideRef.current, "topSlide");

    if (bottomSlideGlowRef.current) {
      const shouldShowBottomSlideGlow =
        !samplePrepCompleted &&
        (samplePrepStep === "idle" || samplePrepStep === "ready");

      bottomSlideGlowRef.current.visible = shouldShowBottomSlideGlow;

      if (shouldShowBottomSlideGlow) {
        const glowOpacity =
          samplePrepStep === "idle" ? 0.25 + pulse * 0.75 : 0.45 + pulse * 0.55;

        bottomSlideGlowRef.current.material.opacity = glowOpacity;

        const glowScale = 1.02 + pulse * 0.045;
        bottomSlideGlowRef.current.scale.set(glowScale, glowScale, glowScale);
      }
    }

    if (samplePrepStep === "idle") {
      setMeshColor(
        bottomSlideRef.current,
        pulse > 0.5 ? 0x66ffff : 0xffffff,
        0.15,
      );
    }

    if (samplePrepStep === "focused") {
      setMeshColor(
        sampleBottleRef.current,
        pulse > 0.5 ? 0x66ffff : 0xffffff,
        0.18,
      );
    }

    if (samplePrepStep === "sampleAdded") {
      setMeshColor(
        stainBottleRef.current,
        pulse > 0.5 ? 0x66ffff : 0xffffff,
        0.18,
      );
    }

    if (["stained", "covered", "ready"].includes(samplePrepStep)) {
      setMeshColor(dropRef.current, 0xd58cff, 0.08);
      setMeshColor(bottomSlideRef.current, 0xd8b4fe, 0.05);
    }

    if (samplePrepStep === "ready") {
      setMeshColor(
        bottomSlideRef.current,
        pulse > 0.4 ? 0x7fffff : 0xffffff,
        0.2,
      );

      setMeshColor(topSlideRef.current, pulse > 0.4 ? 0x7fffff : 0xffffff, 0.2);
    }

    if (dropRef.current) {
      const targetScale = isDropVisible ? 1 : 0.001;
      const currentScale = dropRef.current.scale.x;
      const nextScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.12);

      dropRef.current.scale.setScalar(nextScale);
      dropRef.current.visible = nextScale > 0.01;
    }

    if (microscopeGlowRef.current) {
      const shouldShowMicroscopeGlow =
        samplePrepCompleted && !microscopeActive && !microscopeCompleted;

      microscopeGlowRef.current.visible = shouldShowMicroscopeGlow;

      if (shouldShowMicroscopeGlow) {
        microscopeGlowRef.current.material.opacity = 0.22 + pulse * 0.55;

        const glowScale = 1.01 + pulse * 0.035;
        microscopeGlowRef.current.scale.set(glowScale, glowScale, glowScale);
      }
    }

    if (aiScreenGlowRef.current) {
      const shouldShowAIGlow =
        aiStep !== "idle" && !aiPanelOpen && !aiCompleted;

      aiScreenGlowRef.current.visible = shouldShowAIGlow;

      if (shouldShowAIGlow) {
        aiScreenGlowRef.current.material.opacity = 0.2 + pulse * 0.55;

        const glowScale = 1.01 + pulse * 0.03;
        aiScreenGlowRef.current.scale.set(glowScale, glowScale, glowScale);
      }
    }

    if (chamberPlatformGlowRef.current) {
      chamberPlatformGlowRef.current.visible = showMappedModel;

      if (showMappedModel) {
        chamberPlatformGlowRef.current.material.opacity = 0.32;
        chamberPlatformGlowRef.current.scale.set(1.04, 1.04, 1.04);
      }
    }

    if (hologramRingRef.current) {
      hologramRingRef.current.visible = showMappedModel;
      hologramRingRef.current.rotation.z += delta * 0.6;
      hologramRingRef.current.material.opacity = 0.35;
    }

    if (hologramRingRef2.current) {
      hologramRingRef2.current.visible = showMappedModel;
      hologramRingRef2.current.rotation.z -= delta * 0.4;
      hologramRingRef2.current.material.opacity = 0.26;
    }

    if (hologramParticlesRef.current) {
      hologramParticlesRef.current.visible = showMappedModel;
      hologramParticlesRef.current.rotation.y += delta * 0.18;
    }

    if (mappedModelPivotRef.current) {
      const targetRotationY = THREE.MathUtils.degToRad(modelRotationY);

      mappedModelPivotRef.current.rotation.y = THREE.MathUtils.lerp(
        mappedModelPivotRef.current.rotation.y,
        targetRotationY,
        1 - Math.exp(-8 * delta),
      );

      const baseScale = mappedParasite?.scale ?? 0.9;
      const focusScale = selectedMarker
        ? (mappedParasite?.focusScale ?? 2.2)
        : 1;

      const finalScale = baseScale * modelZoom * focusScale;

      mappedModelPivotRef.current.scale.lerp(
        new THREE.Vector3(finalScale, finalScale, finalScale),
        1 - Math.exp(-6 * delta),
      );
    }

    if (mappedModelInnerRef.current) {
      const ease = 1 - Math.exp(-5 * delta);

      if (selectedMarker) {
        const [mx, my, mz = 0] = selectedMarker.position;
        const [offX, offY, offZ = 0] = mappedParasite?.focusFrameOffset ?? [
          0, 0, 0,
        ];

        focusTargetRef.current.set(
          -mx * 1.25 + offX,
          -my * 1.25 + offY,
          -mz * 0.25 + offZ,
        );
      } else {
        focusTargetRef.current.set(0, 0, 0);
      }

      mappedModelInnerRef.current.position.lerp(focusTargetRef.current, ease);
    }

    if (leftScreenGlowRef.current) {
      const shouldGlow = showMappedModel && !chamberInfoPanelOpen;
      leftScreenGlowRef.current.visible = shouldGlow;

      if (shouldGlow) {
        leftScreenGlowRef.current.material.opacity = 0.18 + pulse * 0.42;
        const glowScale = 1.02 + pulse * 0.02;
        leftScreenGlowRef.current.scale.set(glowScale, glowScale, glowScale);
      }
    }

    if (rightScreenGlowRef.current) {
      const shouldGlow = showMappedModel && !chamberControlsPanelOpen;
      rightScreenGlowRef.current.visible = shouldGlow;

      if (shouldGlow) {
        rightScreenGlowRef.current.material.opacity = 0.18 + pulse * 0.42;
        const glowScale = 1.02 + pulse * 0.02;
        rightScreenGlowRef.current.scale.set(glowScale, glowScale, glowScale);
      }
    }

    if (learningScreenGlowRef.current) {
      const shouldGlow = isLearningPanelAvailable && !learningPanelOpen;

      learningScreenGlowRef.current.visible = shouldGlow;

      if (shouldGlow) {
        learningScreenGlowRef.current.material.opacity = 0.16 + pulse * 0.42;

        const glowScale = 1.02 + pulse * 0.025;
        learningScreenGlowRef.current.scale.set(
          glowScale,
          glowScale,
          glowScale,
        );
      }
    }
  });

  return (
    <group {...props} dispose={null} ref={group}>
      <CharacterAvatar nodes={nodes} characterGroup={characterGroup} />

      <SamplePrepObjects
        nodes={nodes}
        dropRef={dropRef}
        sampleBottleRef={sampleBottleRef}
        stainBottleRef={stainBottleRef}
        topSlideRef={topSlideRef}
        bottomSlideRef={bottomSlideRef}
        bottomSlideGlowRef={bottomSlideGlowRef}
        bottomSlideGlowMat={bottomSlideGlowMat}
        samplePrepStep={samplePrepStep}
        samplePrepCompleted={samplePrepCompleted}
        isDropVisible={isDropVisible}
        isTopSlideVisible={isTopSlideVisible}
        isSlideReady={isSlideReady}
        onBottomSlideClick={handleBottomSlideClick}
        onSampleBottleClick={handleSampleBottleClick}
        onStainBottleClick={handleStainBottleClick}
        onPointerCursor={handlePointerCursor}
        onPointerOutCursor={handlePointerOutCursor}
      />

      <MicroscopeObjects
        nodes={nodes}
        microscopeRef={microscopeRef}
        microscopeGlowRef={microscopeGlowRef}
        computerScreenDisplayRef={computerScreenDisplayRef}
        microscopeComputerTexture={microscopeComputerTexture}
        microscopeGlowMat={microscopeGlowMat}
        samplePrepCompleted={samplePrepCompleted}
        microscopeCompleted={microscopeCompleted}
        onMicroscopeClick={handleMicroscopeClick}
        onPointerCursor={handlePointerCursor}
        onPointerOutCursor={handlePointerOutCursor}
      />

      <AIStationObjects
        nodes={nodes}
        aiScreenRef={aiScreenRef}
        aiScreenGlowRef={aiScreenGlowRef}
        aiScreenGlowMat={aiScreenGlowMat}
        aiStep={aiStep}
        aiCompleted={aiCompleted}
        onAIScreenClick={handleAIScreenClick}
        onPointerCursor={handlePointerCursor}
        onPointerOutCursor={handlePointerOutCursor}
      />

      <ChamberObjects
        nodes={nodes}
        leftScreenRef={leftScreenRef}
        rightScreenRef={rightScreenRef}
        leftScreenDisplayRef={leftScreenDisplayRef}
        rightScreenDisplayRef={rightScreenDisplayRef}
        leftScreenGlowRef={leftScreenGlowRef}
        rightScreenGlowRef={rightScreenGlowRef}
        chamberScreenTextures={chamberScreenTextures}
        chamberPlatformGlowRef={chamberPlatformGlowRef}
        hologramRingRef={hologramRingRef}
        hologramRingRef2={hologramRingRef2}
        hologramParticlesRef={hologramParticlesRef}
        hologramParticleGeometry={hologramParticleGeometry}
        hologramParticleMat={hologramParticleMat}
        platformGlowMat={platformGlowMat}
        hologramRingMat={hologramRingMat}
        mappedModelAnchorRef={mappedModelAnchorRef}
        mappedModelPivotRef={mappedModelPivotRef}
        mappedModelInnerRef={mappedModelInnerRef}
        mappedParasiteComponent={mappedParasiteComponent}
        showMappedModel={showMappedModel}
        onLeftScreenClick={handleLeftScreenClick}
        onRightScreenClick={handleRightScreenClick}
        onPointerCursor={handlePointerCursor}
        onPointerOutCursor={handlePointerOutCursor}
      />

      <LearningPanelObjects
        nodes={nodes}
        learningScreenRef={learningScreenRef}
        learningScreenDisplayRef={learningScreenDisplayRef}
        learningScreenGlowRef={learningScreenGlowRef}
        pushPlaneRef={pushPlaneRef}
        learningScreenTexture={learningScreenTexture}
        platformGlowMat={platformGlowMat}
        isLearningPanelAvailable={isLearningPanelAvailable}
        onLearningPanelClick={handleLearningPanelClick}
        onPointerCursor={handlePointerCursor}
        onPointerOutCursor={handlePointerOutCursor}
      />

      <InfoBubbles
        nodes={nodes}
        bubbleRefs={bubbleRefs}
        glowTextRefs={glowTextRefs}
        bubbleMat={bubbleMat}
        onBubbleClick={handleBubbleClick}
        onBubblePointerOver={handleBubblePointerOver}
        onBubblePointerOut={handleBubblePointerOut}
      />

      <StaticLabMeshes nodes={nodes} colliderRef={collider} />
    </group>
  );
}

useGLTF.preload(LAB_MODEL_PATH);
preloadLabTextures();
