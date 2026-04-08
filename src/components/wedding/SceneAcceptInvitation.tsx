import { motion } from "framer-motion";
import { useState } from "react";
import GoldButton from "./GoldButton";
import SectionBackground from "./SectionBackground";
import PremiumHeading from "./PremiumHeading";

interface Props { onNext: () => void; guestName: string; }

const CardCorner = ({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) => {
  const rotation = { tl: 0, tr: 90, br: 180, bl: 270 }[pos];
  const placement = { tl: "top-0 left-0", tr: "top-0 right-0", bl: "bottom-0 left-0", br: "bottom-0 right-0" }[pos];
  return (
    <motion.div className={`absolute w-10 h-10 md:w-14 md:h-14 ${placement} pointer-events-none z-20`}
      style={{ transform: `rotate(${rotation}deg)` }}>
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <motion.path d="M2,2 L15,2 C25,2 38,15 38,25 L38,38" stroke="#D4AF37" strokeWidth="1.5" fill="none"
          animate={{ pathLength: [0, 1, 0.6, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}/>
        <motion.path d="M2,2 L2,15 C2,25 15,38 25,38 L38,38" stroke="#D4AF37" strokeWidth="1.5" fill="none"
          animate={{ pathLength: [0, 1, 0.6, 1] }} transition={{ duration: 4, delay: 0.2, repeat: Infinity, ease: "easeInOut" }}/>
        <motion.circle cx="2" cy="2" r="2" fill="#D4AF37"
          animate={{ scale: [1, 1.8, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}/>
      </svg>
    </motion.div>
  );
};

const SceneAcceptInvitation = ({ onNext, guestName }: Props) => {
  const [accepted, setAccepted] = useState(false);
  const [attending, setAttending] = useState<"yes" | "no" | "maybe" | null>(null);

  const options = [
    { value: "yes" as const, label: "Joyfully Accept", icon: "🎉", desc: "We will be there!" },
    { value: "maybe" as const, label: "Maybe", icon: "🤔", desc: "Will confirm soon" },
    { value: "no" as const, label: "Regretfully Decline", icon: "💐", desc: "Sending blessings" },
  ];

  return (
    <SectionBackground className="flex min-h-screen flex-col items-center justify-center px-4 py-20 text-center relative">
      <motion.div className="relative z-10 flex flex-col items-center gap-8 max-w-lg w-full"
        initial="hidden" animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}>
        
        <motion.div className="flex flex-col items-center gap-3"
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}>
          <PremiumHeading text="Accept Invitation" fontSize="text-3xl md:text-5xl"/>
          <motion.div className="h-px w-24 -mt-2"
            style={{ background: "linear-gradient(90deg, transparent, hsl(43 72% 50%), transparent)" }}
            variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}/>
          <motion.p className="font-decorative text-lg italic mt-2" style={{ color: "hsl(0 40% 35%)" }}>
            {guestName ? `Dear ${guestName},` : "Dear Guest,"} will you join us on our special day?
          </motion.p>
        </motion.div>

        {!accepted ? (
          <motion.div className="w-full grid grid-cols-1 gap-4"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
            {options.map((opt, i) => (
              <motion.button key={opt.value}
                className={`relative group rounded-2xl p-5 text-left overflow-hidden cursor-pointer transition-all duration-500 ${attending === opt.value ? "ring-2 ring-[#D4AF37]" : ""}`}
                style={{
                  background: attending === opt.value
                    ? "linear-gradient(135deg, hsl(43 72% 95%), hsl(43 60% 90%))"
                    : "linear-gradient(135deg, hsl(0 30% 97% / 0.9), hsl(0 40% 94% / 0.85))",
                  border: "1px solid hsl(43 72% 55% / 0.3)",
                  boxShadow: "0 4px 20px hsl(0 40% 30% / 0.08)",
                }}
                initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.15, type: "spring", stiffness: 150 }}
                whileHover={{ scale: 1.03, boxShadow: "0 8px 30px hsl(43 72% 55% / 0.25)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setAttending(opt.value)}
              >
                {/* Animated border on hover */}
                <motion.div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "linear-gradient(270deg, hsl(43 72% 55% / 0.5), hsl(340 50% 65% / 0.3), hsl(43 72% 55% / 0.5))", backgroundSize: "200% 200%" }}
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 3, repeat: Infinity }}/>
                <CardCorner pos="tl"/><CardCorner pos="tr"/><CardCorner pos="bl"/><CardCorner pos="br"/>
                
                {/* Shimmer */}
                <motion.div className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(105deg, transparent 40%, hsl(43 72% 70% / 0.15) 50%, transparent 60%)" }}
                  animate={{ x: ["-100%", "200%"] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}/>

                <div className="relative z-10 flex items-center gap-4">
                  <motion.span className="text-3xl"
                    animate={attending === opt.value ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] } : {}}
                    transition={{ duration: 1, repeat: attending === opt.value ? Infinity : 0 }}>
                    {opt.icon}
                  </motion.span>
                  <div>
                    <p className="font-display text-lg" style={{ color: "hsl(0 60% 25%)" }}>{opt.label}</p>
                    <p className="font-body text-xs mt-0.5" style={{ color: "hsl(0 25% 50%)" }}>{opt.desc}</p>
                  </div>
                  {attending === opt.value && (
                    <motion.span className="ml-auto text-2xl" initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}>✓</motion.span>
                  )}
                </div>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          <motion.div className="relative rounded-2xl p-8 text-center overflow-hidden"
            style={{ background: "linear-gradient(135deg, hsl(0 30% 97% / 0.9), hsl(0 40% 94% / 0.85))", border: "1px solid hsl(43 72% 55% / 0.4)" }}
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 15 }}>
            <CardCorner pos="tl"/><CardCorner pos="tr"/><CardCorner pos="bl"/><CardCorner pos="br"/>
            <motion.div className="text-5xl mb-3"
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: 2 }}>
              {attending === "yes" ? "🎊" : attending === "maybe" ? "💫" : "💐"}
            </motion.div>
            <p className="font-display text-2xl" style={{ color: "hsl(0 60% 25%)" }}>
              {attending === "yes" ? "We're excited to see you!" : attending === "maybe" ? "We hope you can make it!" : "We'll miss you! Thank you for your blessings."}
            </p>
            <p className="font-decorative text-base italic mt-2" style={{ color: "hsl(0 40% 40%)" }}>
              {guestName ? `Thank you, ${guestName}!` : "Thank you!"}
            </p>
          </motion.div>
        )}

        {!accepted && attending && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <GoldButton onClick={() => setAccepted(true)}>Confirm Response</GoldButton>
          </motion.div>
        )}

        {accepted && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <GoldButton onClick={onNext}>Get In Touch</GoldButton>
          </motion.div>
        )}
      </motion.div>
    </SectionBackground>
  );
};

export default SceneAcceptInvitation;
