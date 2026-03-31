import { motion } from "framer-motion";
import { useState } from "react";
import SectionBackground from "./SectionBackground";
import floralCorner from "@/assets/floral-corner.png";

const cardStyle = {
  background: "linear-gradient(135deg, hsl(0 30% 97% / 0.9), hsl(0 40% 94% / 0.85))",
  border: "1px solid hsl(43 72% 55% / 0.3)",
  boxShadow: "0 8px 32px hsl(0 40% 30% / 0.1), inset 0 1px 0 hsl(43 72% 70% / 0.3)",
};

/* Animated glowing border card wrapper */
const GlowCard = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    className={`relative group ${className}`}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ y: -6, scale: 1.02 }}
  >
    {/* Animated border glow */}
    <motion.div
      className="absolute -inset-[2px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{
        background: "linear-gradient(270deg, hsl(43 72% 55%), hsl(340 50% 65%), hsl(43 72% 55%), hsl(0 60% 45%))",
        backgroundSize: "300% 300%",
      }}
      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    />
    {/* Sparkle corners on hover */}
    <motion.div
      className="absolute -top-1 -left-1 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100"
      style={{ background: "hsl(43 72% 65%)", boxShadow: "0 0 12px hsl(43 72% 55%)" }}
      animate={{ scale: [0.5, 1.2, 0.5], opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.div
      className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100"
      style={{ background: "hsl(43 72% 65%)", boxShadow: "0 0 12px hsl(43 72% 55%)" }}
      animate={{ scale: [1.2, 0.5, 1.2], opacity: [1, 0.3, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <div className="relative rounded-xl p-6 backdrop-blur-sm" style={cardStyle}>
      {children}
    </div>
  </motion.div>
);

const inputClasses = "w-full px-4 py-3 rounded-lg font-body text-sm focus:outline-none transition-all duration-300 focus:ring-2 focus:scale-[1.01]";
const inputStyle = {
  border: "1px solid hsl(43 72% 50% / 0.3)",
  background: "hsl(0 30% 97% / 0.8)",
  color: "hsl(0 60% 20%)",
};

const SceneRSVP = ({ guestName }: { guestName: string }) => {
  const [submitted, setSubmitted] = useState(false);
  const [hoveredContact, setHoveredContact] = useState<string | null>(null);

  return (
    <SectionBackground className="flex min-h-screen flex-col items-center justify-center px-4 py-16 text-center">
      <img src={floralCorner} alt="" className="absolute top-4 right-4 w-28 md:w-36 opacity-40 z-10" loading="lazy" width={512} height={512} />
      <img src={floralCorner} alt="" className="absolute bottom-4 left-4 w-28 md:w-36 opacity-40 rotate-180 z-10" loading="lazy" width={512} height={512} />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-6 max-w-lg w-full"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
      >
        {/* Section Title */}
        <motion.div
          className="flex flex-col items-center gap-3"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          <motion.h2
            className="font-display text-3xl md:text-4xl"
            style={{ color: "hsl(0 60% 25%)" }}
            animate={{ textShadow: ["0 0 10px hsl(43 72% 55% / 0)", "0 0 20px hsl(43 72% 55% / 0.3)", "0 0 10px hsl(43 72% 55% / 0)"] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {submitted ? `Thank You, ${guestName}! 🙏` : `Dear ${guestName}, RSVP & Contact`}
          </motion.h2>
          <motion.div className="h-px w-24" style={{ background: "linear-gradient(90deg, transparent, hsl(43 72% 50%), transparent)" }} variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }} />
          <motion.p
            className="font-decorative text-base italic"
            style={{ color: "hsl(0 40% 40%)" }}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          >
            We would be honoured by your presence
          </motion.p>
        </motion.div>

        {!submitted ? (
          <GlowCard className="w-full" delay={0.2}>
            <motion.form
              className="flex flex-col gap-4 w-full"
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            >
              <p className="font-body text-xs uppercase tracking-[0.2em] mb-1" style={{ color: "hsl(0 25% 45%)" }}>
                Your Details, {guestName}
              </p>
              <motion.input
                type="text"
                placeholder="Your Name"
                required
                defaultValue={guestName}
                className={inputClasses}
                style={{ ...inputStyle, focusRingColor: "hsl(43 72% 55%)" } as any}
                whileFocus={{ boxShadow: "0 0 0 2px hsl(43 72% 55% / 0.4), 0 4px 12px hsl(43 72% 55% / 0.15)" }}
              />
              <motion.input
                type="tel"
                placeholder="Phone Number"
                className={inputClasses}
                style={inputStyle}
                whileFocus={{ boxShadow: "0 0 0 2px hsl(43 72% 55% / 0.4), 0 4px 12px hsl(43 72% 55% / 0.15)" }}
              />
              <motion.select
                className={inputClasses}
                style={inputStyle}
                defaultValue=""
                whileFocus={{ boxShadow: "0 0 0 2px hsl(43 72% 55% / 0.4), 0 4px 12px hsl(43 72% 55% / 0.15)" }}
              >
                <option value="" disabled>Will you attend?</option>
                <option value="yes">Joyfully Accept ✨</option>
                <option value="no">Respectfully Decline</option>
              </motion.select>
              <motion.textarea
                placeholder="Your Blessings & Wishes (optional)"
                className={`${inputClasses} min-h-[80px] resize-none`}
                style={inputStyle}
                whileFocus={{ boxShadow: "0 0 0 2px hsl(43 72% 55% / 0.4), 0 4px 12px hsl(43 72% 55% / 0.15)" }}
              />
              <motion.button
                type="submit"
                className="font-decorative text-lg tracking-widest uppercase px-10 py-4 rounded-lg border-2 transition-all duration-500 mt-2 relative overflow-hidden"
                style={{
                  borderColor: "hsl(43 72% 50%)",
                  color: "hsl(43 72% 45%)",
                  background: "transparent",
                }}
                whileHover={{
                  scale: 1.03,
                  background: "linear-gradient(135deg, hsl(43 72% 55%), hsl(43 80% 65%))",
                  color: "hsl(0 60% 15%)",
                  boxShadow: "0 8px 30px hsl(43 72% 55% / 0.4)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                Send RSVP ✉
              </motion.button>
            </motion.form>
          </GlowCard>
        ) : (
          <GlowCard className="w-full" delay={0}>
            <motion.div
              className="flex flex-col items-center gap-4 py-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 15 }}
            >
              <motion.div
                className="text-5xl"
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: 2 }}
              >
                🎉
              </motion.div>
              <p className="font-display text-2xl" style={{ color: "hsl(0 60% 25%)" }}>
                We're thrilled, {name}!
              </p>
              <p className="font-decorative text-lg italic" style={{ color: "hsl(0 40% 35%)" }}>
                We look forward to celebrating with you
              </p>
              <motion.div
                className="flex gap-2 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {["🌸", "✨", "💐", "✨", "🌸"].map((emoji, i) => (
                  <motion.span
                    key={i}
                    className="text-2xl"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 1.5, delay: i * 0.15, repeat: Infinity }}
                  >
                    {emoji}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </GlowCard>
        )}

        {/* Contact Cards */}
        <motion.div
          className="mt-4 w-full grid grid-cols-1 sm:grid-cols-3 gap-4"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        >
          {[
            { icon: "📞", label: "Call Us", href: "tel:+919876543210", key: "call" },
            { icon: "💬", label: "WhatsApp", href: "https://wa.me/919876543210", key: "whatsapp" },
            { icon: "📍", label: "Venue Map", href: "https://maps.google.com/?q=The+Grand+Palace+Jaipur", key: "map" },
          ].map((item, i) => (
            <motion.a
              key={item.key}
              href={item.href}
              target={item.key !== "call" ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="relative group rounded-xl overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              onHoverStart={() => setHoveredContact(item.key)}
              onHoverEnd={() => setHoveredContact(null)}
              whileHover={{ y: -4, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Animated border */}
              <motion.div
                className="absolute -inset-[1px] rounded-xl"
                style={{
                  background: "linear-gradient(270deg, hsl(43 72% 55%), hsl(340 50% 65%), hsl(43 72% 55%))",
                  backgroundSize: "200% 200%",
                }}
                animate={hoveredContact === item.key ? { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div
                className="relative rounded-xl px-4 py-4 flex flex-col items-center gap-2 backdrop-blur-sm"
                style={cardStyle}
              >
                <motion.span
                  className="text-2xl"
                  animate={hoveredContact === item.key ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {item.icon}
                </motion.span>
                <span className="font-body text-sm font-medium" style={{ color: "hsl(0 60% 25%)" }}>
                  {item.label}
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Closing blessing */}
        <GlowCard className="w-full mt-2" delay={0.6}>
          <motion.div className="flex flex-col items-center gap-3">
            <motion.p
              className="font-decorative text-lg italic"
              style={{ color: "hsl(43 72% 45%)" }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              "May your blessings shower upon us like the petals of sacred flowers"
            </motion.p>
            <motion.div className="h-px w-16" style={{ background: "linear-gradient(90deg, transparent, hsl(43 72% 50% / 0.5), transparent)" }} />
            <p className="font-body text-xs tracking-wide" style={{ color: "hsl(0 25% 45%)" }}>
              With love, Rajveer & Ishita's Families
            </p>
          </motion.div>
        </GlowCard>
      </motion.div>
    </SectionBackground>
  );
};

export default SceneRSVP;
