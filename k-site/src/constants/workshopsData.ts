import descIcon from "@/assets/workshop/svgs/description.svg";
import preIcon from "@/assets/workshop/svgs/Prerequisites.svg";
import conIcon from "@/assets/workshop/svgs/contact 2.svg";
import scIcon from "@/assets/workshop/svgs/shedule 2.svg";
import spIcon from "@/assets/workshop/svgs/speakers 1.svg";
import takIcon from "@/assets/workshop/svgs/takeways.svg";

export interface Speaker {
  logo: string;
}

export interface WorkshopSection {
  id: string;
  label: string;
  icon: string;
  content: string[] | string | Speaker[];
}

export interface Workshop {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  participants: string;
  date: string;
  days: number;
  dayLabel: string;
  fees: number;
  leftText: string;
  rightText: string;
  contactPhone: string;
  contactEmail: string;
  registrationLink: string;
  sections: WorkshopSection[];
}

export const WORKSHOPS_DATA: Workshop[] = [
  {
    id: "modern-aiml",
    slug: "modern-aiml",
    title: "Modern AIML: LLMs, GenAI & Future Technologies",
    subtitle: "Deep dive into AI and Generative AI",
    description:
      "Deep dive into modern AI/ML technologies including Large Language Models and Generative AI with hands-on experience.",
    image: "/Workshops/ModernAIML.webp",
    participants: "Individual",
    date: "March 7-8, 2026",
    days: 2,
    dayLabel: "SAT-SUN",
    fees: 799,
    leftText: "LARGE LANGUAGE MODELS",
    rightText: "GENERATIVE AI APPLICATIONS",
    contactPhone: "7010643624",
    contactEmail: "workshop@cegtechforum.in",
    registrationLink:
      "https://unstop.com/workshops-webinars/modern-aiml-llms-genai-future-technologies-kurukshetra-2026-anna-university-ceg-tech-forum-1632380",
    sections: [
      {
        id: "description",
        label: "Description",
        icon: descIcon,
        content:
          "Modern AIML workshop covering LLMs, Generative AI, and future technologies. Learn from industry experts about cutting-edge applications and implementations.",
      },
      {
        id: "prerequisites",
        label: "Prerequisites",
        icon: preIcon,
        content: [
          "Basic Python knowledge",
          "Understanding of ML fundamentals",
          "Laptop with required libraries",
        ],
      },
      {
        id: "speakers",
        label: "Speakers",
        icon: spIcon,
        content: [
          {
            logo: "/Workshops/IBM-Logo.jpg",
          },
        ],
      },
      {
        id: "takeaways",
        label: "Takeaways",
        icon: takIcon,
        content: [
          "Hands-on LLM experience",
          "GenAI implementation skills",
          "Certificate of participation",
        ],
      },
      {
        id: "schedule",
        label: "Schedule",
        icon: scIcon,
        content: [
          "Saturday (March 7): Ada Lavlace Audi, IT Department",
          "Sunday (March 8): X-Hall, EEE Department",
        ],
      },
      {
        id: "contact",
        label: "Contact",
        icon: conIcon,
        content: ["Navinesharan S: 7010643624"],
      },
    ],
  },
  // {
  //   id: "full-stack",
  //   slug: "full-stack",
  //   title: "Full Stack Development: From Interface to Infrastructure",
  //   subtitle: "Build complete web applications",
  //   description:
  //     "Build scalable full-stack systems with modern tools. Learn React, Node.js, databases, and deployment strategies.",
  //   image: "/Workshops/FullStack.webp",
  //   participants: "Individual",
  //   date: "March 7, 2026",
  //   days: 1,
  //   dayLabel: "SAT",
  //   fees: 599,
  //   leftText: "FRONTEND DEVELOPMENT",
  //   rightText: "BACKEND & DEPLOYMENT",
  //   contactPhone: "8870976210",
  //   contactEmail: "workshop@cegtechforum.in",
  //   registrationLink: "",
  //   sections: [
  //     {
  //       id: "description",
  //       label: "Description",
  //       icon: descIcon,
  //       content:
  //         "Comprehensive full-stack development workshop. Learn React for frontend, Node.js for backend, database design, authentication, and deployment strategies.",
  //     },
  //     {
  //       id: "prerequisites",
  //       label: "Prerequisites",
  //       icon: preIcon,
  //       content: [
  //         "JavaScript fundamentals",
  //         "HTML/CSS basics",
  //         "Laptop with Node.js",
  //       ],
  //     },
  //     {
  //       id: "speakers",
  //       label: "Speakers",
  //       icon: spIcon,
  //       content: [
  //         {
  //           logo: "/Workshops/HCL_logo.jpg",
  //         },
  //       ],
  //     },
  //     {
  //       id: "takeaways",
  //       label: "Takeaways",
  //       icon: takIcon,
  //       content: [
  //         "Full-stack project",
  //         "Deployment knowledge",
  //         "Best practices",
  //         "Certificate",
  //       ],
  //     },
  //     {
  //       id: "schedule",
  //       label: "Schedule",
  //       icon: scIcon,
  //       content: [
  //         "Ramanujan Hall, Mathematics Department",
  //         "Hall of Guines, Mechanical Department",
  //       ],
  //     },
  //     {
  //       id: "contact",
  //       label: "Contact",
  //       icon: conIcon,
  //       content: ["Janani S: 8870976210"],
  //     },
  //   ],
  // },
  {
    id: "ansys-apdl",
    slug: "ansys-apdl",
    title: "ANSYS APDL: A Practical Approach",
    subtitle: "Finite Element Analysis and Simulation",
    description:
      "Learn ANSYS APDL for advanced finite element analysis and simulation with practical applications.",
    image: "/Workshops/ANSYSAPDL.webp",
    participants: "Individual",
    date: "March 7-8, 2026",
    days: 2,
    dayLabel: "SAT-SUN",
    fees: 299,
    leftText: "FEA FUNDAMENTALS",
    rightText: "ADVANCED SIMULATION",
    contactPhone: "9944039984",
    contactEmail: "workshop@cegtechforum.in",
    registrationLink:
      "https://unstop.com/workshops-webinars/ansys-apdl-a-practical-approach-kurukshetra-2026-anna-university-ceg-guindy-1632428",
    sections: [
      {
        id: "description",
        label: "Description",
        icon: descIcon,
        content:
          "Practical ANSYS APDL workshop covering finite element analysis fundamentals, simulation techniques, and real-world engineering applications.",
      },
      {
        id: "prerequisites",
        label: "Prerequisites",
        icon: preIcon,
        content: [
          "Mechanical engineering basics",
          "CAD knowledge helpful",
          "Laptop access",
        ],
      },
      {
        id: "speakers",
        label: "Speakers",
        icon: spIcon,
        content: [
          {
            logo: "",
          },
        ],
      },
      {
        id: "takeaways",
        label: "Takeaways",
        icon: takIcon,
        content: [
          "ANSYS proficiency",
          "Simulation projects",
          "Practical experience",
          "Certificate",
        ],
      },
      {
        id: "schedule",
        label: "Schedule",
        icon: scIcon,
        content: ["Optimus Hall, Industrial Department"],
      },
      {
        id: "contact",
        label: "Contact",
        icon: conIcon,
        content: [
          "Sandiep Lakshman B A: 9944039984",
          "Jaya Sree Yadhav B: 9123593506",
        ],
      },
    ],
  },
  {
    id: "uas",
    slug: "uas",
    title: "Unmanned Aerial Systems (UAS): Design, Build & Applications",
    subtitle: "Drone technology and applications",
    description:
      "Comprehensive drone technology workshop covering design, assembly, programming, and real-world applications.",
    image: "/Workshops/UAS.webp",
    participants: "Individual",
    date: "March 8-9, 2026",
    days: 2,
    dayLabel: "SUN-MON",
    fees: 999,
    leftText: "DRONE DESIGN",
    rightText: "AUTONOMOUS OPERATIONS",
    contactPhone: "7397095005",
    contactEmail: "workshop@cegtechforum.in",
    registrationLink:
      "https://unstop.com/workshops-webinars/unmanned-aerial-systems-uas-design-build-applications-kurukshetra-2026-anna-university-ceg-guindy-1632748",
    sections: [
      {
        id: "description",
        label: "Description",
        icon: descIcon,
        content:
          "Comprehensive UAS workshop covering drone design, assembly, flight control programming, and real-world applications in various industries.",
      },
      {
        id: "prerequisites",
        label: "Prerequisites",
        icon: preIcon,
        content: [
          "Basic electronics knowledge",
          "Programming basics",
          "Team coordination skills",
        ],
      },
      {
        id: "speakers",
        label: "Speakers",
        icon: spIcon,
        content: [
          {
            logo: "/Workshops/flytutor.jpeg",
          },
        ],
      },
      {
        id: "takeaways",
        label: "Takeaways",
        icon: takIcon,
        content: [
          "Drone assembly skills",
          "Programming experience",
          "Real-world applications",
          "Certificate",
        ],
      },
      {
        id: "schedule",
        label: "Schedule",
        icon: scIcon,
        content: ["Tag Audi, Mechanical Department"],
      },
      {
        id: "contact",
        label: "Contact",
        icon: conIcon,
        content: ["Kavitha R: 7397095005", "Eshaanjana S: 7904059159"],
      },
    ],
  },
  {
    id: "fuelscape",
    slug: "fuelscape",
    title: "FuelScape: Hydrogen Fuel Cell",
    subtitle: "Sustainable energy solutions",
    description:
      "Explore hydrogen fuel cell technology and sustainable energy solutions with hands-on demonstrations.",
    image: "/Workshops/FuelScape.webp",
    participants: "Individual",
    date: "March 8-9, 2026",
    days: 2,
    dayLabel: "SUN-MON",
    fees: 299,
    leftText: "FUEL CELL TECHNOLOGY",
    rightText: "GREEN ENERGY SOLUTIONS",
    contactPhone: "8220541367",
    contactEmail: "workshop@cegtechforum.in",
    registrationLink:
      "https://unstop.com/workshops-webinars/fuelscape-hydrogen-fuel-cell-kurukshetra-2026-anna-university-ceg-tech-forum-1632438",
    sections: [
      {
        id: "description",
        label: "Description",
        icon: descIcon,
        content:
          "FuelScape workshop exploring hydrogen fuel cell technology, sustainable energy generation, and environmental impact of green energy solutions.",
      },
      {
        id: "prerequisites",
        label: "Prerequisites",
        icon: preIcon,
        content: [
          "Chemistry fundamentals",
          "Physics basics",
          "Environmental awareness",
        ],
      },
      {
        id: "speakers",
        label: "Speakers",
        icon: spIcon,
        content: [
          {
            logo: "/Workshops/ccm_logo.jpeg",
          },
        ],
      },
      {
        id: "takeaways",
        label: "Takeaways",
        icon: takIcon,
        content: [
          "Fuel cell understanding",
          "Hands-on demonstrations",
          "Sustainability insights",
          "Certificate",
        ],
      },
      {
        id: "schedule",
        label: "Schedule",
        icon: scIcon,
        content: ["H&M Hall, Mechanical Department"],
      },
      {
        id: "contact",
        label: "Contact",
        icon: conIcon,
        content: [
          "Naveena Bharathi T: 8220541367",
          "Diffrin Benu R: 8838310260",
        ],
      },
    ],
  },
  // {
  //   id: "niot",
  //   slug: "niot",
  //   title: "NIOT",
  //   subtitle: "National Institute of Ocean Technology",
  //   description:
  //     "Advanced marine and oceanographic technologies workshop with industry applications.",
  //   image: "/Workshops/NIOT.webp",
  //   participants: "Individual",
  //   date: "March 8-9, 2026",
  //   days: 2,
  //   dayLabel: "SUN-MON",
  //   fees: 699,
  //   leftText: "MARINE TECHNOLOGY",
  //   rightText: "OCEAN APPLICATIONS",
  //   contactPhone: "6369197954",
  //   contactEmail: "workshop@cegtechforum.in",
  //   registrationLink: "",
  //   sections: [
  //     {
  //       id: "description",
  //       label: "Description",
  //       icon: descIcon,
  //       content:
  //         "NIOT workshop covering advanced marine and oceanographic technologies, offshore engineering, and ocean resource management.",
  //     },
  //     {
  //       id: "prerequisites",
  //       label: "Prerequisites",
  //       icon: preIcon,
  //       content: [
  //         "Engineering fundamentals",
  //         "Interest in marine technology",
  //         "Technical aptitude",
  //       ],
  //     },
  //     {
  //       id: "speakers",
  //       label: "Speakers",
  //       icon: spIcon,
  //       content: [
  //         {
  //           logo: "/NIOT.png",
  //         },
  //       ],
  //     },
  //     {
  //       id: "takeaways",
  //       label: "Takeaways",
  //       icon: takIcon,
  //       content: [
  //         "Marine technology insights",
  //         "Industry exposure",
  //         "Research opportunities",
  //         "Certificate",
  //       ],
  //     },
  //     {
  //       id: "schedule",
  //       label: "Schedule",
  //       icon: scIcon,
  //       content: ["TBD"],
  //     },
  //     {
  //       id: "contact",
  //       label: "Contact",
  //       icon: conIcon,
  //       content: ["Shruthi N: 6369197954"],
  //     },
  //   ],
  // },
  {
    id: "live-qc",
    slug: "live-qc",
    title: "Live QC Tool: Real-Time Quality Control Systems",
    subtitle: "Industrial quality management",
    description:
      "Learn about real-time quality control systems and their applications in industrial settings.",
    image: "/Workshops/LiveQCTool.webp",
    participants: "Individual",
    date: "March 8-9, 2026",
    days: 2,
    dayLabel: "SUN-MON",
    fees: 399,
    leftText: "QC SYSTEMS",
    rightText: "INDUSTRIAL STANDARDS",
    contactPhone: "9597469681",
    contactEmail: "workshop@cegtechforum.in",
    registrationLink:
      "https://unstop.com/workshops-webinars/liveqc-tool-real-time-quality-control-systems-kurukshetra-2026-anna-university-ceg-guindy-1643160",
    sections: [
      {
        id: "description",
        label: "Description",
        icon: descIcon,
        content:
          "Live QC Tool workshop on real-time quality control systems, implementation strategies, and industrial best practices.",
      },
      {
        id: "prerequisites",
        label: "Prerequisites",
        icon: preIcon,
        content: [
          "Quality management basics",
          "Industrial experience helpful",
          "Technical knowledge",
        ],
      },
      {
        id: "speakers",
        label: "Speakers",
        icon: spIcon,
        content: [
          {
            logo: "/Workshops/LiveQC.png",
          },
        ],
      },
      {
        id: "takeaways",
        label: "Takeaways",
        icon: takIcon,
        content: [
          "QC tool proficiency",
          "Real-time monitoring skills",
          "Industry standards knowledge",
          "Certificate",
        ],
      },
      {
        id: "schedule",
        label: "Schedule",
        icon: scIcon,
        content: ["Paari Hall, Civil Department"],
      },
      {
        id: "contact",
        label: "Contact",
        icon: conIcon,
        content: ["R Tharun: 9597469681"],
      },
    ],
  },
  // {
  //   id: "startup",
  //   slug: "startup",
  //   title: "Startup",
  //   subtitle: "Entrepreneurship and business development",
  //   description:
  //     "Entrepreneurship and startup ecosystem workshop with industry experts and business mentorship.",
  //   image: "/Workshops/Startup.webp",
  //   participants: "Individual",
  //   date: "March 9, 2026",
  //   days: 1,
  //   dayLabel: "SUN",
  //   fees: 549,
  //   leftText: "STARTUP ECOSYSTEM",
  //   rightText: "BUSINESS STRATEGY",
  //   contactPhone: "9566238699",
  //   contactEmail: "workshop@cegtechforum.in",
  //   registrationLink: "",
  //   sections: [
  //     {
  //       id: "description",
  //       label: "Description",
  //       icon: descIcon,
  //       content:
  //         "Startup workshop covering entrepreneurship fundamentals, business planning, funding strategies, and real-world startup experiences.",
  //     },
  //     {
  //       id: "prerequisites",
  //       label: "Prerequisites",
  //       icon: preIcon,
  //       content: [
  //         "Business acumen",
  //         "Entrepreneurial spirit",
  //         "Problem-solving mindset",
  //       ],
  //     },
  //     {
  //       id: "speakers",
  //       label: "Speakers",
  //       icon: spIcon,
  //       content: [
  //         {
  //           logo: "/Workshops/Startup.jpg",
  //         },
  //       ],
  //     },
  //     {
  //       id: "takeaways",
  //       label: "Takeaways",
  //       icon: takIcon,
  //       content: [
  //         "Business planning skills",
  //         "Fundraising knowledge",
  //         "Mentorship access",
  //         "Certificate",
  //       ],
  //     },
  //     {
  //       id: "schedule",
  //       label: "Schedule",
  //       icon: scIcon,
  //       content: ["Seminar Hall, Power System, EEE Department"],
  //     },
  //     {
  //       id: "contact",
  //       label: "Contact",
  //       icon: conIcon,
  //       content: ["Anu V P: 9566238699", "Mohamed Shameer M: 6380652935"],
  //     },
  //   ],
  // },
  {
    id: "reverse-engineering",
    slug: "reverse-engineering",
    title: "Reverse Engineering: Engineering the Unknown",
    subtitle: "Understanding complex systems",
    description:
      "Learn reverse engineering techniques and methodologies for understanding complex systems.",
    image: "/Workshops/ReverseEngineering.webp",
    participants: "Individual",
    date: "March 7-8, 2026",
    days: 2,
    dayLabel: "SAT-SUN",
    fees: 549,
    leftText: "ANALYSIS TECHNIQUES",
    rightText: "SYSTEM UNDERSTANDING",
    contactPhone: "9160219080",
    contactEmail: "workshop@cegtechforum.in",
    registrationLink:
      "https://unstop.com/workshops-webinars/reverse-engineering-engineering-the-unknown-kurukshetra-2026-anna-university-ceg-guindy-1632435",
    sections: [
      {
        id: "description",
        label: "Description",
        icon: descIcon,
        content:
          "Reverse engineering workshop covering analysis techniques, system dissection, documentation, and understanding complex engineering systems.",
      },
      {
        id: "prerequisites",
        label: "Prerequisites",
        icon: preIcon,
        content: [
          "Engineering fundamentals",
          "Technical aptitude",
          "Problem-solving skills",
        ],
      },
      {
        id: "speakers",
        label: "Speakers",
        icon: spIcon,
        content: [
          {
            logo: "",
          },
        ],
      },
      {
        id: "takeaways",
        label: "Takeaways",
        icon: takIcon,
        content: [
          "Analysis skills",
          "Documentation methods",
          "System understanding",
          "Certificate",
        ],
      },
      {
        id: "schedule",
        label: "Schedule",
        icon: scIcon,
        content: ["Maxwell Hall, ECE Department"],
      },
      {
        id: "contact",
        label: "Contact",
        icon: conIcon,
        content: ["Sivabalan SS: 9160219080", "Dhivya Bharathi M: 7695809739"],
      },
    ],
  },
  {
    id: "gamesmiths",
    slug: "gamesmiths",
    title: "GameSmiths: Crafting Interactive Experiences Worldwide",
    subtitle: "Game development and design",
    description:
      "Game development workshop covering design, mechanics, and interactive experience creation.",
    image: "/Workshops/GameSmiths.webp",
    participants: "Individual",
    date: "March 7-9, 2026",
    days: 3,
    dayLabel: "SAT-MON",
    fees: 899,
    leftText: "GAME DESIGN",
    rightText: "INTERACTIVE DEVELOPMENT",
    contactPhone: "8122670372",
    contactEmail: "workshop@cegtechforum.in",
    registrationLink:
      "https://unstop.com/workshops-webinars/gamesmiths-crafting-interactive-experiences-worldwide-kurukshetra-2026-anna-university-ceg-guindy-1632440",
    sections: [
      {
        id: "description",
        label: "Description",
        icon: descIcon,
        content:
          "GameSmiths workshop covering game design principles, interactive experience creation, gameplay mechanics, and game development pipeline.",
      },
      {
        id: "prerequisites",
        label: "Prerequisites",
        icon: preIcon,
        content: [
          "Programming basics",
          "Creative thinking",
          "Laptop with game engine",
        ],
      },
      {
        id: "speakers",
        label: "Speakers",
        icon: spIcon,
        content: [
          {
            logo: "/Workshops/Gaming.png",
          },
        ],
      },
      {
        id: "takeaways",
        label: "Takeaways",
        icon: takIcon,
        content: [
          "Game development skills",
          "Design principles",
          "Prototype creation",
          "Certificate",
        ],
      },
      {
        id: "schedule",
        label: "Schedule",
        icon: scIcon,
        content: ["Turing Hall, CSE Department"],
      },
      {
        id: "contact",
        label: "Contact",
        icon: conIcon,
        content: ["Vishnu Dev A R: 8122670372"],
      },
    ],
  },
  {
    id: "cubecomm",
    slug: "cubecomm",
    title: "CubeComm: CubeSat & Antenna Systems in Action",
    subtitle: "Satellite systems and communications",
    description:
      "Explore CubeSat technology and antenna systems design with practical demonstrations.",
    image: "/Workshops/CubeComm.webp",
    participants: "Individual",
    date: "March 9, 2026",
    days: 1,
    dayLabel: "MON",
    fees: 499,
    leftText: "CUBESAT TECHNOLOGY",
    rightText: "ANTENNA SYSTEMS",
    contactPhone: "9042780835",
    contactEmail: "workshop@cegtechforum.in",
    registrationLink:
      "https://unstop.com/workshops-webinars/cubecomm-cubesat-antenna-systems-in-action-kurukshetra-2026-anna-university-ceg-tech-forum-1632443",
    sections: [
      {
        id: "description",
        label: "Description",
        icon: descIcon,
        content:
          "CubeComm workshop on CubeSat design, antenna systems, satellite communications, and practical space technology applications.",
      },
      {
        id: "prerequisites",
        label: "Prerequisites",
        icon: preIcon,
        content: [
          "Physics fundamentals",
          "Electronics basics",
          "Interest in space technology",
        ],
      },
      {
        id: "speakers",
        label: "Speakers",
        icon: spIcon,
        content: [
          {
            logo: "",
          },
        ],
      },
      {
        id: "takeaways",
        label: "Takeaways",
        icon: takIcon,
        content: [
          "CubeSat knowledge",
          "Antenna design skills",
          "Space tech insights",
          "Certificate",
        ],
      },
      {
        id: "schedule",
        label: "Schedule",
        icon: scIcon,
        content: ["Maxwell Hall, ECE Department"],
      },
      {
        id: "contact",
        label: "Contact",
        icon: conIcon,
        content: ["Sadhana S: 9042780835"],
      },
    ],
  },
];

/**
 * Get workshop by slug
 */
export function getWorkshopBySlug(slug: string): Workshop | undefined {
  return WORKSHOPS_DATA.find((workshop) => workshop.slug === slug);
}

/**
 * Get workshop by ID (for carousel)
 */
export function getWorkshopById(id: string): Workshop | undefined {
  return WORKSHOPS_DATA.find((workshop) => workshop.id === id);
}
