import { motion, Variants, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMemo, useState, useRef } from "react";
import GoldButton from "./GoldButton";
import PremiumHeading from "./PremiumHeading";

interface Props { onNext: () => void; }

const blocks = [
  {
    title: "Pre-Wedding",
    events: [
      { icon: "🌿", name: "Haldi Ceremony", date: "13th Dec, 10:00 AM", venue: "Family Residence", mapQuery: "Family+Residence+Jaipur" },
      { icon: "🌸", name: "Mehendi", date: "13th Dec, 4:00 PM", venue: "Family Residence", mapQuery: "Family+Residence+Jaipur" },
    ],
  },
  {
    title: "Wedding Day",
    events: [
      { icon: "💍", name: "Wedding Ceremony", date: "15th Dec, 7:00 PM", venue: "The Grand Palace, Jaipur", mapQuery: "The+Grand+Palace+Jaipur" },
      { icon: "🎊", name: "Varmala & Pheras", date: "15th Dec, 9:00 PM", venue: "The Grand Palace, Jaipur", mapQuery: "The+Grand+Palace+Jaipur" },
    ],
  },
  {
    title: "Post-Wedding",
    events: [
      { icon: "🎉", name: "Reception", date: "16th Dec, 7:00 PM", venue: "The Grand Palace, Jaipur", mapQuery: "The+Grand+Palace+Jaipur" },
      { icon: "🥂", name: "After Party", date: "16th Dec, 10:00 PM", venue: "The Grand Palace, Jaipur", mapQuery: "The+Grand+Palace+Jaipur" },
    ],
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

/* SVG Mandala Pattern Background */
const MandalaPattern = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
    {/* Center mandala */}
    <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      animate={{ rotate: 360 }} transition={{ duration: 120, repeat: Infinity, ease: "linear" }}>
      <svg width="800" height="800" viewBox="0 0 200 200" className="opacity-[0.06]">
        <defs>
          <linearGradient id="mandala-g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37"/>
            <stop offset="100%" stopColor="#A97C25"/>
          </linearGradient>
        </defs>
        <g transform="translate(100,100)" fill="none" stroke="url(#mandala-g)" strokeWidth="0.6">
          {Array.from({length:12}).map((_,i)=>(
            <g key={i} transform={`rotate(${i*30})`}>
              <path d="M0,-90 C25,-75 25,-50 0,-35 C-25,-50 -25,-75 0,-90Z"/>
              <path d="M0,-70 C15,-60 15,-45 0,-35 C-15,-45 -15,-60 0,-70Z"/>
              <path d="M0,-55 Q12,-45 0,-35 Q-12,-45 0,-55Z"/>
              <circle cx="0" cy="-80" r="3" fill="url(#mandala-g)" opacity="0.3"/>
              <circle cx="0" cy="-42" r="2" fill="url(#mandala-g)" opacity="0.2"/>
              <line x1="0" y1="-90" x2="0" y2="-95" strokeWidth="1"/>
            </g>
          ))}
          <circle r="30" strokeWidth="0.8"/>
          <circle r="25" strokeWidth="0.4" strokeDasharray="3 3"/>
          <circle r="20" strokeWidth="0.6"/>
          {Array.from({length:8}).map((_,i)=>(
            <g key={`inner-${i}`} transform={`rotate(${i*45})`}>
              <path d="M0,-20 Q8,-12 0,-5 Q-8,-12 0,-20Z"/>
            </g>
          ))}
        </g>
      </svg>
    </motion.div>
    {/* Top-right mandala */}
    <motion.div className="absolute -top-20 -right-20"
      animate={{ rotate: -360 }} transition={{ duration: 90, repeat: Infinity, ease: "linear" }}>
      <svg width="400" height="400" viewBox="0 0 200 200" className="opacity-[0.04]">
        <g transform="translate(100,100)" fill="none" stroke="#D4AF37" strokeWidth="0.5">
          {Array.from({length:16}).map((_,i)=>(
            <g key={i} transform={`rotate(${i*22.5})`}>
              <path d="M0,-80 C20,-65 20,-45 0,-30 C-20,-45 -20,-65 0,-80Z"/>
              <circle cx="0" cy="-55" r="2" fill="#D4AF37" opacity="0.2"/>
            </g>
          ))}
          <circle r="25" strokeWidth="0.6"/>
        </g>
      </svg>
    </motion.div>
    {/* Bottom-left mandala */}
    <motion.div className="absolute -bottom-16 -left-16"
      animate={{ rotate: 360 }} transition={{ duration: 100, repeat: Infinity, ease: "linear" }}>
      <svg width="350" height="350" viewBox="0 0 200 200" className="opacity-[0.04]">
        <g transform="translate(100,100)" fill="none" stroke="#D4AF37" strokeWidth="0.5">
          {Array.from({length:10}).map((_,i)=>(
            <g key={i} transform={`rotate(${i*36})`}>
              <path d="M0,-70 C18,-55 18,-40 0,-25 C-18,-40 -18,-55 0,-70Z"/>
              <path d="M0,-50 Q10,-38 0,-28 Q-10,-38 0,-50Z"/>
            </g>
          ))}
          <circle r="20" strokeWidth="0.6" strokeDasharray="2 4"/>
        </g>
      </svg>
    </motion.div>
  </div>
);

/* Heart particles */
const HeartParticle = ({ x, delay, size, dur }: { x: number; delay: number; size: number; dur: number }) => (
  <motion.div
    className="absolute pointer-events-none z-[1]"
    style={{ left: `${x}%`, bottom: "-5%", fontSize: size }}
    animate={{ y: [0, -800], x: [0, Math.sin(x)*30, 0], opacity: [0, 0.6, 0.3, 0], rotate: [0, 360] }}
    transition={{ duration: dur, delay, repeat: Infinity, ease: "easeOut" }}
  >
    💗
  </motion.div>
);

/* --- Premium High-Animated Icon --- */
const PremiumIcon = ({ icon, hovered }: { icon: string; hovered: boolean }) => (
  <motion.div
    className="relative z-20 text-5xl mb-4 mt-2 flex items-center justify-center p-4 rounded-full bg-white/10"
    animate={hovered ? { 
      y: [-5, -15, -5],
      scale: [1, 1.25, 1],
      rotateY: [0, 180, 360],
      boxShadow: ["0 0 10px rgba(212,175,55,0.2)", "0 0 30px rgba(212,175,55,0.6)", "0 0 10px rgba(212,175,55,0.2)"]
    } : { scale: 1, y: 0 }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  >
    <span className="relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">{icon}</span>
    <motion.div 
      className="absolute inset-0 border-2 border-dashed border-[#D4AF37]/40 rounded-full"
      animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    />
  </motion.div>
);

/* --- Sparkle Particle System --- */
const CardSparkles = ({ active }: { active: boolean }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[22px]">
    {active && [...Array(6)].map((_, i) => (
      <motion.div
        key={`sparkle-${i}`}
        className="absolute w-1 h-1 bg-[#D4AF37] rounded-full"
        initial={{ x: "50%", y: "50%", opacity: 1, scale: 0 }}
        animate={{ 
          x: `${20 + Math.random() * 60}%`, 
          y: `${20 + Math.random() * 60}%`, 
          opacity: [0, 1, 0], 
          scale: [0, 1.5, 0] 
        }}
        transition={{ duration: 1.5 + Math.random() * 2, repeat: Infinity, delay: i * 0.2 }}
        style={{ boxShadow: "0 0 8px #D4AF37" }}
      />
    ))}
  </div>
);

/* --- Running Border Glow --- */
const CardBorderGlow = ({ hovered }: { hovered: boolean }) => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-[22px]" fill="none">
    <rect x="0.5" y="0.5" width="calc(100% - 1px)" height="calc(100% - 1px)" 
      rx="21.5" stroke="url(#border-grad)" strokeWidth="1" 
      strokeDasharray="80 200" 
      style={{ opacity: hovered ? 1 : 0.3, transition: "opacity 0.3s" }}
    >
      <animate attributeName="stroke-dashoffset" from="280" to="0" dur="4s" repeatCount="indefinite" />
    </rect>
    <defs>
      <linearGradient id="border-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="transparent" />
        <stop offset="50%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="transparent" />
      </linearGradient>
    </defs>
  </svg>
);

/* --- Enhanced Vector Filigree Corners --- */
const CardCorner = ({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) => {
  const rotation = { tl: 0, tr: 90, br: 180, bl: 270 }[pos];
  const placement = {
    tl: "top-0 left-0", tr: "top-0 right-0",
    bl: "bottom-0 left-0", br: "bottom-0 right-0"
  }[pos];

  return (
    <motion.div
      className={`absolute w-12 h-12 md:w-16 md:h-16 ${placement} pointer-events-none`}
      style={{ transform: `rotate(${rotation}deg)` }}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
    >
      <svg viewBox="0 0 60 60" className="w-full h-full relative z-10 drop-shadow-md">
        <defs>
          <linearGradient id="gold-filigree-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#FFF" />
            <stop offset="100%" stopColor="#A97C25" />
          </linearGradient>
        </defs>
        <motion.path d="M 2 2 L 25 2 C 40 2 58 20 58 35 L 58 58 M 2 2 L 2 25 C 2 40 20 58 35 58 L 58 58" 
           stroke="url(#gold-filigree-grad)" strokeWidth="1.5" fill="none"
           initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeOut" }}
        />
        <motion.path d="M 5 5 Q 15 5 15 15 Q 15 25 25 25 Q 35 25 35 35 Q 35 45 45 45 Q 55 45 55 55"
           stroke="#D4AF37" strokeWidth="0.8" fill="none" opacity="0.6"
           initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2.5, delay: 0.3 }}
        />
        <motion.path d="M 12 12 C 12 25 25 38 38 38" 
           stroke="#D4AF37" strokeWidth="1" fill="none" strokeDasharray="2 2"
           initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.6 }}
        />
        <motion.circle cx="15" cy="15" r="2.5" fill="url(#gold-filigree-grad)" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 3, repeat: Infinity }} />
        <motion.circle cx="35" cy="15" r="1.5" fill="#D4AF37" />
        <motion.circle cx="15" cy="35" r="1.5" fill="#D4AF37" />
        <motion.path d="M 2 2 L 6 6" stroke="url(#gold-filigree-grad)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
};

