import type { Service, Project, Testimonial, Demo } from "@/types";

export const services: Service[] = [
  {
    id: "web-dev",
    title: "Desenvolvimento Web Personalizado",
    description:
      "Aplicações web artesanais criadas para performance, escalabilidade e experiência do usuário excepcional.",
    icon: "Globe",
    features: [
      "Next.js & React",
      "TypeScript",
      "Performance em primeiro lugar",
      "Otimizado para SEO",
    ],
    category: "Development",
  },
  {
    id: "saas",
    title: "Plataformas SaaS",
    description:
      "Produtos SaaS completos com autenticação, cobrança, multi-tenancy e tudo que o enterprise exige.",
    icon: "Layers",
    features: [
      "Arquitetura multi-tenant",
      "Autenticação e cobrança",
      "Analytics de uso",
      "API-first",
    ],
    category: "Product",
  },
  {
    id: "dashboards",
    title: "Dashboards e Analytics",
    description:
      "Dashboards executivos repletos de dados que transformam informações brutas em decisões claras.",
    icon: "BarChart3",
    features: [
      "Dados em tempo real",
      "Gráficos personalizados",
      "Visões detalhadas",
      "Exportação e relatórios",
    ],
    category: "Analytics",
  },
  {
    id: "ecommerce",
    title: "Soluções de E-commerce",
    description:
      "Lojas virtuais e plataformas de comércio premium projetadas para converter em cada ponto de contato.",
    icon: "ShoppingBag",
    features: [
      "Comércio headless",
      "Carrinho e checkout",
      "Gestão de estoque",
      "Analytics",
    ],
    category: "Commerce",
  },
  {
    id: "frontend-arch",
    title: "Arquitetura Frontend",
    description:
      "Design estratégico de sistemas frontend escaláveis e sustentáveis para equipes de qualquer tamanho.",
    icon: "Code2",
    features: [
      "Sistemas de componentes",
      "Design tokens",
      "Configuração monorepo",
      "Pipelines CI/CD",
    ],
    category: "Architecture",
  },
  {
    id: "uiux",
    title: "Sistemas UI/UX",
    description:
      "Sistemas de design e bibliotecas de componentes abrangentes que garantem consistência em escala.",
    icon: "Palette",
    features: ["Design tokens", "Storybook", "Acessibilidade", "Documentação"],
    category: "Design",
  },
  {
    id: "prototypes",
    title: "Protótipos Interativos",
    description:
      "Protótipos interativos de alta fidelidade que comunicam a visão do produto com precisão.",
    icon: "Zap",
    features: [
      "Protótipos em Framer",
      "Pronto para testes com usuários",
      "Demos para stakeholders",
      "Iteração rápida",
    ],
    category: "Design",
  },
  {
    id: "consulting",
    title: "Consultoria de Produto Digital",
    description:
      "Orientação estratégica em roadmap de produto, decisões técnicas e estrutura de equipe.",
    icon: "Target",
    features: [
      "Auditorias técnicas",
      "Planejamento de roadmap",
      "Mentoria de equipe",
      "Revisão de arquitetura",
    ],
    category: "Strategy",
  },
  {
    id: "performance",
    title: "Otimização de Performance",
    description:
      "Engenharia de performance para levar os Core Web Vitals ao verde e mantê-los lá.",
    icon: "Gauge",
    features: [
      "Core Web Vitals",
      "Otimização de bundle",
      "Estratégia de CDN",
      "Camadas de cache",
    ],
    category: "Engineering",
  },
  {
    id: "web-apps",
    title: "Aplicações Web Modernas",
    description:
      "Aplicações web ricas e interativas com funcionalidades em tempo real e experiências nativas.",
    icon: "Monitor",
    features: [
      "Suporte a PWA",
      "Sincronização em tempo real",
      "Modo offline",
      "Notificações push",
    ],
    category: "Development",
  },
];

export const demos: Demo[] = [
  {
    id: "ecommerce",
    title: "Luxe — E-commerce Premium",
    description:
      "Uma loja de moda e tecnologia premium com cards de produto animados, carrinho e fluxo de checkout.",
    slug: "ecommerce",
    category: "Comércio",
    tags: ["E-commerce", "Moda", "Carrinho", "Checkout"],
    techStack: ["Next.js", "TypeScript", "Framer Motion", "Zustand"],
    thumbnail: "/demos/ecommerce.jpg",
  },
  {
    id: "restaurant",
    title: "CAIS — Cardápio & Delivery",
    description:
      "Cardápio digital e delivery premium com dois modos: menu visual de restaurante e pedido com carrinho em tempo real.",
    slug: "restaurant",
    category: "Gastronomia",
    tags: ["Restaurante", "Delivery", "Cardápio", "UX"],
    techStack: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    thumbnail: "/demos/restaurant.jpg",
  },
  {
    id: "crm",
    title: "Nexus — CRM & Dashboard de Vendas",
    description:
      "CRM empresarial com pipeline Kanban, gráficos de analytics e gestão de leads.",
    slug: "crm",
    category: "B2B SaaS",
    tags: ["CRM", "Dashboard", "Vendas", "Analytics"],
    techStack: ["Next.js", "TypeScript", "Recharts", "Zustand"],
    thumbnail: "/demos/crm.jpg",
  },
  {
    id: "booking",
    title: "Aura — Sistema de Agendamento",
    description:
      "Agendamento elegante para clínicas, academias e prestadores de serviço.",
    slug: "booking",
    category: "Agendamento",
    tags: ["Agendamento", "Calendário", "Consultas", "Agenda"],
    techStack: ["Next.js", "TypeScript", "Framer Motion"],
    thumbnail: "/demos/booking.jpg",
  },
  {
    id: "erp",
    title: "Apex — ERP & Analytics Financeiro",
    description:
      "Dashboard premium de operações financeiras com KPIs, gráficos e gestão de transações.",
    slug: "erp",
    category: "Enterprise",
    tags: ["ERP", "Finanças", "Analytics", "Dashboard"],
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
    role: "VP de Produto",
    company: "Meridian Health",
    avatar: "SC",
    content:
      "A Development Consulting entregou uma plataforma SaaS que superou todas as expectativas. A atenção ao detalhe de UX e performance foi notável — nossos usuários perceberam imediatamente.",
    rating: 5,
  },
  {
    id: "2",
    name: "Marcus Rivera",
    role: "CTO",
    company: "Orbital Systems",
    avatar: "MR",
    content:
      "Contratamos a equipe para reconstruir nossa arquitetura frontend. Eles transformaram um código legado em um sistema pelo qual nosso time se orgulha. A performance melhorou 3x.",
    rating: 5,
  },
  {
    id: "3",
    name: "Priya Nair",
    role: "Fundadora",
    company: "Strata Commerce",
    avatar: "PN",
    content:
      "A plataforma de e-commerce que construíram para nós converteu 40% melhor que a solução anterior. Cada micro-interação foi considerada. Trabalho verdadeiramente de classe mundial.",
    rating: 5,
  },
];

export const techStack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Node.js",
  "PostgreSQL",
  "Supabase",
  "Vercel",
  "AWS",
  "Figma",
  "Storybook",
];
