import { motion } from "framer-motion";
import { useMemo } from "react";

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
      y: [0, -1200],
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

interface SectionBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const SectionBackground = ({ children, className = "" }: SectionBackgroundProps) => {
  const stars = useMemo(
    () => Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1.5 + Math.random() * 3,
      delay: Math.random() * 5,
    })),
    []
  );

  const bubbles = useMemo(
    () => Array.from({ length: 12 }, (_, i) => ({
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
      className={`relative overflow-hidden ${className}`}
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

      {/* Soft vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 50%, hsl(0 40% 85% / 0.5) 100%)" }}
      />

      {children}
    </div>
  );
};

export default SectionBackground;
