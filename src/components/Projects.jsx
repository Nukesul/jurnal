import { ArrowUpRight, Check } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import GlassPanel from "./ui/GlassPanel";
import Reveal from "./ui/Reveal";
import { PROJECTS } from "../data/portfolioData";

export default function Projects() {
  return (
    <section id="projects" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow="Selected Work"
          title="Products, not just code."
          description="A few builds that cover the full range — mobile, e-commerce, real-time interaction and end-to-end architecture."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.08}>
              <GlassPanel className="p-7 h-full flex flex-col group">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs text-gold/70">{project.id}</span>
                  <ArrowUpRight
                    size={18}
                    className="text-mist group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </div>

                <h3 className="mt-4 text-xl font-semibold text-white">{project.title}</h3>
                <p className="mt-3 text-sm text-mist leading-relaxed">{project.description}</p>

                <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2">
                  {project.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-ash">
                      <Check size={13} className="text-gold shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-5 border-t border-line flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="font-mono text-[11px] rounded-full border border-line px-2.5 py-1 text-ash">
                      {t}
                    </span>
                  ))}
                </div>
              </GlassPanel>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
