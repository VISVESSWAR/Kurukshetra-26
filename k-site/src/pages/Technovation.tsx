import Background from "@/components/technovation/Background";
import Card from "@/components/technovation/Card";
import Drone from "@/components/technovation/Drone";
import useFullNavbar from "@/hooks/useFullNavbar";
import GridScanLoader from "@/components/Loader/Loader";
import { useState } from "react";
import { motion } from "motion/react";
import useGlitch from "@/hooks/useGlitch";
import { blurIn } from "@/lib/animations";
import { ExternalLink } from "lucide-react";

export default function Technovation() {
  useFullNavbar();
  const [loading, setLoading] = useState(true);
  const glitch = useGlitch();

  const handleRegisterClick = () => {
    window.open(
      "https://unstop.com/competitions/technovation-kurukshetra-2026-anna-university-ceg-guindy-1628748",
      "_blank"
    );
  };

  return (
    <>
      {loading && (
        <GridScanLoader
          onFinish={() => setLoading(false)}
          pageName="Technovation"
        />
      )}

      <div className="relative min-h-screen bg-black text-white overflow-x-clip">
        <section className="relative min-h-screen pb-12 sm:pb-16">
          <Background />

          <div className="relative z-10 pt-[26svh] sm:pt-[24svh] md:pt-[30svh] flex justify-center xl:pt-0 xl:absolute top-[179px] xl:top-[320px] 2xl:top-[365px] xl:left-1/2 xl:-translate-x-1/2 xl:-translate-y-1/2">
            <Drone />
          </div>

          <motion.div className="flex justify-center mb-16" variants={blurIn}>
            <div className={`relative ${glitch ? "glitch-active" : ""}`}>
              <div className="absolute top-[19vh] sm:top-[20vh] md:top-[22vh] xl:top-[210px] left-1/2 -translate-x-1/2 w-[92vw] sm:w-[85vw] md:w-[75vw] xl:w-[1045px] text-center z-10">
                <h1
                  className="sponsor-glitch text-white font-(family-name:--wallpoet) text-[clamp(40px,8vw,103px)] leading-tight tracking-[0.035em] font-normal"
                  data-text="Technovation"
                >
                  Technovation
                </h1>
              </div>
            </div>
          </motion.div>

          <div className="relative z-20 mx-auto w-full max-w-[1200px] px-4 sm:px-6 pt-[25svh] sm:pt-[32svh] md:pt-[24svh] xl:pt-0 font-(family-name:--quantico)">
            <div className="flex flex-col gap-10 xl:flex-row xl:gap-14 xl:items-stretch xl:absolute xl:top-[380px] xl:left-1/2 xl:-translate-x-1/2 xl:w-full xl:px-4">
              <Card
                className="backdrop-blur-md w-full max-w-[560px] mx-auto xl:mx-0 xl:max-w-none xl:w-[48%] xl:h-auto"
                title="ABOUT"
              >
                <ul className="space-y-4 text-[13px] sm:text-[14px] md:text-[14px] lg:text-[14px] xl:text-[16px] leading-[1.35] lg:leading-[1.25] xl:leading-[1.35]">
                  <li className="flex gap-3">
                    <span className="mt-[9px] h-[4px] w-[2.9px] rounded-full bg-white shrink-0" />
                    <p className="text-justify">
                      Technovation is an inter-college project display
                      competition with a theme that varies yearly. Transform
                      your imaginative and practical ideas into tangible
                      products to present at the Technovation.
                    </p>
                  </li>

                  <li className="flex gap-3">
                    <span className="mt-[9px] h-[4px] w-[2.9px] rounded-full bg-white shrink-0" />
                    <p className="text-justify">
                      The competition is open to individuals and teams, and the
                      entries will be judged on their originality, feasibility,
                      and completeness. The main goal of this competition is to
                      encourage the development of innovative ideas that have
                      the potential to improve our lives.
                    </p>
                  </li>
                </ul>
              </Card>

              <Card
                className="backdrop-blur-md w-full max-w-[560px] mx-auto xl:mx-0 xl:max-w-none xl:w-[48%] xl:h-auto"
                title="RULES & REGULATION"
              >
                <ul className="space-y-2 text-[13px] sm:text-[14px] md:text-[14px] lg:text-[14px] xl:text-[16px] leading-[1.35] lg:leading-[1.25] xl:leading-[1.35]">
                  <li className="flex gap-3">
                    <span className="mt-[9px] h-[4px] w-[2.9px] rounded-full bg-white shrink-0" />
                    <p className="text-justify">
                      Eligibility: Open to UG/PG/Ph.D/Post Doc Candidates passionate about Engineering and Science.
                    </p>
                  </li>

                  <li className="flex gap-3">
                    <span className="mt-[9px] h-[4px] w-[2.9px] rounded-full bg-white shrink-0" />
                    <p className="text-justify">
                      Participation: Participants may compete individually or as part of a team.
                    </p>
                  </li>

                  <li className="flex gap-3">
                    <span className="mt-[9px] h-[4px] w-[2.9px] rounded-full bg-white shrink-0" />
                    <p className="text-justify">
                      Registration: Submit project abstract in PDF format, working demo video (for Hardware projects) to Google Drive with public access. Registration for both rounds through Unstop platform.
                    </p>
                  </li>

                  <li className="flex gap-3">
                    <span className="mt-[9px] h-[4px] w-[2.9px] rounded-full bg-white shrink-0" />
                    <p className="text-justify">
                      Abstract Template:{" "}
                      <a
                        href="https://docs.google.com/presentation/d/1E4ORvkjPvaFchKL2pihfelbCAV1HyeiH/edit?slide=id.p1#slide=id.p1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 underline"
                      >
                        Download Template
                      </a>
                    </p>
                  </li>
                </ul>
              </Card>
            </div>

            <div className="mt-10 flex flex-col gap-10 sm:mt-12 xl:mt-0 xl:flex-row xl:gap-14 xl:items-stretch xl:absolute xl:top-[740px] xl:left-1/2 xl:-translate-x-1/2 xl:w-full xl:px-4">
              <Card
                className="backdrop-blur-md w-full max-w-[560px] mx-auto xl:mx-0 xl:max-w-none xl:w-[48%] xl:h-auto"
                title="ROUND 1 - ONLINE SCREENING"
              >
                <div className="space-y-4 text-[13px] sm:text-[14px] md:text-[14px] lg:text-[14px] xl:text-[16px] leading-[1.35] lg:leading-[1.25] xl:leading-[1.35]">
                  <div className="space-y-2">
                    <p className="font-semibold text-purple-400 mb-2">Entry Fee:</p>
                    <p className="text-justify">No entry fee required for Round 1</p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-semibold text-purple-400 mb-2">Process:</p>
                    <ul className="space-y-1 ml-3">
                      <li className="flex gap-3">
                        <span className="mt-[4px] h-[3px] w-[2px] rounded-full bg-white shrink-0" />
                        <p className="text-justify">Submit project abstract and working demo video via Unstop</p>
                      </li>
                      <li className="flex gap-3">
                        <span className="mt-[4px] h-[3px] w-[2px] rounded-full bg-white shrink-0" />
                        <p className="text-justify">Evaluation: Originality, feasibility, innovation, theme alignment</p>
                      </li>
                      <li className="flex gap-3">
                        <span className="mt-[4px] h-[3px] w-[2px] rounded-full bg-white shrink-0" />
                        <p className="text-justify">Shortlisted teams qualify for final round</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card
                className="backdrop-blur-md w-full max-w-[560px] mx-auto xl:mx-0 xl:max-w-none xl:w-[48%] xl:h-auto"
                title="ROUND 2 - ON-SITE DISPLAY"
              >
                <div className="space-y-4 text-[13px] sm:text-[14px] md:text-[14px] lg:text-[14px] xl:text-[16px] leading-[1.35] lg:leading-[1.25] xl:leading-[1.35]">
                  <div className="space-y-2">
                    <p className="font-semibold text-purple-400 mb-2">Venue:</p>
                    <p className="text-justify">College of Engineering Guindy, Anna University, Chennai - 600025</p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-semibold text-purple-400 mb-2">Entry Fee:</p>
                    <p className="text-justify">₹1,200/- per team</p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-semibold text-purple-400 mb-2">Process:</p>
                    <ul className="space-y-1 ml-3">
                      <li className="flex gap-3">
                        <span className="mt-[4px] h-[3px] w-[2px] rounded-full bg-white shrink-0" />
                        <p className="text-justify">Day-long project display competition</p>
                      </li>
                      <li className="flex gap-3">
                        <span className="mt-[4px] h-[3px] w-[2px] rounded-full bg-white shrink-0" />
                        <p className="text-justify">Evaluation: Problem clarity, innovation, feasibility, completeness, traction, theme relevance</p>
                      </li>
                      <li className="flex gap-3">
                        <span className="mt-[4px] h-[3px] w-[2px] rounded-full bg-white shrink-0" />
                        <p className="text-justify">All teams receive E-certificate; winners get printed certificates & cash prizes</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>

            <div className="mt-10 flex flex-col gap-10 sm:mt-12 xl:mt-0 xl:flex-row xl:gap-14 xl:items-stretch xl:absolute xl:top-[1200px] xl:left-1/2 xl:-translate-x-1/2 xl:w-full xl:px-4">
              <Card
                className="backdrop-blur-md w-full max-w-[560px] mx-auto xl:mx-0 xl:max-w-none xl:w-[48%] xl:h-auto"
                title="PRIZES"
              >
                <ul className="space-y-2 text-[13px] sm:text-[14px] md:text-[14px] lg:text-[14px] xl:text-[16px] leading-[1.35] lg:leading-[1.25] xl:leading-[1.5]">
                  <li className="flex gap-3">
                    <span className="mt-[9px] h-[4px] w-[2.9px] rounded-full bg-white shrink-0" />
                    <p className="text-justify">1st Prize: Rs. 40,000/-</p>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-[9px] h-[4px] w-[2.9px] rounded-full bg-white shrink-0" />
                    <p className="text-justify">2nd Prize: Rs. 25,000/-</p>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-[9px] h-[4px] w-[2.9px] rounded-full bg-white shrink-0" />
                    <p className="text-justify">3rd Prize: Rs. 15,000/-</p>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-[9px] h-[4px] w-[2.9px] rounded-full bg-white shrink-0" />
                    <p className="text-justify">Participation Certificate for all teams</p>
                  </li>
                </ul>
              </Card>

              <Card
                className="backdrop-blur-md w-full max-w-[560px] mx-auto xl:mx-0 xl:max-w-none xl:w-[48%] xl:h-auto"
                title="SPECIAL TRACKS"
              >
                <ul className="space-y-2 text-[13px] sm:text-[14px] md:text-[14px] lg:text-[14px] xl:text-[16px] leading-[1.35] lg:leading-[1.25] xl:leading-[1.5]">
                  <li className="flex gap-3">
                    <span className="mt-[9px] h-[4px] w-[2.9px] rounded-full bg-white shrink-0" />
                    <p className="text-justify">Track 1 (Theme based): Rs. 5,000/-</p>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-[9px] h-[4px] w-[2.9px] rounded-full bg-white shrink-0" />
                    <p className="text-justify">Track 2 (Socially Relevant): Rs. 5,000/-</p>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-[9px] h-[4px] w-[2.9px] rounded-full bg-white shrink-0" />
                    <p className="text-justify">Track 3 (Sustainable Project): Rs. 5,000/-</p>
                  </li>
                </ul>
              </Card>
            </div>

            <div className="mt-10 flex justify-center sm:mt-12 xl:mt-0 xl:absolute xl:top-[1550px] xl:left-1/2 xl:-translate-x-1/2">
              <motion.button
                onClick={handleRegisterClick}
                className="inline-flex items-center gap-2 px-8 py-3 sm:px-10 sm:py-4 bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:from-purple-500 hover:to-fuchsia-400 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_#a855f7] hover:shadow-[0_0_30px_#a855f7]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Register Now on Unstop
                <ExternalLink size={18} />
              </motion.button>
            </div>

            <div className="hidden xl:block h-[1600px]" />
          </div>
        </section>
      </div>
    </>
  );
}