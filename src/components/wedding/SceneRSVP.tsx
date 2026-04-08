import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import SectionBackground from "./SectionBackground";
import PremiumHeading from "./PremiumHeading";
import floralCorner from "@/assets/floral-corner.png";

const cardStyle = {
  background: "linear-gradient(135deg, hsl(0 30% 97% / 0.9), hsl(0 40% 94% / 0.85))",
  border: "1px solid hsl(43 72% 55% / 0.3)",
  boxShadow: "0 8px 32px hsl(0 40% 30% / 0.1), inset 0 1px 0 hsl(43 72% 70% / 0.3)",
};

/* Card-level star */
const CardStar = ({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      left: `${x}%`, top: `${y}%`, width: size, height: size,
      background: "radial-gradient(circle, hsl(43 72% 70%), hsl(43 72% 55% / 0.4))",
      boxShadow: `0 0 ${size * 3}px hsl(43 72% 55% / 0.5)`,
    }}
    animate={{ opacity: [0, 1, 0.3, 1, 0], scale: [0.3, 1.2, 0.6, 1.3, 0.3] }}
    transition={{ duration: 2.5 + Math.random() * 2, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

/* Card-level bubble */
const CardBubble = ({ x, size, delay, dur }: { x: number; size: number; delay: number; dur: number }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      left: `${x}%`, bottom: "-8%", width: size, height: size,
      border: "1px solid hsl(43 72% 55% / 0.25)",
      background: "radial-gradient(circle at 30% 30%, hsl(43 72% 65% / 0.15), transparent)",
    }}
    animate={{ y: [0, -250], x: [0, Math.sin(x) * 15, 0], opacity: [0, 0.6, 0.3, 0] }}
    transition={{ duration: dur, delay, repeat: Infinity, ease: "easeOut" }}
  />
);

