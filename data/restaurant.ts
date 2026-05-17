export type MenuCategory =
  | "entradas"
  | "principais"
  | "massas"
  | "grelhados"
  | "sobremesas"
  | "bebidas";

export interface MenuItem {
  id: string;
  name: string;
  nameEN?: string;
  category: MenuCategory;
  description: string;
  price: number;
  image: string;
  images: string[];
  ingredients: string[];
  tags: string[];
  allergens?: string[];
  calories?: number;
  isVegan?: boolean;
  isVegetarian?: boolean;
  isGlutenFree?: boolean;
  isChefChoice?: boolean;
  isNew?: boolean;
  isSeasonal?: boolean;
  rating: number;
  reviews: number;
  prepTime: number;
  sold: number;
  badge?: string;
}

export const menuCategories: MenuCategory[] = [
  "entradas",
  "principais",
  "massas",
  "grelhados",
  "sobremesas",
  "bebidas",
];

export const categoryLabels: Record<MenuCategory, string> = {
  entradas: "Entradas",
  principais: "Pratos Principais",
  massas: "Massas & Risotos",
  grelhados: "Grelhados",
  sobremesas: "Sobremesas",
  bebidas: "Bebidas & Drinques",
};

const u = (id: string) =>
  `https://images.unsplash.com/${id}?w=800&h=600&fit=crop&q=85&auto=format`;

