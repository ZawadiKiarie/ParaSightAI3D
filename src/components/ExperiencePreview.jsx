import { motion } from "motion/react";
import {
  ArrowRight,
  Image as ImageIcon,
  Cpu,
  Box,
  GraduationCap,
} from "lucide-react";

const flowSteps = [
  {
    icon: ImageIcon,
    label: "Microscopy Image",
    description: "Upload sample",
    color: "from-blue-400 to-blue-600",
  },
  {
    icon: Cpu,
    label: "AI Analysis",
    description: "Detection & classification",
    color: "from-purple-400 to-purple-600",
  },
  {
    icon: Box,
    label: "3D Visualization",
    description: "Interactive model",
    color: "from-pink-400 to-pink-600",
  },
  {
    icon: GraduationCap,
    label: "Learning Module",
    description: "Diagnostic training",
    color: "from-indigo-400 to-indigo-600",
  },
];

export function ExperiencePreview() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 space-y-4"
        >
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Experience Preview
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            A seamless journey from image capture to diagnostic mastery
          </p>
        </motion.div>

        {/* Flow Diagram */}
        <div className="relative">
          {/* Connection lines */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent hidden lg:block" />

          <div className="grid lg:grid-cols-4 gap-8 lg:gap-4">
            {flowSteps.map((step, index) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative flex flex-col items-center"
              >
                {/* Step card */}
                <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl hover:bg-white/10 transition-all duration-300 hover:scale-105 w-full">
                  {/* Step number */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-bold shadow-lg">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${step.color} mb-6 shadow-lg mx-auto`}
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold mb-2 text-center text-white">
                    {step.label}
                  </h3>
                  <p className="text-sm text-white/60 text-center">
                    {step.description}
                  </p>
                </div>

                {/* Arrow connector (desktop only) */}
                {index < flowSteps.length - 1 && (
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                    className="hidden lg:block absolute top-1/2 -right-6 -translate-y-1/2"
                  >
                    <ArrowRight className="w-8 h-8 text-white/30" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Visual representation below */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 relative"
        >
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12 shadow-2xl">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="h-32 rounded-xl bg-gradient-to-br from-blue-500/20 to-transparent border border-white/10" />
                <div className="h-20 rounded-xl bg-gradient-to-br from-blue-400/10 to-transparent border border-white/10" />
              </div>
              <div className="space-y-4">
                <div className="h-20 rounded-xl bg-gradient-to-br from-purple-500/20 to-transparent border border-white/10" />
                <div className="h-32 rounded-xl bg-gradient-to-br from-purple-400/10 to-transparent border border-white/10" />
              </div>
              <div className="space-y-4">
                <div className="h-24 rounded-xl bg-gradient-to-br from-pink-500/20 to-transparent border border-white/10" />
                <div className="h-28 rounded-xl bg-gradient-to-br from-pink-400/10 to-transparent border border-white/10" />
              </div>
            </div>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
}
