import { motion } from "framer-motion";
import GoldButton from "./GoldButton";

interface Props { onNext: () => void; }

const events = [
  { icon: "🌿", name: "Haldi Ceremony", date: "13th Dec, 10:00 AM", venue: "Family Residence" },
  { icon: "🌸", name: "Mehendi", date: "13th Dec, 4:00 PM", venue: "Family Residence" },
  { icon: "💍", name: "Wedding Ceremony", date: "15th Dec, 7:00 PM", venue: "The Grand Palace, Jaipur" },
  { icon: "🎉", name: "Reception", date: "16th Dec, 7:00 PM", venue: "The Grand Palace, Jaipur" },
];

const SceneEvents = ({ onNext }: Props) => (
  <div className="relative flex min-h-screen flex-col items-center justify-center bg-cream px-6 py-16 overflow-hidden">
    <motion.div
      className="relative z-10 flex flex-col items-center gap-8 w-full max-w-2xl"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
    >
      <motion.h2
        className="font-display text-3xl md:text-4xl text-maroon"
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      >
        Wedding Events
      </motion.h2>

      <motion.div
        className="h-px w-20 bg-gold"
        variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
      />

      <div className="grid gap-5 w-full md:grid-cols-2">
        {events.map((e, i) => (
          <motion.div
            key={e.name}
            className="rounded-sm border border-gold/30 bg-ivory p-6 text-center shadow-gold"
            variants={{ hidden: { opacity: 0, y: 30, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1 } }}
            transition={{ delay: i * 0.1 }}
          >
            <span className="text-3xl">{e.icon}</span>
            <h3 className="font-display text-xl text-maroon mt-3">{e.name}</h3>
            <p className="font-decorative text-lg text-gold mt-2">{e.date}</p>
            <p className="font-body text-xs text-muted-foreground mt-1">{e.venue}</p>
          </motion.div>
        ))}
      </div>

      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
        <GoldButton onClick={onNext}>Meet the Families</GoldButton>
      </motion.div>
    </motion.div>
  </div>
);

export default SceneEvents;
