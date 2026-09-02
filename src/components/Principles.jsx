import { Sparkles, Puzzle, Building2, Heart } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import GlassPanel from "./ui/GlassPanel";
import Reveal from "./ui/Reveal";
import { PRINCIPLES } from "../data/portfolioData";

const ICONS = [Sparkles, Puzzle, Building2, Heart];

export default function Principles() {
  return (
    <section className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading eyebrow="Engineering Principles" title="What guides how I build." />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRINCIPLES.map((p, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={p.title} delay={i * 0.06}>
                <GlassPanel className="p-6 h-full">
                  <Icon size={20} className="text-gold mb-4" />
                  <h3 className="text-base font-semibold text-white">{p.title}</h3>
                  <p className="mt-2 text-sm text-mist leading-relaxed">{p.description}</p>
                </GlassPanel>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
