import { motion, Variants } from "framer-motion";
import { useMemo, useState } from "react";
import GoldButton from "./GoldButton";
import SectionBackground from "./SectionBackground";

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
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

/* --- Global Background Animations --- */
const SceneStars = () => {
  const stars = useMemo(() => Array.from({ length: 60 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100, 
    size: 1.5 + Math.random() * 3, delay: Math.random() * 5
  })), []);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((s) => (
        <motion.div
          key={`star-${s.id}`}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size,
            background: "radial-gradient(circle, #FFF, #E5C06A)",
            boxShadow: `0 0 ${s.size * 6}px #E5C06A`
          }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.8, 0.5] }}
          transition={{ duration: 3 + Math.random() * 4, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

const SceneBubbles = () => {
  const bubbles = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
    id: i, x: Math.random() * 100, size: 15 + Math.random() * 40, delay: Math.random() * 8
  })), []);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {bubbles.map((b) => (
        <motion.div
          key={`bubble-${b.id}`}
          className="absolute rounded-full backdrop-blur-[2px]"
          style={{
            left: `${b.x}%`, bottom: "-10%", width: b.size, height: b.size,
            background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.35), transparent)",
            border: "1px solid rgba(255, 255, 255, 0.5)",
            boxShadow: "inset 2px 2px 5px rgba(255,255,255,0.4)"
          }}
          animate={{ y: ["0vh", "-120vh"], x: [0, Math.random() * 60 - 30, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 8 + Math.random() * 8, delay: b.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
};

/* --- Elegant SVG Corners for Cards (Highly Responsive) --- */
const CardCorner = ({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) => {
  const rotation = { tl: 0, tr: 90, br: 180, bl: 270 }[pos];
  const placement = {
    tl: "top-2 left-2", tr: "top-2 right-2",
    bl: "bottom-2 left-2", br: "bottom-2 right-2"
  }[pos];

  return (
    <motion.div
      className={`absolute w-10 h-10 md:w-12 md:h-12 ${placement} pointer-events-none`}
      style={{ transform: `rotate(${rotation}deg)` }}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
    >
      {/* Animated glowing back-light */}
      <motion.div 
        className="absolute inset-0 bg-[#D4AF37]/20 blur-md rounded-full"
        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      <svg viewBox="0 0 40 40" className="w-full h-full text-[#D4AF37] relative z-10 drop-shadow-sm">
        {/* Outer elegant curve */}
        <motion.path 
           d="M 2 2 L 15 2 C 25 2 35 12 35 25 L 35 38" 
           stroke="currentColor" strokeWidth="1.5" fill="none"
           initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeOut" }}
        />
        {/* Inner broken detail curve */}
        <motion.path 
           d="M 2 8 L 8 8 C 15 8 25 18 25 25 L 25 38" 
           stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="3 3"
           initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
        />
        {/* Jewel drops */}
        <circle cx="20" cy="20" r="2" fill="currentColor" />
        <circle cx="29" cy="11" r="1.5" fill="currentColor" />
        <circle cx="11" cy="29" r="1.5" fill="currentColor" />
      </svg>
    </motion.div>
  );
};


/* --- The Wedding Event Card --- */
const EventCard = ({ event, delay }: { event: typeof blocks[0]["events"][0]; delay: number }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative group cursor-pointer w-full"
      style={{ perspective: 1200 }}
      variants={fadeUp}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -12, scale: 1.05, rotateX: 5, rotateY: -3 }}
      transition={{ type: "spring", stiffness: 350, damping: 15 }}
    >
      {/* Dynamic Aura Glow on Hover */}
      <motion.div
        className="absolute -inset-1 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"
        style={{ background: "linear-gradient(45deg, #D4AF37, #FFF, #ff9a9e, #D4AF37)", backgroundSize: "200% 200%" }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* Main Glassmorphic Card */}
      <div
        className="relative rounded-[22px] p-6 md:p-8 text-center flex flex-col items-center justify-center overflow-hidden z-10"
        style={{
          background: "linear-gradient(145deg, rgba(255, 255, 255, 0.85), rgba(255, 240, 245, 0.95))",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.8)",
          boxShadow: hovered 
             ? "0 30px 50px rgba(0, 0, 0, 0.3), inset 0 0 30px rgba(255,255,255,0.9), 0 0 25px rgba(212,175,55,0.4)" 
             : "0 10px 30px rgba(0, 0, 0, 0.2), inset 0 0 10px rgba(255,255,255,0.6)",
          transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        }}
      >
        {/* 4 Vector Animated Corners */}
        <CardCorner pos="tl" />
        <CardCorner pos="tr" />
        <CardCorner pos="bl" />
        <CardCorner pos="br" />

        {/* Shimmering Hover Effect inside Card */}
        <motion.div
           className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent pointer-events-none"
           initial={{ x: "-100%" }}
           animate={hovered ? { x: "100%" } : { x: "-100%" }}
           transition={{ duration: 1, ease: "easeInOut" }}
        />

        {/* Content */}
        <motion.div
          className="relative z-20 text-4xl mb-3 mt-2"
          animate={hovered ? { scale: [1, 1.3, 1], rotate: [0, -10, 10, 0] } : { scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {event.icon}
        </motion.div>

        <motion.h4
          className="relative z-20 font-display text-xl md:text-2xl mb-1"
          style={{ color: "#7A1E2C" }}
        >
          {event.name}
        </motion.h4>

        <motion.div 
           className="h-[1.5px] w-12 bg-[#D4AF37] my-2 rounded-full"
           animate={hovered ? { width: "3rem" } : { width: "1.5rem" }}
           transition={{ duration: 0.3 }}
        />

        <motion.p
          className="relative z-20 font-decorative text-sm md:text-base mb-1 tracking-wide font-semibold"
          style={{ color: "#A97C25" }}
        >
          {event.date}
        </motion.p>

        <p className="relative z-20 font-body text-[11px] md:text-xs tracking-widest uppercase opacity-80 mb-6" style={{ color: "#7A1E2C" }}>
          {event.venue}
        </p>

        <motion.a
          href={`https://maps.google.com/?q=${event.mapQuery}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-20 inline-flex items-center gap-2 font-body text-[10px] md:text-xs uppercase tracking-[0.2em] px-6 py-3 rounded-full transition-all duration-300 overflow-hidden group/btn"
          style={{
            border: "1px solid rgba(212,175,55,0.4)",
            color: "#7A1E2C",
            background: "transparent",
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 8px 20px rgba(212,175,55,0.3)",
            color: "#FFF",
            border: "1px solid transparent"
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div 
             className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] via-[#A97C25] to-[#D4AF37] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 z-0" 
          />
          <motion.span
            className="relative z-10 text-sm"
            animate={hovered ? { x: [0, 4, 0] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          >
            🧭
          </motion.span>
          <span className="relative z-10 font-bold tracking-widest drop-shadow-sm">Get Direction</span>
        </motion.a>
      </div>
    </motion.div>
  );
};


/* --- Main Section Layout --- */
const SceneEvents = ({ onNext }: Props) => (
  <SectionBackground className="relative flex min-h-screen flex-col items-center justify-center px-4 py-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#3A1017] via-[#22070D] to-[#0A0002] overflow-hidden">
    
    {/* Full Screen Animated Star & Bubble Environment */}
    <SceneStars />
    <SceneBubbles />

    <motion.div
      className="relative z-10 flex flex-col items-center gap-12 w-full max-w-6xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
    >
      {/* Title Header */}
      <motion.div className="flex flex-col items-center gap-4" variants={fadeUp}>
        <motion.h2
          className="font-display text-4xl md:text-5xl lg:text-6xl text-center"
          style={{ color: "#E5C06A", textShadow: "0 4px 20px rgba(229,192,106,0.5)" }}
        >
          Wedding Events
        </motion.h2>
        <motion.div
          className="h-[2px] w-24 md:w-32 rounded-full"
          style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }}
          variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 1, ease: "easeOut" } } }}
        />
      </motion.div>

      {/* 3 Block layout spanning evenly - highly responsive grid */}
      <div className="grid gap-12 md:gap-8 w-full xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {blocks.map((block, bi) => (
          <motion.div
            key={block.title}
            className="flex flex-col gap-6 w-full max-w-md mx-auto"
            variants={fadeUp}
            transition={{ delay: bi * 0.15 }}
          >
            <motion.div
              className="text-center py-2 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + bi * 0.2, duration: 0.6 }}
            >
              <h3
                className="font-decorative text-xl md:text-2xl tracking-[0.25em] uppercase font-semibold relative z-10"
                style={{ color: "#D4AF37" }}
              >
                {block.title}
              </h3>
            </motion.div>

            <div className="flex flex-col gap-6">
              {block.events.map((e, ei) => (
                <EventCard key={e.name} event={e} delay={bi * 0.15 + ei * 0.1} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div variants={fadeUp} className="mt-8 relative z-20">
        <GoldButton onClick={onNext}>Meet the Families</GoldButton>
      </motion.div>
    </motion.div>
  </SectionBackground>
);

export default SceneEvents;