/* --- The Wedding Event Card --- */
const EventCard = ({ event }: { event: typeof blocks[0]["events"][0] }) => {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), { damping: 20, stiffness: 150 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), { damping: 20, stiffness: 150 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (matchMedia("(pointer: coarse)").matches) return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left - rect.width / 2);
    mouseY.set(event.clientY - rect.top - rect.height / 2);
  }

  return (
    <motion.div
      ref={cardRef}
      className="relative group cursor-pointer w-full perspective-1000 will-change-transform"
      variants={fadeUp}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); setHovered(false); }}
      animate={hovered ? { scale: 1.05 } : { scale: 1 }}
      style={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="absolute -inset-1.5 rounded-[26px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[20px] z-0"
        style={{ background: "linear-gradient(45deg, #D4AF37, #FFFFFF, #FFD700, #A97C25)", backgroundSize: "400% 400%" }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
      <div
        className="relative rounded-[22px] p-8 md:p-12 text-center flex flex-col items-center justify-center overflow-hidden z-10"
        style={{
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 245, 230, 0.98) 100%)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          boxShadow: hovered 
            ? "0 40px 60px rgba(0, 0, 0, 0.15), inset 0 0 40px rgba(255,255,255,1)" 
            : "0 10px 30px rgba(0, 0, 0, 0.05)",
          transition: "box-shadow 0.4s ease"
        }}
      >
        <CardSparkles active={hovered} />
        <CardBorderGlow hovered={hovered} />
        <CardCorner pos="tl" /><CardCorner pos="tr" /><CardCorner pos="bl" /><CardCorner pos="br" />
        <PremiumIcon icon={event.icon} hovered={hovered} />
        <motion.h4 className="relative z-20 font-display text-xl md:text-2xl mb-2"
          style={{ color: "#7A1E2C" }} animate={hovered ? { scale: 1.1, color: "#D4AF37" } : {}}>
          {event.name}
        </motion.h4>
        <motion.div className="h-[1.5px] w-12 bg-[#D4AF37] my-2 rounded-full"
          animate={hovered ? { width: "3rem" } : { width: "1.5rem" }} transition={{ duration: 0.3 }}/>
        <motion.p className="relative z-20 font-decorative text-sm md:text-base mb-1 tracking-wide font-semibold"
          style={{ color: "#A97C25" }}>{event.date}</motion.p>
        <p className="relative z-20 font-body text-[11px] md:text-xs tracking-widest uppercase opacity-80 mb-6" style={{ color: "#7A1E2C" }}>
          {event.venue}
        </p>
        <motion.a
          href={`https://maps.google.com/?q=${event.mapQuery}`} target="_blank" rel="noopener noreferrer"
          className="relative z-20 inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.2em] px-6 py-3 rounded-full transition-all duration-300 overflow-hidden group/btn"
          style={{ border: "1px solid rgba(212,175,55,0.4)", color: "#7A1E2C", background: "transparent" }}
          whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(212,175,55,0.3)", color: "#FFF", border: "1px solid transparent" }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] via-[#A97C25] to-[#D4AF37] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 z-0" />
          <motion.span className="relative z-10 text-sm" animate={hovered ? { x: [0, 4, 0] } : {}} transition={{ duration: 1, repeat: Infinity }}>🧭</motion.span>
          <span className="relative z-10 font-bold tracking-widest drop-shadow-sm">Get Direction</span>
        </motion.a>
      </div>
    </motion.div>
  );
};

