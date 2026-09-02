import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { JOURNEY } from "../data/portfolioData";

export default function Journey() {
  return (
    <section id="journey" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow="Development Journey"
          title="How the stack came together."
          description="Ordered chronologically — each stage adds a layer to the last, from static pages to full architecture."
        />

        <div className="relative pl-8 sm:pl-10">
          <div className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-gold/60 via-line to-transparent" />

          <div className="space-y-12">
            {JOURNEY.map((stage, i) => (
              <Reveal key={i} delay={i * 0.08} className="relative">
                <span className="absolute -left-8 sm:-left-10 top-1 h-3.5 w-3.5 rounded-full bg-void border-2 border-gold shadow-gold-sm" />
                <div className="font-mono text-xs text-gold mb-1">{stage.year}</div>
                <h3 className="text-lg sm:text-xl font-semibold text-white">{stage.title}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {stage.items.map((item) => (
                    <span key={item} className="font-mono text-[11px] rounded-full border border-line px-2.5 py-1 text-ash">
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
