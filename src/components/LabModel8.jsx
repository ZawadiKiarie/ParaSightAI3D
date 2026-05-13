import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useAnimations, useFBX, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { Octree } from "three/examples/jsm/Addons.js";
import { Capsule } from "three/examples/jsm/Addons.js";
import { useGraph, useFrame } from "@react-three/fiber";
import { SkeletonUtils } from "three-stdlib";
import { PARASITE_DATA } from "./ParasiteConfig";

const CAPSULE_RADIUS = 0.35;
const CAPSULE_HEIGHT = 1;
const MOVE_SPEED = 7;
const ROTATION_SPEED = 0.15;

export function Model8({
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
  aiProgress = 0,
  aiResultSaved = false,
  showMappedModel = false,
  aiDetectionResult,
  onRunAIDetection,
  onViewIn3D,
  onSaveResult,

  aiPanelOpen = false,
  aiCompleted = false,
  onOpenAIAnalysis,

  ...props
}) {
  const { scene } = useGLTF("/models/labV8-v1.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  const group = useRef();
  const collider = useRef();
  const characterGroup = useRef();

  const playerVelocity = useRef(new THREE.Vector3());
  const targetRotation = useRef(0);

  const cameraYaw = useRef(0);
  const playerWorldPosition = useRef(new THREE.Vector3());
  const cameraWorldPosition = useRef(new THREE.Vector3());
  const cameraWorldTarget = useRef(new THREE.Vector3());

  const initialPlayerPosition = useRef(null);
  const hasTriggeredWelcome = useRef(false);

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

  const dropBaseScale = useRef(new THREE.Vector3(1, 1, 1));
  const samplePrepOriginalMaterials = useRef({});

  const [animation, setAnimation] = useState("Idle");

  const isSamplePrepStarted = samplePrepStep !== "idle";
  const isDropVisible = ["sampleAdded", "stained", "covered", "ready"].includes(
    samplePrepStep,
  );
  const isTopSlideVisible = ["covered", "ready"].includes(samplePrepStep);
  const isSlideReady = samplePrepStep === "ready";

  const mappedParasite =
    aiDetectionResult &&
    PARASITE_DATA[aiDetectionResult.parasiteId]?.[aiDetectionResult.stage];

  const mappedParasiteComponent = mappedParasite?.Component;

  const glassMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: 0.95,
        opacity: 1,
        transparent: true,
        roughness: 0.05,
        metalness: 0,
        ior: 1.5,
        thickness: 0.5,
        envMapIntensity: 1,
        side: THREE.DoubleSide,
      }),
    [],
  );

  const bubbleMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: 0x88ccff,
        transmission: 0.9,
        roughness: 0,
        metalness: 0,
        ior: 1.3,
        thickness: 0.2,
        transparent: true,
        opacity: 0.4,
        emissive: new THREE.Color(0x44aaff),
        emissiveIntensity: 0.3,
        side: THREE.DoubleSide,
        iridescence: 1,
        iridescenceIOR: 1.3,
      }),
    [],
  );

  const bubbleHoverMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: 0xffdd55,
        transmission: 0.65,
        roughness: 0,
        metalness: 0,
        ior: 1.3,
        thickness: 0.2,
        transparent: true,
        opacity: 0.75,
        emissive: new THREE.Color(0xffcc33),
        emissiveIntensity: 1.4,
        side: THREE.DoubleSide,
        iridescence: 1,
        iridescenceIOR: 1.3,
      }),
    [],
  );

  const bottomSlideGlowMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0x66ffff,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
        toneMapped: false,
      }),
    [],
  );

  const microscopeGlowMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0x66ffff,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
        toneMapped: false,
      }),
    [],
  );

  const aiScreenGlowMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0x66ffff,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: false,
        side: THREE.DoubleSide,
        toneMapped: false,

        // Helps prevent z-fighting with the actual AI screen texture
        polygonOffset: true,
        polygonOffsetFactor: -4,
        polygonOffsetUnits: -4,
      }),
    [],
  );

  const aiScreenTextures = useTexture({
    idle: "/textures/ai-screen-idle.png",
    received: "/textures/ai-screen-received.png",
  });

  Object.values(aiScreenTextures).forEach((texture) => {
    if (!texture) return;

    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;

    // Important: rotate around the center of the image
    texture.center.set(0.5, 0.5);

    // Fix sideways texture on the AI screen UVs
    texture.rotation = Math.PI / 2;
    // texture.scale = 0.5;
  });

  const textures = useTexture({
    TexturePackOne: "/textures/TexturePackOne.webp",
    TexturePackTwo: "/textures/TexturePackTwo.webp",
    TexturePackThree: "/textures/TexturePackThree.webp",
    TexturePackFour: "/textures/TexturePackFour.webp",
  });

  Object.values(textures).forEach((t) => {
    if (!t) return;
    t.flipY = false;
    t.colorSpace = THREE.SRGBColorSpace;
  });

  const bakedMats = useMemo(() => {
    const make = (map) =>
      new THREE.MeshBasicMaterial({
        map,
      });

    return {
      TexturePackOne: make(textures.TexturePackOne),
      TexturePackTwo: make(textures.TexturePackTwo),
      TexturePackThree: make(textures.TexturePackThree),
      TexturePackFour: make(textures.TexturePackFour),
    };
  }, [textures]);

  useLayoutEffect(() => {
    const g = group.current;
    if (!g) return;

    g.traverse((child) => {
      if (!(child.isMesh || child.isSkinnedMesh)) return;

      const n = child.name.toLowerCase();

      // Very important:
      // never apply visual materials to the collision mesh.
      if (n.includes("collider")) {
        return;
      }

      if (n.includes("bottomslideglow")) {
        return;
      }

      if (n.includes("microscopeglow")) {
        return;
      }

      if (n.includes("aiscreenglow")) {
        return;
      }

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

  const { animations: idleAnimation } = useFBX("/animations/Idle2.fbx");
  const { animations: walkingAnimation } = useFBX("/animations/Walking.fbx");

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

  const colliderOctree = useMemo(() => new Octree(), []);

  const playerCollider = useMemo(
    () =>
      new Capsule(
        new THREE.Vector3(0, CAPSULE_RADIUS, 0),
        new THREE.Vector3(0, CAPSULE_HEIGHT, 0),
        CAPSULE_RADIUS,
      ),
    [],
  );

  useLayoutEffect(() => {
    if (!group.current || !collider.current || !characterGroup.current) return;

    group.current.updateWorldMatrix(true, true);
    collider.current.updateWorldMatrix(true, true);
    characterGroup.current.updateWorldMatrix(true, true);

    colliderOctree.fromGraphNode(collider.current);
    collider.current.visible = false;

    const worldPos = new THREE.Vector3();
    characterGroup.current.getWorldPosition(worldPos);

    playerCollider.start
      .copy(worldPos)
      .add(new THREE.Vector3(0, CAPSULE_RADIUS, 0));

    playerCollider.end
      .copy(worldPos)
      .add(new THREE.Vector3(0, CAPSULE_HEIGHT, 0));
  }, [colliderOctree, playerCollider]);

  const playerCollisions = () => {
    const result = colliderOctree.capsuleIntersect(playerCollider);

    if (result) {
      playerCollider.translate(result.normal.multiplyScalar(result.depth));
    }
  };

  const updatePlayer = (delta) => {
    if (!characterGroup.current) return;

    // Important:
    // substeps prevent the player from tunnelling through colliders
    // when MOVE_SPEED is high.
    const steps = 5;
    const stepDelta = delta / steps;

    for (let i = 0; i < steps; i++) {
      playerCollider.translate(
        playerVelocity.current.clone().multiplyScalar(stepDelta),
      );

      playerCollisions();
    }

    const worldPos = playerCollider.start.clone();
    worldPos.y -= CAPSULE_RADIUS;

    const parent = characterGroup.current.parent;

    if (parent) {
      parent.updateWorldMatrix(true, false);

      const inverseParent = new THREE.Matrix4()
        .copy(parent.matrixWorld)
        .invert();

      worldPos.applyMatrix4(inverseParent);
    }

    characterGroup.current.position.copy(worldPos);

    characterGroup.current.rotation.y = THREE.MathUtils.lerp(
      characterGroup.current.rotation.y,
      targetRotation.current,
      ROTATION_SPEED,
    );
  };

  useEffect(() => {
    if (!aiScreenRef.current) return;

    aiScreenRef.current.material = aiScreenRef.current.material.clone();

    const map =
      aiStep === "idle" ? aiScreenTextures.idle : aiScreenTextures.received;

    aiScreenRef.current.material.map = map;
    aiScreenRef.current.material.needsUpdate = true;
  }, [aiStep, aiScreenTextures]);

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

  useFrame((state, delta) => {
    if (!characterGroup.current) return;

    if (samplePrepCameraActive) {
      playerVelocity.current.x = 0;
      playerVelocity.current.z = 0;

      if (animation !== "Idle") {
        setAnimation("Idle");
      }

      const benchCameraPosition = new THREE.Vector3(50, 8.6, 5.7);
      const benchCameraTarget = new THREE.Vector3(46.2, 2.5, 4.2);

      state.camera.position.lerp(benchCameraPosition, 0.045);
      state.camera.lookAt(benchCameraTarget);
    } else if (microscopeActive) {
      playerVelocity.current.x = 0;
      playerVelocity.current.z = 0;

      if (animation !== "Idle") {
        setAnimation("Idle");
      }

      const microscopeCameraPosition = new THREE.Vector3(51.5, 7.2, 17.2);
      const microscopeCameraTarget = new THREE.Vector3(49.2, 3.1, 13.1);

      state.camera.position.lerp(microscopeCameraPosition, 0.045);
      state.camera.lookAt(microscopeCameraTarget);
    } else {
      const look = lookInput.current;
      const move = moveInput.current;

      cameraYaw.current -= look.x * 1.2 * delta;

      const direction = new THREE.Vector3();

      const forward = new THREE.Vector3(
        Math.sin(cameraYaw.current),
        0,
        Math.cos(cameraYaw.current),
      );

      const right = new THREE.Vector3(
        Math.cos(cameraYaw.current),
        0,
        -Math.sin(cameraYaw.current),
      );

      direction
        .add(forward.clone().multiplyScalar(move.y))
        .add(right.clone().multiplyScalar(-move.x));

      const moving = direction.length() > 0.05;

      if (moving) {
        direction.normalize();

        playerVelocity.current.x = direction.x * MOVE_SPEED;
        playerVelocity.current.z = direction.z * MOVE_SPEED;

        targetRotation.current = Math.atan2(direction.x, direction.z);

        if (animation !== "Walking") {
          setAnimation("Walking");
        }
      } else {
        playerVelocity.current.x = 0;
        playerVelocity.current.z = 0;

        if (animation !== "Idle") {
          setAnimation("Idle");
        }
      }

      updatePlayer(delta);

      characterGroup.current.getWorldPosition(playerWorldPosition.current);

      if (!initialPlayerPosition.current) {
        initialPlayerPosition.current = playerWorldPosition.current.clone();
      }

      const distanceFromStart = playerWorldPosition.current.distanceTo(
        initialPlayerPosition.current,
      );

      if (
        distanceFromStart > 0.5 &&
        !hasTriggeredWelcome.current &&
        onPlayerMovedEnough
      ) {
        hasTriggeredWelcome.current = true;
        onPlayerMovedEnough();
      }

      const distance = 10.2;
      const height = 8.2;

      cameraWorldPosition.current.set(
        playerWorldPosition.current.x - Math.sin(cameraYaw.current) * distance,
        playerWorldPosition.current.y + height,
        playerWorldPosition.current.z - Math.cos(cameraYaw.current) * distance,
      );

      cameraWorldTarget.current.set(
        playerWorldPosition.current.x,
        playerWorldPosition.current.y + 8.4,
        playerWorldPosition.current.z,
      );

      state.camera.position.copy(cameraWorldPosition.current);
      state.camera.lookAt(cameraWorldTarget.current);
    }

    const elapsed = state.clock.getElapsedTime();

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

        // Clockwise slow rotation.
        // text.rotation.z -= delta * 0.25;
      }
    });

    const pulse = (Math.sin(elapsed * 4.5) + 1) / 2;

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

    const setMeshColor = (mesh, color, intensity = 1) => {
      if (!mesh || !mesh.material || !mesh.material.color) return;

      mesh.material.color.lerp(new THREE.Color(color), intensity);
    };

    const resetMeshColor = (mesh, key, intensity = 0.08) => {
      const original = samplePrepOriginalMaterials.current[key];

      if (!mesh || !mesh.material || !mesh.material.color || !original) return;

      mesh.material.color.lerp(original, intensity);
    };

    // Reset interactive colors slowly
    resetMeshColor(bottomSlideRef.current, "bottomSlide");
    resetMeshColor(sampleBottleRef.current, "sampleBottle");
    resetMeshColor(stainBottleRef.current, "stainBottle");
    resetMeshColor(dropRef.current, "drop");
    resetMeshColor(topSlideRef.current, "topSlide");

    // 1. Bottom slide blinks before task starts
    if (samplePrepStep === "idle") {
      setMeshColor(
        bottomSlideRef.current,
        pulse > 0.5 ? 0x66ffff : 0xffffff,
        0.15,
      );
    }

    // 2. Sample bottle glows after slide is clicked
    if (samplePrepStep === "focused") {
      setMeshColor(
        sampleBottleRef.current,
        pulse > 0.5 ? 0x66ffff : 0xffffff,
        0.18,
      );
    }

    // 3. Stain bottle glows after sample is added
    if (samplePrepStep === "sampleAdded") {
      setMeshColor(
        stainBottleRef.current,
        pulse > 0.5 ? 0x66ffff : 0xffffff,
        0.18,
      );
    }

    // 4. Stain changes drop/slide color
    if (["stained", "covered", "ready"].includes(samplePrepStep)) {
      setMeshColor(dropRef.current, 0xd58cff, 0.08);
      setMeshColor(bottomSlideRef.current, 0xd8b4fe, 0.05);
    }

    // 5. Slide ready becomes stronger cyan glow
    if (samplePrepStep === "ready") {
      setMeshColor(
        bottomSlideRef.current,
        pulse > 0.4 ? 0x7fffff : 0xffffff,
        0.2,
      );

      setMeshColor(topSlideRef.current, pulse > 0.4 ? 0x7fffff : 0xffffff, 0.2);
    }

    // 6. Drop appears with scale animation
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
  });

  return (
    <group {...props} dispose={null} ref={group}>
      <group
        name="Armature"
        position={[18.077, 0.251, 0]}
        ref={characterGroup}
        scale={1.7}
      >
        <primitive object={nodes.Hips} />

        <skinnedMesh
          name="Wolf3D_Body"
          geometry={nodes.Wolf3D_Body.geometry}
          material={nodes.Wolf3D_Body.material}
          skeleton={nodes.Wolf3D_Body.skeleton}
        />

        <skinnedMesh
          name="Wolf3D_Hair"
          geometry={nodes.Wolf3D_Hair.geometry}
          material={nodes.Wolf3D_Hair.material}
          skeleton={nodes.Wolf3D_Hair.skeleton}
        />

        <skinnedMesh
          name="Wolf3D_Outfit_Bottom"
          geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
          material={nodes.Wolf3D_Outfit_Bottom.material}
          skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
        />

        <skinnedMesh
          name="Wolf3D_Outfit_Footwear"
          geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
          material={nodes.Wolf3D_Outfit_Footwear.material}
          skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
        />

        <skinnedMesh
          name="Wolf3D_Outfit_Top"
          geometry={nodes.Wolf3D_Outfit_Top.geometry}
          material={nodes.Wolf3D_Outfit_Top.material}
          skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
        />

        <skinnedMesh
          name="Wolf3D_Head"
          geometry={nodes.Wolf3D_Head.geometry}
          material={nodes.Wolf3D_Head.material}
          skeleton={nodes.Wolf3D_Head.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
        />
      </group>

      <mesh
        ref={dropRef}
        name="Drop"
        geometry={nodes.Drop.geometry}
        material={nodes.Drop.material}
        position={[26.998, 2.212, 3.251]}
        visible={isDropVisible}
      />

      <mesh
        name="ComputerScreen"
        geometry={nodes.ComputerScreen.geometry}
        material={nodes.ComputerScreen.material}
        position={[28.996, 3.433, 16.041]}
        rotation={[-Math.PI, 0.14, -Math.PI]}
      />

      <group position={[17.388, 4.74, 24.954]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          ref={aiScreenRef}
          name="AIScreen"
          geometry={nodes.AIScreen.geometry}
          material={nodes.AIScreen.material}
          onClick={handleAIScreenClick}
          onPointerOver={
            aiStep !== "idle" && !aiCompleted ? handlePointerCursor : undefined
          }
          onPointerOut={
            aiStep !== "idle" && !aiCompleted
              ? handlePointerOutCursor
              : undefined
          }
        />

        <mesh
          ref={aiScreenGlowRef}
          name="AIScreenGlow"
          geometry={nodes.AIScreen.geometry}
          material={aiScreenGlowMat}
          position={[0, 0, 0.01]}
          visible={false}
          renderOrder={30}
        />
      </group>

      <mesh
        name="LeftScreen"
        geometry={nodes.LeftScreen.geometry}
        material={nodes.LeftScreen.material}
        position={[7.898, 3.51, 16.624]}
        rotation={[Math.PI / 2, 0, -2.322]}
      />

      <mesh
        ref={(el) => (bubbleRefs.current[0] = el)}
        name="glowbubble_samplprep"
        geometry={nodes.glowbubble.geometry}
        material={bubbleMat}
        position={[20.471, 2.223, 1.494]}
        onClick={(event) => handleBubbleClick(event, "samplePrep")}
        onPointerOver={(event) => handleBubblePointerOver(event, 0)}
        onPointerOut={(event) => handleBubblePointerOut(event, 0)}
      />

      <mesh
        ref={(el) => (bubbleRefs.current[1] = el)}
        name="glowbubble_microscope"
        geometry={nodes.glowbubble001.geometry}
        material={bubbleMat}
        position={[23.528, 2.223, 9.683]}
        onClick={(event) => handleBubbleClick(event, "microscope")}
        onPointerOver={(event) => handleBubblePointerOver(event, 1)}
        onPointerOut={(event) => handleBubblePointerOut(event, 1)}
      />

      <mesh
        ref={(el) => (bubbleRefs.current[2] = el)}
        name="glowbubble_ai"
        geometry={nodes.glowbubble002.geometry}
        material={bubbleMat}
        position={[21.781, 2.223, 19.401]}
        onClick={(event) => handleBubbleClick(event, "ai")}
        onPointerOver={(event) => handleBubblePointerOver(event, 2)}
        onPointerOut={(event) => handleBubblePointerOut(event, 2)}
      />

      <mesh
        ref={(el) => (bubbleRefs.current[3] = el)}
        name="glowbubble_3d"
        geometry={nodes.glowbubble003.geometry}
        material={bubbleMat}
        position={[10.404, 2.223, 19.07]}
        onClick={(event) => handleBubbleClick(event, "threeD")}
        onPointerOver={(event) => handleBubblePointerOver(event, 3)}
        onPointerOut={(event) => handleBubblePointerOut(event, 3)}
      />

      <mesh
        ref={(el) => (bubbleRefs.current[4] = el)}
        name="glowbubble_learnpanel"
        geometry={nodes.glowbubble004.geometry}
        material={bubbleMat}
        position={[7.167, 2.223, 6.578]}
        onClick={(event) => handleBubbleClick(event, "learningPanel")}
        onPointerOver={(event) => handleBubblePointerOver(event, 4)}
        onPointerOut={(event) => handleBubblePointerOut(event, 4)}
      />

      <mesh
        name="glowstick"
        geometry={nodes.glowstick.geometry}
        material={nodes.glowstick.material}
        position={[20.523, 0.065, 1.494]}
      />

      <mesh
        name="glowstick001"
        geometry={nodes.glowstick001.geometry}
        material={nodes.glowstick001.material}
        position={[23.58, 0.065, 9.683]}
      />

      <mesh
        name="glowstick002"
        geometry={nodes.glowstick002.geometry}
        material={nodes.glowstick002.material}
        position={[21.833, 0.065, 19.401]}
      />

      <mesh
        name="glowstick003"
        geometry={nodes.glowstick003.geometry}
        material={nodes.glowstick003.material}
        position={[10.456, 0.065, 19.07]}
      />

      <mesh
        name="glowstick004"
        geometry={nodes.glowstick004.geometry}
        material={nodes.glowstick004.material}
        position={[7.219, 0.065, 6.578]}
      />

      <mesh
        ref={(el) => (glowTextRefs.current[0] = el)}
        name="glowtext"
        geometry={nodes.glowtext.geometry}
        material={nodes.glowtext.material}
        position={[20.83, 2.23, 1.494]}
        rotation={[Math.PI / 2, 0, 0]}
      />

      <mesh
        ref={(el) => (glowTextRefs.current[1] = el)}
        name="glowtext001"
        geometry={nodes.glowtext001.geometry}
        material={nodes.glowtext001.material}
        position={[23.887, 2.23, 9.683]}
        rotation={[Math.PI / 2, 0, 0]}
      />

      <mesh
        ref={(el) => (glowTextRefs.current[2] = el)}
        name="glowtext002"
        geometry={nodes.glowtext002.geometry}
        material={nodes.glowtext002.material}
        position={[22.14, 2.23, 19.401]}
        rotation={[Math.PI / 2, 0, 0]}
      />

      <mesh
        ref={(el) => (glowTextRefs.current[3] = el)}
        name="glowtext003"
        geometry={nodes.glowtext003.geometry}
        material={nodes.glowtext003.material}
        position={[10.763, 2.23, 19.07]}
        rotation={[Math.PI / 2, 0, 0]}
      />

      <mesh
        ref={(el) => (glowTextRefs.current[4] = el)}
        name="glowtext004"
        geometry={nodes.glowtext004.geometry}
        material={nodes.glowtext004.material}
        position={[7.526, 2.23, 6.578]}
        rotation={[Math.PI / 2, 0, 0]}
      />

      <mesh
        name="LearningScreen"
        geometry={nodes.LearningScreen.geometry}
        material={nodes.LearningScreen.material}
        position={[10.172, 3.462, 0.114]}
        rotation={[Math.PI / 2, 0, 0]}
      />

      <mesh
        name="Beaker_glass2"
        geometry={nodes.Beaker_glass2.geometry}
        material={nodes.Beaker_glass2.material}
        position={[28.644, 2.459, 4.191]}
        rotation={[0, -1.571, 0]}
      />

      <mesh
        name="divider_glass"
        geometry={nodes.divider_glass.geometry}
        material={nodes.divider_glass.material}
        position={[26.059, 0.186, 8.39]}
      />

      <mesh
        name="Conical_flask_glass1"
        geometry={nodes.Conical_flask_glass1.geometry}
        material={nodes.Conical_flask_glass1.material}
        position={[26.811, 0.519, 3.47]}
        rotation={[Math.PI / 2, 0, -0.706]}
      />

      <mesh
        name="bottle_glass1"
        geometry={nodes.bottle_glass1.geometry}
        material={nodes.bottle_glass1.material}
        position={[28.082, 0.66, 15.942]}
        rotation={[-3.13, 0.283, -3.138]}
      />

      <mesh
        name="bottle_glass2"
        geometry={nodes.bottle_glass2.geometry}
        material={nodes.bottle_glass2.material}
        position={[28.082, 0.66, 16.361]}
        rotation={[-3.13, 0.283, -3.138]}
      />

      <mesh
        name="bottle_glass3"
        geometry={nodes.bottle_glass3.geometry}
        material={nodes.bottle_glass3.material}
        position={[28.082, 0.66, 16.774]}
        rotation={[-3.13, 0.283, -3.138]}
      />

      <mesh
        name="bottle_glass4"
        geometry={nodes.bottle_glass4.geometry}
        material={nodes.bottle_glass4.material}
        position={[28.082, 0.66, 17.192]}
        rotation={[-3.13, 0.283, -3.138]}
      />

      <mesh
        name="smallBeaker_glass"
        geometry={nodes.smallBeaker_glass.geometry}
        material={nodes.smallBeaker_glass.material}
        position={[20.332, 2.481, 24.656]}
        rotation={[Math.PI / 2, 0, -3.09]}
      />

      <mesh
        name="Beaker_glass1"
        geometry={nodes.Beaker_glass1.geometry}
        material={nodes.Beaker_glass1.material}
        position={[20.788, 2.596, 24.659]}
        rotation={[Math.PI / 2, 0, -3.09]}
      />

      <mesh
        name="holder_glass"
        geometry={nodes.holder_glass.geometry}
        material={nodes.holder_glass.material}
        position={[29.743, 2.486, 5.307]}
        rotation={[0, 0, -Math.PI / 2]}
      />

      <mesh
        name="microscopeslide_glass"
        geometry={nodes.microscopeslide.geometry}
        material={nodes.microscopeslide.material}
        position={[28.099, 2.152, 14.324]}
        rotation={[0, -1.52, 0]}
      />

      <mesh
        name="RightScreen"
        geometry={nodes.RightScreen.geometry}
        material={nodes.RightScreen.material}
        position={[7.832, 3.51, 9.921]}
        rotation={[Math.PI / 2, 0, -0.898]}
      />

      <mesh
        ref={sampleBottleRef}
        name="SampleBottle_four"
        geometry={nodes.SampleBottle_four.geometry}
        material={nodes.SampleBottle_four.material}
        position={[25.105, 2.575, 0.464]}
        rotation={[1.571, 0, 0.22]}
        onClick={handleSampleBottleClick}
        onPointerOver={
          samplePrepStep === "focused" ? handlePointerCursor : undefined
        }
        onPointerOut={
          samplePrepStep === "focused" ? handlePointerOutCursor : undefined
        }
      />

      <mesh
        ref={stainBottleRef}
        name="StainBottle_four"
        geometry={nodes.StainBottle_four.geometry}
        material={nodes.StainBottle_four.material}
        position={[27.93, 2.156, 3.381]}
        rotation={[Math.PI, -0.843, Math.PI]}
        onClick={handleStainBottleClick}
        onPointerOver={
          samplePrepStep === "sampleAdded" ? handlePointerCursor : undefined
        }
        onPointerOut={
          samplePrepStep === "sampleAdded" ? handlePointerOutCursor : undefined
        }
      />

      <mesh
        ref={topSlideRef}
        name="TopSlide_four"
        geometry={nodes.TopSlide_four.geometry}
        material={nodes.TopSlide_four.material}
        position={[27.014, 2.213, 3.271]}
        rotation={[0, -0.836, 0]}
        visible={isTopSlideVisible}
      />

      <mesh
        ref={bottomSlideRef}
        name="BottomSlide_four"
        geometry={nodes.BottomSlide_four.geometry}
        material={nodes.BottomSlide_four.material}
        position={[27.014, 2.191, 3.271]}
        rotation={[0, -0.836, 0]}
        onClick={handleBottomSlideClick}
        onPointerOver={
          samplePrepStep === "idle" ? handlePointerCursor : undefined
        }
        onPointerOut={
          samplePrepStep === "idle" ? handlePointerOutCursor : undefined
        }
      />
      <mesh
        ref={bottomSlideGlowRef}
        name="BottomSlideGlow"
        geometry={nodes.BottomSlide_four.geometry}
        material={bottomSlideGlowMat}
        position={[27.014, 2.198, 3.271]}
        rotation={[0, -0.836, 0]}
        visible={
          !samplePrepCompleted && (samplePrepStep === "idle" || isSlideReady)
        }
        renderOrder={20}
      />

      <mesh
        ref={microscopeRef}
        name="Microscope_four"
        geometry={nodes.Microscope_four.geometry}
        material={nodes.Microscope_four.material}
        position={[28.494, 2.912, 13]}
        rotation={[0, -1.571, 0]}
        onClick={handleMicroscopeClick}
        onPointerOver={
          samplePrepCompleted && !microscopeCompleted
            ? handlePointerCursor
            : undefined
        }
        onPointerOut={
          samplePrepCompleted && !microscopeCompleted
            ? handlePointerOutCursor
            : undefined
        }
      />

      <mesh
        ref={microscopeGlowRef}
        name="MicroscopeGlow"
        geometry={nodes.Microscope_four.geometry}
        material={microscopeGlowMat}
        position={[28.494, 2.912, 13]}
        rotation={[0, -1.571, 0]}
        visible={samplePrepCompleted && !microscopeCompleted}
        renderOrder={25}
      />

      <mesh
        name="3DPlatform_one"
        geometry={nodes["3DPlatform_one"].geometry}
        material={nodes["3DPlatform_one"].material}
        position={[8.227, 0.126, 13.522]}
      />

      {showMappedModel && mappedParasiteComponent && (
        <group
          position={[8.227, 2.15, 11.722]}
          scale={0.9}
          rotation={[0, Math.PI * 0.15, 0]}
        >
          {mappedParasiteComponent}
        </group>
      )}

      <mesh
        name="PushPlane_four"
        geometry={nodes.PushPlane_four.geometry}
        material={nodes.PushPlane_four.material}
        position={[10.663, 1.906, 3.168]}
      />

      <mesh
        name="door1_one"
        geometry={nodes.door1_one.geometry}
        material={nodes.door1_one.material}
        position={[18.142, 1.676, -3.894]}
      />

      <mesh
        name="door2_one"
        geometry={nodes.door2_one.geometry}
        material={nodes.door2_one.material}
        position={[18.142, 1.676, -3.894]}
      />

      <mesh
        name="one"
        geometry={nodes.one.geometry}
        material={nodes.one.material}
        position={[17.5, 0.065, 14.286]}
      />

      <mesh
        name="two"
        geometry={nodes.two.geometry}
        material={nodes.two.material}
        position={[29.045, 1.125, 23.635]}
      />

      <mesh
        name="three"
        geometry={nodes.three.geometry}
        material={nodes.three.material}
        position={[29.022, 3.396, 16.043]}
        rotation={[-Math.PI, 0.14, -Math.PI]}
      />

      <mesh
        name="four"
        geometry={nodes.four.geometry}
        material={nodes.four.material}
        position={[26.451, 0.657, 3.303]}
        rotation={[0, 0.706, 0]}
      />

      <mesh
        ref={collider}
        name="collider"
        geometry={nodes.collider.geometry}
        material={nodes.collider.material}
        position={[9.768, 1.465, 6.671]}
      />
    </group>
  );
}

useGLTF.preload("/models/labV8-v1.glb");

useTexture.preload(
  [
    "TexturePackOne.webp",
    "TexturePackTwo.webp",
    "TexturePackThree.webp",
    "TexturePackFour.webp",
  ],
  { path: "/textures/" },
);