const SceneEvents = ({ onNext }: Props) => {
  const hearts = useMemo(() => Array.from({ length: 15 }, (_, i) => ({
    id: i, x: Math.random() * 100, delay: Math.random() * 8, size: 10 + Math.random() * 14, dur: 8 + Math.random() * 6,
  })), []);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-start px-4 pt-16 md:pt-24 pb-12 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #F8E8EC 0%, #F2D5DC 30%, #EDCAD3 60%, #F0D0D8 100%)" }}>
      
      {/* SVG Mandala Pattern */}
      <MandalaPattern />

      {/* Heart Particles */}
      {hearts.map(h => <HeartParticle key={h.id} x={h.x} delay={h.delay} size={h.size} dur={h.dur} />)}

      {/* Soft radial glow */}
      <motion.div className="absolute inset-0 pointer-events-none z-0"
        style={{ background: "radial-gradient(circle at 50% 30%, hsl(43 72% 55% / 0.08), transparent 60%)" }}
        animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 5, repeat: Infinity }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-10 w-full max-w-6xl"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.div className="flex flex-col items-center gap-2" variants={fadeUp}>
          <PremiumHeading text="Wedding Events" fontSize="text-4xl md:text-7xl" />
          <motion.div className="h-[2px] w-24 md:w-32 rounded-full -mt-2"
            style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }}
            variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 1, ease: "easeOut" } } }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 w-full max-w-full">
          {blocks.map((block, bi) => (
            <motion.div key={block.title} className="flex flex-col gap-6 w-full max-w-md mx-auto" variants={fadeUp} transition={{ delay: bi * 0.15 }}>
              <motion.div className="text-center py-2 relative"
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ delay: 0.2 + bi * 0.2, duration: 0.6 }}>
                <h3 className="font-decorative text-lg md:text-2xl tracking-[0.2em] uppercase font-semibold relative z-10"
                  style={{ color: "hsl(0 60% 25%)" }}>{block.title}</h3>
              </motion.div>
              <div className="flex flex-col gap-4">
                {block.events.map((e) => <EventCard key={e.name} event={e} />)}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUp} className="mt-6 relative z-20">
          <GoldButton onClick={onNext}>Meet the Families</GoldButton>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SceneEvents;
