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
    tag: "Fachhandel",
    address: "Schillerplatz 5, 8850 Murau",
    phone: "+43 3532 200 53",
    email: "murau@et-koenig.at",
    hours: "Mo–Fr: 08–18 Uhr | Sa: 08:30–12",
    description: "Unser Elektrofachgeschäft im Herzen von Murau – persönliche Beratung und Top-Marken.",
    mapUrl: "https://maps.google.com/?q=Schillerplatz+5+8850+Murau",
    range: [0.05, 0.33] as [number, number],
  },
  {
    name: "Scheifling",
    tag: "Hauptsitz",
    address: "Baierdorf-Umgebung 103, 8811 Scheifling",
    phone: "+43 664 531 90 79",
    email: "info@et-koenig.at",
    description: "Unsere Zentrale – von hier koordinieren wir alle Projekte in der Steiermark.",
    mapUrl: "https://maps.google.com/?q=Baierdorf-Umgebung+103+8811+Scheifling",
    range: [0.34, 0.64] as [number, number],
  },
  {
    name: "Feldkirchen",
    tag: "Kärnten",
    address: "10.-Oktober-Str. 21, 9560 Feldkirchen",
    phone: "+43 4276 385 79",
    email: "klaus.grangler@et-koenig.at",
    description: "Unsere Filiale in Kärnten – schnell vor Ort, südlich der Alpen.",
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
  const currentFrameRef = useRef(0);
  const isMobileRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

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

  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[frameIndex];
    if (!canvas || !ctx || !img) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    ctx.fillStyle = "#FAFAFA";
    ctx.fillRect(0, 0, cw, ch);

    if (isMobileRef.current) {
      // Mobile: contain in top half
      const maxH = ch * 0.45;
      const scale = Math.min(cw / iw, maxH / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = ch * 0.05;
      ctx.drawImage(img, 0, 0, iw, ih, dx, dy, dw, dh);
    } else {
      // Desktop: cover
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      ctx.drawImage(img, 0, 0, iw, ih, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      isMobileRef.current = window.innerWidth < 768;
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
  }, [imagesLoaded, drawFrame]);

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

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 pb-3 md:pb-10">
          <div className="mx-auto max-w-[1400px] px-3 md:px-6 lg:px-8 w-full">
            <motion.div className="mb-2 md:mb-5" animate={{ opacity: imagesLoaded ? 1 : 0 }}>
              <p className="text-[10px] md:text-[11px] font-semibold text-primary uppercase tracking-[0.2em] mb-0.5">3 Standorte</p>
              <h2 className="text-base md:text-2xl font-bold tracking-tight text-foreground">Immer in Ihrer Nähe</h2>
            </motion.div>

            <div className="flex flex-col md:grid md:grid-cols-3 gap-1.5 md:gap-3">
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
                    className={`rounded-lg md:rounded-xl px-3 py-2 md:px-5 md:py-4 backdrop-blur-lg transition-all duration-300 ${
                      isActive
                        ? "bg-white/90 border border-primary/20 shadow-lg shadow-black/5"
                        : "bg-white/50 border border-border/40"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={13} weight={isActive ? "fill" : "light"} className={isActive ? "text-primary" : "text-muted/40"} />
                        <h3 className={`text-xs md:text-sm font-bold transition-colors duration-300 ${isActive ? "text-foreground" : "text-muted"}`}>{s.name}</h3>
                      </div>
                      <span className={`text-[8px] md:text-[9px] font-semibold uppercase tracking-widest px-1.5 py-0.5 rounded-full ${
                        isActive ? "bg-primary/10 text-primary" : "bg-background-alt text-muted/40"
                      }`}>{s.tag}</span>
                    </div>

                    <motion.div
                      animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="overflow-hidden"
                    >
                      <p className="text-[11px] md:text-sm text-muted leading-relaxed mt-1.5 mb-2 md:mb-3">{s.description}</p>
                      <div className="space-y-1 md:space-y-2 mb-2">
                        <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-muted">
                          <Phone size={10} weight="light" className="text-primary flex-shrink-0" />
                          <a href={`tel:${s.phone.replace(/\s/g, "")}`} className="font-medium hover:text-primary transition-colors">{s.phone}</a>
                        </div>
                        {s.hours && (
                          <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-muted/70">
                            <Clock size={10} weight="light" className="text-primary flex-shrink-0" />
                            <span>{s.hours}</span>
                          </div>
                        )}
                      </div>
                      <a href={s.mapUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] md:text-[11px] font-semibold text-primary">
                        <NavigationArrow size={9} weight="bold" />Route planen
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