/* Glow card with stars & bubbles */
const GlowCard = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const stars = useMemo(() => Array.from({ length: 6 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100, size: 1.5 + Math.random() * 2.5, delay: Math.random() * 4,
  })), []);
  const bubbles = useMemo(() => Array.from({ length: 4 }, (_, i) => ({
    id: i, x: 10 + Math.random() * 80, size: 5 + Math.random() * 10, delay: Math.random() * 5, dur: 4 + Math.random() * 3,
  })), []);

  return (
    <motion.div
      className={`relative group ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -6, scale: 1.02 }}
    >
      <motion.div
        className="absolute -inset-[2px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "linear-gradient(270deg, hsl(43 72% 55%), hsl(340 50% 65%), hsl(43 72% 55%), hsl(0 60% 45%))",
          backgroundSize: "300% 300%",
        }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -top-1 -left-1 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100"
        style={{ background: "hsl(43 72% 65%)", boxShadow: "0 0 12px hsl(43 72% 55%)" }}
        animate={{ scale: [0.5, 1.2, 0.5], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100"
        style={{ background: "hsl(43 72% 65%)", boxShadow: "0 0 12px hsl(43 72% 55%)" }}
        animate={{ scale: [1.2, 0.5, 1.2], opacity: [1, 0.3, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <div className="relative rounded-xl p-6 backdrop-blur-sm overflow-hidden" style={cardStyle}>
        {/* Stars */}
        {stars.map(s => <CardStar key={s.id} x={s.x} y={s.y} size={s.size} delay={s.delay} />)}
        {/* Bubbles */}
        {bubbles.map(b => <CardBubble key={b.id} x={b.x} size={b.size} delay={b.delay} dur={b.dur} />)}
        {/* Shimmer */}
        <motion.div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(105deg, transparent 40%, hsl(43 72% 70% / 0.12) 50%, transparent 60%)" }}
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
        />
        <div className="relative z-10">{children}</div>
      </div>
    </motion.div>
  );
};

const SceneRSVP = ({ guestName }: { guestName: string }) => {
  const [hoveredContact, setHoveredContact] = useState<string | null>(null);

  const contactStars = useMemo(() => Array.from({ length: 4 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100, size: 1.5 + Math.random() * 2, delay: Math.random() * 3,
  })), []);
  const contactBubbles = useMemo(() => Array.from({ length: 3 }, (_, i) => ({
    id: i, x: 10 + Math.random() * 80, size: 4 + Math.random() * 7, delay: Math.random() * 4, dur: 3.5 + Math.random() * 3,
  })), []);

  return (
    <SectionBackground className="flex min-h-screen flex-col items-center justify-start px-4 py-20 pb-32 text-center relative">
      <img src={floralCorner} alt="" className="absolute top-4 right-4 w-28 md:w-36 opacity-40 z-10" loading="lazy" width={512} height={512} />
      <img src={floralCorner} alt="" className="absolute bottom-4 left-4 w-28 md:w-36 opacity-40 rotate-180 z-10" loading="lazy" width={512} height={512} />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-6 max-w-lg w-full"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
      >
        {/* Title */}
        <motion.div className="flex flex-col items-center gap-3"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          <PremiumHeading 
            text="Get In Touch"
            fontSize="text-3xl md:text-5xl"
          />
          <motion.div className="h-px w-24 -mt-2" style={{ background: "linear-gradient(90deg, transparent, hsl(43 72% 50%), transparent)" }}
            variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
          />
          <motion.p className="font-decorative text-base italic" style={{ color: "hsl(0 40% 40%)" }}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          >
            We would be honoured by your presence
          </motion.p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div className="mt-4 w-full grid grid-cols-1 sm:grid-cols-3 gap-5"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        >
          {[
            { icon: "📞", label: "Call Us", sub: "+91 98765 43210", href: "tel:+919876543210", key: "call" },
            { icon: "💬", label: "WhatsApp", sub: "Message us", href: "https://wa.me/919876543210", key: "whatsapp" },
            { icon: "📍", label: "Venue Map", sub: "Get Directions", href: "https://maps.google.com/?q=The+Grand+Palace+Jaipur", key: "map" },
          ].map((item, i) => {
            const stars = Array.from({ length: 5 }, (_, j) => ({
              id: j, x: Math.random() * 100, y: Math.random() * 100, size: 1.5 + Math.random() * 2, delay: Math.random() * 4,
            }));
            const bubbles = Array.from({ length: 3 }, (_, j) => ({
              id: j, x: 10 + Math.random() * 80, size: 4 + Math.random() * 8, delay: Math.random() * 5, dur: 3.5 + Math.random() * 3,
            }));
            return (
              <motion.a
                key={item.key}
                href={item.href}
                target={item.key !== "call" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="relative group rounded-2xl overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.15, type: "spring", stiffness: 100 }}
                onHoverStart={() => setHoveredContact(item.key)}
                onHoverEnd={() => setHoveredContact(null)}
                whileHover={{ y: -8, scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Animated gradient border */}
                <motion.div className="absolute -inset-[2px] rounded-2xl"
                  style={{
                    background: "linear-gradient(270deg, hsl(43 72% 55%), hsl(340 50% 65%), hsl(280 40% 60%), hsl(43 72% 55%))",
                    backgroundSize: "300% 300%",
                  }}
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />

                {/* Corner sparkles */}
                {(["top-left", "top-right", "bottom-left", "bottom-right"] as const).map((pos) => {
                  const cls = { "top-left": "-top-0.5 -left-0.5", "top-right": "-top-0.5 -right-0.5", "bottom-left": "-bottom-0.5 -left-0.5", "bottom-right": "-bottom-0.5 -right-0.5" }[pos];
                  return (
                    <motion.div key={pos}
                      className={`absolute ${cls} w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 z-20`}
                      style={{ background: "hsl(43 72% 65%)", boxShadow: "0 0 8px hsl(43 72% 55%)" }}
                      animate={{ scale: [0.5, 1.5, 0.5], opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.8, repeat: Infinity, delay: Math.random() }}
                    />
                  );
                })}

                <div className="relative rounded-2xl px-5 py-6 flex flex-col items-center gap-3 backdrop-blur-sm overflow-hidden"
                  style={{
                    background: "linear-gradient(145deg, hsl(0 30% 97% / 0.92), hsl(0 40% 94% / 0.88))",
                    border: "1px solid hsl(43 72% 55% / 0.15)",
                    boxShadow: "0 8px 32px hsl(0 40% 30% / 0.08), inset 0 1px 0 hsl(43 72% 70% / 0.25)",
                  }}
                >
                  {/* Stars inside card */}
                  {stars.map(s => <CardStar key={s.id} x={s.x} y={s.y} size={s.size} delay={s.delay} />)}
                  {/* Bubbles inside card */}
                  {bubbles.map(b => <CardBubble key={b.id} x={b.x} size={b.size} delay={b.delay} dur={b.dur} />)}

                  {/* Shimmer sweep */}
                  <motion.div className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(105deg, transparent 40%, hsl(43 72% 70% / 0.15) 50%, transparent 60%)" }}
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4 }}
                  />

                  {/* Icon with glow */}
                  <motion.div className="relative z-10">
                    <motion.div className="absolute inset-0 rounded-full"
                      style={{ background: "radial-gradient(circle, hsl(43 72% 55% / 0.2), transparent)", filter: "blur(8px)" }}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.span className="text-3xl relative z-10 block"
                      animate={hoveredContact === item.key
                        ? { scale: [1, 1.3, 1], rotate: [0, 15, -15, 0], y: [0, -5, 0] }
                        : { y: [0, -3, 0] }
                      }
                      transition={hoveredContact === item.key
                        ? { duration: 0.6 }
                        : { duration: 2, repeat: Infinity, ease: "easeInOut" }
                      }
                    >{item.icon}</motion.span>
                  </motion.div>

                  <span className="font-display text-base font-medium relative z-10" style={{ color: "hsl(0 60% 25%)" }}>
                    {item.label}
                  </span>
                  <span className="font-body text-[11px] relative z-10" style={{ color: "hsl(0 25% 50%)" }}>
                    {item.sub}
                  </span>
                </div>
              </motion.a>
            );
          })}
        </motion.div>

        {/* Closing blessing */}
        <GlowCard className="w-full mt-2" delay={0.6}>
          <motion.div className="flex flex-col items-center gap-3">
            <motion.p className="font-decorative text-lg italic" style={{ color: "hsl(43 72% 45%)" }}
              animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 4, repeat: Infinity }}>
              "May your blessings shower upon us like the petals of sacred flowers"
            </motion.p>
            <motion.div className="h-px w-16" style={{ background: "linear-gradient(90deg, transparent, hsl(43 72% 50% / 0.5), transparent)" }} />
            <p className="font-body text-xs tracking-wide" style={{ color: "hsl(0 25% 45%)" }}>With love, Rajveer & Ishita's Families</p>
          </motion.div>
        </GlowCard>
      </motion.div>
    </SectionBackground>
  );
};

export default SceneRSVP;
