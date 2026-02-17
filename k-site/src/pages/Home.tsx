import { useEffect, useState } from "react";
import { useNavbarStore, type NavbarStore } from "@/store/navbarStore";
import VideoLoader from "@/components/Loader/VideoLoader";
import Hero from "@/components/Landing/Hero";
import Patronage from "@/components/Landing/Patronage";
import About from "@/components/Landing/About";

export default function Home() {
  const setHomeNavbar = useNavbarStore((s: NavbarStore) => s.setHomeNavbar);

  const [loading,setLoading] = useState(true);

  useEffect(() => {
    setHomeNavbar();
  }, [setHomeNavbar]);

  return (
    <>
    {loading && <VideoLoader onFinish={()=>false}/>} 
    <main className="relative min-h-screen overflow-hidden text-white">
      <div className="relative z-10 w-full">
        <Hero />
        <Patronage />
        <About />
      </div>
    </main>
    </>
  );
}
