import { motion } from "framer-motion";
import { useMemo } from "react";
import GoldButton from "./GoldButton";
import SectionBackground from "./SectionBackground";
import PremiumHeading from "./PremiumHeading";
import mandalaImg from "@/assets/mandala.png";
import candidImg from "@/assets/gallery/candid.jpg";

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

/* Premium High-Animated Couple Image Component */
const CoupleImage = () => {
  return (
    <motion.div
      className="relative flex items-center justify-center mt-28 md:mt-12 mb-4 md:mb-4"
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 2.5, type: "spring", bounce: 0.6, damping: 12 }}
      style={{ perspective: 1000 }}
    >
      {/* Deep glowing pulsed ring - much more dramatic */}
      <motion.div
        className="absolute w-72 h-72 md:w-72 md:h-72 rounded-full mix-blend-screen pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(43 72% 55% / 0.8) 0%, hsl(340 60% 60% / 0.4) 40%, transparent 70%)" }}
        animate={{ scale: [0.8, 1.5, 0.8], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Repeating bursting rings */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`burst-${i}`}
          className="absolute w-44 h-44 md:w-44 md:h-44 rounded-full border-2 pointer-events-none"
          style={{ borderColor: "hsl(43 72% 65%)" }}
          animate={{ scale: [1, 2.8], opacity: [0.8, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 1.3, ease: "easeOut" }}
        />
      ))}

      {/* Rotating majestic dashed border with 3D spin */}
      <motion.div
        className="absolute w-52 h-52 md:w-52 md:h-52 rounded-full border-4 border-dashed pointer-events-none"
        style={{ borderColor: "hsl(43 72% 50%)", borderStyle: "double" }}
        animate={{ rotate: 360, rotateX: [0, 20, 0, -20, 0], rotateY: [0, 20, 0, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      {/* Counter-rotating double solid ring */}
      <motion.svg className="absolute w-60 h-60 md:w-60 md:h-60 pointer-events-none" viewBox="0 0 100 100" animate={{ rotate: -360, scale: [0.95, 1.05, 0.95] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
        <defs>
          <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(43 72% 55%)" />
            <stop offset="25%" stopColor="hsl(0 60% 50%)" />
            <stop offset="50%" stopColor="transparent" />
            <stop offset="75%" stopColor="hsl(0 60% 50%)" />
            <stop offset="100%" stopColor="hsl(43 72% 65%)" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="49" fill="none" stroke="url(#ring-grad)" strokeWidth="0.8" />
        <circle cx="50" cy="50" r="46" fill="none" stroke="url(#ring-grad)" strokeWidth="0.3" opacity="0.8" />
      </motion.svg>

      {/* Floating orbital celestial dots with heavy glow */}
      <motion.div 
        className="absolute w-full h-full flex justify-center items-center pointer-events-none" 
        animate={{ rotate: 360 }} 
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full"
            style={{
               width: 8, height: 8, background: "hsl(43 72% 70%)", boxShadow: "0 0 20px 6px hsl(43 72% 55%)",
               transform: `rotate(${i * 72}deg) translateY(-145px)`
            }}
            animate={{ scale: [1, 2.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </motion.div>

      {/* Center Image Container - Dramatic 3D Breathe & Flip effect */}
      <motion.div
        className="relative w-44 h-44 md:w-44 md:h-44 rounded-full overflow-hidden border-[5px] cursor-pointer"
        style={{ borderColor: "hsl(43 72% 55%)", zIndex: 10, transformStyle: "preserve-3d" }}
        animate={{ 
           y: [-15, 15, -15],
           rotateX: [0, 15, -5, 0],
           rotateY: [0, -15, 10, 0],
           boxShadow: ["0 20px 50px hsl(0 60% 20% / 0.5), inset 0 0 20px hsl(0 0% 0% / 0.5)", "0 30px 70px hsl(43 72% 50% / 0.6), inset 0 0 50px hsl(0 0% 0% / 0.8)", "0 20px 50px hsl(0 60% 20% / 0.5), inset 0 0 20px hsl(0 0% 0% / 0.5)"]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.15, rotateZ: 5, boxShadow: "0 40px 80px hsl(43 72% 50% / 0.8)", transition: { duration: 0.4 } }}
        whileTap={{ scale: 0.9, rotateZ: -5, transition: { duration: 0.1 } }}
      >
        <motion.img
          src={candidImg}
          alt="The Couple"
          className="w-full h-full object-cover origin-center"
          animate={{ scale: [1.05, 1.25, 1.05], filter: ["contrast(1)", "contrast(1.15)", "contrast(1)"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Cinematic heavy pulsing inner shadow/glow */}
        <motion.div 
           className="absolute inset-0 z-20 pointer-events-none rounded-full" 
           style={{ background: "radial-gradient(circle, transparent 40%, rgba(70,10,20,0.9) 100%)" }}
           animate={{ opacity: [0.4, 0.9, 0.4] }}
           transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
};

const SceneHero = ({ onNext }: Props) => {
  return (
    <SectionBackground className="flex h-screen flex-col items-center justify-center px-6 py-6 text-center overflow-hidden">
      <motion.div
        className="relative z-10 flex flex-col items-center gap-1 md:gap-2 max-w-lg"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        <motion.p
          className="font-body text-xs uppercase tracking-[0.4em] -mt-6 md:-mt-8"
          style={{ color: "hsl(0 30% 40%)" }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        >
          Together with their families
        </motion.p>

        {/* The Animated Couple Circle Image */}
        <CoupleImage />

        <div className="mt-20 md:mt-8 flex flex-col items-center">
          <PremiumHeading 
            text="Rajveer"
            fontSize="text-5xl md:text-6xl"
            delay={0.5}
          />
        </div>
        
        <motion.div
          className="flex items-center gap-4 my-[-4px] md:my-[-6px]"
          variants={{ hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1 } }}
        >
          <div className="h-px w-16 md:w-16" style={{ background: "hsl(43 72% 50%)" }} />
          <span className="font-decorative text-4xl md:text-5xl" style={{ color: "hsl(43 72% 50%)" }}>&</span>
          <div className="h-px w-16 md:w-16" style={{ background: "hsl(43 72% 50%)" }} />
        </motion.div>

        <PremiumHeading 
          text="Ishita"
          fontSize="text-5xl md:text-6xl"
          delay={1}
          className="mt-[-4px] md:mt-[-8px]"
        />

        <motion.div
          className="mt-1 md:mt-2 space-y-0.5 md:space-y-1"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          <p className="font-decorative text-xl md:text-lg" style={{ color: "hsl(43 72% 45%)" }}>12th December 2026</p>
          <p className="font-body text-xs md:text-sm" style={{ color: "hsl(0 25% 45%)" }}>The Grand Palace, Jaipur</p>
        </motion.div>

        <motion.div
          className="mt-6 md:mt-4"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          <GoldButton onClick={onNext}>View Events</GoldButton>
        </motion.div>
      </motion.div>
    </SectionBackground>
  );
};

export default SceneHero;
