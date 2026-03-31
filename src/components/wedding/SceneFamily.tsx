import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import GoldButton from "./GoldButton";
import SectionBackground from "./SectionBackground";
import brideFamilyImg from "@/assets/bride-family.jpg";
import groomFamilyImg from "@/assets/groom-family.jpg";

interface Props { onNext: () => void; }

const brideFamily = [
  { relation: "Father of the Bride", name: "Shri Ramesh Sharma" },
  { relation: "Mother of the Bride", name: "Smt. Sunita Sharma" },
];
const groomFamily = [
  { relation: "Father of the Groom", name: "Shri Vikram Mehta" },
  { relation: "Mother of the Groom", name: "Smt. Anjali Mehta" },
];

/* Corner ornament */
const CornerOrnament = ({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) => {
  const posClasses: Record<string, string> = {
    "top-left": "top-2 left-2",
    "top-right": "top-2 right-2 rotate-90",
    "bottom-left": "bottom-2 left-2 -rotate-90",
    "bottom-right": "bottom-2 right-2 rotate-180",
  };
  return (
    <motion.div
      className={`absolute ${posClasses[position]} pointer-events-none z-20`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 0.7, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M2 30 C2 16 16 2 30 2" stroke="hsl(43 72% 55%)" strokeWidth="1.5" fill="none" opacity="0.8" />
        <path d="M2 22 C2 12 12 2 22 2" stroke="hsl(43 72% 60%)" strokeWidth="1" fill="none" opacity="0.5" />
        <circle cx="30" cy="2" r="2.5" fill="hsl(43 72% 55%)" opacity="0.9" />
        <circle cx="2" cy="30" r="2.5" fill="hsl(43 72% 55%)" opacity="0.9" />
      </svg>
    </motion.div>
  );
};

/* Mini star */
const CardStar = ({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none z-10"
    style={{
      left: `${x}%`, top: `${y}%`, width: size, height: size,
      background: "radial-gradient(circle, hsl(43 72% 75%), hsl(43 72% 55% / 0.5))",
      boxShadow: `0 0 ${size * 3}px hsl(43 72% 55% / 0.6)`,
    }}
    animate={{ opacity: [0, 1, 0.3, 1, 0], scale: [0.5, 1.3, 0.7, 1.1, 0.5] }}
    transition={{ duration: 2.5 + Math.random() * 2, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

/* Mini bubble */
const CardBubble = ({ x, delay }: { x: number; delay: number }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none z-10"
    style={{
      left: `${x}%`, bottom: "0%",
      width: 6 + Math.random() * 10, height: 6 + Math.random() * 10,
      border: "1px solid hsl(43 72% 60% / 0.3)",
      background: "radial-gradient(circle at 30% 30%, hsl(43 72% 70% / 0.25), transparent)",
    }}
    animate={{ y: [0, -200], opacity: [0, 0.7, 0] }}
    transition={{ duration: 3 + Math.random() * 2, delay, repeat: Infinity, ease: "easeOut" }}
  />
);

/* Family flip card */
const FamilyFlipCard = ({
  title, image, members, delay,
}: {
  title: string;
  image: string;
  members: { relation: string; name: string }[];
  delay: number;
}) => {
  const [flipped, setFlipped] = useState(false);

  const stars = useMemo(
    () => Array.from({ length: 8 }, (_, i) => ({
      id: i, x: Math.random() * 90 + 5, y: Math.random() * 90 + 5,
      size: 1.5 + Math.random() * 2.5, delay: Math.random() * 4,
    })), []
  );
  const bubbles = useMemo(
    () => Array.from({ length: 5 }, (_, i) => ({
      id: i, x: Math.random() * 80 + 10, delay: Math.random() * 5,
    })), []
  );

  return (
    <motion.div
      className="relative cursor-pointer"
      style={{ perspective: 1200 }}
      variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
      transition={{ delay, duration: 0.6 }}
      onClick={() => setFlipped((prev) => !prev)}
    >
      {/* Animated border glow */}
      <motion.div
        className="absolute -inset-[2px] rounded-2xl z-0"
        style={{
          background: "linear-gradient(270deg, hsl(43 72% 55%), hsl(340 50% 65%), hsl(43 72% 55%), hsl(0 50% 40%))",
          backgroundSize: "300% 300%",
        }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      <div
        className="relative w-full rounded-2xl"
        style={{
          minHeight: 380,
          transformStyle: "preserve-3d",
          transform: `rotateY(${flipped ? 180 : 0}deg)`,
          transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* FRONT - Family Photo */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="relative w-full h-full min-h-[380px]">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              loading="lazy"
              width={640}
              height={640}
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, hsl(0 40% 10% / 0.7) 0%, transparent 50%)" }}
            />

            {/* Corner ornaments */}
            <CornerOrnament position="top-left" />
            <CornerOrnament position="top-right" />
            <CornerOrnament position="bottom-left" />
            <CornerOrnament position="bottom-right" />

            {/* Stars */}
            {stars.map((s) => <CardStar key={s.id} x={s.x} y={s.y} size={s.size} delay={s.delay} />)}
            {/* Bubbles */}
            {bubbles.map((b) => <CardBubble key={b.id} x={b.x} delay={b.delay} />)}

            {/* Title on front */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 p-6 text-center z-20"
            >
              <motion.p
                className="font-display text-2xl"
                style={{ color: "hsl(43 72% 70%)" }}
                animate={{
                  textShadow: [
                    "0 0 10px hsl(43 72% 55% / 0.4)",
                    "0 0 25px hsl(43 72% 55% / 0.7)",
                    "0 0 10px hsl(43 72% 55% / 0.4)",
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                {title}
              </motion.p>
              <motion.p
                className="font-body text-xs mt-2 uppercase tracking-[0.25em]"
                style={{ color: "hsl(43 72% 80% / 0.8)" }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✨ Tap to view members ✨
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* BACK - Members List */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div
            className="relative w-full h-full min-h-[380px] flex flex-col items-center justify-center p-8"
            style={{
              background: "linear-gradient(145deg, hsl(0 30% 97% / 0.95), hsl(0 40% 94% / 0.92))",
              backdropFilter: "blur(10px)",
            }}
          >
            {/* Corner ornaments on back */}
            <CornerOrnament position="top-left" />
            <CornerOrnament position="top-right" />
            <CornerOrnament position="bottom-left" />
            <CornerOrnament position="bottom-right" />

            {/* Stars on back */}
            {stars.map((s) => <CardStar key={`b-${s.id}`} x={s.x} y={s.y} size={s.size} delay={s.delay} />)}
            {bubbles.map((b) => <CardBubble key={`b-${b.id}`} x={b.x} delay={b.delay} />)}

            {/* Radial glow */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(circle at 50% 30%, hsl(43 72% 55% / 0.12), transparent 70%)" }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            <AnimatePresence>
              {flipped && (
                <>
                  <motion.p
                    className="font-display text-xl mb-6 relative z-20"
                    style={{ color: "hsl(43 72% 45%)" }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {title}
                  </motion.p>

                  <motion.div
                    className="h-px w-20 mb-6 relative z-20"
                    style={{ background: "linear-gradient(90deg, transparent, hsl(43 72% 50%), transparent)" }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  />

                  {members.map((m, i) => (
                    <motion.div
                      key={m.name}
                      className="text-center py-3 relative z-20"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.15 }}
                    >
                      <p
                        className="font-body text-xs uppercase tracking-[0.2em]"
                        style={{ color: "hsl(0 25% 50%)" }}
                      >
                        {m.relation}
                      </p>
                      <motion.p
                        className="font-decorative text-xl mt-1"
                        style={{ color: "hsl(0 60% 25%)" }}
                        animate={{
                          textShadow: [
                            "0 0 0px transparent",
                            "0 0 8px hsl(43 72% 55% / 0.3)",
                            "0 0 0px transparent",
                          ],
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                      >
                        {m.name}
                      </motion.p>
                    </motion.div>
                  ))}

                  <motion.p
                    className="font-body text-xs mt-4 uppercase tracking-[0.25em] relative z-20"
                    style={{ color: "hsl(0 25% 55% / 0.7)" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
                  >
                    ✨ Tap to go back ✨
                  </motion.p>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const SceneFamily = ({ onNext }: Props) => (
  <SectionBackground className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
    <motion.div
      className="relative z-10 flex flex-col items-center gap-10 max-w-3xl w-full"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
    >
      <motion.h2
        className="font-display text-3xl md:text-4xl"
        style={{ color: "hsl(0 60% 25%)" }}
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        animate={{
          textShadow: [
            "0 0 10px hsl(43 72% 55% / 0)",
            "0 0 25px hsl(43 72% 55% / 0.3)",
            "0 0 10px hsl(43 72% 55% / 0)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Our Families
      </motion.h2>

      <motion.div
        className="h-px w-24"
        style={{ background: "linear-gradient(90deg, transparent, hsl(43 72% 50%), transparent)" }}
        variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
      />

      <div className="grid md:grid-cols-2 gap-8 w-full">
        <FamilyFlipCard
          title="Bride's Family"
          image={brideFamilyImg}
          members={brideFamily}
          delay={0}
        />
        <FamilyFlipCard
          title="Groom's Family"
          image={groomFamilyImg}
          members={groomFamily}
          delay={0.2}
        />
      </div>

      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
        <GoldButton onClick={onNext}>View Gallery</GoldButton>
      </motion.div>
    </motion.div>
  </SectionBackground>
);

export default SceneFamily;
