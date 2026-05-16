export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  category: string;
  tags: string[];
  gradient: string;
  badge?: string;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export const products: Product[] = [
  {
    id: "p1",
    name: "Obsidian Chronograph",
    brand: "Luxe Atelier",
    price: 12490,
    originalPrice: 14990,
    category: "Relógios",
    tags: ["Novo", "Limitado"],
    gradient: "from-slate-800 to-slate-900",
    badge: "Limitado",
    rating: 4.9,
    reviews: 127,
    description: "Cronógrafo de precisão com cristal de safira e movimento suíço.",
    features: ["Movimento Swiss ETA", "Cristal de safira", "Resistente a 300m", "Garantia de 5 anos"],
    inStock: true,
  },
  {
    id: "p2",
    name: "Matte Noir Sunglasses",
    brand: "Optic Luxe",
    price: 2390,
    category: "Óculos",
    tags: ["Mais Vendido"],
    gradient: "from-zinc-900 to-zinc-800",
    badge: "Mais Vendido",
    rating: 4.8,
    reviews: 342,
    description: "Armação artesanal em acetato italiano com lentes polarizadas UV400.",
    features: ["Acetato italiano", "Lentes polarizadas", "Proteção UV400", "Case incluso"],
    inStock: true,
  },
  {
    id: "p3",
    name: "Leather Weekender Bag",
    brand: "Alder & Co.",
    price: 4490,
    originalPrice: 5490,
    category: "Bolsas",
    tags: ["Oferta"],
    gradient: "from-amber-900 to-stone-800",
    badge: "Oferta",
    rating: 4.7,
    reviews: 89,
    description: "Couro full-grain curtido a vegetal com ferragens em latão. Melhora com o tempo.",
    features: ["Couro full-grain", "Ferragens em latão", "Bolso interno para laptop", "Reparo vitalício"],
    inStock: true,
  },
  {
    id: "p4",
    name: "Merino Wool Sweater",
    brand: "Nordic Craft",
    price: 1590,
    category: "Vestuário",
    tags: ["Novo"],
    gradient: "from-stone-700 to-stone-600",
    rating: 4.6,
    reviews: 201,
    description: "Lã merino extrafina de fazendas sustentáveis na Patagônia.",
    features: ["Merino extrafina", "Origem sustentável", "Lavável à máquina", "8 cores disponíveis"],
    inStock: true,
  },
  {
    id: "p5",
    name: "Carbon Fibre Wallet",
    brand: "Apex Gear",
    price: 990,
    category: "Acessórios",
    tags: ["Compacto"],
    gradient: "from-neutral-900 to-neutral-700",
    rating: 4.9,
    reviews: 518,
    description: "Carteira ultrafina em fibra de carbono com bloqueio RFID. Comporta até 12 cartões.",
    features: ["Fibra de carbono", "Bloqueio RFID", "Capacidade para 12 cartões", "Peso de 50g"],
    inStock: true,
  },
  {
    id: "p6",
    name: "Ceramic Pour-Over Set",
    brand: "Form & Brew",
    price: 720,
    originalPrice: 920,
    category: "Casa",
    tags: ["Oferta"],
    gradient: "from-white/10 to-white/5",
    badge: "Oferta",
    rating: 4.8,
    reviews: 163,
    description: "Kit coador e carafe em cerâmica artesanal. Cada peça é única.",
    features: ["Cerâmica artesanal", "Acabamento fosco", "Seguro na lava-louças", "Acompanha filtros"],
    inStock: true,
  },
];

export const categories = ["Todos", "Relógios", "Óculos", "Bolsas", "Vestuário", "Acessórios", "Casa"];
