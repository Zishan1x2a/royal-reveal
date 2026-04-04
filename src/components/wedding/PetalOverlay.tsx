import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  type: 'heart' | 'leaf' | 'petal' | 'gold_leaf';
  rotationStart: number;
  rotationEnd: number;
}

const PetalOverlay = ({ count = 40 }: { count?: number }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const types: ('heart' | 'leaf' | 'petal' | 'gold_leaf')[] = ['heart', 'heart', 'leaf', 'gold_leaf', 'petal'];
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 5 + Math.random() * 5,
        size: 15 + Math.random() * 15,
        type: types[Math.floor(Math.random() * types.length)],
        rotationStart: Math.random() * 360,
        rotationEnd: Math.random() * 720 * (Math.random() > 0.5 ? 1 : -1)
      }))
    );
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute top-[-50px]"
          initial={{ y: -50, x: 0, rotate: p.rotationStart, opacity: 0 }}
          animate={{ 
            y: "130vh", 
            x: Math.sin(p.id) * 80, // Swaying effect 
            rotate: p.rotationEnd,
            opacity: [0, 1, 1, 1, 1, 1, 1, 1, 1, 0] 
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {p.type === 'heart' && (
            <svg viewBox="0 0 32 29.6" className="w-full h-full fill-[#E91E63] drop-shadow-[0_2px_8px_rgba(233,30,99,0.6)]">
              <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z" />
            </svg>
          )}
          {p.type === 'leaf' && (
            <svg viewBox="0 0 24 24" className="w-full h-full fill-[#4CAF50] drop-shadow-[0_2px_6px_rgba(76,175,80,0.5)]">
              <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
            </svg>
          )}
          {p.type === 'gold_leaf' && (
            <svg viewBox="0 0 24 24" className="w-full h-[80%] fill-[#D4AF37] drop-shadow-[0_2px_8px_rgba(212,175,55,0.7)]">
               <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
            </svg>
          )}
          {p.type === 'petal' && (
            <div 
              className="w-[80%] h-[50%] rounded-full shadow-[0_2px_4px_rgba(255,100,150,0.5)]" 
              style={{ background: `radial-gradient(ellipse, hsl(350 80% 75%), hsl(340 60% 60%))` }} 
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default PetalOverlay;
