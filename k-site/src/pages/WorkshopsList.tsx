import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useFullNavbar from "@/hooks/useFullNavbar";
import { WORKSHOP_DETAILS } from "@/constants/workshops";
// import useGlitch from "@/hooks/useGlitch";
import {
  pageVariants,
  // blurIn,
  staggerContainer,
  cardVariants,
} from "@/lib/animations";
import { motion } from "motion/react";

export default function WorkshopsList() {
  useFullNavbar();
  const navigate = useNavigate();
  // const glitch = useGlitch();
  const [glitchEffect, setGlitchEffect] = useState(false);

  useEffect(() => {
    const interval = setInterval(
      () => {
        setGlitchEffect(true);
        setTimeout(() => setGlitchEffect(false), 500);
      },
      3000 + Math.random() * 2000,
    );

    return () => clearInterval(interval);
  }, []);

  const workshopTitles = Object.keys(WORKSHOP_DETAILS);

  return (
    <motion.div
      className="min-h-screen bg-black text-white overflow-hidden"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Animated background gradients */}
      <motion.div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-fuchsia-900/10 pointer-events-none" />

      <div className="relative z-10">
        {/* HEADER */}
        <div className="relative overflow-hidden shrink-0 pt-20 pb-10">
          <div className="flex justify-center">
            <div className={`relative ${glitchEffect ? "glitch-active" : ""}`}>
              <h2
                className="sponsor-glitch text-3xl md:text-6xl font-medium text-white font-(family-name:--wallpoet)"
                data-text="WORKSHOPS"
              >
                WORKSHOPS
              </h2>
            </div>
          </div>
        </div>

        {/* WORKSHOPS GRID */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer(0.15)}
            initial="hidden"
            animate="visible"
          >
            {workshopTitles.map((title) => {
              const workshop = WORKSHOP_DETAILS[title];

              return (
                <motion.div
                  key={title}
                  onClick={() =>
                    navigate(`/workshops/${encodeURIComponent(title)}`)
                  }
                  className="w-full relative border border-purple-500/40 rounded-xl overflow-hidden hover:border-purple-400 transition cursor-pointer h-60"
                  variants={cardVariants}
                  whileHover={{ scale: 1.05, y: -8 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* IMAGE */}
                  {workshop.image && (
                    <img
                      src={workshop.image}
                      alt={title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}

                  {/* DARK OVERLAY */}
                  <div className="absolute inset-0 bg-black/40" />

                  {/* TITLE */}
                  <div className="relative z-10 w-full h-full flex items-end justify-center p-3">
                    <span className="bg-purple-600 text-white text-sm font-semibold px-5 py-2 rounded-full w-[90%] text-center line-clamp-2">
                      {title}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
