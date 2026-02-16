import descIcon from "@/assets/workshop/svgs/description.svg";
import preIcon from "@/assets/workshop/svgs/Prerequisites.svg";
import conIcon from "@/assets/workshop/svgs/contact 2.svg";
import scIcon from "@/assets/workshop/svgs/shedule 2.svg";
import spIcon from "@/assets/workshop/svgs/speakers 1.svg";
import takIcon from "@/assets/workshop/svgs/takeways.svg";
import drone from "@/assets/workshop/Workshop_Images/Underwater_Drone.jpg";

export interface WorkshopSection {
  id: string;
  label: string;
  icon: string;
  content: string[] | string;
}

export interface Workshop {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
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
    id: "ibm",
    slug: "ibm-modern-aiml",
    title: "IBM WORKSHOP",
    subtitle: "Modern AIML: LLMs, GenAI & Future Technologies",
    description: "AI & GenAI focused workshop with industry exposure.",
    image: drone,
    participants: "Team (4-5 Members)",
    date: "FEB 15-16, 2025",
    days: 2,
    dayLabel: "SAT-SUN",
    fees: 799,
    leftText: "CYBER SECURITY, THREAT DEFENSE & DIGITAL WAR",
    rightText: "ARM ROBOTICS & CENTRALIZED CONTROL",
    contactPhone: "9876543210",
    contactEmail: "workshop@cegtechforum.in",
    registrationLink:
      "https://unstop.com/college-fests/kurukshetra-2026-anna-university-ceg-tech-forum-436664",
    sections: [
      {
        id: "description",
        label: "Description",
        icon: descIcon,
        content:
          "Dive into the fascinating world of Underwater Robotics in this hands-on workshop designed for enthusiasts and innovators! Explore the cutting-edge technology behind autonomous underwater vehicles (AUVs) and remotely operated vehicles (ROVs). Learn about their applications in marine exploration, environmental monitoring, and underwater rescue missions. Participants will gain insights into robotic design, buoyancy control, waterproofing, and sensor integration. Experience practical sessions on building and programming underwater robots, guided by industry experts. This workshop is perfect for students, engineers, and hobbyists eager to explore robotics in challenging aquatic environments. Unlock new possibilities beneath the waves and fuel your passion for innovation!",
      },
      {
        id: "prerequisites",
        label: "Prerequisites",
        icon: preIcon,
        content: [
          "Basic programming knowledge",
          "Familiarity with robotics concepts",
          "Laptop with Python installed",
          "Enthusiasm for hands-on learning",
        ],
      },
      {
        id: "speakers",
        label: "Speakers",
        icon: spIcon,
        content: [
          "Dr. Rajesh Kumar - AI/ML Expert, IBM",
          "Prof. Priya Singh - Robotics Lead, CEG",
          "Industry Practitioners from Azure Cloud Division",
        ],
      },
      {
        id: "takeaways",
        label: "Takeaways",
        icon: takIcon,
        content: [
          "Hands-on experience with underwater robotics assembly",
          "Understanding of AUV/ROV control systems",
          "Certificate of participation",
          "Industry connections and mentorship",
          "Access to exclusive resource materials",
        ],
      },
      {
        id: "schedule",
        label: "Schedule",
        icon: scIcon,
        content: [
          "Day 1 (Feb 15): 10:00 AM - 01:00 PM - Introduction & Hardware Setup",
          "Day 2 (Feb 16): 10:00 AM - 01:00 PM - Programming & Integration",
        ],
      },
      {
        id: "contact",
        label: "Contact",
        icon: conIcon,
        content: ["Workshop Coordinator: 9876543210", "Email: workshop@cegtechforum.in"],
      },
    ],
  },
  {
    id: "fullstack",
    slug: "full-stack-development",
    title: "FULL STACK DEVELOPMENT",
    subtitle: "From Interface to Infrastructure",
    description: "Build scalable full-stack systems with modern tools.",
    image: drone,
    participants: "Individual",
    date: "FEB 15, 2025",
    days: 1,
    dayLabel: "SAT",
    fees: 599,
    leftText: "MODERN WEB TECHNOLOGIES",
    rightText: "CLOUD & DEPLOYMENT",
    contactPhone: "9876543211",
    contactEmail: "fullstack@cegtechforum.in",
    registrationLink:
      "https://unstop.com/college-fests/kurukshetra-2026-anna-university-ceg-tech-forum-436664",
    sections: [
      {
        id: "description",
        label: "Description",
        icon: descIcon,
        content:
          "Deep dive into modern web development covering React, Node.js, databases, authentication, deployment, and scalable architecture patterns. Build production-ready applications from scratch.",
      },
      {
        id: "prerequisites",
        label: "Prerequisites",
        icon: preIcon,
        content: [
          "JavaScript fundamentals",
          "Basic HTML/CSS knowledge",
          "Laptop with Node.js installed",
          "Code editor (VS Code recommended)",
        ],
      },
      {
        id: "speakers",
        label: "Speakers",
        icon: spIcon,
        content: [
          "Amit Patel - Full Stack Developer, Google",
          "Neha Desai - DevOps Engineer, Amazon",
          "Startup CTO from leading Indian tech startup",
        ],
      },
      {
        id: "takeaways",
        label: "Takeaways",
        icon: takIcon,
        content: [
          "Complete full-stack project template",
          "Best practices and design patterns",
          "Deployment strategies and CI/CD knowledge",
          "Certificate and GitHub portfolio boost",
          "Job referral opportunities",
        ],
      },
      {
        id: "schedule",
        label: "Schedule",
        icon: scIcon,
        content: [
          "Saturday (Feb 15): 09:00 AM - 05:00 PM - Full workshop with breaks",
          "Includes lunch and networking session",
        ],
      },
      {
        id: "contact",
        label: "Contact",
        icon: conIcon,
        content: [
          "Tech Lead: 9876543211",
          "Email: fullstack@cegtechforum.in",
        ],
      },
    ],
  },
  {
    id: "drone",
    slug: "drone-systems",
    title: "DRONE SYSTEMS",
    subtitle: "Unmanned Aerial Systems (UAS)",
    description: "Hands-on drone assembly, control systems, and real-world UAV case studies.",
    image: drone,
    participants: "Team (2-4 Members)",
    date: "FEB 16-17, 2025",
    days: 2,
    dayLabel: "SUN-MON",
    fees: 999,
    leftText: "AUTONOMOUS FLIGHT CONTROL",
    rightText: "AERIAL ROBOTICS",
    contactPhone: "9876543212",
    contactEmail: "drone@cegtechforum.in",
    registrationLink:
      "https://unstop.com/college-fests/kurukshetra-2026-anna-university-ceg-tech-forum-436664",
    sections: [
      {
        id: "description",
        label: "Description",
        icon: descIcon,
        content:
          "Comprehensive drone technology workshop covering assembly, programming, flight control systems, and autonomous navigation. Learn from industry experts about UAS design, sensor integration, and real-world applications.",
      },
      {
        id: "prerequisites",
        label: "Prerequisites",
        icon: preIcon,
        content: [
          "Physics fundamentals (basics of flight)",
          "Programming knowledge (Python/C++ helpful)",
          "Team coordination skills",
          "Safety awareness",
        ],
      },
      {
        id: "speakers",
        label: "Speakers",
        icon: spIcon,
        content: [
          "Rohit Sharma - Drone Systems Engineer, DJI",
          "Lt. Col (Retd) Vikram Singh - Defense UAV Specialist",
          "Startup founders from drone delivery startups",
        ],
      },
      {
        id: "takeaways",
        label: "Takeaways",
        icon: takIcon,
        content: [
          "Hands-on drone assembly and calibration",
          "Flight programming experience",
          "Autonomous navigation implementation",
          "Team certificate",
          "Drone pilot certification guidance",
        ],
      },
      {
        id: "schedule",
        label: "Schedule",
        icon: scIcon,
        content: [
          "Day 1 (Feb 16): 09:00 AM - 05:00 PM - Assembly and Basics",
          "Day 2 (Feb 17): 10:00 AM - 04:00 PM - Programming and Flight",
        ],
      },
      {
        id: "contact",
        label: "Contact",
        icon: conIcon,
        content: [
          "Robotics Lead: 9876543212",
          "Email: drone@cegtechforum.in",
        ],
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
