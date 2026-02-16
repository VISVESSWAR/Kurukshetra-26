export interface WorkshopDetail {
  title: string;
  description: string;
  image: string;
  participation: string;
  rounds?: string[];
  rules?: string[];
  prize?: string[];
  schedule?: string[];
  contact?: string[];
  registrationLink?: string;
}

export const WORKSHOP_DETAILS: Record<string, WorkshopDetail> = {
  "IBM WORKSHOP": {
    title: "IBM WORKSHOP",
    description:
      "AI & GenAI focused workshop with industry exposure. Deep dive into modern AI/ML technologies with hands-on experience.",
    participation: "Individual",
    image: "/workshops/ibm-workshop.webp",
    rounds: [
      "Session 1: Modern AIML, LLMs & GenAI Fundamentals",
      "Session 2: Future Technologies & Industry Applications",
    ],
    rules: [
      "Pre-registration required",
      "Bring your own laptop",
      "Active participation mandatory",
      "Organizer decisions are final",
    ],
    schedule: [
      "Day 1: February 15, 2026, 10:00 AM - 01:00 PM - CEG Campus",
      "Day 2: February 16, 2026, 10:00 AM - 01:00 PM - CEG Campus",
    ],
    contact: [
      "Workshop Coordinator - 9876543210",
      "info@cegtechforum.in",
    ],
    prize: ["Certificate of Participation", "Industry Recognition"],
    registrationLink:
      "https://unstop.com/college-fests/kurukshetra-2026-anna-university-ceg-tech-forum-436664",
  },
  "FULL STACK DEVELOPMENT": {
    title: "FULL STACK DEVELOPMENT",
    description:
      "Build scalable full-stack systems with modern tools. Deep dive into React, Node.js, databases, authentication, and deployment.",
    participation: "Individual",
    image: "/workshops/fullstack-development.webp",
    rounds: [
      "Module 1: Frontend Development with React",
      "Module 2: Backend with Node.js & Databases",
      "Module 3: Deployment & Scalability",
    ],
    rules: [
      "Basic programming knowledge required",
      "Bring laptop with Node.js installed",
      "Follow code of conduct",
      "No external aids during practical sessions",
    ],
    schedule: [
      "Saturday: February 15, 2026, 09:00 AM - 05:00 PM - CEG Campus",
    ],
    contact: [
      "Tech Lead - 9876543211",
      "fullstack@cegtechforum.in",
    ],
    prize: ["Certificate", "GitHub Repository Template"],
    registrationLink:
      "https://unstop.com/college-fests/kurukshetra-2026-anna-university-ceg-tech-forum-436664",
  },
  "DRONE SYSTEMS": {
    title: "DRONE SYSTEMS",
    description:
      "Comprehensive drone technology workshop covering assembly, programming, flight control systems, and autonomous navigation.",
    participation: "Team (2-4 Members)",
    image: "/workshops/drone-systems.webp",
    rounds: [
      "Part 1: Drone Assembly & Hardware Setup",
      "Part 2: Flight Control Programming",
      "Part 3: Autonomous Navigation & Real-world Applications",
    ],
    rules: [
      "Participants must follow safety guidelines",
      "No modifications to provided equipment",
      "Respect airspace restrictions",
      "Team coordination mandatory",
    ],
    schedule: [
      "Sunday: February 16, 2026, 09:00 AM - 05:00 PM - CEG Campus Sports Ground",
      "Monday: February 17, 2026, 10:00 AM - 04:00 PM - CEG Campus",
    ],
    contact: [
      "Robotics Lead - 9876543212",
      "drone@cegtechforum.in",
    ],
    prize: ["Certificate", "Drone Programming Kit"],
    registrationLink:
      "https://unstop.com/college-fests/kurukshetra-2026-anna-university-ceg-tech-forum-436664",
  },
  "UNDERWATER ROBOTICS": {
    title: "UNDERWATER ROBOTICS",
    description:
      "Dive into the fascinating world of Underwater Robotics. Explore autonomous underwater vehicles, ROVs, and their applications in marine exploration.",
    participation: "Team (4-5 Members)",
    image: "/workshops/underwater-robotics.webp",
    rounds: [
      "Round 1: AUV & ROV Design Fundamentals",
      "Round 2: Buoyancy & Waterproofing Techniques",
      "Round 3: Sensor Integration & Programming",
    ],
    rules: [
      "Team members must attend all sessions",
      "Safety equipment must be worn during practical sessions",
      "Respect marine safety protocols",
      "All designs must be original or properly credited",
    ],
    schedule: [
      "Saturday: February 15, 2026, 09:00 AM - 05:00 PM",
      "Sunday: February 16, 2026, 09:00 AM - 05:00 PM",
    ],
    contact: [
      "Aquatic Robotics Lead - 9876543213",
      "underwater@cegtechforum.in",
    ],
    prize: ["Team Certificate", "Robotics Kit Discount Voucher"],
    registrationLink:
      "https://unstop.com/college-fests/kurukshetra-2026-anna-university-ceg-tech-forum-436664",
  },
};