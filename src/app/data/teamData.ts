// src/app/data/teamData.ts
import { TeamMember } from "../components/TeamCard";

// Team member data with detailed information for software developers
export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Bach-Thi Dinh",
    role: "Manager",
    description:
      "Former developer turned visionary leader who seamlessly bridges technical expertise and management excellence. With deep roots in React and cloud technologies, Bach-Thi drives teams to deliver innovative solutions while maintaining a developer-first mindset. Her startup background brings agility and creative problem-solving to every project.",
    technologies: [
      "React",
      "Next.js",
      "AWS Cloud",
      "Project Management",
      "Agile Methodologies",
      "Startup Experience",
      "Team Leadership",
    ],
    image: "/team/thi.jpg",
  },

  {
    id: 3,
    name: "Svenja Wagner",
    role: "Senior Consultant",
    description:
      "Accomplished software architect with a passion for crafting elegant system designs. Svenja's expertise in content management systems and DevOps practices has transformed how clients manage digital experiences. Her technical leadership establishes robust foundations while mentoring teams to embrace best practices for scalable, maintainable solutions.",
    technologies: [
      "Software Architecture",
      "Spring Boot",
      "Bloomreach CMS",
      "DevOps",
      "Continuous Integration",
      "System Design",
      "Microservices",
    ],
    image: "/team/lars.jpg", // Using Lars's image as placeholder since Svenja's isn't listed
  },
  {
    id: 2,
    name: "Nic Schittenhelm",
    role: "Consultant",
    description:
      "Fullstack enthusiast with a keen eye for exceptional user experiences. Nic's diverse technical toolkit enables him to craft seamless solutions from backend architecture to polished frontend interfaces. His customer-centric approach ensures that technical excellence always translates to tangible business value and delightful user journeys.",
    technologies: [
      "Angular",
      "React",
      "Next.js",
      "Spring Boot",
      "AWS",
      "UX/UI Design",
      "Customer Experience",
      "Fullstack Development",
    ],
    image: "/team/nic.jpg",
  },
  {
    id: 4,
    name: "Hai-Mi Bui",
    role: "Student Trainee",
    description:
      "Rising talent balancing academic pursuits with practical software development expertise. Hai-Mi brings fresh perspectives and cutting-edge knowledge to every project. Her quick mastery of multiple frameworks and ability to adapt to different technical ecosystems makes her an invaluable team member. Passionate about creating applications that enhance customer experiences.",
    technologies: [
      "Python",
      "Angular",
      "Spring Boot",
      "Customer Experience",
      "Full Stack Development",
      "Data Visualization",
      "API Integration",
    ],
    image: "/team/hai_mi.jpg",
  },

  {
    id: 5,
    name: "Lars Newrzella",
    role: "Consultant",
    description:
      "Angular specialist who architects sophisticated frontend solutions while maintaining a strong grasp of backend technologies. Lars excels at containerization and orchestration, ensuring applications deploy seamlessly across environments. His holistic understanding of the development lifecycle enables him to create solutions that are both technically sound and operationally excellent.",
    technologies: [
      "Angular",
      "Spring Boot",
      "Docker",
      "Kubernetes",
      "CI/CD Pipelines",
      "Cloud Native",
      "Performance Optimization",
      "Microservices",
    ],
    image: "/team/lars.jpg",
  },
  {
    id: 6,
    name: "Marco Richter",
    role: "Senior Consultant",
    description:
      "Backend virtuoso with an impressive command of Java ecosystems and enterprise architectures. Marco's solutions combine rock-solid reliability with remarkable performance. While primarily focused on server-side excellence, his full-stack capabilities enable him to collaborate effectively across teams. Known for mentoring junior developers and raising the bar for code quality standards.",
    technologies: [
      "Java",
      "Spring Boot",
      "Angular",
      "Microservices",
      "RESTful APIs",
      "Database Design",
      "Enterprise Architecture",
      "Performance Tuning",
    ],
    image: "/team/marco.jpg",
  },
];
