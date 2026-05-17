import { Clock, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

export function RecentActivity() {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecent = async () => {
      const token = window.sessionStorage.getItem("token");

      if (!token) {
        setActivities([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setActivities([]);

        const response = await fetch(`${API_BASE_URL}/reports/recent?limit=4`, {
          headers: getAuthHeader(),
          cache: "no-store",
        });

        const data = await response.json();

        if (response.ok) {
          setActivities(Array.isArray(data) ? data : []);
        } else {
          setActivities([]);
        }
      } catch (error) {
        console.error("Failed to fetch recent activity:", error);
        setActivities([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecent();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
      case "completed":
        return "bg-green-500";
      case "Pending Review":
      case "processing":
        return "bg-blue-500";
      default:
        return "bg-gray-400";
    }
  };

  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const diffMs = Date.now() - date.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes} min ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays === 1) return "Yesterday";

    return `${diffDays} days ago`;
  };

  return (
    <div className="backdrop-blur-md bg-white/40 border border-white/50 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="w-5 h-5 text-purple-600" />
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
      </div>

      {isLoading ? (
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Loader2 className="size-4 animate-spin" />
          Loading recent detections...
        </div>
      ) : activities.length ? (
        <div className="space-y-4">
          {activities.map((activity) => (
            <button
              key={activity.id}
              onClick={() => navigate(`/reports/${activity.id}`)}
              className="w-full text-left flex items-start gap-3 pb-4 last:pb-0 border-b border-white/30 last:border-0 hover:opacity-80 transition"
            >
              <div
                className={`w-2 h-2 rounded-full ${getStatusColor(
                  activity.status,
                )} mt-2`}
              />

              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {activity.parasiteName} detection analysis
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  {getRelativeTime(activity.date)} • {activity.confidence}%
                  confidence
                </p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">
          No recent detections yet. Run an AI detection to create your first
          report.
        </p>
      )}
    </div>
  );
}
