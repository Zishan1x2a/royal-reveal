import { motion } from "framer-motion";
import GoldButton from "./GoldButton";
import SectionBackground from "./SectionBackground";

interface Props { onNext: () => void; }

/* Ornamental corner SVG */
const OrnamentCorner = ({ className = "" }: { className?: string }) => (
  <motion.svg
    className={`absolute w-10 h-10 ${className}`}
    viewBox="0 0 40 40"
    fill="none"
    animate={{ opacity: [0.5, 1, 0.5] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  >
    <path d="M2 38 Q2 2 38 2" stroke="hsl(43 72% 55%)" strokeWidth="1.5" fill="none" />
    <circle cx="4" cy="36" r="3" fill="hsl(43 72% 55%)" opacity="0.8" />
    <path d="M8 32 Q8 8 32 8" stroke="hsl(43 72% 55% / 0.4)" strokeWidth="1" fill="none" strokeDasharray="3 3" />
  </motion.svg>
);

/* Arch frame decorative element */
const ArchFrame = () => (
  <div className="relative w-48 h-56 mx-auto mb-4">
    {/* Arch shape */}
    <svg className="w-full h-full" viewBox="0 0 200 240" fill="none">
      {/* Outer arch */}
      <path
        d="M20 240 L20 100 Q20 20 100 20 Q180 20 180 100 L180 240"
        stroke="hsl(43 72% 55%)"
        strokeWidth="2"
        fill="none"
      />
      {/* Inner arch */}
      <path
        d="M30 240 L30 105 Q30 30 100 30 Q170 30 170 105 L170 240"
        stroke="hsl(43 72% 55% / 0.4)"
        strokeWidth="1"
        fill="none"
      />
      {/* Vertical lines inside */}
      <line x1="60" y1="240" x2="60" y2="130" stroke="hsl(43 72% 55% / 0.2)" strokeWidth="0.5" />
      <line x1="100" y1="240" x2="100" y2="50" stroke="hsl(43 72% 55% / 0.2)" strokeWidth="0.5" />
      <line x1="140" y1="240" x2="140" y2="130" stroke="hsl(43 72% 55% / 0.2)" strokeWidth="0.5" />
      {/* Decorative top */}
      <circle cx="100" cy="15" r="4" fill="hsl(43 72% 55%)" opacity="0.6" />
    </svg>
    {/* Glowing inner fill */}
    <motion.div
      className="absolute inset-[15%] rounded-t-full"
      style={{
        background: "radial-gradient(ellipse at center, hsl(43 72% 55% / 0.08) 0%, hsl(220 60% 15% / 0.4) 100%)",
      }}
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />
    {/* Sparkle inside arch */}
    <motion.div
      className="absolute top-1/3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
      style={{ background: "hsl(43 72% 65%)", boxShadow: "0 0 12px hsl(43 72% 55% / 0.6)" }}
      animate={{ scale: [0, 1.2, 0], opacity: [0, 1, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
    />
  </div>
);

/* Animated floating bell icon */
const BellIcon = ({ className = "" }: { className?: string }) => (
  <motion.svg
    className={`w-8 h-8 ${className}`}
    viewBox="0 0 32 32"
    fill="none"
    animate={{ rotate: [-5, 5, -5], y: [0, -3, 0] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
  >
    <path
      d="M16 4 C10 4 6 10 6 16 L6 22 L26 22 L26 16 C26 10 22 4 16 4Z"
      fill="hsl(43 72% 55% / 0.7)"
      stroke="hsl(43 72% 55%)"
      strokeWidth="1"
    />
    <circle cx="16" cy="26" r="3" fill="hsl(43 72% 55%)" />
    <line x1="16" y1="1" x2="16" y2="4" stroke="hsl(43 72% 55%)" strokeWidth="1.5" />
  </motion.svg>
);

interface FamilyCardProps {
  title: string;
  titleHindi: string;
  parents: string;
  side: "left" | "right";
}

const FamilyCard = ({ title, titleHindi, parents, side }: FamilyCardProps) => (
  <motion.div
    className="relative rounded-2xl p-8 pt-6 text-center"
    style={{
      background: "linear-gradient(180deg, hsl(220 50% 12% / 0.85) 0%, hsl(220 60% 8% / 0.9) 100%)",
      border: "1px solid hsl(43 72% 55% / 0.25)",
      backdropFilter: "blur(12px)",
      boxShadow: "0 8px 32px hsl(220 60% 5% / 0.4), inset 0 1px 0 hsl(43 72% 55% / 0.1)",
    }}
    variants={{
      hidden: { opacity: 0, x: side === "left" ? -40 : 40, scale: 0.95 },
      visible: { opacity: 1, x: 0, scale: 1 },
    }}
    transition={{ duration: 0.7 }}
    whileHover={{ scale: 1.02, boxShadow: "0 12px 40px hsl(43 72% 55% / 0.15)" }}
  >
    {/* Corner ornaments */}
    <OrnamentCorner className="top-2 left-2" />
    <OrnamentCorner className="top-2 right-2 -scale-x-100" />
    <OrnamentCorner className="bottom-2 left-2 -scale-y-100" />
    <OrnamentCorner className="bottom-2 right-2 -scale-x-100 -scale-y-100" />

    {/* Arch frame */}
    <ArchFrame />

    {/* Title */}
    <motion.p
      className="font-body text-xs uppercase tracking-[0.25em] mt-2"
      style={{ color: "hsl(43 72% 60%)" }}
      animate={{ textShadow: ["0 0 8px hsl(43 72% 55% / 0)", "0 0 8px hsl(43 72% 55% / 0.5)", "0 0 8px hsl(43 72% 55% / 0)"] }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      {title}
    </motion.p>

    {/* Hindi subtitle */}
    <p className="font-decorative text-sm mt-1" style={{ color: "hsl(43 72% 55% / 0.6)" }}>
      {titleHindi}
    </p>

    {/* Divider */}
    <motion.div
      className="mx-auto my-4 h-px w-3/4"
      style={{ background: "linear-gradient(90deg, transparent, hsl(43 72% 55% / 0.5), transparent)" }}
      animate={{ scaleX: [0.6, 1, 0.6] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* Parent names */}
    <motion.p
      className="font-decorative text-xl md:text-2xl"
      style={{ color: "hsl(40 50% 90%)" }}
      animate={{ textShadow: ["0 0 0px transparent", "0 0 10px hsl(43 72% 55% / 0.3)", "0 0 0px transparent"] }}
      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
    >
      {parents}
    </motion.p>

    {/* View details button */}
    <motion.button
      className="mt-6 mx-auto flex items-center gap-2 px-6 py-2.5 rounded-full font-body text-xs uppercase tracking-[0.2em]"
      style={{
        border: "1px solid hsl(43 72% 55% / 0.4)",
        color: "hsl(43 72% 60%)",
        background: "hsl(43 72% 55% / 0.05)",
      }}
      whileHover={{
        background: "hsl(43 72% 55% / 0.15)",
        borderColor: "hsl(43 72% 55% / 0.7)",
        boxShadow: "0 0 20px hsl(43 72% 55% / 0.2)",
      }}
      whileTap={{ scale: 0.97 }}
    >
      <motion.span
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        ✦
      </motion.span>
      View Family Details
    </motion.button>
  </motion.div>
);

const SceneFamily = ({ onNext }: Props) => (
  <SectionBackground className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
    <motion.div
      className="relative z-10 flex flex-col items-center gap-10 max-w-4xl w-full"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
    >
      {/* Title with bells */}
      <motion.div
        className="flex items-center gap-4"
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      >
        <BellIcon />
        <div className="text-center">
          <h2 className="font-display text-3xl md:text-5xl" style={{ color: "hsl(43 72% 60%)" }}>
            Our Families
          </h2>
          <p className="font-decorative text-base md:text-lg mt-1" style={{ color: "hsl(43 72% 55% / 0.5)" }}>
            हमारे परिवार
          </p>
        </div>
        <BellIcon />
      </motion.div>

      {/* Gold divider */}
      <motion.div
        className="h-px w-24"
        style={{ background: "linear-gradient(90deg, transparent, hsl(43 72% 55%), transparent)" }}
        variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
      />

      {/* Family cards */}
      <div className="grid md:grid-cols-2 gap-8 w-full">
        <FamilyCard
          title="The Groom's Family"
          titleHindi="वर पक्ष"
          parents="Shri Vikram & Smt. Anjali"
          side="left"
        />
        <FamilyCard
          title="The Bride's Family"
          titleHindi="वधू पक्ष"
          parents="Shri Ramesh & Smt. Sunita"
          side="right"
        />
      </div>

      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
        <GoldButton onClick={onNext}>View Gallery</GoldButton>
      </motion.div>
    </motion.div>
  </SectionBackground>
);

export default SceneFamily;
