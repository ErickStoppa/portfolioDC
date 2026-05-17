"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section
      className="border-t border-white/8 py-16"
      style={{
        background: "linear-gradient(to bottom, rgba(29,109,240,0.1), transparent)",
      }}
    >
      <div className="max-w-lg mx-auto px-5 text-center">
        <h2 className="text-2xl font-black text-white mb-2 font-display">
          Acesso antecipado a novas coleções
        </h2>
        <p className="text-sm text-white/50 mb-6">
          Junte-se a 12.000 pessoas com gosto apurado. Sem spam, apenas as
          peças certas.
        </p>
        {submitted ? (
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="flex-1 h-11 px-4 rounded-lg bg-[#111120] border border-white/8 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/20"
              aria-label="Seu e-mail"
            />
            <button
              onClick={() => { if (email) setSubmitted(true); }}
              className="h-11 px-5 bg-white text-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Entrar
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
