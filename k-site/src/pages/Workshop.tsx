import { useState } from "react";
import useFullNavbar from "@/hooks/useFullNavbar";
import workshopBg from "@/assets/workshop/Workshop.png";
import backBp from "@/assets/workshop/Img.png";
import technoBgImg from "@/assets/technovation/Img.png";
import technoMobImg from "@/assets/technovation/mobileImg.png";
import technoTabImg from "@/assets/technovation/tabImg.png";
import ToggleRegistration from "@/components/ui/Toggle";

import descIcon from "@/assets/workshop/svgs/description.svg";
import preIcon from "@/assets/workshop/svgs/Prerequisites.svg";
import conIcon from "@/assets/workshop/svgs/contact 2.svg";
import scIcon from "@/assets/workshop/svgs/shedule 2.svg";
import spIcon from "@/assets/workshop/svgs/speakers 1.svg";
import takIcon from "@/assets/workshop/svgs/takeways.svg";
import phone from "@/assets/workshop/svgs/phone.svg";
import arrow1 from "@/assets/workshop/svgs/arrow-right 1.svg";
import arrow2 from "@/assets/workshop/svgs/arrow-right 2.svg";
import drone from "@/assets/workshop/Workshop_Images/Underwater_Drone.jpg";

interface Workshop {
  id: string;
  name: string;
  subtitle: string;
  leftText: string;
  rightText: string;
  description: string;
  details: string;
  days: number;
  dayLabel: string;
  fees: number;
  image: string;
  participants: string;
  date: string;
}

const workshops: Workshop[] = [
  {
    id: "ibm",
    name: "IBM WORKSHOP",
    subtitle: "Modern AIML: LLMs, GenAI & Future Technologies",
    leftText: "CYBER SECURITY, THREAT DEFENSE & DIGITAL WAR",
    rightText: "ARM ROBOTICS & CENTRALIZED CONTROL",
    description: "AI & GenAI focused workshop with industry exposure.",
    details:
      "Dive into the fascinating world of Underwater Robotics in this hands-on workshop designed for enthusiasts and innovators! Explore the cutting-edge technology behind autonomous underwater vehicles (AUVs) and remotely operated vehicles (ROVs). Learn about their applications in marine exploration, environmental monitoring, and underwater rescue missions. Participants will gain insights into robotic design, buoyancy control, waterproofing, and sensor integration. Experience practical sessions on building and programming underwater robots, guided by industry experts. This workshop is perfect for students, engineers, and hobbyists eager to explore robotics in challenging aquatic environments. Unlock new possibilities beneath the waves and fuel your passion for innovation!",
    days: 2,
    dayLabel: "SAT-SUN",
    fees: 799,
    image: drone,
    participants: "Team (4-5 Members)",
    date: "FEB 15-16, 2025",
  },
  {
    id: "fullstack",
    name: "FULL STACK DEVELOPMENT",
    subtitle: "From Interface to Infrastructure",
    leftText: "MODERN WEB TECHNOLOGIES",
    rightText: "CLOUD & DEPLOYMENT",
    description: "Build scalable full-stack systems with modern tools.",
    details:
      "Deep dive into modern web development covering React, Node.js, databases, authentication, deployment, and scalable architecture patterns. Build production-ready applications from scratch.",
    days: 1,
    dayLabel: "SAT",
    fees: 599,
    image: drone,
    participants: "Individual",
    date: "FEB 15, 2025",
  },
  {
    id: "drone",
    name: "DRONE SYSTEMS",
    subtitle: "Unmanned Aerial Systems (UAS)",
    leftText: "AUTONOMOUS FLIGHT CONTROL",
    rightText: "AERIAL ROBOTICS",
    description:
      "Hands-on drone assembly, control systems, and real-world UAV case studies.",
    details:
      "Comprehensive drone technology workshop covering assembly, programming, flight control systems, and autonomous navigation.",
    days: 2,
    dayLabel: "SUN-MON",
    fees: 999,
    image: drone,
    participants: "Team (2-4 Members)",
    date: "FEB 16-17, 2025",
  },
];

