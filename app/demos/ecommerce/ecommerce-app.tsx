"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Search,
  X,
  Star,
  Plus,
  Minus,
  Check,
  Heart,
  ChevronDown,
} from "lucide-react";
import { products, categories } from "@/data/ecommerce";
import type { Product } from "@/data/ecommerce";
import { formatCurrency } from "@/lib/utils";

// ── Types ──────────────────────────────────────────────────────────────────
type CartItem = Product & {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
};
type SortKey = "relevance" | "price-asc" | "price-desc" | "sold" | "new";

// ── Constants ──────────────────────────────────────────────────────────────
const CATEGORY_LABELS: Record<string, string> = {
  todos: "Todos",
  relogios: "Relógios",
  calcados: "Calçados",
  bolsas: "Bolsas",
  tech: "Tech",
  vestuario: "Vestuário",
  casa: "Casa",
};

const NAV_LINKS = [
  { label: "Todos", value: "todos" },
  { label: "Novidades", value: "novidades" },
  { label: "Mais Vendidos", value: "mais-vendidos" },
  { label: "Relógios", value: "relogios" },
  { label: "Tech", value: "tech" },
  { label: "Estilo", value: "estilo" },
  { label: "Sale", value: "oferta" },
];

const TRUST_BADGES = [
  { icon: "🚚", title: "Frete Grátis", sub: "Acima de R$500" },
  { icon: "🔄", title: "30 dias", sub: "Devolução garantida" },
  { icon: "🔒", title: "Pagamento Seguro", sub: "SSL + criptografia" },
  { icon: "⭐", title: "4.9/5 Avaliação", sub: "+12.000 clientes" },
];

const REVIEWS = [
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
];

// ── Hooks ──────────────────────────────────────────────────────────────────
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobile(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [breakpoint]);
  return isMobile;
}

function useFocusTrap(
  ref: React.RefObject<HTMLElement | null>,
  active: boolean,
) {
  useEffect(() => {
    if (!active) return;
    const el = ref.current;
    if (!el) return;
    const focusable = el.querySelectorAll<HTMLElement>(
      'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    el.addEventListener("keydown", handleTab);
    return () => el.removeEventListener("keydown", handleTab);
  }, [ref, active]);
}

function useEscKey(callback: () => void) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") callback();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [callback]);
}

