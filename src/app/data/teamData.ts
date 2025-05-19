// src/app/data/teamData.ts
import { TeamMember } from "../components/TeamCard";

// Team member data with detailed information for software developers
export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "CTO & Founder",
    description:
      "Veteran software architect with 15+ years of experience building scalable cloud solutions. Passionate about mentoring and maintaining technical excellence across projects.",
    technologies: [
      "AWS",
      "Kubernetes",
      "Terraform",
      "Go",
      "Python",
      "System Design",
      "Microservices",
    ],
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Samantha Davis",
    role: "Lead Frontend Engineer",
    description:
      "Frontend specialist focused on creating exceptional user experiences. Champions accessibility and performance optimizations across all our web applications.",
    technologies: [
      "React",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Jest",
      "Cypress",
      "GraphQL",
      "Redux",
    ],
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Jordan Lee",
    role: "UX/UI Design Lead",
    description:
      "Combines design thinking with technical knowledge to create intuitive interfaces. Leads our design system implementation and ensures consistent UI patterns.",
    technologies: [
      "Figma",
      "Adobe Creative Suite",
      "Framer",
      "CSS Animation",
      "Design Systems",
      "Frontend Development",
    ],
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 4,
    name: "Morgan Taylor",
    role: "Backend Architect",
    description:
      "Database and API expert who builds robust server-side solutions. Specializes in optimizing performance and ensuring security throughout our infrastructure.",
    technologies: [
      "Node.js",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Docker",
      "FastAPI",
      "Python",
      "Java",
      "Serverless",
    ],
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: 5,
    name: "Cameron Rivera",
    role: "DevOps Engineer",
    description:
      "Infrastructure and automation wizard who maintains our deployment pipelines. Ensures continuous integration and delivery with a focus on security and reliability.",
    technologies: [
      "Azure",
      "Jenkins",
      "GitHub Actions",
      "Ansible",
      "Docker",
      "Kubernetes",
      "Prometheus",
      "Grafana",
    ],
    image: "https://randomuser.me/api/portraits/women/90.jpg",
  },
  {
    id: 6,
    name: "Jamie Quinn",
    role: "Mobile Development Lead",
    description:
      "Cross-platform mobile expert crafting native-feeling applications. Advocates for code sharing strategies and performance optimizations across mobile platforms.",
    technologies: [
      "React Native",
      "Swift",
      "Kotlin",
      "Firebase",
      "Redux",
      "Mobile UI/UX",
      "Offline-First Development",
    ],
    image: "https://randomuser.me/api/portraits/men/40.jpg",
  },
];
