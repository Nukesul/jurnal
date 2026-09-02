import { motion } from "framer-motion";

export default function SectionHeading({ eyebrow, title, description, align = "left" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`max-w-2xl mb-14 ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">{title}</h2>
      {description && <p className="mt-4 text-base sm:text-lg text-mist leading-relaxed">{description}</p>}
    </motion.div>
  );
}
