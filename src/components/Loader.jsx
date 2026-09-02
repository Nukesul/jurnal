import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINES = [
  "Initializing Developer System...",
  "Loading Skills...",
  "Loading Projects...",
  "Loading Experience...",
];

export default function Loader({ onComplete }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const lineTimer = setInterval(() => {
      setLineIndex((i) => (i < LINES.length - 1 ? i + 1 : i));
    }, 550);

    const progressTimer = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + Math.random() * 9 + 3, 100);
        if (next >= 100) {
          clearInterval(progressTimer);
          clearInterval(lineTimer);
          setTimeout(() => setDone(true), 400);
          setTimeout(() => onComplete?.(), 1150);
        }
        return next;
      });
    }, 140);

    return () => {
      clearInterval(lineTimer);
      clearInterval(progressTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          key="loader"
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void noise-grid"
        >
          <div className="w-[min(90vw,440px)] font-mono text-sm">
            <div className="flex items-center gap-2 mb-8 justify-center">
              <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
              <span className="text-mist tracking-[0.3em] text-xs uppercase">system.boot</span>
            </div>

            <div className="space-y-2 min-h-[110px]">
              {LINES.slice(0, lineIndex + 1).map((line, i) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={i === lineIndex ? "text-gold" : "text-mist"}
                >
                  <span className="text-ash/60 mr-2">$</span>
                  {line}
                  {i === lineIndex && <span className="ml-1 animate-blink">_</span>}
                </motion.p>
              ))}
            </div>

            <div className="mt-8">
              <div className="flex justify-between text-xs text-mist mb-2">
                <span>PROGRESS</span>
                <span className="text-gold">{Math.floor(progress)}%</span>
              </div>
              <div className="h-[3px] w-full bg-surface2 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-gold/60 to-gold shadow-gold-sm"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {progress >= 100 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 text-center text-white text-base tracking-wide"
              >
                Welcome to my digital world
              </motion.p>
            )}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
