import { motion } from "framer-motion";
import { useMemo } from "react";
import ganeshImg from "@/assets/ganesh.png";
import welcomeBg from "@/assets/welcome-bg.jpg";
import SectionBackground from "./SectionBackground";

interface Props {
  onNext: () => void;
  guestName?: string;
  onGuestNameChange?: (name: string) => void;
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
/* Ornate mandala corner ornament SVG */
const CornerOrnament = ({ delay }: { delay: number }) => (
  <motion.svg
    viewBox="0 0 120 120"
    className="w-full h-full"
    initial={{ opacity: 0, scale: 0, rotate: -90 }}
    animate={{ opacity: 1, scale: 1, rotate: 0 }}
    transition={{ duration: 1.5, delay, ease: "easeOut" }}
  >
    <defs>
      <radialGradient id={`cg-${delay}`} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(10,10) scale(100)">
        <stop offset="0%" stopColor="hsl(43 80% 65%)" />
        <stop offset="100%" stopColor="hsl(43 60% 40%)" />
      </radialGradient>
      <filter id={`glow-${delay}`}>
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
    {/* Main curved flourish */}
    <motion.path
      d="M5,5 Q5,60 60,60 Q35,60 35,35 Q35,15 5,5Z"
      fill={`url(#cg-${delay})`}
      opacity="0.15"
      animate={{ opacity: [0.1, 0.25, 0.1] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.path
      d="M5,5 C5,45 15,55 60,60"
      stroke="hsl(43 72% 55%)"
      strokeWidth="1.5"
      fill="none"
      filter={`url(#glow-${delay})`}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1, opacity: [0.6, 1, 0.6] }}
      transition={{ pathLength: { duration: 2, delay: delay + 0.3 }, opacity: { duration: 3, repeat: Infinity } }}
    />
    <motion.path
      d="M5,5 C45,5 55,15 60,60"
      stroke="hsl(43 72% 55%)"
      strokeWidth="1.5"
      fill="none"
      filter={`url(#glow-${delay})`}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1, opacity: [0.6, 1, 0.6] }}
      transition={{ pathLength: { duration: 2, delay: delay + 0.5 }, opacity: { duration: 3, repeat: Infinity, delay: 0.5 } }}
    />
    {/* Inner decorative curves */}
    <motion.path
      d="M8,20 Q20,40 40,42"
      stroke="hsl(43 72% 55%)"
      strokeWidth="0.8"
      fill="none"
      opacity="0.5"
      animate={{ opacity: [0.3, 0.7, 0.3] }}
      transition={{ duration: 2.5, repeat: Infinity, delay: delay + 0.2 }}
    />
    <motion.path
      d="M20,8 Q40,20 42,40"
      stroke="hsl(43 72% 55%)"
      strokeWidth="0.8"
      fill="none"
      opacity="0.5"
      animate={{ opacity: [0.3, 0.7, 0.3] }}
      transition={{ duration: 2.5, repeat: Infinity, delay: delay + 0.7 }}
    />
    {/* Mandala-style circular arcs */}
    {[16, 28, 40].map((r, i) => (
      <motion.circle
        key={i}
        cx="5" cy="5" r={r}
        stroke="hsl(43 72% 55%)"
        strokeWidth="0.4"
        fill="none"
        strokeDasharray="4 8"
        opacity="0.2"
        animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
        transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "5px 5px" }}
      />
    ))}
    {/* Decorative dots */}
    {[
      [15, 5], [5, 15], [25, 10], [10, 25], [35, 18], [18, 35], [45, 30], [30, 45],
    ].map(([cx, cy], i) => (
      <motion.circle
        key={`d-${i}`}
        cx={cx} cy={cy} r={1.2}
        fill="hsl(43 72% 60%)"
        animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.3, 0.8] }}
        transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: delay + i * 0.15 }}
      />
    ))}
    {/* Leaf/petal shapes */}
    <motion.path
      d="M10,10 Q20,5 30,12 Q20,18 10,10Z"
      fill="hsl(43 72% 55%)"
      opacity="0.12"
      animate={{ opacity: [0.08, 0.2, 0.08], scale: [0.95, 1.05, 0.95] }}
      transition={{ duration: 3, repeat: Infinity, delay: delay + 0.4 }}
    />
    <motion.path
      d="M10,10 Q5,20 12,30 Q18,20 10,10Z"
      fill="hsl(43 72% 55%)"
      opacity="0.12"
      animate={{ opacity: [0.08, 0.2, 0.08], scale: [0.95, 1.05, 0.95] }}
      transition={{ duration: 3, repeat: Infinity, delay: delay + 0.8 }}
    />
  </motion.svg>
);

