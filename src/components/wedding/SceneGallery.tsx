import { motion } from "framer-motion";
import GoldButton from "./GoldButton";
import mandalaImg from "@/assets/mandala.png";

interface Props { onNext: () => void; }

const placeholders = [
  { bg: "hsl(0 40% 85%)", label: "Pre-wedding" },
  { bg: "hsl(36 50% 85%)", label: "Engagement" },
  { bg: "hsl(15 50% 88%)", label: "Together" },
  { bg: "hsl(43 40% 85%)", label: "Celebrations" },
  { bg: "hsl(0 30% 82%)", label: "Memories" },
  { bg: "hsl(20 45% 86%)", label: "Love" },
];

const SceneGallery = ({ onNext }: Props) => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 py-16 overflow-hidden">
    <motion.div
      className="flex flex-col items-center gap-8 w-full max-w-3xl"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      <motion.h2
        className="font-display text-3xl md:text-4xl text-maroon"
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      >
        Our Gallery
      </motion.h2>

      <motion.div className="h-px w-20 bg-gold" variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }} />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
        {placeholders.map((p, i) => (
          <motion.div
            key={i}
            className="aspect-square rounded-sm overflow-hidden relative flex items-center justify-center border border-gold/20"
            style={{ background: p.bg }}
            variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
            whileHover={{ scale: 1.03 }}
          >
            <img src={mandalaImg} alt="" className="absolute opacity-10 w-3/4" loading="lazy" width={800} height={800} />
            <p className="font-decorative text-lg text-maroon/60 relative z-10">{p.label}</p>
          </motion.div>
        ))}
      </div>

      <motion.p className="font-body text-xs text-muted-foreground" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
        Add your precious moments here
      </motion.p>

      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
        <GoldButton onClick={onNext}>Countdown</GoldButton>
      </motion.div>
    </motion.div>
  </div>
);

export default SceneGallery;
