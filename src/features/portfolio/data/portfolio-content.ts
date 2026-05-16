import type {

  AboutContent,

  ContactLink,

  EducationItem,

  ExperienceItem,

  HomeAnchorItem,

  NavItem,

  ProjectItem,

  SiteConfig,

  SkillGroup,

  SocialLink,

  StatItem,

} from "@/features/portfolio/types/portfolio";



const projectAssetFolders = {

  portfolio: "project_1",

  yolov8: "project_2",

  pos: "project_3",

  photobooth: "project_4",

} as const;



export const siteConfig: SiteConfig = {

  name: "Joshua Mark Castillo",

  role: "Jr. Full Stack Developer",

  tagline:

    "Building scalable web applications for innovation and process automation.",

  location: "On-site or Remote",

  email: "joshuamarkcastillo0319@gmail.com",

  shortBio:

    "Computer Engineering student with a passion for full stack development, focused on building scalable web applications that drive innovation and process automation.",

  longBio:

    "I am a Computer Engineering student with a strong passion for full stack development. My focus is on building scalable web applications that drive innovation and process automation. I am dedicated to continuously learning and applying new technologies to create efficient and impactful solutions in the field of software development.",

  availability:

    "Available for full-time opportunities. Open to remote, hybrid, or collaborative work environments.",

  resumeUrl: "/resume/joshua-mark-castillo-resume.pdf",

  profileImageSrc: "/assets/profile/joshua-mark-castillo-profile.jpg",

  logoMarkSrc: "/assets/brand/logo-mark.svg",

  logoWordmarkSrc: "/assets/brand/logo-wordmark.svg",

  logoFullSrc: "/assets/brand/logo-full.svg",

  faviconSourceSrc: "/assets/brand/favicon-source.svg",

  githubUsername: "JshMarkCastillo-GHdev",

  repoAllowlist: [

    "https://github.com/JshMarkCastillo-GHdev/yolov8-webApp-reactVite",

    "https://github.com/JshMarkCastillo-GHdev/sys-pos-system",

  ],

};



export const navigationItems: NavItem[] = [

  { href: "/", label: "Home" },

  { href: "/projects", label: "Projects" },

  { href: "/experience", label: "Experience" },

  { href: "/contact", label: "Contact" },

];



export const homeAnchorItems: HomeAnchorItem[] = [

  { href: "/#about", label: "About" },

  { href: "/#skills", label: "Skills" },

];



export const socialLinks: SocialLink[] = [

  {

    label: "GitHub",

    href: "https://github.com/JshMarkCastillo-GHdev",

    value: "JshMarkCastillo-GHdev",

  },

  {

    label: "LinkedIn",

    href: "https://www.linkedin.com/in/castillo-joshua-mark-76b0b4370/",

    value: "LinkedIn Profile: Joshua Mark Castillo",

  },

  {

    label: "Email",

    href: "mailto:joshuamarkcastillo0319@gmail.com",

    value: "joshuamarkcastillo0319@gmail.com",

  },

];



export const contactLinks: ContactLink[] = [

  {

    label: "GitHub",

    href: "https://github.com/JshMarkCastillo-GHdev",

    value: "https://github.com/JshMarkCastillo-GHdev",

    helperText:

      "Joshua Mark Castillo - GitHub Profile showcasing repositories, contributions, and activity.",

    icon: "github",

  },

  {

    label: "Email",

    href: "mailto:joshuamarkcastillo0319@gmail.com",

    value: "joshuamarkcastillo0319@gmail.com",

    helperText:

      "Joshua Mark Castillo - Email contact for professional inquiries.",

    icon: "email",

  },

  {

    label: "Indeed",

    href: "https://www.indeed.com/your-profile",

    value: "Joshua Mark Castillo - Indeed Profile",

    helperText:

      "Joshua Mark Castillo - Indeed Profile showcasing work history, skills, and endorsements.",

    icon: "briefcase",

  },

  {

    label: "Resume",

    href: "/resume/joshua-mark-castillo-resume.pdf",

    value: "Download Resume",

    helperText:

      "Joshua Mark Castillo - Resume highlighting education, experience, skills, and projects relevant to full stack development roles.",

    icon: "resume",

  },

];



