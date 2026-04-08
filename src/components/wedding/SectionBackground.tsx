import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";
import mandalaImg from "@/assets/mandala.png";

/* Subtle drifting golden dust motes */
const DustMote = ({ delay, x, y, size, duration }: { delay: number; x: number; y: number; size: number; duration: number }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none z-0"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: size,
      height: size,
      background: "radial-gradient(circle, rgba(212,175,55,0.4), transparent)",
      boxShadow: "0 0 8px rgba(212,175,55,0.2)"
    }}
    animate={{
      y: [0, -100, 0],
      x: [0, 50, 0],
      opacity: [0, 0.4, 0],
      scale: [0.5, 1.2, 0.5]
    }}
    transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

/* Slow-drifting background mandala */
const BackgroundMandala = ({ x, y, size, rotate, delay }: { x: number; y: number; size: string | number; rotate: number; delay: number }) => (
  <motion.img
    src={mandalaImg}
    alt=""
    className="absolute pointer-events-none z-0 opacity-[0.12] select-none will-change-transform"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: size,
      height: size,
      filter: "invert(1) brightness(1.5) drop-shadow(0 0 15px rgba(212,175,55,0.3))" 
    }}
    animate={{ 
      rotate: [0, rotate],
      scale: [0.95, 1.05, 0.95],
      opacity: [0.08, 0.18, 0.08]
    }}
    transition={{ 
      rotate: { duration: 60 + delay * 10, repeat: Infinity, ease: "linear" },
      scale: { duration: 10 + delay, repeat: Infinity, ease: "easeInOut" },
      opacity: { duration: 8 + delay, repeat: Infinity, ease: "easeInOut" }
    }}
  />
);

interface SectionBackgroundProps {
  children: React.ReactNode;
  className?: string;
  simple?: boolean;
}

const SectionBackground = ({ children, className = "", simple = false }: SectionBackgroundProps) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const mandalas = useMemo(() => [
    { x: -10, y: -10, size: "60vmin", rotate: 360, delay: 1 },
    { x: 70, y: 40, size: "80vmin", rotate: -360, delay: 5 },
    { x: 20, y: 70, size: "50vmin", rotate: 360, delay: 10 },
  ], []);

  const dust = useMemo(() => Array.from({ length: 10 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 3,
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 10
  })), []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-x-hidden ${className}`}
      style={{ background: "#FFF5F7" }}
    >
      {/* Liquid Aura / Mesh Gradient effect */}
      {!simple && (
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-multiply"
          style={{
            background: "radial-gradient(circle at 30% 30%, rgba(212,175,55,0.08) 0%, transparent 60%)"
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            x: ["-5%", "5%", "0%"],
            y: ["-3%", "3%", "0%"]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      {!simple && (
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none opacity-30 mix-blend-multiply"
          style={{
            background: "radial-gradient(circle at 70% 70%, rgba(138,26,55,0.05) 0%, transparent 60%)"
          }}
          animate={{ 
            scale: [1, 1.3, 1],
            x: ["5%", "-5%", "0%"],
            y: ["3%", "-3%", "0%"]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      )}

      {/* Floating Mandalas */}
      {!simple && mandalas.map((m, idx) => (
        <BackgroundMandala key={idx} {...m} />
      ))}

      {/* Parallax Container for Content and Dust */}
      <motion.div 
        className="relative z-10 w-full h-fit flex flex-col items-center"
      >
        {/* Dust Motes */}
        {!simple && dust.map(d => <DustMote key={d.id} {...d} />)}
        
        {children}
      </motion.div>

      {/* Soft Decorative Vignette */}
      {!simple && (
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{ background: "radial-gradient(ellipse at center, transparent 60%, rgba(138, 26, 55, 0.03) 100%)" }}
        />
      )}
    </div>
  );
};

export default SectionBackground;
