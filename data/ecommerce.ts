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
    price: 2490,
    originalPrice: 2990,
    category: "Watches",
    tags: ["New", "Limited"],
    gradient: "from-slate-800 to-slate-900",
    badge: "Limited",
    rating: 4.9,
    reviews: 127,
    description: "A precision-crafted chronograph with sapphire crystal and Swiss movement.",
    features: ["Swiss ETA movement", "Sapphire crystal", "300m water resistant", "5-year warranty"],
    inStock: true,
  },
  {
    id: "p2",
    name: "Matte Noir Sunglasses",
    brand: "Optic Luxe",
    price: 480,
    category: "Eyewear",
    tags: ["Bestseller"],
    gradient: "from-zinc-900 to-zinc-800",
    badge: "Bestseller",
    rating: 4.8,
    reviews: 342,
    description: "Handcrafted Italian acetate frames with polarized UV400 lenses.",
    features: ["Italian acetate", "Polarized lenses", "UV400 protection", "Case included"],
    inStock: true,
  },
  {
    id: "p3",
    name: "Leather Weekender Bag",
    brand: "Alder & Co.",
    price: 890,
    originalPrice: 1100,
    category: "Bags",
    tags: ["Sale"],
    gradient: "from-amber-900 to-stone-800",
    badge: "Sale",
    rating: 4.7,
    reviews: 89,
    description: "Full-grain vegetable-tanned leather with brass fittings. Improves with age.",
    features: ["Full-grain leather", "Brass hardware", "Interior laptop sleeve", "Lifetime repair"],
    inStock: true,
  },
  {
    id: "p4",
    name: "Merino Wool Sweater",
    brand: "Nordic Craft",
    price: 320,
    category: "Apparel",
    tags: ["New"],
    gradient: "from-stone-700 to-stone-600",
    rating: 4.6,
    reviews: 201,
    description: "Extra-fine Merino wool from sustainably sourced farms in Patagonia.",
    features: ["Extra-fine Merino", "Sustainable sourcing", "Machine washable", "8 colorways"],
    inStock: true,
  },
  {
    id: "p5",
    name: "Carbon Fibre Wallet",
    brand: "Apex Gear",
    price: 195,
    category: "Accessories",
    tags: ["Compact"],
    gradient: "from-neutral-900 to-neutral-700",
    rating: 4.9,
    reviews: 518,
    description: "Ultra-thin carbon fibre wallet with RFID blocking. Holds up to 12 cards.",
    features: ["Carbon fibre", "RFID blocking", "12-card capacity", "50g weight"],
    inStock: true,
  },
  {
    id: "p6",
    name: "Ceramic Pour-Over Set",
    brand: "Form & Brew",
    price: 145,
    originalPrice: 185,
    category: "Home",
    tags: ["Sale"],
    gradient: "from-white/10 to-white/5",
    badge: "Sale",
    rating: 4.8,
    reviews: 163,
    description: "Handmade ceramic pour-over dripper and carafe set. Each piece is unique.",
    features: ["Handmade ceramic", "Matte glaze", "Dishwasher safe", "Includes filters"],
    inStock: true,
  },
];

export const categories = ["All", "Watches", "Eyewear", "Bags", "Apparel", "Accessories", "Home"];