export const menuItems: MenuItem[] = [
  // ─── ENTRADAS ───
  {
    id: "e1",
    name: "Carpaccio de Atum Selado",
    category: "entradas",
    description:
      "Finas fatias de atum selado na brasa com azeite trufado e alcaparras. Servido sobre leito de rúcula selvagem com raspas de limão siciliano e flor de sal do Algarve. Uma entrada que celebra o mar com elegância mediterrânea.",
    price: 68,
    image: u("photo-1546069901-ba9599a7e63c"),
    images: [
      u("photo-1504674900247-0877df9cc836"),
      u("photo-1476124369491-e7addf5db371"),
      u("photo-1555939594-58d7cb561ad1"),
    ],
    ingredients: [
      "Atum bluefin",
      "Azeite trufado",
      "Alcaparras de Pantelleria",
      "Rúcula selvagem",
      "Flor de sal",
    ],
    tags: ["peixe", "atum", "carpaccio", "mediterrâneo"],
    isChefChoice: true,
    badge: "Escolha do Chef",
    rating: 4.8,
    reviews: 124,
    prepTime: 12,
    sold: 890,
  },
  {
    id: "e2",
    name: "Tartare de Salmão Norueguês",
    category: "entradas",
    description:
      "Salmão norueguês marinado em shoyu e gengibre fresco, finalizado com aioli de limão e ovas de trufa. Servido com chips de mandioca artesanais e micro-ervas do horto próprio do restaurante.",
    price: 72,
    image: u("photo-1519708227418-c8fd9a32b7a2"),
    images: [
      u("photo-1559847844-5315695dadae"),
      u("photo-1499028344343-cd173ffc68a9"),
      u("photo-1560717789-0ac7c58ac90a"),
    ],
    ingredients: [
      "Salmão norueguês",
      "Shoyu premium",
      "Gengibre fresco",
      "Aioli de limão",
      "Ovas de trufa",
    ],
    tags: ["salmão", "tartare", "asiático", "fresco"],
    isNew: true,
    badge: "Novo",
    rating: 4.7,
    reviews: 98,
    prepTime: 10,
    sold: 640,
  },
  {
    id: "e3",
    name: "Burrata com Tomate Heirloom",
    category: "entradas",
    description:
      "Burrata cremosa de búfala com tomates Heirloom de diversas variedades, azeite extra-virgem da Sicília e redução balsâmica artesanal. Finalizada com manjericão fresco e flor de sal rosada.",
    price: 58,
    image: u("photo-1512621776951-a57141f2eefd"),
    images: [
      u("photo-1467003909585-2f8a72700288"),
      u("photo-1565299585323-38d6b0865b47"),
      u("photo-1540189549336-e6e99c3679fe"),
    ],
    ingredients: [
      "Burrata de búfala",
      "Tomates Heirloom",
      "Azeite siciliano",
      "Redução balsâmica",
      "Manjericão",
    ],
    tags: ["queijo", "tomate", "vegetariano", "italiano"],
    isVegetarian: true,
    isGlutenFree: true,
    rating: 4.9,
    reviews: 213,
    prepTime: 8,
    sold: 1240,
  },
  {
    id: "e4",
    name: "Ceviche Tropical Carioca",
    category: "entradas",
    description:
      "Peixe branco marinado em leite de tigre com manga, abacaxi e pimenta cambuci. Servido com crocante de batata-doce e caldo do mar. Uma releitura tropical da tradição peruana com ingredientes da costa brasileira.",
    price: 65,
    image: u("photo-1625944525533-473f1a3d54e7"),
    images: [
      u("photo-1546069901-ba9599a7e63c"),
      u("photo-1504674900247-0877df9cc836"),
      u("photo-1529692236671-f1f6cf9683ba"),
    ],
    ingredients: [
      "Peixe branco do dia",
      "Leite de tigre",
      "Manga Tommy",
      "Abacaxi",
      "Pimenta cambuci",
    ],
    tags: ["ceviche", "peixe", "tropical", "peruano"],
    isSeasonal: true,
    badge: "Sazonal",
    rating: 4.8,
    reviews: 176,
    prepTime: 15,
    sold: 980,
  },
  {
    id: "e5",
    name: "Trio de Bruschetta Artesanal",
    category: "entradas",
    description:
      "Pão ciabatta torrado no forno a lenha com três coberturas: tomate confit com basilicão, patê de fígado de pato com geleia de laranja, e burrata com prosciutto San Daniele. Servido em tábua de madeira.",
    price: 45,
    image: u("photo-1565958011703-44f9829ba187"),
    images: [
      u("photo-1476887334197-56a3b0e07af8"),
      u("photo-1565299585323-38d6b0865b47"),
      u("photo-1512621776951-a57141f2eefd"),
    ],
    ingredients: [
      "Ciabatta de fermentação natural",
      "Tomate confit",
      "Patê de pato",
      "Burrata",
      "Prosciutto",
    ],
    tags: ["bruschetta", "pão", "entrada", "italiano"],
    rating: 4.6,
    reviews: 87,
    prepTime: 10,
    sold: 540,
  },

  // ─── PRATOS PRINCIPAIS ───
  {
    id: "p1",
    name: "Costela Bovina 24 Horas",
    category: "principais",
    description:
      "Costela Black Angus cozida a baixa temperatura por 24 horas, com crosta de ervas frescas e molho demi-glace de vinho tinto. Acompanha purê de mandioquinha trufado e farofa de cogumelos silvestres. O prato mais pedido da casa.",
    price: 148,
    image: u("photo-1529692236671-f1f6cf9683ba"),
    images: [
      u("photo-1558030006-450675393462"),
      u("photo-1504674900247-0877df9cc836"),
      u("photo-1432139555190-58524dae6a55"),
    ],
    ingredients: [
      "Costela Black Angus",
      "Demi-glace de vinho tinto",
      "Purê de mandioquinha",
      "Cogumelos silvestres",
    ],
    tags: ["carne", "costela", "angus", "comfort food"],
    isChefChoice: true,
    isGlutenFree: true,
    badge: "Escolha do Chef",
    rating: 4.9,
    reviews: 302,
    prepTime: 30,
    sold: 1560,
  },
  {
    id: "p2",
    name: "Bacalhau à Lagareiro com Broa",
    category: "principais",
    description:
      "Lombo de bacalhau do Porto dessalgado 72 horas, assado no azeite de Trás-os-Montes com alho confitado e azeitonas Galega. Acompanha batatas rustigas ao forno e broa de milho tostada. Uma reverência à tradição lusa.",
    price: 135,
    image: u("photo-1559847844-5315695dadae"),
    images: [
      u("photo-1519708227418-c8fd9a32b7a2"),
      u("photo-1499028344343-cd173ffc68a9"),
      u("photo-1546069901-ba9599a7e63c"),
    ],
    ingredients: [
      "Lombo de bacalhau do Porto",
      "Azeite de Trás-os-Montes",
      "Alho confitado",
      "Azeitonas Galega",
    ],
    tags: ["bacalhau", "português", "peixe", "clássico"],
    rating: 4.8,
    reviews: 156,
    prepTime: 25,
    sold: 720,
  },
  {
    id: "p3",
    name: "Polvo Grelhado à Lagareiro",
    category: "principais",
    description:
      "Polvo galego cozido por 2 horas e finalizado na grelha de brasa com azeite de ervas e pimentão defumado. Servido com batata-doce assada ao alecrim e vinagrete de limão capim com coentro fresco.",
    price: 145,
    image: u("photo-1607532941433-304659e8198a"),
    images: [
      u("photo-1519708227418-c8fd9a32b7a2"),
      u("photo-1560717789-0ac7c58ac90a"),
      u("photo-1559847844-5315695dadae"),
    ],
    ingredients: [
      "Polvo galego",
      "Azeite de ervas",
      "Pimentão defumado",
      "Batata-doce",
      "Coentro fresco",
    ],
    tags: ["polvo", "frutos do mar", "grelhado", "mediterrâneo"],
    isGlutenFree: true,
    rating: 4.7,
    reviews: 128,
    prepTime: 20,
    sold: 610,
  },
  {
    id: "p4",
    name: "Salmão com Crosta de Ervas",
    category: "principais",
    description:
      "Filé de salmão do Atlântico com crosta de pistache e ervas frescas, cozido em temperatura controlada a 55°C para manter a textura sedosa. Acompanha risoto de ervilhas frescas e espuma de limão-siciliano.",
    price: 125,
    image: u("photo-1560717789-0ac7c58ac90a"),
    images: [
      u("photo-1519708227418-c8fd9a32b7a2"),
      u("photo-1507003211169-0a1dd7228f2d"),
      u("photo-1546069901-ba9599a7e63c"),
    ],
    ingredients: [
      "Salmão do Atlântico",
      "Crosta de pistache",
      "Risoto de ervilhas",
      "Espuma de limão-siciliano",
    ],
    tags: ["salmão", "peixe", "ervas", "sofisticado"],
    isGlutenFree: true,
    rating: 4.8,
    reviews: 198,
    prepTime: 18,
    sold: 1100,
  },
  {
    id: "p5",
    name: "Risoto de Cogumelos Silvestres",
    category: "principais",
    description:
      "Arroz Carnaroli cozido no caldo de cogumelos com mix de funghi porcini, shiitake e shimeji frescos. Finalizado com manteiga de ervas e raspas de trufa negra. Coberto com lascas de Parmigiano Reggiano 36 meses.",
    price: 98,
    image: u("photo-1476124369491-e7addf5db371"),
    images: [
      u("photo-1512621776951-a57141f2eefd"),
      u("photo-1565299585323-38d6b0865b47"),
      u("photo-1574894709920-11b28e7367e3"),
    ],
    ingredients: [
      "Arroz Carnaroli",
      "Funghi porcini",
      "Shiitake e shimeji",
      "Trufa negra",
      "Parmigiano 36 meses",
    ],
    tags: ["risoto", "cogumelos", "vegetariano", "trufa"],
    isVegetarian: true,
    isGlutenFree: true,
    rating: 4.7,
    reviews: 143,
    prepTime: 22,
    sold: 760,
  },

  // ─── MASSAS & RISOTOS ───
  {
    id: "m1",
    name: "Tagliatelle alla Carbonara",
    category: "massas",
    description:
      "Tagliatelle fresco de gema de ovo caipira com guanciale italiano curado 90 dias, pecorino Romano e pimenta-do-reino moída na hora. Receita da tradição romana sem creme — apenas a perfeição da emulsão. O clássico que nunca falha.",
    price: 78,
    image: u("photo-1476124369491-e7addf5db371"),
    images: [
      u("photo-1512621776951-a57141f2eefd"),
      u("photo-1467003909585-2f8a72700288"),
      u("photo-1565299585323-38d6b0865b47"),
    ],
    ingredients: [
      "Tagliatelle de gema caipira",
      "Guanciale 90 dias",
      "Pecorino Romano",
      "Pimenta-do-reino",
    ],
    tags: ["massa", "carbonara", "italiano", "clássico"],
    isChefChoice: true,
    badge: "Clássico",
    rating: 4.9,
    reviews: 267,
    prepTime: 16,
    sold: 1890,
  },
  {
    id: "m2",
    name: "Ravioli de Lagosta ao Bisque",
    category: "massas",
    description:
      "Ravioli artesanal recheado com lagosta do Nordeste e ricota de búfala, servido em bisque aveludado de crustáceos com manteiga de coral. Finalizado com ovas de capelin e microbrotos de ervilha.",
    price: 132,
    image: u("photo-1565299624946-b28f40a0ae38"),
    images: [
      u("photo-1476124369491-e7addf5db371"),
      u("photo-1467003909585-2f8a72700288"),
      u("photo-1512621776951-a57141f2eefd"),
    ],
    ingredients: [
      "Lagosta do Nordeste",
      "Ricota de búfala",
      "Bisque de crustáceos",
      "Manteiga de coral",
    ],
    tags: ["massa", "lagosta", "frutos do mar", "premium"],
    isNew: true,
    badge: "Novo",
    rating: 4.8,
    reviews: 89,
    prepTime: 25,
    sold: 420,
  },
  {
    id: "m3",
    name: "Pappardelle ao Ragù de Javali",
    category: "massas",
    description:
      "Pappardelle largo fresco com ragù de javali cozido 6 horas em vinho Sagrantino di Montefalco. Finalizado com raspas de pecorino envelhecido e tomilho fresco. Um clássico da Úmbria reinterpretado com ingredientes da Serra Gaúcha.",
    price: 92,
    image: u("photo-1467003909585-2f8a72700288"),
    images: [
      u("photo-1476124369491-e7addf5db371"),
      u("photo-1565299624946-b28f40a0ae38"),
      u("photo-1512621776951-a57141f2eefd"),
    ],
    ingredients: [
      "Pappardelle fresco",
      "Ragù de javali 6h",
      "Vinho Sagrantino",
      "Pecorino envelhecido",
    ],
    tags: ["massa", "javali", "ragù", "italiano"],
    rating: 4.7,
    reviews: 115,
    prepTime: 20,
    sold: 680,
  },

  // ─── GRELHADOS ───
  {
    id: "g1",
    name: "Picanha Premium Dry Aged 21 Dias",
    category: "grelhados",
    description:
      "Picanha Nelore Certificada dry aged 21 dias, grelhada na brasa de carvão de eucalipto a 800°C. Servida ao ponto com manteiga de ervas, acompanha farofa de alho negro e vinagrete de tomate-cereja. A estrela da nossa churrasqueira.",
    price: 158,
    image: u("photo-1529692236671-f1f6cf9683ba"),
    images: [
      u("photo-1432139555190-58524dae6a55"),
      u("photo-1558030006-450675393462"),
      u("photo-1504674900247-0877df9cc836"),
    ],
    ingredients: [
      "Picanha Nelore Certificada",
      "Dry aged 21 dias",
      "Manteiga de ervas",
      "Alho negro",
      "Farofa artesanal",
    ],
    tags: ["picanha", "carne", "dry aged", "churrasqueira"],
    isChefChoice: true,
    isGlutenFree: true,
    badge: "Destaque",
    rating: 4.9,
    reviews: 341,
    prepTime: 25,
    sold: 2100,
  },
  {
    id: "g2",
    name: "Entrecôte com Molho Café de Paris",
    category: "grelhados",
    description:
      "Entrecôte de Black Angus uruguaio grelhado ao ponto, com o clássico molho suíço Café de Paris à base de 15 ervas e especiarias. Acompanha batatas fritas em azeite de oliva e salada verde com vinagrete de mostarda Dijon.",
    price: 168,
    image: u("photo-1558030006-450675393462"),
    images: [
      u("photo-1529692236671-f1f6cf9683ba"),
      u("photo-1432139555190-58524dae6a55"),
      u("photo-1504674900247-0877df9cc836"),
    ],
    ingredients: [
      "Entrecôte Black Angus",
      "Molho Café de Paris",
      "15 ervas e especiarias",
      "Batatas no azeite",
    ],
    tags: ["entrecôte", "carne", "suíço", "premium"],
    rating: 4.8,
    reviews: 112,
    prepTime: 22,
    sold: 480,
  },
  {
    id: "g3",
    name: "Frango Orgânico com Chimichurri",
    category: "grelhados",
    description:
      "Coxa e sobrecoxa de frango orgânico da Fazenda do Brejo marinados 24 horas em chimichurri verde de ervas frescas. Grelhados na brasa com pele crocante e interior suculento. Acompanha arroz negro e purê de abóbora japonesa.",
    price: 88,
    image: u("photo-1493770348161-369560ae357d"),
    images: [
      u("photo-1504674900247-0877df9cc836"),
      u("photo-1529692236671-f1f6cf9683ba"),
      u("photo-1432139555190-58524dae6a55"),
    ],
    ingredients: [
      "Frango orgânico",
      "Chimichurri verde",
      "Arroz negro",
      "Purê de abóbora japonesa",
    ],
    tags: ["frango", "orgânico", "chimichurri", "saudável"],
    isGlutenFree: true,
    rating: 4.6,
    reviews: 94,
    prepTime: 20,
    sold: 560,
  },

  // ─── SOBREMESAS ───
  {
    id: "s1",
    name: "Fondant de Chocolate 70%",
    category: "sobremesas",
    description:
      "Fondant de chocolate 70% cacau da Bahia com interior derretido e coração de caramelo fleur de sel. Servido com sorvete de baunilha Bourbon feito no restaurante e crocante de amendoim japonês. A sobremesa que virou lenda.",
    price: 52,
    image: u("photo-1551024506-0bccd828d307"),
    images: [
      u("photo-1563805042-7684c019e1cb"),
      u("photo-1578985545062-69928b1d9587"),
      u("photo-1484723091739-30990f9a0a34"),
    ],
    ingredients: [
      "Chocolate 70% cacau baiano",
      "Caramelo fleur de sel",
      "Sorvete de baunilha Bourbon",
      "Amendoim japonês",
    ],
    tags: ["chocolate", "fondant", "sobremesa", "imperdível"],
    isVegetarian: true,
    badge: "Lenda da Casa",
    rating: 4.9,
    reviews: 389,
    prepTime: 12,
    sold: 2400,
  },
  {
    id: "s2",
    name: "Cheesecake de Frutas Vermelhas",
    category: "sobremesas",
    description:
      "Cheesecake Nova-Iorquino com base de biscoito artesanal de gengibre e recheio de cream cheese com baunilha de Madagascar. Coberto com compota quente de frutas vermelhas silvestres e geleia de framboesa. Servido morno.",
    price: 48,
    image: u("photo-1578985545062-69928b1d9587"),
    images: [
      u("photo-1551024506-0bccd828d307"),
      u("photo-1563805042-7684c019e1cb"),
      u("photo-1484723091739-30990f9a0a34"),
    ],
    ingredients: [
      "Cream cheese",
      "Baunilha de Madagascar",
      "Biscoito de gengibre",
      "Frutas vermelhas silvestres",
    ],
    tags: ["cheesecake", "frutas vermelhas", "sobremesa", "clássico"],
    isVegetarian: true,
    rating: 4.7,
    reviews: 198,
    prepTime: 8,
    sold: 1100,
  },
  {
    id: "s3",
    name: "Crème Brûlée ao Grand Marnier",
    category: "sobremesas",
    description:
      "Creme brûlée clássico com infusão de Grand Marnier e raspas de laranja, caramelizado na hora com açúcar de cana refinado. Servido com biscoito de amêndoa e calda de cumquat em conserva.",
    price: 42,
    image: u("photo-1563805042-7684c019e1cb"),
    images: [
      u("photo-1551024506-0bccd828d307"),
      u("photo-1578985545062-69928b1d9587"),
      u("photo-1484723091739-30990f9a0a34"),
    ],
    ingredients: [
      "Creme de leite fresco",
      "Grand Marnier",
      "Raspas de laranja",
      "Açúcar de cana",
      "Biscoito de amêndoa",
    ],
    tags: ["crème brûlée", "francês", "clássico", "sobremesa"],
    isVegetarian: true,
    rating: 4.8,
    reviews: 154,
    prepTime: 10,
    sold: 870,
  },

  // ─── BEBIDAS ───
  {
    id: "b1",
    name: "Caipirinha Premium CAIS",
    category: "bebidas",
    description:
      "Nossa assinatura: cachaça premium Ypióca 150 macerada com limão-siciliano, capim-limão e gengibre fresco. Adoçada com xarope de açúcar mascavo artesanal. Servida em copo de cristal com gelo esculpido.",
    price: 38,
    image: u("photo-1514362545857-3bc16c4c7d1b"),
    images: [
      u("photo-1569529465841-dfecdab7503b"),
      u("photo-1536935338788-846bb9981813"),
      u("photo-1477959858617-67f85cf4f1df"),
    ],
    ingredients: [
      "Cachaça Ypióca 150",
      "Limão-siciliano",
      "Capim-limão",
      "Gengibre fresco",
      "Xarope mascavo",
    ],
    tags: ["caipirinha", "cachaça", "coquetel", "assinatura"],
    isVegan: true,
    isGlutenFree: true,
    badge: "Assinatura",
    rating: 4.8,
    reviews: 412,
    prepTime: 5,
    sold: 3200,
  },
  {
    id: "b2",
    name: "Espumante Brut Miolo Cuvée (taça)",
    category: "bebidas",
    description:
      "Espumante brut da Serra Gaúcha pelo método Champenoise com 18 meses de autólise. Bolhas finas e persistentes com notas de brioche, limão e maçã verde. Harmoniza perfeitamente com entradas e frutos do mar.",
    price: 55,
    image: u("photo-1536935338788-846bb9981813"),
    images: [
      u("photo-1514362545857-3bc16c4c7d1b"),
      u("photo-1569529465841-dfecdab7503b"),
      u("photo-1477959858617-67f85cf4f1df"),
    ],
    ingredients: [
      "Chardonnay e Pinot Noir",
      "Método Champenoise",
      "18 meses de autólise",
    ],
    tags: ["espumante", "vinho", "brut", "harmonização"],
    isVegan: true,
    isGlutenFree: true,
    rating: 4.7,
    reviews: 89,
    prepTime: 2,
    sold: 760,
  },
  {
    id: "b3",
    name: "Água com Gás San Pellegrino (500ml)",
    category: "bebidas",
    description:
      "Água mineral com gás de fonte natural nas Alpes italianos, engarrafada na origem desde 1899. Carbonatação natural fina e persistente com pH neutro ideal para limpar o palato entre os pratos.",
    price: 18,
    image: u("photo-1477959858617-67f85cf4f1df"),
    images: [
      u("photo-1514362545857-3bc16c4c7d1b"),
      u("photo-1536935338788-846bb9981813"),
      u("photo-1569529465841-dfecdab7503b"),
    ],
    ingredients: [
      "Água mineral natural",
      "Carbonatação natural dos Alpes",
    ],
    tags: ["água", "importada", "italiano", "bebida"],
    isVegan: true,
    isGlutenFree: true,
    rating: 4.5,
    reviews: 34,
    prepTime: 1,
    sold: 5400,
  },
];

export const topDishes = [...menuItems]
  .sort((a, b) => b.sold - a.sold)
  .slice(0, 4);

export const chefChoices = menuItems.filter((d) => d.isChefChoice);
