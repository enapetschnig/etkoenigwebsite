"use client";

import { Phone } from "@phosphor-icons/react";
import { motion } from "framer-motion";

export function PhoneButton() {
  return (
    <motion.a
      href="tel:+436645319079"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 pl-4 pr-5 py-3 bg-primary text-white rounded-full shadow-lg shadow-primary/30 hover:bg-primary-hover hover:shadow-primary/40 active:scale-[0.96] transition-all group"
      aria-label="Jetzt anrufen: +43 664 531 90 79"
    >
      <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors">
        <Phone size={16} weight="fill" />
      </span>
      <span className="text-sm font-semibold hidden sm:block">+43 664 531 90 79</span>
      <span className="text-sm font-semibold sm:hidden">Anrufen</span>
    </motion.a>
  );
}
