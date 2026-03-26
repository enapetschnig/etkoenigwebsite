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

// Mobile: simple autoplay video + static pills
function MobileScrollVideo() {
  return (
    <div className="bg-white">
      {/* Video */}
      <div className="relative w-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-auto"
        >
          <source src="/scrollstop-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Pills directly under video */}
      <div className="px-3 py-4 bg-white space-y-1.5">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <Link
              key={service.title}
              href={service.ctaHref}
              className="flex items-center gap-3 rounded-xl px-4 py-3 bg-white border border-border/40 hover:border-primary/20 hover:shadow-sm transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon size={18} weight="light" className="text-primary" />
              </div>
              <span className="text-sm font-semibold text-foreground flex-1">{service.title}</span>
              <ArrowRight size={14} weight="bold" className="text-primary" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// Desktop: full scroll-stop experience
function DesktopScrollVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [activeCard, setActiveCard] = useState(-1);
  const currentFrameRef = useRef(0);

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

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, cw, ch);

    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    ctx.drawImage(img, 0, 0, iw, ih, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
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
  }, [imagesLoaded, drawFrame]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const frameIndex = Math.min(Math.floor(latest * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1);
    if (frameIndex !== currentFrameRef.current) {
      currentFrameRef.current = frameIndex;
      if (imagesLoaded) drawFrame(frameIndex);
    }
    setActiveCard(services.findIndex((s) => latest >= s.range[0] && latest <= s.range[1]));
  });

  useEffect(() => {
    if (imagesLoaded) drawFrame(0);
  }, [imagesLoaded, drawFrame]);

  return (
    <div ref={containerRef} className="relative bg-white" style={{ height: `${TOTAL_FRAMES * 55}px` }}>
      <div className="sticky top-0 h-dvh w-full overflow-hidden bg-white">
        <canvas ref={canvasRef} className="absolute inset-0" />

        {!imagesLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Service pills */}
        <div className="absolute inset-x-0 bottom-0 pb-8">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
            <div className="flex flex-row items-end gap-3">
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
                    className={`flex-1 rounded-xl px-5 py-3.5 backdrop-blur-lg transition-all duration-300 ${
                      isActive
                        ? "bg-white/95 shadow-lg shadow-black/5 border border-primary/20"
                        : "bg-white/70 border border-border/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                        isActive ? "bg-primary/15" : "bg-black/[0.03]"
                      }`}>
                        <Icon size={18} weight={isActive ? "fill" : "light"} className={`transition-colors duration-300 ${
                          isActive ? "text-primary" : "text-muted/50"
                        }`} />
                      </div>
                      <span className={`text-base font-semibold transition-colors duration-300 ${
                        isActive ? "text-foreground" : "text-muted/60"
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
                            className="inline-flex items-center gap-1 px-4 py-2 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover transition-all"
                          >
                            Anfragen
                            <ArrowRight size={12} weight="bold" />
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

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
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

export function ScrollVideo() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  if (!mounted) return null;

  return isMobile ? <MobileScrollVideo /> : <DesktopScrollVideo />;
}
