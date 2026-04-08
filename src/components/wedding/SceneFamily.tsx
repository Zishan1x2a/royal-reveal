import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import PremiumHeading from "./PremiumHeading";
import brideFamilyImg from "@/assets/bride-family.jpg";
import groomFamilyImg from "@/assets/groom-family.jpg";

const brideFamily = [
  { relation: "Father", name: "Shri Ramesh Sharma" },
  { relation: "Mother", name: "Smt. Sunita Sharma" },
  { relation: "Brother", name: "Arjun Sharma" },
  { relation: "Sister", name: "Priya Sharma" },
];
const groomFamily = [
  { relation: "Father", name: "Shri Vikram Mehta" },
  { relation: "Mother", name: "Smt. Anjali Mehta" },
  { relation: "Brother", name: "Rohit Mehta" },
  { relation: "Sister", name: "Neha Mehta" },
];

/* Animated filigree corner for cards */
const CardCorner = ({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) => {
  const rotation = { tl: 0, tr: 90, br: 180, bl: 270 }[pos];
  const placement = { tl: "top-0 left-0", tr: "top-0 right-0", bl: "bottom-0 left-0", br: "bottom-0 right-0" }[pos];
  return (
    <motion.div
      className={`absolute w-14 h-14 md:w-20 md:h-20 ${placement} pointer-events-none z-20`}
      style={{ transform: `rotate(${rotation}deg)` }}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, type: "spring", bounce: 0.5 }}
    >
      <svg viewBox="0 0 60 60" className="w-full h-full drop-shadow-[0_0_8px_hsl(43,72%,55%/0.5)]">
        <defs>
          <linearGradient id={`fc-${pos}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37"/>
            <stop offset="50%" stopColor="#FFF8DC"/>
            <stop offset="100%" stopColor="#A97C25"/>
          </linearGradient>
        </defs>
        <motion.path d="M2,2 L20,2 C35,2 58,18 58,35 L58,58" stroke={`url(#fc-${pos})`} strokeWidth="1.8" fill="none" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 0.7, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}/>
        <motion.path d="M2,2 L2,20 C2,35 18,58 35,58 L58,58" stroke={`url(#fc-${pos})`} strokeWidth="1.8" fill="none" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 0.7, 1] }} transition={{ duration: 4, delay: 0.2, repeat: Infinity, ease: "easeInOut" }}/>
        <motion.path d="M8,8 Q20,8 25,20 Q30,32 42,42" stroke="#D4AF37" strokeWidth="0.8" fill="none" opacity="0.5"
          initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1] }} transition={{ duration: 3, delay: 0.5, repeat: Infinity }}/>
        <motion.circle cx="2" cy="2" r="3" fill="#D4AF37"
          animate={{ scale: [1, 1.8, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}/>
        <motion.circle cx="58" cy="58" r="2" fill="#D4AF37"
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 2, delay: 1, repeat: Infinity }}/>
        <motion.circle cx="30" cy="5" r="1.5" fill="#D4AF37" opacity="0.6"
          animate={{ scale: [0, 1.5, 0] }} transition={{ duration: 2.5, delay: 0.8, repeat: Infinity }}/>
        <motion.circle cx="5" cy="30" r="1.5" fill="#D4AF37" opacity="0.6"
          animate={{ scale: [0, 1.5, 0] }} transition={{ duration: 2.5, delay: 1.2, repeat: Infinity }}/>
      </svg>
    </motion.div>
  );
};

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

  return (
    <motion.div
      className="relative cursor-pointer group"
      style={{ perspective: 1200 }}
      variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
      transition={{ delay, duration: 0.6 }}
      onClick={() => setFlipped((prev) => !prev)}
    >
      {/* Animated border glow on hover */}
      <motion.div
        className="absolute -inset-[2px] rounded-2xl z-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500"
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
        {/* FRONT */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden" style={{ backfaceVisibility: "hidden" }}>
          <div className="relative w-full h-full min-h-[380px]">
            <img src={image} alt={title} className="w-full h-full object-cover" loading="lazy" width={640} height={640}/>
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(0 40% 10% / 0.7) 0%, transparent 50%)" }}/>
            <CardCorner pos="tl"/><CardCorner pos="tr"/><CardCorner pos="bl"/><CardCorner pos="br"/>
            <motion.div className="absolute bottom-0 left-0 right-0 p-6 text-center z-20">
              <motion.p className="font-display text-2xl" style={{ color: "hsl(43 72% 70%)" }}
                animate={{ textShadow: ["0 0 10px hsl(43 72% 55% / 0.4)", "0 0 25px hsl(43 72% 55% / 0.7)", "0 0 10px hsl(43 72% 55% / 0.4)"] }}
                transition={{ duration: 2.5, repeat: Infinity }}>{title}</motion.p>
              <motion.button
                className="mt-4 font-body text-xs md:text-sm uppercase tracking-[0.2em] px-6 py-3 rounded-full relative overflow-hidden group/btn"
                style={{ border: "1px solid hsl(43 72% 55%)", color: "hsl(43 72% 95%)", boxShadow: "0 4px 20px hsl(43 72% 55% / 0.5)", background: "linear-gradient(135deg, hsl(43 72% 55% / 0.1), hsl(43 72% 55% / 0))" }}
                whileHover={{ scale: 1.05, boxShadow: "0 8px 30px hsl(43 72% 55% / 0.8)" }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => { e.stopPropagation(); setFlipped(true); }}
              >
                <motion.div className="absolute inset-0 bg-gradient-to-r from-[hsl(43,72%,55%)] via-[hsl(43,72%,65%)] to-[hsl(43,72%,55%)] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 z-0"/>
                <span className="relative z-10 font-bold tracking-widest drop-shadow-sm flex items-center justify-center gap-2">
                  <motion.span animate={{ scale:[1,1.4,1], rotate: [0, 10, -10, 0] }} transition={{duration:1.5, repeat:Infinity}}>✨</motion.span>
                  Tap to view members
                  <motion.span animate={{ scale:[1,1.4,1], rotate: [0, -10, 10, 0] }} transition={{duration:1.5, repeat:Infinity}}>✨</motion.span>
                </span>
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* BACK - Members */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <div className="relative w-full h-full min-h-[380px] flex flex-col items-center justify-center p-6"
            style={{ background: "linear-gradient(145deg, hsl(0 30% 97% / 0.95), hsl(0 40% 94% / 0.92))", backdropFilter: "blur(10px)" }}>
            <CardCorner pos="tl"/><CardCorner pos="tr"/><CardCorner pos="bl"/><CardCorner pos="br"/>
            
            <motion.div className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(circle at 50% 30%, hsl(43 72% 55% / 0.12), transparent 70%)" }}
              animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }}/>

            <AnimatePresence>
              {flipped && (
                <>
                  <motion.p className="font-display text-xl mb-4 relative z-20" style={{ color: "hsl(43 72% 45%)" }}
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>{title}</motion.p>
                  <motion.div className="h-px w-20 mb-4 relative z-20"
                    style={{ background: "linear-gradient(90deg, transparent, hsl(43 72% 50%), transparent)" }}
                    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.4, duration: 0.5 }}/>

                  <div className="grid grid-cols-2 gap-3 w-full relative z-20">
                    {members.map((m, i) => (
                      <motion.div key={m.name}
                        className="relative rounded-xl p-3 text-center overflow-hidden group/card"
                        style={{
                          background: "linear-gradient(145deg, hsl(0 30% 97% / 0.9), hsl(0 35% 93% / 0.85))",
                          border: "1px solid hsl(43 72% 55% / 0.3)",
                          boxShadow: "0 4px 15px hsl(0 40% 30% / 0.08)",
                        }}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.12, type: "spring", stiffness: 200 }}
                        whileHover={{ scale: 1.05, boxShadow: "0 8px 25px hsl(43 72% 55% / 0.25)", border: "1px solid hsl(43 72% 55% / 0.6)" }}
                      >
                        {/* Hover border animation */}
                        <motion.div className="absolute -inset-[1px] rounded-xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
                          style={{ background: "linear-gradient(270deg, hsl(43 72% 55% / 0.5), hsl(340 50% 65% / 0.3), hsl(43 72% 55% / 0.5))", backgroundSize: "200% 200%" }}
                          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                          transition={{ duration: 3, repeat: Infinity }}/>

                        {/* Avatar with member pic */}
                        <motion.div
                          className="w-14 h-14 md:w-16 md:h-16 rounded-full mx-auto mb-2 overflow-hidden border-2 border-[hsl(43,72%,55%)] shadow-[0_0_15px_hsl(43,72%,55%/0.4)] relative z-10"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 2.5 + i * 0.2, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
                        >
                          <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=random&color=fff&size=128&bold=true`}
                            alt={m.name} className="w-full h-full object-cover"/>
                        </motion.div>

                        <p className="font-body text-[10px] uppercase tracking-[0.2em] relative z-10" style={{ color: "hsl(0 25% 50%)" }}>{m.relation}</p>
                        <motion.p className="font-decorative text-sm mt-1 relative z-10 leading-tight" style={{ color: "hsl(0 60% 25%)" }}
                          animate={{ textShadow: ["0 0 0px transparent", "0 0 6px hsl(43 72% 55% / 0.3)", "0 0 0px transparent"] }}
                          transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}>{m.name}</motion.p>
                      </motion.div>
                    ))}
                  </div>

                  <motion.p className="font-body text-xs mt-3 uppercase tracking-[0.25em] relative z-20"
                    style={{ color: "hsl(0 25% 55% / 0.7)" }}
                    animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}>
                    ✨ Tap to go back ✨
                  </motion.p>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SceneFamily = () => (
  <div className="relative z-10 flex flex-col items-center gap-10 max-w-6xl w-full mb-20 px-6">
    <motion.div className="flex flex-col items-center w-full"
      initial="hidden" whileInView="visible" viewport={{ once: true }}
      variants={{ visible: { transition: { staggerChildren: 0.15 } } }}>
      <PremiumHeading text="Our Families" fontSize="text-5xl md:text-7xl" simple={true}/>
      <motion.div className="h-px w-24 -mt-2 mb-8"
        style={{ background: "linear-gradient(90deg, transparent, hsl(43 72% 50%), transparent)" }}
        variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}/>
      <div className="grid md:grid-cols-2 gap-8 w-full">
        <FamilyFlipCard title="Bride's Family" image={brideFamilyImg} members={brideFamily} delay={0}/>
        <FamilyFlipCard title="Groom's Family" image={groomFamilyImg} members={groomFamily} delay={0.2}/>
      </div>
    </motion.div>
  </div>
);

export default SceneFamily;
