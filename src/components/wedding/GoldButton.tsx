import { motion } from "framer-motion";

interface GoldButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const GoldButton = ({ children, onClick, className = "" }: GoldButtonProps) => (
  <motion.button
    onClick={onClick}
    className={`relative overflow-hidden font-decorative text-lg tracking-widest uppercase px-12 py-4 rounded-full border border-[hsl(43,72%,55%)] text-[hsl(43,72%,55%)] bg-[hsl(43,72%,55%/0.05)] shadow-[0_0_15px_hsl(43,72%,55%/0.2)] group ${className}`}
    whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(43 72% 55% / 0.6)", textShadow: "0 0 8px hsl(43 72% 55% / 0.8)", borderColor: "hsl(43 72% 65%)" }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    <motion.div 
      className="absolute inset-0 bg-gradient-to-r from-[hsl(43,72%,55%)] via-[hsl(43,72%,65%)] to-[hsl(43,72%,55%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" 
    />
    <motion.div 
      className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 group-hover:animate-[shimmer_2s_infinite]" 
    />
    <span className="relative z-10 font-bold group-hover:text-[hsl(0,0%,15%)] transition-colors duration-500">{children}</span>
  </motion.button>
);

export default GoldButton;
