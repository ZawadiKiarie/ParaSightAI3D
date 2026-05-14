// src/components/threeDView/ui/MicroscopicImageCard.jsx

/**
 * Shows the microscopy image associated with the AI result.
 *
 * For now, this can use a default test image.
 * Later, this image can come directly from the uploaded/captured image.
 */
export function MicroscopicImageCard({ image, parasiteName, lifeStage }) {
  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-2xl">
      <h3 className="text-lg font-semibold text-slate-200 mb-4">
        Microscopic Image
      </h3>

      <div className="relative aspect-square rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-white/20 overflow-hidden">
        <img
          src={image}
          alt={`Microscopic view of ${parasiteName}`}
          className="w-full h-full object-cover"
          draggable={false}
        />

        <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-green-500/90 backdrop-blur-sm border border-green-400/50 text-xs font-semibold text-white shadow-lg">
          Detected
        </div>

        <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-white/20 text-xs text-white">
          {lifeStage}
        </div>
      </div>
    </div>
  );
}
