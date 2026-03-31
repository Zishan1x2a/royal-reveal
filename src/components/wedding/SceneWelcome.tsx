import { motion } from "framer-motion";
import ganeshImg from "@/assets/ganesh.png";
import GoldButton from "./GoldButton";

interface Props {
  onNext: () => void;
}

const SceneWelcome = ({ onNext }: Props) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ivory px-6 py-12 text-center relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-divine)" }} />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-6 max-w-lg"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
      >
        {/* Ganesh Ji */}
        <motion.img
          src={ganeshImg}
          alt="Lord Ganesha"
          width={180}
          height={210}
          className="animate-float drop-shadow-lg"
          style={{ filter: "drop-shadow(0 0 20px hsl(43 72% 55% / 0.4))" }}
          variants={{ hidden: { opacity: 0, scale: 0.7 }, visible: { opacity: 1, scale: 1 } }}
          transition={{ duration: 1 }}
        />

        {/* Mantra */}
        <motion.p
          className="font-decorative text-2xl md:text-3xl text-gold tracking-wide"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          ॐ श्री गणेशाय नमः
        </motion.p>

        {/* Divider */}
        <motion.div
          className="h-px w-32 bg-gold opacity-40"
          variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
        />

        {/* Guest greeting */}
        <motion.p
          className="font-body text-sm uppercase tracking-[0.3em] text-muted-foreground"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        >
          Dear Guest
        </motion.p>

        {/* Couple names */}
        <motion.h1
          className="font-display text-4xl md:text-6xl font-bold text-maroon leading-tight"
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
        >
          Priya <span className="text-gold font-decorative font-light text-3xl md:text-5xl">&</span> Arjun
        </motion.h1>

        {/* Sanskrit shloka */}
        <motion.div
          className="space-y-1"
          variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
        >
          <p className="font-decorative text-lg text-maroon-light italic">
            मांगल्यं तंतुनानेन मम जीवन हेतुना
          </p>
          <p className="font-body text-xs text-muted-foreground tracking-wide">
            "This sacred thread binds our lives together for eternity"
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-6"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          <GoldButton onClick={onNext}>Open Invitation</GoldButton>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SceneWelcome;
