import { motion, Variants } from "framer-motion";
import { useMemo } from "react";
import ganeshImg from "@/assets/ganesh.png";
import floralCorner from "@/assets/floral-corner.png";

interface Props {
  onNext: () => void;
  guestName?: string;
  onGuestNameChange?: (name: string) => void;
}

/* Float Sparkles (Pinkish to match the rose theme) */
const Sparkle = ({ delay, x, y, size, dur }: { delay: number; x: number; y: number; size: number; dur: number }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none z-10"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: size,
      height: size,
      background: `radial-gradient(circle, hsl(340 85% 85% / 0.9), transparent)`,
      boxShadow: `0 0 ${size * 2}px hsl(340 85% 80% / 0.6)`,
    }}
    animate={{ opacity: [0, 1, 0.4, 1, 0], scale: [0.5, 1.2, 0.8, 1.4, 0.5], filter: ["blur(1px)", "blur(0px)", "blur(1px)"] }}
    transition={{ duration: dur, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

/* Floating Bubbles */
const Bubble = ({ delay, x, size, dur }: { delay: number; x: number; size: number; dur: number }) => (
  <motion.div
    className="absolute bottom-0 rounded-full z-10 pointer-events-none"
    style={{ 
      left: `${x}%`, width: size, height: size, 
      border: "1px solid rgba(255, 182, 193, 0.5)", 
      background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(255, 192, 203, 0.1) 60%)",
      boxShadow: "inset 0 0 8px rgba(255, 105, 180, 0.2)"
    }}
    initial={{ y: "10vh", opacity: 0 }}
    animate={{ y: "-110vh", opacity: [0, 0.8, 0.8, 0], x: [0, Math.random() * 30 - 15, 0] }}
    transition={{ duration: dur, delay, repeat: Infinity, ease: "linear" }}
  />
);

/* Twinkling Stars */
const Star = ({ delay, x, y, size }: { delay: number; x: number; y: number; size: number }) => (
  <motion.div
    className="absolute pointer-events-none z-10 text-[hsl(340,70%,60%)] drop-shadow-[0_0_5px_rgba(255,182,193,0.8)]"
    style={{ left: `${x}%`, top: `${y}%`, fontSize: size }}
    animate={{ opacity: [0.1, 0.9, 0.1], scale: [0.8, 1.3, 0.8], rotate: [0, 15, 0] }}
    transition={{ duration: 2 + Math.random() * 2, delay, repeat: Infinity, ease: "easeInOut" }}
  >
    ✨
  </motion.div>
);

/* Fixed Screen-level Majestic Corners */
const RoyalCorner = ({ position, delay }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right"; delay: number }) => {
  const rot = { "top-left": 0, "top-right": 90, "bottom-right": 180, "bottom-left": 270 }[position];
  
  // Anchored elegantly out slightly so they hug the viewport naturally
  const posClass = {
    "top-left": "-top-4 -left-4 md:-top-8 md:-left-8",
    "top-right": "-top-4 -right-4 md:-top-8 md:-right-8",
    "bottom-left": "-bottom-4 -left-4 md:-bottom-8 md:-left-8",
    "bottom-right": "-bottom-4 -right-4 md:-bottom-8 md:-right-8",
  }[position];

  // Slide entrance parameters
  const slideFrom = {
    "top-left": { x: -80, y: -80 },
    "top-right": { x: 80, y: -80 },
    "bottom-left": { x: -80, y: 80 },
    "bottom-right": { x: 80, y: 80 },
  }[position];

  return (
    <motion.div
      className={`absolute ${posClass} w-24 h-24 md:w-36 md:h-36 z-40 pointer-events-none`}
      initial={{ scale: 0.3, opacity: 0, x: slideFrom.x, y: slideFrom.y, rotate: rot }}
      animate={{ scale: 1, opacity: 1, x: 0, y: 0, rotate: rot }}
      transition={{ 
        duration: 2.5, ease: "easeOut", delay, type: "spring", stiffness: 50, damping: 15
      }}
    >
      <motion.div 
        className="absolute inset-0 blur-2xl rounded-full"
        style={{ background: "radial-gradient(ellipse at center, rgba(212,175,55,0.4) 0%, transparent 60%)" }}
        animate={{ opacity: [0.5, 0.8, 0.5], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
      />
      
      <motion.img 
        src={floralCorner} 
        alt="Ornamental Corner" 
        className="w-full h-full object-contain relative z-10"
        style={{ filter: "drop-shadow(0 4px 8px rgba(122,30,44,0.3)) drop-shadow(0 0 10px rgba(212,175,55,0.2))" }}
        animate={{ scale: [1, 1.02, 1], filter: ["drop-shadow(0 4px 8px rgba(122,30,44,0.3)) drop-shadow(0 0 5px rgba(212,175,55,0.2))", "drop-shadow(0 4px 8px rgba(122,30,44,0.3)) drop-shadow(0 0 15px rgba(212,175,55,0.5))", "drop-shadow(0 4px 8px rgba(122,30,44,0.3)) drop-shadow(0 0 5px rgba(212,175,55,0.2))"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
      />
      
      {/* High Animation Sparkles */}
      {[...Array(4)].map((_, i) => (
        <motion.div key={i} className="absolute left-1/3 top-1/3 w-2 h-2 rounded-full z-20"
          style={{ background: "#FFF", boxShadow: "0 0 10px #D4AF37, 0 0 20px #D4AF37" }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0], 
            scale: [0, Math.random() * 1.5 + 1, 0], 
            x: [0, (Math.random() - 0.5) * 100], 
            y: [0, (Math.random() - 0.5) * 100] 
          }}
          transition={{ duration: 2.5 + Math.random(), delay: delay + i * 0.5, repeat: Infinity }}
        />
      ))}
    </motion.div>
  );
};

/* Divine Radial Halo */
const DivineHalo = () => (
  <motion.div
    className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
    animate={{ rotate: 360 }}
    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
  >
    <svg viewBox="0 0 300 300" className="w-[180px] h-[180px] md:w-[240px] md:h-[240px] opacity-40">
      {[...Array(24)].map((_, i) => {
        const angle = (i * 15 * Math.PI) / 180;
        return (
          <motion.line
            key={i}
            x1="150" y1="150"
            x2={150 + 100 * Math.cos(angle)} y2={150 + 100 * Math.sin(angle)}
            stroke="#D4AF37"
            strokeWidth={i % 2 === 0 ? "2" : "1"}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, delay: i * 0.1, repeat: Infinity }}
          />
        );
      })}
      <circle cx="150" cy="150" r="80" fill="radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 100%)" />
    </svg>
  </motion.div>
);

const SceneWelcome = ({ onNext }: Props) => {
  const sparkles = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100, size: 2 + Math.random() * 4, delay: Math.random() * 5, dur: 4 + Math.random() * 3
  })), []);
  const bubbles = useMemo(() => Array.from({ length: 15 }, (_, i) => ({
    id: i, x: Math.random() * 100, size: 10 + Math.random() * 25, delay: Math.random() * 10, dur: 8 + Math.random() * 10
  })), []);
  const stars = useMemo(() => Array.from({ length: 15 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100, size: 12 + Math.random() * 12, delay: Math.random() * 5
  })), []);
  
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } },
  };

  const coupleNameReveal: Variants = {
    hidden: { clipPath: "inset(0 100% 0 0)" },
    visible: { clipPath: "inset(0 0% 0 0)", transition: { duration: 1.5, ease: "anticipate", delay: 1 } }
  };

  return (
    <div className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-[#FFF0F5]">
      
      {/* 8) Slightly Darker Pink Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden" 
           style={{ background: "linear-gradient(135deg, hsl(340, 90%, 90%), hsl(340, 75%, 83%))" }}>
        {/* Soft glowing orbs moving slightly in the background */}
        <motion.div
          className="absolute -top-1/4 -right-1/4 w-full h-full rounded-full blur-[100px] pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(340, 85%, 82%), transparent 70%)" }}
          animate={{ x: ["0%", "-10%", "0%"], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-1/4 -left-1/4 w-full h-full rounded-full blur-[100px] pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(340, 85%, 78%), transparent 70%)" }}
          animate={{ x: ["0%", "10%", "0%"], scale: [1, 1.15, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Screen-Bound Majestic Corners */}
      <RoyalCorner position="top-left" delay={0.2} />
      <RoyalCorner position="top-right" delay={0.4} />
      <RoyalCorner position="bottom-right" delay={0.6} />
      <RoyalCorner position="bottom-left" delay={0.8} />

      {/* Sparkles, Bubbles, and Stars Environment */}
      {sparkles.map((s) => <Sparkle key={`sp-${s.id}`} {...s} />)}
      {bubbles.map((b) => <Bubble key={`bu-${b.id}`} {...b} />)}
      {stars.map((s) => <Star key={`st-${s.id}`} {...s} />)}

      {/* Elegant SVG Frame (Sits entirely inside the corners) */}
      <div className="absolute inset-4 md:inset-6 z-20 pointer-events-none">
        <svg width="100%" height="100%" className="absolute inset-0" style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id="royal-frame" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.8" />
              <stop offset="25%" stopColor="#F9D976" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.9" />
              <stop offset="75%" stopColor="#F9D976" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.8" />
            </linearGradient>
            <filter id="glow-frame" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Core frame path drawing in */}
          <motion.rect 
            x="2" y="2" width="calc(100% - 4px)" height="calc(100% - 4px)" 
            fill="none" stroke="url(#royal-frame)" strokeWidth="1" rx="16"
            initial={{ pathLength: 0, opacity: 0 }} 
            animate={{ pathLength: 1, opacity: 0.6 }} 
            transition={{ duration: 3, ease: "easeInOut" }}
          />

          {/* Inner majestic frame line */}
          <motion.rect 
            x="10" y="10" width="calc(100% - 20px)" height="calc(100% - 20px)" 
            fill="none" stroke="url(#royal-frame)" strokeWidth="0.5" rx="10"
            initial={{ pathLength: 0, opacity: 0 }} 
            animate={{ pathLength: 1, opacity: 0.4 }} 
            transition={{ duration: 3, delay: 1, ease: "easeInOut" }}
          />

          {/* Chasing Light Beam around the border */}
          <motion.rect 
            x="0" y="0" width="100%" height="100%" 
            fill="none" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="30 2000" rx="18"
            style={{ filter: "url(#glow-frame)" }}
            animate={{ strokeDashoffset: [2030, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>

      {/* Main Content Group */}
      <motion.div
        className="relative z-30 flex flex-col items-center w-full max-w-3xl px-4 mt-8"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        {/* "शुभ विवाह" Heading */}
        <motion.div className="mb-4" variants={fadeUp}>
          <motion.h2 
            className="font-decorative text-2xl md:text-3xl tracking-[0.2em]" 
            style={{ 
              color: "#D4AF37",
              textShadow: "1px 1px 0px rgba(122,30,44,0.5), 0 4px 15px rgba(212,175,55,0.6)",
              WebkitTextStroke: "0.5px rgba(122,30,44,0.2)"
            }}
            animate={{ textShadow: ["1px 1px 0px rgba(122,30,44,0.5), 0 4px 15px rgba(212,175,55,0.4)", "1px 1px 0px rgba(122,30,44,0.5), 0 4px 25px rgba(212,175,55,0.8)", "1px 1px 0px rgba(122,30,44,0.5), 0 4px 15px rgba(212,175,55,0.4)"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            शुभ विवाह
          </motion.h2>
        </motion.div>

        {/* Ganesh Image (Divine Centerpiece) */}
        <motion.div 
          className="relative flex items-center justify-center my-2"
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        >
          <DivineHalo />
          <motion.img
            src={ganeshImg}
            alt="Lord Ganesha"
            className="w-24 h-24 md:w-32 md:h-32 object-contain relative z-10 drop-shadow-[0_10px_20px_rgba(212,175,55,0.5)]"
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Welcome Mantra */}
        <motion.p className="font-decorative text-[10px] md:text-xs tracking-wider text-[#7A1E2C]/80 mt-4 mb-2 text-center" variants={fadeUp}>
          वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।<br/>निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
        </motion.p>
        
        {/* Preview Guest Capsule */}
        <motion.div className="my-6" variants={fadeUp}>
          <motion.div 
            className="relative px-8 py-2.5 rounded-full overflow-hidden border border-[#D4AF37]/50 shadow-[0_4px_15px_rgba(122,30,44,0.1)]"
            style={{ backdropFilter: "blur(8px)", background: "rgba(255, 255, 255, 0.5)" }}
            whileHover={{ y: -2 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent"
              animate={{ x: ["-200%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            <span className="relative z-10 font-body text-xs md:text-sm uppercase tracking-[0.25em] font-medium text-[#7A1E2C]">
              Preview Guest
            </span>
          </motion.div>
        </motion.div>

        <motion.p className="font-body text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#7A1E2C]/70 mb-2 text-center" variants={fadeUp}>
          You are cordially invited to the wedding of
        </motion.p>

        {/* Couple Name Section */}
        <motion.div className="flex flex-col items-center" variants={fadeUp}>
          <motion.h1 
            className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-[#7A1E2C] drop-shadow-md text-center leading-tight"
            variants={coupleNameReveal}
          >
            Rajveer <span className="font-decorative italic text-4xl md:text-5xl text-[#D4AF37] mx-2">&</span> Ishita
          </motion.h1>
          
          <motion.div 
            className="relative mt-4 mb-6 w-32 h-[2px] rounded-full overflow-hidden"
            style={{ background: "rgba(212,175,55,0.2)" }}
            variants={fadeUp}
          >
            <motion.div 
              className="absolute inset-y-0 left-0 bg-[#D4AF37]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 1.8, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>

        <motion.p className="font-decorative text-sm md:text-base italic tracking-wider text-[#A97C25] mb-8" variants={fadeUp}>
          12 December 2026
        </motion.p>

        {/* View Invitation Button */}
        <motion.div variants={fadeUp}>
          <motion.button
            onClick={onNext}
            className="relative group px-10 py-3.5 md:py-4 rounded-full overflow-hidden shadow-[0_8px_20px_rgba(122,30,44,0.15)] focus:outline-none"
            style={{ background: "linear-gradient(135deg, #D4AF37 0%, #A97C25 100%)", border: "1px solid #FFF6E8" }}
            whileHover={{ scale: 1.04, boxShadow: "0 12px 30px rgba(212,175,55,0.4)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: "linear-gradient(135deg, #F9D976 0%, #D4AF37 100%)" }}
            />
            <motion.div className="absolute top-0 left-0 w-full h-[1px] bg-white opacity-50" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFF6E8]/40 to-transparent skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out"
            />
            <span className="relative z-10 font-decorative text-xs md:text-sm tracking-[0.2em] font-bold text-[#FFF6E8] uppercase drop-shadow-md">
              View Invitation
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SceneWelcome;
