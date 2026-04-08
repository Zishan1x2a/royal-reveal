import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import GoldButton from "./GoldButton";
import SectionBackground from "./SectionBackground";
import PremiumHeading from "./PremiumHeading";
import SceneFamily from "./SceneFamily";

import haldiImg from "@/assets/gallery/haldi.jpg";
import mehndiImg from "@/assets/gallery/mehndi.jpg";
import varmalaImg from "@/assets/gallery/varmala.jpg";
import candidImg from "@/assets/gallery/candid.jpg";
import pherasImg from "@/assets/gallery/pheras.jpg";
import bridalImg from "@/assets/gallery/bridal.jpg";

interface Props { onNext: () => void; }

const galleryItems = [
  { src: haldiImg, label: "Haldi Ceremony", caption: "Golden moments of joy" },
  { src: mehndiImg, label: "Mehndi", caption: "Art of love on her hands" },
  { src: varmalaImg, label: "Varmala", caption: "Two hearts, one garland" },
  { src: candidImg, label: "Together Forever", caption: "Walking into forever" },
  { src: pherasImg, label: "Sacred Pheras", caption: "Seven vows, one destiny" },
  { src: bridalImg, label: "The Bride", caption: "Grace personified" },
];

/* Premium corner ornament for gallery cards */
const GalleryCorner = ({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) => {
  const rotation = { tl: 0, tr: 90, br: 180, bl: 270 }[pos];
  const placement = { tl: "-top-1 -left-1", tr: "-top-1 -right-1", bl: "-bottom-1 -left-1", br: "-bottom-1 -right-1" }[pos];
  return (
    <motion.div className={`absolute ${placement} w-10 h-10 md:w-14 md:h-14 pointer-events-none z-30`}
      style={{ transform: `rotate(${rotation}deg)` }}
      initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
      transition={{ duration: 1.2, type: "spring", bounce: 0.5, delay: 0.3 }}>
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <defs>
          <linearGradient id={`gc-${pos}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700"/><stop offset="100%" stopColor="#A97C25"/>
          </linearGradient>
        </defs>
        <motion.path d="M2,2 L15,2 C25,2 38,15 38,25 L38,38" stroke={`url(#gc-${pos})`} strokeWidth="2" fill="none" strokeLinecap="round"
          animate={{ pathLength: [0, 1, 0.6, 1], opacity: [0.5, 1, 0.6, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}/>
        <motion.path d="M2,2 L2,15 C2,25 15,38 25,38 L38,38" stroke={`url(#gc-${pos})`} strokeWidth="2" fill="none" strokeLinecap="round"
          animate={{ pathLength: [0, 1, 0.6, 1], opacity: [0.5, 1, 0.6, 1] }}
          transition={{ duration: 4, delay: 0.2, repeat: Infinity, ease: "easeInOut" }}/>
        <motion.circle cx="2" cy="2" r="2.5" fill="#D4AF37"
          animate={{ scale: [1, 2, 1], opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}/>
        <motion.circle cx="38" cy="38" r="1.5" fill="#D4AF37"
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 2, delay: 0.5, repeat: Infinity }}/>
      </svg>
    </motion.div>
  );
};

const Lightbox = ({ image, onClose }: { image: (typeof galleryItems)[0] | null; onClose: () => void }) => (
  <AnimatePresence>
    {image && (
      <motion.div className="fixed inset-0 z-[300] flex items-center justify-center p-4 cursor-pointer"
        style={{ background: "hsl(0 20% 5% / 0.8)", backdropFilter: "blur(12px)" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} onClick={onClose}>
        <motion.div className="relative max-w-3xl w-full"
          initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} onClick={(e) => e.stopPropagation()}>
          <img src={image.src} alt={image.label} className="w-full rounded-2xl shadow-2xl" style={{ maxHeight: "80vh", objectFit: "contain" }}/>
          <div className="absolute bottom-0 left-0 right-0 p-6 rounded-b-2xl" style={{ background: "linear-gradient(transparent, hsla(0, 20%, 5%, 0.8))" }}>
            <p className="font-display text-xl" style={{ color: "hsl(0 0% 95%)" }}>{image.label}</p>
            <p className="font-decorative text-sm mt-1" style={{ color: "hsl(0 0% 80%)" }}>{image.caption}</p>
          </div>
          <button onClick={onClose} className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center text-lg transition-colors"
            style={{ background: "hsl(0 20% 15% / 0.5)", color: "hsl(0 0% 95%)" }}>✕</button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const GalleryCard = ({ item, index, onClick }: { item: (typeof galleryItems)[0]; index: number; onClick: () => void }) => (
  <motion.div
    className="relative group cursor-pointer"
    style={{ perspective: 1200 }}
    initial={{ opacity: 0, y: 50, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    whileHover={{ scale: 1.05, rotateX: 4, rotateY: -4, zIndex: 30 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.1 }}
    onClick={onClick}
  >
    <div className="relative p-[2px] rounded-[22px] overflow-visible">
      {/* Animated border glow */}
      <motion.div className="absolute -inset-[2px] rounded-[22px] gallery-border-glow group-hover:opacity-100 opacity-60 transition-opacity duration-500"
        style={{ background: "linear-gradient(270deg, hsl(43 72% 55%), hsl(340 50% 65%), hsl(280 40% 60%), hsl(43 72% 55%))", backgroundSize: "300% 300%" }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}/>

      <div className="relative rounded-[20px] overflow-hidden shadow-lg group-hover:shadow-[0_20px_40px_hsl(43,72%,55%/0.3)] transition-all duration-700 bg-white">
        {/* Corner ornaments */}
        <GalleryCorner pos="tl"/><GalleryCorner pos="tr"/><GalleryCorner pos="bl"/><GalleryCorner pos="br"/>

        {/* Fixed height for uniform cards */}
        <div className="relative overflow-hidden rounded-[20px]" style={{ height: 420 }}>
          <motion.img src={item.src} alt={item.label} loading="lazy" width={800} height={800}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.15]"/>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, transparent 50%, hsla(0, 20%, 5%, 0.25) 100%)" }}/>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: "radial-gradient(circle at center, hsl(43 72% 55% / 0.12) 0%, transparent 70%)" }}/>
          
          {/* Shimmer on hover */}
          <motion.div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: "linear-gradient(105deg, transparent 40%, hsl(43 72% 70% / 0.2) 50%, transparent 60%)" }}
            animate={{ x: ["-100%", "200%"] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}/>

          <motion.div className="absolute inset-0 flex flex-col items-center justify-end pb-6 px-4"
            style={{ background: "linear-gradient(transparent 40%, hsla(0, 20%, 5%, 0.65) 100%)" }}>
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
      <SectionBackground simple={true} className="flex min-h-screen flex-col items-center justify-start px-4 md:px-8 py-20 pb-32">
        <motion.div className="relative z-10 flex flex-col items-center w-full max-w-6xl"
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          <SceneFamily />

          <motion.div className="text-center space-y-4 mb-12"
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}>
            <p className="font-body text-xs uppercase tracking-[0.4em]" style={{ color: "hsl(0 25% 45%)" }}>Precious Moments</p>
            <PremiumHeading text="Our Gallery" fontSize="text-5xl md:text-7xl" simple={true}/>
            <div className="flex items-center justify-center gap-3 -mt-2">
              <div className="h-px w-16 opacity-50" style={{ background: "hsl(43 72% 50%)" }}/>
              <span style={{ color: "hsl(43 72% 50%)" }} className="text-xl">✦</span>
              <div className="h-px w-16 opacity-50" style={{ background: "hsl(43 72% 50%)" }}/>
            </div>
            <p className="font-decorative text-lg max-w-md mx-auto" style={{ color: "hsl(0 40% 35% / 0.7)" }}>
              A journey of love captured in timeless frames
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
            {galleryItems.map((item, i) => (
              <GalleryCard key={item.label} item={item} index={i} onClick={() => setLightboxImage(item)}/>
            ))}
          </div>

          <motion.div className="mt-20" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <GoldButton onClick={onNext}>Countdown</GoldButton>
          </motion.div>
        </motion.div>
      </SectionBackground>
      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)}/>
    </>
  );
};

export default SceneGallery;
