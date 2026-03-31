import { motion } from "framer-motion";
import { useMemo } from "react";
import ganeshImg from "@/assets/ganesh.png";
import SectionBackground from "./SectionBackground";

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
      background: `radial-gradient(circle, hsl(43 72% 65% / 0.9), transparent)`,
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

/* Animated border frame with ball traveling full border using offset-path */
const AnimatedBorder = () => (
  <>
    {/* Top border */}
    <motion.div
      className="absolute top-3 left-3 right-3 h-px z-30 pointer-events-none"
      style={{ background: "linear-gradient(90deg, transparent, hsl(43 72% 55%), transparent)" }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1, opacity: [0.3, 0.8, 0.3] }}
      transition={{ scaleX: { duration: 2, delay: 0.5 }, opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
    />
    {/* Bottom border */}
    <motion.div
      className="absolute bottom-3 left-3 right-3 h-px z-30 pointer-events-none"
      style={{ background: "linear-gradient(90deg, transparent, hsl(43 72% 55%), transparent)" }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1, opacity: [0.3, 0.8, 0.3] }}
      transition={{ scaleX: { duration: 2, delay: 0.7 }, opacity: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 } }}
    />
    {/* Left border */}
    <motion.div
      className="absolute top-3 bottom-3 left-3 w-px z-30 pointer-events-none"
      style={{ background: "linear-gradient(180deg, transparent, hsl(43 72% 55%), transparent)" }}
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1, opacity: [0.3, 0.8, 0.3] }}
      transition={{ scaleY: { duration: 2, delay: 0.6 }, opacity: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 } }}
    />
    {/* Right border */}
    <motion.div
      className="absolute top-3 bottom-3 right-3 w-px z-30 pointer-events-none"
      style={{ background: "linear-gradient(180deg, transparent, hsl(43 72% 55%), transparent)" }}
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1, opacity: [0.3, 0.8, 0.3] }}
      transition={{ scaleY: { duration: 2, delay: 0.8 }, opacity: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 } }}
    />

    {/* Corner ornaments */}
    {[
      { pos: "top-2 left-2", rotate: 0 },
      { pos: "top-2 right-2", rotate: 90 },
      { pos: "bottom-2 right-2", rotate: 180 },
      { pos: "bottom-2 left-2", rotate: 270 },
    ].map((corner, i) => (
      <motion.div
        key={i}
        className={`absolute ${corner.pos} w-8 h-8 z-30 pointer-events-none`}
        style={{ rotate: `${corner.rotate}deg` }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1 + i * 0.2 }}
      >
        <svg viewBox="0 0 32 32" className="w-full h-full">
          <motion.path
            d="M0,0 L12,0" stroke="hsl(43 72% 55%)" strokeWidth="1.5" fill="none"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          />
          <motion.path
            d="M0,0 L0,12" stroke="hsl(43 72% 55%)" strokeWidth="1.5" fill="none"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 + 0.5 }}
          />
          <motion.circle
            cx="0" cy="0" r="2" fill="hsl(43 72% 55%)"
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2 }}
          />
        </svg>
      </motion.div>
    ))}

    {/* Ball 1 - clockwise: top-left → top-right → bottom-right → bottom-left → top-left */}
    <motion.div
      className="absolute w-3 h-3 rounded-full z-30 pointer-events-none"
      style={{
        background: "radial-gradient(circle, hsl(43 72% 75%), hsl(43 72% 55%))",
        boxShadow: "0 0 12px hsl(43 72% 55%), 0 0 24px hsl(43 72% 55% / 0.6), 0 0 40px hsl(43 72% 55% / 0.3)",
      }}
      animate={{
        left: ["12px", "calc(100% - 24px)", "calc(100% - 24px)", "12px", "12px"],
        top: ["12px", "12px", "calc(100% - 24px)", "calc(100% - 24px)", "12px"],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.25, 0.5, 0.75, 1],
      }}
    />
    {/* Ball 2 - counter-clockwise */}
    <motion.div
      className="absolute w-2 h-2 rounded-full z-30 pointer-events-none"
      style={{
        background: "radial-gradient(circle, hsl(43 72% 80%), hsl(43 72% 60%))",
        boxShadow: "0 0 8px hsl(43 72% 55%), 0 0 16px hsl(43 72% 55% / 0.4)",
      }}
      animate={{
        left: ["12px", "12px", "calc(100% - 24px)", "calc(100% - 24px)", "12px"],
        top: ["12px", "calc(100% - 24px)", "calc(100% - 24px)", "12px", "12px"],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.25, 0.5, 0.75, 1],
      }}
    />
    {/* Ball 3 - smaller, faster */}
    <motion.div
      className="absolute w-1.5 h-1.5 rounded-full z-30 pointer-events-none"
      style={{
        background: "radial-gradient(circle, hsl(0 60% 70%), hsl(0 50% 55%))",
        boxShadow: "0 0 8px hsl(0 60% 55%), 0 0 16px hsl(0 60% 55% / 0.4)",
      }}
      animate={{
        left: ["calc(50% - 6px)", "calc(100% - 24px)", "calc(100% - 24px)", "12px", "12px", "calc(50% - 6px)"],
        top: ["12px", "12px", "calc(100% - 24px)", "calc(100% - 24px)", "12px", "12px"],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.15, 0.4, 0.65, 0.9, 1],
      }}
    />
  </>
);

