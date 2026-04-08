import { motion } from "framer-motion";

interface GoldButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const GoldButton = ({ children, onClick, className = "" }: GoldButtonProps) => (
  <div className={`relative flex items-center justify-center rounded-full ${className}`}>
    {/* Ultra-Animated glowing backdrop shadow */}
    <motion.div
      className="absolute inset-0 rounded-full bg-[#fca2c8] opacity-30 blur-2xl pointer-events-none"
      animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.5, 0.2] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* The Outer Animated Border Container */}
    <motion.div 
      className="relative p-[4px] rounded-full overflow-hidden flex items-center justify-center group"
      animate={{ y: [-5, 5, -5] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* First Rotating Conic Beam */}
      <motion.div
        className="absolute w-[200%] h-[200%]"
        style={{ background: "conic-gradient(from 0deg, transparent 0%, transparent 35%, #F9D976 45%, #D4AF37 50%, transparent 55%)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Second Counter-Rotating Conic Beam */}
      <motion.div
        className="absolute w-[200%] h-[200%]"
        style={{ background: "conic-gradient(from 180deg, transparent 0%, transparent 35%, #D4AF37 45%, #F9D976 50%, transparent 55%)" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
      />
      
      {/* The Core Button: Halka Light Pink Liquid Gradient */}
      <motion.button
        onClick={onClick}
        className="relative z-10 font-decorative text-lg tracking-[0.2em] uppercase px-10 py-4 md:px-14 md:py-[18px] rounded-full overflow-hidden shadow-inner cursor-pointer"
        style={{ 
          background: "linear-gradient(45deg, hsl(335 85% 93%), hsl(330 95% 98%), hsl(335 80% 88%))",
          backgroundSize: "200% 200%",
          boxShadow: "0 10px 30px rgba(212,175,55,0.3), inset 0 5px 10px rgba(255,255,255,0.9), inset 0 -3px 8px rgba(0,0,0,0.05)" 
        }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255,105,180,0.5), inset 0 5px 15px rgba(255,255,255,1)" }}
        whileTap={{ scale: 0.92 }}
      >
        {/* Shimmering glass sweep */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-12"
          style={{ width: "50%" }}
          animate={{ left: ["-100%", "250%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
        />

        {/* Text: High contrast deep burgundy/maroon for perfect readability */}
        <span className="relative z-20 font-bold text-[#5D163D] transition-colors duration-500 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
           {children}
        </span>
        
        {/* Floating sparkling pink/gold particles inside the button */}
        {[...Array(3)].map((_, i) => (
           <motion.div
             key={`btn-star-${i}`}
             className="absolute w-2 h-2 rounded-full blur-[1px] pointer-events-none z-10"
             style={{ background: "radial-gradient(circle, #fff, #F9D976)" }}
             animate={{ 
                opacity: [0, 1, 0],
                scale: [0.5, 1.5, 0.5],
                x: [(i%3===0?-60:i%3===1?0:60), (i%3===0?60:i%3===1?-60:0)],
                y: [10, -30]
             }}
             transition={{ duration: 2.5 + i, repeat: Infinity, delay: i * 0.7 }}
           />
        ))}
      </motion.button>
    </motion.div>
  </div>
);

export default GoldButton;
