import { Clock } from "lucide-react";

export function RecentActivity() {
  const activities = [
    {
      title: "Malaria detection analysis",
      timestamp: "2 hours ago",
      status: "completed",
    },
    {
      title: "Blood smear imaging",
      timestamp: "5 hours ago",
      status: "completed",
    },
    {
      title: "Toxoplasma 3D visualization",
      timestamp: "Yesterday",
      status: "completed",
    },
    {
      title: "Lab workflow simulation",
      timestamp: "2 days ago",
      status: "completed",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "processing":
        return "bg-blue-500";
      case "pending":
        return "bg-gray-400";
    }
  };

  return (
    <div className="backdrop-blur-md bg-white/40 border border-white/50 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="w-5 h-5 text-purple-600" />
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-start gap-3 pb-4 last:pb-0 border-b border-white/30 last:border-0"
          >
            <div
              className={`w-2 h-2 rounded-full ${getStatusColor(activity.status)} mt-2`}
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {activity.title}
              </p>
              <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