/* Radiating mandala rays behind Ganesh */
const MandalaRays = () => (
  <motion.div
    className="absolute inset-0 flex items-center justify-center pointer-events-none"
    initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
    animate={{ opacity: 1, scale: 1, rotate: 0 }}
    transition={{ duration: 2, ease: "easeOut" }}
  >
    <svg viewBox="0 0 400 400" className="w-[280px] h-[280px] md:w-[380px] md:h-[380px]">
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
    <div className="relative flex h-screen flex-col items-center justify-center overflow-hidden">
      {/* Background image - full clarity */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
      >
        <motion.img
          src={welcomeBg}
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: "brightness(1.05) contrast(1.08) saturate(1.2)" }}
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Light overlay for text readability */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, hsl(0 0% 0% / 0.15) 0%, hsl(0 0% 0% / 0.05) 40%, hsl(0 0% 0% / 0.05) 60%, hsl(0 0% 0% / 0.2) 100%)" }} />
        {/* Animated red/golden spotlight */}
        <motion.div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 50% 40%, hsl(0 60% 50% / 0.08) 0%, transparent 50%)" }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 50% 50%, hsl(43 72% 55% / 0.05) 0%, transparent 60%)" }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Sparkle particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {sparkles.map((s) => (
          <Sparkle key={s.id} x={s.x} y={s.y} size={s.size} delay={s.delay} />
        ))}
      </div>

      {/* Animated border frame */}
      <AnimatedBorder />

      {/* Main content */}
      <motion.div
        className="relative z-20 flex flex-col items-center gap-3 md:gap-4 max-w-2xl px-6 py-8 text-center"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        {/* शुभ विवाह */}
        <motion.div className="flex items-center gap-3" variants={fadeIn}>
          <motion.span
            className="text-xs"
            style={{ color: "hsl(43 72% 65%)" }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >✦</motion.span>
          <span className="font-decorative text-lg md:text-xl tracking-[0.3em]" style={{ color: "hsl(43 72% 65%)" }}>
            शुभ विवाह
          </span>
          <motion.span
            className="text-xs"
            style={{ color: "hsl(43 72% 65%)" }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >✦</motion.span>
        </motion.div>

        {/* Ganesh Ji with mandala rays */}
        <motion.div className="relative w-40 h-40 md:w-48 md:h-48 flex items-center justify-center" variants={scaleIn}>
          <MandalaRays />
          <motion.div
            className="absolute w-28 h-28 md:w-36 md:h-36 rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(43 72% 55% / 0.3) 0%, hsl(43 72% 45% / 0.1) 50%, transparent 70%)",
              boxShadow: "0 0 60px hsl(43 72% 55% / 0.3), 0 0 120px hsl(43 72% 55% / 0.15)",
            }}
            animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-24 h-24 md:w-32 md:h-32 rounded-full"
            style={{ border: "1px solid hsl(43 72% 55% / 0.3)" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <img
            src={ganeshImg}
            alt="Lord Ganesha"
            className="relative z-10 w-20 h-20 md:w-28 md:h-28 object-contain animate-float drop-shadow-lg"
            style={{ filter: "drop-shadow(0 0 25px hsl(43 72% 55% / 0.5))" }}
          />
        </motion.div>

        {/* ॐ symbol */}
        <motion.p
          className="font-decorative text-xl"
          style={{ color: "hsl(43 72% 65% / 0.7)" }}
          variants={fadeIn}
        >
          ॐ
        </motion.p>

        {/* Sanskrit shloka - single line */}
        <motion.p
          className="font-decorative text-[10px] md:text-sm tracking-wide whitespace-nowrap"
          style={{ color: "hsl(43 72% 65% / 0.8)" }}
          variants={fadeUp}
        >
          वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
        </motion.p>

        {/* Divider */}
        <motion.div
          className="h-px w-20 opacity-30"
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

        {/* Guest Name with premium shimmer animation */}
        <motion.div className="relative" variants={fadeUp}>
          <motion.div className="relative px-10 py-3 overflow-hidden">
            <motion.span
              className="absolute inset-0"
              style={{
                border: "1px solid hsl(43 72% 55% / 0.4)",
                borderRadius: "50px",
              }}
              animate={{
                boxShadow: [
                  "0 0 10px hsl(43 72% 55% / 0.1), inset 0 0 10px hsl(43 72% 55% / 0.03)",
                  "0 0 30px hsl(43 72% 55% / 0.4), inset 0 0 30px hsl(43 72% 55% / 0.1)",
                  "0 0 10px hsl(43 72% 55% / 0.1), inset 0 0 10px hsl(43 72% 55% / 0.03)",
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
              className="absolute inset-[1px] rounded-[50px]"
              style={{
                background: "linear-gradient(135deg, hsl(43 72% 55% / 0.06), hsl(43 72% 45% / 0.12), hsl(43 72% 55% / 0.06))",
              }}
              animate={{
                background: [
                  "linear-gradient(135deg, hsl(43 72% 55% / 0.06), hsl(43 72% 45% / 0.12), hsl(43 72% 55% / 0.06))",
                  "linear-gradient(135deg, hsl(43 72% 55% / 0.12), hsl(43 72% 45% / 0.06), hsl(43 72% 55% / 0.12))",
                  "linear-gradient(135deg, hsl(43 72% 55% / 0.06), hsl(43 72% 45% / 0.12), hsl(43 72% 55% / 0.06))",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
              className="absolute inset-0 rounded-[50px] pointer-events-none"
              style={{
                background: "linear-gradient(105deg, transparent 35%, hsl(43 72% 65% / 0.25) 50%, transparent 65%)",
              }}
              animate={{ x: ["-200%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
            />
            {[
              { cls: "top-0 left-0", rot: 0 },
              { cls: "top-0 right-0", rot: 90 },
              { cls: "bottom-0 right-0", rot: 180 },
              { cls: "bottom-0 left-0", rot: 270 },
            ].map((c, i) => (
              <motion.svg
                key={i}
                className={`absolute ${c.cls} w-4 h-4`}
                viewBox="0 0 16 16"
                style={{ rotate: `${c.rot}deg` }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              >
                <path d="M0,0 L6,0" stroke="hsl(43 72% 65%)" strokeWidth="1" fill="none" />
                <path d="M0,0 L0,6" stroke="hsl(43 72% 65%)" strokeWidth="1" fill="none" />
              </motion.svg>
            ))}
            <span className="relative z-10 flex items-center gap-3 font-decorative text-3xl md:text-4xl italic" style={{ color: "hsl(43 72% 65%)" }}>
              <motion.span
                className="text-[10px]"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              >✦</motion.span>
              {"{Guest Name}"}
              <motion.span
                className="text-[10px]"
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              >✦</motion.span>
            </span>
          </motion.div>
        </motion.div>

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
          className="font-display text-4xl md:text-6xl font-light leading-tight"
          style={{ color: "hsl(40 30% 88%)" }}
          variants={fadeUp}
        >
          Rajveer <span className="font-decorative italic text-3xl md:text-5xl" style={{ color: "hsl(43 72% 60%)" }}>&</span> Ishita
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
          className="font-decorative text-sm md:text-base italic tracking-wider"
          style={{ color: "hsl(43 72% 60% / 0.8)" }}
          variants={fadeUp}
        >
          12 December 2026
        </motion.p>

        {/* Open Invitation Button */}
        <motion.div className="mt-4" variants={fadeUp}>
          <motion.button
            onClick={onNext}
            className="group relative px-12 py-4 overflow-hidden"
            style={{ background: "transparent" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="absolute inset-0 rounded-full"
              style={{ border: "1px solid hsl(43 72% 55% / 0.5)" }}
              animate={{
                boxShadow: [
                  "0 0 15px hsl(43 72% 55% / 0.15)",
                  "0 0 30px hsl(43 72% 55% / 0.35)",
                  "0 0 15px hsl(43 72% 55% / 0.15)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
              className="absolute inset-[1px] rounded-full"
              style={{ background: "linear-gradient(135deg, hsl(43 72% 55% / 0.1), hsl(43 72% 45% / 0.18), hsl(43 72% 55% / 0.1))" }}
            />
            <motion.span
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ background: "linear-gradient(105deg, transparent 35%, hsl(43 72% 65% / 0.3) 50%, transparent 65%)" }}
              animate={{ x: ["-200%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
            />
            <span className="relative z-10 font-decorative text-sm md:text-base tracking-[0.25em] uppercase" style={{ color: "hsl(43 72% 65%)" }}>
              Open Invitation
            </span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-30"
        style={{ background: "radial-gradient(ellipse at center, transparent 55%, hsl(0 0% 0% / 0.3) 100%)" }}
      />
    </div>
  );
};

export default SceneWelcome;
