import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import GoldButton from "./GoldButton";

import haldiImg from "@/assets/gallery/haldi.jpg";
import mehndiImg from "@/assets/gallery/mehndi.jpg";
import varmalaImg from "@/assets/gallery/varmala.jpg";
import candidImg from "@/assets/gallery/candid.jpg";
import pherasImg from "@/assets/gallery/pheras.jpg";
import bridalImg from "@/assets/gallery/bridal.jpg";
import receptionImg from "@/assets/gallery/reception.jpg";
import sunsetImg from "@/assets/gallery/sunset.jpg";

interface Props {
  onNext: () => void;
}

const galleryItems = [
  { src: haldiImg, label: "Haldi Ceremony", caption: "Golden moments of joy" },
  { src: mehndiImg, label: "Mehndi", caption: "Art of love on her hands" },
  { src: varmalaImg, label: "Varmala", caption: "Two hearts, one garland" },
  { src: candidImg, label: "Together Forever", caption: "Walking into forever" },
  { src: pherasImg, label: "Sacred Pheras", caption: "Seven vows, one destiny" },
  { src: bridalImg, label: "The Bride", caption: "Grace personified" },
  { src: receptionImg, label: "Celebration", caption: "Dancing under the stars" },
  { src: sunsetImg, label: "Eternal Love", caption: "A love story begins" },
];

/* Floating sparkle particles */
const Sparkle = ({ delay, x, y, size }: { delay: number; x: number; y: number; size: number }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      left: `${x}%`,
      top: `${y}%`,
      background: `radial-gradient(circle, hsl(43 80% 75%), transparent)`,
    }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
    }}
    transition={{
      duration: 2.5 + Math.random() * 2,
      delay,
      repeat: Infinity,
      repeatDelay: Math.random() * 3,
    }}
  />
);

