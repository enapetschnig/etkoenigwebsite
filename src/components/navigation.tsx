"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, X } from "@phosphor-icons/react";
import { Logo } from "./logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/hls-installationen", label: "HLS-Installationen" },
  { href: "/photovoltaik", label: "Photovoltaik" },
  { href: "/elektroinstallation", label: "Elektroinstallation" },
  { href: "/fachhandel", label: "Fachhandel" },
  { href: "/mietpark", label: "Mietpark" },
  { href: "/projekte", label: "Projekte" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/kontakt", label: "Kontakt" },
];

function checkIfNavOverDark(): boolean {
  const darkSections = document.querySelectorAll("[data-nav-dark]");
  if (darkSections.length === 0) return false;

  const navBottom = 70; // nav sits roughly in the top 70px

  for (const section of darkSections) {
    const rect = section.getBoundingClientRect();
    // If the dark section covers the nav area
    if (rect.top < navBottom && rect.bottom > 0) {
      return true;
    }
  }
  return false;
}

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setIsDarkSection(checkIfNavOverDark());
    };

    // Initial check
    handleScroll();
    // Also check after a short delay (for client-side rendered elements)
    const timeout = setTimeout(handleScroll, 300);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  // White nav: only when nav is transparent (not scrolled) AND sitting on a dark section
  const showWhite = !isScrolled && isDarkSection;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "py-2" : "py-4"
        }`}
      >
        <nav
          className={`mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
            isScrolled
              ? "bg-white/80 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] rounded-full mx-4 lg:mx-8 px-6"
              : ""
          }`}
        >
          <div className="flex items-center justify-between h-14">
            {/* Logo – crossfade between dark and white */}
            <Link href="/" className="flex-shrink-0 relative" aria-label="ET König – Startseite">
              <span
                className="block transition-opacity duration-200"
                style={{ opacity: showWhite ? 0 : 1 }}
              >
                <Logo size="small" variant="dark" />
              </span>
              <span
                className="absolute inset-0 block transition-opacity duration-200"
                style={{ opacity: showWhite ? 1 : 0 }}
              >
                <Logo size="small" variant="white" />
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    showWhite
                      ? "text-white/80 hover:text-white hover:bg-white/10"
                      : "text-foreground/70 hover:text-foreground hover:bg-black/[0.03]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden xl:block">
              <Link
                href="/anfrage"
                className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all"
              >
                Anfrage stellen
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`xl:hidden p-2 transition-colors duration-200 ${
                showWhite
                  ? "text-white/80 hover:text-white"
                  : "text-foreground/70 hover:text-foreground"
              }`}
              aria-label={isMobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
            >
              {isMobileMenuOpen ? <X size={24} weight="light" /> : <List size={24} weight="light" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl xl:hidden"
          >
            <div className="flex flex-col items-center justify-center min-h-dvh gap-2 px-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-6 py-3 text-xl font-medium text-foreground/80 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * navLinks.length, type: "spring", stiffness: 300, damping: 30 }}
                className="mt-6"
              >
                <Link
                  href="/anfrage"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex items-center px-8 py-3 text-lg font-semibold text-white bg-primary rounded-full hover:bg-primary-hover transition-all"
                >
                  Anfrage stellen
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
