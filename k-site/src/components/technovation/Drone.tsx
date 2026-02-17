import droneImg from "@/assets/technovation/drone.png";
import { fadeUp, floatSlow, hoverScale, pulseGlow, revealUp, shimmer, subtlePulse, tapShrink } from "@/lib/animations";
import { motion } from "motion/react";


const Drone = () => {
  return (
    <div className="absolute top-1/3 sm:top-1/3 md:top-1/2 xl:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
      <div
        className="relative w-[450px] lg:w-[1000px] lg:h-[1000px] md:w-[700px] md:h-[700px]  min-w-[450px] min-h-[380px]    
    
  "
      >
        <motion.img
  src={droneImg}
  alt="Drone"
  initial="hidden"
  animate={["visible", "float"]}
  variants={{
    ...fadeUp,
    float: floatSlow,
  }}
  className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
/>

      </div>
    </div>
  );
};

export default Drone;
