// src/components/lab/ui/MicroscopeOverlay.jsx

/**
 * Full microscope-view overlay.
 *
 * Shows a circular microscope viewport and controls for:
 * - focus
 * - zoom
 * - brightness
 * - scan
 * - capture image
 * - send image to AI
 */
export function MicroscopeOverlay({
  focus,
  setFocus,
  zoom,
  setZoom,
  brightness,
  setBrightness,
  microscopeStep,
  microscopeImage,
  onScan,
  onCapture,
  onSendToAI,
}) {
  const isSharp = focus >= 70;
  const hasDetected =
    microscopeStep === "detected" || microscopeStep === "captured";
  const hasCaptured = microscopeStep === "captured";

  const blurAmount = Math.max(0, 10 - focus / 10);
  const scaleAmount = 1 + zoom / 120;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm px-4 py-4">
      <div className="w-[90vw] max-w-6xl max-h-[92vh] overflow-hidden bg-black/80 border border-white/10 shadow-2xl text-white">
        <div className="max-h-[92vh] overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-5 md:p-6 border-r border-white/10 flex flex-col items-center justify-center">
              <p className="text-cyan-200/70 text-xs tracking-[0.35em] uppercase mb-4">
                Microscope View
              </p>

              <div className="relative w-[min(360px,62vw,58vh)] h-[min(360px,62vw,58vh)] rounded-full overflow-hidden border-[8px] border-black bg-slate-950 shadow-[0_0_60px_rgba(103,232,249,0.25)]">
                <div
                  className="absolute inset-0 rounded-full overflow-hidden"
                  style={{
                    filter: `blur(${blurAmount}px) brightness(${brightness}%)`,
                    transform: `scale(${scaleAmount})`,
                    transition: "filter 0.2s ease, transform 0.2s ease",
                  }}
                >
                  <img
                    src={microscopeImage}
                    alt="Captured microscope sample"
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </div>

                <div
                  className="absolute left-[46%] top-[46%] w-20 h-14 rounded-[50%] border border-emerald-900/30 bg-emerald-300/25"
                  style={{
                    filter: `blur(${Math.max(0, blurAmount * 0.45)}px)`,
                    transform: `scale(${scaleAmount}) rotate(-18deg)`,
                    opacity: isSharp ? 0.85 : 0.45,
                  }}
                />

                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,transparent_58%,rgba(0,0,0,0.9)_100%)]" />

                {microscopeStep === "scanning" && (
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <div className="absolute left-0 right-0 h-1 bg-cyan-200/80 shadow-[0_0_22px_rgba(103,232,249,0.9)] animate-[scanLine_1.4s_ease-in-out_infinite]" />
                  </div>
                )}

                {hasDetected && (
                  <div className="absolute left-[43%] top-[43%] w-24 h-20 rounded-full border-2 border-yellow-300/90 shadow-[0_0_28px_rgba(253,224,71,0.75)] animate-pulse" />
                )}

                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10" />
                <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10" />
              </div>

              <p className="mt-4 text-white/45 text-sm text-center max-w-md">
                Adjust focus until the organism becomes clear, then scan the
                slide.
              </p>
            </div>

            <div className="p-5 md:p-6">
              <p className="text-cyan-200/70 text-xs tracking-[0.35em] uppercase mb-2">
                Station 02
              </p>

              <h2 className="text-2xl md:text-3xl font-light tracking-[0.14em] uppercase mb-3">
                Microscope Station
              </h2>

              <p className="text-white/60 text-sm leading-relaxed mb-5">
                Observe the prepared slide, adjust the microscope view, scan for
                suspicious organisms, then capture the image for AI analysis.
              </p>

              <div className="space-y-4">
                <label className="block">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/70">Focus</span>
                    <span
                      className={isSharp ? "text-cyan-200" : "text-yellow-200"}
                    >
                      {isSharp ? "Sharp" : "Blurry"}
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={focus}
                    onChange={(e) => setFocus(Number(e.target.value))}
                    className="w-full"
                  />
                </label>

                <label className="block">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/70">Zoom</span>
                    <span className="text-white/50">{zoom}%</span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full"
                  />
                </label>

                <label className="block">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/70">Brightness</span>
                    <span className="text-white/50">{brightness}%</span>
                  </div>

                  <input
                    type="range"
                    min="60"
                    max="150"
                    value={brightness}
                    onChange={(e) => setBrightness(Number(e.target.value))}
                    className="w-full"
                  />
                </label>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  onClick={onScan}
                  disabled={!isSharp || microscopeStep === "scanning"}
                  className={`w-full px-5 py-3 border transition ${
                    !isSharp || microscopeStep === "scanning"
                      ? "border-white/10 text-white/30 cursor-not-allowed"
                      : "border-cyan-200/40 text-cyan-100 hover:bg-cyan-200 hover:text-black"
                  }`}
                >
                  {microscopeStep === "scanning"
                    ? "Scanning Slide..."
                    : "Scan Slide"}
                </button>

                <button
                  onClick={onCapture}
                  disabled={!hasDetected || hasCaptured}
                  className={`w-full px-5 py-3 border transition ${
                    !hasDetected || hasCaptured
                      ? "border-white/10 text-white/30 cursor-not-allowed"
                      : "border-yellow-200/50 text-yellow-100 hover:bg-yellow-200 hover:text-black"
                  }`}
                >
                  Capture Image
                </button>
              </div>

              <div className="mt-5 border border-white/10 bg-white/5 p-4 min-h-20">
                {microscopeStep === "viewing" && (
                  <p className="text-white/60 text-sm">
                    Adjust the focus until the image becomes sharp, then scan
                    the slide.
                  </p>
                )}

                {microscopeStep === "scanning" && (
                  <p className="text-cyan-100 text-sm">
                    Scanning slide... searching for suspicious organisms.
                  </p>
                )}

                {microscopeStep === "detected" && (
                  <p className="text-yellow-100 text-sm">
                    Suspicious organism detected. Capture image for analysis.
                  </p>
                )}

                {hasCaptured && (
                  <div>
                    <p className="text-cyan-100 text-sm mb-4">
                      Image captured. Send image to AI analysis.
                    </p>

                    <div className="flex items-center gap-4">
                      <img
                        src={microscopeImage}
                        alt="Captured sample thumbnail"
                        className="w-24 h-16 rounded border border-cyan-200/30 object-cover"
                      />

                      <button
                        onClick={onSendToAI}
                        className="flex-1 px-5 py-3 border border-white/30 text-white hover:bg-white hover:text-black transition"
                      >
                        Send to AI Analysis
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes scanLine {
            0% { transform: translateY(20px); opacity: 0; }
            15% { opacity: 1; }
            50% { transform: translateY(330px); opacity: 1; }
            100% { transform: translateY(20px); opacity: 0; }
          }
        `}
      </style>
    </div>
  );
}
