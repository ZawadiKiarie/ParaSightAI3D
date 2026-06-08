/**
 * DetectionWorkspace.jsx
 *
 * AI detection upload page.
 * It allows users to upload or drag-and-drop a microscopy image,
 * preview the selected image, remove it, and send it to the backend
 * detection endpoint.
 *
 * The image is sent as FormData to the /upload route with the saved
 * authentication token. After detection, the user is redirected to the
 * results page with the uploaded image, AI response, and saved report data.
 */

import { useState, useRef } from "react";
import { Upload, Camera, FileCheck, Info, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL =
  import.meta.env.VITE_BACKEND_API_URL || "http://localhost:3000";

export function DetectionWorkspace() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileUpload = (file) => {
    setErrorMsg("");

    if (!file || !file.type.startsWith("image/")) {
      setErrorMsg("Please upload a valid image file.");
      return;
    }

    setUploadedFile(file);

    const reader = new FileReader();

    reader.onload = (e) => {
      setUploadedImage(e.target?.result);
    };

    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];

    if (file) handleFileUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];

    if (file) handleFileUpload(file);
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setUploadedFile(null);
    setErrorMsg("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRunDetection = async () => {
    if (!uploadedFile || !uploadedImage) return;

    try {
      setIsDetecting(true);
      setErrorMsg("");

      const formData = new FormData();
      formData.append("image", uploadedFile);

      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        headers: {
          Authorization: window.sessionStorage.getItem("token"),
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Detection failed.");
      }

      navigate("/detection/results", {
        state: {
          image: uploadedImage,
          fileName: uploadedFile.name,
          detectionResponse: data,
          report: data.report,
        },
      });
    } catch (error) {
      setErrorMsg(error.message || "Could not run detection.");
    } finally {
      setIsDetecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100">
      <div className="border-b border-white/40 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <button
              onClick={() => navigate("/dashboard")}
              className="hover:text-blue-600 transition-colors"
            >
              Dashboard
            </button>
            <span>/</span>
            <span className="text-gray-900">AI Detection</span>
          </div>

          <h1 className="text-3xl text-gray-900">AI Detection</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {errorMsg && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMsg}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="glass-panel rounded-2xl p-8 shadow-lg">
              <label className="block mb-4 text-gray-900">
                Upload Microscopy Image
              </label>

              <div
                className={`border-2 border-dashed rounded-xl transition-all ${
                  isDragging
                    ? "border-blue-500 bg-blue-50/50"
                    : "border-gray-300 bg-white/50"
                } ${uploadedImage ? "min-h-[400px]" : "min-h-[500px]"}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                {!uploadedImage ? (
                  <div className="flex flex-col items-center justify-center h-full min-h-[500px] px-6">
                    <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                      <Upload className="w-10 h-10 text-blue-600" />
                    </div>

                    <h3 className="mb-2 text-gray-900">
                      Drag and drop your image here
                    </h3>

                    <p className="text-sm text-gray-500 mb-6">
                      or click the button below to browse
                    </p>

                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                    >
                      Select Image
                    </button>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileInputChange}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="p-4">
                    <div className="relative rounded-lg overflow-hidden bg-gray-900">
                      <img
                        src={uploadedImage}
                        alt="Uploaded microscopy"
                        className="w-full h-auto"
                      />
                    </div>

                    <div className="flex items-center gap-3 mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                      <FileCheck className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-green-800">
                        Image uploaded successfully
                      </span>
                    </div>

                    <button
                      onClick={handleRemoveImage}
                      disabled={isDetecting}
                      className="mt-4 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-white/80 transition-colors disabled:opacity-60"
                    >
                      Remove Image
                    </button>
                  </div>
                )}
              </div>

              {/* <div className="mt-6 p-4 bg-gray-50/50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  <Camera className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-900">
                      Camera Capture Available
                    </p>
                    <p className="text-xs text-gray-500">
                      Connect a microscopy camera for direct capture
                    </p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="glass-panel rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-blue-600" />
                <h3 className="text-gray-900">Instructions</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm mb-2 text-gray-900">
                    Supported Formats
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• JPEG (.jpg, .jpeg)</li>
                    <li>• PNG (.png)</li>
                    <li>• TIFF (.tif, .tiff)</li>
                    <li>• BMP (.bmp)</li>
                  </ul>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm mb-2 text-gray-900">
                    Image Quality Tips
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Use a clear microscope image</li>
                    <li>• Ensure proper focus and lighting</li>
                    <li>• Avoid motion blur</li>
                    <li>• Center suspected parasite structures</li>
                  </ul>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-900">
                      <strong>AI Analysis:</strong> The system will detect
                      possible intestinal parasites and return class, confidence
                      score, and bounding box location.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleRunDetection}
            disabled={!uploadedImage || isDetecting}
            className={`px-12 py-4 rounded-xl shadow-lg transition-all flex items-center gap-3 ${
              uploadedImage && !isDetecting
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl hover:scale-105"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isDetecting && <Loader2 className="w-5 h-5 animate-spin" />}
            {isDetecting ? "Running Detection..." : "Run Detection"}
          </button>
        </div>
      </div>
    </div>
  );
}