/* Decorative animated corner */
const AnimatedCorner = ({ position }: { position: "tl" | "tr" | "bl" | "br" }) => {
  const posClasses: Record<string, string> = {
    tl: "top-2 left-2",
    tr: "top-2 right-2 rotate-90",
    bl: "bottom-2 left-2 -rotate-90",
    br: "bottom-2 right-2 rotate-180",
  };

  return (
    <motion.div
      className={`absolute ${posClasses[position]} pointer-events-none z-20`}
      animate={{ opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M2 26V8C2 4.68629 4.68629 2 8 2H26" stroke="url(#corner-grad)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M2 20V12C2 7.58172 5.58172 4 10 4H18" stroke="url(#corner-grad)" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <circle cx="2" cy="26" r="1.5" fill="hsl(43 72% 55%)" opacity="0.7" />
        <defs>
          <linearGradient id="corner-grad" x1="2" y1="26" x2="26" y2="2">
            <stop stopColor="hsl(43 72% 55%)" />
            <stop offset="0.5" stopColor="hsl(340 50% 65%)" />
            <stop offset="1" stopColor="hsl(280 40% 60%)" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

/* Lightbox */
const Lightbox = ({
  image,
  onClose,
}: {
  image: (typeof galleryItems)[0] | null;
  onClose: () => void;
}) => (
  <AnimatePresence>
    {image && (
      <motion.div
        className="fixed inset-0 z-[300] flex items-center justify-center bg-foreground/80 backdrop-blur-md p-4 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        onClick={onClose}
      >
        <motion.div
          className="relative max-w-3xl w-full"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={image.src}
            alt={image.label}
            className="w-full rounded-2xl shadow-2xl"
            style={{ maxHeight: "80vh", objectFit: "contain" }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 rounded-b-2xl"
            style={{ background: "linear-gradient(transparent, hsla(0, 20%, 5%, 0.8))" }}>
            <p className="font-display text-xl text-primary-foreground">{image.label}</p>
            <p className="font-decorative text-sm text-primary-foreground/70 mt-1">{image.caption}</p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-10 h-10 rounded-full bg-foreground/50 backdrop-blur-sm flex items-center justify-center text-primary-foreground text-lg hover:bg-foreground/70 transition-colors"
          >
            ✕
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

/* Main Gallery Card */
const GalleryCard = ({
  item,
  index,
  onClick,
}: {
  item: (typeof galleryItems)[0];
  index: number;
  onClick: () => void;
}) => (
  <motion.div
    className="relative group cursor-pointer"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
    onClick={onClick}
  >
    {/* Animated gradient border wrapper */}
    <div className="relative p-[2px] rounded-[22px] overflow-hidden gallery-border-glow">
      {/* Glassmorphic card */}
      <div className="relative rounded-[20px] overflow-hidden bg-card/40 backdrop-blur-xl shadow-lg group-hover:shadow-gold transition-shadow duration-700">
        {/* Decorative corners */}
        <AnimatedCorner position="tl" />
        <AnimatedCorner position="tr" />
        <AnimatedCorner position="bl" />
        <AnimatedCorner position="br" />

        {/* Image container */}
        <div className="relative aspect-square overflow-hidden rounded-[20px]">
          <motion.img
            src={item.src}
            alt={item.label}
            loading="lazy"
            width={800}
            height={800}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.15]"
          />

          {/* Vignette overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, transparent 50%, hsla(0, 20%, 5%, 0.25) 100%)",
            }}
          />

          {/* Hover glow effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: "radial-gradient(circle at center, hsl(43 72% 55% / 0.12) 0%, transparent 70%)",
            }}
          />

          {/* Hover overlay with label */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-end pb-6 px-4"
            style={{
              background: "linear-gradient(transparent 40%, hsla(0, 20%, 5%, 0.65) 100%)",
            }}
            initial={false}
          >
            <motion.p
              className="font-display text-lg text-primary-foreground opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0"
            >
              {item.label}
            </motion.p>
            <motion.p
              className="font-decorative text-xs text-primary-foreground/70 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75 translate-y-2 group-hover:translate-y-0 mt-1"
            >
              {item.caption}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  </motion.div>
);

const SceneGallery = ({ onNext }: Props) => {
  const [lightboxImage, setLightboxImage] = useState<(typeof galleryItems)[0] | null>(null);

  const sparkles = useMemo(
    () =>
      Array.from({ length: 25 }, (_, i) => ({
        id: i,
        delay: Math.random() * 4,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 3 + Math.random() * 5,
      })),
    []
  );

  return (
    <>
      <div className="relative flex min-h-screen flex-col items-center justify-start bg-ivory px-4 md:px-8 py-16 overflow-hidden">
        {/* Floating sparkle particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {sparkles.map((s) => (
            <Sparkle key={s.id} {...s} />
          ))}
        </div>

        {/* Cinematic vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 60%, hsl(var(--ivory) / 0.5) 100%)",
          }}
        />

        <motion.div
          className="relative z-10 flex flex-col items-center gap-10 w-full max-w-6xl"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {/* Section header */}
          <motion.div
            className="text-center space-y-4"
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
          >
            <p className="font-body text-xs uppercase tracking-[0.4em] text-muted-foreground">
              Precious Moments
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-maroon">Our Gallery</h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-gold opacity-50" />
              <span className="text-gold text-xl">✦</span>
              <div className="h-px w-16 bg-gold opacity-50" />
            </div>
            <p className="font-decorative text-lg text-maroon-light/70 max-w-md mx-auto">
              A journey of love captured in timeless frames
            </p>
          </motion.div>

          {/* Gallery grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full">
            {galleryItems.map((item, i) => (
              <GalleryCard
                key={item.label}
                item={item}
                index={i}
                onClick={() => setLightboxImage(item)}
              />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="mt-4"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            <GoldButton onClick={onNext}>Countdown</GoldButton>
          </motion.div>
        </motion.div>
      </div>

      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </>
  );
};

export default SceneGallery;
