import type { Service, Project, Testimonial, Demo } from "@/types";

export const services: Service[] = [
  {
    id: "web-dev",
    title: "Custom Web Development",
    description: "Handcrafted web applications built for performance, scalability, and exceptional user experience.",
    icon: "Globe",
    features: ["Next.js & React", "TypeScript", "Performance-first", "SEO optimized"],
    category: "Development",
  },
  {
    id: "saas",
    title: "SaaS Platforms",
    description: "Full-featured SaaS products with auth, billing, multi-tenancy, and everything enterprise demands.",
    icon: "Layers",
    features: ["Multi-tenant architecture", "Auth & billing", "Usage analytics", "API-first"],
    category: "Product",
  },
  {
    id: "dashboards",
    title: "Dashboards & Analytics",
    description: "Data-dense executive dashboards and analytics platforms that turn raw data into clear decisions.",
    icon: "BarChart3",
    features: ["Real-time data", "Custom charts", "Drill-down views", "Export & reports"],
    category: "Analytics",
  },
  {
    id: "ecommerce",
    title: "Ecommerce Solutions",
    description: "Premium storefronts and commerce platforms designed to convert at every touchpoint.",
    icon: "ShoppingBag",
    features: ["Headless commerce", "Cart & checkout", "Inventory management", "Analytics"],
    category: "Commerce",
  },
  {
    id: "frontend-arch",
    title: "Frontend Architecture",
    description: "Strategic design of scalable, maintainable frontend systems for engineering teams of any size.",
    icon: "Code2",
    features: ["Component systems", "Design tokens", "Monorepo setup", "CI/CD pipelines"],
    category: "Architecture",
  },
  {
    id: "uiux",
    title: "UI/UX Systems",
    description: "Comprehensive design systems and component libraries that ensure consistency at scale.",
    icon: "Palette",
    features: ["Design tokens", "Storybook", "Accessibility", "Documentation"],
    category: "Design",
  },
  {
    id: "prototypes",
    title: "Interactive Prototypes",
    description: "High-fidelity interactive prototypes that communicate product vision with precision.",
    icon: "Zap",
    features: ["Framer prototypes", "User testing ready", "Stakeholder demos", "Fast iteration"],
    category: "Design",
  },
  {
    id: "consulting",
    title: "Digital Product Consulting",
    description: "Strategic guidance on product roadmap, technical decisions, and team structure for digital products.",
    icon: "Target",
    features: ["Tech audits", "Roadmap planning", "Team mentoring", "Architecture review"],
    category: "Strategy",
  },
  {
    id: "performance",
    title: "Performance Optimization",
    description: "Deep performance engineering to bring Core Web Vitals to green and keep them there.",
    icon: "Gauge",
    features: ["Core Web Vitals", "Bundle optimization", "CDN strategy", "Caching layers"],
    category: "Engineering",
  },
  {
    id: "web-apps",
    title: "Modern Web Applications",
    description: "Rich, interactive web apps with real-time features, offline support, and native-like experiences.",
    icon: "Monitor",
    features: ["PWA support", "Real-time sync", "Offline mode", "Push notifications"],
    category: "Development",
  },
];

export const demos: Demo[] = [
  {
    id: "ecommerce",
    title: "Luxe — Premium Ecommerce",
    description: "A high-end fashion and tech store with animated product cards, cart, and checkout flow.",
    slug: "ecommerce",
    category: "Commerce",
    tags: ["Ecommerce", "Fashion", "Cart", "Checkout"],
    techStack: ["Next.js", "TypeScript", "Framer Motion", "Zustand"],
    thumbnail: "/demos/ecommerce.jpg",
  },
  {
    id: "restaurant",
    title: "Saveur — Restaurant & Delivery",
    description: "Modern restaurant ordering platform with menu browsing, cart, and order tracking.",
    slug: "restaurant",
    category: "Food & Beverage",
    tags: ["Restaurant", "Food", "Ordering", "Delivery"],
    techStack: ["Next.js", "TypeScript", "Framer Motion"],
    thumbnail: "/demos/restaurant.jpg",
  },
  {
    id: "crm",
    title: "Nexus — CRM & Sales Dashboard",
    description: "Enterprise CRM with Kanban pipeline, analytics charts, and lead management.",
    slug: "crm",
    category: "B2B SaaS",
    tags: ["CRM", "Dashboard", "Sales", "Analytics"],
    techStack: ["Next.js", "TypeScript", "Recharts", "Zustand"],
    thumbnail: "/demos/crm.jpg",
  },
  {
    id: "booking",
    title: "Aura — Booking System",
    description: "Elegant appointment booking for clinics, gyms, and service businesses.",
    slug: "booking",
    category: "Scheduling",
    tags: ["Booking", "Calendar", "Appointments", "Scheduling"],
    techStack: ["Next.js", "TypeScript", "Framer Motion"],
    thumbnail: "/demos/booking.jpg",
  },
  {
    id: "erp",
    title: "Apex — ERP & Financial Analytics",
    description: "Premium financial operations dashboard with KPIs, charts, and transaction management.",
    slug: "erp",
    category: "Enterprise",
    tags: ["ERP", "Finance", "Analytics", "Dashboard"],
    techStack: ["Next.js", "TypeScript", "Recharts", "Zustand"],
    thumbnail: "/demos/erp.jpg",
  },
];

export const projects: Project[] = demos.map((demo) => ({
  id: demo.id,
  title: demo.title,
  description: demo.description,
  category: demo.category,
  tags: demo.tags,
  techStack: demo.techStack,
  demoSlug: demo.slug,
  thumbnail: demo.thumbnail,
  featured: true,
  year: 2024,
}));

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "VP of Product",
    company: "Meridian Health",
    avatar: "SC",
    content:
      "Development Consulting delivered a SaaS platform that exceeded every expectation. The attention to UX detail and performance was remarkable — our users noticed immediately.",
    rating: 5,
  },
  {
    id: "2",
    name: "Marcus Rivera",
    role: "CTO",
    company: "Orbital Systems",
    avatar: "MR",
    content:
      "We brought them in to rebuild our frontend architecture. They turned a legacy codebase into a system our team is proud to work in. Performance improved by 3x.",
    rating: 5,
  },
  {
    id: "3",
    name: "Priya Nair",
    role: "Founder",
    company: "Strata Commerce",
    avatar: "PN",
    content:
      "The ecommerce platform they built for us converted 40% better than our previous solution. Every micro-interaction was considered. Truly world-class work.",
    rating: 5,
  },
];

export const techStack = [
  "Next.js", "React", "TypeScript", "Tailwind CSS",
  "Framer Motion", "Node.js", "PostgreSQL", "Supabase",
  "Vercel", "AWS", "Figma", "Storybook",
];
