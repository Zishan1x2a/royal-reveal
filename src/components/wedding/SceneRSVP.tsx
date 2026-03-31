import { motion } from "framer-motion";
import { useState } from "react";
import SectionBackground from "./SectionBackground";
import floralCorner from "@/assets/floral-corner.png";

const SceneRSVP = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <SectionBackground className="flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
      <img src={floralCorner} alt="" className="absolute top-4 right-4 w-28 md:w-36 opacity-40 z-10" loading="lazy" width={512} height={512} />
      <img src={floralCorner} alt="" className="absolute bottom-4 left-4 w-28 md:w-36 opacity-40 rotate-180 z-10" loading="lazy" width={512} height={512} />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-6 max-w-md w-full"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
      >
        <motion.h2
          className="font-display text-3xl md:text-4xl"
          style={{ color: "hsl(0 60% 25%)" }}
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          {submitted ? "Thank You!" : "RSVP & Contact"}
        </motion.h2>

        <motion.div className="h-px w-20" style={{ background: "hsl(43 72% 50%)" }} variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }} />

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
              className="w-full px-4 py-3 rounded-sm font-body text-sm focus:outline-none transition-colors"
              style={{
                border: "1px solid hsl(43 72% 50% / 0.3)",
                background: "hsl(0 30% 97% / 0.8)",
                color: "hsl(0 60% 20%)",
              }}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full px-4 py-3 rounded-sm font-body text-sm focus:outline-none transition-colors"
              style={{
                border: "1px solid hsl(43 72% 50% / 0.3)",
                background: "hsl(0 30% 97% / 0.8)",
                color: "hsl(0 60% 20%)",
              }}
            />
            <select
              className="w-full px-4 py-3 rounded-sm font-body text-sm focus:outline-none transition-colors"
              style={{
                border: "1px solid hsl(43 72% 50% / 0.3)",
                background: "hsl(0 30% 97% / 0.8)",
                color: "hsl(0 60% 20%)",
              }}
              defaultValue=""
            >
              <option value="" disabled>Will you attend?</option>
              <option value="yes">Joyfully Accept</option>
              <option value="no">Respectfully Decline</option>
            </select>
            <motion.button
              type="submit"
              className="font-decorative text-lg tracking-widest uppercase px-10 py-4 rounded-sm border-2 transition-colors duration-500 mt-2"
              style={{
                borderColor: "hsl(43 72% 50%)",
                color: "hsl(43 72% 45%)",
                background: "transparent",
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Send RSVP
            </motion.button>
          </motion.form>
        ) : (
          <motion.p
            className="font-decorative text-xl"
            style={{ color: "hsl(0 40% 35%)" }}
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
          <p className="font-body text-xs uppercase tracking-[0.2em]" style={{ color: "hsl(0 25% 45%)" }}>Contact Us</p>
          <div className="flex justify-center gap-4">
            <a href="tel:+919876543210" className="rounded-sm px-5 py-2 font-body text-sm transition-colors" style={{ border: "1px solid hsl(43 72% 50% / 0.3)", color: "hsl(0 60% 25%)" }}>
              📞 Call
            </a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="rounded-sm px-5 py-2 font-body text-sm transition-colors" style={{ border: "1px solid hsl(43 72% 50% / 0.3)", color: "hsl(0 60% 25%)" }}>
              💬 WhatsApp
            </a>
          </div>
          <a
            href="https://maps.google.com/?q=The+Grand+Palace+Jaipur"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-sm px-5 py-2 font-body text-sm transition-colors"
            style={{ border: "1px solid hsl(43 72% 50% / 0.3)", color: "hsl(0 60% 25%)" }}
          >
            📍 View Venue on Map
          </a>
        </motion.div>

        <motion.div
          className="mt-8 pt-6 w-full"
          style={{ borderTop: "1px solid hsl(43 72% 50% / 0.2)" }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        >
          <p className="font-decorative text-lg italic" style={{ color: "hsl(43 72% 45%)" }}>
            "May your blessings shower upon us like the petals of sacred flowers"
          </p>
          <p className="font-body text-xs mt-3 tracking-wide" style={{ color: "hsl(0 25% 45%)" }}>
            With love, Rajveer & Ishita's Families
          </p>
        </motion.div>
      </motion.div>
    </SectionBackground>
  );
};

export default SceneRSVP;
