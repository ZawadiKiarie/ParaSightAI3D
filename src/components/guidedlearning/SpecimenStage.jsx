import { useRef, useEffect, useState, useMemo } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import {
  parasiteAtom,
  stageAtom,
  viewAtom,
  hoveredMarkerAtom,
  focusedFeatureIndexAtom,
} from "../../store/Store";
import { PARASITE_DATA } from "../ParasiteConfig";
import { Center, Float } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";
import { DiagnosticMarker } from "./DiagnosticMarker";

export const SpecimenStage = () => {
  const id = useAtomValue(parasiteAtom);
  const stage = useAtomValue(stageAtom);
  const view = useAtomValue(viewAtom);
  const focusedFeatureIndex = useAtomValue(focusedFeatureIndexAtom);

  const setHoveredMarker = useSetAtom(hoveredMarkerAtom);

  const outerGroupRef = useRef();
  const modelPivotRef = useRef();
  const focusTargetRef = useRef(new THREE.Vector3(0, 0, 0));

  const config = PARASITE_DATA[id][stage];
  const markers = config.markers ?? [];

  const { gl } = useThree();

  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({
    lastX: 0,
    lastY: 0,
  });

  const focusMarker = useMemo(() => {
    if (view !== "FOCUS") return null;
    if (!markers.length) return null;
    return markers[focusedFeatureIndex] ?? markers[0];
  }, [view, markers, focusedFeatureIndex]);

  useEffect(() => {
    setHoveredMarker(null);
  }, [id, stage, view, setHoveredMarker]);

  useEffect(() => {
    if (!outerGroupRef.current || !modelPivotRef.current) return;

    const isHome = view === "HOME";
    const isFocus = view === "FOCUS";
    const isIsolated = view === "ISOLATED";
    const isMobile = window.innerWidth <= 1024;

    let targetScale = config.listScale ?? 1.9;
    let targetX = 0;

    if (isHome) {
      targetScale = 2.0;
      targetX = 1;
    } else if (isFocus) {
      targetScale = config.focusScale ?? 2.55;
      targetX = 0;
    } else if (isIsolated) {
      targetScale = isMobile
        ? (config.isolatedScale ?? 2.7) * 0.9
        : (config.isolatedScale ?? 2.95);
      targetX = isMobile ? 0.45 : 2.25;
    }

    gsap.killTweensOf(outerGroupRef.current.position);
    gsap.killTweensOf(outerGroupRef.current.scale);

    gsap.to(outerGroupRef.current.position, {
      x: targetX,
      y: 0,
      z: 0,
      duration: 1.1,
      ease: "power3.inOut",
    });

    gsap.to(outerGroupRef.current.scale, {
      x: targetScale,
      y: targetScale,
      z: targetScale,
      duration: 1.1,
      ease: "power3.inOut",
    });

    if (view !== "FOCUS") {
      gsap.to(modelPivotRef.current.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.8,
        ease: "power3.inOut",
      });
    }
  }, [id, stage, view, config]);

  useEffect(() => {
    const dom = gl.domElement;

    const onPointerDown = (e) => {
      if (view !== "LIST") return;
      setIsDragging(true);
      dragState.current.lastX = e.clientX;
      dragState.current.lastY = e.clientY;
    };

    const onPointerMove = (e) => {
      if (!isDragging || !modelPivotRef.current || view !== "LIST") return;

      const deltaX = e.clientX - dragState.current.lastX;
      const deltaY = e.clientY - dragState.current.lastY;

      modelPivotRef.current.rotation.y += deltaX * 0.01;
      modelPivotRef.current.rotation.x += deltaY * 0.005;

      modelPivotRef.current.rotation.x = THREE.MathUtils.clamp(
        modelPivotRef.current.rotation.x,
        -0.8,
        0.8,
      );

      dragState.current.lastX = e.clientX;
      dragState.current.lastY = e.clientY;
    };

    const onPointerUp = () => {
      setIsDragging(false);
    };

    const onWheel = (e) => {
      if (!outerGroupRef.current || view !== "LIST") return;

      e.preventDefault();

      const currentScale = outerGroupRef.current.scale.x;
      const nextScale = THREE.MathUtils.clamp(
        currentScale - e.deltaY * 0.0015,
        1.0,
        2.8,
      );

      outerGroupRef.current.scale.setScalar(nextScale);
    };

    dom.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    dom.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      dom.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      dom.removeEventListener("wheel", onWheel);
    };
  }, [gl, isDragging, view]);

  useFrame((_, delta) => {
    if (!modelPivotRef.current) return;

    const ease = 1 - Math.exp(-5 * delta);

    if (view === "FOCUS" && focusMarker) {
      const [mx, my, mz = 0] = focusMarker.position;
      const [offX, offY, offZ = 0] = config.focusFrameOffset ?? [0, 0, 0];

      focusTargetRef.current.set(
        -mx * 1.25 + offX,
        -my * 1.25 + offY,
        -mz * 0.25 + offZ,
      );

      modelPivotRef.current.position.lerp(focusTargetRef.current, ease);

      modelPivotRef.current.rotation.x = THREE.MathUtils.lerp(
        modelPivotRef.current.rotation.x,
        0,
        ease,
      );

      modelPivotRef.current.rotation.y = THREE.MathUtils.lerp(
        modelPivotRef.current.rotation.y,
        0,
        ease,
      );
    } else if (view === "ISOLATED") {
      const [offX, offY, offZ = 0] = config.isolatedFrameOffset ?? [0, 0, 0];

      focusTargetRef.current.set(offX, offY, offZ);
      modelPivotRef.current.position.lerp(focusTargetRef.current, ease);
    } else {
      focusTargetRef.current.set(0, 0, 0);
      modelPivotRef.current.position.lerp(focusTargetRef.current, ease);
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={view === "HOME" ? 1.2 : 0}
      floatIntensity={view === "HOME" ? 1.5 : 0.3}
    >
      <group ref={outerGroupRef}>
        <group ref={modelPivotRef}>
          <Center key={`${id}-${stage}-${view}`}>
            <group scale={config.scale ?? 1}>
              {config.Component}

              {(view === "LIST" || view === "FOCUS") &&
                config.markers?.map((marker, index) => (
                  <DiagnosticMarker
                    key={marker.id}
                    markerId={marker.id}
                    markerIndex={index}
                    position={marker.position}
                    label={marker.label}
                    onClick={() => {
                      console.log("clicked marker:", marker.label);
                    }}
                  />
                ))}
            </group>
          </Center>
        </group>
      </group>
    </Float>
  );
};
