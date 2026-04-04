import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import GoldButton from "./GoldButton";
import SectionBackground from "./SectionBackground";
import SceneFamily from "./SceneFamily";

import haldiImg from "@/assets/gallery/haldi.jpg";
import mehndiImg from "@/assets/gallery/mehndi.jpg";
import varmalaImg from "@/assets/gallery/varmala.jpg";
import candidImg from "@/assets/gallery/candid.jpg";
import pherasImg from "@/assets/gallery/pheras.jpg";
import bridalImg from "@/assets/gallery/bridal.jpg";

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
];

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
      animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.1, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width="34" height="34" viewBox="0 0 28 28" fill="none" style={{ filter: "drop-shadow(0 0 8px hsl(43 72% 55%))" }}>
        <motion.path 
          d="M2 26V8C2 4.68629 4.68629 2 8 2H26" 
          stroke="url(#corner-grad)" strokeWidth="1.5" strokeLinecap="round" 
          initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path 
          d="M2 20V12C2 7.58172 5.58172 4 10 4H18" 
          stroke="url(#corner-grad)" strokeWidth="1" strokeLinecap="round" opacity="0.6" 
          initial={{ pathLength: 0 }} animate={{ pathLength: [1, 0, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle cx="2" cy="26" r="2" fill="hsl(43 72% 55%)" 
          animate={{ scale: [1, 1.8, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}
        />
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
        className="fixed inset-0 z-[300] flex items-center justify-center p-4 cursor-pointer"
        style={{ background: "hsl(0 20% 5% / 0.8)", backdropFilter: "blur(12px)" }}
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
            <p className="font-display text-xl" style={{ color: "hsl(0 0% 95%)" }}>{image.label}</p>
            <p className="font-decorative text-sm mt-1" style={{ color: "hsl(0 0% 80%)" }}>{image.caption}</p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center text-lg transition-colors"
            style={{ background: "hsl(0 20% 15% / 0.5)", color: "hsl(0 0% 95%)" }}
          >
            ✕
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

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
    style={{ perspective: 1200 }}
    initial={{ opacity: 0, y: 50, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    whileHover={{ scale: 1.05, rotateX: 6, rotateY: -6, zIndex: 30 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.1 }}
    onClick={onClick}
  >
    <div className="relative p-[2px] rounded-[22px] overflow-hidden gallery-border-glow">
      <motion.div 
        className="absolute -inset-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: "linear-gradient(270deg, hsl(43 72% 55%), hsl(340 50% 65%), hsl(43 72% 55%))",
          backgroundSize: "200% 200%",
        }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      <div className="relative rounded-[20px] overflow-hidden shadow-lg group-hover:shadow-[0_20px_40px_hsl(43,72%,55%/0.3)] transition-all duration-700 bg-white"
        style={{ backdropFilter: "blur(16px)" }}>
        <AnimatedCorner position="tl" />
        <AnimatedCorner position="tr" />
        <AnimatedCorner position="bl" />
        <AnimatedCorner position="br" />

        <div className="relative aspect-square overflow-hidden rounded-[20px]">
          <motion.img
            src={item.src}
            alt={item.label}
            loading="lazy"
            width={800}
            height={800}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.15]"
          />
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, transparent 50%, hsla(0, 20%, 5%, 0.25) 100%)" }} />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: "radial-gradient(circle at center, hsl(43 72% 55% / 0.12) 0%, transparent 70%)" }} />
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-end pb-6 px-4"
            style={{ background: "linear-gradient(transparent 40%, hsla(0, 20%, 5%, 0.65) 100%)" }}
          >
            <motion.p className="font-display text-lg opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0" style={{ color: "hsl(0 0% 95%)" }}>
              {item.label}
            </motion.p>
            <motion.p className="font-decorative text-xs opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75 translate-y-2 group-hover:translate-y-0 mt-1" style={{ color: "hsl(0 0% 80%)" }}>
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

  return (
    <>
      {/* Family Section */}
      <SceneFamily />

      {/* Gallery Section */}
      <SectionBackground className="flex min-h-screen flex-col items-center justify-start px-4 md:px-8 py-16">
        <motion.div
          className="relative z-10 flex flex-col items-center gap-10 w-full max-w-6xl"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.div
            className="text-center space-y-4"
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
          >
            <p className="font-body text-xs uppercase tracking-[0.4em]" style={{ color: "hsl(0 25% 45%)" }}>
              Precious Moments
            </p>
            <h2 className="font-display text-4xl md:text-5xl" style={{ color: "hsl(0 60% 25%)" }}>Our Gallery</h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16 opacity-50" style={{ background: "hsl(43 72% 50%)" }} />
              <span style={{ color: "hsl(43 72% 50%)" }} className="text-xl">✦</span>
              <div className="h-px w-16 opacity-50" style={{ background: "hsl(43 72% 50%)" }} />
            </div>
            <p className="font-decorative text-lg max-w-md mx-auto" style={{ color: "hsl(0 40% 35% / 0.7)" }}>
              A journey of love captured in timeless frames
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
            {galleryItems.map((item, i) => (
              <GalleryCard
                key={item.label}
                item={item}
                index={i}
                onClick={() => setLightboxImage(item)}
              />
            ))}
          </div>

          <motion.div
            className="mt-4"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            <GoldButton onClick={onNext}>Countdown</GoldButton>
          </motion.div>
        </motion.div>
      </SectionBackground>

      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </>
  );
};

export default SceneGallery;
