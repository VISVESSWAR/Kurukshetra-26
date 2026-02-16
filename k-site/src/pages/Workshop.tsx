import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFullNavbar from "@/hooks/useFullNavbar";
import workshopBg from "@/assets/workshop/Workshop.png";
import backBp from "@/assets/workshop/Img.png";
import { WORKSHOPS_DATA } from "@/constants/workshopsData";

export default function Workshops() {
  useFullNavbar();
  const navigate = useNavigate();

  const workshops = WORKSHOPS_DATA;

  const [index, setIndex] = useState(0);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(
      () => {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 500);
      },
      3000 + Math.random() * 2000
    );

    return () => clearInterval(interval);
  }, []);

  const next = () => setIndex((prev) => (prev + 1) % workshops.length);
  const prev = () =>
    setIndex((prev) => (prev === 0 ? workshops.length - 1 : prev - 1));

  const currentWorkshop = workshops[index];
  const getLeftIndex = () => (index === 0 ? workshops.length - 1 : index - 1);
  const getRightIndex = () => (index + 1) % workshops.length;

  const handleCenterCardClick = () => {
    navigate(`/workshops/${currentWorkshop.slug}`);
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden font-sans selection:bg-purple-500/30">
      <div className="absolute inset-0 z-0">
        {/* <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${backBp})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 1,
            zIndex: 0,
          }}
        /> */}

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
      </div>

      <div className="relative z-10">
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
          <div className="text-center mb-12">
            <div className={`relative ${glitch ? "glitch-active" : ""}`}>
              <h1
                className="sponsor-glitch text-4xl md:text-7xl font-bold tracking-[0.15em] mb-2 font-(family-name:--orbitron)"
                data-text="WORKSHOPS"
              >
                WORKSHOPS
              </h1>
            </div>
          </div>

          <div className="relative w-full max-w-6xl h-80 mb-16">
            <div
              className="hidden lg:block lg:w-[42%] absolute top-1/2 left-1/2 transition-all duration-700 ease-out cursor-pointer"
              onClick={() => setIndex(getLeftIndex())}
              style={{
                // width: "550px",
                // height: "360px",
                transform: "translate(calc(-50% - 400px), -50%) scale(0.85)",
                opacity: 1,
                zIndex: 10,
              }}
            >
              <div
                className="w-full h-full rounded-[40px] overflow-hidden flex flex-col"
                style={{
                  background: "rgba(109, 40, 217, 0.25)",
                  backdropFilter: "blur(50px) saturate(50%)",
                  WebkitBackdropFilter: "blur(50px) saturate(50%)",
                  border: "2px solid rgba(168, 85, 247, 0.7)",
                  boxShadow: "none",
                }}
              >
                <div className="flex-1 flex items-center justify-center p-8">
                  <img
                    src={workshops[getLeftIndex()].image}
                    alt={workshops[getLeftIndex()].title}
                    className="w-56 h-48 object-contain opacity-40"
                    style={{
                      filter: "none",
                    }}
                  />
                </div>

                <div className="p-6">
                  <div
                    className="w-full py-4 rounded-[28px] text-center font-bold tracking-[0.2em]"
                    style={{
                      background:
                        "linear-gradient(90deg, #a855f7 0%, #8A05FF 100%)",
                      boxShadow: "none",
                      fontFamily: "var(--orbitron)",
                      fontSize: "1.02rem",
                      color: "#fff",
                    }}
                  >
                    {workshops[getLeftIndex()].title}
                  </div>
                </div>
              </div>
            </div>

            <div
              className="absolute w-full h-full lg:w-[42%] top-1/2 left-1/2 transition-all duration-700 ease-out cursor-pointer"
              onClick={handleCenterCardClick}
              style={{
                // width: "600px",
                // height: "380px",
                transform: "translate(-50%, -50%) scale(1.05)",
                opacity: 1,
                zIndex: 20,
              }}
            >
              <div
                className="w-[95%] h-[95%] md:w-[70%] mx-auto lg:w-full lg:h-full rounded-[40px] overflow-hidden flex flex-col"
                style={{
                  background: "rgba(109, 40, 217, 0.3)",
                  backdropFilter: "blur(5px) saturate(50%)",
                  WebkitBackdropFilter: "blur(20px) saturate(180%)",
                  border: "1px solid rgba(168, 85, 247, 0.7)",
                  boxShadow: "none",
                }}
              >
                <div className="flex items-center justify-center p-4 h-[80%]">
                  <img
                    src={currentWorkshop.image}
                    alt={currentWorkshop.title}
                    className="w-64 h-52 object-contain"
                  />
                </div>

                <div className="p-2">
                  <div
                    className="w-full py-3 rounded-[28px] text-center font-bold tracking-[0.25em]"
                    style={{
                      background:
                        "linear-gradient(90deg, #a855f7 0%, #8A05FF 100%)",
                      boxShadow: "none",
                      fontFamily: "var(--orbitron)",
                      fontSize: "0.8rem",
                      color: "#fff",
                    }}
                  >
                    {currentWorkshop.title}
                  </div>
                </div>
              </div>
            </div>

            <div
              className="hidden lg:block lg:w-[42%] absolute top-1/2 left-1/2 transition-all duration-700 ease-out cursor-pointer"
              onClick={() => setIndex(getRightIndex())}
              style={{
                // width: "550px",
                // height: "360px",
                transform: "translate(calc(-50% + 400px), -50%) scale(0.85)",
                opacity: 1,
                zIndex: 10,
              }}
            >
              <div
                className="w-full h-full rounded-[40px] overflow-hidden flex flex-col"
                style={{
                  background: "rgba(109, 40, 217, 0.25)",
                  backdropFilter: "blur(50px) saturate(50%)",
                  WebkitBackdropFilter: "blur(50px) saturate(50%)",
                  border: "2px solid rgba(168, 85, 247, 0.7)",
                  boxShadow: "none",
                }}
              >
                <div className="flex-1 flex items-center justify-center p-8">
                  <img
                    src={workshops[getRightIndex()].image}
                    alt={workshops[getRightIndex()].title}
                    className="w-56 h-48 object-contain opacity-40"
                    style={{
                      filter: "none",
                    }}
                  />
                </div>
                <div className="p-6">
                  <div
                    className="w-full py-4 rounded-[28px] text-center font-bold tracking-[0.2em]"
                    style={{
                      background:
                        "linear-gradient(90deg, #a855f7 0%, #8A05FF 100%)",
                      boxShadow: "none",
                      fontFamily: "var(--orbitron)",
                      fontSize: "1.02rem",
                      color: "#fff",
                    }}
                  >
                    {workshops[getRightIndex()].title}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-8 -mt-12">
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
      </div>
    </div>
  );
}
