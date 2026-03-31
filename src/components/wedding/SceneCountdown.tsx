import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import GoldButton from "./GoldButton";
import SectionBackground from "./SectionBackground";

interface Props { onNext: () => void; }

const WEDDING_DATE = new Date("2026-12-15T19:00:00");

const useCountdown = () => {
  const [diff, setDiff] = useState(WEDDING_DATE.getTime() - Date.now());
  useEffect(() => {
    const id = setInterval(() => setDiff(WEDDING_DATE.getTime() - Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const d = Math.max(0, diff);
  return {
    days: Math.floor(d / 86400000),
    hours: Math.floor((d % 86400000) / 3600000),
    minutes: Math.floor((d % 3600000) / 60000),
    seconds: Math.floor((d % 60000) / 1000),
  };
};

const CountUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <motion.span
      key={value}
      className="font-display text-4xl md:text-6xl"
      style={{ color: "hsl(43 72% 45%)" }}
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {String(value).padStart(2, "0")}
    </motion.span>
    <span className="font-body text-[10px] uppercase tracking-[0.3em] mt-2" style={{ color: "hsl(0 25% 45%)" }}>{label}</span>
  </div>
);

const SceneCountdown = ({ onNext }: Props) => {
  const { days, hours, minutes, seconds } = useCountdown();

  return (
    <SectionBackground className="flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
      <motion.div
        className="relative z-10 flex flex-col items-center gap-8 max-w-lg"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        <motion.h2
          className="font-display text-3xl md:text-4xl"
          style={{ color: "hsl(0 60% 25%)" }}
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          Counting the Days
        </motion.h2>

        <motion.div className="h-px w-20" style={{ background: "hsl(43 72% 50%)" }} variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }} />

        <motion.div
          className="flex gap-6 md:gap-10"
          variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
        >
          <CountUnit value={days} label="Days" />
          <span className="font-display text-4xl md:text-6xl self-start" style={{ color: "hsl(43 72% 50% / 0.4)" }}>:</span>
          <CountUnit value={hours} label="Hours" />
          <span className="font-display text-4xl md:text-6xl self-start" style={{ color: "hsl(43 72% 50% / 0.4)" }}>:</span>
          <CountUnit value={minutes} label="Min" />
          <span className="font-display text-4xl md:text-6xl self-start" style={{ color: "hsl(43 72% 50% / 0.4)" }}>:</span>
          <CountUnit value={seconds} label="Sec" />
        </motion.div>

        <motion.div
          className="mt-4 space-y-3"
          variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
        >
          <p className="font-decorative text-xl italic" style={{ color: "hsl(0 40% 35%)" }}>
            "Two souls, one heart, one beautiful journey"
          </p>
          <p className="font-body text-sm" style={{ color: "hsl(0 25% 45%)" }}>
            Your blessings and presence would make our day truly special.
          </p>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <GoldButton onClick={onNext}>RSVP</GoldButton>
        </motion.div>
      </motion.div>
    </SectionBackground>
  );
};

export default SceneCountdown;
