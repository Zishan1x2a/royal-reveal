import { motion } from "framer-motion";
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

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

/* Mini star inside card */
const CardStar = ({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: size,
      height: size,
      background: "radial-gradient(circle, hsl(43 72% 70%), hsl(43 72% 55% / 0.4))",
      boxShadow: `0 0 ${size * 3}px hsl(43 72% 55% / 0.5)`,
    }}
    animate={{ opacity: [0, 1, 0.3, 1, 0], scale: [0.5, 1.2, 0.7, 1, 0.5] }}
    transition={{ duration: 2.5 + Math.random() * 2, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

/* Mini bubble inside card */
const CardBubble = ({ x, delay }: { x: number; delay: number }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      left: `${x}%`,
      bottom: "0%",
      width: 6 + Math.random() * 8,
      height: 6 + Math.random() * 8,
      border: "1px solid hsl(43 72% 60% / 0.25)",
      background: "radial-gradient(circle at 30% 30%, hsl(43 72% 70% / 0.2), transparent)",
    }}
    animate={{ y: [0, -120], opacity: [0, 0.7, 0] }}
    transition={{ duration: 3 + Math.random() * 2, delay, repeat: Infinity, ease: "easeOut" }}
  />
);

/* Decorative corner ornament */
const CornerOrnament = ({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) => {
  const posClasses: Record<string, string> = {
    "top-left": "top-1 left-1",
    "top-right": "top-1 right-1 rotate-90",
    "bottom-left": "bottom-1 left-1 -rotate-90",
    "bottom-right": "bottom-1 right-1 rotate-180",
  };
  return (
    <motion.div
      className={`absolute ${posClasses[position]} pointer-events-none`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 0.6, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M2 26 C2 14 14 2 26 2" stroke="hsl(43 72% 55%)" strokeWidth="1.5" fill="none" opacity="0.7" />
        <path d="M2 20 C2 12 12 2 20 2" stroke="hsl(43 72% 60%)" strokeWidth="1" fill="none" opacity="0.5" />
        <circle cx="26" cy="2" r="2" fill="hsl(43 72% 55%)" opacity="0.8" />
        <circle cx="2" cy="26" r="2" fill="hsl(43 72% 55%)" opacity="0.8" />
      </svg>
    </motion.div>
  );
};

/* Animated event card */
const EventCard = ({ event, delay }: { event: typeof blocks[0]["events"][0]; delay: number }) => {
  const [hovered, setHovered] = useState(false);

  const stars = useMemo(
    () => Array.from({ length: 6 }, (_, i) => ({
      id: i, x: Math.random() * 90 + 5, y: Math.random() * 90 + 5,
      size: 1.5 + Math.random() * 2, delay: Math.random() * 4,
    })),
    []
  );

  const bubbles = useMemo(
    () => Array.from({ length: 4 }, (_, i) => ({
      id: i, x: Math.random() * 80 + 10, delay: Math.random() * 5,
    })),
    []
  );

  return (
    <motion.div
      className="relative group cursor-pointer"
      variants={fadeUp}
      transition={{ delay }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8 }}
    >
      {/* Animated border glow */}
      <motion.div
        className="absolute -inset-[2px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "linear-gradient(270deg, hsl(43 72% 55%), hsl(340 50% 65%), hsl(43 72% 55%), hsl(0 50% 40%))",
          backgroundSize: "300% 300%",
        }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* Card body */}
      <div
        className="relative rounded-xl p-6 text-center overflow-hidden backdrop-blur-sm"
        style={{
          background: "linear-gradient(145deg, hsl(0 30% 97% / 0.92), hsl(0 40% 94% / 0.88))",
          border: "1px solid hsl(43 72% 55% / 0.25)",
          boxShadow: hovered
            ? "0 12px 40px hsl(43 72% 55% / 0.25), inset 0 1px 0 hsl(43 72% 70% / 0.4)"
            : "0 4px 20px hsl(0 40% 30% / 0.08), inset 0 1px 0 hsl(43 72% 70% / 0.2)",
          transition: "box-shadow 0.4s ease",
        }}
      >
        {/* Corner ornaments */}
        <CornerOrnament position="top-left" />
        <CornerOrnament position="top-right" />
        <CornerOrnament position="bottom-left" />
        <CornerOrnament position="bottom-right" />

        {/* Stars inside card */}
        {stars.map((s) => (
          <CardStar key={s.id} x={s.x} y={s.y} size={s.size} delay={s.delay} />
        ))}

        {/* Bubbles inside card */}
        {bubbles.map((b) => (
          <CardBubble key={b.id} x={b.x} delay={b.delay} />
        ))}

        {/* Radial glow on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(circle at 50% 30%, hsl(43 72% 55% / 0.15), transparent 70%)" }}
          animate={hovered ? { opacity: [0, 1] } : { opacity: 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Icon with bounce */}
        <motion.div
          className="relative z-10 text-4xl mb-3"
          animate={hovered ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] } : {}}
          transition={{ duration: 0.6 }}
        >
          {event.icon}
        </motion.div>

        {/* Event name */}
        <motion.h4
          className="relative z-10 font-display text-lg"
          style={{ color: "hsl(0 60% 25%)" }}
          animate={hovered ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {event.name}
        </motion.h4>

        {/* Date with shimmer */}
        <motion.p
          className="relative z-10 font-decorative text-base mt-2"
          style={{ color: "hsl(43 72% 45%)" }}
          animate={{
            textShadow: hovered
              ? ["0 0 8px hsl(43 72% 55% / 0.4)", "0 0 16px hsl(43 72% 55% / 0.6)", "0 0 8px hsl(43 72% 55% / 0.4)"]
              : "none",
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          📅 {event.date}
        </motion.p>

        {/* Venue */}
        <p className="relative z-10 font-body text-xs mt-1" style={{ color: "hsl(0 25% 45%)" }}>
          📍 {event.venue}
        </p>

        {/* Divider */}
        <motion.div
          className="relative z-10 h-px w-16 mx-auto mt-4 mb-3"
          style={{ background: "linear-gradient(90deg, transparent, hsl(43 72% 55% / 0.5), transparent)" }}
          animate={hovered ? { scaleX: [1, 1.5, 1], opacity: [0.5, 1, 0.5] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Get Direction button */}
        <motion.a
          href={`https://maps.google.com/?q=${event.mapQuery}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 inline-flex items-center gap-2 font-body text-xs uppercase tracking-widest px-5 py-2.5 rounded-lg transition-all duration-300"
          style={{
            border: "1px solid hsl(43 72% 55% / 0.4)",
            color: "hsl(43 72% 45%)",
            background: hovered ? "linear-gradient(135deg, hsl(43 72% 55% / 0.15), hsl(43 72% 55% / 0.05))" : "transparent",
          }}
          whileHover={{
            scale: 1.08,
            boxShadow: "0 4px 20px hsl(43 72% 55% / 0.3)",
            background: "linear-gradient(135deg, hsl(43 72% 55%), hsl(43 80% 65%))",
            color: "hsl(0 60% 15%)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            animate={hovered ? { x: [0, 3, 0] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          >
            🧭
          </motion.span>
          Get Direction
        </motion.a>
      </div>
    </motion.div>
  );
};

const SceneEvents = ({ onNext }: Props) => (
  <SectionBackground className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
    <motion.div
      className="relative z-10 flex flex-col items-center gap-10 w-full max-w-5xl"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
    >
      {/* Title */}
      <motion.div className="flex flex-col items-center gap-3" variants={fadeUp}>
        <motion.h2
          className="font-display text-3xl md:text-4xl"
          style={{ color: "hsl(0 60% 25%)" }}
          animate={{
            textShadow: [
              "0 0 10px hsl(43 72% 55% / 0)",
              "0 0 25px hsl(43 72% 55% / 0.3)",
              "0 0 10px hsl(43 72% 55% / 0)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Wedding Events
        </motion.h2>
        <motion.div
          className="h-px w-24"
          style={{ background: "linear-gradient(90deg, transparent, hsl(43 72% 50%), transparent)" }}
          variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
        />
      </motion.div>

      {/* 3 Block layout */}
      <div className="grid gap-8 w-full md:grid-cols-3">
        {blocks.map((block, bi) => (
          <motion.div
            key={block.title}
            className="flex flex-col gap-5"
            variants={fadeUp}
            transition={{ delay: bi * 0.15 }}
          >
            {/* Block title */}
            <motion.div
              className="text-center py-3 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + bi * 0.2 }}
            >
              <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-full"
                style={{ background: "linear-gradient(90deg, transparent, hsl(43 72% 55% / 0.5), transparent)" }}
                animate={{ backgroundSize: ["100% 100%", "200% 100%", "100% 100%"] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <h3
                className="font-decorative text-lg tracking-widest uppercase"
                style={{ color: "hsl(43 72% 50%)" }}
              >
                {block.title}
              </h3>
            </motion.div>

            {/* Event cards */}
            {block.events.map((e, ei) => (
              <EventCard key={e.name} event={e} delay={bi * 0.15 + ei * 0.1} />
            ))}
          </motion.div>
        ))}
      </div>

      <motion.div variants={fadeUp}>
        <GoldButton onClick={onNext}>Meet the Families</GoldButton>
      </motion.div>
    </motion.div>
  </SectionBackground>
);

export default SceneEvents;