export default function Workshops() {
  useFullNavbar();

  const [index, setIndex] = useState(0);
  const [showDetail, setShowDetail] = useState(false);

  const next = () => setIndex((prev) => (prev + 1) % workshops.length);
  const prev = () =>
    setIndex((prev) => (prev === 0 ? workshops.length - 1 : prev - 1));

  const currentWorkshop = workshops[index];
  const getLeftIndex = () => (index === 0 ? workshops.length - 1 : index - 1);
  const getRightIndex = () => (index + 1) % workshops.length;

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden font-sans selection:bg-purple-500/30">
      <div className="fixed inset-0 z-0">
        {showDetail ? (
          <div className="absolute inset-0 w-full h-full opacity-60 overflow-hidden">
            <picture>
              <source media="(min-width: 1024px)" srcSet={technoBgImg} />
              <source media="(min-width: 640px)" srcSet={technoTabImg} />
              <img
                src={technoMobImg}
                alt="background"
                className="w-full h-full object-cover object-[center_90%]"
              />
            </picture>

            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-50 bg-gradient-to-b from-transparent via-black/10 opacity-30 to-black" />
          </div>
        ) : (
          <>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${backBp})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 1,
                zIndex: 0,
              }}
            />

            <div
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
              style={{ zIndex: 1 }}
            >
              <img
                src={workshopBg}
                alt="Gear Background"
                className="w-[600px] h-[600px] object-contain animate-slow-spin"
                style={{
                  filter: "brightness(1.1) contrast(1.05)",
                  opacity: 1,
                }}
              />
            </div>

            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "rgba(0, 0, 0, 0.1)",
                zIndex: 2,
              }}
            />
          </>
        )}
      </div>

      <div className="relative z-10">
        {!showDetail ? (
          <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
            <h1 className="text-7xl md:text-8xl font-bold tracking-[0.15em] mb-20 font-">
              WORKSHOPS
            </h1>

            <div className="relative w-full max-w-[1400px] h-[450px] mb-16">
              <div
                className="absolute top-1/2 left-1/2 transition-all duration-700 ease-out cursor-pointer"
                onClick={() => setIndex(getLeftIndex())}
                style={{
                  width: "550px",
                  height: "360px",
                  transform: "translate(calc(-50% - 400px), -50%) scale(0.9)",
                  opacity: 1,
                  zIndex: 10,
                }}
              >
                <div
                  className="w-full h-full rounded-[40px] overflow-hidden flex flex-col"
                  style={{
                    background: "rgba(109, 40, 217, 0.25)",
                    backdropFilter: "blur(5px) saturate(50%)",
                    WebkitBackdropFilter: "blur(60px) saturate(180%)",
                    border: "2px solid rgba(168, 85, 247, 0.7)",
                    boxShadow: "none",
                  }}
                >
                  <div className="flex-1 flex items-center justify-center p-8">
                    <p
                      className="text-center font-bold px-6 font-(family-name:--orbitron)"
                      style={{
                        fontSize: "0.9rem",
                        color: "#f3e8ff",
                        letterSpacing: "0.12em",
                        lineHeight: "1.5",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {workshops[getLeftIndex()].leftText}
                    </p>
                  </div>

                  <div className="p-6">
                    <div
                      className="w-full py-4 rounded-[28px] text-center font-bold tracking-[0.2em]"
                      style={{
                        background:
                          "linear-gradient(90deg, #a855f7 0%, #8A05FF 100%)",
                        boxShadow: "none",
                        fontFamily: "var(--wallpoet)",
                        fontSize: "0.95rem",
                        color: "#fff",
                      }}
                    >
                      {workshops[getLeftIndex()].name}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="absolute top-1/2 left-1/2 transition-all duration-700 ease-out cursor-pointer"
                onClick={() => setShowDetail(true)}
                style={{
                  width: "600px",
                  height: "380px",
                  transform: "translate(-50%, -50%) scale(1)",
                  opacity: 1,
                  zIndex: 20,
                }}
              >
                <div
                  className="w-full h-full rounded-[40px] overflow-hidden flex flex-col"
                  style={{
                    background: "rgba(109, 40, 217, 0.3)",
                    backdropFilter: "blur(2px) saturate(50%)",
                    WebkitBackdropFilter: "blur(70px) saturate(180%)",
                    border: "1px solid rgba(168, 85, 247, 0.7)",
                    boxShadow: "none",
                  }}
                >
                  <div className="flex-1 flex items-center justify-center p-8">
                    <img
                      src={currentWorkshop.image}
                      alt={currentWorkshop.name}
                      className="max-w-full max-h-full object-contain"
                      style={{
                        filter: "none",
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <div
                      className="w-full py-5 rounded-[28px] text-center font-bold tracking-[0.25em]"
                      style={{
                        background:
                          "linear-gradient(90deg, #a855f7 0%, #8A05FF 100%)",
                        boxShadow: "none",
                        fontFamily: "var(--wallpoet)",
                        fontSize: "1.1rem",
                        color: "#fff",
                      }}
                    >
                      {currentWorkshop.name}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="absolute top-1/2 left-1/2 transition-all duration-700 ease-out cursor-pointer"
                onClick={() => setIndex(getRightIndex())}
                style={{
                  width: "550px",
                  height: "360px",
                  transform: "translate(calc(-50% + 400px), -50%) scale(0.9)",
                  opacity: 1,
                  zIndex: 10,
                }}
              >
                <div
                  className="w-full h-full rounded-[40px] overflow-hidden flex flex-col"
                  style={{
                    background: "rgba(109, 40, 217, 0.25)",
                    backdropFilter: "blur(5px) saturate(50%)",
                    WebkitBackdropFilter: "blur(60px) saturate(180%)",
                    border: "2px solid rgba(168, 85, 247, 0.7)",
                    boxShadow: "none",
                  }}
                >
                  <div className="flex-1 flex items-center justify-center p-8">
                    <p
                      className="text-center font-bold px-6"
                      style={{
                        fontFamily: "var(--wallpoet)",
                        fontSize: "0.9rem",
                        color: "#f3e8ff",
                        letterSpacing: "0.12em",
                        lineHeight: "1.5",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {workshops[getRightIndex()].rightText}
                    </p>
                  </div>
                  <div className="p-6">
                    <div
                      className="w-full py-4 rounded-[28px] text-center font-bold tracking-[0.2em]"
                      style={{
                        background:
                          "linear-gradient(90deg, #a855f7 0%, #8A05FF 100%)",
                        boxShadow: "none",
                        fontFamily: "var(--wallpoet)",
                        fontSize: "0.95rem",
                        color: "#fff",
                      }}
                    >
                      {workshops[getRightIndex()].name}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <button
                onClick={prev}
                className="w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110"
                style={{
                  border: "2px solid rgba(168, 85, 247, 0.8)",
                  background: "rgba(0, 0, 0, 0.7)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  color: "#a855f7",
                  boxShadow: "none",
                }}
              >
                ‹
              </button>

              <button
                onClick={next}
                className="w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110"
                style={{
                  border: "2px solid rgba(168, 85, 247, 0.8)",
                  background: "rgba(0, 0, 0, 0.7)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  color: "#a855f7",
                  boxShadow: "none",
                }}
              >
                ›
              </button>
            </div>
          </div>
        ) : (
          <div className="min-h-screen flex flex-col items-center mt-20 px-4 pt-24 pb-16">
            <h1
              className="text-[40px] sm:text-[72px] lg:text-[86px] font-bold tracking-[0.25em] leading-none"
              style={{
                fontFamily: "var(--wallpoet)",
                color: "#fff",
                textShadow: "0 8px 30px rgba(0,0,0,0.6)",
              }}
            >
              WORKSHOPS
            </h1>

            <h2
              className="mt-2 sm:text-[14px] lg:text-[20px] tracking-[0.35em]"
              style={{
                fontFamily: "var(--wallpoet)",
                color: "rgba(255,255,255,0.9)",
              }}
            >
              {currentWorkshop.name}
            </h2>

            <div className="w-full flex justify-center mt-8 mb-10">
              <ToggleRegistration />
            </div>

            <div className="w-full flex justify-center mb-20 px-4">
              <div
                className="
      relative w-full max-w-[1200px]
      rounded-[26px] border gradient-border
      backdrop-blur-md
      shadow-[inset_0_-2px_4px_rgba(0,0,0,0.2),inset_0_2px_4px_rgba(255,255,255,0.2)]
      p-4 sm:p-6 lg:p-10
    "
              >
                <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-start">
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-[260px] sm:w-[300px] aspect-square rounded-[24px] overflow-hidden">
                      <img
                        src={currentWorkshop.image}
                        alt={currentWorkshop.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex gap-3 mt-3 lg:hidden">
                      <button
                        onClick={prev}
                        className="backdrop-blur-md w-[36px] h-[36px] rounded-full flex items-center justify-center transition-all duration-300"
                      >
                        <img src={arrow2} className="w-[36px] h-[36px]" />
                      </button>
                      <button
                        onClick={next}
                        className="w-[36px] h-[36px] rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300"
                      >
                        <img src={arrow1} className="w-[36px] h-[36px]" />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 pt-1">
                 
                    <div className="flex flex-wrap gap-3 mb-5">
                      {[
                        { label: "Description", icon: descIcon, active: true },
                        { label: "Prerequisites", icon: preIcon },
                        { label: "Speakers", icon: spIcon },
                        { label: "Takeaways", icon: takIcon },
                        { label: "Schedule", icon: scIcon },
                        { label: "Contact", icon: conIcon },
                      ].map((tab) => (
                        <button
                          key={tab.label}
                          className={`
                flex items-center gap-2
                px-2 py-[7px]
                text-[15px]
                font-normal
                rounded-[15px]
                backdrop-blur-lg
                border-1
                shadow-[inset_0_-2px_4px_rgba(0,0,0,0.2),inset_0_2px_4px_rgba(255,255,255,0.2)]
                ${
                  tab.active
                    ? "bg-[rgb(138,5,255,1)] border-[rgb(138,5,255,1)] backdrop-blur-md shadow-[inset_0_-2px_4px_rgba(0,0,0,0.2),inset_0_2px_4px_rgba(255,255,255,0.2)]"
                    : "bg-black/[0.01] gradient-border text-white"
                }
              `}
                        >
                          <img src={tab.icon} className="w-[20px] h-[25px]" />
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-start sm:items-center gap-4 mb-4">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 border-white">
                        <img src={phone} className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>

                    
                      <div className="flex flex-col justify-center">
                        <h3 className="text-[20px] sm:text-[24px] lg:text-[28px] leading-tight font-bold tracking-tight font-(family-name:--jost)">
                          {currentWorkshop.subtitle}
                        </h3>

                        <p className="text-white/90 text-[14px] sm:text-[16px] lg:text-[18px] mt-1 font-(family-name:--jost)">
                          Participation: {currentWorkshop.participants}
                        </p>
                      </div>
                    </div>

                    <p className="mt-7 text-[18px] leading-[1] text-white/90 max-w-[810px] font-(family-name:--jost)">
                      {currentWorkshop.details}
                    </p>

                    <div className="hidden lg:flex absolute right-4 top-[35%] translate-y-[-50%] gap-2 z-20">
                      <button
                        onClick={prev}
                        className="backdrop-blur-md w-[30px] h-[20px] lg:w-[48px] lg:h-[48px] rounded-full flex items-center justify-center
         transition-all duration-300"
                      >
                        <img src={arrow2} className="w-[40px] h-[40px]" />
                      </button>

                      <button
                        onClick={next}
                        className="w-[30px] h-[20px] lg:w-[48px] lg:h-[48px] rounded-full flex items-center justify-center
               backdrop-blur-md transition-all duration-300"
                      >
                        <img src={arrow1} className="w-[40px] h-[40px]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