export const heroStats: StatItem[] = [

  { label: "Focus", value: "Intelligent Automation with secure practices" },

  {

    label: "Workflow",

    value:

      "Streamlining development processes for efficient project delivery and collaboration",

  },

  {

    label: "Stack",

    value:

      "Modern web development stack with a focus on performance and scalability",

  },

];



export const aboutContent: AboutContent = {

  techJourney:

    "I chose Full Stack Development to eliminate tiring processes and become one of the stepping stones to full automations.",

  softSkills: [

    "Team Communication",

    "Project Collaboration",

    "Critical Problem Solving",

    "Proper Escalation",

    "Technical Documentation",

    "Client-focused Communication",

    "Technical to Non-Technical Translation",

  ],

  hobbies: ["Game Development", "Anime Streaming"],

  profilePlaceholder: {

    label: "Profile Photo",

    caption:

      "Recommended path: /assets/profile/joshua-mark-castillo-profile.jpg (1:1, 1200x1200 preferred)",

  },

};



export const skillGroups: SkillGroup[] = [

  {

    title: "Frontend",

    icon: "frontend",

    description:

      "Building responsive interfaces with modern React tooling and a clean component workflow.",

    items: [

      "NextJS Turbopack",

      "ReactJS",

      "TypeScript",

      "TailwindCSS",

      "ShadcnUI",

    ],

  },

  {

    title: "Backend",

    icon: "backend",

    description:

      "Comfortable with server-side JavaScript for building APIs, integrations, and application logic.",

    items: ["NodeJS"],

  },

  {

    title: "Databases",

    icon: "databases",

    description:

      "Familiar with relational and document-oriented data stacks for structured and flexible application data.",

    items: ["Prisma + PostgreSQL", "Mongoose + MongoDB"],

  },

  {

    title: "Tools",

    icon: "tools",

    description:

      "Daily tools that support API testing, collaboration, version control, and documentation.",

    items: ["Swagger", "Postman", "Git", "GitHub", "REST APIs"],

  },

  {

    title: "Deployment",

    icon: "deployment",

    description:

      "Comfortable shipping and maintaining applications on modern hosting platforms.",

    items: ["Vercel", "Render", "Hostinger"],

  },

  {

    title: "Agents familiar with",

    icon: "agents",

    description:

      "AI-assisted development tools I am familiar with for code generation and workflow acceleration.",

    items: ["Cursor", "Codex"],

  },

];



