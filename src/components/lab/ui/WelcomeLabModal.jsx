// src/components/lab/ui/WelcomeLabModal.jsx

import { X } from "lucide-react";

/**
 * First welcome modal shown after the player walks slightly into the lab.
 */
export function WelcomeLabModal({ onClose }) {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
      <div className="relative w-[78vw] max-w-4xl min-h-[300px] bg-black/70 border border-white/10 backdrop-blur-sm shadow-2xl pointer-events-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white/70 hover:text-white transition"
          aria-label="Close welcome modal"
        >
          <X size={22} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] h-full">
          <div className="hidden md:flex items-center justify-center p-8">
            <div className="w-full h-44 bg-white/8 border border-white/10 flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-cyan-300/20 border border-cyan-200/40 shadow-[0_0_35px_rgba(103,232,249,0.35)]" />
                <p className="text-white/50 text-sm tracking-[0.25em] uppercase">
                  ParaSightAI Lab
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-10 flex flex-col justify-center">
            <p className="text-cyan-200/80 text-sm tracking-[0.35em] uppercase mb-4">
              Welcome
            </p>

            <h2 className="text-white text-3xl md:text-5xl font-light tracking-[0.2em] uppercase mb-6">
              Virtual Lab
            </h2>

            <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-xl">
              You are now inside the ParaSightAI 3D diagnostic lab. Walk around
              the room and click the glowing information bubbles to understand
              what happens at each station.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/60">
              <span className="border border-white/15 bg-white/5 px-4 py-2">
                Sample Preparation
              </span>
              <span className="border border-white/15 bg-white/5 px-4 py-2">
                Microscope Station
              </span>
              <span className="border border-white/15 bg-white/5 px-4 py-2">
                AI Analysis
              </span>
              <span className="border border-white/15 bg-white/5 px-4 py-2">
                3D Visualization
              </span>
            </div>

            <button
              onClick={onClose}
              className="mt-8 w-fit px-6 py-3 border border-white/30 text-white hover:bg-white hover:text-black transition"
            >
              Start Exploring
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
