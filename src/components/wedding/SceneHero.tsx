import { motion } from "framer-motion";
import { useMemo } from "react";
import GoldButton from "./GoldButton";
import mandalaImg from "@/assets/mandala.png";

interface Props { onNext: () => void; }

/* Floating star particle */
const Star = ({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: size,
      height: size,
      background: "radial-gradient(circle, hsl(43 72% 70%), hsl(43 72% 55% / 0.5))",
      boxShadow: `0 0 ${size * 2}px hsl(43 72% 55% / 0.4)`,
    }}
    animate={{
      opacity: [0, 1, 0.4, 1, 0],
      scale: [0.5, 1, 0.7, 1.2, 0.5],
    }}
    transition={{
      duration: 3 + Math.random() * 3,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

/* Floating bubble */
const Bubble = ({ x, size, delay, duration }: { x: number; size: number; delay: number; duration: number }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      left: `${x}%`,
      bottom: "-5%",
      width: size,
      height: size,
      border: "1px solid hsl(43 72% 55% / 0.2)",
      background: "radial-gradient(circle at 30% 30%, hsl(43 72% 65% / 0.15), transparent)",
    }}
    animate={{
      y: [0, -window.innerHeight * 1.2],
      x: [0, Math.sin(x) * 30, 0],
      opacity: [0, 0.6, 0.4, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeOut",
    }}
  />
);

const SceneHero = ({ onNext }: Props) => {
  const stars = useMemo(
    () => Array.from({ length: 35 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1.5 + Math.random() * 3,
      delay: Math.random() * 5,
    })),
    []
  );

  const bubbles = useMemo(
    () => Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 8 + Math.random() * 20,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 6,
    })),
    []
  );

  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center px-6 py-12 text-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(0 45% 92%) 0%, hsl(0 40% 88%) 30%, hsl(0 35% 85%) 60%, hsl(0 45% 90%) 100%)" }}
    >
      {/* Animated radial light */}
      <motion.div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 30%, hsl(0 50% 80% / 0.4) 0%, transparent 60%)" }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((s) => (
          <Star key={s.id} x={s.x} y={s.y} size={s.size} delay={s.delay} />
        ))}
      </div>

      {/* Bubbles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {bubbles.map((b) => (
          <Bubble key={b.id} x={b.x} size={b.size} delay={b.delay} duration={b.duration} />
        ))}
      </div>

      {/* Background mandala */}
      <motion.img
        src={mandalaImg}
        alt=""
        className="absolute opacity-[0.07]"
        style={{ width: "80vmin", height: "80vmin" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        loading="lazy"
        width={800}
        height={800}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-6 max-w-lg"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        <motion.p
          className="font-body text-xs uppercase tracking-[0.4em]"
          style={{ color: "hsl(0 30% 40%)" }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        >
          Together with their families
        </motion.p>

        <motion.h2
          className="font-display text-5xl md:text-7xl font-bold"
          style={{ color: "hsl(0 60% 25%)" }}
          variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
        >
          Rajveer
        </motion.h2>

        <motion.div
          className="flex items-center gap-4"
          variants={{ hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1 } }}
        >
          <div className="h-px w-16" style={{ background: "hsl(43 72% 50%)" }} />
          <span className="font-decorative text-3xl" style={{ color: "hsl(43 72% 50%)" }}>&</span>
          <div className="h-px w-16" style={{ background: "hsl(43 72% 50%)" }} />
        </motion.div>

        <motion.h2
          className="font-display text-5xl md:text-7xl font-bold"
          style={{ color: "hsl(0 60% 25%)" }}
          variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
        >
          Ishita
        </motion.h2>

        <motion.div
          className="mt-4 space-y-1"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          <p className="font-decorative text-2xl" style={{ color: "hsl(43 72% 45%)" }}>12th December 2026</p>
          <p className="font-body text-sm" style={{ color: "hsl(0 25% 45%)" }}>The Grand Palace, Jaipur</p>
        </motion.div>

        <motion.div
          className="mt-6"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          <GoldButton onClick={onNext}>View Events</GoldButton>
        </motion.div>
      </motion.div>

      {/* Soft vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 50%, hsl(0 40% 85% / 0.5) 100%)" }}
      />
    </div>
  );
};

export default SceneHero;