export const featuredProjects: ProjectItem[] = [

  {

    slug: "project_1",

    title: "Full Stack Developer Portfolio",

    summary:

      "Developer portfolio built with Next.js App Router, Turbopack, React, TypeScript, Tailwind CSS, and shadcn/ui.",

    description:

      "This developer portfolio presents skills, projects, experience, and contact information in a clean and modern interface. It uses Next.js App Router for navigation, Turbopack for performance, React and TypeScript for the frontend, Tailwind CSS for styling, and shadcn/ui for polished components. The result is a professional online presence focused on clarity, maintainability, and practical presentation of technical work.",

    techStack: [

      "Next.js App Router",

      "Turbopack",

      "React",

      "TypeScript",

      "Tailwind CSS",

      "shadcn/ui",

    ],

    coverImageSrc: `/assets/projects/${projectAssetFolders.portfolio}/cover.png`,

    screenshotImageSrcs: [

      `/assets/projects/${projectAssetFolders.portfolio}/screen-01.png`,

      `/assets/projects/${projectAssetFolders.portfolio}/screen-02.png`,

    ],

    screenshotPlaceholder: {

      label: "Screenshots",

      caption: `Recommended directory: /assets/projects/${projectAssetFolders.portfolio}/ (16:10, 1600x1000 preferred)`,

    },

    repoUrl: "https://github.com/JshMarkCastillo-GHdev/sys-dev-portf",

    liveUrl: "https://joshua-fs-dev.vercel.app/",

    imageHint: "[ Replace with real info: Screenshot style hint ]",

    featured: true,

    githubRepo: "sys-dev-portf",

    highlights: [

      "Clean and modern design with sections for about me, skills, projects, experience, education, and contact information.",

      "Linked GitHub repositories for each project with a focus on showcasing code quality and project structure.",

      "showcases a variety of projects with detailed descriptions, tech stacks, and highlights to demonstrate versatility and expertise.",

    ],

  },

  {

    slug: "project_2",

    title: "YoloV8 App with React/Vite",

    summary:

      "License plate for a YoloV8 object detection web application built with React and Vite.",

    description:

      "Showcase License plate detection capabilities of the YoloV8 model in a web application built with React and Vite. This project demonstrates the integration of a powerful object detection model into a user-friendly interface, allowing users to upload images and see real-time license plate detection results. The application is optimized for performance and responsiveness, making use of Vite's fast development server and React's efficient rendering capabilities.",

    techStack: [

      "React",

      "Vite",

      "YoloV8",

      "ONNX Runtime Web",

      "Tailwind CSS",

      "DaisyUI",

      "Tesseract.js",

    ],

    coverImageSrc: `/assets/projects/${projectAssetFolders.yolov8}/cover.png`,

    screenshotImageSrcs: [

      `/assets/projects/${projectAssetFolders.yolov8}/screen-01.png`,

      `/assets/projects/${projectAssetFolders.yolov8}/screen-02.png`,

    ],

    screenshotPlaceholder: {

      label: "Screenshots",

      caption: `Recommended directory: /assets/projects/${projectAssetFolders.yolov8}/ (16:10, 1600x1000 preferred)`,

    },

    repoUrl: "https://github.com/JshMarkCastillo-GHdev/yolov8-webApp-reactVite",

    liveUrl: "https://licenseplaterecogwebapp.vercel.app/",

    imageHint: "[ Replace with real info: Screenshot style hint ]",

    featured: true,

    githubRepo: "yolov8-webApp-reactVite",

    highlights: [

      "Real-time license plate detection using the YoloV8 model integrated into a React application.",

      "ONNX Runtime Web for efficient model inference directly in the browser, ensuring fast and responsive user experience.",

      "Run AI models in the browser with ONNX Runtime Web, eliminating the need for server-side processing and enabling instant results.",

    ],

  },

  {

    slug: "project_3",

    title: "Point-of-Sale Generic System",

    summary:

      "Point-of-sale system built with Next.js, Prisma, PostgreSQL, NextAuth, Tailwind CSS, and shadcn/ui.",

    description:

      "This point-of-sale system focuses on product management, sales processing, and secure user access in a clean operational interface. It uses Next.js for routing and rendering, Prisma with PostgreSQL for data management, NextAuth for authentication, Tailwind CSS for styling, and shadcn/ui for polished interface components. The project demonstrates how a structured full stack build can support real business workflows with maintainable architecture.",

    techStack: [

      "Next.js",

      "Turbopack",

      "TypeScript",

      "Prisma + PostgreSQL",

      "NextAuth",

      "Tailwind CSS",

      "shadcn/ui",

    ],

    coverImageSrc: `/assets/projects/${projectAssetFolders.pos}/cover.png`,

    screenshotImageSrcs: [

      `/assets/projects/${projectAssetFolders.pos}/screen-01.png`,

      `/assets/projects/${projectAssetFolders.pos}/screen-02.png`,

    ],

    screenshotPlaceholder: {

      label: "Screenshots",

      caption: `Recommended directory: /assets/projects/${projectAssetFolders.pos}/ (16:10, 1600x1000 preferred)`,

    },

    repoUrl: "https://github.com/JshMarkCastillo-GHdev/sys-pos-system",

    liveUrl: "https://your-live-project-url.example",

    imageHint: "[ Replace with real info: Screenshot style hint ]",

    featured: false,

    githubRepo: "sys-pos-system",

    highlights: [

      "Clean and intuitive interface for managing products, processing sales, and handling user authentication.",

      "Role-based access control with NextAuth, allowing for secure authentication and authorization for different user types (e.g., admin, cashier).",

      "Comprehensive product management features, including adding, editing, and deleting products, as well as inventory tracking and sales reporting capabilities.",

    ],

  },

  {

    slug: "project_4",

    title: "Photobooth Application",

    summary:

      "Interactive photobooth application for capturing photos with custom overlays, filters, and instant sharing capabilities.",

    description:

      "A modern photobooth application designed for events and parties, featuring real-time camera capture, customizable photo frames and overlays, filter effects, and instant digital sharing. Built with a focus on smooth user experience and high-quality image processing for memorable event experiences.",

    techStack: [

      "React",

      "TypeScript",

      "Next.js",

      "Tailwind CSS",

      "shadcn/ui",

      "Camera API",

    ],

    coverImageSrc: `/assets/projects/${projectAssetFolders.photobooth}/cover.png`,

    screenshotImageSrcs: [

      `/assets/projects/${projectAssetFolders.photobooth}/screen-01.png`,

      `/assets/projects/${projectAssetFolders.photobooth}/screen-02.png`,

    ],

    screenshotPlaceholder: {

      label: "Screenshots",

      caption: `Recommended directory: /assets/projects/${projectAssetFolders.photobooth}/ (16:10, 1600x1000 preferred)`,

    },

    repoUrl: "https://github.com/JshMarkCastillo-GHdev/photobotth",

    liveUrl: "https://your-live-project-url.example",

    imageHint: "[ Replace with real info: Screenshot style hint ]",

    featured: false,

    highlights: [

      "Real-time camera capture with browser Camera API integration for seamless photo taking experience.",

      "Customizable photo frames and overlays to match event themes and branding requirements.",

      "Filter effects and image enhancement options for high-quality photo output suitable for sharing.",

    ],

  },

];



