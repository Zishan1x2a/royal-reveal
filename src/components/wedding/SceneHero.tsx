import { motion } from "framer-motion";
import GoldButton from "./GoldButton";
import mandalaImg from "@/assets/mandala.png";

interface Props { onNext: () => void; }

const SceneHero = ({ onNext }: Props) => (
  <div className="relative flex min-h-screen flex-col items-center justify-center bg-ivory px-6 py-12 text-center overflow-hidden">
    {/* Background mandala */}
    <motion.img
      src={mandalaImg}
      alt=""
      className="absolute opacity-10"
      style={{ width: "80vmin", height: "80vmin" }}
      animate={{ rotate: 360 }}
      transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      loading="lazy"
      width={800}
      height={800}
    />

    <motion.div
      className="relative z-10 flex flex-col items-center gap-6 max-w-lg"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
    >
      <motion.p
        className="font-body text-xs uppercase tracking-[0.4em] text-muted-foreground"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      >
        Together with their families
      </motion.p>

      <motion.h2
        className="font-display text-5xl md:text-7xl font-bold text-maroon"
        variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
      >
        Priya
      </motion.h2>

      <motion.div
        className="flex items-center gap-4"
        variants={{ hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1 } }}
      >
        <div className="h-px w-16 bg-gold" />
        <span className="font-decorative text-3xl text-gold">&</span>
        <div className="h-px w-16 bg-gold" />
      </motion.div>

      <motion.h2
        className="font-display text-5xl md:text-7xl font-bold text-maroon"
        variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
      >
        Arjun
      </motion.h2>

      <motion.div
        className="mt-4 space-y-1"
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      >
        <p className="font-decorative text-2xl text-gold">15th December 2026</p>
        <p className="font-body text-sm text-muted-foreground">The Grand Palace, Jaipur</p>
      </motion.div>

      <motion.div
        className="mt-6"
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      >
        <GoldButton onClick={onNext}>View Events</GoldButton>
      </motion.div>
    </motion.div>
  </div>
);

export default SceneHero;
