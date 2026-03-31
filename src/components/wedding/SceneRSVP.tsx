import { motion } from "framer-motion";
import { useState } from "react";
import floralCorner from "@/assets/floral-corner.png";

const SceneRSVP = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-cream px-6 py-16 text-center overflow-hidden">
      <img src={floralCorner} alt="" className="absolute top-4 right-4 w-28 md:w-36 opacity-50" loading="lazy" width={512} height={512} />
      <img src={floralCorner} alt="" className="absolute bottom-4 left-4 w-28 md:w-36 opacity-50 rotate-180" loading="lazy" width={512} height={512} />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-6 max-w-md w-full"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
      >
        <motion.h2
          className="font-display text-3xl md:text-4xl text-maroon"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          {submitted ? "Thank You!" : "RSVP & Contact"}
        </motion.h2>

        <motion.div className="h-px w-20 bg-gold" variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }} />

        {!submitted ? (
          <motion.form
            className="flex flex-col gap-4 w-full"
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            <input
              type="text"
              placeholder="Your Name"
              required
              className="w-full border border-gold/30 bg-ivory px-4 py-3 rounded-sm font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full border border-gold/30 bg-ivory px-4 py-3 rounded-sm font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
            />
            <select
              className="w-full border border-gold/30 bg-ivory px-4 py-3 rounded-sm font-body text-sm text-foreground focus:outline-none focus:border-gold transition-colors"
              defaultValue=""
            >
              <option value="" disabled>Will you attend?</option>
              <option value="yes">Joyfully Accept</option>
              <option value="no">Respectfully Decline</option>
            </select>
            <motion.button
              type="submit"
              className="font-decorative text-lg tracking-widest uppercase px-10 py-4 rounded-sm border-2 border-gold text-gold bg-transparent
                hover:bg-gold hover:text-foreground transition-colors duration-500 mt-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Send RSVP
            </motion.button>
          </motion.form>
        ) : (
          <motion.p
            className="font-decorative text-xl text-maroon-light"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            We look forward to celebrating with you! 🙏
          </motion.p>
        )}

        <motion.div
          className="mt-6 space-y-3"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        >
          <p className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground">Contact Us</p>
          <div className="flex justify-center gap-4">
            <a href="tel:+919876543210" className="border border-gold/30 rounded-sm px-5 py-2 font-body text-sm text-maroon hover:bg-gold/10 transition-colors">
              📞 Call
            </a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="border border-gold/30 rounded-sm px-5 py-2 font-body text-sm text-maroon hover:bg-gold/10 transition-colors">
              💬 WhatsApp
            </a>
          </div>
          <a
            href="https://maps.google.com/?q=The+Grand+Palace+Jaipur"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-gold/30 rounded-sm px-5 py-2 font-body text-sm text-maroon hover:bg-gold/10 transition-colors"
          >
            📍 View Venue on Map
          </a>
        </motion.div>

        <motion.div
          className="mt-8 pt-6 border-t border-gold/20 w-full"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        >
          <p className="font-decorative text-lg text-gold italic">
            "May your blessings shower upon us like the petals of sacred flowers"
          </p>
          <p className="font-body text-xs text-muted-foreground mt-3 tracking-wide">
            With love, Priya & Arjun's Families
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SceneRSVP;
