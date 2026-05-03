import { motion } from "motion/react";
import { ArrowRight, Play } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";
import { useNavigate } from "react-router-dom";

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20 overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          <div className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <span className="text-sm text-blue-200">
              AI-Powered Diagnostics
            </span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              AI-Powered Parasite Detection
            </span>
          </h1>

          <p className="text-xl text-white/70 leading-relaxed max-w-xl">
            From microscopy images to interactive diagnostic understanding.
            Accelerate laboratory learning with intelligent 3D visualization and
            AI-driven insights.
          </p>

          <div className="flex flex-wrap gap-4">
            <motion.button
              onClick={() => navigate("/auth")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-2xl shadow-purple-500/50 flex items-center gap-2 hover:shadow-purple-500/70 transition-shadow cursor-pointer"
            >
              Enter Platform
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold flex items-center gap-2 hover:bg-white/20 transition-colors"
            >
              <Play className="w-5 h-5" />
              Learn More
            </motion.button>
          </div>
        </motion.div>

        {/* Right Visual - Abstract Neural Network */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          {/* Glassmorphic container */}
          <div className="relative rounded-3xl overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 p-8 shadow-2xl">
            {/* Abstract visual */}
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1761740533449-b8d4385e60b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMG5ldXJhbCUyMG5ldHdvcmslMjB2aXN1YWxpemF0aW9ufGVufDF8fHx8MTc3NTU5NTA4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Neural network visualization"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/40 via-purple-600/20 to-transparent" />
            </div>

            {/* Floating elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-12 right-12 w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-400/30 to-purple-600/30 backdrop-blur-sm border border-white/20 shadow-xl"
            />
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute bottom-12 left-12 w-16 h-16 rounded-xl bg-gradient-to-br from-purple-400/30 to-pink-600/30 backdrop-blur-sm border border-white/20 shadow-xl"
            />
          </div>

          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
