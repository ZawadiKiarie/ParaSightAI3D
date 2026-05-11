import { Html } from "@react-three/drei";
import { useAtomValue, useSetAtom } from "jotai";
import {
  hoveredMarkerAtom,
  focusedMarkerIdAtom,
  focusedFeatureIndexAtom,
  viewAtom,
  infoSectionAtom,
} from "../store/Store";

export const DiagnosticMarker = ({
  position,
  label,
  markerId,
  markerIndex,
  onClick,
}) => {
  const view = useAtomValue(viewAtom);
  const focusedMarkerId = useAtomValue(focusedMarkerIdAtom);

  const setHoveredMarker = useSetAtom(hoveredMarkerAtom);
  const setFocusedMarkerId = useSetAtom(focusedMarkerIdAtom);
  const setFocusedFeatureIndex = useSetAtom(focusedFeatureIndexAtom);
  const setView = useSetAtom(viewAtom);
  const setInfoSection = useSetAtom(infoSectionAtom);

  const isFocused = view === "FOCUS" && focusedMarkerId === markerId;

  const handleClick = () => {
    if (isFocused) {
      setInfoSection("overview");
      setView("ISOLATED");
      if (onClick) onClick();
      return;
    }

    setFocusedMarkerId(markerId);
    setFocusedFeatureIndex(markerIndex);
    setView("FOCUS");
    if (onClick) onClick();
  };

  return (
    <group position={position}>
      <Html
        center
        distanceFactor={8}
        style={{
          pointerEvents: "auto",
          userSelect: "none",
        }}
      >
        <button
          type="button"
          className={`diagnostic-marker ${isFocused ? "is-focused" : ""}`}
          onMouseEnter={() => setHoveredMarker(markerId)}
          onMouseLeave={() => setHoveredMarker(null)}
          onClick={handleClick}
          aria-label={label}
        >
          <span className="marker-circle-shell">
            <span className="marker-ring ring-outer" />
            <span className="marker-ring ring-inner" />
            <span className="marker-core" />
            <span className="marker-ripple" />
          </span>

          {isFocused && (
            <span className="focused-marker-pill">
              <span className="focused-marker-label">{label}</span>
              <span className="focused-marker-arrow">›</span>
            </span>
          )}
        </button>
      </Html>
    </group>
  );
};