// ── Helpers ────────────────────────────────────────────────────────────────
function StarRow({
  rating,
  count,
  size = "sm",
}: {
  rating: number;
  count?: number;
  size?: "xs" | "sm";
}) {
  const cls = size === "xs" ? "w-2.5 h-2.5" : "w-3 h-3";
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${cls} ${i < Math.floor(rating) ? "text-amber-400 fill-amber-400" : "text-white/20"}`}
        />
      ))}
      {count !== undefined && (
        <span className="ml-1 text-xs text-white/30">({count})</span>
      )}
    </div>
  );
}

// ── ProductCard ────────────────────────────────────────────────────────────
function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onOpen,
  selectedColor,
  onSelectColor,
  selectedSize,
  onSelectSize,
}: {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  onAddToCart: (p: Product, color?: string, size?: string) => void;
  onOpen: (p: Product) => void;
  selectedColor: string | undefined;
  onSelectColor: (id: string, color: string) => void;
  selectedSize: string | undefined;
  onSelectSize: (id: string, size: string) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [heartScale, setHeartScale] = useState(1);
  const [imgError, setImgError] = useState(false);

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHeartScale(1.3);
    setTimeout(() => setHeartScale(1), 200);
    onToggleWishlist(product.id);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedColor, selectedSize);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="relative cursor-pointer overflow-hidden rounded-xl bg-[#0c0c18]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(product)}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        {imgError ? (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] to-[#16213e]" />
        ) : (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {/* Hover overlay */}
        <div
          className="absolute inset-0 bg-black/20 transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0 }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.badge && (
            <span className="text-[10px] bg-black/80 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
              {product.badge}
            </span>
          )}
          {product.discount && (
            <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
          onClick={handleWishlist}
          aria-label={
            isWishlisted
              ? `Remover ${product.name} dos favoritos`
              : `Adicionar ${product.name} aos favoritos`
          }
        >
          <motion.div
            animate={{ scale: heartScale }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <Heart
              className={`w-4 h-4 ${isWishlisted ? "fill-red-500 text-red-500" : "text-white"}`}
            />
          </motion.div>
        </button>

        {/* Quick-add */}
        <motion.div
          className="absolute bottom-0 left-0 right-0"
          animate={{ y: hovered ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
          onClick={(e) => e.stopPropagation()}
        >
          {product.sizes ? (
            <div className="bg-[#0c0c18]/95 backdrop-blur-sm px-3 py-2 flex items-center gap-1.5">
              {product.sizes.slice(0, 4).map((s) => (
                <button
                  key={s}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectSize(product.id, s);
                  }}
                  className={`text-xs px-2 py-1 rounded border transition-colors ${
                    selectedSize === s
                      ? "bg-white text-black border-white"
                      : "border-white/20 text-white/60 hover:border-white/40"
                  }`}
                >
                  {s}
                </button>
              ))}
              <button
                onClick={handleQuickAdd}
                className="ml-auto text-xs bg-white text-black font-semibold px-3 py-1.5 rounded"
              >
                Adicionar
              </button>
            </div>
          ) : (
            <button
              onClick={handleQuickAdd}
              className="w-full h-10 bg-white text-black font-semibold text-sm"
            >
              Adicionar ao Carrinho
            </button>
          )}
        </motion.div>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-[11px] text-white/40 uppercase tracking-wider">
          {product.brand}
        </p>
        <p className="text-sm font-medium text-white line-clamp-2 mt-0.5">
          {product.name}
        </p>
        <div className="mt-1">
          <StarRow rating={product.rating} count={product.reviews} size="xs" />
        </div>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-sm font-semibold text-white">
            {formatCurrency(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-white/30 line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
        </div>
        {product.colors && (
          <div
            className="flex items-center gap-1.5 mt-2"
            onClick={(e) => e.stopPropagation()}
          >
            {product.colors.map((c) => (
              <button
                key={c}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectColor(product.id, c);
                }}
                aria-label={`Cor ${c}`}
                className={`w-3 h-3 rounded-full border border-white/20 transition-transform ${
                  selectedColor === c
                    ? "scale-125 ring-1 ring-white ring-offset-1 ring-offset-[#0c0c18]"
                    : ""
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}

// ── ProductModal ───────────────────────────────────────────────────────────
function ProductModal({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onClose,
  imgIndex,
  onSelectImg,
  selectedColor,
  onSelectColor,
  selectedSize,
  onSelectSize,
}: {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  onAddToCart: (p: Product, color?: string, size?: string) => void;
  onClose: () => void;
  imgIndex: number;
  onSelectImg: (id: string, idx: number) => void;
  selectedColor: string | undefined;
  onSelectColor: (id: string, color: string) => void;
  selectedSize: string | undefined;
  onSelectSize: (id: string, size: string) => void;
}) {
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const allImages = [product.image, ...product.images];
  const savings = product.originalPrice
    ? product.originalPrice - product.price
    : 0;

  useEscKey(onClose);
  useFocusTrap(panelRef, true);

  const handleAdd = () => {
    onAddToCart(product, selectedColor, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const panelInitial = isMobile
    ? { y: "100%", opacity: 1, scale: 1 }
    : { y: 0, scale: 0.96, opacity: 0 };
  const panelAnimate = { y: 0, scale: 1, opacity: 1 };
  const panelExit = isMobile
    ? { y: "100%", opacity: 1, scale: 1 }
    : { y: 0, scale: 0.96, opacity: 0 };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <motion.div
        ref={panelRef}
        initial={panelInitial}
        animate={panelAnimate}
        exit={panelExit}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
        className="relative bg-[#0c0c18] rounded-t-2xl md:rounded-2xl w-full md:max-w-[680px] max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Image column */}
          <div className="md:w-1/2 p-4 flex flex-col gap-3 shrink-0">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-[#111120]">
              {imgError ? (
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] to-[#16213e]" />
              ) : (
                <img
                  src={allImages[imgIndex] ?? product.image}
                  alt={product.name}
                  loading="eager"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              )}
              {product.badge && (
                <span className="absolute top-3 left-3 text-xs bg-black/80 text-white px-2.5 py-1 rounded-full">
                  {product.badge}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              {allImages.slice(0, 4).map((src, i) => (
                <button
                  key={i}
                  onClick={() => onSelectImg(product.id, i)}
                  className={`w-[70px] h-[70px] rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    imgIndex === i
                      ? "border-white"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`Ver imagem ${i + 1}`}
                >
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info column */}
          <div className="md:w-1/2 p-4 md:p-6 flex flex-col gap-4 overflow-y-auto">
            <div>
              <p className="text-xs text-white/40 uppercase tracking-wider">
                {product.brand}
                {product.origin ? ` · ${product.origin}` : ""}
              </p>
              <h2
                id="modal-title"
                className="text-2xl font-black text-white mt-1"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {product.name}
              </h2>
              <div className="mt-2">
                <StarRow rating={product.rating} count={product.reviews} />
              </div>
              <p className="text-xs text-white/50 mt-2">
                🚚 Chegará em {product.deliveryDays - 2}–
                {product.deliveryDays + 2} dias úteis
              </p>
            </div>

            <div className="h-px bg-white/8" />

            {/* Price */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-2xl font-bold text-white">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-white/30 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
              {savings > 0 && (
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">
                  Economize {formatCurrency(savings)}
                </span>
              )}
            </div>

            {/* Colors */}
            {product.colors && (
              <div>
                <p className="text-xs text-white/50 mb-2">Cor:</p>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => onSelectColor(product.id, c)}
                      aria-label={`Cor ${c}`}
                      className={`w-6 h-6 rounded-full transition-all ${
                        selectedColor === c
                          ? "ring-2 ring-white ring-offset-2 ring-offset-[#0c0c18]"
                          : "opacity-60 hover:opacity-100"
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && (
              <div>
                <p className="text-xs text-white/50 mb-2">Tamanho:</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => onSelectSize(product.id, s)}
                      className={`px-3 py-1.5 border rounded-lg text-sm transition-colors ${
                        selectedSize === s
                          ? "bg-white text-black border-white"
                          : "border-white/20 text-white/60 hover:border-white/40"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Meta */}
            <div className="flex gap-4 text-xs text-white/40 flex-wrap">
              {product.material && <span>Material: {product.material}</span>}
              {product.origin && <span>{product.origin}</span>}
            </div>

            <p className="text-xs text-green-400">
              ✓ {product.sold.toLocaleString("pt-BR")} pessoas compraram esta
              semana
            </p>

            {/* CTAs */}
            <div className="flex gap-2">
              <button
                onClick={handleAdd}
                className="flex-1 h-12 bg-white text-black font-bold rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" /> Adicionado!
                  </>
                ) : (
                  "Adicionar ao Carrinho"
                )}
              </button>
              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`w-12 h-12 border rounded-lg flex items-center justify-center transition-colors ${
                  isWishlisted
                    ? "border-red-500/50 bg-red-500/10"
                    : "border-white/20 hover:bg-white/8"
                }`}
                aria-label={
                  isWishlisted
                    ? "Remover dos favoritos"
                    : "Adicionar aos favoritos"
                }
              >
                <Heart
                  className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-white"}`}
                />
              </button>
            </div>

            {/* Features */}
            <ul className="flex flex-col gap-1.5">
              {product.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-sm text-white/60"
                >
                  <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>

            <p className="text-sm text-white/50 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── CartSidebar ────────────────────────────────────────────────────────────
function CartSidebar({
  cart,
  onClose,
  onRemove,
  onQtyChange,
  onAddToCart,
  allProducts,
  coupon,
  onCouponChange,
  couponApplied,
  couponError,
  onApplyCoupon,
}: {
  cart: CartItem[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onQtyChange: (id: string, qty: number) => void;
  onAddToCart: (p: Product) => void;
  allProducts: Product[];
  coupon: string;
  onCouponChange: (v: string) => void;
  couponApplied: boolean;
  couponError: boolean;
  onApplyCoupon: () => void;
}) {
  const [showCoupon, setShowCoupon] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal >= 500 ? 0 : 29.9;
  const discountAmount = couponApplied ? subtotal * 0.1 : 0;
  const total = subtotal - discountAmount + shipping;
  const freeShippingProgress = Math.min((subtotal / 500) * 100, 100);
  const cartIds = new Set(cart.map((i) => i.id));
  const upsell = allProducts.filter((p) => !cartIds.has(p.id)).slice(0, 2);

  useEscKey(onClose);
  useFocusTrap(sidebarRef, true);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex justify-end"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <motion.aside
        ref={sidebarRef}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 400, damping: 40 }}
        className="relative w-full md:w-[400px] bg-[#0c0c18] border-l border-white/8 flex flex-col h-full"
        role="dialog"
        aria-modal="true"
        aria-label="Sacola de compras"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
          <div className="flex items-center gap-2">
            <span
              className="font-black tracking-[0.2em] text-white"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              LUXE
            </span>
            <span className="text-sm text-white/50">
              Sacola ({cart.reduce((s, i) => s + i.quantity, 0)})
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:bg-white/8 transition-colors"
            aria-label="Fechar sacola"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free shipping bar */}
        <div className="px-5 py-3 border-b border-white/6">
          <p className="text-xs text-white/50 mb-2">
            {subtotal >= 500
              ? "🎉 Você ganhou frete grátis!"
              : `Falta ${formatCurrency(500 - subtotal)} para frete grátis!`}
          </p>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              animate={{ width: `${freeShippingProgress}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-16">
              <ShoppingBag className="w-10 h-10 text-white/20 mb-3" />
              <p className="text-sm text-white/40">Sua sacola está vazia</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="relative flex gap-3">
                <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-[#111120]">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 pr-5">
                  <p className="text-[11px] text-white/40 uppercase tracking-wider">
                    {item.brand}
                  </p>
                  <p className="text-sm font-medium text-white line-clamp-1">
                    {item.name}
                  </p>
                  {(item.selectedColor || item.selectedSize) && (
                    <p className="text-xs text-white/40 mt-0.5">
                      {[item.selectedSize, item.selectedColor]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  )}
                  <p className="text-sm font-semibold text-white mt-1">
                    {formatCurrency(item.price)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onQtyChange(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-md bg-white/8 flex items-center justify-center hover:bg-white/16 transition-colors"
                      aria-label={`Diminuir quantidade de ${item.name}`}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-white w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onQtyChange(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-md bg-white/8 flex items-center justify-center hover:bg-white/16 transition-colors"
                      aria-label={`Aumentar quantidade de ${item.name}`}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button className="ml-1 text-xs text-white/30 hover:text-white/60 transition-colors">
                      Salvar para depois
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  className="absolute top-0 right-0 text-white/30 hover:text-red-400 transition-colors"
                  aria-label={`Remover ${item.name}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}

          {/* Upsell */}
          {cart.length > 0 && upsell.length > 0 && (
            <div className="mt-2">
              <p className="text-xs text-white/40 uppercase tracking-wider mb-3">
                Complete o Look
              </p>
              <div className="flex flex-col gap-2">
                {upsell.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-3 p-2 rounded-lg bg-white/4 border border-white/6"
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-[#111120]">
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white line-clamp-1">
                        {p.name}
                      </p>
                      <p className="text-xs text-white/40">
                        {formatCurrency(p.price)}
                      </p>
                    </div>
                    <button
                      onClick={() => onAddToCart(p)}
                      className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center shrink-0"
                      aria-label={`Adicionar ${p.name} ao carrinho`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-white/8 px-5 py-4 space-y-3">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/50">Subtotal</span>
                <span className="text-white">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Frete</span>
                <span
                  className={shipping === 0 ? "text-green-400" : "text-white"}
                >
                  {shipping === 0 ? "Grátis" : formatCurrency(shipping)}
                </span>
              </div>
              {couponApplied && (
                <div className="flex justify-between text-green-400 text-sm">
                  <span>Desconto (LUXE10)</span>
                  <span>-{formatCurrency(discountAmount)}</span>
                </div>
              )}
              <div className="h-px bg-white/8" />
              <div className="flex justify-between font-bold text-white">
                <span>Total</span>
                <span className="text-lg">{formatCurrency(total)}</span>
              </div>
            </div>

            {/* Coupon */}
            <div>
              {!showCoupon ? (
                <button
                  onClick={() => setShowCoupon(true)}
                  className="text-xs text-white/30 hover:text-white/60 transition-colors"
                >
                  Tem um cupom?
                </button>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) =>
                      onCouponChange(e.target.value.toUpperCase())
                    }
                    placeholder="LUXE10"
                    className="flex-1 h-8 px-3 rounded-lg bg-[#111120] border border-white/8 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-white/20"
                    aria-label="Código do cupom"
                  />
                  <button
                    onClick={onApplyCoupon}
                    className="h-8 px-3 rounded-lg bg-white text-black text-xs font-semibold"
                  >
                    Aplicar
                  </button>
                </div>
              )}
              {couponError && (
                <p className="text-xs text-red-400 mt-1">Cupom inválido</p>
              )}
              {couponApplied && (
                <p className="text-xs text-green-400 mt-1">
                  ✓ 10% de desconto aplicado!
                </p>
              )}
            </div>

            <button
              onClick={() => setCheckedOut(true)}
              className="w-full h-12 bg-white text-black font-bold rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              {checkedOut ? (
                <>
                  <Check className="w-4 h-4" /> Pedido Realizado!
                </>
              ) : (
                "Finalizar Compra"
              )}
            </button>
            <p className="text-xs text-white/40 text-center">
              ou parcele em 12x de {formatCurrency(total / 12)} sem juros
            </p>
          </div>
        )}
      </motion.aside>
    </motion.div>
  );
}

// ── EcommerceApp ───────────────────────────────────────────────────────────
export function EcommerceApp() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState("todos");
  const [sortBy, setSortBy] = useState<SortKey>("relevance");
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState(false);
  const [selectedColor, setSelectedColor] = useState<Record<string, string>>(
    {},
  );
  const [selectedSize, setSelectedSize] = useState<Record<string, string>>({});
  const [selectedImageIndex, setSelectedImageIndex] = useState<
    Record<string, number>
  >({});
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCategory === "oferta") {
      list = list.filter((p) => (p.discount ?? 0) > 0 || p.badge === "Oferta");
    } else if (activeCategory === "novidades") {
      list = list.filter(
        (p) => p.badge === "Novo" || p.badge === "Edição Limitada",
      );
    } else if (activeCategory === "mais-vendidos") {
      list = list.filter((p) => p.sold >= 900);
    } else if (activeCategory === "estilo") {
      list = list.filter(
        (p) => p.category === "vestuario" || p.category === "calcados",
      );
    } else if (activeCategory !== "todos") {
      list = list.filter((p) => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) =>
        [p.name, p.brand, ...(p.tags ?? [])].some((s) =>
          s.toLowerCase().includes(q),
        ),
      );
    }
    switch (sortBy) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "sold":
        list.sort((a, b) => b.sold - a.sold);
        break;
      case "new":
        list.sort((a, b) => Number(b.id.slice(1)) - Number(a.id.slice(1)));
        break;
    }
    return list;
  }, [activeCategory, search, sortBy]);

  const topSold = useMemo(
    () => [...products].sort((a, b) => b.sold - a.sold).slice(0, 4),
    [],
  );
  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);

  const addToCart = useCallback(
    (product: Product, color?: string, size?: string) => {
      setCart((prev) => {
        const existing = prev.find((i) => i.id === product.id);
        if (existing)
          return prev.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
          );
        return [
          ...prev,
          { ...product, quantity: 1, selectedColor: color, selectedSize: size },
        ];
      });
    },
    [],
  );

  const removeFromCart = useCallback(
    (id: string) => setCart((prev) => prev.filter((i) => i.id !== id)),
    [],
  );

  const updateQty = useCallback(
    (id: string, qty: number) => {
      if (qty <= 0) {
        removeFromCart(id);
        return;
      }
      setCart((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)),
      );
    },
    [removeFromCart],
  );

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id],
    );
  }, []);

  const handleSelectColor = useCallback(
    (id: string, c: string) => setSelectedColor((p) => ({ ...p, [id]: c })),
    [],
  );
  const handleSelectSize = useCallback(
    (id: string, s: string) => setSelectedSize((p) => ({ ...p, [id]: s })),
    [],
  );
  const handleSelectImg = useCallback(
    (id: string, idx: number) =>
      setSelectedImageIndex((p) => ({ ...p, [id]: idx })),
    [],
  );

  const handleApplyCoupon = useCallback(() => {
    if (coupon === "LUXE10") {
      setCouponApplied(true);
      setCouponError(false);
    } else {
      setCouponError(true);
      setCouponApplied(false);
    }
  }, [coupon]);

  const categoryPills = [...categories] as string[];

  return (
    <div className="min-h-screen bg-[#07070e] text-white">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track { animation: marquee 28s linear infinite; display: flex; }
      `}</style>

      {/* ── SEÇÃO 1: Announcement Bar ── */}
      <div className="bg-black h-8 flex items-center overflow-hidden sticky top-0 z-50">
        <div className="marquee-track whitespace-nowrap">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="text-white/60 text-xs px-16 shrink-0">
              🚚 Frete Grátis acima de R$500 &nbsp;·&nbsp; Entrega em 5-12 dias
              úteis &nbsp;·&nbsp; Parcele em 12x sem juros
            </span>
          ))}
        </div>
      </div>

      {/* ── SEÇÃO 2: Navbar ── */}
      <nav
        className="sticky z-40 border-b border-white/6"
        style={{
          top: "32px",
          background: "rgba(7,7,14,0.92)",
          backdropFilter: "blur(20px)",
        }}
        role="navigation"
        aria-label="Navegação principal"
      >
        <div className="max-w-7xl mx-auto px-5 h-[60px] flex items-center justify-between gap-4">
          <span
            className="text-white font-black tracking-[0.2em] text-lg shrink-0"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            LUXE
          </span>

          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <button
                key={link.value}
                onClick={() => setActiveCategory(link.value)}
                className={`text-xs transition-colors ${
                  activeCategory === link.value
                    ? "text-white"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1">
            {/* Search */}
            <div className="flex items-center">
              <AnimatePresence>
                {searchOpen && (
                  <motion.input
                    key="search-input"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 160, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar..."
                    autoFocus
                    className="h-8 px-3 rounded-lg bg-[#111120] border border-white/8 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 mr-1"
                    aria-label="Buscar produtos"
                  />
                )}
              </AnimatePresence>
              <button
                onClick={() => {
                  setSearchOpen((v) => !v);
                  if (searchOpen) setSearch("");
                }}
                className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/8 transition-colors"
                aria-label="Abrir busca"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Wishlist */}
            <button
              className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/8 transition-colors"
              aria-label={`Favoritos (${wishlist.length})`}
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-black flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/8 transition-colors"
              aria-label={`Sacola (${totalItems} itens)`}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 1.4 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[var(--primary)] text-white text-[10px] font-black flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* ── SEÇÃO 3: Hero ── */}
      <section className="bg-gradient-to-b from-[#07070e] to-[#0c0c18] h-[380px] md:h-[520px] flex items-center">
        <div className="max-w-7xl mx-auto px-5 w-full flex items-center gap-12">
          <div className="flex-1">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-block border border-white/10 bg-white/5 text-white/30 text-xs rounded-full px-3 py-1 mb-4"
            >
              Nova Coleção 2025
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl font-black text-white leading-[1.05]"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Crafted for those who
              <br />
              notice the details.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-base text-white/50 mt-4 max-w-md"
            >
              Peças selecionadas de marcas independentes ao redor do mundo.
              Qualidade sem concessões.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-3 mt-6 flex-wrap"
            >
              <button
                onClick={() =>
                  document
                    .getElementById("catalog")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-white text-black font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                Explorar Coleção
              </button>
              <button
                onClick={() => setActiveCategory("mais-vendidos")}
                className="border border-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/8 transition-colors"
              >
                Ver Mais Vendidos
              </button>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-[11px] text-white/30 mt-4"
            >
              ★ 4.9 &nbsp;·&nbsp; +12.000 clientes &nbsp;·&nbsp; Frete grátis
              &nbsp;·&nbsp; Devoluções em 30 dias
            </motion.p>
          </div>

          {/* Hero mini-grid */}
          <div className="hidden md:grid grid-cols-2 gap-2 w-[220px] shrink-0">
            {products.slice(0, 4).map((p, i) => (
              <motion.button
                key={p.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                onClick={() => setSelectedProduct(p)}
                className="w-[104px] h-[104px] rounded-xl overflow-hidden"
                aria-label={`Ver ${p.name}`}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  loading="eager"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEÇÃO 4: Trust Badges ── */}
      <div className="border-y border-white/6 py-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="max-w-7xl mx-auto px-5 flex gap-8 overflow-x-auto justify-center"
        >
          {TRUST_BADGES.map((badge) => (
            <motion.div
              key={badge.title}
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              className="flex items-center gap-3 shrink-0"
            >
              <span className="text-2xl">{badge.icon}</span>
              <div>
                <p className="text-sm font-bold text-white">{badge.title}</p>
                <p className="text-[11px] text-white/40">{badge.sub}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── SEÇÃO 5: Em Alta Agora ── */}
      <section className="max-w-7xl mx-auto px-5 py-12">
        <div className="mb-6">
          <h2
            className="text-2xl font-black text-white"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Em Alta Agora
          </h2>
          <p className="text-sm text-white/50 mt-1">
            Os mais adicionados ao carrinho esta semana
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {topSold.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedProduct(p)}
              className="group text-left rounded-xl overflow-hidden bg-[#0c0c18]"
              aria-label={`Ver ${p.name}`}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-white line-clamp-1">
                  {p.name}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm font-semibold text-white">
                    {formatCurrency(p.price)}
                  </span>
                  <span className="text-[10px] text-white/40">
                    🔥 {p.sold.toLocaleString("pt-BR")} vendidos
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ── SEÇÃO 6: Banner Promocional ── */}
      <div className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] h-[100px] flex items-center">
        <div className="max-w-7xl mx-auto px-5 w-full flex items-center justify-between gap-4">
          <p className="text-white font-semibold text-sm md:text-base">
            SALE — Até 30% OFF em peças selecionadas. Somente esta semana.
          </p>
          <button
            onClick={() => {
              setActiveCategory("oferta");
              document
                .getElementById("catalog")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="shrink-0 bg-white text-black font-semibold px-4 py-2 rounded-lg text-sm hover:opacity-90 transition-opacity"
          >
            Ver Ofertas
          </button>
        </div>
      </div>

      {/* ── SEÇÃO 7: Catálogo ── */}
      <section id="catalog" className="max-w-7xl mx-auto px-5 py-12">
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <div>
            <h2
              className="text-2xl font-black text-white"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Coleção Completa
            </h2>
            <p className="text-sm text-white/40 mt-0.5">
              {filtered.length} produtos encontrados
            </p>
          </div>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="appearance-none h-9 pl-3 pr-8 rounded-lg bg-[#111120] border border-white/8 text-xs text-white focus:outline-none focus:border-white/20"
              aria-label="Ordenar por"
            >
              <option value="relevance">Relevância</option>
              <option value="price-asc">Menor Preço</option>
              <option value="price-desc">Maior Preço</option>
              <option value="sold">Mais Vendidos</option>
              <option value="new">Novidades</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40 pointer-events-none" />
          </div>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {categoryPills.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm transition-all ${
                activeCategory === cat
                  ? "bg-white text-black font-semibold"
                  : "border border-white/20 text-white/60 hover:text-white hover:border-white/40"
              }`}
            >
              {CATEGORY_LABELS[cat] ?? cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlist.includes(product.id)}
                onToggleWishlist={toggleWishlist}
                onAddToCart={addToCart}
                onOpen={setSelectedProduct}
                selectedColor={selectedColor[product.id]}
                onSelectColor={handleSelectColor}
                selectedSize={selectedSize[product.id]}
                onSelectSize={handleSelectSize}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ── SEÇÃO 10: Social Proof ── */}
      <section className="max-w-7xl mx-auto px-5 py-12 border-t border-white/6">
        <h2
          className="text-2xl font-black text-white mb-8"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          O que dizem nossos clientes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {REVIEWS.map((review) => (
            <div
              key={review.name}
              className="p-4 rounded-xl bg-[#0c0c18] border border-white/6"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ backgroundColor: review.color }}
                >
                  {review.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {review.name}
                  </p>
                  <p className="text-[11px] text-white/40">{review.city}</p>
                </div>
              </div>
              <StarRow rating={review.rating} size="xs" />
              <p className="text-xs text-white/40 mt-1 mb-2">
                Comprou: {review.product}
              </p>
              <p className="text-sm text-white/70 leading-relaxed">
                {review.text}
              </p>
              <p className="text-[11px] text-white/30 mt-3">{review.date}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SEÇÃO 11: Newsletter ── */}
      <section
        className="border-t border-white/8 py-16"
        style={{
          background:
            "linear-gradient(to bottom, rgba(29,109,240,0.1), transparent)",
        }}
      >
        <div className="max-w-lg mx-auto px-5 text-center">
          <h2
            className="text-2xl font-black text-white mb-2"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Acesso antecipado a novas coleções
          </h2>
          <p className="text-sm text-white/50 mb-6">
            Junte-se a 12.000 pessoas com gosto apurado. Sem spam, apenas as
            peças certas.
          </p>
          {newsletterSubmitted ? (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-400 font-semibold"
            >
              ✓ Você está na lista!
            </motion.p>
          ) : (
            <div className="flex gap-2">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="seu@email.com"
                className="flex-1 h-11 px-4 rounded-lg bg-[#111120] border border-white/8 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/20"
                aria-label="Seu e-mail"
              />
              <button
                onClick={() => {
                  if (newsletterEmail) setNewsletterSubmitted(true);
                }}
                className="h-11 px-5 bg-white text-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                Entrar
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── SEÇÃO 12: Footer ── */}
      <footer className="border-t border-white/8 bg-[#07070e] py-12">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <span
                className="font-black tracking-[0.2em] text-white text-lg block mb-2"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                LUXE
              </span>
              <p className="text-xs text-white/40 mb-1">Curated for the Few</p>
              <p className="text-xs text-white/30 leading-relaxed">
                Peças selecionadas de marcas independentes ao redor do mundo.
                Qualidade sem concessões.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
                Links
              </p>
              {["Sobre", "Coleções", "Blog", "Carreiras", "Imprensa"].map(
                (link) => (
                  <button
                    key={link}
                    className="block text-xs text-white/40 hover:text-white transition-colors mb-2"
                  >
                    {link}
                  </button>
                ),
              )}
            </div>
            <div>
              <p className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
                Atendimento
              </p>
              {["Contato", "FAQ", "Trocas", "Rastrear pedido", "Whatsapp"].map(
                (link) => (
                  <button
                    key={link}
                    className="block text-xs text-white/40 hover:text-white transition-colors mb-2"
                  >
                    {link}
                  </button>
                ),
              )}
            </div>
            <div>
              <p className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
                Pagamentos
              </p>
              <div className="flex flex-wrap gap-2">
                {["VISA", "MASTER", "PIX", "AMEX"].map((method) => (
                  <span
                    key={method}
                    className="text-[11px] text-white/50 border border-white/16 rounded px-2 py-1"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-white/8 pt-6">
            <p className="text-xs text-white/20 text-center">
              © 2025 LUXE. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* ── Overlays ── */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            key="modal"
            product={selectedProduct}
            isWishlisted={wishlist.includes(selectedProduct.id)}
            onToggleWishlist={toggleWishlist}
            onAddToCart={(p, color, size) => {
              addToCart(p, color, size);
              setSelectedProduct(null);
            }}
            onClose={() => setSelectedProduct(null)}
            imgIndex={selectedImageIndex[selectedProduct.id] ?? 0}
            onSelectImg={handleSelectImg}
            selectedColor={selectedColor[selectedProduct.id]}
            onSelectColor={handleSelectColor}
            selectedSize={selectedSize[selectedProduct.id]}
            onSelectSize={handleSelectSize}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cartOpen && (
          <CartSidebar
            key="cart"
            cart={cart}
            onClose={() => setCartOpen(false)}
            onRemove={removeFromCart}
            onQtyChange={updateQty}
            onAddToCart={addToCart}
            allProducts={products}
            coupon={coupon}
            onCouponChange={setCoupon}
            couponApplied={couponApplied}
            couponError={couponError}
            onApplyCoupon={handleApplyCoupon}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
