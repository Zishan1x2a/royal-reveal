import { motion } from "framer-motion";
import GoldButton from "./GoldButton";
import floralCorner from "@/assets/floral-corner.png";

interface Props { onNext: () => void; }

const SceneEntrance = ({ onNext }: Props) => (
  <div className="relative flex min-h-screen flex-col items-center justify-center bg-cream px-6 py-12 text-center overflow-hidden">
    {/* Corner decorations */}
    <img src={floralCorner} alt="" className="absolute top-4 right-4 w-28 md:w-40 opacity-60" loading="lazy" width={512} height={512} />
    <img src={floralCorner} alt="" className="absolute bottom-4 left-4 w-28 md:w-40 opacity-60 rotate-180" loading="lazy" width={512} height={512} />

    <motion.div
      className="relative z-10 flex flex-col items-center gap-8 max-w-md"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.25 } } }}
    >
      <motion.div
        className="w-24 h-px bg-gold"
        variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
      />

      <motion.p
        className="font-decorative text-xl md:text-2xl text-maroon leading-relaxed"
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      >
        With the blessings of the Almighty and the joy of our families, we cordially invite you to celebrate the union of two souls.
      </motion.p>

      <motion.div
        className="flex items-center gap-4"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      >
        <div className="h-px w-12 bg-gold opacity-50" />
        <span className="text-gold text-2xl">✦</span>
        <div className="h-px w-12 bg-gold opacity-50" />
      </motion.div>

      <motion.p
        className="font-body text-sm text-muted-foreground tracking-wide"
        variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
      >
        An auspicious occasion awaits your gracious presence
      </motion.p>

      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
        <GoldButton onClick={onNext}>Continue</GoldButton>
      </motion.div>
    </motion.div>
  </div>
);

export default SceneEntrance;
