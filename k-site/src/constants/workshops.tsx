export interface WorkshopDetail {
  title: string;
  description: string;
  image: string;
  participation: string;
  fees: string | number;
  venue: string;
  rounds?: string[];
  rules?: string[];
  prize?: string[];
  schedule?: string[];
  contact?: string[];
  registrationLink?: string;
}

export const WORKSHOP_DETAILS: Record<string, WorkshopDetail> = {
  "MODERN AIML": {
    title: "Modern AIML: LLMs, GenAI & Future Technologies",
    description:
      "Deep dive into modern AI/ML technologies including Large Language Models and Generative AI with hands-on experience and future applications.",
    participation: "Individual",
    image: "https://drive.google.com/file/d/1MqjBWXywra_tpg4lvdnJpw80ftseQa34/view?usp=drive_link",
    fees: 799,
    venue: "Ada Lavlace Audi, IT Department & X-Hall, EEE Department",
    schedule: [
      "Saturday: February 7, 2026 - Ada Lavlace Audi, IT Department",
      "Sunday: February 8, 2026 - X-Hall, EEE Department",
    ],
    contact: ["Navinesharan S - 7010643624"],
    registrationLink: "",
  },
  "FULL STACK DEVELOPMENT": {
    title: "Full Stack Development: From Interface to Infrastructure",
    description:
      "Build scalable full-stack systems with modern tools. Learn React, Node.js, databases, and deployment strategies.",
    participation: "Individual",
    image: "https://drive.google.com/file/d/10_W-b5WW3lSBYYWf-c255RPPYyL1SydH/view?usp=drive_link",
    fees: 599,
    venue: "Ramanujan Hall, Mathematics Department & Hall of Guines, Mechanical Department",
    schedule: ["Saturday: February 7, 2026"],
    contact: ["Janani S - 8870976210"],
    registrationLink: "",
  },
  "ANSYS APDL": {
    title: "ANSYS APDL: A Practical Approach",
    description:
      "Learn ANSYS APDL for advanced finite element analysis and simulation with practical applications.",
    participation: "Individual",
    image: "",
    fees: 299,
    venue: "Optimus Hall, Industrial Department",
    schedule: [
      "Saturday: February 7, 2026",
      "Sunday: February 8, 2026",
    ],
    contact: [
      "Sandiep Lakshman B A - 9944039984",
      "Jaya Sree Yadhav B - 9123593506",
    ],
    registrationLink: "",
  },
  "UNMANNED AERIAL SYSTEMS": {
    title: "Unmanned Aerial Systems (UAS): Design, Build & Applications",
    description:
      "Comprehensive drone technology workshop covering design, assembly, programming, and real-world applications.",
    participation: "Individual",
    image: "https://drive.google.com/file/d/1Q22DAlnlD29bCqBvAEjCg-v5gOXQuSx6/view?usp=drive_link",
    fees: 999,
    venue: "Tag Audi, Mechanical Department",
    schedule: [
      "Sunday: February 8, 2026",
      "Monday: February 9, 2026",
    ],
    contact: [
      "Kavitha R - 7397095005",
      "Eshaanjana S - 7904059159",
    ],
    registrationLink: "",
  },
  "FUELSCAPE": {
    title: "FuelScape: Hydrogen Fuel Cell",
    description:
      "Explore hydrogen fuel cell technology and sustainable energy solutions with hands-on demonstrations.",
    participation: "Individual",
    image: "https://drive.google.com/file/d/16VE2tFi_erHvC95GLnxZeud-KxrXWXFK/view?usp=drive_link",
    fees: 299,
    venue: "H&M Hall, Mechanical Department",
    schedule: [
      "Sunday: February 8, 2026",
      "Monday: February 9, 2026",
    ],
    contact: [
      "Naveena Bharathi T - 8220541367",
      "Diffrin Benu R - 8838310260",
    ],
    registrationLink: "https://drive.google.com/file/d/1AhaKmG_iZtk3NTimZ3UlbpFM_DEm-dZ-/view?usp=drivesdk",
  },
  "NIOT": {
    title: "NIOT",
    description:
      "National Institute of Ocean Technology workshop on advanced marine and oceanographic technologies.",
    participation: "Individual",
    image: "",
    fees: 699,
    venue: "TBD",
    schedule: [
      "Sunday: February 8, 2026",
      "Monday: February 9, 2026",
    ],
    contact: ["Shruthi N - 6369197954"],
    registrationLink: "",
  },
  "LIVE QC TOOL": {
    title: "Live QC Tool: Real-Time Quality Control Systems",
    description:
      "Learn about real-time quality control systems and their applications in industrial settings.",
    participation: "Individual",
    image: "https://drive.google.com/file/d/1yCyLssaIFkqB7mFyzc5JVPbdCNY8qEpM/view?usp=drive_link",
    fees: 399,
    venue: "Paari Hall, Civil Department",
    schedule: [
      "Sunday: February 8, 2026",
      "Monday: February 9, 2026",
    ],
    contact: ["R Tharun - 9597469681"],
    registrationLink: "",
  },
  "STARTUP": {
    title: "Startup",
    description:
      "Entrepreneurship and startup ecosystem workshop with industry experts and business mentorship.",
    participation: "Individual",
    image: "",
    fees: "499/599",
    venue: "Seminar Hall, Power System, EEE Department",
    schedule: ["Sunday: February 9, 2026"],
    contact: [
      "Anu V P - 9566238699",
      "Mohamed Shameer M - 6380652935",
    ],
    registrationLink: "",
  },
  "REVERSE ENGINEERING": {
    title: "Reverse Engineering: Engineering the Unknown",
    description:
      "Learn reverse engineering techniques and methodologies for understanding complex systems.",
    participation: "Individual",
    image: "",
    fees: 549,
    venue: "Maxwell Hall, ECE Department",
    schedule: [
      "Saturday: February 7, 2026",
      "Sunday: February 8, 2026",
    ],
    contact: [
      "Sivabalan SS - 9160219080",
      "Dhivya Bharathi M - 7695809739",
    ],
    registrationLink: "",
  },
  "GAMESMITHS": {
    title: "GameSmiths: Crafting Interactive Experiences Worldwide",
    description:
      "Game development workshop covering design, mechanics, and interactive experience creation.",
    participation: "Individual",
    image: "https://drive.google.com/file/d/12B-Q2DoqraxuEIses2lRzONI74VzpfOl/view?usp=drivesdk",
    fees: 899,
    venue: "Turing Hall, CSE Department",
    schedule: [
      "Saturday: February 7, 2026",
      "Sunday: February 8, 2026",
      "Monday: February 9, 2026",
    ],
    contact: ["Vishnu Dev A R - 8122670372"],
    registrationLink: "",
  },
  "CUBECOMM": {
    title: "CubeComm: CubeSat & Antenna Systems in Action",
    description:
      "Explore CubeSat technology and antenna systems design with practical demonstrations.",
    participation: "Individual",
    image: "",
    fees: 499,
    venue: "Maxwell Hall, ECE Department",
    schedule: ["Monday: February 9, 2026"],
    contact: ["Sadhana S - 9042780835"],
    registrationLink: "https://drive.google.com/file/d/1d9JmQ48db11nlOfG-lAPcdGuDEW1fgFn/view?usp=drivesdk",
  },
};