import { useState, useEffect } from "react";
import useFullNavbar from "@/hooks/useFullNavbar";
import { useParams, useNavigate } from "react-router-dom";
import { getWorkshopBySlug } from "@/constants/workshopsData";
import type { Speaker } from "@/constants/workshopsData";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Mail,
  Phone,
  FileText,
  CheckCircle,
  Users,
  Gift,
  Calendar,
  HandCoins,
} from "lucide-react";
import { motion } from "motion/react";
import { slideInFromLeftStaggered } from "@/lib/animations";

export default function WorkshopsDetails() {
  useFullNavbar();
  const { slug } = useParams();
  const navigate = useNavigate();

  const workshop = slug ? getWorkshopBySlug(slug) : null;

  const [activeIndex, setActiveIndex] = useState(0);
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

  // Render not found page if workshop doesn't exist
  if (!workshop || !slug) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Workshop Not Found
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            The workshop you're looking for doesn't exist or is not available
            yet.
          </p>
          <button
            onClick={() => navigate("/workshops")}
            className="inline-block px-8 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
          >
            ← Back to Workshops
          </button>
        </div>
      </div>
    );
  }

  // Render speakers with logos
  const renderSpeakers = (content: unknown) => {
    if (!Array.isArray(content)) return null;

    // Check if it's Speaker objects or strings
    const speakers = content as (string | Speaker)[];
    const isSpeaker =
      speakers.length > 0 &&
      typeof speakers[0] === "object" &&
      "logo" in speakers[0];

    if (!isSpeaker) {
      return renderListWithIcon(
        speakers.filter((item): item is string => typeof item === "string"),
        Users
      );
    }

    // Filter speaker objects
    const speakerObjects = speakers.filter(
      (item): item is Speaker => typeof item === "object" && "logo" in item
    );
    const hasSpeakers = speakerObjects.some((s) => s.logo);
    if (!hasSpeakers) {
      return (
        <motion.p
          className="text-gray-400 italic mt-4"
          variants={slideInFromLeftStaggered(0.3)}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          TBD
        </motion.p>
      );
    }

    return (
      <ul className="mt-4 space-y-3">
        {speakerObjects.map((speaker, index) => (
          <motion.li
            key={index}
            className="flex gap-3 items-center justify-center"
            variants={slideInFromLeftStaggered(0.3)}
            initial="hidden"
            animate="visible"
            custom={index}
          >
            {speaker.logo ? (
              <div className="w-48 h-48 rounded-lg overflow-hidden bg-gray-700 flex items-center justify-center">
                <img
                  src={speaker.logo}
                  alt="Speaker logo"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-48 h-48 rounded-lg bg-gray-700/50 flex items-center justify-center">
                <Users size={60} className="text-purple-400" />
              </div>
            )}
          </motion.li>
        ))}
      </ul>
    );
  };

  // Render list with icon
  const renderListWithIcon = (
    items: string[],
    Icon: React.ComponentType<{ size: number; className: string }>
  ) => (
    <ul className="mt-4 text-gray-300 space-y-2 text-sm md:text-base overflow-x-hidden lg:text-left text-justify">
      {items.map((item, index) => (
        <motion.li
          key={index}
          className="flex gap-2 items-start justify-start min-w-0"
          variants={slideInFromLeftStaggered(0.3)}
          initial="hidden"
          animate="visible"
          custom={index}
        >
          <Icon size={18} className="text-purple-400 shrink-0 mt-0.5" />
          <span className="flex-1 min-w-0" style={{ wordBreak: "break-word" }}>
            {item}
          </span>
        </motion.li>
      ))}
    </ul>
  );

  // Render list content
  const renderListContent = (content: string[] | string) => {
    if (typeof content === "string") {
      return (
        <motion.p
          className="text-base md:text-lg text-gray-300 text-justify"
          variants={slideInFromLeftStaggered(0.3)}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          {content}
        </motion.p>
      );
    }

    if (Array.isArray(content)) {
      return (
        <ul className="mt-4 text-gray-300 space-y-2 text-sm md:text-base overflow-x-hidden lg:text-left text-justify">
          {content.map((item, index) => (
            <motion.li
              key={index}
              className="flex gap-2 items-start justify-start min-w-0"
              variants={slideInFromLeftStaggered(0.3)}
              initial="hidden"
              animate="visible"
              custom={index}
            >
              <span
                className="flex-1 min-w-0"
                style={{ wordBreak: "break-word" }}
              >
                • {item}
              </span>
            </motion.li>
          ))}
        </ul>
      );
    }
  };

  // Render contact with phone/email links
  const renderContacts = (content: string[] | string) => {
    if (typeof content === "string") {
      return renderListContent(content);
    }

    if (Array.isArray(content)) {
      return (
        <ul className="mt-4 text-gray-300 space-y-2 text-sm md:text-base overflow-x-hidden lg:text-left text-justify">
          {content.map((item, index) => {
            // Check if it's a phone number or email
            const isPhone = item.includes(workshop.contactPhone);
            const isEmail = item.includes(workshop.contactEmail);

            let href = "#";
            if (isPhone) {
              href = `tel:${workshop.contactPhone}`;
            } else if (isEmail) {
              href = `mailto:${workshop.contactEmail}`;
            }

            const isLinkable = isPhone || isEmail;
            const displayText = item;

            return (
              <motion.li
                key={index}
                className="flex flex-wrap gap-1 items-center lg:justify-start justify-center min-w-0"
                variants={slideInFromLeftStaggered(0.3)}
                initial="hidden"
                animate="visible"
                custom={index}
              >
                {isLinkable ? (
                  <span className="flex items-center gap-2 min-w-0">
                    {isPhone && (
                      <Phone size={16} className="text-purple-400 shrink-0" />
                    )}
                    {isEmail && (
                      <Mail size={16} className="text-purple-400 shrink-0" />
                    )}
                    <a
                      href={href}
                      target={isEmail ? "_blank" : undefined}
                      rel={isEmail ? "noopener noreferrer" : undefined}
                      className="text-purple-400 hover:text-purple-300 hover:underline transition min-w-0"
                    >
                      {displayText}
                    </a>
                  </span>
                ) : (
                  <span className="min-w-0" style={{ wordBreak: "break-word" }}>
                    {displayText}
                  </span>
                )}
              </motion.li>
            );
          })}
        </ul>
      );
    }
  };

  // Map section IDs to lucide icons
  const getIconComponent = (sectionId: string) => {
    const iconMap: Record<
      string,
      React.ComponentType<{ size: number; className: string }>
    > = {
      description: FileText,
      prerequisites: CheckCircle,
      speakers: Users,
      takeaways: Gift,
      schedule: Calendar,
      contact: Mail,
    };
    return iconMap[sectionId] || FileText;
  };

  // Create tabs from sections - filter out empty speaker sections
  const tabs = workshop.sections
    .filter((section) => {
      // Hide speakers tab if no speakers
      if (section.id === "speakers" && Array.isArray(section.content)) {
        const speakers = section.content as (string | Speaker)[];
        const speakerObjects = speakers.filter(
          (item): item is Speaker => typeof item === "object" && "logo" in item
        );
        const hasSpeakers = speakerObjects.some((s) => s.logo);
        if (!hasSpeakers) return false;
      }
      return true;
    })
    .map((section) => ({
      key: section.id,
      name: section.label,
      icon: getIconComponent(section.id),
    }));

  const activeTab = tabs[activeIndex];

  // Generate tab content dynamically
  const renderTabContent = (sectionId: string) => {
    const section = workshop.sections.find((s) => s.id === sectionId);
    if (!section) return null;

    if (sectionId === "description") {
      return (
        <>
          {workshop.image && (
            <motion.div
              className="lg:hidden w-full h-[25vh] rounded-xl overflow-hidden mb-4"
              variants={slideInFromLeftStaggered(0.2)}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              <img
                src={workshop.image}
                alt={workshop.title}
                className="w-[80%] h-[80%] m-auto object-cover"
              />
            </motion.div>
          )}

          <motion.h2
            className="text-md md:text-lg font-normal text-justify"
            variants={slideInFromLeftStaggered(0.3)}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            {typeof section.content === "string"
              ? section.content
              : section.content.join("\n")}
          </motion.h2>

          <motion.p
            className="text-base md:text-lg text-gray-300 mt-4"
            variants={slideInFromLeftStaggered(0.3)}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            Participation: {workshop.participants}
          </motion.p>
        </>
      );
    }

    if (sectionId === "contact") {
      if (
        typeof section.content === "string" ||
        Array.isArray(section.content)
      ) {
        return renderContacts(section.content as string | string[]);
      }
    }

    // Use icons for different section types
    if (Array.isArray(section.content)) {
      if (sectionId === "prerequisites") {
        // Filter out Speaker objects, only pass strings
        const items = section.content.filter(
          (item): item is string => typeof item === "string"
        );
        return renderListWithIcon(items, CheckCircle);
      } else if (sectionId === "speakers") {
        return renderSpeakers(section.content);
      } else if (sectionId === "takeaways") {
        // Filter out Speaker objects, only pass strings
        const items = section.content.filter(
          (item): item is string => typeof item === "string"
        );
        return renderListWithIcon(items, Gift);
      } else if (sectionId === "schedule") {
        const venue =
          Array.isArray(section.content) && section.content.length > 0
            ? section.content
                .filter((item): item is string => typeof item === "string")
                .join(", ")
            : null;

        const fee =
          workshop.fees !== undefined &&
          workshop.fees !== null &&
          String(workshop.fees).trim() !== ""
            ? typeof workshop.fees === "number"
              ? `₹${workshop.fees}`
              : workshop.fees
            : "TBD";

        const date =
          workshop.date && workshop.date.trim() !== "" ? workshop.date : "TBD";

        const venueText = venue && venue.trim() !== "" ? venue : "TBD";

        const scheduleRows = [
          { label: "Fee", value: fee, icon: HandCoins },
          { label: "Date", value: date, icon: Calendar },
          { label: "Venue", value: venueText, icon: Users },
        ];

        return (
          <div className="mt-4 space-y-3 text-sm md:text-base text-gray-300">
            {scheduleRows.map((row, index) => {
              const IconComponent = row.icon;

              return (
                <motion.div
                  key={row.label}
                  className="flex items-start gap-2"
                  variants={slideInFromLeftStaggered(0.3)}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                >
                  <IconComponent
                    size={18}
                    className="text-purple-400 mt-0.5 shrink-0"
                  />

                  <span className="font-medium text-purple-300">
                    {row.label} -
                  </span>

                  <span className="break-words">{row.value}</span>
                </motion.div>
              );
            })}
          </div>
        );
      }
    }

    if (typeof section.content === "string" || Array.isArray(section.content)) {
      return renderListContent(section.content as string | string[]);
    }

    return null;
  };

  const nextTab = () => {
    setActiveIndex((prev) => (prev + 1) % tabs.length);
  };

  const prevTab = () => {
    setActiveIndex((prev) => (prev === 0 ? tabs.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* HEADER */}
      <div className="relative overflow-hidden shrink-0">
        <div className="flex justify-center mt-5">
          <div className={`relative ${glitch ? "glitch-active" : ""}`}>
            <h2
              className="sponsor-glitch text-3xl md:text-5xl lg:mt-20 mt-28 font-medium text-white font-(family-name:--wallpoet)"
              data-text="WORKSHOPS"
            >
              WORKSHOPS
            </h2>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA - CENTERED VERTICALLY */}
      <div className="grow flex items-center justify-center px-4 py-8">
        <div className="relative w-full max-w-6xl">
          <div
            className="bg-linear-to-b from-[#2d0057]/80 to-[#140024]/90
                          backdrop-blur-xl
                          border border-purple-500/40
                          rounded-2xl
                          shadow-[0_0_40px_#7c3aed]
                          p-5 md:p-8"
          >
            {/* WORKSHOP NAME - JUST ABOVE TABS */}
            <motion.div
              className="mb-6 text-center"
              variants={slideInFromLeftStaggered(0.1)}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              <div
                className="inline-flex items-center gap-3 
                              bg-linear-to-r from-purple-600 to-fuchsia-500
                              px-5 py-2 md:px-6 md:py-3 rounded-full
                              shadow-[0_0_25px_#a855f7]
                              font-semibold tracking-wide text-sm md:text-base"
              >
                <span className="text-center">
                  {workshop.title.toUpperCase()}
                </span>
              </div>
            </motion.div>

            {/* DESKTOP/LANDSCAPE LAYOUT (lg and above) */}
            <div className="hidden lg:flex flex-col gap-6">
              {/* TOP ROW - TABS */}
              <div className="flex items-center gap-3 pr-2 md:pr-4">
                {/* Tabs */}
                <div className="flex gap-3 justify-center overflow-x-hidden whitespace-nowrap scrollbar-hide flex-1">
                  {tabs.map((tab, index) => {
                    const isActive = index === activeIndex;

                    return (
                      <button
                        key={tab.key}
                        onClick={() => setActiveIndex(index)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm
                        border transition-all duration-300 shrink-0
                        ${
                          isActive
                            ? "bg-purple-600 border-purple-400 shadow-[0_0_15px_#a855f7]"
                            : "border-purple-400/40 hover:bg-purple-600 hover:shadow-[0_0_12px_#a855f7]"
                        }`}
                      >
                        {(() => {
                          const IconComponent = tab.icon;
                          return (
                            <IconComponent
                              size={16}
                              className="text-purple-300"
                            />
                          );
                        })()}
                        {tab.name}
                      </button>
                    );
                  })}
                </div>

                {/* Arrow Buttons */}
                <div className="ml-3 mr-4 md:mr-6 flex gap-3 shrink-0">
                  <button
                    onClick={prevTab}
                    className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center
                              rounded-full border border-purple-400/40
                              hover:bg-purple-600 hover:shadow-[0_0_10px_#a855f7]"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <button
                    onClick={nextTab}
                    className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center
                              rounded-full border border-purple-400/40
                              hover:bg-purple-600 hover:shadow-[0_0_10px_#a855f7]"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              {/* BOTTOM ROW - IMAGE LEFT, CONTENT RIGHT */}
              <div className="flex gap-6 lg:gap-8">
                {/* IMAGE - FIXED LEFT */}
                <div className="w-52 h-52 lg:w-64 lg:h-64 rounded-2xl overflow-hidden bg-gray-800 shrink-0">
                  {workshop.image && (
                    <img
                      src={workshop.image}
                      alt={workshop.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* CONTENT - RIGHT */}
                <div
                  className="transition-all duration-300 overflow-y-auto overflow-x-hidden text-left scrollbar-hide flex-1"
                  style={{ maxHeight: "50vh" }}
                >
                  <div className="space-y-2">
                    {renderTabContent(activeTab.key)}
                  </div>
                </div>
              </div>
            </div>

            {/* MOBILE/TABLET LAYOUT (below lg) */}
            <div className="lg:hidden flex flex-col">
              {/* Tab Header with Navigation */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={prevTab}
                  className="w-9 h-9 flex items-center justify-center
                            rounded-full border border-purple-400/40
                            hover:bg-purple-600 hover:shadow-[0_0_10px_#a855f7]"
                >
                  <ChevronLeft size={18} />
                </button>

                <div className="flex-1 text-center">
                  <h2 className="text-xl font-semibold text-purple-300">
                    {tabs[activeIndex]?.name}
                  </h2>
                </div>

                <button
                  onClick={nextTab}
                  className="w-9 h-9 flex items-center justify-center
                            rounded-full border border-purple-400/40
                            hover:bg-purple-600 hover:shadow-[0_0_10px_#a855f7]"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Content Area - Fixed Height with Internal Scrolling */}
              <div
                className="transition-all duration-300 overflow-y-auto overflow-x-hidden text-center scrollbar-hide"
                style={{ maxHeight: "50vh" }}
              >
                <div className="pr-4 min-w-0 flex flex-col items-center justify-center lg:items-start space-y-3">
                  {renderTabContent(activeTab.key)}
                </div>
              </div>
            </div>

            {/* REGISTRATION BUTTON - OUTSIDE CARD */}
            {workshop.registrationLink && (
              <motion.div
                className="mt-6 flex justify-center"
                variants={slideInFromLeftStaggered(0.5)}
                initial="hidden"
                animate="visible"
                custom={0}
              >
                <a
                  href={workshop.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 
                          bg-linear-to-r from-purple-600 to-fuchsia-500
                          px-6 md:px-8 py-3 md:py-4 rounded-full
                          shadow-[0_0_25px_#a855f7]
                          font-semibold tracking-wide text-sm md:text-base
                          hover:shadow-[0_0_35px_#a855f7] transition-all"
                >
                  <span>REGISTER NOW</span>
                  <ExternalLink size={18} />
                </a>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
