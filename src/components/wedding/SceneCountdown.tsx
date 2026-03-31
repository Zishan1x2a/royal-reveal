import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import GoldButton from "./GoldButton";
import SectionBackground from "./SectionBackground";

interface Props { onNext: () => void; guestName: string; }

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

/* Grand corner ornament with layered animations */
const CornerOrnament = ({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) => {
  const rot: Record<string, number> = { "top-left": 0, "top-right": 90, "bottom-right": 180, "bottom-left": 270 };
  const pos: Record<string, string> = {
    "top-left": "top-0 left-0", "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0", "bottom-right": "bottom-0 right-0",
  };
  return (
    <motion.div
      className={`absolute ${pos[position]} w-28 h-28 md:w-40 md:h-40 pointer-events-none z-10`}
      style={{ transform: `rotate(${rot[position]}deg)` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.3, type: "spring", stiffness: 80 }}
    >
      <svg viewBox="0 0 150 150" className="w-full h-full">
        <defs>
          <linearGradient id={`cg-${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(43 72% 70%)" />
            <stop offset="50%" stopColor="hsl(43 72% 55%)" />
            <stop offset="100%" stopColor="hsl(43 80% 40%)" />
          </linearGradient>
          <radialGradient id={`cglow-${position}`}>
            <stop offset="0%" stopColor="hsl(43 72% 65% / 0.6)" />
            <stop offset="100%" stopColor="hsl(43 72% 55% / 0)" />
          </radialGradient>
        </defs>
        {/* Glow */}
        <motion.circle cx="20" cy="20" r="40" fill={`url(#cglow-${position})`}
          animate={{ r: [30, 45, 30], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Main curves */}
        <motion.path d="M0,0 Q0,60 40,90 Q15,50 0,0Z" fill={`url(#cg-${position})`} opacity={0.35}
          animate={{ opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.path d="M0,0 C8,30 25,55 55,75" fill="none" stroke="hsl(43 72% 55%)" strokeWidth="1.8"
          initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 0.7, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path d="M0,0 C12,20 30,40 65,55" fill="none" stroke="hsl(43 72% 60% / 0.6)" strokeWidth="1.2"
          initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 0.5, 1] }}
          transition={{ duration: 4, delay: 0.3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path d="M0,0 C4,35 18,60 45,80" fill="none" stroke="hsl(43 72% 65% / 0.4)" strokeWidth="0.8"
          initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1] }}
          transition={{ duration: 3.5, delay: 0.6, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Decorative dots along curves */}
        {[{ cx: 15, cy: 30, r: 2, d: 0 }, { cx: 30, cy: 50, r: 2.5, d: 0.5 }, { cx: 45, cy: 68, r: 2, d: 1 },
          { cx: 55, cy: 75, r: 1.5, d: 1.5 }, { cx: 10, cy: 45, r: 1.5, d: 0.8 }].map((dot, i) => (
          <motion.circle key={i} cx={dot.cx} cy={dot.cy} r={dot.r} fill="hsl(43 72% 65%)"
            animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2.5, delay: dot.d, repeat: Infinity }}
          />
        ))}
        {/* Tiny sparkle lines */}
        <motion.line x1="25" y1="38" x2="32" y2="32" stroke="hsl(43 72% 70%)" strokeWidth="0.8"
          animate={{ opacity: [0, 0.8, 0] }} transition={{ duration: 1.5, delay: 0.5, repeat: Infinity }}
        />
        <motion.line x1="40" y1="58" x2="48" y2="52" stroke="hsl(43 72% 70%)" strokeWidth="0.8"
          animate={{ opacity: [0, 0.8, 0] }} transition={{ duration: 1.5, delay: 1, repeat: Infinity }}
        />
      </svg>
    </motion.div>
  );
};

/* Card-level star */
const CardStar = ({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      left: `${x}%`, top: `${y}%`, width: size, height: size,
      background: "radial-gradient(circle, hsl(43 72% 70%), hsl(43 72% 55% / 0.4))",
      boxShadow: `0 0 ${size * 3}px hsl(43 72% 55% / 0.5)`,
    }}
    animate={{ opacity: [0, 1, 0.3, 1, 0], scale: [0.3, 1.2, 0.6, 1.3, 0.3] }}
    transition={{ duration: 2.5 + Math.random() * 2, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

/* Card-level bubble */
const CardBubble = ({ x, size, delay, dur }: { x: number; size: number; delay: number; dur: number }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      left: `${x}%`, bottom: "-8%", width: size, height: size,
      border: "1px solid hsl(43 72% 55% / 0.25)",
      background: "radial-gradient(circle at 30% 30%, hsl(43 72% 65% / 0.15), transparent)",
    }}
    animate={{ y: [0, -200], x: [0, Math.sin(x) * 15, 0], opacity: [0, 0.6, 0.3, 0] }}
    transition={{ duration: dur, delay, repeat: Infinity, ease: "easeOut" }}
  />
);

/* Floating ring */
const FloatingRing = ({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, border: "1px solid hsl(43 72% 55% / 0.2)" }}
    animate={{ scale: [0.5, 1.8, 0.5], opacity: [0, 0.4, 0], rotate: [0, 180, 360] }}
    transition={{ duration: 5 + Math.random() * 3, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

const CountUnit = ({ value, label }: { value: number; label: string }) => {
  const stars = useMemo(() => Array.from({ length: 5 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100, size: 1.5 + Math.random() * 2.5, delay: Math.random() * 4,
  })), []);
  const bubbles = useMemo(() => Array.from({ length: 3 }, (_, i) => ({
    id: i, x: 10 + Math.random() * 80, size: 4 + Math.random() * 8, delay: Math.random() * 5, dur: 4 + Math.random() * 3,
  })), []);

  return (
    <motion.div
      className="flex flex-col items-center relative"
      whileHover={{ scale: 1.08, y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Outer glow */}
      <motion.div className="absolute -inset-4 rounded-2xl"
        style={{ background: "radial-gradient(circle, hsl(43 72% 55% / 0.15), transparent)" }}
        animate={{ opacity: [0.2, 0.6, 0.2], scale: [0.95, 1.08, 0.95] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Glass card with particles */}
      <div className="relative flex flex-col items-center px-4 py-3 md:px-7 md:py-5 rounded-xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, hsl(0 40% 92% / 0.7), hsl(0 35% 87% / 0.5))",
          backdropFilter: "blur(12px)",
          border: "1px solid hsl(43 72% 55% / 0.35)",
          boxShadow: "0 6px 30px hsl(43 72% 55% / 0.12), inset 0 1px 0 hsl(43 72% 70% / 0.25), 0 0 60px hsl(43 72% 55% / 0.06)",
        }}
      >
        {/* Card corner ornaments */}
        {(["top-left","top-right","bottom-left","bottom-right"] as const).map((p) => {
          const r = { "top-left": 0, "top-right": 90, "bottom-right": 180, "bottom-left": 270 }[p];
          const c = { "top-left": "top-0 left-0", "top-right": "top-0 right-0", "bottom-left": "bottom-0 left-0", "bottom-right": "bottom-0 right-0" }[p];
          return (
            <motion.div key={p} className={`absolute ${c} w-5 h-5 md:w-7 md:h-7 pointer-events-none z-20`}
              style={{ transform: `rotate(${r}deg)` }}
            >
              <svg viewBox="0 0 30 30" className="w-full h-full">
                <motion.path d="M0,0 Q0,15 12,22" fill="none" stroke="hsl(43 72% 55%)" strokeWidth="1.5"
                  animate={{ pathLength: [0, 1, 0.6, 1], opacity: [0.4, 1, 0.5, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.path d="M0,0 Q0,10 8,15" fill="none" stroke="hsl(43 72% 65% / 0.5)" strokeWidth="1"
                  animate={{ pathLength: [0, 1], opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2.5, delay: 0.3, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.circle cx="10" cy="18" r="1.2" fill="hsl(43 72% 65%)"
                  animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
                  transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
                />
              </svg>
            </motion.div>
          );
        })}

        {/* Stars inside card */}
        {stars.map(s => <CardStar key={s.id} x={s.x} y={s.y} size={s.size} delay={s.delay} />)}
        {/* Bubbles inside card */}
        {bubbles.map(b => <CardBubble key={b.id} x={b.x} size={b.size} delay={b.delay} dur={b.dur} />)}

        {/* Shimmer sweep */}
        <motion.div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(105deg, transparent 40%, hsl(43 72% 70% / 0.15) 50%, transparent 60%)" }}
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 3, delay: Math.random() * 2, repeat: Infinity, repeatDelay: 4 }}
        />

        <motion.span key={value}
          className="font-display text-3xl md:text-5xl lg:text-6xl relative z-10"
          style={{ color: "hsl(43 72% 42%)", textShadow: "0 0 25px hsl(43 72% 55% / 0.5), 0 2px 4px hsl(43 72% 40% / 0.3)" }}
          initial={{ y: -18, opacity: 0, scale: 0.7, rotateX: 90 }}
          animate={{ y: 0, opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 180 }}
        >
          {String(value).padStart(2, "0")}
        </motion.span>
        <span className="font-body text-[9px] md:text-[10px] uppercase tracking-[0.3em] mt-1 relative z-10"
          style={{ color: "hsl(0 25% 45%)" }}>
          {label}
        </span>
      </div>
    </motion.div>
  );
};

const Separator = () => (
  <motion.span
    className="font-display text-2xl md:text-4xl lg:text-5xl self-center"
    style={{ color: "hsl(43 72% 50% / 0.6)", textShadow: "0 0 12px hsl(43 72% 55% / 0.4)" }}
    animate={{ opacity: [0.2, 1, 0.2], scale: [0.9, 1.1, 0.9] }}
    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
  >:</motion.span>
);

const SceneCountdown = ({ onNext, guestName }: Props) => {
  const { days, hours, minutes, seconds } = useCountdown();
  const [submitted, setSubmitted] = useState(false);

  const rings = useMemo(() => Array.from({ length: 10 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100, size: 12 + Math.random() * 35, delay: Math.random() * 6,
  })), []);

  return (
    <SectionBackground className="flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center relative">

      {/* Floating rings */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {rings.map(r => <FloatingRing key={r.id} x={r.x} y={r.y} size={r.size} delay={r.delay} />)}
      </div>

      {/* Central pulsing glow */}
      <motion.div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 50%, hsl(43 72% 55% / 0.1) 0%, transparent 45%)" }}
        animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.85, 1.15, 0.85] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div className="relative z-10 flex flex-col items-center gap-6 md:gap-8 max-w-xl"
        initial="hidden" animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        {/* Heading */}
        <motion.div className="relative"
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
        >
          <motion.h2 className="font-display text-3xl md:text-4xl lg:text-5xl"
            style={{ color: "hsl(0 60% 25%)", textShadow: "0 2px 12px hsl(0 40% 30% / 0.2)" }}>
            Counting the Days
          </motion.h2>
          <motion.div className="absolute -bottom-2 left-1/2 h-[2px] rounded-full"
            style={{ background: "linear-gradient(90deg, transparent, hsl(43 72% 55%), transparent)" }}
            initial={{ width: 0, x: "-50%" }} animate={{ width: "80%", x: "-50%" }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </motion.div>

        {/* Divider */}
        <motion.div className="flex items-center gap-3"
          variants={{ hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 1, scaleX: 1 } }}
        >
          <motion.div className="h-px w-12 md:w-16"
            style={{ background: "linear-gradient(90deg, transparent, hsl(43 72% 55%))" }}
            animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div className="w-2.5 h-2.5 rounded-full"
            style={{ background: "hsl(43 72% 55%)", boxShadow: "0 0 10px hsl(43 72% 55% / 0.6)" }}
            animate={{ scale: [0.7, 1.4, 0.7], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div className="h-px w-12 md:w-16"
            style={{ background: "linear-gradient(90deg, hsl(43 72% 55%), transparent)" }}
            animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Countdown */}
        <motion.div className="flex gap-3 md:gap-5 lg:gap-6 items-center"
          variants={{ hidden: { opacity: 0, scale: 0.7 }, visible: { opacity: 1, scale: 1 } }}
          transition={{ type: "spring", stiffness: 80, damping: 12 }}
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
        <motion.div className="mt-2 space-y-3 max-w-md"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          <motion.p className="font-decorative text-xl md:text-2xl italic"
            style={{ color: "hsl(0 40% 35%)", textShadow: "0 1px 8px hsl(0 30% 40% / 0.15)" }}
            animate={{ opacity: [0.8, 1, 0.8] }} transition={{ duration: 3, repeat: Infinity }}>
            "Two souls, one heart, one beautiful journey"
          </motion.p>
          <p className="font-body text-sm" style={{ color: "hsl(0 25% 45%)" }}>
            Your blessings and presence would make our day truly special.
          </p>
        </motion.div>

        {/* Blessing Form */}
        <motion.div className="w-full max-w-lg"
          variants={{ hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0 } }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.02, y: -4 }}
        >
          {!submitted ? (
            <motion.div
              className="relative rounded-3xl p-8 md:p-10 backdrop-blur-sm overflow-hidden group"
              style={{
                background: "linear-gradient(135deg, hsl(0 30% 97% / 0.75), hsl(0 35% 87% / 0.55))",
                backdropFilter: "blur(16px)",
                border: "1px solid hsl(43 72% 55% / 0.4)",
                boxShadow: "0 8px 40px hsl(43 72% 55% / 0.15), inset 0 1px 0 hsl(43 72% 70% / 0.3), 0 0 80px hsl(43 72% 55% / 0.08)",
              }}
            >
              {/* Animated gradient border glow */}
              <motion.div className="absolute -inset-[2px] rounded-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                style={{
                  background: "linear-gradient(270deg, hsl(43 72% 55%), hsl(340 50% 65%), hsl(43 72% 55%), hsl(0 60% 45%))",
                  backgroundSize: "300% 300%",
                }}
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />

              {/* Outer glow pulse */}
              <motion.div className="absolute -inset-6 rounded-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, hsl(43 72% 55% / 0.12), transparent)" }}
                animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Stars inside card */}
              {Array.from({ length: 8 }, (_, i) => (
                <motion.div key={`star-${i}`}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
                    width: 2 + Math.random() * 3, height: 2 + Math.random() * 3,
                    background: "radial-gradient(circle, hsl(43 72% 70%), hsl(43 72% 55% / 0.4))",
                    boxShadow: `0 0 ${8 + Math.random() * 6}px hsl(43 72% 55% / 0.6)`,
                  }}
                  animate={{ opacity: [0, 1, 0.3, 1, 0], scale: [0.3, 1.5, 0.6, 1.4, 0.3] }}
                  transition={{ duration: 2.5 + Math.random() * 2, delay: Math.random() * 4, repeat: Infinity, ease: "easeInOut" }}
                />
              ))}

              {/* Bubbles rising */}
              {Array.from({ length: 5 }, (_, i) => (
                <motion.div key={`bubble-${i}`}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    left: `${10 + Math.random() * 80}%`, bottom: "-10%",
                    width: 6 + Math.random() * 10, height: 6 + Math.random() * 10,
                    border: "1px solid hsl(43 72% 55% / 0.3)",
                    background: "radial-gradient(circle at 30% 30%, hsl(43 72% 65% / 0.2), transparent)",
                  }}
                  animate={{ y: [0, -300], x: [0, Math.sin(i * 2) * 20, 0], opacity: [0, 0.7, 0.4, 0] }}
                  transition={{ duration: 4 + Math.random() * 3, delay: Math.random() * 5, repeat: Infinity, ease: "easeOut" }}
                />
              ))}

              {/* Corner ornaments */}
              {(["top-left", "top-right", "bottom-left", "bottom-right"] as const).map((pos) => {
                const r = { "top-left": 0, "top-right": 90, "bottom-right": 180, "bottom-left": 270 }[pos];
                const c = { "top-left": "top-0 left-0", "top-right": "top-0 right-0", "bottom-left": "bottom-0 left-0", "bottom-right": "bottom-0 right-0" }[pos];
                return (
                  <motion.div key={pos} className={`absolute ${c} w-8 h-8 md:w-10 md:h-10 pointer-events-none z-20`}
                    style={{ transform: `rotate(${r}deg)` }}
                  >
                    <svg viewBox="0 0 40 40" className="w-full h-full">
                      <motion.path d="M0,0 Q0,18 15,28" fill="none" stroke="hsl(43 72% 55%)" strokeWidth="1.5"
                        animate={{ pathLength: [0, 1, 0.5, 1], opacity: [0.4, 1, 0.5, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <motion.path d="M0,0 Q0,12 10,18" fill="none" stroke="hsl(43 72% 65% / 0.5)" strokeWidth="1"
                        animate={{ pathLength: [0, 1], opacity: [0.3, 0.8, 0.3] }}
                        transition={{ duration: 2.5, delay: 0.3, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <motion.circle cx="13" cy="24" r="1.5" fill="hsl(43 72% 65%)"
                        animate={{ scale: [0, 1.8, 0], opacity: [0, 1, 0] }}
                        transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
                      />
                      <motion.circle cx="8" cy="15" r="1" fill="hsl(43 72% 60%)"
                        animate={{ scale: [0, 1.5, 0], opacity: [0, 0.8, 0] }}
                        transition={{ duration: 1.8, delay: 1, repeat: Infinity }}
                      />
                    </svg>
                  </motion.div>
                );
              })}

              {/* Shimmer sweep */}
              <motion.div className="absolute inset-0 pointer-events-none rounded-3xl"
                style={{ background: "linear-gradient(105deg, transparent 35%, hsl(43 72% 70% / 0.2) 50%, transparent 65%)" }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
              />

              {/* Floating ring decorations */}
              {Array.from({ length: 4 }, (_, i) => (
                <motion.div key={`ring-${i}`}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    left: `${20 + Math.random() * 60}%`, top: `${10 + Math.random() * 80}%`,
                    width: 15 + Math.random() * 20, height: 15 + Math.random() * 20,
                    border: "1px solid hsl(43 72% 55% / 0.15)",
                  }}
                  animate={{ scale: [0.5, 1.5, 0.5], opacity: [0, 0.4, 0], rotate: [0, 180, 360] }}
                  transition={{ duration: 5 + Math.random() * 3, delay: Math.random() * 4, repeat: Infinity, ease: "easeInOut" }}
                />
              ))}

              <form className="flex flex-col gap-5 relative z-10" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                <motion.p className="font-decorative text-lg italic text-center"
                  style={{ color: "hsl(43 72% 42%)", textShadow: "0 0 15px hsl(43 72% 55% / 0.3)" }}
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  ✨ Your Blessings, {guestName} ✨
                </motion.p>
                <motion.textarea
                  placeholder="Share your blessings & wishes..."
                  className="w-full px-5 py-4 rounded-2xl font-body text-sm focus:outline-none transition-all duration-300 min-h-[130px] resize-none"
                  style={{
                    border: "1px solid hsl(43 72% 50% / 0.35)",
                    background: "hsl(0 30% 97% / 0.85)",
                    color: "hsl(0 60% 20%)",
                    boxShadow: "inset 0 2px 8px hsl(0 30% 50% / 0.05)",
                  }}
                  whileFocus={{ boxShadow: "0 0 0 3px hsl(43 72% 55% / 0.4), 0 6px 20px hsl(43 72% 55% / 0.15), inset 0 2px 8px hsl(0 30% 50% / 0.05)" }}
                />
                <motion.button
                  type="submit"
                  className="font-decorative text-lg tracking-widest uppercase px-10 py-5 rounded-full border-2 transition-all duration-500 relative overflow-hidden mx-auto"
                  style={{
                    borderColor: "hsl(43 72% 50%)",
                    color: "hsl(43 72% 42%)",
                    background: "transparent",
                    boxShadow: "0 0 20px hsl(43 72% 55% / 0.1)",
                  }}
                  whileHover={{
                    scale: 1.06,
                    background: "linear-gradient(135deg, hsl(43 72% 55%), hsl(43 80% 65%))",
                    color: "hsl(0 60% 15%)",
                    boxShadow: "0 8px 35px hsl(43 72% 55% / 0.5), 0 0 60px hsl(43 72% 55% / 0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Button shimmer */}
                  <motion.div className="absolute inset-0 pointer-events-none rounded-full"
                    style={{ background: "linear-gradient(105deg, transparent 30%, hsl(43 72% 80% / 0.3) 50%, transparent 70%)" }}
                    animate={{ x: ["-150%", "250%"] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  />
                  <span className="relative z-10">Send Blessings ✉</span>
                </motion.button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              className="relative rounded-3xl p-8 md:p-10 backdrop-blur-sm overflow-hidden flex flex-col items-center gap-5"
              style={{
                background: "linear-gradient(135deg, hsl(0 30% 97% / 0.75), hsl(0 35% 87% / 0.55))",
                border: "1px solid hsl(43 72% 55% / 0.4)",
                boxShadow: "0 8px 40px hsl(43 72% 55% / 0.15), 0 0 80px hsl(43 72% 55% / 0.08)",
              }}
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 15 }}
            >
              {/* Stars in thank you card */}
              {Array.from({ length: 6 }, (_, i) => (
                <motion.div key={`ty-star-${i}`}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
                    width: 2 + Math.random() * 3, height: 2 + Math.random() * 3,
                    background: "radial-gradient(circle, hsl(43 72% 70%), hsl(43 72% 55% / 0.4))",
                    boxShadow: `0 0 ${8 + Math.random() * 6}px hsl(43 72% 55% / 0.6)`,
                  }}
                  animate={{ opacity: [0, 1, 0.3, 1, 0], scale: [0.3, 1.5, 0.6, 1.4, 0.3] }}
                  transition={{ duration: 2.5 + Math.random() * 2, delay: Math.random() * 3, repeat: Infinity, ease: "easeInOut" }}
                />
              ))}
              {/* Bubbles in thank you card */}
              {Array.from({ length: 4 }, (_, i) => (
                <motion.div key={`ty-bubble-${i}`}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    left: `${15 + Math.random() * 70}%`, bottom: "-8%",
                    width: 5 + Math.random() * 8, height: 5 + Math.random() * 8,
                    border: "1px solid hsl(43 72% 55% / 0.25)",
                    background: "radial-gradient(circle at 30% 30%, hsl(43 72% 65% / 0.15), transparent)",
                  }}
                  animate={{ y: [0, -250], opacity: [0, 0.6, 0.3, 0] }}
                  transition={{ duration: 4 + Math.random() * 3, delay: Math.random() * 4, repeat: Infinity, ease: "easeOut" }}
                />
              ))}
              <motion.div className="text-5xl"
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: 2 }}
              >🎉</motion.div>
              <p className="font-display text-2xl relative z-10" style={{ color: "hsl(0 60% 25%)" }}>Thank You, {guestName}! 🙏</p>
              <p className="font-decorative text-lg italic relative z-10" style={{ color: "hsl(0 40% 35%)" }}>We look forward to celebrating with you</p>
              <motion.div className="flex gap-2 mt-2 relative z-10">
                {["🌸", "✨", "💐", "✨", "🌸"].map((emoji, i) => (
                  <motion.span key={i} className="text-2xl" animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 1.5, delay: i * 0.15, repeat: Infinity }}>{emoji}</motion.span>
                ))}
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0 } }}
          transition={{ delay: 1 }}>
          <GoldButton onClick={onNext}>Continue</GoldButton>
        </motion.div>
      </motion.div>
    </SectionBackground>
  );
};

export default SceneCountdown;
