import type { Product } from "@/data/ecommerce";

export type CartItem = Product & {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
};

export type SortKey = "relevance" | "price-asc" | "price-desc" | "sold" | "new";

export const FREE_SHIPPING_THRESHOLD = 500;
export const SHIPPING_COST = 29.9;
export const COUPON_CODE = "LUXE10";
export const COUPON_DISCOUNT = 0.1;

export const NAV_LINKS = [
  { label: "Todos", value: "todos" },
  { label: "Novidades", value: "novidades" },
  { label: "Mais Vendidos", value: "mais-vendidos" },
  { label: "Relógios", value: "relogios" },
  { label: "Tech", value: "tech" },
  { label: "Estilo", value: "estilo" },
  { label: "Sale", value: "oferta" },
] as const;

export const CATEGORY_LABELS: Record<string, string> = {
  todos: "Todos",
  relogios: "Relógios",
  calcados: "Calçados",
  bolsas: "Bolsas",
  tech: "Tech",
  vestuario: "Vestuário",
  casa: "Casa",
};

export const TRUST_BADGES = [
  { icon: "🚚", title: "Frete Grátis", sub: "Acima de R$500" },
  { icon: "🔄", title: "30 dias", sub: "Devolução garantida" },
  { icon: "🔒", title: "Pagamento Seguro", sub: "SSL + criptografia" },
  { icon: "⭐", title: "4.9/5 Avaliação", sub: "+12.000 clientes" },
] as const;

export const REVIEWS = [
  {
    name: "Ana Beatriz",
    city: "São Paulo, SP",
    rating: 5,
    product: "Noir Chronograph S1",
    text: "Chegou perfeito, embalagem impecável. O relógio é ainda mais bonito pessoalmente — o aço escovado tem uma qualidade incrível. Atendimento excelente.",
    date: "há 3 dias",
    initials: "AB",
    color: "#1d6df0",
  },
  {
    name: "Rafael Mendes",
    city: "Curitiba, PR",
    rating: 5,
    product: "Urban Runner Pro",
    text: "Segundo par que compro. O amortecimento é absurdo, uso tanto para correr quanto para o dia a dia. Vale cada centavo.",
    date: "há 1 semana",
    initials: "RM",
    color: "#7c3aed",
  },
  {
    name: "Camila Torres",
    city: "Rio de Janeiro, RJ",
    rating: 5,
    product: "Executive Briefcase",
    text: "A pasta chegou em 7 dias. O couro tem um cheiro e toque incríveis, exatamente como descrito. Meu cliente me perguntou de onde era.",
    date: "há 2 semanas",
    initials: "CT",
    color: "#059669",
  },
  {
    name: "Guilherme Alves",
    city: "Belo Horizonte, MG",
    rating: 4,
    product: "ANC Headphones Pro",
    text: "O cancelamento de ruído é de outro nível. Uso no metrô e parece que estou em outro mundo. Bateria durou 33h no meu teste. Recomendo.",
    date: "há 2 semanas",
    initials: "GA",
    color: "#d97706",
  },
  {
    name: "Fernanda Lima",
    city: "Porto Alegre, RS",
    rating: 5,
    product: "Merino Turtleneck",
    text: "Nunca imaginei que lã podia ser tão macia. Zero coceira, e no inverno gaúcho faz toda a diferença. Vou pedir mais cores.",
    date: "há 3 semanas",
    initials: "FL",
    color: "#dc2626",
  },
  {
    name: "Bruno Costa",
    city: "Florianópolis, SC",
    rating: 5,
    product: "Pour-Over Ceramic Set",
    text: "Presente para a minha esposa. Ela amou — disse que é o item mais bonito da cozinha. A cerâmica tem um charme artesanal real, cada peça é única.",
    date: "há 1 mês",
    initials: "BC",
    color: "#0891b2",
  },
] as const;
