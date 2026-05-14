// src/components/threeDView/canvas/FeatureLabel.jsx

import { Html } from "@react-three/drei";
import { FEATURE_LABEL_DEFAULT_OFFSET } from "../config/threeDViewConstants";

/**
 * FeatureLabel displays a floating HTML label beside a selected 3D feature.
 *
 * The label position is calculated using:
 * - marker.position: where the feature is in 3D space
 * - marker.labelOffset: optional custom offset from ParasiteConfig
 *
 * This is useful when related structures appear together,
 * e.g. nucleus, karyosome, and chromatin.
 */
export function FeatureLabel({ marker }) {
  if (!marker) return null;

  const [x, y, z = 0] = marker.position;

  const [offsetX, offsetY, offsetZ] =
    marker.labelOffset ?? FEATURE_LABEL_DEFAULT_OFFSET;

  return (
    <Html
      position={[x + offsetX, y + offsetY, z + offsetZ]}
      center
      distanceFactor={6}
      zIndexRange={[999, 0]}
      style={{
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      <div className="whitespace-nowrap rounded-full border border-yellow-300/70 bg-black/90 px-3 py-1.5 text-xs font-semibold text-yellow-100 shadow-[0_0_24px_rgba(250,204,21,0.55)] backdrop-blur-md">
        {marker.label}
      </div>
    </Html>
  );
}
