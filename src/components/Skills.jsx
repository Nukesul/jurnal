import { Layout, Server, Terminal, Database, Cloud } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import GlassPanel from "./ui/GlassPanel";
import Reveal from "./ui/Reveal";
import { SKILLS } from "../data/portfolioData";

const ICONS = [Layout, Server, Terminal, Database, Cloud];

export default function Skills() {
  return (
    <section id="skills" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow="Skills"
          title="Tools I reach for daily."
          description="A working toolkit spanning interface, server, data and delivery — chosen for reliability, not trend."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILLS.map((skill, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={skill.title} delay={i * 0.06}>
                <GlassPanel className="p-6 h-full flex flex-col">
                  <div className="h-11 w-11 rounded-xl bg-gold/10 border border-gold/25 flex items-center justify-center text-gold mb-5">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{skill.title}</h3>
                  <p className="mt-2 text-sm text-mist leading-relaxed">{skill.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2 pt-4 border-t border-line">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="font-mono text-[11px] rounded-full border border-line px-2.5 py-1 text-ash"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </GlassPanel>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
