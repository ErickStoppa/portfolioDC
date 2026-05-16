export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  calories: number;
  tags: string[];
  emoji: string;
  popular?: boolean;
}

export const menuItems: MenuItem[] = [
  {
    id: "m1",
    name: "Wagyu Beef Burger",
    description: "Blend A5 Wagyu, aioli de trufas, cheddar curado, brioche",
    price: 95,
    category: "Pratos Principais",
    calories: 780,
    tags: ["Escolha do Chef", "Assinatura"],
    emoji: "🍔",
    popular: true,
  },
  {
    id: "m2",
    name: "Salmão Selado",
    description: "Salmão atlântico, manteiga yuzu, pepino em conserva, microervas",
    price: 105,
    category: "Pratos Principais",
    calories: 520,
    tags: ["Saudável"],
    emoji: "🐟",
    popular: true,
  },
  {
    id: "m3",
    name: "Massa com Trufa Negra",
    description: "Tagliatelle fresca, lâminas de trufa negra, parmesão, creme",
    price: 85,
    category: "Pratos Principais",
    calories: 640,
    tags: ["Vegetariano"],
    emoji: "🍝",
  },
  {
    id: "m4",
    name: "Burrata & Heirloom",
    description: "Burrata fresca, tomates heirloom, azeite de manjericão, fleur de sel",
    price: 55,
    category: "Entradas",
    calories: 280,
    tags: ["Vegetariano"],
    emoji: "🥗",
    popular: true,
  },
  {
    id: "m5",
    name: "Tartare de Atum",
    description: "Atum yellowfin, abacate, gergelim, ponzu, crisps de wonton",
    price: 70,
    category: "Entradas",
    calories: 310,
    tags: ["Cru"],
    emoji: "🍣",
  },
  {
    id: "m6",
    name: "Calamari Crocante",
    description: "Calamari em tempura, aioli de páprica defumada, limão",
    price: 45,
    category: "Entradas",
    calories: 450,
    tags: [],
    emoji: "🦑",
  },
  {
    id: "m7",
    name: "Fondant de Chocolate Amargo",
    description: "Chocolate Valrhona 70%, caramelo salgado, sorvete de baunilha",
    price: 40,
    category: "Sobremesas",
    calories: 520,
    tags: ["Assinatura"],
    emoji: "🍫",
    popular: true,
  },
  {
    id: "m8",
    name: "Tarte de Yuzu",
    description: "Curd de yuzu, merengue italiano tostado, gengibre cristalizado",
    price: 35,
    category: "Sobremesas",
    calories: 380,
    tags: ["Sem Glúten"],
    emoji: "🍋",
  },
  {
    id: "m9",
    name: "Matcha Latte",
    description: "Matcha cerimonial, leite de aveia, mel suave",
    price: 18,
    category: "Bebidas",
    calories: 120,
    tags: ["Sem Álcool"],
    emoji: "🍵",
  },
  {
    id: "m10",
    name: "Champagne Spritz",
    description: "Moët & Chandon, flor de sabugueiro, pepino, hortelã",
    price: 45,
    category: "Bebidas",
    calories: 180,
    tags: ["Alcoólico"],
    emoji: "🥂",
  },
];

export const menuCategories = ["Todos", "Entradas", "Pratos Principais", "Sobremesas", "Bebidas"];

export const orderStatuses = [
  { step: 0, label: "Pedido Recebido", icon: "📋", emoji: "📋" },
  { step: 1, label: "Em Preparo", icon: "👨‍🍳", emoji: "👨‍🍳" },
  { step: 2, label: "Pronto", icon: "✅", emoji: "✅" },
  { step: 3, label: "Saiu para Entrega", icon: "🛵", emoji: "🛵" },
  { step: 4, label: "Entregue", icon: "🎉", emoji: "🎉" },
];
