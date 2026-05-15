"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Plus, Minus, Clock, MapPin, Check, ChevronRight, Flame } from "lucide-react";
import { menuItems, menuCategories, orderStatuses, type MenuItem } from "@/data/restaurant";
import { formatCurrency } from "@/lib/utils";

interface CartItem extends MenuItem {
  quantity: number;
}

function OrderTracker({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);

  const advance = () => setStep((s) => Math.min(s + 1, 4));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 16 }}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
        className="bg-[#0d0a08] border border-white/10 rounded-2xl w-full max-w-sm p-6"
        role="dialog"
        aria-label="Order tracking"
        aria-modal="true"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-white" style={{ fontFamily: "var(--font-outfit)" }}>Order #1842</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors" aria-label="Close order tracker">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col gap-4 mb-6">
          {orderStatuses.map((status) => (
            <div key={status.step} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-500 ${
                status.step <= step
                  ? "bg-[var(--success)] text-white"
                  : "bg-white/8 text-white/30"
              }`}>
                {status.step < step ? <Check className="w-4 h-4" /> : status.emoji}
              </div>
              <span className={`text-sm transition-colors duration-300 ${status.step <= step ? "text-white font-medium" : "text-white/30"}`}>
                {status.label}
              </span>
              {status.step === step && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="ml-auto text-xs text-[var(--success)] font-medium"
                >
                  Now
                </motion.span>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-white/40 mb-4">
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Est. 25–35 min</span>
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> 1.2km away</span>
        </div>

        {step < 4 && (
          <button
            onClick={advance}
            className="w-full h-10 rounded-xl bg-white/8 text-white text-sm font-medium hover:bg-white/12 transition-colors"
          >
            Advance Status (Demo)
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}

export function RestaurantApp() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [trackingOpen, setTrackingOpen] = useState(false);
  const [deliveryMode, setDeliveryMode] = useState<"delivery" | "pickup">("delivery");
  const [ordered, setOrdered] = useState(false);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return menuItems;
    return menuItems.filter((m) => m.category === activeCategory);
  }, [activeCategory]);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.id === item.id);
      if (ex) return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeOne = (id: string) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.id === id);
      if (!ex) return prev;
      if (ex.quantity <= 1) return prev.filter((i) => i.id !== id);
      return prev.map((i) => i.id === id ? { ...i, quantity: i.quantity - 1 } : i);
    });
  };

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);

  const placeOrder = () => {
    setOrdered(true);
    setCartOpen(false);
    setTrackingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0703] text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#0a0703]/95 backdrop-blur-md border-b border-white/6">
        <div className="max-w-2xl mx-auto px-5 h-14 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-black tracking-tight" style={{ fontFamily: "var(--font-outfit)" }}>SAVEUR</h1>
            <p className="text-[10px] text-white/40">Fine Dining & Delivery</p>
          </div>

          {/* Delivery toggle */}
          <div className="flex items-center gap-1 bg-white/6 rounded-xl p-1">
            {(["delivery", "pickup"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setDeliveryMode(mode)}
                className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-all ${
                  deliveryMode === mode
                    ? "bg-amber-500 text-black"
                    : "text-white/50 hover:text-white"
                }`}
                aria-pressed={deliveryMode === mode}
              >
                {mode}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-1.5 h-9 px-3 rounded-xl bg-white/6 border border-white/8 text-xs font-medium text-white hover:bg-white/10 transition-colors"
            aria-label={`Cart (${totalItems} items)`}
          >
            <ShoppingBag className="w-4 h-4" />
            {totalItems > 0 && (
              <motion.span
                key={totalItems}
                initial={{ scale: 1.4 }}
                animate={{ scale: 1 }}
                className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-amber-500 text-black text-[10px] font-black flex items-center justify-center"
              >
                {totalItems}
              </motion.span>
            )}
          </button>
        </div>
      </header>

      {/* Hero */}
      <div className="relative px-5 py-8 max-w-2xl mx-auto">
        <div className="rounded-2xl bg-gradient-to-br from-amber-900/40 to-orange-900/20 border border-amber-500/20 p-5 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30" style={{
            background: "radial-gradient(ellipse at 80% 50%, rgba(245,158,11,0.2) 0%, transparent 70%)"
          }} aria-hidden="true" />
          <div className="relative">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-2">
              <Flame className="w-3.5 h-3.5" />
              Today&apos;s Special
            </div>
            <p className="text-xl font-black text-white" style={{ fontFamily: "var(--font-outfit)" }}>
              Free delivery on orders over $50
            </p>
            <p className="text-sm text-white/50 mt-1">Use code SAVEUR at checkout</p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-5 max-w-2xl mx-auto mb-4">
        <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Menu categories">
          {menuCategories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-amber-500 text-black"
                  : "bg-white/6 text-white/50 hover:text-white hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu grid */}
      <main className="max-w-2xl mx-auto px-5 pb-24 grid gap-3">
        {filtered.map((item) => {
          const cartItem = cart.find((c) => c.id === item.id);
          return (
            <motion.article
              key={item.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white/4 border border-white/6 hover:border-white/12 transition-colors"
            >
              {/* Emoji/image */}
              <div className="w-14 h-14 rounded-xl bg-white/8 flex items-center justify-center text-3xl shrink-0 select-none">
                {item.emoji}
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="text-sm font-bold text-white truncate">{item.name}</h3>
                  {item.popular && (
                    <span className="shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400">Popular</span>
                  )}
                </div>
                <p className="text-xs text-white/40 leading-relaxed line-clamp-1">{item.description}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-sm font-black text-amber-400">{formatCurrency(item.price)}</span>
                  <span className="text-[10px] text-white/25">{item.calories} cal</span>
                  {item.tags.slice(0, 1).map((t) => (
                    <span key={t} className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/8 text-white/40">{t}</span>
                  ))}
                </div>
              </div>
              {/* Add/remove */}
              <div className="shrink-0 flex items-center gap-1.5">
                {cartItem ? (
                  <>
                    <button
                      onClick={() => removeOne(item.id)}
                      className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                      aria-label={`Remove one ${item.name}`}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-bold text-white w-4 text-center">{cartItem.quantity}</span>
                  </>
                ) : null}
                <button
                  onClick={() => addToCart(item)}
                  className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center text-black hover:bg-amber-400 transition-colors"
                  aria-label={`Add ${item.name} to cart`}
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.article>
          );
        })}
      </main>

      {/* Cart panel */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex"
          >
            <div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={() => setCartOpen(false)} aria-hidden="true" />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
              className="w-full max-w-xs bg-[#0d0a05] border-l border-white/8 flex flex-col"
              role="dialog"
              aria-label="Your order"
              aria-modal="true"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
                <h2 className="font-bold text-white">Your Order</h2>
                <button onClick={() => setCartOpen(false)} className="text-white/40 hover:text-white" aria-label="Close">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Delivery info */}
              <div className="px-5 py-3 border-b border-white/6 text-xs text-white/40 flex items-center gap-2">
                {deliveryMode === "delivery"
                  ? <><MapPin className="w-3.5 h-3.5 text-amber-400" /> Delivering to: 42 Park Ave</>
                  : <><Clock className="w-3.5 h-3.5 text-amber-400" /> Pickup in ~15 min</>
                }
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
                {cart.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center py-12 text-center">
                    <span className="text-4xl mb-3">🍽️</span>
                    <p className="text-sm text-white/30">Add items to start your order</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/8 flex items-center justify-center text-xl shrink-0">{item.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-white truncate">{item.name}</p>
                        <p className="text-xs text-amber-400 font-bold">{formatCurrency(item.price * item.quantity)}</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => removeOne(item.id)} className="w-6 h-6 rounded-md bg-white/8 text-white flex items-center justify-center hover:bg-white/16 transition-colors" aria-label={`Remove ${item.name}`}>
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-white">{item.quantity}</span>
                        <button onClick={() => addToCart(item)} className="w-6 h-6 rounded-md bg-white/8 text-white flex items-center justify-center hover:bg-white/16 transition-colors" aria-label={`Add another ${item.name}`}>
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t border-white/8 p-5 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Subtotal</span>
                    <span className="font-bold text-white">{formatCurrency(total)}</span>
                  </div>
                  {deliveryMode === "delivery" && (
                    <div className="flex justify-between text-xs text-white/30">
                      <span>Delivery fee</span>
                      <span className={total >= 50 ? "text-[var(--success)]" : ""}>{total >= 50 ? "Free" : formatCurrency(4.99)}</span>
                    </div>
                  )}
                  <button
                    onClick={placeOrder}
                    className="w-full h-11 rounded-xl bg-amber-500 text-black font-bold flex items-center justify-center gap-2 hover:bg-amber-400 transition-colors"
                  >
                    Place Order
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {trackingOpen && <OrderTracker onClose={() => setTrackingOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
