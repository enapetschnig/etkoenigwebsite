"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import {
  MapPin,
  Phone,
  EnvelopeSimple,
  Clock,
  NavigationArrow,
} from "@phosphor-icons/react";

const TOTAL_FRAMES = 80;
const FRAME_PATH = "/standorte-frames/frame-";

const standorte = [
  {
    name: "Murau",
    tag: "Fachhandel & Filiale",
    address: "Schillerplatz 5, 8850 Murau",
    phone: "+43 3532 200 53",
    email: "murau@et-koenig.at",
    hours: "Mo–Fr: 08:00–18:00 | Sa: 08:30–12:00",
    description: "Unser Elektrofachgeschäft im Herzen von Murau. Persönliche Beratung, Top-Marken zum Anfassen und ein kompetentes Team.",
    mapUrl: "https://maps.google.com/?q=Schillerplatz+5+8850+Murau",
    range: [0.05, 0.33] as [number, number],
  },
  {
    name: "Scheifling",
    tag: "Hauptsitz",
    address: "Baierdorf-Umgebung 103, 8811 Scheifling",
    phone: "+43 664 531 90 79",
    email: "info@et-koenig.at",
    description: "Unsere Zentrale – von hier koordinieren wir alle Projekte in der Steiermark. Verwaltung, Lager und unser größtes Team.",
    mapUrl: "https://maps.google.com/?q=Baierdorf-Umgebung+103+8811+Scheifling",
    range: [0.34, 0.64] as [number, number],
  },
  {
    name: "Feldkirchen",
    tag: "Kärnten",
    address: "10.-Oktober-Straße 21, 9560 Feldkirchen",
    phone: "+43 4276 385 79",
    email: "klaus.grangler@et-koenig.at",
    description: "Unsere Filiale in Kärnten – damit wir auch südlich der Alpen schnell vor Ort sind.",
    mapUrl: "https://maps.google.com/?q=10.-Oktober-Straße+21+9560+Feldkirchen",
    range: [0.65, 0.95] as [number, number],
  },
];

function getFrameSrc(index: number): string {
  const num = String(Math.min(Math.max(index, 1), TOTAL_FRAMES)).padStart(3, "0");
  return `${FRAME_PATH}${num}.jpg`;
}

export function ScrollStandorte() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [activeStandort, setActiveStandort] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);
  const currentFrameRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      img.onload = () => {
        loaded++;
        if (loaded === TOTAL_FRAMES) setImagesLoaded(true);
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      if (imagesLoaded) drawFrame(currentFrameRef.current);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagesLoaded]);

  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[frameIndex];
    if (!canvas || !ctx || !img) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const isPortrait = cw < ch;

    ctx.fillStyle = "#FAFAFA";
    ctx.fillRect(0, 0, cw, ch);

    if (isPortrait) {
      // Mobile: contain in upper half
      const scale = Math.min(cw / iw, (ch * 0.5) / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = cw * 0.08;
      ctx.drawImage(img, 0, 0, iw, ih, dx, dy, dw, dh);
    } else {
      // Desktop: cover
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      ctx.drawImage(img, 0, 0, iw, ih, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    }
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const frameIndex = Math.min(Math.floor(latest * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1);
    if (frameIndex !== currentFrameRef.current) {
      currentFrameRef.current = frameIndex;
      if (imagesLoaded) drawFrame(frameIndex);
    }
    setActiveStandort(standorte.findIndex((s) => latest >= s.range[0] && latest <= s.range[1]));
  });

  useEffect(() => {
    if (imagesLoaded) drawFrame(0);
  }, [imagesLoaded, drawFrame]);

  return (
    <div ref={containerRef} className="relative bg-[#FAFAFA]" style={{ height: `${TOTAL_FRAMES * 50}px` }}>
      <div className="sticky top-0 h-dvh w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0" />

        {!imagesLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#FAFAFA]">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Content – bottom on desktop, below video on mobile */}
        <div className="absolute inset-x-0 bottom-0 pb-4 sm:pb-10">
          <div className="mx-auto max-w-[1400px] px-3 sm:px-6 lg:px-8 w-full">
            {/* Header */}
            <motion.div
              className="mb-3 sm:mb-5"
              animate={{ opacity: imagesLoaded ? 1 : 0 }}
            >
              <p className="text-[10px] sm:text-[11px] font-semibold text-primary uppercase tracking-[0.2em] mb-1">3 Standorte</p>
              <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-foreground">
                Immer in Ihrer Nähe
              </h2>
            </motion.div>

            {/* Standort Cards – vertical on mobile */}
            <div className="flex flex-col sm:grid sm:grid-cols-3 gap-2 sm:gap-3">
              {standorte.map((s, i) => {
                const isActive = activeStandort === i;
                return (
                  <motion.div
                    key={s.name}
                    animate={{
                      opacity: isActive ? 1 : 0.4,
                      scale: isActive ? 1 : 0.97,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className={`rounded-lg sm:rounded-xl px-3 py-2.5 sm:px-5 sm:py-4 backdrop-blur-lg transition-all duration-300 ${
                      isActive
                        ? "bg-white/90 border border-primary/20 shadow-lg shadow-black/5"
                        : "bg-white/50 border border-border/40"
                    }`}
                  >
                    {/* Header row */}
                    <div className="flex items-center justify-between mb-1 sm:mb-2">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <MapPin size={isMobile ? 13 : 15} weight={isActive ? "fill" : "light"} className={isActive ? "text-primary" : "text-muted/40"} />
                        <h3 className={`text-xs sm:text-sm font-bold transition-colors duration-300 ${isActive ? "text-foreground" : "text-muted"}`}>{s.name}</h3>
                      </div>
                      <span className={`text-[8px] sm:text-[9px] font-semibold uppercase tracking-widest px-1.5 sm:px-2 py-0.5 rounded-full transition-colors duration-300 ${
                        isActive ? "bg-primary/10 text-primary" : "bg-background-alt text-muted/40"
                      }`}>
                        {s.tag}
                      </span>
                    </div>

                    {/* Expandable */}
                    <motion.div
                      animate={{
                        height: isActive ? "auto" : 0,
                        opacity: isActive ? 1 : 0,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs sm:text-sm text-muted leading-relaxed mb-2 sm:mb-3">
                        {s.description}
                      </p>

                      <div className="space-y-1.5 sm:space-y-2 mb-2 sm:mb-3">
                        <div className="flex items-center gap-2 text-[11px] sm:text-xs text-muted">
                          <MapPin size={11} weight="light" className="text-primary flex-shrink-0" />
                          <span>{s.address}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] sm:text-xs text-muted">
                          <Phone size={11} weight="light" className="text-primary flex-shrink-0" />
                          <a href={`tel:${s.phone.replace(/\s/g, "")}`} className="hover:text-primary transition-colors font-medium">
                            {s.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] sm:text-xs text-muted">
                          <EnvelopeSimple size={11} weight="light" className="text-primary flex-shrink-0" />
                          <a href={`mailto:${s.email}`} className="hover:text-primary transition-colors">{s.email}</a>
                        </div>
                        {s.hours && (
                          <div className="flex items-center gap-2 text-[11px] sm:text-xs text-muted/70">
                            <Clock size={11} weight="light" className="text-primary flex-shrink-0" />
                            <span>{s.hours}</span>
                          </div>
                        )}
                      </div>

                      <a
                        href={s.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-primary hover:text-primary-hover transition-colors"
                      >
                        <NavigationArrow size={10} weight="bold" />
                        Route planen
                      </a>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
