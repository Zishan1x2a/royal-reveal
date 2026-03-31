import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import mandalaImg from "@/assets/mandala.png";

interface Props {
  onComplete: () => void;
}

const Particle = ({ delay, x, y }: { delay: number; x: number; y: number }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: 3 + Math.random() * 4,
      height: 3 + Math.random() * 4,
      background: `hsl(${40 + Math.random() * 15} ${60 + Math.random() * 20}% ${55 + Math.random() * 20}%)`,
      left: "50%",
      top: "50%",
    }}
    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
    animate={{
      opacity: [0, 1, 1, 0],
      scale: [0, 1.5, 1, 0],
      x: x * (100 + Math.random() * 150),
      y: y * (100 + Math.random() * 150),
    }}
    transition={{ duration: 2, delay: 1 + delay, ease: "easeOut" }}
  />
);

const SceneOpeningAnimation = ({ onComplete }: Props) => {
  const [phase, setPhase] = useState<"dark" | "burst" | "mandala" | "done">("dark");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("burst"), 800);
    const t2 = setTimeout(() => setPhase("mandala"), 2000);
    const t3 = setTimeout(() => setPhase("done"), 3500);
    const t4 = setTimeout(onComplete, 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  const particles = Array.from({ length: 40 }, (_, i) => {
    const angle = (i / 40) * Math.PI * 2;
    return { id: i, delay: Math.random() * 0.5, x: Math.cos(angle), y: Math.sin(angle) };
  });

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
          style={{ background: "hsl(0 20% 5%)" }}
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
        >
          {/* Cosmic fire orb */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 20,
              height: 20,
              background: "radial-gradient(circle, hsl(43 90% 70%), hsl(43 80% 50%), hsl(0 60% 30%))",
              boxShadow: "0 0 60px hsl(43 72% 55%), 0 0 120px hsl(43 72% 55% / 0.5)",
            }}
            animate={
              phase === "burst" || phase === "mandala"
                ? { scale: [1, 8, 30], opacity: [1, 1, 0] }
                : { scale: [0.8, 1.2, 0.8], opacity: 1 }
            }
            transition={
              phase === "burst" || phase === "mandala"
                ? { duration: 1.5, ease: "easeOut" }
                : { duration: 2, repeat: Infinity }
            }
          />

          {/* Particles */}
          {(phase === "burst" || phase === "mandala") &&
            particles.map((p) => <Particle key={p.id} {...p} />)}

          {/* Mandala reveal */}
          {phase === "mandala" && (
            <motion.img
              src={mandalaImg}
              alt=""
              className="absolute"
              style={{ width: 300, height: 300, filter: "drop-shadow(0 0 40px hsl(43 72% 55% / 0.6))" }}
              initial={{ scale: 0, opacity: 0, rotate: -180 }}
              animate={{ scale: 1, opacity: 0.8, rotate: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            />
          )}

          {/* Golden radial glow */}
          {(phase === "burst" || phase === "mandala") && (
            <motion.div
              className="absolute"
              style={{
                width: "100vmax",
                height: "100vmax",
                background: "radial-gradient(circle, hsl(43 72% 55% / 0.15) 0%, transparent 60%)",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SceneOpeningAnimation;
