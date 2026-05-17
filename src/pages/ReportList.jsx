import { Link, useNavigate } from "react-router-dom";
import { Search, Filter, ChevronRight, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const API_BASE_URL =
  import.meta.env.VITE_BACKEND_API_URL || "http://localhost:3000";

const getAuthHeader = () => {
  const token = window.sessionStorage.getItem("token");

  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
};

export default function ReportsList() {
  const [reports, setReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      const token = window.sessionStorage.getItem("token");

      if (!token) {
        setReports([]);
        setIsLoading(false);
        navigate("/auth");
        return;
      }

      try {
        setIsLoading(true);
        setErrorMsg("");
        setReports([]);

        const response = await fetch(`${API_BASE_URL}/reports`, {
          headers: getAuthHeader(),
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || data.message || "Failed to fetch reports",
          );
        }

        setReports(Array.isArray(data) ? data : []);
      } catch (error) {
        setReports([]);
        setErrorMsg(error.message || "Could not load reports");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, [navigate]);

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const query = searchQuery.toLowerCase();

      const matchesSearch =
        report.parasiteName?.toLowerCase().includes(query) ||
        report.id?.toLowerCase().includes(query) ||
        report.user?.toLowerCase().includes(query) ||
        report.sampleId?.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "all" || report.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [reports, searchQuery, statusFilter]);

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
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <button
              onClick={() => navigate("/dashboard")}
              className="hover:text-blue-600 transition-colors"
            >
              Dashboard
            </button>
            <ChevronRight className="size-4" />
            <span className="text-gray-900">Reports</span>
          </div>

          <h1 className="text-3xl text-gray-900">Reports</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />

              <input
                type="text"
                placeholder="Search by parasite, report ID, sample ID, or user..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="size-4 text-gray-500" />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-[180px] px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="all">All Status</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Not Confirmed">Not Confirmed</option>
                <option value="Pending Review">Pending Review</option>
              </select>
            </div>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {errorMsg}
          </div>
        )}

        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-medium">{filteredReports.length}</span> of{" "}
            <span className="font-medium">{reports.length}</span> reports
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {isLoading ? (
            <div className="p-12 flex items-center justify-center gap-3 text-gray-500">
              <Loader2 className="size-5 animate-spin" />
              Loading reports...
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs text-gray-500">
                    Report ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500">
                    Parasite Detected
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500">
                    Confidence
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs text-gray-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-blue-600 text-sm">
                      {report.id}
                    </td>

                    <td className="px-6 py-4 text-gray-700 text-sm">
                      {formatDate(report.date)}
                    </td>

                    <td className="px-6 py-4 text-sm">
                      <span className="font-medium text-gray-900">
                        {report.parasiteName}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                            style={{ width: `${report.confidence}%` }}
                          />
                        </div>

                        <span className="text-sm font-medium text-gray-700">
                          {report.confidence}%
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs border ${getStatusColor(report.status)}`}
                      >
                        {report.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right text-sm">
                      <Link
                        to={`/reports/${report.id}`}
                        className="inline-flex items-center px-3 py-1.5 rounded-md hover:bg-gray-100 text-gray-700 transition-colors"
                      >
                        View Details
                        <ChevronRight className="ml-1 size-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {!isLoading && filteredReports.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center mt-6">
            <p className="text-gray-500">No reports found for this user yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
