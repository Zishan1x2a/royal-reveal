import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import GoldButton from "./GoldButton";
import SectionBackground from "./SectionBackground";

interface Props { onNext: () => void; }

const WEDDING_DATE = new Date("2026-12-15T19:00:00");

const useCountdown = () => {
  const [diff, setDiff] = useState(WEDDING_DATE.getTime() - Date.now());
  useEffect(() => {
    const id = setInterval(() => setDiff(WEDDING_DATE.getTime() - Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const d = Math.max(0, diff);
  return {
    days: Math.floor(d / 86400000),
    hours: Math.floor((d % 86400000) / 3600000),
    minutes: Math.floor((d % 3600000) / 60000),
    seconds: Math.floor((d % 60000) / 1000),
  };
};

/* Animated corner ornament */
const CornerOrnament = ({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) => {
  const rotations: Record<string, number> = {
    "top-left": 0, "top-right": 90, "bottom-right": 180, "bottom-left": 270,
  };
  const posClass: Record<string, string> = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
  };
  return (
    <motion.div
      className={`absolute ${posClass[position]} w-24 h-24 md:w-32 md:h-32 pointer-events-none z-10`}
      style={{ transform: `rotate(${rotations[position]}deg)` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.5, type: "spring" }}
    >
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <linearGradient id={`corner-grad-${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(43 72% 65%)" />
            <stop offset="50%" stopColor="hsl(43 72% 55%)" />
            <stop offset="100%" stopColor="hsl(43 80% 45%)" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,0 Q0,50 30,70 Q10,40 0,0Z"
          fill={`url(#corner-grad-${position})`}
          opacity={0.4}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M0,0 C5,25 15,45 40,60 C20,50 8,30 0,0Z"
          fill="none"
          stroke="hsl(43 72% 55%)"
          strokeWidth="1.5"
          animate={{ pathLength: [0, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M0,0 C10,15 20,30 50,40 C25,35 12,20 0,0Z"
          fill="none"
          stroke="hsl(43 72% 60%)"
          strokeWidth="1"
          animate={{ pathLength: [0, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3.5, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="35" cy="55" r="2"
          fill="hsl(43 72% 65%)"
          animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2, delay: 1, repeat: Infinity }}
        />
        <motion.circle
          cx="20" cy="35" r="1.5"
          fill="hsl(43 72% 70%)"
          animate={{ scale: [0, 1.2, 0], opacity: [0, 0.8, 0] }}
          transition={{ duration: 2.5, delay: 0.5, repeat: Infinity }}
        />
      </svg>
    </motion.div>
  );
};

/* Floating ring particle */
const FloatingRing = ({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      left: `${x}%`, top: `${y}%`, width: size, height: size,
      border: "1px solid hsl(43 72% 55% / 0.3)",
    }}
    animate={{
      scale: [0.5, 1.5, 0.5],
      opacity: [0, 0.5, 0],
      rotate: [0, 180, 360],
    }}
    transition={{ duration: 4 + Math.random() * 3, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

const CountUnit = ({ value, label }: { value: number; label: string }) => (
  <motion.div
    className="flex flex-col items-center relative"
    whileHover={{ scale: 1.1 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    {/* Glow behind number */}
    <motion.div
      className="absolute -inset-3 rounded-2xl"
      style={{ background: "radial-gradient(circle, hsl(43 72% 55% / 0.15), transparent)" }}
      animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.95, 1.05, 0.95] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
    {/* Glass card */}
    <div
      className="relative flex flex-col items-center px-4 py-3 md:px-6 md:py-4 rounded-xl"
      style={{
        background: "linear-gradient(135deg, hsl(0 40% 90% / 0.6), hsl(0 35% 85% / 0.4))",
        backdropFilter: "blur(10px)",
        border: "1px solid hsl(43 72% 55% / 0.3)",
        boxShadow: "0 4px 20px hsl(43 72% 55% / 0.1), inset 0 1px 0 hsl(43 72% 70% / 0.2)",
      }}
    >
      <motion.span
        key={value}
        className="font-display text-3xl md:text-5xl lg:text-6xl"
        style={{ color: "hsl(43 72% 45%)", textShadow: "0 0 20px hsl(43 72% 55% / 0.4)" }}
        initial={{ y: -15, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
      >
        {String(value).padStart(2, "0")}
      </motion.span>
      <span
        className="font-body text-[9px] md:text-[10px] uppercase tracking-[0.3em] mt-1"
        style={{ color: "hsl(0 25% 45%)" }}
      >
        {label}
      </span>
    </div>
  </motion.div>
);

/* Animated separator */
const Separator = () => (
  <motion.span
    className="font-display text-2xl md:text-4xl lg:text-5xl self-center"
    style={{ color: "hsl(43 72% 50% / 0.5)", textShadow: "0 0 10px hsl(43 72% 55% / 0.3)" }}
    animate={{ opacity: [0.3, 1, 0.3], scale: [0.95, 1.05, 0.95] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
  >
    :
  </motion.span>
);

const SceneCountdown = ({ onNext }: Props) => {
  const { days, hours, minutes, seconds } = useCountdown();

  const rings = useMemo(
    () => Array.from({ length: 8 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      size: 15 + Math.random() * 30, delay: Math.random() * 5,
    })),
    []
  );

  return (
    <SectionBackground className="flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center relative">
      {/* Corner ornaments */}
      <CornerOrnament position="top-left" />
      <CornerOrnament position="top-right" />
      <CornerOrnament position="bottom-left" />
      <CornerOrnament position="bottom-right" />

      {/* Floating rings */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {rings.map((r) => (
          <FloatingRing key={r.id} x={r.x} y={r.y} size={r.size} delay={r.delay} />
        ))}
      </div>

      {/* Central glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 50%, hsl(43 72% 55% / 0.12) 0%, transparent 50%)" }}
        animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-6 md:gap-8 max-w-xl"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        {/* Heading with shimmer */}
        <motion.div
          className="relative"
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
        >
          <motion.h2
            className="font-display text-3xl md:text-4xl lg:text-5xl"
            style={{ color: "hsl(0 60% 25%)", textShadow: "0 2px 10px hsl(0 40% 30% / 0.2)" }}
          >
            Counting the Days
          </motion.h2>
          {/* Shimmer line under heading */}
          <motion.div
            className="absolute -bottom-2 left-1/2 h-[2px] rounded-full"
            style={{ background: "linear-gradient(90deg, transparent, hsl(43 72% 55%), transparent)" }}
            initial={{ width: 0, x: "-50%" }}
            animate={{ width: "80%", x: "-50%" }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </motion.div>

        {/* Decorative divider */}
        <motion.div
          className="flex items-center gap-3"
          variants={{ hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 1, scaleX: 1 } }}
        >
          <motion.div
            className="h-px w-12 md:w-16"
            style={{ background: "linear-gradient(90deg, transparent, hsl(43 72% 55%))" }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ background: "hsl(43 72% 55%)", boxShadow: "0 0 8px hsl(43 72% 55% / 0.5)" }}
            animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="h-px w-12 md:w-16"
            style={{ background: "linear-gradient(90deg, hsl(43 72% 55%), transparent)" }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Countdown units */}
        <motion.div
          className="flex gap-3 md:gap-5 lg:gap-6 items-center"
          variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          <CountUnit value={days} label="Days" />
          <Separator />
          <CountUnit value={hours} label="Hours" />
          <Separator />
          <CountUnit value={minutes} label="Min" />
          <Separator />
          <CountUnit value={seconds} label="Sec" />
        </motion.div>

        {/* Quote */}
        <motion.div
          className="mt-2 space-y-3 max-w-md"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          <motion.p
            className="font-decorative text-xl md:text-2xl italic"
            style={{ color: "hsl(0 40% 35%)", textShadow: "0 1px 8px hsl(0 30% 40% / 0.15)" }}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            "Two souls, one heart, one beautiful journey"
          </motion.p>
          <p className="font-body text-sm" style={{ color: "hsl(0 25% 45%)" }}>
            Your blessings and presence would make our day truly special.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0 } }}
          transition={{ delay: 0.8 }}
        >
          <GoldButton onClick={onNext}>RSVP</GoldButton>
        </motion.div>
      </motion.div>
    </SectionBackground>
  );
};

export default SceneCountdown;
