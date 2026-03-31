import { motion } from "framer-motion";
import GoldButton from "./GoldButton";
import SectionBackground from "./SectionBackground";

interface Props { onNext: () => void; }

const blocks = [
  {
    title: "Pre-Wedding",
    events: [
      { icon: "🌿", name: "Haldi Ceremony", date: "13th Dec, 10:00 AM", venue: "Family Residence" },
      { icon: "🌸", name: "Mehendi", date: "13th Dec, 4:00 PM", venue: "Family Residence" },
    ],
  },
  {
    title: "Wedding Day",
    events: [
      { icon: "💍", name: "Wedding Ceremony", date: "15th Dec, 7:00 PM", venue: "The Grand Palace, Jaipur" },
      { icon: "🎊", name: "Varmala & Pheras", date: "15th Dec, 9:00 PM", venue: "The Grand Palace, Jaipur" },
    ],
  },
  {
    title: "Post-Wedding",
    events: [
      { icon: "🎉", name: "Reception", date: "16th Dec, 7:00 PM", venue: "The Grand Palace, Jaipur" },
      { icon: "🥂", name: "After Party", date: "16th Dec, 10:00 PM", venue: "The Grand Palace, Jaipur" },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const SceneEvents = ({ onNext }: Props) => (
  <SectionBackground className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
    <motion.div
      className="relative z-10 flex flex-col items-center gap-10 w-full max-w-4xl"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
    >
      <motion.h2
        className="font-display text-3xl md:text-4xl"
        style={{ color: "hsl(0 60% 25%)" }}
        variants={fadeUp}
      >
        Wedding Events
      </motion.h2>

      <motion.div
        className="h-px w-20"
        style={{ background: "hsl(43 72% 50%)" }}
        variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
      />

      {/* 3 Block layout */}
      <div className="grid gap-8 w-full md:grid-cols-3">
        {blocks.map((block, bi) => (
          <motion.div
            key={block.title}
            className="flex flex-col gap-4"
            variants={fadeUp}
            transition={{ delay: bi * 0.15 }}
          >
            <motion.div
              className="text-center py-2 rounded-sm"
              style={{ borderBottom: "2px solid hsl(43 72% 50% / 0.4)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + bi * 0.2 }}
            >
              <h3 className="font-decorative text-lg tracking-widest uppercase" style={{ color: "hsl(43 72% 50%)" }}>{block.title}</h3>
            </motion.div>

            {block.events.map((e, ei) => (
              <motion.div
                key={e.name}
                className="rounded-sm p-5 text-center shadow-lg"
                style={{
                  border: "1px solid hsl(43 72% 50% / 0.3)",
                  background: "hsl(0 30% 97% / 0.8)",
                  backdropFilter: "blur(8px)",
                }}
                variants={fadeUp}
                transition={{ delay: bi * 0.15 + ei * 0.1 }}
                whileHover={{ scale: 1.03, boxShadow: "0 8px 30px hsl(43 72% 55% / 0.15)" }}
              >
                <span className="text-3xl">{e.icon}</span>
                <h4 className="font-display text-lg mt-2" style={{ color: "hsl(0 60% 25%)" }}>{e.name}</h4>
                <p className="font-decorative text-base mt-1" style={{ color: "hsl(43 72% 45%)" }}>{e.date}</p>
                <p className="font-body text-xs mt-1" style={{ color: "hsl(0 25% 45%)" }}>{e.venue}</p>
              </motion.div>
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
