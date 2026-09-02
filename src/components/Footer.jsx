import { PROFILE } from "../data/portfolioData";

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <p className="text-white font-display font-medium">© 2026 {PROFILE.name}</p>
          <p className="font-mono text-xs text-mist mt-1">{PROFILE.role}</p>
        </div>
        <p className="font-mono text-xs text-mist">
          Built with <span className="text-gold">React</span> · <span className="text-gold">Three.js</span> ·{" "}
          <span className="text-gold">Tailwind CSS</span>
        </p>
      </div>
    </footer>
  );
}
