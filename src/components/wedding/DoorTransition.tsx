import { motion, AnimatePresence } from "framer-motion";

interface DoorTransitionProps {
  isOpen: boolean;
  onComplete?: () => void;
}

const DoorTransition = ({ isOpen, onComplete }: DoorTransitionProps) => {
  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isOpen && (
        <>
          {/* Left door */}
          <motion.div
            className="fixed inset-y-0 left-0 z-[100] w-1/2 gradient-royal"
            initial={{ x: 0 }}
            animate={{ x: 0 }}
            exit={{ x: "-100%", transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }}
            style={{ boxShadow: "4px 0 30px rgba(0,0,0,0.3)" }}
          >
            <div className="absolute right-0 top-0 h-full w-8 opacity-30"
              style={{ background: "linear-gradient(90deg, transparent, hsl(43 72% 55%))" }} />
            <div className="flex h-full items-center justify-end pr-6">
              <div className="h-20 w-3 rounded-full bg-gold opacity-60" />
            </div>
          </motion.div>

          {/* Right door */}
          <motion.div
            className="fixed inset-y-0 right-0 z-[100] w-1/2 gradient-royal"
            initial={{ x: 0 }}
            animate={{ x: 0 }}
            exit={{ x: "100%", transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }}
            style={{ boxShadow: "-4px 0 30px rgba(0,0,0,0.3)" }}
          >
            <div className="absolute left-0 top-0 h-full w-8 opacity-30"
              style={{ background: "linear-gradient(270deg, transparent, hsl(43 72% 55%))" }} />
            <div className="flex h-full items-center justify-start pl-6">
              <div className="h-20 w-3 rounded-full bg-gold opacity-60" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DoorTransition;
