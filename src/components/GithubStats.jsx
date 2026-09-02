import { Github } from "lucide-react";
import Reveal from "./ui/Reveal";
import GlassPanel from "./ui/GlassPanel";
import { GITHUB_STATS, PROFILE } from "../data/portfolioData";

export default function GithubStats() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <GlassPanel className="p-8 sm:p-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-gold/10 border border-gold/25 flex items-center justify-center text-gold">
                <Github size={22} />
                </div>
                <div>
                  <p className="text-white font-medium">GitHub Activity</p>
                  <a
                    href={PROFILE.github}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs text-mist hover:text-gold transition-colors"
                  >
                    view full profile ↗
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 sm:gap-10">
                {GITHUB_STATS.map((stat) => (
                  <div key={stat.label} className="text-center sm:text-right">
                    <p className="font-display text-2xl sm:text-3xl font-semibold text-gradient">{stat.value}</p>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-mist mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </GlassPanel>
        </Reveal>
      </div>
    </section>
  );
}
