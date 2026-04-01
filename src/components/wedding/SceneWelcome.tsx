import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import welcomeHeroBg from "@/assets/welcome-hero-bg.png";
import ganeshImg from "@/assets/ganesh.png";

interface Props {
  onNext: () => void;
  guestName?: string;
  onGuestNameChange?: (name: string) => void;
}

/* ── Floating gold particle ── */
const GoldParticle = ({ delay, x, size, dur }: { delay: number; x: number; size: number; dur: number }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      left: `${x}%`,
      bottom: "-5%",
      width: size,
      height: size,
      background: `radial-gradient(circle, hsl(43 74% 65% / 0.9), hsl(43 74% 49%) 40%, transparent 70%)`,
      boxShadow: `0 0 ${size * 2}px hsl(43 74% 49% / 0.6)`,
    }}
    animate={{
      y: [0, -window.innerHeight * 1.2],
      x: [0, (Math.random() - 0.5) * 120],
      opacity: [0, 1, 1, 0],
      scale: [0.3, 1, 0.8, 0.2],
    }}
    transition={{ duration: dur, delay, repeat: Infinity, ease: "easeOut" }}
  />
);

/* ── Animated golden border frame ── */
const GoldenFrame = () => (
  <>
    {/* Border lines */}
    {(["top", "bottom", "left", "right"] as const).map((side) => {
      const isH = side === "top" || side === "bottom";
      return (
        <motion.div
          key={side}
          className="absolute z-30 pointer-events-none"
          style={{
            [side]: 12,
            ...(isH
              ? { left: 12, right: 12, height: 1, background: "linear-gradient(90deg, transparent, #D4AF37 30%, #D4AF37 70%, transparent)" }
              : { top: 12, bottom: 12, width: 1, background: "linear-gradient(180deg, transparent, #D4AF37 30%, #D4AF37 70%, transparent)" }),
            opacity: 0.5,
          }}
          initial={{ [isH ? "scaleX" : "scaleY"]: 0 }}
          animate={{ [isH ? "scaleX" : "scaleY"]: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />
      );
    })}
    {/* Corner ornaments */}
    {[
      { t: 6, l: 6 },
      { t: 6, r: 6 },
      { b: 6, r: 6 },
      { b: 6, l: 6 },
    ].map((pos, i) => (
      <motion.div
        key={i}
        className="absolute w-10 h-10 z-30 pointer-events-none"
        style={{
          ...Object.fromEntries(Object.entries(pos).map(([k, v]) => [k === "t" ? "top" : k === "b" ? "bottom" : k === "l" ? "left" : "right", v])),
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 0.8, delay: 1 + i * 0.15 }}
      >
        <svg viewBox="0 0 40 40" className="w-full h-full" style={{ transform: `rotate(${i * 90}deg)` }}>
          <path d="M2,2 L14,2" stroke="#D4AF37" strokeWidth="1.5" fill="none" />
          <path d="M2,2 L2,14" stroke="#D4AF37" strokeWidth="1.5" fill="none" />
          {/* small mandala ornament */}
          <circle cx="2" cy="2" r="2" fill="#D4AF37" opacity="0.8" />
          <path d="M6,2 Q10,6 6,10" stroke="#D4AF37" strokeWidth="0.5" fill="none" opacity="0.5" />
        </svg>
      </motion.div>
    ))}
  </>
);

/* ── Typewriter text ── */
const TypewriterText = ({ text, delay = 0, className, style }: { text: string; delay?: number; className?: string; style?: React.CSSProperties }) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 60);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, delay]);
  return (
    <motion.span className={className} style={style} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay / 1000 }}>
      {displayed}
      <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }}>|</motion.span>
    </motion.span>
  );
};

