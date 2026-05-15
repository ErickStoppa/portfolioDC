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
    description: "A5 Wagyu patty, truffle aioli, aged cheddar, brioche bun",
    price: 38,
    category: "Mains",
    calories: 780,
    tags: ["Chef's Pick", "Signature"],
    emoji: "🍔",
    popular: true,
  },
  {
    id: "m2",
    name: "Seared Salmon",
    description: "Atlantic salmon, yuzu butter, pickled cucumber, micro herbs",
    price: 42,
    category: "Mains",
    calories: 520,
    tags: ["Healthy"],
    emoji: "🐟",
    popular: true,
  },
  {
    id: "m3",
    name: "Black Truffle Pasta",
    description: "Fresh tagliatelle, black truffle shavings, parmesan, cream",
    price: 34,
    category: "Mains",
    calories: 640,
    tags: ["Vegetarian"],
    emoji: "🍝",
  },
  {
    id: "m4",
    name: "Burrata & Heirloom",
    description: "Fresh burrata, heirloom tomatoes, basil oil, fleur de sel",
    price: 22,
    category: "Starters",
    calories: 280,
    tags: ["Vegetarian"],
    emoji: "🥗",
    popular: true,
  },
  {
    id: "m5",
    name: "Tuna Tartare",
    description: "Yellowfin tuna, avocado, sesame, ponzu, wonton crisps",
    price: 28,
    category: "Starters",
    calories: 310,
    tags: ["Raw"],
    emoji: "🍣",
  },
  {
    id: "m6",
    name: "Crispy Calamari",
    description: "Tempura-battered calamari, smoked paprika aioli, lemon",
    price: 18,
    category: "Starters",
    calories: 450,
    tags: [],
    emoji: "🦑",
  },
  {
    id: "m7",
    name: "Dark Chocolate Fondant",
    description: "70% Valrhona chocolate, salted caramel, vanilla ice cream",
    price: 16,
    category: "Desserts",
    calories: 520,
    tags: ["Signature"],
    emoji: "🍫",
    popular: true,
  },
  {
    id: "m8",
    name: "Yuzu Tart",
    description: "Yuzu curd, torched Italian meringue, crystallised ginger",
    price: 14,
    category: "Desserts",
    calories: 380,
    tags: ["Gluten Free"],
    emoji: "🍋",
  },
  {
    id: "m9",
    name: "Matcha Latte",
    description: "Ceremonial grade matcha, oat milk, light honey",
    price: 7,
    category: "Drinks",
    calories: 120,
    tags: ["Non-Alcoholic"],
    emoji: "🍵",
  },
  {
    id: "m10",
    name: "Champagne Spritz",
    description: "Moët & Chandon, elderflower, cucumber, mint",
    price: 18,
    category: "Drinks",
    calories: 180,
    tags: ["Alcoholic"],
    emoji: "🥂",
  },
];

export const menuCategories = ["All", "Starters", "Mains", "Desserts", "Drinks"];

export const orderStatuses = [
  { step: 0, label: "Order Received", icon: "📋", emoji: "📋" },
  { step: 1, label: "Being Prepared", icon: "👨‍🍳", emoji: "👨‍🍳" },
  { step: 2, label: "Ready", icon: "✅", emoji: "✅" },
  { step: 3, label: "Out for Delivery", icon: "🛵", emoji: "🛵" },
  { step: 4, label: "Delivered", icon: "🎉", emoji: "🎉" },
];
