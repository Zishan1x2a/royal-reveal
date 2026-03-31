import { motion } from "framer-motion";

interface GoldButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const GoldButton = ({ children, onClick, className = "" }: GoldButtonProps) => (
  <motion.button
    onClick={onClick}
    className={`font-decorative text-lg tracking-widest uppercase px-10 py-4 rounded-sm border-2 border-gold text-gold bg-transparent
      hover:bg-gold hover:text-foreground transition-colors duration-500 ${className}`}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
  >
    {children}
  </motion.button>
);

export default GoldButton;