/* ── Mandala SVG behind Ganesh ── */
const GoldenMandala = () => (
  <motion.div
    className="absolute inset-0 flex items-center justify-center pointer-events-none"
    initial={{ opacity: 0, scale: 0.3, rotate: -60 }}
    animate={{ opacity: 1, scale: 1, rotate: 0 }}
    transition={{ duration: 2.5, ease: "easeOut" }}
  >
    <svg viewBox="0 0 400 400" className="w-[240px] h-[240px] md:w-[320px] md:h-[320px]">
      {/* Outer petal ring */}
      {[...Array(16)].map((_, i) => {
        const angle = (i * 22.5 * Math.PI) / 180;
        return (
          <motion.ellipse
            key={`petal-${i}`}
            cx={200 + 130 * Math.cos(angle)}
            cy={200 + 130 * Math.sin(angle)}
            rx="18"
            ry="8"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="0.8"
            opacity="0.4"
            transform={`rotate(${i * 22.5} ${200 + 130 * Math.cos(angle)} ${200 + 130 * Math.sin(angle)})`}
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, delay: i * 0.15, repeat: Infinity }}
          />
        );
      })}
      {/* Ray lines */}
      {[...Array(32)].map((_, i) => {
        const angle = (i * 11.25 * Math.PI) / 180;
        return (
          <motion.line
            key={`ray-${i}`}
            x1="200" y1="200"
            x2={200 + 170 * Math.cos(angle)}
            y2={200 + 170 * Math.sin(angle)}
            stroke="#D4AF37"
            strokeWidth={i % 2 === 0 ? "0.8" : "0.3"}
            opacity="0.15"
            animate={{ opacity: [0.08, 0.22, 0.08] }}
            transition={{ duration: 4, delay: i * 0.08, repeat: Infinity }}
          />
        );
      })}
      {/* Concentric circles */}
      {[60, 90, 120, 155].map((r, i) => (
        <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="#D4AF37" strokeWidth={i === 0 ? "1" : "0.4"} opacity={0.3 - i * 0.05} />
      ))}
    </svg>
  </motion.div>
);

/* ── Red rose glow center ── */
const RoseGlow = () => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: 120,
      height: 120,
      background: "radial-gradient(circle, hsl(0 70% 45% / 0.7) 0%, hsl(0 60% 35% / 0.4) 40%, transparent 70%)",
      boxShadow: "0 0 80px hsl(0 70% 40% / 0.5), 0 0 140px hsl(43 74% 49% / 0.3)",
    }}
    animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  />
);

