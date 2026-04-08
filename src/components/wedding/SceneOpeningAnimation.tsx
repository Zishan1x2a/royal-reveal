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
      width: 2 + Math.random() * 4,
      height: 2 + Math.random() * 4,
      // Mix of Gold (#D4AF37) and Maroon (#7A1E2C)
      background: Math.random() > 0.5 
        ? "linear-gradient(135deg, #FFD700, #D4AF37)" 
        : "linear-gradient(135deg, #7A1E2C, #4A0E17)",
      left: "50%",
      top: "50%",
      boxShadow: Math.random() > 0.5 
        ? "0 0 10px rgba(212, 175, 55, 0.8)" 
        : "0 0 10px rgba(122, 30, 44, 0.8)"
    }}
    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
    animate={{
      opacity: [0, 1, 1, 0],
      scale: [0, 1.5, 1, 0],
      x: x * (150 + Math.random() * 300),
      y: y * (150 + Math.random() * 300),
    }}
    transition={{ duration: 2.5 + Math.random() * 1, delay: delay, ease: "easeOut" }}
  />
);

const SceneOpeningAnimation = ({ onComplete }: Props) => {
  const [phase, setPhase] = useState<"dark" | "spark" | "burst" | "mandala" | "zoom" | "done">("dark");

  useEffect(() => {
    // Cinematic Timeline
    const t1 = setTimeout(() => setPhase("spark"), 500);
    const t2 = setTimeout(() => setPhase("burst"), 1200);   // Spark explodes
    const t3 = setTimeout(() => setPhase("mandala"), 1800); // Mandalas fade in spinning
    const t4 = setTimeout(() => setPhase("zoom"), 4800);    // Massive zoom-through effect
    const t5 = setTimeout(() => setPhase("done"), 5800);    // Complete sequence
    const t6 = setTimeout(onComplete, 6200);                // Unmount component

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [onComplete]);

  // Generate intricate particles
  const particles = Array.from({ length: 80 }, (_, i) => {
    const angle = (i / 80) * Math.PI * 2;
    return { id: i, delay: Math.random() * 0.5, x: Math.cos(angle), y: Math.sin(angle) };
  });

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
          style={{ background: "radial-gradient(circle at center, #4A0E17, #1A050A)" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Phase: Spark - An initial point of light building up magic */}
          <AnimatePresence>
            {(phase === "spark" || phase === "burst") && (
              <motion.div
                className="absolute rounded-full flex items-center justify-center"
                style={{
                  width: 4,
                  height: 4,
                  background: "#FFF6E8",
                  boxShadow: "0 0 25px 12px #D4AF37, 0 0 60px 25px rgba(212, 175, 55, 0.4)",
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: phase === "burst" ? 20 : 1, opacity: phase === "burst" ? 0 : 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: phase === "burst" ? 0.6 : 0.7, ease: "easeInOut" }}
              />
            )}
          </AnimatePresence>

          {/* Phase: Burst - Explosion of particles as the magic releases */}
          {(phase === "burst" || phase === "mandala" || phase === "zoom") &&
            particles.map((p) => <Particle key={p.id} {...p} delay={phase === "burst" ? p.delay : 0} />)}

          {/* Phase: Mandala - High-end spinning geometric array */}
          <AnimatePresence>
            {(phase === "mandala" || phase === "zoom") && (
              <motion.div
                className="absolute flex items-center justify-center"
                initial={{ scale: 0.7, opacity: 0, rotate: -30 }}
                animate={{
                  scale: phase === "zoom" ? 30 : 1, // Massive scale for zoom-through
                  opacity: phase === "zoom" ? 0 : 1,
                  rotate: phase === "zoom" ? 20 : 0
                }}
                transition={{
                  scale: { duration: phase === "zoom" ? 1.2 : 2.5, ease: phase === "zoom" ? [0.6, 0.05, 0.01, 0.99] : "easeOut" },
                  opacity: { duration: phase === "zoom" ? 0.8 : 1.5, delay: phase === "zoom" ? 0.3 : 0 },
                  rotate: { duration: phase === "zoom" ? 1.2 : 2.5, ease: "easeOut" }
                }}
              >
                {/* Background immense glow behind mandala */}
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    width: 700,
                    height: 700,
                    background: "radial-gradient(circle, rgba(212, 175, 55, 0.25) 0%, transparent 65%)",
                  }}
                  animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.6, 0.9, 0.6] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Layer 1: Outer Slow Mandala */}
                <motion.img
                  src={mandalaImg}
                  alt=""
                  className="absolute"
                  style={{
                    width: 600,
                    height: 600,
                    opacity: 0.25,
                    filter: "drop-shadow(0 0 15px hsl(43 80% 50%)) sepia(0.5) hue-rotate(5deg)",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                />

                {/* Layer 2: Mid Reverse Mandala */}
                <motion.img
                  src={mandalaImg}
                  alt=""
                  className="absolute"
                  style={{
                    width: 420,
                    height: 420,
                    opacity: 0.5,
                    filter: "drop-shadow(0 0 25px hsl(43 90% 60%))",
                  }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                />

                {/* Layer 3: Inner Fast Mandala */}
                <motion.img
                  src={mandalaImg}
                  alt=""
                  className="absolute"
                  style={{
                    width: 250,
                    height: 250,
                    opacity: 0.9,
                    filter: "drop-shadow(0 0 40px hsl(43 100% 70%)) contrast(1.3) brightness(1.2)",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />

                {/* Layer 4: Core Intense Glow Mandala */}
                <motion.img
                  src={mandalaImg}
                  alt=""
                  className="absolute"
                  style={{
                    width: 120,
                    height: 120,
                    opacity: 1,
                    filter: "drop-shadow(0 0 50px #fff) brightness(2) contrast(1.5)",
                    mixBlendMode: "screen",
                  }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />

                {/* Central shining star/diamond */}
                <motion.div
                  className="absolute bg-white"
                  style={{
                    width: 3,
                    height: 100,
                    boxShadow: "0 0 20px 5px hsl(43 100% 75%)",
                    borderRadius: "50%",
                  }}
                  animate={{ rotate: 180, scale: [0.8, 1.4, 0.8], opacity: [0.5, 1, 0.5] }}
                  transition={{ rotate: { duration: 5, repeat: Infinity, ease: "linear" }, scale: { duration: 2.5, repeat: Infinity }, opacity: { duration: 2.5, repeat: Infinity } }}
                />
                <motion.div
                  className="absolute bg-white"
                  style={{
                    height: 3,
                    width: 100,
                    boxShadow: "0 0 20px 5px hsl(43 100% 75%)",
                    borderRadius: "50%",
                  }}
                  animate={{ rotate: 180, scale: [0.8, 1.4, 0.8], opacity: [0.5, 1, 0.5] }}
                  transition={{ rotate: { duration: 5, repeat: Infinity, ease: "linear" }, scale: { duration: 2.5, repeat: Infinity }, opacity: { duration: 2.5, repeat: Infinity } }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SceneOpeningAnimation;
