import { motion, Variants } from "framer-motion";
import { useMemo } from "react";
import ganeshImg from "@/assets/ganesh-new.png";
import floralCorner from "@/assets/floral-corner.png";
import roseBg from "@/assets/rose-bg.png";

interface Props {
  onNext: () => void;
  guestName?: string;
  onGuestNameChange?: (name: string) => void;
}

/* Floating Rose Petals */
const FallingPetal = ({ delay, x, dur, size }: { delay: number; x: number; dur: number; size: number }) => (
  <motion.div
    className="absolute top-0 pointer-events-none z-10"
    style={{
      left: `${x}%`,
      width: size,
      height: size * 0.7,
      borderRadius: "50% 0 50% 0",
      background: `linear-gradient(135deg, hsl(345, 80%, 70%), hsl(350, 90%, 80%))`,
      boxShadow: `0 0 8px hsl(345 80% 75% / 0.4)`,
    }}
    initial={{ y: "-5vh", opacity: 0, rotate: 0 }}
    animate={{ y: "110vh", opacity: [0, 0.9, 0.9, 0], rotate: [0, 180, 360], x: [0, 30, -20, 10] }}
    transition={{ duration: dur, delay, repeat: Infinity, ease: "linear" }}
  />
);

/* Sparkle Dots */
const Sparkle = ({ delay, x, y, size, dur }: { delay: number; x: number; y: number; size: number; dur: number }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none z-10"
    style={{
      left: `${x}%`, top: `${y}%`, width: size, height: size,
      background: `radial-gradient(circle, hsl(45 90% 80% / 0.9), transparent)`,
      boxShadow: `0 0 ${size * 3}px hsl(45 90% 70% / 0.6)`,
    }}
    animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
    transition={{ duration: dur, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

/* Floating Love Bubbles (Heart shaped glass bubbles) */
const FloatingBubble = ({ delay, x, size, dur }: { delay: number; x: number; size: number; dur: number }) => (
  <motion.div
    className="absolute bottom-0 pointer-events-none z-10 flex items-center justify-center"
    style={{
      left: `${x}%`,
    }}
    initial={{ y: "10vh", opacity: 0, scale: 0.5 }}
    animate={{ 
      y: "-110vh", 
      opacity: [0, 0.8, 0.8, 0], 
      scale: [0.5, 1.2, 1.5],
      x: [0, Math.random() * 30 - 15, Math.random() * 30 - 15, 0],
      rotate: [0, Math.random() * 30 - 15, 0]
    }}
    transition={{ duration: dur, delay, repeat: Infinity, ease: "linear" }}
  >
    <svg 
      width={size} height={size} viewBox="0 0 24 24" 
      fill="rgba(255,255,255,0.05)" 
      stroke="rgba(255,255,255,0.6)" 
      strokeWidth="0.8" 
      style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.4))", backdropFilter: "blur(1px)" }}
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
  </motion.div>
);

/* Corner Ornament — each corner faces inward (toward Ganesh center) */
const RoyalCorner = ({ position, delay }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right"; delay: number }) => {
  // Rotation so the ornament's "mouth" faces center
  const rot = {
    "top-left": 0,       // default orientation points inward ↘
    "top-right": 90,     // rotated to point inward ↙
    "bottom-right": 180, // rotated to point inward ↖
    "bottom-left": 270,  // rotated to point inward ↗
  }[position];

  // Offset with negative margins so the corners overlap perfectly with the border lines
  const posClass = {
    "top-left":     "-top-3 -left-3 md:-top-5 md:-left-5",
    "top-right":    "-top-3 -right-3 md:-top-5 md:-right-5",
    "bottom-left":  "-bottom-3 -left-3 md:-bottom-5 md:-left-5",
    "bottom-right": "-bottom-3 -right-3 md:-bottom-5 md:-right-5",
  }[position];

  return (
    <motion.div
      className={`absolute w-16 h-16 md:w-24 md:h-24 z-40 pointer-events-none ${posClass}`}
      style={{ transform: `rotate(${rot}deg)`, transformOrigin: "center center" }}
      initial={{ scale: 0, opacity: 0, rotate: rot - 20 }}
      animate={{ scale: 1, opacity: 1, rotate: rot }}
      transition={{ duration: 1.4, ease: "easeOut", delay, type: "spring", stiffness: 80, damping: 14 }}
    >
      {/* Glow behind ornament */}
      <motion.div
        className="absolute inset-0 rounded-full blur-xl"
        style={{ background: "radial-gradient(circle, hsl(43 72% 55% / 0.3) 0%, transparent 70%)" }}
        animate={{ opacity: [0.3, 0.65, 0.3], scale: [0.92, 1.1, 0.92] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
      />
      {/* Sparkle ring */}
      <motion.div
        className="absolute inset-2 rounded-full border border-[hsl(43_72%_55%_/_0.15)]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: delay + 0.5 }}
      />
      {/* Floral corner image */}
      <motion.img
        src={floralCorner}
        alt=""
        className="relative z-10 h-full w-full object-contain"
        style={{ filter: "drop-shadow(0 2px 8px hsl(0 60% 25% / 0.25)) drop-shadow(0 0 12px hsl(43 72% 55% / 0.35))" }}
        animate={{ scale: [1, 1.04, 1], filter: [
          "drop-shadow(0 2px 8px hsl(0 60% 25% / 0.25)) drop-shadow(0 0 12px hsl(43 72% 55% / 0.25))",
          "drop-shadow(0 2px 8px hsl(0 60% 25% / 0.25)) drop-shadow(0 0 20px hsl(43 72% 55% / 0.5))",
          "drop-shadow(0 2px 8px hsl(0 60% 25% / 0.25)) drop-shadow(0 0 12px hsl(43 72% 55% / 0.25))",
        ] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay }}
      />
    </motion.div>
  );
};

/* Divine Halo behind Ganesh */
const DivineHalo = () => (
  <motion.div
    className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
    animate={{ rotate: 360 }}
    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
  >
    <svg viewBox="0 0 300 300" className="w-[240px] h-[240px] md:w-[340px] md:h-[340px] opacity-50">
      {[...Array(36)].map((_, i) => {
        const angle = (i * 10 * Math.PI) / 180;
        return (
          <motion.line
            key={i} x1="150" y1="150"
            x2={150 + 120 * Math.cos(angle)} y2={150 + 120 * Math.sin(angle)}
            stroke="#D4AF37" strokeWidth={i % 3 === 0 ? "1.5" : "0.5"}
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 2.5, delay: i * 0.08, repeat: Infinity }}
          />
        );
      })}
    </svg>
  </motion.div>
);

const SceneWelcome = ({ onNext }: Props) => {
  const petals = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    id: i, x: Math.random() * 100, size: 8 + Math.random() * 14, delay: Math.random() * 8, dur: 7 + Math.random() * 6
  })), []);
  const sparkles = useMemo(() => Array.from({ length: 18 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100, size: 2 + Math.random() * 4, delay: Math.random() * 5, dur: 3 + Math.random() * 3
  })), []);
  const bubbles = useMemo(() => Array.from({ length: 15 }, (_, i) => ({
    id: i, x: Math.random() * 100, size: 10 + Math.random() * 30, delay: Math.random() * 10, dur: 8 + Math.random() * 10
  })), []);

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } },
  };

  return (
    <div className="relative flex h-screen flex-col items-center justify-center overflow-hidden">

      {/* Background: Dark Pink Image Theme */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#B8344F]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8A1A37] via-[#B8344F] to-[#7A1E2C]" />
        <motion.div
           className="absolute inset-0 w-[110%] h-[110%] -left-[5%] -top-[5%]"
           animate={{ 
             scale: [1, 1.05, 1],
             x: ["0%", "-2%", "1%", "0%"],
             y: ["0%", "1%", "-1%", "0%"]
           }}
           transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
        >
          <img src={roseBg} alt="Welcome Background" className="w-full h-full object-cover object-right md:object-center opacity-60 mix-blend-multiply" />
        </motion.div>
        
        {/* Soft shadow fade on the left to make white text pop out against the pink background */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Golden border frame + Corners inside same container */}
      <div className="absolute inset-3 md:inset-5 z-20 pointer-events-none">
        <svg width="100%" height="100%" className="absolute inset-0" style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id="rose-frame" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.9" />
              <stop offset="30%" stopColor="#F9D976" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#D4AF37" stopOpacity="1" />
              <stop offset="70%" stopColor="#F9D976" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.9" />
            </linearGradient>
            <filter id="border-glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <motion.rect
            x="0" y="0" width="100%" height="100%"
            fill="none" stroke="url(#rose-frame)" strokeWidth="2" rx="20"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.7 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          <motion.rect
            x="8" y="8" width="calc(100% - 16px)" height="calc(100% - 16px)"
            fill="none" stroke="url(#rose-frame)" strokeWidth="0.5" rx="14"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 3, delay: 0.8, ease: "easeInOut" }}
          />
          {/* Chasing light */}
          <motion.rect
            x="0" y="0" width="100%" height="100%"
            fill="none" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="40 2000" rx="20"
            style={{ filter: "url(#border-glow)" }}
            animate={{ strokeDashoffset: [2040, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
        </svg>

        {/* Corners — inside border frame so they sit on the border edges */}
        <RoyalCorner position="top-left" delay={0.2} />
        <RoyalCorner position="top-right" delay={0.4} />
        <RoyalCorner position="bottom-right" delay={0.6} />
        <RoyalCorner position="bottom-left" delay={0.8} />
      </div>

      {/* Falling petals, sparkles, and love bubbles */}
      {petals.map((p) => <FallingPetal key={`pt-${p.id}`} {...p} />)}
      {sparkles.map((s) => <Sparkle key={`sp-${s.id}`} {...s} />)}
      {bubbles.map((b) => <FloatingBubble key={`bb-${b.id}`} {...b} />)}

      {/* Main Content */}
      <motion.div
        className="relative z-30 flex flex-col items-center w-full max-w-3xl px-4"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        {/* शुभ विवाह */}
        <motion.div className="mb-3" variants={fadeUp}>
          <motion.h2
            className="font-decorative text-2xl md:text-3xl tracking-[0.2em] text-white"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
            animate={{ textShadow: ["0 2px 10px rgba(0,0,0,0.2)", "0 2px 25px rgba(0,0,0,0.6)", "0 2px 10px rgba(0,0,0,0.2)"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            शुभ विवाह
          </motion.h2>
        </motion.div>

        {/* Ganesh Image with High-Intensity Full Animation */}
        <motion.div
          className="relative flex items-center justify-center my-2"
          initial={{ opacity: 0, scale: 0, y: -50, rotate: -45 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
          transition={{ duration: 2.5, type: "spring", bounce: 0.5, delay: 0.2 }}
        >
          <DivineHalo />
          
          {/* High-intensity Glow layer */}
          <motion.div 
            className="absolute z-[5] w-36 h-36 md:w-52 md:h-52 rounded-full pointer-events-none mix-blend-screen"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(212,175,55,0.5) 40%, transparent 70%)" }}
            animate={{ scale: [0.9, 1.6, 0.9], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* High-intensity Main Image Motion */}
          <motion.img
            src={ganeshImg}
            alt="Lord Ganesha"
            className="w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56 object-contain relative z-10"
            style={{ filter: "drop-shadow(0 4px 15px rgba(255,255,255,0.4))" }}
            animate={{ 
              y: [-10, 10, -10],
              scale: [0.95, 1.12, 0.95]
            }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            width={512} height={512}
          />
        </motion.div>

        <motion.p
          className="font-decorative text-[9px] sm:text-[10px] md:text-xs tracking-wider text-white/90 font-medium mt-3 mb-2 text-center max-w-[90vw] leading-relaxed"
          variants={fadeUp}
        >
          वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
        </motion.p>

        {/* Preview Guest - larger text with rich animation */}
        <motion.div className="my-4 md:my-6 w-full" variants={fadeUp}>
          <motion.div className="relative flex items-center justify-center gap-2 sm:gap-4 px-1 sm:px-4">
            <motion.div
              className="h-[1.5px] w-6 sm:w-12 md:w-20 shrink-0"
              style={{ background: "linear-gradient(90deg, transparent, hsl(43 72% 55%))" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 1.5 }}
            />
            <motion.span
              className="font-decorative text-lg sm:text-xl md:text-3xl uppercase tracking-[0.15em] sm:tracking-[0.25em] md:tracking-[0.35em] font-bold text-center shrink mx-1 text-white"
              style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.3))" }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              ✦ Preview Guest ✦
            </motion.span>
            <motion.div
              className="h-[1.5px] w-6 sm:w-12 md:w-20 shrink-0"
              style={{ background: "linear-gradient(90deg, hsl(43 72% 55%), transparent)" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 1.5 }}
            />
          </motion.div>
        </motion.div>

        <motion.p className="font-body text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/80 font-medium mb-3 text-center" variants={fadeUp}>
          You are cordially invited to the wedding of
        </motion.p>

        {/* Couple Names - new dramatic style */}
        <motion.div className="flex flex-col items-center w-full" variants={fadeUp}>
          <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-0 md:gap-4 px-2">
            <motion.span
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white"
              style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.25))" }}
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
            >
              Rajveer
            </motion.span>

            <motion.span
              className="font-serif italic text-4xl sm:text-5xl md:text-6xl font-extralight mx-1 md:mx-3 relative md:top-2 text-white"
              style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.3))" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.9, ease: "easeOut" }}
            >
              &
            </motion.span>

            <motion.span
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white"
              style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.25))" }}
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
            >
              Ishita
            </motion.span>
          </div>

          {/* Animated underline */}
          <motion.div className="relative mt-3 mb-5 w-40 h-[2px] rounded-full overflow-hidden" style={{ background: "rgba(212,175,55,0.15)" }}>
            <motion.div
              className="absolute inset-y-0 left-0 bg-[#D4AF37]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 1.8, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-white/80 to-transparent"
              animate={{ left: ["-10%", "110%"] }}
              transition={{ duration: 2, repeat: Infinity, delay: 3.5, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>

        <motion.p className="font-decorative text-sm md:text-base italic tracking-wider text-white/90 font-medium mb-6" variants={fadeUp}>
          12 December 2026
        </motion.p>

        {/* View Invitation Button - fully animated */}
        <motion.div variants={fadeUp}>
          <motion.button
            onClick={onNext}
            className="relative group px-12 py-4 rounded-full overflow-hidden focus:outline-none"
            style={{
              background: "transparent",
              border: "2px solid #D4AF37",
              boxShadow: "0 0 15px rgba(212,175,55,0.2), inset 0 0 15px rgba(212,175,55,0.05)",
            }}
            whileHover={{ scale: 1.06, boxShadow: "0 0 40px rgba(212,175,55,0.5), inset 0 0 20px rgba(212,175,55,0.15)" }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            {/* Fill animation on hover */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"
              style={{ background: "linear-gradient(135deg, #D4AF37, #F9D976, #D4AF37)" }}
            />
            {/* Shimmer sweep */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ["-200%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
            {/* Orbiting dot */}
            <motion.div
              className="absolute w-1.5 h-1.5 rounded-full bg-[#D4AF37]"
              style={{ boxShadow: "0 0 8px #D4AF37, 0 0 15px #D4AF37" }}
              animate={{
                top: ["50%", "0%", "50%", "100%", "50%"],
                left: ["0%", "50%", "100%", "50%", "0%"],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            {/* Pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-full border border-[#D4AF37]"
              animate={{ scale: [1, 1.3, 1.3], opacity: [0.5, 0, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.span 
              className="relative z-10 font-decorative text-sm md:text-base tracking-[0.2em] font-black uppercase drop-shadow-md text-white"
            >
              <span className="group-hover:text-black transition-colors duration-500">
                View Invitation
              </span>
            </motion.span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SceneWelcome;
