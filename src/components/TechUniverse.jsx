import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import { TECH_UNIVERSE } from "../data/portfolioData";

export default function TechUniverse() {
  const [active, setActive] = useState(null);
  const groups = TECH_UNIVERSE;

  return (
    <section id="universe" className="py-28 relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow="Tech Universe"
          title="An interactive map of my stack."
          description="Hover a node to see what it's used for. Every satellite orbits the same discipline: building complete products."
        />

        <div className="relative mx-auto aspect-square max-w-[640px] w-full">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
            {groups.map((g) => {
              const rad = (g.angle * Math.PI) / 180;
              const x = 50 + Math.cos(rad) * 38;
              const y = 50 + Math.sin(rad) * 38;
              return (
                <line
                  key={g.group}
                  x1="50"
                  y1="50"
                  x2={x}
                  y2={y}
                  stroke="#8A7132"
                  strokeOpacity="0.35"
                  strokeWidth="0.3"
                />
              );
            })}
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="glass h-28 w-28 sm:h-32 sm:w-32 rounded-full flex flex-col items-center justify-center text-center px-2 shadow-gold-sm">
              <span className="font-display text-xs sm:text-sm font-semibold text-white leading-tight">
                FULL STACK
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] text-gold tracking-wider">DEVELOPER</span>
            </div>
          </div>

          {groups.map((g) => {
            const rad = (g.angle * Math.PI) / 180;
            const cx = 50 + Math.cos(rad) * 38;
            const cy = 50 + Math.sin(rad) * 38;
            return (
              <div
                key={g.group}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
                style={{ left: `${cx}%`, top: `${cy}%` }}
              >
                <span className="font-mono text-[10px] uppercase tracking-widest text-mist">{g.group}</span>
                <div className="flex flex-col gap-2">
                  {g.items.map((tech) => (
                    <motion.button
                      key={tech.name}
                      onMouseEnter={() => setActive(tech)}
                      onMouseLeave={() => setActive(null)}
                      onFocus={() => setActive(tech)}
                      onBlur={() => setActive(null)}
                      whileHover={{ scale: 1.08 }}
                      className="relative rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-white hover:border-gold/60 hover:text-gold transition-colors"
                    >
                      {tech.name}
                    </motion.button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 max-w-xl mx-auto text-center min-h-[52px]">
          {active ? (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono text-sm text-ash"
            >
              <span className="text-gold">{active.name}</span> — {active.detail}
            </motion.p>
          ) : (
            <p className="font-mono text-sm text-mist">Hover any node above to read what it's for.</p>
          )}
        </div>
      </div>
    </section>
  );
}
