import { useEffect, useState ,useRef} from "react";
import { GridScan } from "@/components/ui/Loader.tsx";
import { motion, AnimatePresence } from "motion/react";
import {
  blurIn,
  letterContainer,
  letterVariant,
  revealScale,
} from "@/lib/animations";
import useGlitch from "@/hooks/useGlitch";

type GridScanLoaderProps = {
  onFinish?: () => void;
  pageName?: string;
};

export default function GridScanLoader({
  onFinish,
  pageName = "",
}: GridScanLoaderProps) {
  const [hidden, setHidden] = useState(false);
  const glitch = useGlitch(120, 2200, 1800); 

 useEffect(() => {
  let frame: number;
  const start = performance.now();

  const loop = (now: number) => {
    if (now - start >= 3200) {
      setHidden(true);
      onFinish?.();
      return;
    }
    frame = requestAnimationFrame(loop);
  };

  frame = requestAnimationFrame(loop);
  return () => cancelAnimationFrame(frame);
}, [onFinish]);


  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-[999] bg-black overflow-hidden"
        >
          <div className="absolute inset-0">
            <GridScan
              sensitivity={0.55}
              lineThickness={1}
              linesColor="#392e4e"
              gridScale={0.1}
              scanColor="#FF9FFC"
              scanOpacity={0.4}
              enablePost
              bloomIntensity={0.6}
              chromaticAberration={0.002}
              noiseIntensity={0.01}
              scanDuration={1.5}
              enableGyro
              scanDirection="pingpong"
            />
          </div>

          <div className="relative z-10 flex h-full w-full items-center justify-center">
            <motion.h3
              variants={revealScale}
              initial="hidden"
              animate="visible"
              className={`
                flex
                text-center
                font-(family-name:--wallpoet)
                text-[clamp(42px,7vw,110px)]
                tracking-wider
                text-white
                
                drop-shadow-[0_0_25px_rgba(255,159,252,0.35)]
                ${glitch ? "animate-pulse opacity-70 translate-x-[2px]" : ""}
              
              `}
            >
              <motion.span
                variants={letterContainer}
                initial="hidden"
                animate="visible"
              >
                {pageName.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    variants={letterVariant}
                    className={glitch ? "text-pink-400 blur-[1px]" : ""}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            </motion.h3>
          </div>

          {/* <motion.div
            variants={blurIn}
            initial="hidden"
            animate="visible"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,black_85%)]"
          /> */}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
