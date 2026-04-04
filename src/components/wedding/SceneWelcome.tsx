import { motion, Variants } from "framer-motion";
import { useMemo } from "react";
import ganeshImg from "@/assets/ganesh-divine.png";
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

/* Corner Ornament with glow */
const RoyalCorner = ({ position, delay }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right"; delay: number }) => {
  const rot = { "top-left": 0, "top-right": 90, "bottom-right": 180, "bottom-left": 270 }[position];
  const posClass = {
    "top-left": "top-2 left-2 md:top-4 md:left-4",
    "top-right": "top-2 right-2 md:top-4 md:right-4",
    "bottom-left": "bottom-2 left-2 md:bottom-4 md:left-4",
    "bottom-right": "bottom-2 right-2 md:bottom-4 md:right-4",
  }[position];

  return (
    <motion.div
      className={`absolute ${posClass} w-20 h-20 md:w-28 md:h-28 z-40 pointer-events-none`}
      style={{ transform: `rotate(${rot}deg)` }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut", delay, type: "spring", stiffness: 60, damping: 12 }}
    >
      <motion.div
        className="absolute inset-0 blur-xl rounded-full"
        style={{ background: "radial-gradient(ellipse at center, rgba(212,175,55,0.35) 0%, transparent 70%)" }}
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.9, 1.15, 0.9] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
      />
      <motion.img
        src={floralCorner}
        alt=""
        className="w-full h-full object-contain relative z-10"
        style={{ filter: "drop-shadow(0 2px 6px rgba(122,30,44,0.3)) drop-shadow(0 0 8px rgba(212,175,55,0.3))" }}
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
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
    <svg viewBox="0 0 300 300" className="w-[200px] h-[200px] md:w-[280px] md:h-[280px] opacity-50">
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

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } },
  };

  return (
    <div className="relative flex h-screen flex-col items-center justify-center overflow-hidden">

      {/* Background: soft pink with rose image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #FFF5F7 0%, #FFE4EC 40%, #FFF0F3 100%)" }} />
        <motion.img
          src={roseBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.35, mixBlendMode: "multiply" }}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: [1, 1.03, 1], opacity: 0.35 }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Soft overlay gradient for readability */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(255,245,247,0.85) 30%, rgba(255,228,236,0.6) 70%, transparent 100%)" }} />
      </div>

      {/* Golden border frame */}
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
      </div>

      {/* Corners */}
      <RoyalCorner position="top-left" delay={0.2} />
      <RoyalCorner position="top-right" delay={0.4} />
      <RoyalCorner position="bottom-right" delay={0.6} />
      <RoyalCorner position="bottom-left" delay={0.8} />

      {/* Falling petals & sparkles */}
      {petals.map((p) => <FallingPetal key={`pt-${p.id}`} {...p} />)}
      {sparkles.map((s) => <Sparkle key={`sp-${s.id}`} {...s} />)}

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
            className="font-decorative text-2xl md:text-3xl tracking-[0.2em]"
            style={{ color: "#D4AF37", textShadow: "0 2px 10px rgba(212,175,55,0.5)" }}
            animate={{ textShadow: ["0 2px 10px rgba(212,175,55,0.3)", "0 2px 25px rgba(212,175,55,0.8)", "0 2px 10px rgba(212,175,55,0.3)"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            शुभ विवाह
          </motion.h2>
        </motion.div>

        {/* Ganesh Image */}
        <motion.div
          className="relative flex items-center justify-center my-1"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
        >
          <DivineHalo />
          <motion.img
            src={ganeshImg}
            alt="Lord Ganesha"
            className="w-28 h-28 md:w-36 md:h-36 object-contain relative z-10"
            style={{ filter: "drop-shadow(0 8px 20px rgba(212,175,55,0.5))" }}
            animate={{ y: [-3, 3, -3], filter: ["drop-shadow(0 8px 20px rgba(212,175,55,0.3))", "drop-shadow(0 8px 30px rgba(212,175,55,0.7))", "drop-shadow(0 8px 20px rgba(212,175,55,0.3))"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            width={512} height={512}
          />
        </motion.div>

        {/* Mantra - single line */}
        <motion.p
          className="font-decorative text-[9px] md:text-xs tracking-wider text-[#7A1E2C]/80 mt-3 mb-2 text-center whitespace-nowrap"
          variants={fadeUp}
        >
          वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
        </motion.p>

        {/* Preview Guest - elegant floating text with animations */}
        <motion.div className="my-5" variants={fadeUp}>
          <motion.div className="relative flex items-center gap-3">
            <motion.div
              className="h-[1px] w-8 md:w-12"
              style={{ background: "linear-gradient(90deg, transparent, #D4AF37)" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 1.5 }}
            />
            <motion.span
              className="font-body text-xs md:text-sm uppercase tracking-[0.3em] font-medium text-[#7A1E2C]"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              ✦ Preview Guest ✦
            </motion.span>
            <motion.div
              className="h-[1px] w-8 md:w-12"
              style={{ background: "linear-gradient(90deg, #D4AF37, transparent)" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 1.5 }}
            />
          </motion.div>
        </motion.div>

        <motion.p className="font-body text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#7A1E2C]/60 mb-3 text-center" variants={fadeUp}>
          You are cordially invited to the wedding of
        </motion.p>

        {/* Couple Names - new dramatic style */}
        <motion.div className="flex flex-col items-center" variants={fadeUp}>
          <div className="flex items-center gap-2 md:gap-4">
            <motion.span
              className="font-display text-4xl md:text-6xl lg:text-7xl font-light"
              style={{
                background: "linear-gradient(135deg, #7A1E2C, #B8344F, #7A1E2C)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 4px 8px rgba(122,30,44,0.3))",
              }}
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
            >
              Rajveer
            </motion.span>

            <motion.span
              className="font-decorative text-3xl md:text-5xl"
              style={{ color: "#D4AF37", textShadow: "0 0 20px rgba(212,175,55,0.5)" }}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 1.2, type: "spring", stiffness: 100 }}
            >
              &
            </motion.span>

            <motion.span
              className="font-display text-4xl md:text-6xl lg:text-7xl font-light"
              style={{
                background: "linear-gradient(135deg, #7A1E2C, #B8344F, #7A1E2C)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 4px 8px rgba(122,30,44,0.3))",
              }}
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

        <motion.p className="font-decorative text-sm md:text-base italic tracking-wider text-[#A97C25] mb-6" variants={fadeUp}>
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
            <span className="relative z-10 font-decorative text-xs md:text-sm tracking-[0.25em] font-bold uppercase text-[#D4AF37] group-hover:text-[#1a1a1a] transition-colors duration-500">
              View Invitation
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SceneWelcome;
