export type Locale = "pt" | "en" | "es";

export const localeNames: Record<Locale, string> = {
  pt: "Português",
  en: "English",
  es: "Español",
};

export const localeFlags: Record<Locale, string> = {
  pt: "🇧🇷",
  en: "🇺🇸",
  es: "🇪🇸",
};

// ─── Translation dictionary ───────────────────────────────────
export const translations = {
  // ── Navbar ──────────────────────────────────────────────────
  nav: {
    about:     { pt: "Sobre",      en: "About",     es: "Nosotros" },
    services:  { pt: "Serviços",   en: "Services",  es: "Servicios" },
    portfolio: { pt: "Portfólio",  en: "Portfolio", es: "Portafolio" },
    demos:     { pt: "Demos",      en: "Demos",     es: "Demos" },
    viewWork:  { pt: "Ver Trabalhos", en: "View Work", es: "Ver Trabajos" },
    getInTouch:{ pt: "Fale Conosco", en: "Get in Touch", es: "Contáctenos" },
  },

  // ── Footer ───────────────────────────────────────────────────
  footer: {
    tagline:   {
      pt: "Experiências de software premium e soluções digitais para empresas que exigem o melhor.",
      en: "Premium software experiences and digital solutions for companies that demand the best.",
      es: "Experiencias de software premium y soluciones digitales para empresas que exigen lo mejor.",
    },
    company:   { pt: "Empresa",   en: "Company",  es: "Empresa" },
    services:  { pt: "Serviços",  en: "Services", es: "Servicios" },
    demos:     { pt: "Demos",     en: "Demos",    es: "Demos" },
    copyright: { pt: "Todos os direitos reservados.", en: "All rights reserved.", es: "Todos los derechos reservados." },
    // Footer nav labels
    webDev:          { pt: "Desenvolvimento Web",    en: "Web Development",       es: "Desarrollo Web" },
    saas:            { pt: "Plataformas SaaS",        en: "SaaS Platforms",        es: "Plataformas SaaS" },
    uiux:            { pt: "Design UI/UX",            en: "UI/UX Design",          es: "Diseño UI/UX" },
    frontendArch:    { pt: "Arquitetura Frontend",    en: "Frontend Architecture", es: "Arquitectura Frontend" },
    perfOpt:         { pt: "Otimização de Performance", en: "Performance Optimization", es: "Optimización de Rendimiento" },
    ecommerce:       { pt: "Ecommerce",               en: "Ecommerce",             es: "Ecommerce" },
    restaurant:      { pt: "Restaurante",             en: "Restaurant",            es: "Restaurante" },
    crm:             { pt: "CRM Dashboard",           en: "CRM Dashboard",         es: "CRM Dashboard" },
    booking:         { pt: "Sistema de Agendamento",  en: "Booking System",        es: "Sistema de Reservas" },
    erp:             { pt: "ERP / Financeiro",        en: "ERP / Finance",         es: "ERP / Finanzas" },
  },

  // ── Hero ─────────────────────────────────────────────────────
  hero: {
    eyebrow:   { pt: "Estúdio de engenharia de software premium", en: "Premium software engineering studio", es: "Estudio de ingeniería de software premium" },
    line1:     { pt: "Experiências de software", en: "Premium software", es: "Experiencias de software" },
    line2:     { pt: "premium e soluções",        en: "experiences and",  es: "premium y soluciones" },
    line3:     { pt: "digitais excepcionais",     en: "digital solutions", es: "digitales excepcionales" },
    sub:       {
      pt: "Projetamos e desenvolvemos aplicações web, plataformas SaaS e produtos digitais de nível mundial para empresas que se recusam a ser comuns.",
      en: "We design and engineer world-class web applications, SaaS platforms, and digital products for companies that refuse to settle for ordinary.",
      es: "Diseñamos y desarrollamos aplicaciones web, plataformas SaaS y productos digitales de clase mundial para empresas que se niegan a ser ordinarias.",
    },
    cta1:      { pt: "Ver Nosso Trabalho",  en: "View Our Work",   es: "Ver Nuestro Trabajo" },
    cta2:      { pt: "Iniciar um Projeto",  en: "Start a Project", es: "Iniciar un Proyecto" },
    stat1l:    { pt: "Projetos Entregues",  en: "Projects Delivered", es: "Proyectos Entregados" },
    stat2l:    { pt: "Satisfação do Cliente", en: "Client Satisfaction", es: "Satisfacción del Cliente" },
    stat3l:    { pt: "Anos de Excelência",  en: "Years of Excellence",  es: "Años de Excelencia" },
    stat4l:    { pt: "Especialistas",        en: "Team Specialists",      es: "Especialistas" },
  },

  // ── Services Preview ─────────────────────────────────────────
  servicesPreview: {
    eyebrow:  { pt: "O que Fazemos",  en: "What We Do",  es: "Lo Que Hacemos" },
    headline1:{ pt: "Criado para empresas que",   en: "Built for companies that",    es: "Creado para empresas que" },
    headline2:{ pt: "exigem o melhor",             en: "demand the best",             es: "exigen lo mejor" },
    sub:      {
      pt: "Somos especialistas em todo o espectro do desenvolvimento de produtos digitais modernos — de interfaces perfeitas a arquiteturas backend escaláveis.",
      en: "We specialize in the full spectrum of modern digital product development — from pixel-perfect interfaces to scalable backend architecture.",
      es: "Nos especializamos en todo el espectro del desarrollo de productos digitales modernos — desde interfaces perfectas hasta arquitecturas backend escalables.",
    },
    viewAll:  { pt: "Ver todos os serviços", en: "View all services", es: "Ver todos los servicios" },
    // Service names
    s1title:  { pt: "Desenvolvimento Web Personalizado",  en: "Custom Web Development",   es: "Desarrollo Web Personalizado" },
    s1desc:   { pt: "Aplicações web artesanais criadas para performance, escalabilidade e experiência do usuário excepcional.", en: "Handcrafted web applications built for performance, scalability, and exceptional user experience.", es: "Aplicaciones web artesanales creadas para rendimiento, escalabilidad y experiencia de usuario excepcional." },
    s2title:  { pt: "Plataformas SaaS",                   en: "SaaS Platforms",            es: "Plataformas SaaS" },
    s2desc:   { pt: "Produtos SaaS completos com autenticação, cobrança, multi-tenancy e tudo que o enterprise exige.", en: "Full-featured SaaS products with auth, billing, multi-tenancy, and everything enterprise demands.", es: "Productos SaaS completos con autenticación, facturación, multi-tenancy y todo lo que la empresa exige." },
    s3title:  { pt: "Dashboards e Analytics",             en: "Dashboards & Analytics",    es: "Dashboards y Analytics" },
    s3desc:   { pt: "Dashboards executivos repletos de dados que transformam informações brutas em decisões claras.", en: "Data-dense executive dashboards that turn raw data into clear, actionable decisions.", es: "Dashboards ejecutivos repletos de datos que transforman información en decisiones claras." },
    s4title:  { pt: "Soluções de E-commerce",             en: "Ecommerce Solutions",       es: "Soluciones de E-commerce" },
    s4desc:   { pt: "Lojas virtuais e plataformas de comércio premium projetadas para converter em cada ponto de contato.", en: "Premium storefronts and commerce platforms designed to convert at every touchpoint.", es: "Tiendas y plataformas de comercio premium diseñadas para convertir en cada punto de contacto." },
    s5title:  { pt: "Arquitetura Frontend",               en: "Frontend Architecture",     es: "Arquitectura Frontend" },
    s5desc:   { pt: "Design estratégico de sistemas frontend escaláveis e sustentáveis para equipes de qualquer tamanho.", en: "Strategic design of scalable, maintainable frontend systems for engineering teams of any size.", es: "Diseño estratégico de sistemas frontend escalables y mantenibles para equipos de cualquier tamaño." },
    s6title:  { pt: "Sistemas UI/UX",                     en: "UI/UX Systems",             es: "Sistemas UI/UX" },
    s6desc:   { pt: "Sistemas de design e bibliotecas de componentes abrangentes que garantem consistência em escala.", en: "Comprehensive design systems and component libraries that ensure consistency at scale.", es: "Sistemas de diseño y bibliotecas de componentes integrales que garantizan consistencia a escala." },
  },

  // ── Demos Preview ────────────────────────────────────────────
  demosPreview: {
    eyebrow:  { pt: "Portfólio Interativo", en: "Interactive Portfolio", es: "Portafolio Interactivo" },
    headline1:{ pt: "Produtos reais.", en: "Real products.", es: "Productos reales." },
    headline2:{ pt: "Totalmente interativos.", en: "Fully interactive.", es: "Totalmente interactivos." },
    viewAll:  { pt: "Ver todas as demos", en: "View all demos", es: "Ver todas las demos" },
  },

  // ── Process ──────────────────────────────────────────────────
  process: {
    eyebrow:   { pt: "Como Trabalhamos",    en: "How We Work",       es: "Cómo Trabajamos" },
    headline1: { pt: "Processo rigoroso.",  en: "Rigorous process.", es: "Proceso riguroso." },
    headline2: { pt: "Resultados excepcionais.", en: "Exceptional results.", es: "Resultados excepcionales." },
    sub:       {
      pt: "Seguimos um processo testado em batalha que elimina ambiguidade, mantém as partes alinhadas e entrega software que funciona — na primeira vez.",
      en: "We follow a battle-tested process that eliminates ambiguity, keeps stakeholders aligned, and ships software that works — the first time.",
      es: "Seguimos un proceso probado que elimina la ambigüedad, mantiene a las partes alineadas y entrega software que funciona — a la primera.",
    },
    step1title: { pt: "Descoberta e Estratégia",     en: "Discovery & Strategy",    es: "Descubrimiento y Estrategia" },
    step1desc:  { pt: "Começamos entendendo seus objetivos de negócio, usuários e restrições técnicas. Cada decisão que segue é baseada em pesquisa e pensamento estratégico.", en: "We start by understanding your business goals, users, and technical constraints. Every decision that follows is grounded in research and strategic thinking.", es: "Comenzamos entendiendo sus objetivos de negocio, usuarios y restricciones técnicas. Cada decisión se basa en investigación y pensamiento estratégico." },
    step2title: { pt: "Design e Arquitetura",        en: "Design & Architecture",   es: "Diseño y Arquitectura" },
    step2desc:  { pt: "Projetamos o sistema do zero — componentes de UI, modelos de dados, contratos de API. As decisões são tomadas explicitamente, antes de uma linha de código ser escrita.", en: "We design the system from the ground up — UI components, data models, API contracts. Decisions are made explicitly, before a line of code is written.", es: "Diseñamos el sistema desde cero — componentes UI, modelos de datos, contratos API. Las decisiones se toman explícitamente, antes de escribir código." },
    step3title: { pt: "Engenharia e Iteração",       en: "Engineering & Iteration", es: "Ingeniería e Iteración" },
    step3desc:  { pt: "Construímos em ciclos focados com feedback contínuo. Cada sprint entrega software funcional que você pode ver, testar e responder.", en: "We build in focused cycles with continuous feedback. Every sprint delivers working software you can see, test, and respond to.", es: "Construimos en ciclos enfocados con retroalimentación continua. Cada sprint entrega software funcional que puedes ver, probar y responder." },
    step4title: { pt: "Entrega e Escala",            en: "Delivery & Scale",        es: "Entrega y Escala" },
    step4desc:  { pt: "Entregamos com pipelines de CI/CD, monitoramento e documentação em vigor. Seu produto é construído para crescer — técnica e comercialmente.", en: "We ship with CI/CD pipelines, monitoring, and documentation in place. Your product is built to grow — technically and commercially.", es: "Entregamos con pipelines CI/CD, monitoreo y documentación. Tu producto está diseñado para crecer — técnica y comercialmente." },
  },

  // ── Testimonials ─────────────────────────────────────────────
  testimonials: {
    eyebrow:   { pt: "Histórias de Clientes", en: "Client Stories",  es: "Historias de Clientes" },
    headline1: { pt: "Confiado por líderes de", en: "Trusted by product", es: "Confiado por líderes de" },
    headline2: { pt: "produto no mundo todo",   en: "leaders worldwide",  es: "producto en todo el mundo" },
  },

  // ── Tech Stack ───────────────────────────────────────────────
  techStack: {
    label: { pt: "Construído com tecnologia líder de mercado", en: "Built with industry-leading technology", es: "Construido con tecnología líder del sector" },
  },

  // ── CTA Banner ───────────────────────────────────────────────
  cta: {
    eyebrow:   { pt: "Pronto para construir?",    en: "Ready to build?",       es: "¿Listo para construir?" },
    headline1: { pt: "Seu próximo grande produto", en: "Your next great product", es: "Tu próximo gran producto" },
    headline2: { pt: "começa aqui",               en: "starts here",             es: "empieza aquí" },
    sub:       {
      pt: "Fale conosco sobre seu projeto. Respondemos em até 24 horas com uma avaliação honesta e um caminho claro a seguir.",
      en: "Tell us about your project. We'll respond within 24 hours with a candid assessment and a clear path forward.",
      es: "Cuéntanos sobre tu proyecto. Responderemos en 24 horas con una evaluación honesta y un camino claro a seguir.",
    },
    cta1:    { pt: "Iniciar uma Conversa",  en: "Start a Conversation", es: "Iniciar una Conversación" },
    cta2:    { pt: "Explorar Nosso Trabalho", en: "Explore Our Work",   es: "Explorar Nuestro Trabajo" },
    disclaimer: { pt: "Sem compromisso. Conselho honesto, sempre.", en: "No commitment required. Honest advice, always.", es: "Sin compromiso. Consejo honesto, siempre." },
  },

  // ── About Page ───────────────────────────────────────────────
  about: {
    eyebrow:   { pt: "Sobre a Development Consulting", en: "About Development Consulting", es: "Sobre Development Consulting" },
    headline1: { pt: "Criamos software",               en: "We build software",            es: "Creamos software" },
    headline2: { pt: "que define empresas",            en: "that defines companies",       es: "que define empresas" },
    sub:       {
      pt: "A Development Consulting é um estúdio de produtos digitais premium. Fazemos parceria com empresas ambiciosas para projetar e desenvolver software que impulsiona crescimento, conquista confiança e dura.",
      en: "Development Consulting is a premium digital product studio. We partner with ambitious companies to design and engineer software that drives growth, earns trust, and lasts.",
      es: "Development Consulting es un estudio de productos digitales premium. Nos asociamos con empresas ambiciosas para diseñar y desarrollar software que impulsa el crecimiento y dura.",
    },
    // Philosophy
    phEyebrow:  { pt: "Nossa Filosofia",        en: "Our Philosophy",       es: "Nuestra Filosofía" },
    phHead1:    { pt: "Princípios que",         en: "Principles we",        es: "Principios que" },
    phHead2:    { pt: "nunca comprometemos",    en: "never compromise on",  es: "nunca comprometemos" },
    phSub:      {
      pt: "Trabalhamos com startups, scale-ups e grandes empresas. O trabalho que dura nunca é acidental — vem de equipes que consideram certas coisas sagradas.",
      en: "We've worked with startups, scale-ups, and enterprise companies. The work that endures is never accidental — it comes from teams that hold certain things sacred.",
      es: "Hemos trabajado con startups, scale-ups y grandes empresas. El trabajo que perdura nunca es accidental — viene de equipos que consideran ciertas cosas sagradas.",
    },
    quote:      {
      pt: "\"O melhor software é o produto de pessoas que se importam mais com o resultado do que com a entrega.\"",
      en: "\"The best software is the product of people who care more about the outcome than the output — who see a deadline not as a finish line but as a constraint to design around.\"",
      es: "\"El mejor software es el producto de personas que se preocupan más por el resultado que por la entrega — que ven una fecha límite no como una línea de llegada sino como una restricción a diseñar.\"",
    },
    quoteAuthor:{ pt: "— Princípios Fundadores da Development Consulting", en: "— Development Consulting Founding Principles", es: "— Principios Fundadores de Development Consulting" },
    p1title: { pt: "Pensamento focado em engenharia",   en: "Engineering-first thinking",   es: "Pensamiento orientado a la ingeniería" },
    p1desc:  { pt: "Tratamos a qualidade do código como um requisito do produto. A dívida técnica acumula juros — mantemos o saldo baixo tomando decisões cuidadosas desde o início.", en: "We treat code quality as a product requirement. Technical debt accrues interest — we keep the balance low by making thoughtful decisions from the start.", es: "Tratamos la calidad del código como un requisito del producto. La deuda técnica acumula intereses — mantenemos el saldo bajo tomando decisiones reflexivas desde el principio." },
    p2title: { pt: "Design que conquista confiança",    en: "Design that earns trust",       es: "Diseño que genera confianza" },
    p2desc:  { pt: "Uma ótima UX não é decoração. É a diferença entre software que as pessoas usam e software que as pessoas suportam.", en: "Great UX isn't decoration. It's the difference between software people use and software people endure. We design for real humans with real frustrations.", es: "Una gran UX no es decoración. Es la diferencia entre software que las personas usan y software que las personas toleran." },
    p3title: { pt: "Transparência radical",             en: "Radical transparency",          es: "Transparencia radical" },
    p3desc:  { pt: "Compartilhamos nosso raciocínio, identificamos problemas antecipadamente e nunca nos escondemos. Você sempre saberá onde seu produto está e por quê.", en: "We share our reasoning, surface problems early, and never hide behind vague updates. You'll always know where your product stands and why.", es: "Compartimos nuestro razonamiento, identificamos problemas temprano y nunca nos escondemos. Siempre sabrás dónde está tu producto y por qué." },
    p4title: { pt: "Performance como funcionalidade",   en: "Performance as a feature",      es: "Rendimiento como funcionalidad" },
    p4desc:  { pt: "Software lento perde usuários e receita. Instrumentamos, medimos e otimizamos sem descanso — performance é uma preocupação de primeira classe.", en: "Slow software loses users and revenue. We instrument, measure, and optimize relentlessly — performance is a first-class concern in everything we build.", es: "El software lento pierde usuarios e ingresos. Instrumentamos, medimos y optimizamos incansablemente — el rendimiento es una preocupación de primer orden." },
    p5title: { pt: "Mentalidade focada no produto",     en: "Product-first mentality",       es: "Mentalidad centrada en el producto" },
    p5desc:  { pt: "Não somos apenas executores. Pensamos profundamente sobre seus usuários, mercado e objetivos — e nos posicionamos quando o plano não serve a essas coisas.", en: "We're not order-takers. We think deeply about your users, your market, and your goals — and we push back when the plan doesn't serve those things.", es: "No somos tomadores de pedidos. Pensamos profundamente sobre tus usuarios, mercado y objetivos — y nos oponemos cuando el plan no sirve a esas cosas." },
    p6title: { pt: "Artesanato em cada detalhe",        en: "Craftsmanship in every detail", es: "Artesanía en cada detalle" },
    p6desc:  { pt: "Os detalhes invisíveis — estados de carregamento, mensagens de erro, navegação por teclado — são o que separa o software premium do software que simplesmente funciona.", en: "The invisible details — loading states, error messages, keyboard navigation — are what separates software that feels premium from software that merely works.", es: "Los detalles invisibles — estados de carga, mensajes de error, navegación por teclado — son lo que separa el software premium del software que simplemente funciona." },
    // Team
    teamEyebrow: { pt: "A Equipe",        en: "The Team",          es: "El Equipo" },
    teamHead1:   { pt: "Especialistas sênior,", en: "Senior specialists,", es: "Especialistas sénior," },
    teamHead2:   { pt: "sem juniores",       en: "no juniors",        es: "sin juniors" },
    teamSub:     {
      pt: "Cada pessoa da nossa equipe é uma especialista com anos de experiência em produção. Não aprendemos no seu tempo.",
      en: "Every person on our team is a subject matter expert with years of production experience. We don't learn on your time.",
      es: "Cada persona en nuestro equipo es una experta con años de experiencia en producción. No aprendemos a tu costo.",
    },
    t1role: { pt: "Arquiteto Frontend Líder",    en: "Lead Frontend Architect",  es: "Arquitecto Frontend Principal" },
    t1bio:  { pt: "10 anos entregando aplicações React performáticas para fintech, saúde e e-commerce em escala.", en: "10 years shipping performant React applications for fintech, healthcare, and e-commerce at scale.", es: "10 años entregando aplicaciones React de alto rendimiento para fintech, salud y e-commerce a escala." },
    t2role: { pt: "Designer de Produto Principal", en: "Principal Product Designer", es: "Diseñadora de Producto Principal" },
    t2bio:  { pt: "Ex-líder de design em duas startups financiadas pela YC. Obcecada com design de interação e sistemas de design.", en: "Former design lead at two YC-backed startups. Obsessed with interaction design and design systems.", es: "Ex-líder de diseño en dos startups respaldadas por YC. Obsesionada con el diseño de interacción y sistemas de diseño." },
    t3role: { pt: "Engenheiro Full-Stack",         en: "Full-Stack Engineer",       es: "Ingeniero Full-Stack" },
    t3bio:  { pt: "Criou e escalou pipelines de dados e sistemas em tempo real para empresas atendendo milhões de usuários.", en: "Built and scaled data pipelines and real-time systems for companies serving millions of users.", es: "Construyó y escaló pipelines de datos y sistemas en tiempo real para empresas con millones de usuarios." },
    t4role: { pt: "Estrategista de UX",             en: "UX Strategist",             es: "Estratega de UX" },
    t4bio:  { pt: "Traduz pesquisa de usuário complexa em decisões de produto que melhoram mensuravelmente a retenção e a conversão.", en: "Translates complex user research into product decisions that measurably improve retention and conversion.", es: "Traduce investigación de usuario compleja en decisiones de producto que mejoran mediblemente la retención y conversión." },
  },

  // ── Services Page ────────────────────────────────────────────
  services: {
    eyebrow:   { pt: "O Que Oferecemos",     en: "What We Offer",     es: "Lo Que Ofrecemos" },
    headline1: { pt: "Cada camada do",        en: "Every layer of",    es: "Cada capa de" },
    headline2: { pt: "seu produto digital",   en: "your digital product", es: "tu producto digital" },
    sub:       {
      pt: "Da estratégia e design à engenharia e otimização de performance — cobrimos todo o espectro do que é necessário para construir software que dura e escala.",
      en: "From strategy and design to engineering and performance optimization — we cover the full spectrum of what it takes to build software that lasts and scales.",
      es: "Desde estrategia y diseño hasta ingeniería y optimización de rendimiento — cubrimos todo el espectro de lo necesario para construir software que dura y escala.",
    },
    // Service cards
    s1:  { pt: "Desenvolvimento Web Personalizado",   en: "Custom Web Development",      es: "Desarrollo Web Personalizado" },
    s2:  { pt: "Plataformas SaaS",                    en: "SaaS Platforms",               es: "Plataformas SaaS" },
    s3:  { pt: "Dashboards e Analytics",              en: "Dashboards & Analytics",       es: "Dashboards y Analytics" },
    s4:  { pt: "Soluções de E-commerce",              en: "Ecommerce Solutions",          es: "Soluciones de E-commerce" },
    s5:  { pt: "Arquitetura Frontend",                en: "Frontend Architecture",        es: "Arquitectura Frontend" },
    s6:  { pt: "Sistemas UI/UX",                      en: "UI/UX Systems",                es: "Sistemas UI/UX" },
    s7:  { pt: "Protótipos Interativos",              en: "Interactive Prototypes",       es: "Prototipos Interactivos" },
    s8:  { pt: "Consultoria de Produto Digital",      en: "Digital Product Consulting",   es: "Consultoría de Producto Digital" },
    s9:  { pt: "Otimização de Performance",           en: "Performance Optimization",     es: "Optimización de Rendimiento" },
    s10: { pt: "Aplicações Web Modernas",             en: "Modern Web Applications",      es: "Aplicaciones Web Modernas" },
    // Descriptions
    d1:  { pt: "Aplicações web artesanais criadas para performance, escalabilidade e UX excepcional.", en: "Handcrafted web applications built for performance, scalability, and exceptional user experience.", es: "Aplicaciones web artesanales creadas para rendimiento, escalabilidad y UX excepcional." },
    d2:  { pt: "Produtos SaaS completos com auth, cobrança, multi-tenancy e tudo que o enterprise exige.", en: "Full-featured SaaS products with auth, billing, multi-tenancy, and everything enterprise demands.", es: "Productos SaaS completos con autenticación, facturación, multi-tenancy y todo lo que la empresa exige." },
    d3:  { pt: "Dashboards executivos densos em dados que transformam informações brutas em decisões claras.", en: "Data-dense executive dashboards and analytics platforms that turn raw data into clear decisions.", es: "Dashboards ejecutivos repletos de datos que transforman información en decisiones claras." },
    d4:  { pt: "Lojas virtuais e plataformas de comércio premium projetadas para converter em cada ponto.", en: "Premium storefronts and commerce platforms designed to convert at every touchpoint.", es: "Tiendas y plataformas de comercio premium diseñadas para convertir en cada punto de contacto." },
    d5:  { pt: "Design estratégico de sistemas frontend escaláveis para equipes de qualquer tamanho.", en: "Strategic design of scalable, maintainable frontend systems for engineering teams of any size.", es: "Diseño estratégico de sistemas frontend escalables para equipos de cualquier tamaño." },
    d6:  { pt: "Sistemas de design e bibliotecas de componentes que garantem consistência em escala.", en: "Comprehensive design systems and component libraries that ensure consistency at scale.", es: "Sistemas de diseño y bibliotecas de componentes que garantizan consistencia a escala." },
    d7:  { pt: "Protótipos interativos de alta fidelidade que comunicam a visão do produto com precisão.", en: "High-fidelity interactive prototypes that communicate product vision with precision.", es: "Prototipos interactivos de alta fidelidad que comunican la visión del producto con precisión." },
    d8:  { pt: "Orientação estratégica em roadmap de produto, decisões técnicas e estrutura de equipe.", en: "Strategic guidance on product roadmap, technical decisions, and team structure for digital products.", es: "Orientación estratégica sobre hoja de ruta, decisiones técnicas y estructura de equipo." },
    d9:  { pt: "Engenharia de performance para levar os Core Web Vitals ao verde e mantê-los lá.", en: "Deep performance engineering to bring Core Web Vitals to green and keep them there.", es: "Ingeniería de rendimiento profunda para llevar los Core Web Vitals al verde y mantenerlos allí." },
    d10: { pt: "Aplicações web ricas e interativas com funcionalidades em tempo real e experiências nativas.", en: "Rich, interactive web apps with real-time features, offline support, and native-like experiences.", es: "Aplicaciones web ricas e interactivas con características en tiempo real y experiencias similares a nativas." },
    // Categories
    cat_dev:  { pt: "Desenvolvimento", en: "Development",  es: "Desarrollo" },
    cat_prod: { pt: "Produto",         en: "Product",      es: "Producto" },
    cat_anal: { pt: "Analytics",       en: "Analytics",    es: "Analytics" },
    cat_comm: { pt: "Comércio",        en: "Commerce",     es: "Comercio" },
    cat_arch: { pt: "Arquitetura",     en: "Architecture", es: "Arquitectura" },
    cat_des:  { pt: "Design",          en: "Design",       es: "Diseño" },
    cat_eng:  { pt: "Engenharia",      en: "Engineering",  es: "Ingeniería" },
    cat_str:  { pt: "Estratégia",      en: "Strategy",     es: "Estrategia" },
  },

  // ── Portfolio Page ───────────────────────────────────────────
  portfolio: {
    eyebrow:   { pt: "Showroom de Portfólio",  en: "Portfolio Showroom",  es: "Showroom de Portafolio" },
    headline1: { pt: "Produtos reais,",         en: "Real products,",      es: "Productos reales," },
    headline2: { pt: "totalmente interativos",  en: "fully interactive",   es: "totalmente interactivos" },
    sub:       {
      pt: "Cada demo é um protótipo de produto totalmente funcional — não um mockup estático. Clique, explore e experimente a qualidade que entregamos.",
      en: "Every demo is a fully functional product prototype — not a static mockup. Click through, explore, and experience the quality we ship.",
      es: "Cada demo es un prototipo de producto completamente funcional — no una maqueta estática. Navega, explora y experimenta la calidad que entregamos.",
    },
    searchPlaceholder: { pt: "Buscar demos…", en: "Search demos…", es: "Buscar demos…" },
    all:       { pt: "Todos", en: "All", es: "Todos" },
    noResults: { pt: "Nenhuma demo corresponde à sua busca.", en: "No demos match your search.", es: "Ninguna demo coincide con tu búsqueda." },
    clearFilters: { pt: "Limpar filtros", en: "Clear filters", es: "Limpiar filtros" },
    results:   { pt: "produto(s) encontrado(s)", en: "result(s)", es: "resultado(s)" },
  },

  // ── 404 ──────────────────────────────────────────────────────
  notFound: {
    title:   { pt: "Página não encontrada", en: "Page not found",      es: "Página no encontrada" },
    sub:     { pt: "A página que você está procurando não existe ou foi movida.", en: "The page you're looking for doesn't exist or has been moved.", es: "La página que buscas no existe o ha sido movida." },
    goHome:  { pt: "Ir para o Início",       en: "Go Home",             es: "Ir al Inicio" },
  },
} as const;

export type TranslationKey = keyof typeof translations;
