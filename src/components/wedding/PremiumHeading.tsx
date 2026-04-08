import { motion } from "framer-motion";

interface PremiumHeadingProps {
  text: string;
  className?: string;
  delay?: number;
  fontSize?: string; // e.g., "text-4xl md:text-6xl"
  simple?: boolean;
}

const PremiumHeading = ({ text, className = "", delay = 0, fontSize = "text-4xl md:text-6xl", simple = false }: PremiumHeadingProps) => {
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
      },
    },
  };

  const childVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      rotateX: -90,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100
      }
    },
  };

  return (
    <motion.div
      className={`relative flex flex-wrap justify-center gap-x-[0.3em] gap-y-2 py-4 ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* Background Glow */}
      {!simple && (
        <motion.div
          className="absolute inset-0 -z-10 blur-3xl opacity-30 pointer-events-none"
          style={{ background: "radial-gradient(circle, #D4AF37 0%, transparent 70%)" }}
          animate={{ 
            scale: [0.8, 1.2, 0.8],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {words.map((word, wordIdx) => (
        <motion.span
          key={wordIdx}
          className="inline-flex overflow-hidden"
          style={{ perspective: "1000px" }}
        >
          {word.split("").map((char, charIdx) => (
            <motion.span
              key={charIdx}
              className={`${fontSize} font-display font-bold relative inline-block`}
              variants={childVariants}
              style={{
                color: "#7A1E2C",
                textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                WebkitTextFillColor: "transparent",
                backgroundImage: "linear-gradient(135deg, #7A1E2C 30%, #D4AF37 50%, #7A1E2C 70%)",
                backgroundSize: "200% auto",
                backgroundClip: "text",
              }}
              animate={{
                backgroundPosition: ["0% center", "200% center"],
              }}
              transition={{
                backgroundPosition: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      ))}

      {/* Decorative Sparkles */}
      {!simple && [...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#D4AF37] rounded-full blur-[1px]"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.7,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
};

export default PremiumHeading;
