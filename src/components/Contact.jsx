import { Github, Linkedin, Mail } from "lucide-react";
import Reveal from "./ui/Reveal";
import { PROFILE } from "../data/portfolioData";

export default function Contact() {
  return (
    <section id="contact" className="py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Reveal>
          <span className="eyebrow">Contact</span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-semibold tracking-tight text-white">
            Let's build something <span className="text-gradient">amazing</span> together.
          </h2>
          <p className="mt-5 text-mist max-w-lg mx-auto">
            Open to full stack roles, freelance builds and collaborations across web, mobile and cloud.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-white hover:border-gold/50 transition-colors"
            >
              <Github size={16} /> GitHub
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-white hover:border-gold/50 transition-colors"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-gold text-void px-6 py-3 text-sm font-semibold hover:shadow-gold transition-shadow"
            >
              <Mail size={16} /> Email Me
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
