import { motion } from "framer-motion";
import { useMemo } from "react";
import ganeshImg from "@/assets/ganesh.png";
import welcomeBg from "@/assets/welcome-bg.jpg";
import GoldButton from "./GoldButton";

interface Props {
  onNext: () => void;
}

/* Floating sparkle particle */
const Sparkle = ({ delay, x, y, size }: { delay: number; x: number; y: number; size: number }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: size,
      height: size,
      background: `radial-gradient(circle, hsl(var(--gold) / 0.9), transparent)`,
    }}
    animate={{
      opacity: [0, 1, 0.5, 1, 0],
      scale: [0, 1, 0.8, 1.2, 0],
    }}
    transition={{
      duration: 3 + Math.random() * 2,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

/* Corner mandala decoration */
const CornerMandala = ({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) => {
  const posClasses: Record<string, string> = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0 -scale-x-100",
    "bottom-left": "bottom-0 left-0 -scale-y-100",
    "bottom-right": "bottom-0 right-0 -scale-x-100 -scale-y-100",
  };

  return (
    <motion.div
      className={`absolute ${posClasses[position]} w-24 h-24 md:w-36 md:h-36 pointer-events-none z-10`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
    >
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <linearGradient id={`corner-grad-${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(43 72% 55%)" stopOpacity="0.8" />
            <stop offset="50%" stopColor="hsl(43 72% 65%)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="hsl(43 72% 55%)" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {/* Corner lines */}
        <path d="M0,0 L60,0 Q40,5 30,15 Q20,25 15,40 L0,40 Z" fill="none" stroke={`url(#corner-grad-${position})`} strokeWidth="0.5" opacity="0.6" />
        <path d="M0,0 L45,0 Q30,8 22,18 Q14,28 10,45 L0,45" fill="none" stroke={`url(#corner-grad-${position})`} strokeWidth="0.3" opacity="0.4" />
        {/* Corner dot pattern */}
        <circle cx="5" cy="5" r="2" fill="hsl(43 72% 55%)" opacity="0.7" />
        <circle cx="15" cy="3" r="1" fill="hsl(43 72% 55%)" opacity="0.5" />
        <circle cx="3" cy="15" r="1" fill="hsl(43 72% 55%)" opacity="0.5" />
        {/* Decorative mandala arc */}
        <path d="M8,50 Q8,8 50,8" fill="none" stroke="hsl(43 72% 55%)" strokeWidth="0.5" opacity="0.3" />
        <path d="M12,60 Q12,12 60,12" fill="none" stroke="hsl(43 72% 55%)" strokeWidth="0.3" opacity="0.2" />
        {/* Small decorative elements */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.circle
            key={i}
            cx={10 + i * 8}
            cy={10 + i * 8}
            r="0.8"
            fill="hsl(43 72% 55%)"
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
          />
        ))}
      </svg>
    </motion.div>
  );
};

/* Side mandala decoration */
const SideMandala = ({ side }: { side: "left" | "right" }) => (
  <motion.div
    className={`absolute top-1/2 -translate-y-1/2 ${side === "left" ? "left-4 md:left-8" : "right-4 md:right-8"} w-16 h-16 md:w-24 md:h-24 pointer-events-none z-10`}
    initial={{ opacity: 0, rotate: side === "left" ? -90 : 90 }}
    animate={{ opacity: 0.6, rotate: 0 }}
    transition={{ duration: 2, delay: 1 }}
  >
    <svg viewBox="0 0 80 80" className="w-full h-full">
      <defs>
        <radialGradient id={`side-grad-${side}`}>
          <stop offset="0%" stopColor="hsl(43 72% 55%)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="hsl(43 72% 55%)" stopOpacity="0" />
        </radialGradient>
      </defs>
      {[...Array(8)].map((_, i) => (
        <motion.line
          key={i}
          x1="40" y1="40"
          x2={40 + 30 * Math.cos((i * Math.PI) / 4)}
          y2={40 + 30 * Math.sin((i * Math.PI) / 4)}
          stroke="hsl(43 72% 55%)"
          strokeWidth="0.5"
          opacity="0.4"
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
        />
      ))}
      <circle cx="40" cy="40" r="5" fill="none" stroke="hsl(43 72% 55%)" strokeWidth="0.5" opacity="0.5" />
      <circle cx="40" cy="40" r="12" fill="none" stroke="hsl(43 72% 55%)" strokeWidth="0.3" opacity="0.3" />
      <circle cx="40" cy="40" r="2" fill={`url(#side-grad-${side})`} />
    </svg>
  </motion.div>
);

/* Radiating mandala rays behind Ganesh */
const MandalaRays = () => (
  <motion.div
    className="absolute inset-0 flex items-center justify-center pointer-events-none"
    initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
    animate={{ opacity: 1, scale: 1, rotate: 0 }}
    transition={{ duration: 2, ease: "easeOut" }}
  >
    <svg viewBox="0 0 400 400" className="w-[320px] h-[320px] md:w-[420px] md:h-[420px]">
      <defs>
        <radialGradient id="ray-grad">
          <stop offset="0%" stopColor="hsl(43 72% 55%)" stopOpacity="0.3" />
          <stop offset="60%" stopColor="hsl(43 72% 45%)" stopOpacity="0.1" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
      </defs>
      {[...Array(24)].map((_, i) => {
        const angle = (i * 15 * Math.PI) / 180;
        const x2 = 200 + 190 * Math.cos(angle);
        const y2 = 200 + 190 * Math.sin(angle);
        return (
          <motion.line
            key={i}
            x1="200" y1="200" x2={x2} y2={y2}
            stroke="hsl(43 72% 55%)"
            strokeWidth={i % 2 === 0 ? "1.5" : "0.5"}
            opacity={i % 2 === 0 ? 0.25 : 0.12}
            animate={{ opacity: i % 2 === 0 ? [0.15, 0.3, 0.15] : [0.08, 0.18, 0.08] }}
            transition={{ duration: 4, delay: i * 0.1, repeat: Infinity, ease: "easeInOut" }}
          />
        );
      })}
      <circle cx="200" cy="200" r="80" fill="none" stroke="hsl(43 72% 55%)" strokeWidth="0.5" opacity="0.2" />
      <circle cx="200" cy="200" r="120" fill="none" stroke="hsl(43 72% 55%)" strokeWidth="0.3" opacity="0.1" />
    </svg>
  </motion.div>
);

const SceneWelcome = ({ onNext }: Props) => {
  const sparkles = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1.5 + Math.random() * 3,
        delay: Math.random() * 4,
      })),
    []
  );

  const stagger = {
    visible: { transition: { staggerChildren: 0.25 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.6 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: "easeOut" as const } },
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Animated background image */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
      >
        <motion.img
          src={welcomeBg}
          alt=""
          className="w-full h-full object-cover"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, hsl(0 0% 0% / 0.5) 0%, hsl(0 0% 0% / 0.3) 40%, hsl(0 0% 0% / 0.6) 100%)" }} />
      </motion.div>
      {/* Sparkle particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {sparkles.map((s) => (
          <Sparkle key={s.id} x={s.x} y={s.y} size={s.size} delay={s.delay} />
        ))}
      </div>

      {/* Corner decorations */}
      <CornerMandala position="top-left" />
      <CornerMandala position="top-right" />
      <CornerMandala position="bottom-left" />
      <CornerMandala position="bottom-right" />

      {/* Side mandalas */}
      <SideMandala side="left" />
      <SideMandala side="right" />

      {/* Top decorative arch */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.5, y: 0 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      >
        <svg viewBox="0 0 200 40" className="w-40 md:w-56 h-auto">
          <path d="M10,35 Q100,0 190,35" fill="none" stroke="hsl(43 72% 55%)" strokeWidth="0.8" opacity="0.6" />
          <path d="M30,35 Q100,8 170,35" fill="none" stroke="hsl(43 72% 55%)" strokeWidth="0.5" opacity="0.4" />
          <circle cx="100" cy="12" r="2" fill="hsl(43 72% 55%)" opacity="0.6" />
        </svg>
      </motion.div>

      {/* Main content */}
      <motion.div
        className="relative z-20 flex flex-col items-center gap-4 md:gap-5 max-w-2xl px-6 py-12 text-center"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        {/* शुभ विवाह */}
        <motion.div className="flex items-center gap-3" variants={fadeIn}>
          <motion.span
            className="text-gold text-xs"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >✦</motion.span>
          <span className="font-decorative text-lg md:text-xl tracking-[0.3em]" style={{ color: "hsl(43 72% 65%)" }}>
            शुभ विवाह
          </span>
          <motion.span
            className="text-gold text-xs"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >✦</motion.span>
        </motion.div>

        {/* Ganesh Ji with mandala rays */}
        <motion.div className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center" variants={scaleIn}>
          <MandalaRays />
          {/* Golden glow circle */}
          <motion.div
            className="absolute w-36 h-36 md:w-44 md:h-44 rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(43 72% 55% / 0.3) 0%, hsl(43 72% 45% / 0.1) 50%, transparent 70%)",
              boxShadow: "0 0 60px hsl(43 72% 55% / 0.3), 0 0 120px hsl(43 72% 55% / 0.15)",
            }}
            animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Circular border */}
          <motion.div
            className="absolute w-32 h-32 md:w-40 md:h-40 rounded-full border border-gold/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <img
            src={ganeshImg}
            alt="Lord Ganesha"
            className="relative z-10 w-28 h-28 md:w-36 md:h-36 object-contain animate-float drop-shadow-lg"
            style={{ filter: "drop-shadow(0 0 25px hsl(43 72% 55% / 0.5))" }}
          />
        </motion.div>

        {/* ॐ symbol */}
        <motion.p
          className="font-decorative text-2xl"
          style={{ color: "hsl(43 72% 65% / 0.7)" }}
          variants={fadeIn}
        >
          ॐ
        </motion.p>

        {/* Sanskrit shloka */}
        <motion.p
          className="font-decorative text-sm md:text-base tracking-wide max-w-md"
          style={{ color: "hsl(43 72% 65% / 0.8)" }}
          variants={fadeUp}
        >
          वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
        </motion.p>

        {/* Divider */}
        <motion.div
          className="h-px w-24 opacity-30"
          style={{ background: "hsl(43 72% 55%)" }}
          variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.8 } } }}
        />

        {/* Dear */}
        <motion.p
          className="font-body text-xs uppercase tracking-[0.4em]"
          style={{ color: "hsl(0 0% 70%)" }}
          variants={fadeIn}
        >
          Dear
        </motion.p>

        {/* Guest Name */}
        <motion.p
          className="font-decorative text-2xl md:text-3xl italic"
          style={{ color: "hsl(43 72% 65%)" }}
          variants={fadeUp}
        >
          {"{Guest Name}"}
        </motion.p>

        {/* Invitation text */}
        <motion.p
          className="font-body text-[10px] md:text-xs uppercase tracking-[0.3em]"
          style={{ color: "hsl(0 0% 60%)" }}
          variants={fadeIn}
        >
          You are cordially invited to the wedding of
        </motion.p>

        {/* Couple names */}
        <motion.h1
          className="font-display text-5xl md:text-7xl font-light leading-tight"
          style={{ color: "hsl(40 30% 85%)" }}
          variants={fadeUp}
        >
          Rahul <span className="font-decorative italic text-4xl md:text-6xl" style={{ color: "hsl(43 72% 60%)" }}>&</span> Priya
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="font-body text-[10px] md:text-xs uppercase tracking-[0.35em]"
          style={{ color: "hsl(0 0% 55%)" }}
          variants={fadeIn}
        >
          Two Souls, One Journey
        </motion.p>

        {/* Date */}
        <motion.p
          className="font-decorative text-base md:text-lg italic tracking-wider"
          style={{ color: "hsl(43 72% 60% / 0.8)" }}
          variants={fadeUp}
        >
          12 December 2026
        </motion.p>

        {/* CTA Button */}
        <motion.div className="mt-4" variants={fadeUp}>
          <motion.button
            onClick={onNext}
            className="font-body text-sm uppercase tracking-[0.3em] px-12 py-4 rounded-full border border-gold/40 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, hsl(220 25% 18%) 0%, hsl(220 20% 22%) 50%, hsl(220 25% 18%) 100%)",
              color: "hsl(43 72% 65%)",
              boxShadow: "0 0 30px hsl(43 72% 55% / 0.15), inset 0 1px 0 hsl(43 72% 55% / 0.1)",
            }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 0 40px hsl(43 72% 55% / 0.3), inset 0 1px 0 hsl(43 72% 55% / 0.2)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            Open Invitation
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Bottom decorative arch */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none z-10 rotate-180"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <svg viewBox="0 0 200 30" className="w-32 md:w-48 h-auto">
          <path d="M10,25 Q100,0 190,25" fill="none" stroke="hsl(43 72% 55%)" strokeWidth="0.6" opacity="0.5" />
          <circle cx="100" cy="8" r="1.5" fill="hsl(43 72% 55%)" opacity="0.5" />
        </svg>
      </motion.div>

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          background: "radial-gradient(ellipse at center, transparent 50%, hsl(220 25% 8% / 0.6) 100%)",
        }}
      />
    </div>
  );
};

export default SceneWelcome;
