"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import {
  SolarPanel,
  Drop,
  Lightning,
  Storefront,
  Crane,
  ArrowRight,
} from "@phosphor-icons/react";

const TOTAL_FRAMES = 80;
const FRAME_PATH = "/scroll-frames/frame-";

const services = [
  {
    title: "Photovoltaik",
    icon: SolarPanel,
    ctaHref: "/anfrage/photovoltaik",
    range: [0.04, 0.22] as [number, number],
  },
  {
    title: "HLS-Installationen",
    icon: Drop,
    ctaHref: "/anfrage/hls",
    range: [0.23, 0.41] as [number, number],
  },
  {
    title: "Elektroinstallation",
    icon: Lightning,
    ctaHref: "/anfrage/elektro",
    range: [0.42, 0.59] as [number, number],
  },
  {
    title: "Fachhandel",
    icon: Storefront,
    ctaHref: "/fachhandel",
    range: [0.60, 0.77] as [number, number],
  },
  {
    title: "Mietpark",
    icon: Crane,
    ctaHref: "/kontakt",
    range: [0.78, 0.95] as [number, number],
  },
];

function getFrameSrc(index: number): string {
  const num = String(Math.min(Math.max(index, 1), TOTAL_FRAMES)).padStart(3, "0");
  return `${FRAME_PATH}${num}.jpg`;
}

export function ScrollVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [activeCard, setActiveCard] = useState(-1);
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

  // Preload all frames
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

  // Draw frame – always cover, video fills the whole screen
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[frameIndex];
    if (!canvas || !ctx || !img) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    ctx.drawImage(img, 0, 0, iw, ih, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
  }, []);

  // Resize canvas
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
  }, [imagesLoaded, drawFrame]);

  // Update on scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const frameIndex = Math.min(Math.floor(latest * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1);
    if (frameIndex !== currentFrameRef.current) {
      currentFrameRef.current = frameIndex;
      if (imagesLoaded) drawFrame(frameIndex);
    }
    setActiveCard(services.findIndex((s) => latest >= s.range[0] && latest <= s.range[1]));
  });

  // Draw first frame
  useEffect(() => {
    if (imagesLoaded) drawFrame(0);
  }, [imagesLoaded, drawFrame]);

  // Less scroll distance on mobile
  const scrollHeight = isMobile ? TOTAL_FRAMES * 40 : TOTAL_FRAMES * 55;

  return (
    <div ref={containerRef} className="relative" style={{ height: `${scrollHeight}px` }}>
      <div className="sticky top-0 h-dvh w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0" />

        {!imagesLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#FAFAFA]">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Service pills */}
        <div className="absolute inset-x-0 bottom-0 pb-3 md:pb-8">
          <div className="mx-auto max-w-[1400px] px-3 md:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-stretch md:items-end gap-1.5 md:gap-3">
              {services.map((service, i) => {
                const Icon = service.icon;
                const isActive = activeCard === i;
                return (
                  <motion.div
                    key={service.title}
                    animate={{
                      opacity: isActive ? 1 : 0.5,
                      scale: isActive ? 1 : 0.97,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className={`flex-1 rounded-lg md:rounded-xl px-3 py-2 md:px-4 md:py-3 backdrop-blur-lg transition-all duration-300 ${
                      isActive
                        ? "bg-white/90 shadow-lg shadow-black/5 border border-primary/20"
                        : "bg-white/50 border border-white/60"
                    }`}
                  >
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className={`w-6 h-6 md:w-8 md:h-8 rounded-md flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                        isActive ? "bg-primary/15" : "bg-black/[0.04]"
                      }`}>
                        <Icon size={14} weight={isActive ? "fill" : "light"} className={`transition-colors duration-300 ${
                          isActive ? "text-primary" : "text-muted/60"
                        }`} />
                      </div>
                      <span className={`text-[11px] md:text-sm font-semibold transition-colors duration-300 ${
                        isActive ? "text-foreground" : "text-muted/70"
                      }`}>
                        {service.title}
                      </span>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          className="ml-auto flex-shrink-0"
                        >
                          <Link
                            href={service.ctaHref}
                            className="inline-flex items-center gap-1 px-2 py-1 md:px-3 md:py-1.5 text-[9px] md:text-[11px] font-semibold text-white bg-primary rounded-full hover:bg-primary-hover transition-all"
                          >
                            Anfragen
                            <ArrowRight size={8} weight="bold" />
                          </Link>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scroll indicator – desktop only */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 pointer-events-none"
          animate={{ opacity: activeCard === -1 ? 0.6 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-foreground/20 flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 rounded-full bg-foreground/30" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
