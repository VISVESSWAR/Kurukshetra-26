import { useState,useEffect } from "react";
import cyberpunk from '@/assets/loader/cyberpunk.mp4';
import k26_logo from "@/assets/K'26_Logo.png";

type VideoLoaderProps = {
  onFinish?: () => void;
};

export default function VideoLoader({ onFinish }: VideoLoaderProps) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHidden(true);
      onFinish?.();
    }, 3200);

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (hidden) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black">
      <video autoPlay muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-75">
        <source src={cyberpunk} type="video/mp4" />
      </video>

      <img
        src={k26_logo}
        alt="Loader Logo"
        className="relative z-10 w-[80vw] max-w-[700px] sm:max-w-[800px] object-contain"
      />
    </div>
  );
}