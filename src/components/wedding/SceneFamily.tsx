import { motion } from "framer-motion";
import GoldButton from "./GoldButton";
import SectionBackground from "./SectionBackground";

interface Props { onNext: () => void; }

const brideFamily = [
  { relation: "Father of the Bride", name: "Shri Ramesh Sharma" },
  { relation: "Mother of the Bride", name: "Smt. Sunita Sharma" },
];
const groomFamily = [
  { relation: "Father of the Groom", name: "Shri Vikram Mehta" },
  { relation: "Mother of the Groom", name: "Smt. Anjali Mehta" },
];

const FamilyCard = ({ relation, name }: { relation: string; name: string }) => (
  <motion.div
    className="text-center py-3"
    variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
  >
    <p className="font-body text-xs uppercase tracking-[0.2em]" style={{ color: "hsl(0 25% 45%)" }}>{relation}</p>
    <p className="font-decorative text-xl mt-1" style={{ color: "hsl(0 60% 25%)" }}>{name}</p>
  </motion.div>
);

const SceneFamily = ({ onNext }: Props) => (
  <SectionBackground className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
    <motion.div
      className="relative z-10 flex flex-col items-center gap-8 max-w-2xl w-full"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
    >
      <motion.h2
        className="font-display text-3xl md:text-4xl"
        style={{ color: "hsl(0 60% 25%)" }}
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      >
        Our Families
      </motion.h2>

      <motion.div className="h-px w-20" style={{ background: "hsl(43 72% 50%)" }} variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }} />

      <div className="grid md:grid-cols-2 gap-10 w-full">
        <motion.div
          className="rounded-sm p-8 text-center"
          style={{ border: "1px solid hsl(43 72% 50% / 0.3)", background: "hsl(0 30% 97% / 0.8)", backdropFilter: "blur(8px)" }}
          variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } }}
        >
          <p className="font-display text-lg mb-4" style={{ color: "hsl(43 72% 45%)" }}>Bride's Family</p>
          {brideFamily.map((f) => <FamilyCard key={f.name} {...f} />)}
        </motion.div>

        <motion.div
          className="rounded-sm p-8 text-center"
          style={{ border: "1px solid hsl(43 72% 50% / 0.3)", background: "hsl(0 30% 97% / 0.8)", backdropFilter: "blur(8px)" }}
          variants={{ hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0 } }}
        >
          <p className="font-display text-lg mb-4" style={{ color: "hsl(43 72% 45%)" }}>Groom's Family</p>
          {groomFamily.map((f) => <FamilyCard key={f.name} {...f} />)}
        </motion.div>
      </div>

      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
        <GoldButton onClick={onNext}>View Gallery</GoldButton>
      </motion.div>
    </motion.div>
  </SectionBackground>
);

export default SceneFamily;