export const experienceItems: ExperienceItem[] = [

  {

    id: "industry-template-1-remote",

    company: "Datamatics Global Services",

    role: "IT Support Intern",

    duration: "2024 to 2025",

    location: "Pasig City Ortigas Center, Philippines",

    summary:

      "Provided technical support and troubleshooting for hardware and software issues, ensuring smooth IT operations and user satisfaction.",

    responsibilities: [

      "Provided technical support for hardware and software issues, including troubleshooting and resolving problems to ensure smooth IT operations.",

      "Assisted in the maintenance and setup of computer systems, including installing and configuring software, updating systems, and ensuring security protocols were followed.",

      "Collaborated with the IT team to identify and implement improvements in support processes, contributing to increased efficiency and user satisfaction.",

    ],

  },

  {

    id: "industry-template-1-hybrid",

    company: "Freelance Full Stack Developer",

    role: "Jr. Full Stack Developer",

    duration: "Current",

    location: "Remote",

    summary:

      "Building and maintaining web applications for clients, utilizing a full stack development skill set to deliver high-quality solutions that meet client needs and enhance user experience.",

    responsibilities: [

      "Developed and maintained web applications using a full stack development approach, ensuring high performance, scalability, and responsiveness.",

      "Collaborated with clients to gather requirements, provide technical insights, and deliver solutions that align with their business goals and enhance user experience.",

      "Implemented best practices in coding, testing, and deployment to ensure the reliability and maintainability of applications, while continuously learning and adapting to new technologies and industry trends.",

    ],

  },

];



export const educationItems: EducationItem[] = [

  {

    id: "education-template-1-urs-morong",

    degree: "Computer Engineering",

    institution: "University of Rizal System Morong",

    duration: "2021 to 2025",

    summary:

      "Pursuing a degree in Computer Engineering, gaining a strong foundation in computer science principles, programming, and hardware knowledge, while actively engaging in projects and coursework that enhance technical skills and prepare for a career in full stack development.",

    details: [

      "Computer Engineering from University of Rizal System Morong",

      "Parking Allocation System with Artificial Intelligence for License Plate Recognition using YoloV8 and EasyOCR",

    ],

  },

];

