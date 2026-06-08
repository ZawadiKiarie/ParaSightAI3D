/**
 * DetectionResults.jsx
 *
 * Displays the AI detection results after an image is analyzed.
 * It receives the uploaded image, detection response, and report data through
 * React Router state from the detection upload page.
 *
 * The component draws bounding boxes on a canvas over the microscopy image,
 * shows detection confidence and parasite details, and provides actions to
 * view the result in 3D, run another detection, or open the saved report.
 */

import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Box, RotateCcw, AlertCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function DetectionResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const report = location.state?.report;

  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const uploadedImage = location.state?.image;
  const detectionResponse = location.state?.detectionResponse;

  const detectionResults = detectionResponse?.results?.detections || [];
  const topDetection = detectionResponse?.results?.topDetection || null;

  useEffect(() => {
    if (!uploadedImage || !detectionResponse) {
      navigate("/detection");
    }
  }, [uploadedImage, detectionResponse, navigate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const image = imageRef.current;

    if (!canvas || !image || !image.complete) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    detectionResults.forEach((result, index) => {
      const bbox = result.bboxNormalized;

      const x = bbox.x * canvas.width;
      const y = bbox.y * canvas.height;
      const width = bbox.width * canvas.width;
      const height = bbox.height * canvas.height;

      const colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b"];
      const color = colors[index % colors.length];

      ctx.strokeStyle = color;
      ctx.lineWidth = Math.max(3, canvas.width * 0.004);
      ctx.strokeRect(x, y, width, height);

      const label = `${result.name} ${result.confidence}%`;

      ctx.font = `${Math.max(14, canvas.width * 0.025)}px sans-serif`;
      const labelWidth = ctx.measureText(label).width + 14;
      const labelHeight = Math.max(28, canvas.height * 0.045);

      ctx.fillStyle = color;
      ctx.fillRect(x, Math.max(0, y - labelHeight), labelWidth, labelHeight);

      ctx.fillStyle = "#ffffff";
      ctx.fillText(label, x + 7, Math.max(18, y - 8));
    });
  }, [uploadedImage, detectionResults, imageDimensions]);

  const handleImageLoad = () => {
    if (imageRef.current) {
      setImageDimensions({
        width: imageRef.current.naturalWidth,
        height: imageRef.current.naturalHeight,
      });
    }
  };

  if (!uploadedImage || !detectionResponse) {
    return null;
  }

  const averageConfidence = detectionResults.length
    ? detectionResults.reduce((acc, curr) => acc + curr.confidence, 0) /
      detectionResults.length
    : 0;

  const handleViewIn3D = () => {
    if (!topDetection) return;

    navigate("/3dview", {
      state: {
        image: uploadedImage,
        aiResult: {
          parasiteName: topDetection.name,
          parasiteId: topDetection.parasiteId,
          stage: topDetection.stage,
          confidence: topDetection.confidence,
          microscopeImage: uploadedImage,
          description: `AI detected ${topDetection.name} with ${topDetection.confidence}% confidence.`,
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100">
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

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

              <div className="mt-4 flex flex-wrap gap-3">
                {detectionResults.map((result, index) => {
                  const colors = [
                    "bg-blue-500",
                    "bg-purple-500",
                    "bg-pink-500",
                    "bg-amber-500",
                  ];

                  return (
                    <div
                      key={result.id}
                      className="flex items-center gap-2 px-3 py-1 bg-white/60 rounded-full text-sm"
                    >
                      <div
                        className={`w-3 h-3 rounded-full ${
                          colors[index % colors.length]
                        }`}
                      />

                      <span className="text-gray-700">
                        {result.name} — {result.confidence}%
                      </span>
                    </div>
                  );
                })}
              </div>

              {!detectionResults.length && (
                <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                  No parasite was detected above the confidence threshold.
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
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

                {topDetection && (
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-sm text-gray-600 mb-1">
                      Primary Result
                    </div>

                    <div className="text-lg text-green-700">
                      {topDetection.name}
                    </div>

                    <div className="text-sm text-green-700/80">
                      {topDetection.confidence}% confidence
                    </div>
                  </div>
                )}
              </div>
            </div>

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
                                : index === 2
                                  ? "bg-pink-500"
                                  : "bg-amber-500"
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
                                : index === 2
                                  ? "bg-pink-500"
                                  : "bg-amber-500"
                          }`}
                          style={{ width: `${result.confidence}%` }}
                        />
                      </div>

                      <span className="text-sm text-gray-700">
                        {result.confidence}%
                      </span>
                    </div>

                    <div className="text-xs text-gray-500">
                      Suggested stage: {result.stage}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-6 shadow-lg space-y-3">
              <button
                onClick={handleViewIn3D}
                disabled={!topDetection}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${
                  topDetection
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
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

              {report && (
                <button
                  onClick={() => navigate(`/reports/${report.id}`)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/80 text-gray-700 rounded-lg border border-gray-300 hover:bg-white transition-colors"
                >
                  View Saved Report
                </button>
              )}
            </div>

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
