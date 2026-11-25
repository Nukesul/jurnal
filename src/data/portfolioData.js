export const PROFILE = {
  name: "Nursultan Mustapaev",
  role: "Full Stack Developer",
  status: "Open to internships and part-time work",
  summary:
    "Student developer in Japan. I build web and mobile products from database to interface: a café platform with an API, a website and a mobile app, plus smaller React projects.",
  heroDescription:
    "I build web and mobile products end to end: NestJS and PostgreSQL on the back, Next.js and React Native on the front.",
  about: [
    "I am a student in Maebashi, Japan, and a full stack developer.",
    "My biggest project is Cafe Platform: a NestJS and PostgreSQL API, a Next.js website for guests and venue owners, and an Expo mobile app in three languages.",
    "I also build smaller React apps on Supabase, and I am working toward a career in security.",
  ],
  focus: "Web and mobile products, with an interest in security",
  email: "nursutanmusa007@gmail.com",
  github: "https://github.com/Nukesul",
};

export const HERO_TECH = ["React", "Next.js", "NestJS", "PostgreSQL", "React Native", "Docker"];

export const TECH_UNIVERSE = [
  {
    group: "Frontend",
    angle: 0,
    items: [
      { name: "React", detail: "Component-driven UI for fast, interactive interfaces." },
      { name: "Next.js", detail: "App Router websites with server rendering and SEO files." },
      { name: "TypeScript", detail: "Typed code that keeps larger codebases reliable." },
    ],
  },
  {
    group: "Mobile",
    angle: 72,
    items: [
      { name: "React Native", detail: "One codebase for iOS and Android apps." },
      { name: "Expo", detail: "Builds, releases and an APK workflow for the café app." },
    ],
  },
  {
    group: "Backend",
    angle: 144,
    items: [
      { name: "NestJS", detail: "Structured Node.js API with sessions-based auth." },
      { name: "Node.js", detail: "JavaScript runtime for server logic and scripts." },
      { name: "Python", detail: "Scripting and small services." },
    ],
  },
  {
    group: "Database",
    angle: 216,
    items: [
      { name: "PostgreSQL", detail: "Relational data for orders, menus and venues." },
      { name: "Prisma", detail: "Typed database access and migrations." },
      { name: "Supabase", detail: "Hosted Postgres, auth and storage with row level security." },
    ],
  },
  {
    group: "DevOps",
    angle: 288,
    items: [
      { name: "Docker", detail: "Containers for running the API and database." },
      { name: "GitHub Actions", detail: "Workflows for deploys and builds." },
      { name: "Git", detail: "Version control for tracking and collaborating on code." },
    ],
  },
];

export const SKILLS = [
  {
    title: "Frontend Development",
    description: "Interfaces that feel fast, responsive and considered.",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vite"],
  },
  {
    title: "Mobile Development",
    description: "Cross-platform apps with several languages and release builds.",
    items: ["React Native", "Expo", "EAS builds"],
  },
  {
    title: "Backend Development",
    description: "APIs with authentication, validation and a real database.",
    items: ["NestJS", "Node.js", "REST API", "Python"],
  },
  {
    title: "Database",
    description: "Schemas, migrations and access rules.",
    items: ["PostgreSQL", "Prisma", "Supabase", "Row Level Security"],
  },
  {
    title: "DevOps & Tooling",
    description: "Reproducible setups and automated checks.",
    items: ["Docker", "GitHub Actions", "Git", "ESLint"],
  },
];

export const PROJECTS = [
  {
    id: "01",
    title: "Cafe Platform",
    description:
      "A marketplace where guests find cafés, read menus and order, and venue owners run their café from a cabinet. One API serves the website and the mobile app.",
    tech: ["NestJS", "Prisma", "PostgreSQL", "Next.js", "Expo", "Docker"],
    features: ["REST API with sessions auth", "Owner cabinet and admin moderation", "Kyrgyz, English and Russian", "Private repositories"],
  },
  {
    id: "02",
    title: "Memoris",
    description:
      "A memory book for a class of 20 people from 8 countries. Each person has a cabinet with a portrait, photos, texts and notes to classmates.",
    tech: ["React 19", "Vite", "Supabase", "GitHub Pages"],
    features: ["Demo mode without a backend", "Photo storage", "Access rules in SQL", "Automated deploy"],
    link: "https://github.com/Nukesul/memory",
  },
  {
    id: "03",
    title: "Craft Menu",
    description:
      "A café menu site with a protected admin panel to manage categories, products, size variants and photos.",
    tech: ["React", "Tailwind CSS", "Supabase"],
    features: ["Supabase Auth login", "Row Level Security policies", "Image upload", "Routing test"],
    link: "https://github.com/Nukesul/Craft",
  },
  {
    id: "04",
    title: "Noor Quran",
    description:
      "A calm Quran reading app built from a written roadmap, with a design brief where every screen and animation has a purpose.",
    tech: ["Expo", "React Native", "TypeScript"],
    features: ["Docs-driven roadmap", "Reader feature", "In development"],
    link: "https://github.com/Nukesul/noor-quran",
  },
];

export const JOURNEY = [
  {
    year: "Web",
    title: "Frontend foundations",
    items: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    year: "Apps",
    title: "Supabase products",
    items: ["Memoris", "Craft Menu", "Supabase"],
  },
  {
    year: "Platform",
    title: "Cafe Platform",
    items: ["NestJS", "Prisma", "PostgreSQL", "Next.js", "Expo"],
  },
  {
    year: "Next",
    title: "Security",
    items: ["Web security", "Ethical hacking"],
  },
];

export const PRINCIPLES = [
  { title: "Clean Code", description: "Writing maintainable and readable code." },
  { title: "Problem Solving", description: "Finding efficient solutions." },
  { title: "Architecture", description: "Creating scalable applications." },
  { title: "User Experience", description: "Building interfaces people enjoy using." },
];

export const GITHUB_STATS = [
  { label: "Repositories", value: "50+" },
  { label: "Main project", value: "Cafe Platform" },
  { label: "Profile", value: "Nukesul" },
];

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Universe", href: "#universe" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];