const SceneWelcome = ({ onNext, guestName }: Props) => {
  const particles = useMemo(
    () => Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 1.5 + Math.random() * 4,
      delay: Math.random() * 6,
      dur: 5 + Math.random() * 5,
    })),
    []
  );

  const displayName = guestName || "Guest Name";

  return (
    <div className="relative flex h-screen flex-col items-center justify-center overflow-hidden" style={{ background: "#1A0D2E" }}>
      {/* Background image */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.05 }}
        animate={{ scale: [1.05, 1.08, 1.05] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src={welcomeHeroBg} alt="" className="w-full h-full object-cover" style={{ opacity: 0.85 }} />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 z-[1]" style={{ background: "linear-gradient(180deg, hsl(270 50% 8% / 0.4) 0%, hsl(270 50% 5% / 0.2) 40%, hsl(270 50% 8% / 0.5) 100%)" }} />

      {/* Floating gold particles */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <GoldParticle key={p.id} x={p.x} size={p.size} delay={p.delay} dur={p.dur} />
        ))}
      </div>

      {/* Golden border frame */}
      <GoldenFrame />

      {/* Main content */}
      <motion.div
        className="relative z-20 flex flex-col items-center gap-2 md:gap-3 max-w-2xl px-6 text-center"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
      >
        {/* शुभ विवाह */}
        <motion.h2
          className="text-3xl md:text-5xl font-bold tracking-wide"
          style={{
            fontFamily: "'Noto Sans Devanagari', serif",
            color: "#D4AF37",
            textShadow: "0 0 30px hsl(43 74% 49% / 0.6), 0 0 60px hsl(43 74% 49% / 0.3), 0 4px 8px hsl(0 0% 0% / 0.5)",
          }}
          variants={{ hidden: { opacity: 0, y: -30 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2 } } }}
        >
          शुभ विवाह
        </motion.h2>

        {/* Ganesh mandala + rose glow */}
        <motion.div
          className="relative w-44 h-44 md:w-56 md:h-56 flex items-center justify-center my-2"
          variants={{ hidden: { opacity: 0, scale: 0.4 }, visible: { opacity: 1, scale: 1, transition: { duration: 1.5, ease: "easeOut" } } }}
        >
          <GoldenMandala />
          <RoseGlow />
          <img
            src={ganeshImg}
            alt="Lord Ganesha"
            className="relative z-10 w-20 h-20 md:w-28 md:h-28 object-contain"
            style={{ filter: "drop-shadow(0 0 20px hsl(43 74% 49% / 0.6))" }}
          />
          {/* Rotating ring */}
          <motion.div
            className="absolute w-32 h-32 md:w-44 md:h-44 rounded-full"
            style={{ border: "1px solid hsl(43 74% 49% / 0.25)" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* ॐ */}
        <motion.p
          className="text-2xl md:text-3xl font-bold"
          style={{
            fontFamily: "'Noto Sans Devanagari', serif",
            color: "#D4AF37",
            textShadow: "0 0 25px hsl(43 74% 49% / 0.5)",
          }}
          variants={{ hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } } }}
        >
          ॐ
        </motion.p>

        {/* Dear Guest Name - typewriter */}
        <motion.div
          className="mt-2"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } }}
        >
          <TypewriterText
            text={`Dear ${displayName},`}
            delay={2000}
            className="font-decorative text-lg md:text-2xl italic"
            style={{ color: "hsl(40 30% 88%)" }}
          />
        </motion.div>

        {/* Invitation text */}
        <motion.p
          className="font-body text-xs md:text-sm tracking-wide"
          style={{ color: "hsl(0 0% 70%)" }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1, delay: 0.3 } } }}
        >
          You are cordially invited to the wedding of
        </motion.p>

        {/* Couple names */}
        <motion.h1
          className="font-display text-4xl md:text-7xl font-bold italic leading-tight"
          style={{
            color: "#D4AF37",
            textShadow: "0 0 30px hsl(43 74% 49% / 0.4), 0 4px 12px hsl(0 0% 0% / 0.4)",
          }}
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 1 } } }}
        >
          Rajveer{" "}
          <span style={{ color: "hsl(0 60% 55%)" }}>&amp;</span>{" "}
          Ishita
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="font-body text-[10px] md:text-xs uppercase tracking-[0.35em]"
          style={{ color: "hsl(0 0% 55%)" }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1 } } }}
        >
          Two Souls, One Journey
        </motion.p>

        {/* Date */}
        <motion.p
          className="font-decorative text-base md:text-xl italic tracking-wider mt-1"
          style={{ color: "hsl(40 30% 85%)" }}
          variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
        >
          12 December 2026
        </motion.p>

        {/* Open Invitation Button */}
        <motion.div
          className="mt-4"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
        >
          <motion.button
            onClick={onNext}
            className="relative px-10 md:px-14 py-3 md:py-4 rounded-full overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #D4AF37, #B8962E, #D4AF37)",
              boxShadow: "0 0 20px hsl(43 74% 49% / 0.4), 0 4px 15px hsl(0 0% 0% / 0.3)",
            }}
            whileHover={{ scale: 1.08, boxShadow: "0 0 40px hsl(43 74% 49% / 0.6), 0 4px 20px hsl(0 0% 0% / 0.4)" }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 0 20px hsl(43 74% 49% / 0.3), 0 4px 15px hsl(0 0% 0% / 0.3)",
                "0 0 35px hsl(43 74% 49% / 0.6), 0 4px 20px hsl(0 0% 0% / 0.3)",
                "0 0 20px hsl(43 74% 49% / 0.3), 0 4px 15px hsl(0 0% 0% / 0.3)",
              ],
            }}
            transition={{ boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
          >
            {/* Shimmer */}
            <motion.span
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ background: "linear-gradient(105deg, transparent 30%, hsl(0 0% 100% / 0.3) 50%, transparent 70%)" }}
              animate={{ x: ["-200%", "200%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
            />
            <span
              className="relative z-10 font-body text-xs md:text-sm font-semibold tracking-[0.3em] uppercase"
              style={{ color: "#1A0D2E" }}
            >
              Open Invitation
            </span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-[25]"
        style={{ background: "radial-gradient(ellipse at center, transparent 50%, hsl(270 50% 5% / 0.5) 100%)" }}
      />
    </div>
  );
};

export default SceneWelcome;
