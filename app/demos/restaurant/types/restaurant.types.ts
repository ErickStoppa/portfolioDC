import type { MenuItem, MenuCategory } from "@/data/restaurant";

export type { MenuCategory };

export type OrderItem = MenuItem & {
  quantity: number;
  note?: string;
};

export type AppMode = "menu" | "delivery";

export type DishFilter = MenuCategory | "todos" | "chef" | "novidades";

export type SortKey = "relevance" | "price-asc" | "price-desc" | "sold" | "new";

export const DELIVERY_TIME_MIN = 35;
export const DELIVERY_TIME_MAX = 50;
export const FREE_DELIVERY_THRESHOLD = 80;
export const DELIVERY_FEE = 8.9;
export const COUPON_CODE = "CAIS10";
export const COUPON_DISCOUNT = 0.1;

export const FILTER_LABELS: Record<DishFilter, string> = {
  todos: "Todos",
  entradas: "Entradas",
  principais: "Pratos Principais",
  massas: "Massas & Risotos",
  grelhados: "Grelhados",
  sobremesas: "Sobremesas",
  bebidas: "Bebidas",
  chef: "Chef's Choice",
  novidades: "Novidades",
};

export const RESTAURANT_INFO = {
  name: "CAIS",
  tagline: "Onde o mar encontra a mesa",
  address: "Av. Atlântica, 2804 — Copacabana, Rio de Janeiro",
  hours: "Terça a Domingo, 12h–23h",
  phone: "(21) 3456-7890",
  instagram: "@cais.restaurante",
  rating: 4.8,
  reviews: 1847,
} as const;

export const ANNOUNCEMENT_ITEMS = [
  "🍷 Carta de vinhos renovada — harmonizações do Sommelier toda sexta",
  "🎵 Música ao vivo aos sábados a partir das 20h",
  "🐟 Pescado do dia: Garoupa do Açores — pergunte ao garçom",
  "✨ Reservas disponíveis pelo WhatsApp ou ligação",
] as const;

export const DELIVERY_REVIEWS = [
  {
    name: "Isabela Fontes",
    city: "Copacabana, RJ",
    rating: 5,
    dish: "Fondant de Chocolate 70%",
    text: "A costela chegou ainda quente e praticamente desmanchando. Embalagem impecável, o molho em separado foi um detalhe que faz toda diferença. Nunca mais peço delivery de outro lugar.",
    date: "há 2 dias",
    initials: "IF",
    color: "#d4a853",
  },
  {
    name: "Pedro Augusto",
    city: "Ipanema, RJ",
    rating: 5,
    dish: "Picanha Dry Aged 21 Dias",
    text: "Comi a picanha e fiquei sem palavras. É impossível fazer isso em casa. O ponto perfeito mesmo depois do delivery. Já pedi 4 vezes esse mês e pretendo manter.",
    date: "há 5 dias",
    initials: "PA",
    color: "#1d6df0",
  },
  {
    name: "Renata Sampaio",
    city: "Leblon, RJ",
    rating: 5,
    dish: "Caipirinha Premium CAIS",
    text: "O jantar no restaurante é incrível, mas o delivery surpreende ainda mais. Recebi o risoto com a textura do al dente intacta — algo que nunca tinha visto em delivery premium.",
    date: "há 1 semana",
    initials: "RS",
    color: "#059669",
  },
  {
    name: "Marcos Leite",
    city: "Barra da Tijuca, RJ",
    rating: 4,
    dish: "Tagliatelle Carbonara",
    text: "A carbonara é ABSURDA. Guanciale real, sem creme — exatamente como deve ser. Chega bem embalada com o molho em temperatura ideal. Minha mulher disse que é melhor que a Itália.",
    date: "há 2 semanas",
    initials: "ML",
    color: "#7c3aed",
  },
  {
    name: "Carla Novaes",
    city: "Santa Teresa, RJ",
    rating: 5,
    dish: "Burrata com Tomate Heirloom",
    text: "Pedi para um jantar com amigos e foi a entrada mais elogiada da noite. Os tomates têm sabor real — coisa que não acho nem na feira. Voltarei ao restaurante logo.",
    date: "há 3 semanas",
    initials: "CN",
    color: "#dc2626",
  },
  {
    name: "Thiago Barbosa",
    city: "Botafogo, RJ",
    rating: 5,
    dish: "Costela Bovina 24 Horas",
    text: "Já comi em restaurantes com estrela Michelin e a costela do CAIS está no mesmo nível. O delivery cuida de cada detalhe. A farofa de cogumelos então — deveria ser vendida separada.",
    date: "há 1 mês",
    initials: "TB",
    color: "#0891b2",
  },
] as const;
