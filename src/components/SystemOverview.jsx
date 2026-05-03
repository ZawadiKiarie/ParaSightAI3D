import { motion } from "motion/react";
import { Brain, Microscope, BookOpen, FlaskConical } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Detection Engine",
    description:
      "Advanced machine learning algorithms identify parasites from microscopy images with clinical-grade accuracy.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Microscope,
    title: "3D Visualization System",
    description:
      "Interactive 3D models reveal morphological details, life cycles, and anatomical structures in immersive detail.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: BookOpen,
    title: "Guided Diagnostic Learning",
    description:
      "Step-by-step educational pathways guide learners through identification techniques and clinical significance.",
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: FlaskConical,
    title: "Laboratory Simulation",
    description:
      "Practice real-world diagnostic workflows in a safe, virtual environment with instant feedback and validation.",
    color: "from-violet-500 to-purple-500",
  },
];

export function SystemOverview() {
  return (
    <section id="features" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            System Overview
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Four integrated modules working together to revolutionize parasite
            diagnostics education
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl hover:bg-white/10 transition-all duration-300">
                {/* Icon */}
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4 shadow-lg group-hover:shadow-2xl transition-shadow`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-white/60 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover glow */}
                <div
                  className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity -z-10`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
