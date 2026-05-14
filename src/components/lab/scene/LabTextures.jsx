// src/components/lab/scene/LabTextures.jsx

import { useMemo } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { LAB_TEXTURES } from "../config/labConstants";

/**
 * Loads and configures all textures used by the lab scene.
 *
 * Keeping texture setup here prevents LabModel.jsx from becoming too crowded.
 */
export function useLabTextures() {
  const bakedTextures = useTexture({
    TexturePackOne: LAB_TEXTURES.baked.texturePackOne,
    TexturePackTwo: LAB_TEXTURES.baked.texturePackTwo,
    TexturePackThree: LAB_TEXTURES.baked.texturePackThree,
    TexturePackFour: LAB_TEXTURES.baked.texturePackFour,
  });

  const aiScreenTextures = useTexture({
    idle: LAB_TEXTURES.aiScreen.idle,
    received: LAB_TEXTURES.aiScreen.received,
  });

  const chamberScreenTextures = useTexture({
    leftIdle: LAB_TEXTURES.chamberScreens.leftIdle,
    leftActive: LAB_TEXTURES.chamberScreens.leftActive,
    rightIdle: LAB_TEXTURES.chamberScreens.rightIdle,
    rightActive: LAB_TEXTURES.chamberScreens.rightActive,
  });

  const learningScreenTexture = useTexture(LAB_TEXTURES.learningScreen);

  const microscopeComputerTexture = useTexture(
    LAB_TEXTURES.microscopeComputerScreen,
  );

  useMemo(() => {
    Object.values(bakedTextures).forEach((texture) => {
      if (!texture) return;

      // GLTF baked textures normally need flipY false.
      texture.flipY = false;
      texture.colorSpace = THREE.SRGBColorSpace;
    });
  }, [bakedTextures]);

  useMemo(() => {
    Object.values(aiScreenTextures).forEach((texture) => {
      if (!texture) return;

      texture.flipY = false;
      texture.colorSpace = THREE.SRGBColorSpace;

      // The AI screen image was sideways on the GLTF UVs,
      // so we rotate it around the image center.
      texture.center.set(0.5, 0.5);
      texture.rotation = Math.PI / 2;
    });
  }, [aiScreenTextures]);

  useMemo(() => {
    Object.values(chamberScreenTextures).forEach((texture) => {
      if (!texture) return;

      // These are placed on normal planeGeometry displays.
      texture.flipY = true;
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
    });
  }, [chamberScreenTextures]);

  useMemo(() => {
    if (!learningScreenTexture) return;

    learningScreenTexture.flipY = true;
    learningScreenTexture.colorSpace = THREE.SRGBColorSpace;
    learningScreenTexture.wrapS = THREE.ClampToEdgeWrapping;
    learningScreenTexture.wrapT = THREE.ClampToEdgeWrapping;
  }, [learningScreenTexture]);

  useMemo(() => {
    if (!microscopeComputerTexture) return;

    microscopeComputerTexture.flipY = true;
    microscopeComputerTexture.colorSpace = THREE.SRGBColorSpace;
    microscopeComputerTexture.wrapS = THREE.ClampToEdgeWrapping;
    microscopeComputerTexture.wrapT = THREE.ClampToEdgeWrapping;
  }, [microscopeComputerTexture]);

  return {
    bakedTextures,
    aiScreenTextures,
    chamberScreenTextures,
    learningScreenTexture,
    microscopeComputerTexture,
  };
}

/**
 * Optional preload helper.
 * Call this once near the bottom of LabModel.jsx.
 */
export function preloadLabTextures() {
  useTexture.preload(
    [
      "TexturePackOne.webp",
      "TexturePackTwo.webp",
      "TexturePackThree.webp",
      "TexturePackFour.webp",
    ],
    { path: "/textures/" },
  );

  useTexture.preload(LAB_TEXTURES.aiScreen.idle);
  useTexture.preload(LAB_TEXTURES.aiScreen.received);

  useTexture.preload(LAB_TEXTURES.chamberScreens.leftIdle);
  useTexture.preload(LAB_TEXTURES.chamberScreens.leftActive);
  useTexture.preload(LAB_TEXTURES.chamberScreens.rightIdle);
  useTexture.preload(LAB_TEXTURES.chamberScreens.rightActive);

  useTexture.preload(LAB_TEXTURES.learningScreen);
  useTexture.preload(LAB_TEXTURES.microscopeComputerScreen);
}
