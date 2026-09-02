import Reveal from "./ui/Reveal";
import GlassPanel from "./ui/GlassPanel";
import SectionHeading from "./ui/SectionHeading";
import { PROFILE } from "../data/portfolioData";
import { User, Code2, Layers } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-28">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1.2fr_1fr] gap-14 items-start">
        <div>
          <SectionHeading eyebrow="About" title="Engineer by trade, builder by habit." />
          <div className="space-y-5 text-base sm:text-lg text-mist leading-relaxed max-w-xl">
            {PROFILE.about.map((line, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p>{line}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.15}>
          <GlassPanel className="p-7 sm:p-8 relative overflow-hidden">
            <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gold/10 blur-3xl" />
            <div className="flex items-center gap-3 mb-6">
              <div className="h-11 w-11 rounded-xl bg-gold/10 border border-gold/25 flex items-center justify-center text-gold">
                <User size={20} />
              </div>
              <div>
                <p className="text-white font-medium">{PROFILE.name}</p>
                <p className="text-xs font-mono text-mist">{PROFILE.role}</p>
              </div>
            </div>

            <dl className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Code2 size={16} className="text-gold mt-0.5 shrink-0" />
                <div>
                  <dt className="text-mist font-mono text-xs uppercase tracking-wide">Role</dt>
                  <dd className="text-white">{PROFILE.role}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Layers size={16} className="text-gold mt-0.5 shrink-0" />
                <div>
                  <dt className="text-mist font-mono text-xs uppercase tracking-wide">Focus</dt>
                  <dd className="text-white">{PROFILE.focus}</dd>
                </div>
              </div>
            </dl>

            <div className="mt-7 pt-6 border-t border-line flex items-center gap-2 font-mono text-xs text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              status: {PROFILE.status.toLowerCase()}
            </div>
          </GlassPanel>
        </Reveal>
      </div>
    </section>
  );
}
