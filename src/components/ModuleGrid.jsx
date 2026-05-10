import { Brain, Box, Microscope, FileText, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ModuleCard({ title, description, icon, gradient, path }) {
  const navigate = useNavigate();
  return (
    <div className="group relative">
      {/* Glow effect */}
      <div
        className={`absolute inset-0 rounded-2xl ${gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}
      />

      {/* Card */}
      <div className="relative backdrop-blur-md bg-white/40 border border-white/50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        {/* Icon */}
        <div
          className={`w-16 h-16 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 shadow-lg`}
        >
          {icon}
        </div>

        {/* Content */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          {description}
        </p>

        {/* Button */}
        <button
          onClick={() => {
            if (path) navigate(path);
          }}
          disabled={!path}
          className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r ${gradient} text-white font-medium shadow-md transition-all duration-300 ${
            path
              ? "hover:shadow-lg hover:scale-[1.02] cursor-pointer"
              : "opacity-60 cursor-not-allowed"
          }`}
        >
          {path ? "Open" : "Coming Soon"}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export function ModuleGrid() {
  const modules = [
    {
      title: "AI Detection",
      description:
        "Upload microscopy images and run AI-based parasite detection",
      icon: <Brain className="w-8 h-8 text-white" />,
      gradient: "from-blue-500 to-cyan-500",
      path: "/detection",
    },
    {
      title: "3D Visualization",
      description: "Explore parasite structures and diagnostic features in 3D",
      icon: <Box className="w-8 h-8 text-white" />,
      gradient: "from-purple-500 to-pink-500",
      path: null,
    },
    {
      title: "Lab Simulation",
      description:
        "Experience simulated diagnostic workflows in a lab-like environment",
      icon: <Microscope className="w-8 h-8 text-white" />,
      gradient: "from-indigo-500 to-blue-500",
      path: "/labsimulation",
    },
    {
      title: "Reports",
      description: "View and manage past analysis results and reports",
      icon: <FileText className="w-8 h-8 text-white" />,
      gradient: "from-violet-500 to-purple-500",
      path: "/reports",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {modules.map((module, index) => (
        <ModuleCard
          key={index}
          title={module.title}
          description={module.description}
          icon={module.icon}
          gradient={module.gradient}
          path={module.path}
        />
      ))}
    </div>
  );
}