const AnimatedBorder = () => (
  <>
    {/* Outer border lines */}
    {/* Top */}
    <motion.div
      className="absolute top-4 left-16 right-16 h-[1px] z-30 pointer-events-none"
      style={{ background: "linear-gradient(90deg, transparent, hsl(43 72% 55%), hsl(43 72% 55%), transparent)" }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
    />
    <motion.div
      className="absolute top-[18px] left-16 right-16 h-[1px] z-30 pointer-events-none"
      style={{ background: "linear-gradient(90deg, transparent, hsl(43 72% 55% / 0.4), hsl(43 72% 55% / 0.4), transparent)" }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 2, delay: 0.7, ease: "easeOut" }}
    />
    {/* Bottom */}
    <motion.div
      className="absolute bottom-4 left-16 right-16 h-[1px] z-30 pointer-events-none"
      style={{ background: "linear-gradient(90deg, transparent, hsl(43 72% 55%), hsl(43 72% 55%), transparent)" }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 2, delay: 0.6, ease: "easeOut" }}
    />
    <motion.div
      className="absolute bottom-[18px] left-16 right-16 h-[1px] z-30 pointer-events-none"
      style={{ background: "linear-gradient(90deg, transparent, hsl(43 72% 55% / 0.4), hsl(43 72% 55% / 0.4), transparent)" }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
    />
    {/* Left */}
    <motion.div
      className="absolute top-16 bottom-16 left-4 w-[1px] z-30 pointer-events-none"
      style={{ background: "linear-gradient(180deg, transparent, hsl(43 72% 55%), hsl(43 72% 55%), transparent)" }}
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 2, delay: 0.6, ease: "easeOut" }}
    />
    <motion.div
      className="absolute top-16 bottom-16 left-[18px] w-[1px] z-30 pointer-events-none"
      style={{ background: "linear-gradient(180deg, transparent, hsl(43 72% 55% / 0.4), hsl(43 72% 55% / 0.4), transparent)" }}
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
    />
    {/* Right */}
    <motion.div
      className="absolute top-16 bottom-16 right-4 w-[1px] z-30 pointer-events-none"
      style={{ background: "linear-gradient(180deg, transparent, hsl(43 72% 55%), hsl(43 72% 55%), transparent)" }}
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 2, delay: 0.7, ease: "easeOut" }}
    />
    <motion.div
      className="absolute top-16 bottom-16 right-[18px] w-[1px] z-30 pointer-events-none"
      style={{ background: "linear-gradient(180deg, transparent, hsl(43 72% 55% / 0.4), hsl(43 72% 55% / 0.4), transparent)" }}
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 2, delay: 0.9, ease: "easeOut" }}
    />

    {/* Glowing pulse on borders */}
    <motion.div
      className="absolute top-4 left-16 right-16 h-[2px] z-30 pointer-events-none"
      style={{ background: "linear-gradient(90deg, transparent, hsl(43 72% 65% / 0.8), transparent)" }}
      animate={{ x: ["-100%", "100%"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
    />
    <motion.div
      className="absolute bottom-4 left-16 right-16 h-[2px] z-30 pointer-events-none"
      style={{ background: "linear-gradient(90deg, transparent, hsl(43 72% 65% / 0.8), transparent)" }}
      animate={{ x: ["100%", "-100%"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 2, delay: 1.5 }}
    />

    {/* Corner ornaments - large mandala style */}
    {[
      { pos: "top-0 left-0", rotate: 0, delay: 0.3 },
      { pos: "top-0 right-0", rotate: 90, delay: 0.5 },
      { pos: "bottom-0 right-0", rotate: 180, delay: 0.7 },
      { pos: "bottom-0 left-0", rotate: 270, delay: 0.9 },
    ].map((corner, i) => (
      <div
        key={i}
        className={`absolute ${corner.pos} w-16 h-16 md:w-20 md:h-20 z-30 pointer-events-none`}
        style={{ transform: `rotate(${corner.rotate}deg)` }}
      >
        <CornerOrnament delay={corner.delay} />
      </div>
    ))}

    {/* Side center ornaments (small mandala motifs like the reference) */}
    {[
      { pos: "top-1/2 left-1 -translate-y-1/2", rotate: 270, size: "w-8 h-8" },
      { pos: "top-1/2 right-1 -translate-y-1/2", rotate: 90, size: "w-8 h-8" },
    ].map((side, i) => (
      <motion.div
        key={`side-${i}`}
        className={`absolute ${side.pos} ${side.size} z-30 pointer-events-none`}
        style={{ transform: `translateY(-50%) rotate(${side.rotate}deg)` }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0.4, 0.8, 0.4], scale: 1 }}
        transition={{ opacity: { duration: 3, repeat: Infinity }, scale: { duration: 1, delay: 1.5 } }}
      >
        <svg viewBox="0 0 40 40" className="w-full h-full">
          <motion.path
            d="M20,5 Q30,15 25,20 Q30,25 20,35 Q10,25 15,20 Q10,15 20,5Z"
            fill="none"
            stroke="hsl(43 72% 55%)"
            strokeWidth="0.8"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
          <motion.circle cx="20" cy="20" r="2" fill="hsl(43 72% 60%)"
            animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </svg>
      </motion.div>
    ))}

    {/* Ball 1 - clockwise golden orb */}
    <motion.div
      className="absolute w-2.5 h-2.5 rounded-full z-30 pointer-events-none"
      style={{
        background: "radial-gradient(circle, hsl(43 80% 80%), hsl(43 72% 55%))",
        boxShadow: "0 0 12px hsl(43 72% 55%), 0 0 24px hsl(43 72% 55% / 0.5), 0 0 40px hsl(43 72% 55% / 0.2)",
      }}
      animate={{
        left: ["16px", "calc(100% - 24px)", "calc(100% - 24px)", "16px", "16px"],
        top: ["16px", "16px", "calc(100% - 24px)", "calc(100% - 24px)", "16px"],
      }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear", times: [0, 0.25, 0.5, 0.75, 1] }}
    />
    {/* Ball 2 - counter-clockwise */}
    <motion.div
      className="absolute w-2 h-2 rounded-full z-30 pointer-events-none"
      style={{
        background: "radial-gradient(circle, hsl(43 72% 75%), hsl(43 60% 50%))",
        boxShadow: "0 0 8px hsl(43 72% 55%), 0 0 16px hsl(43 72% 55% / 0.3)",
      }}
      animate={{
        left: ["16px", "16px", "calc(100% - 24px)", "calc(100% - 24px)", "16px"],
        top: ["16px", "calc(100% - 24px)", "calc(100% - 24px)", "16px", "16px"],
      }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear", times: [0, 0.25, 0.5, 0.75, 1] }}
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

const SceneWelcome = ({ onNext, guestName, onGuestNameChange }: Props) => {
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
      {/* Background image */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: [1.1, 1.15, 1.1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      >
        <img
          src={welcomeBg}
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.45) contrast(1.1) saturate(1.2)" }}
        />
      </motion.div>
      {/* Gradient overlay */}
      <div className="absolute inset-0 z-[1]" style={{ background: "linear-gradient(180deg, hsl(0 0% 0% / 0.3) 0%, hsl(0 0% 0% / 0.15) 40%, hsl(0 0% 0% / 0.4) 100%)" }} />
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

        {/* Guest Name - simple elegant text */}
        <motion.div variants={fadeUp}>
          <motion.span
            className="font-decorative text-3xl md:text-4xl italic"
            style={{ color: "hsl(43 72% 65%)" }}
            animate={{
              textShadow: [
                "0 0 10px hsl(43 72% 55% / 0.3)",
                "0 0 30px hsl(43 72% 55% / 0.6)",
                "0 0 10px hsl(43 72% 55% / 0.3)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {"{Guest Name}"}
          </motion.span>
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
