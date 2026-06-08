/**
 * ReportDetails.jsx
 *
 * Displays the full details of a selected AI detection report.
 * It fetches one report from the backend using the report ID in the URL
 * and the saved authentication token.
 *
 * The page shows the detected parasite, confidence score, microscopy image,
 * sample details, status history, editable clinical notes, confirmation action,
 * and PDF export option.
 */

import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  User,
  FileText,
  Download,
  CheckCircle,
  Clock,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";

const API_BASE_URL =
  import.meta.env.VITE_BACKEND_API_URL || "http://localhost:3000";

export default function ReportDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const [notes, setNotes] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchReport = async () => {
    try {
      setIsLoading(true);
      setErrorMsg("");

      const response = await fetch(`${API_BASE_URL}/reports/${id}`, {
        headers: {
          Authorization: window.sessionStorage.getItem("token"),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch report");
      }

      setReport(data);
      setNotes(data.notes || "");
    } catch (error) {
      setErrorMsg(error.message || "Could not load report");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [id]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-700 border-green-200";
      case "Not Confirmed":
        return "bg-red-100 text-red-700 border-red-200";
      case "Pending Review":
        return "bg-amber-100 text-amber-700 border-amber-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleExport = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/reports/${id}/export`, {
        headers: {
          Authorization: window.sessionStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to export PDF");
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = `${id}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      alert(error.message || "Could not export PDF");
    }
  };

  const handleSaveNotes = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/reports/${id}/notes`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: window.sessionStorage.getItem("token"),
        },
        body: JSON.stringify({ notes }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save notes");
      }

      setReport(data);
      setNotes(data.notes || "");
      setIsEditing(false);
    } catch (error) {
      alert(error.message || "Could not save notes");
    }
  };

  const handleConfirmResult = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/reports/${id}/confirm`, {
        method: "PATCH",
        headers: {
          Authorization: window.sessionStorage.getItem("token"),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to confirm report");
      }

      setReport(data);
    } catch (error) {
      alert(error.message || "Could not confirm report");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center gap-3 text-gray-500">
        <Loader2 className="size-5 animate-spin" />
        Loading report...
      </div>
    );
  }

  if (errorMsg || !report) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-gray-900 mb-4">
            {errorMsg || "Report not found"}
          </h2>

          <Link
            to="/reports"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Reports
          </Link>
        </div>
      </div>
    );
  }

  const fullImageUrl = `${API_BASE_URL}${report.imageUrl}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <button
            onClick={() => navigate("/reports")}
            className="inline-flex items-center px-3 py-1.5 mb-4 rounded-md hover:bg-gray-100 text-gray-700 transition-colors"
          >
            <ArrowLeft className="mr-2 size-4" />
            Back to Reports
          </button>

          <h1 className="text-3xl text-gray-900">Report Details</h1>
          <p className="text-gray-500 mt-1">{report.id}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl text-gray-900 mb-2">
                      {report.parasiteName}
                    </h2>

                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs border ${getStatusColor(report.status)}`}
                    >
                      {report.status}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">
                      Confidence Score
                    </span>

                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {report.confidence}%
                    </span>
                  </div>

                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                      style={{ width: `${report.confidence}%` }}
                    />
                  </div>
                </div>

                <div className="border-t border-gray-200 my-6" />

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="size-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Detection Date</p>
                      <p className="text-gray-900">{formatDate(report.date)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <User className="size-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Detected By</p>
                      <p className="text-gray-900">{report.user}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <FileText className="size-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Sample ID</p>
                      <p className="text-gray-900">{report.sampleId}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="size-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Processing Time</p>
                      <p className="text-gray-900">{report.processingTime}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6">
                <h3 className="text-lg text-gray-900 mb-4">
                  Detection Details
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Detection Method
                    </span>
                    <span className="text-sm text-gray-900">
                      YOLOv8 Object Detection
                    </span>
                  </div>

                  <div className="border-t border-gray-200" />

                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Image Resolution
                    </span>
                    <span className="text-sm text-gray-900">
                      {report.imageResolution}
                    </span>
                  </div>

                  <div className="border-t border-gray-200" />

                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Life Stage</span>
                    <span className="text-sm text-gray-900">
                      {report.stage || "N/A"}
                    </span>
                  </div>

                  <div className="border-t border-gray-200" />

                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Report ID</span>
                    <span className="text-sm font-mono text-gray-900">
                      {report.id}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg text-gray-900">
                    Clinical Notes & Observations
                  </h3>

                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-3 py-1.5 text-sm border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Edit
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <div className="space-y-3">
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />

                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveNotes}
                        className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Save Notes
                      </button>

                      <button
                        onClick={() => {
                          setIsEditing(false);
                          setNotes(report.notes || "");
                        }}
                        className="px-3 py-1.5 text-sm border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-700 leading-relaxed">{notes}</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <ImageIcon className="size-5 text-gray-400" />
                  <h3 className="text-lg text-gray-900">Microscopy Image</h3>
                </div>

                <div className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={fullImageUrl}
                    alt={report.parasiteName}
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="text-sm text-gray-500 mt-3">
                  Resolution: {report.imageResolution}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6">
                <h3 className="text-lg text-gray-900 mb-4">Actions</h3>

                <div className="space-y-3">
                  {report.status === "Pending Review" && (
                    <button
                      onClick={handleConfirmResult}
                      className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <CheckCircle className="mr-2 size-4" />
                      Confirm Result
                    </button>
                  )}

                  <button
                    onClick={handleExport}
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <Download className="mr-2 size-4" />
                    Export Report (PDF)
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6">
                <h3 className="text-lg text-gray-900 mb-4">Status History</h3>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="size-2 rounded-full bg-blue-500" />
                      <div className="w-px h-full bg-gray-200 mt-2" />
                    </div>

                    <div className="pb-4">
                      <p className="text-sm text-gray-900">Sample Processed</p>
                      <p className="text-xs text-gray-500">
                        {formatDate(report.date)} - Automated
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="size-2 rounded-full bg-purple-500" />
                      <div className="w-px h-full bg-gray-200 mt-2" />
                    </div>

                    <div className="pb-4">
                      <p className="text-sm text-gray-900">
                        {report.parasiteName} Detected
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(report.date)} - AI Detection
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={`size-2 rounded-full ${
                          report.status === "Confirmed"
                            ? "bg-green-500"
                            : report.status === "Not Confirmed"
                              ? "bg-red-500"
                              : "bg-amber-500"
                        }`}
                      />
                    </div>

                    <div>
                      <p className="text-sm text-gray-900">{report.status}</p>
                      <p className="text-xs text-gray-500">
                        {formatDate(report.date)} - {report.user}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
