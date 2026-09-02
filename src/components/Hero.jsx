import { motion } from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";
import HeroScene from "./HeroScene";
import { PROFILE } from "../data/portfolioData";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 1.4 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section id="top" className="relative pt-40 pb-24 sm:pt-48 overflow-hidden">
      <div className="absolute inset-0 noise-grid [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span variants={item} className="eyebrow inline-block">
            Full Stack Developer
          </motion.span>

          <motion.h1 variants={item} className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08] tracking-tight">
            Hello, I'm <span className="text-gradient">{PROFILE.name}</span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 text-base sm:text-lg text-mist max-w-lg leading-relaxed">
            {PROFILE.heroDescription}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-gold text-void px-6 py-3 text-sm font-semibold tracking-wide hover:shadow-gold transition-shadow"
            >
              View Projects <ArrowRight size={16} />
            </a>
            <a
              href="/Nursultan_Mustapaev_CV.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold tracking-wide text-white hover:border-gold/50 transition-colors"
            >
              Download CV <Download size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide text-ash hover:text-gold transition-colors"
            >
              Contact Me <Mail size={16} />
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-10 inline-flex items-center gap-2 font-mono text-xs text-ash">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            {PROFILE.status}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.6, ease: "easeOut" }}
        >
          <HeroScene />
          <p className="text-center font-mono text-[11px] text-mist mt-2 tracking-wide">
            drag to explore — interactive tech constellation
          </p>
        </motion.div>
      </div>
    </section>
  );
}
