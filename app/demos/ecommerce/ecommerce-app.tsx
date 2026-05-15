"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, X, Star, Plus, Minus, Check, ArrowRight, Filter } from "lucide-react";
import { products, categories, type CartItem, type Product } from "@/data/ecommerce";
import { formatCurrency } from "@/lib/utils";

function CartSidebar({
  items,
  onClose,
  onRemove,
  onQtyChange,
}: {
  items: CartItem[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onQtyChange: (id: string, qty: number) => void;
}) {
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const [checkedOut, setCheckedOut] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex"
    >
      {/* Backdrop */}
      <div
        className="flex-1 bg-black/60 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 400, damping: 40 }}
        className="w-full max-w-sm bg-[#09090f] border-l border-white/8 flex flex-col h-full"
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[var(--primary)]" />
            <h2 className="text-sm font-bold text-white">Your Cart</h2>
            {items.length > 0 && (
              <span className="text-xs bg-[var(--primary)] text-white rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/8 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4 px-5 flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
              <ShoppingBag className="w-10 h-10 text-white/20 mb-3" />
              <p className="text-sm text-white/40">Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 p-3 rounded-xl bg-white/4 border border-white/6">
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${item.gradient} shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/40 font-medium">{item.brand}</p>
                  <p className="text-sm font-semibold text-white truncate">{item.name}</p>
                  <p className="text-sm font-bold text-[var(--primary)] mt-1">
                    {formatCurrency(item.price)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onQtyChange(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-md bg-white/8 flex items-center justify-center hover:bg-white/16 transition-colors text-white"
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-white w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onQtyChange(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-md bg-white/8 flex items-center justify-center hover:bg-white/16 transition-colors text-white"
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="ml-auto text-white/30 hover:text-red-400 transition-colors"
                      aria-label={`Remove ${item.name}`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-white/8 p-5 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Subtotal</span>
              <span className="font-bold text-white">{formatCurrency(total)}</span>
            </div>
            <div className="flex justify-between text-xs text-white/30">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="h-px bg-white/8" />
            <div className="flex justify-between">
              <span className="font-bold text-white">Total</span>
              <span className="font-black text-lg text-white">{formatCurrency(total)}</span>
            </div>
            <button
              onClick={() => setCheckedOut(true)}
              className="w-full h-11 rounded-xl bg-[var(--primary)] text-white font-semibold flex items-center justify-center gap-2 hover:bg-[var(--primary-hover)] transition-colors shadow-[0_0_20px_var(--primary-glow)]"
            >
              {checkedOut ? (
                <>
                  <Check className="w-4 h-4" />
                  Order Placed!
                </>
              ) : (
                <>
                  Checkout
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
            {checkedOut && (
              <p className="text-xs text-center text-[var(--primary)]">
                This is a demo — no real order was placed.
              </p>
            )}
          </div>
        )}
      </motion.aside>
    </motion.div>
  );
}

function ProductModal({ product, onClose, onAddToCart }: {
  product: Product;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
}) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <motion.div
        initial={{ scale: 0.95, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 10 }}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
        className="relative bg-[#0c0c16] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden"
        role="dialog"
        aria-label={product.name}
        aria-modal="true"
      >
        {/* Image */}
        <div className={`h-56 bg-gradient-to-br ${product.gradient} relative`}>
          {product.badge && (
            <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-[var(--primary)] text-white text-xs font-bold">
              {product.badge}
            </span>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            aria-label="Close product details"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-xs text-white/40 font-medium uppercase tracking-wider mb-1">{product.brand}</p>
          <h2 className="text-xl font-black text-white mb-1" style={{ fontFamily: "var(--font-outfit)" }}>{product.name}</h2>
          <div className="flex items-center gap-1.5 mb-3">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-sm font-semibold text-white">{product.rating}</span>
            <span className="text-sm text-white/30">({product.reviews} reviews)</span>
          </div>
          <p className="text-sm text-white/60 leading-relaxed mb-4">{product.description}</p>
          <ul className="grid grid-cols-2 gap-1.5 mb-5">
            {product.features.map((f) => (
              <li key={f} className="flex items-center gap-1.5 text-xs text-white/50">
                <Check className="w-3 h-3 text-[var(--success)] shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-black text-white">{formatCurrency(product.price)}</span>
              {product.originalPrice && (
                <span className="ml-2 text-sm text-white/30 line-through">{formatCurrency(product.originalPrice)}</span>
              )}
            </div>
            <button
              onClick={handleAdd}
              className="h-11 px-6 rounded-xl bg-[var(--primary)] text-white font-semibold flex items-center gap-2 hover:bg-[var(--primary-hover)] transition-all shadow-[0_0_20px_var(--primary-glow)]"
            >
              {added ? (
                <><Check className="w-4 h-4" />Added!</>
              ) : (
                <><Plus className="w-4 h-4" />Add to Cart</>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function EcommerceApp() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    let list = products;
    if (activeCategory !== "All") list = list.filter((p) => p.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    }
    return list;
  }, [activeCategory, search]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => setCart((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) { removeFromCart(id); return; }
    setCart((prev) => prev.map((i) => i.id === id ? { ...i, quantity: qty } : i));
  };

  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#07070e] text-white font-sans">
      {/* Nav */}
      <nav className="sticky top-0 z-30 border-b border-white/6 bg-[#07070e]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between gap-4">
          <span className="text-lg font-black tracking-tight" style={{ fontFamily: "var(--font-outfit)" }}>
            LUXE
          </span>

          <div className="flex-1 max-w-xs relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
            <input
              type="search"
              placeholder="Search…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search products"
              className="w-full h-8 pl-8 pr-3 rounded-lg bg-white/6 border border-white/8 text-xs text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
            />
          </div>

          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 h-9 px-3 rounded-lg bg-white/6 border border-white/8 text-xs font-medium text-white hover:bg-white/10 transition-colors"
            aria-label={`Cart (${totalItems} items)`}
          >
            <ShoppingBag className="w-4 h-4" />
            {totalItems > 0 && (
              <motion.span
                key={totalItems}
                initial={{ scale: 1.4 }}
                animate={{ scale: 1 }}
                className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[var(--primary)] text-white text-[10px] font-black flex items-center justify-center"
              >
                {totalItems}
              </motion.span>
            )}
          </button>
        </div>
      </nav>

      {/* Category filters */}
      <div className="border-b border-white/6 bg-[#07070e]">
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center gap-2 overflow-x-auto" role="tablist">
          <Filter className="w-3.5 h-3.5 text-white/30 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                activeCategory === cat
                  ? "bg-[var(--primary)] text-white"
                  : "text-white/40 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products grid */}
      <main className="max-w-6xl mx-auto px-5 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-white/40">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>

        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((product) => (
              <motion.article
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                {/* Image */}
                <div className={`relative aspect-square rounded-2xl bg-gradient-to-br ${product.gradient} overflow-hidden mb-3`}>
                  {product.badge && (
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-[var(--primary)] text-white text-[10px] font-bold">
                      {product.badge}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors duration-300" />
                  <button
                    onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                    className="absolute bottom-3 right-3 w-9 h-9 rounded-xl bg-[var(--primary)] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-[var(--primary-hover)] shadow-lg"
                    aria-label={`Add ${product.name} to cart`}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Info */}
                <p className="text-[10px] text-white/40 uppercase tracking-wider font-medium">{product.brand}</p>
                <p className="text-sm font-semibold text-white truncate">{product.name}</p>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-xs text-white/50">{product.rating}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.originalPrice && (
                      <span className="text-xs text-white/30 line-through">{formatCurrency(product.originalPrice)}</span>
                    )}
                    <span className="text-sm font-bold text-white">{formatCurrency(product.price)}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={(p) => { addToCart(p); setSelectedProduct(null); }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cartOpen && (
          <CartSidebar
            items={cart}
            onClose={() => setCartOpen(false)}
            onRemove={removeFromCart}
            onQtyChange={updateQty}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
