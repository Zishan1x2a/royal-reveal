import { motion, AnimatePresence } from "framer-motion";
import mandalaImg from "@/assets/mandala.png";

interface DoorTransitionProps {
  isOpen: boolean;
  onComplete?: () => void;
}

const DoorTransition = ({ isOpen, onComplete }: DoorTransitionProps) => {
  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isOpen && (
        <motion.div 
          className="fixed inset-0 z-[100] pointer-events-none flex"
          style={{ perspective: "2500px" }}
          initial={{ scale: 1 }}
          animate={{ scale: 1 }}
          exit={{ 
            scale: 1.6,
            opacity: [1, 1, 0],
            transition: { duration: 2.2, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          {/* Left door */}
          <motion.div
            className="relative h-full w-1/2 pointer-events-auto border-r-[3px] border-[#D4AF37] overflow-hidden"
            style={{ 
              transformOrigin: "left center",
              background: "linear-gradient(to right, #1A050A, #4A0E17, #7A1E2C)",
              boxShadow: "inset -30px 0 80px rgba(0,0,0,0.9), 30px 0 60px rgba(0,0,0,0.8)"
            }}
            initial={{ rotateY: 0, x: 0 }}
            animate={{ rotateY: 0, x: 0 }}
            exit={{ 
              rotateY: 130, // Extremely wide cinematic swing
              x: "-40%", // Sideways slide
              transition: { duration: 2, ease: [0.76, 0, 0.24, 1] } 
            }}
          >
            {/* Romantic Ambient Glow */}
            <motion.div 
               className="absolute inset-0 bg-gradient-to-tr from-[#E91E63]/20 to-transparent mix-blend-screen"
               animate={{ opacity: [0.3, 0.7, 0.3] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Fine Texture Base */}
            <div 
              className="absolute inset-0 opacity-20 mix-blend-color-dodge" 
              style={{ 
                backgroundImage: `url(${mandalaImg})`, 
                backgroundSize: '400px',
                backgroundPosition: 'left center'
              }} 
            />

            {/* High-Level Intricate Haveli Panels */}
            <div className="absolute inset-3 sm:inset-8 bottom-28 sm:bottom-36 border-[3px] border-[#D4AF37]/60 rounded-t-[100px] sm:rounded-t-[150px] shadow-[0_0_20px_rgba(212,175,55,0.4)] pointer-events-none overflow-hidden flex flex-col justify-end" style={{ background: "linear-gradient(to bottom, rgba(212,175,55,0.15), rgba(26,5,10,0.8))" }}>
               {/* Inner rotating dashed border for luxury feel */}
               <motion.div 
                 className="absolute inset-4 sm:inset-6 border-[1.5px] border-[#D4AF37]/70 rounded-t-[90px] sm:rounded-t-[130px] border-dashed"
               />
               {/* Solid inner core */}
               <div className="absolute inset-8 sm:inset-12 border-2 border-[#D4AF37]/40 rounded-t-[80px] sm:rounded-t-[110px] bg-gradient-to-t from-[#D4AF37]/10 to-transparent" />
            </div>

            {/* Majestic Lower Panel Component */}
            <div className="absolute left-3 right-3 sm:left-8 sm:right-8 bottom-3 sm:bottom-6 h-20 sm:h-24 border-[3px] border-[#D4AF37]/60 rounded-md pointer-events-none shadow-[0_0_20px_rgba(212,175,55,0.4)]" style={{ background: "linear-gradient(to top, rgba(212,175,55,0.15), rgba(26,5,10,0.8))" }}>
               <div className="absolute inset-3 border-[1.5px] border-[#D4AF37]/80 border-dashed rounded-sm" />
            </div>
            
            <div className="absolute right-0 top-0 h-full w-48 opacity-50"
              style={{ background: "linear-gradient(90deg, transparent, #D4AF37)" }} />
              
            {/* Blazing Glowing Core Mandala */}
            <img src={mandalaImg} alt="Mandala" className="absolute top-1/2 -right-[150px] sm:-right-[250px] w-[300px] sm:w-[500px] -translate-y-1/2 opacity-70 pointer-events-none drop-shadow-[0_0_40px_rgba(255,215,0,0.9)] mix-blend-screen filter brightness-125" />

            {/* Oversized 3D Glowing Handle */}
            <motion.div 
               className="absolute right-5 sm:right-10 top-1/2 -translate-y-1/2 h-36 sm:h-56 w-6 sm:w-8 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.9),inset_0_4px_10px_rgba(255,255,255,0.6)] flex flex-col items-center justify-between py-3 p-[3px] z-20"
               style={{ background: "linear-gradient(to right, #A97C25, #F9D976, #D4AF37, #A97C25)" }}
               animate={{ boxShadow: ["0 15px 40px rgba(0,0,0,0.9), 0 0 15px rgba(255,215,0,0.3)", "0 15px 40px rgba(0,0,0,0.9), 0 0 40px rgba(255,215,0,0.8)", "0 15px 40px rgba(0,0,0,0.9), 0 0 15px rgba(255,215,0,0.3)"] }}
               transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#1A050A] shadow-[inset_0_2px_5px_black]" />
              <div className="w-full h-full my-2 rounded-full border border-[#FFF6E8]/70 bg-gradient-to-b from-transparent via-[#FFF6E8]/50 to-transparent" />
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#1A050A] shadow-[inset_0_2px_5px_black]" />
            </motion.div>
          </motion.div>

          {/* Right door */}
          <motion.div
            className="relative h-full w-1/2 pointer-events-auto border-l-[3px] border-[#D4AF37] overflow-hidden"
            style={{ 
              transformOrigin: "right center",
              background: "linear-gradient(to left, #1A050A, #4A0E17, #7A1E2C)",
              boxShadow: "inset 30px 0 80px rgba(0,0,0,0.9), -30px 0 60px rgba(0,0,0,0.8)"
            }}
            initial={{ rotateY: 0, x: 0 }}
            animate={{ rotateY: 0, x: 0 }}
            exit={{ 
              rotateY: -130, // Extremely wide cinematic swing
              x: "40%", // Sideways slide
              transition: { duration: 2, ease: [0.76, 0, 0.24, 1] } 
            }}
          >
            {/* Romantic Ambient Glow */}
             <motion.div 
               className="absolute inset-0 bg-gradient-to-tl from-[#E91E63]/20 to-transparent mix-blend-screen"
               animate={{ opacity: [0.3, 0.7, 0.3] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Fine Texture Base */}
            <div 
              className="absolute inset-0 opacity-20 mix-blend-color-dodge" 
              style={{ 
                backgroundImage: `url(${mandalaImg})`, 
                backgroundSize: '400px',
                backgroundPosition: 'right center'
              }} 
            />

            {/* High-Level Intricate Haveli Panels */}
            <div className="absolute inset-3 sm:inset-8 bottom-28 sm:bottom-36 border-[3px] border-[#D4AF37]/60 rounded-t-[100px] sm:rounded-t-[150px] shadow-[0_0_20px_rgba(212,175,55,0.4)] pointer-events-none overflow-hidden flex flex-col justify-end" style={{ background: "linear-gradient(to bottom, rgba(212,175,55,0.15), rgba(26,5,10,0.8))" }}>
               {/* Inner rotating dashed border for luxury feel */}
               <motion.div 
                 className="absolute inset-4 sm:inset-6 border-[1.5px] border-[#D4AF37]/70 rounded-t-[90px] sm:rounded-t-[130px] border-dashed"
               />
               {/* Solid inner core */}
               <div className="absolute inset-8 sm:inset-12 border-2 border-[#D4AF37]/40 rounded-t-[80px] sm:rounded-t-[110px] bg-gradient-to-t from-[#D4AF37]/10 to-transparent" />
            </div>

            {/* Majestic Lower Panel Component */}
            <div className="absolute left-3 right-3 sm:left-8 sm:right-8 bottom-3 sm:bottom-6 h-20 sm:h-24 border-[3px] border-[#D4AF37]/60 rounded-md pointer-events-none shadow-[0_0_20px_rgba(212,175,55,0.4)]" style={{ background: "linear-gradient(to top, rgba(212,175,55,0.15), rgba(26,5,10,0.8))" }}>
               <div className="absolute inset-3 border-[1.5px] border-[#D4AF37]/80 border-dashed rounded-sm" />
            </div>
            
            <div className="absolute left-0 top-0 h-full w-48 opacity-50"
              style={{ background: "linear-gradient(270deg, transparent, #D4AF37)" }} />
              
            {/* Blazing Glowing Core Mandala */}
            <img src={mandalaImg} alt="Mandala" className="absolute top-1/2 -left-[150px] sm:-left-[250px] w-[300px] sm:w-[500px] -translate-y-1/2 opacity-70 pointer-events-none drop-shadow-[0_0_40px_rgba(255,215,0,0.9)] mix-blend-screen filter brightness-125" />

             {/* Oversized 3D Glowing Handle */}
             <motion.div 
               className="absolute left-5 sm:left-10 top-1/2 -translate-y-1/2 h-36 sm:h-56 w-6 sm:w-8 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.9),inset_0_4px_10px_rgba(255,255,255,0.6)] flex flex-col items-center justify-between py-3 p-[3px] z-20"
               style={{ background: "linear-gradient(to left, #A97C25, #F9D976, #D4AF37, #A97C25)" }}
               animate={{ boxShadow: ["0 15px 40px rgba(0,0,0,0.9), 0 0 15px rgba(255,215,0,0.3)", "0 15px 40px rgba(0,0,0,0.9), 0 0 40px rgba(255,215,0,0.8)", "0 15px 40px rgba(0,0,0,0.9), 0 0 15px rgba(255,215,0,0.3)"] }}
               transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#1A050A] shadow-[inset_0_2px_5px_black]" />
              <div className="w-full h-full my-2 rounded-full border border-[#FFF6E8]/70 bg-gradient-to-b from-transparent via-[#FFF6E8]/50 to-transparent" />
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#1A050A] shadow-[inset_0_2px_5px_black]" />
            </motion.div>
          </motion.div>
          
          {/* Awe-Inspiring Romantic Flash + God Rays upon entering! */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-[#D4AF37] via-[#FFF6E8] to-[#E91E63] mix-blend-screen pointer-events-none z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            exit={{ 
              opacity: [0, 0.9, 0], 
              scale: [1, 1.2],
              transition: { duration: 1.8, delay: 0.1, ease: "easeOut" } 
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DoorTransition;
