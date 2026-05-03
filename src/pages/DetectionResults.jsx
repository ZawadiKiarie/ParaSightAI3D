import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Box, RotateCcw, AlertCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function DetectionResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  // Mock detection results
  const detectionResults = [
    {
      id: 1,
      name: "Plasmodium falciparum (Trophozoite)",
      confidence: 94.2,
      bbox: { x: 0.25, y: 0.3, width: 0.15, height: 0.15 },
    },
    {
      id: 2,
      name: "Plasmodium vivax (Ring form)",
      confidence: 87.6,
      bbox: { x: 0.55, y: 0.45, width: 0.12, height: 0.12 },
    },
    {
      id: 3,
      name: "Plasmodium falciparum (Gametocyte)",
      confidence: 91.8,
      bbox: { x: 0.65, y: 0.25, width: 0.14, height: 0.18 },
    },
  ];

  const uploadedImage = location.state?.image;

  useEffect(() => {
    if (!uploadedImage) {
      navigate("/detection");
    }
  }, [uploadedImage, navigate]);

  // Draw bounding boxes on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const image = imageRef.current;

    if (canvas && image && image.complete) {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Set canvas size to match image
      canvas.width = image.width;
      canvas.height = image.height;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw bounding boxes
      detectionResults.forEach((result, index) => {
        const x = result.bbox.x * canvas.width;
        const y = result.bbox.y * canvas.height;
        const width = result.bbox.width * canvas.width;
        const height = result.bbox.height * canvas.height;

        // Box color based on index
        const colors = ["#3b82f6", "#8b5cf6", "#ec4899"];
        const color = colors[index % colors.length];

        // Draw rectangle
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.strokeRect(x, y, width, height);

        // Draw label background
        ctx.fillStyle = color;
        ctx.fillRect(x, y - 28, width, 28);

        // Draw label text
        ctx.fillStyle = "#ffffff";
        ctx.font = "14px sans-serif";
        ctx.fillText(`${result.confidence}%`, x + 5, y - 8);
      });
    }
  }, [uploadedImage, imageDimensions]);

  const handleImageLoad = () => {
    if (imageRef.current) {
      setImageDimensions({
        width: imageRef.current.width,
        height: imageRef.current.height,
      });
    }
  };

  if (!uploadedImage) {
    return null;
  }

  const averageConfidence =
    detectionResults.reduce((acc, curr) => acc + curr.confidence, 0) /
    detectionResults.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100">
      {/* Top Bar */}
      <div className="border-b border-white/40 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate("/detection")}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Upload
          </button>
          <h1 className="text-3xl text-gray-900">Detection Results</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side - Image with Detections */}
          <div className="lg:col-span-2">
            <div className="glass-panel rounded-2xl p-6 shadow-lg">
              <h3 className="mb-4 text-gray-900">Analyzed Image</h3>
              <div className="relative rounded-lg overflow-hidden bg-gray-900">
                <img
                  ref={imageRef}
                  src={uploadedImage}
                  alt="Analyzed microscopy"
                  className="w-full h-auto"
                  onLoad={handleImageLoad}
                />
                <canvas
                  ref={canvasRef}
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                />
              </div>

              {/* Legend */}
              <div className="mt-4 flex flex-wrap gap-3">
                {detectionResults.map((result, index) => {
                  const colors = [
                    "bg-blue-500",
                    "bg-purple-500",
                    "bg-pink-500",
                  ];
                  return (
                    <div
                      key={result.id}
                      className="flex items-center gap-2 px-3 py-1 bg-white/60 rounded-full text-sm"
                    >
                      <div
                        className={`w-3 h-3 rounded-full ${colors[index % colors.length]}`}
                      />
                      <span className="text-gray-700">
                        Detection {index + 1}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Side - Results Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Summary Card */}
            <div className="glass-panel rounded-2xl p-6 shadow-lg">
              <h3 className="mb-4 text-gray-900">Detection Summary</h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-sm text-gray-600 mb-1">
                    Objects Detected
                  </div>
                  <div className="text-3xl text-blue-600">
                    {detectionResults.length}
                  </div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="text-sm text-gray-600 mb-1">
                    Average Confidence
                  </div>
                  <div className="text-3xl text-purple-600">
                    {averageConfidence.toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>

            {/* Detected Objects */}
            <div className="glass-panel rounded-2xl p-6 shadow-lg">
              <h3 className="mb-4 text-gray-900">Detected Parasites</h3>
              <div className="space-y-3">
                {detectionResults.map((result, index) => (
                  <div
                    key={result.id}
                    className="p-4 bg-white/60 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            index === 0
                              ? "bg-blue-500"
                              : index === 1
                                ? "bg-purple-500"
                                : "bg-pink-500"
                          }`}
                        />
                        <span className="text-sm text-gray-900">
                          {result.name}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full ${
                            index === 0
                              ? "bg-blue-500"
                              : index === 1
                                ? "bg-purple-500"
                                : "bg-pink-500"
                          }`}
                          style={{ width: `${result.confidence}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-700">
                        {result.confidence}%
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Confidence Score
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="glass-panel rounded-2xl p-6 shadow-lg space-y-3">
              <button
                onClick={() =>
                  navigate("/3dview", { state: { image: uploadedImage } })
                }
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                <Box className="w-5 h-5" />
                View in 3D
              </button>
              <button
                onClick={() => navigate("/detection")}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/80 text-gray-700 rounded-lg border border-gray-300 hover:bg-white transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                Run Again
              </button>
            </div>

            {/* Interpretation Note */}
            <div className="glass-panel rounded-2xl p-4 shadow-lg">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm text-gray-900 mb-1">Clinical Note</h4>
                  <p className="text-xs text-gray-600">
                    AI detection results should be reviewed by qualified
                    laboratory personnel before clinical interpretation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
