import { motion } from "framer-motion";
import { ArrowRight, Calendar, Music4, Trophy } from "lucide-react";
import type { Track } from "@/data/tracks";

type Props = {
  track: Track;
  correct: boolean;
  basePoints: number;
  speedBonus: number;
  isLast: boolean;
  onNext: () => void;
};

export function RevealCard({
  track,
  correct,
  basePoints,
  speedBonus,
  isLast,
  onNext,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`glass w-full max-w-xl rounded-2xl p-6 sm:p-8 ${correct ? "glow-success" : "glow-primary"}`}
    >
      <div
        className={`font-display text-center text-3xl tracking-[0.18em] uppercase sm:text-4xl ${
          correct ? "text-success" : "text-primary"
        }`}
        style={{
          textShadow: correct
            ? "0 0 30px color-mix(in oklab, var(--success) 70%, transparent)"
            : "0 0 30px color-mix(in oklab, var(--primary) 70%, transparent)",
        }}
      >
        {correct ? "Correct!" : "Round Over"}
      </div>

      <div className="mt-6 text-center">
        <h2 className="font-display text-2xl tracking-wide uppercase sm:text-3xl">{track.title}</h2>
        <p className="text-gradient-riff font-display mt-1 text-xl tracking-[0.15em] uppercase">
          {track.band}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
          <Calendar size={13} /> {track.year}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-violet/40 bg-violet/15 px-3 py-1 text-xs">
          <Music4 size={13} /> {track.subgenre}
        </span>
      </div>

      <div className="mt-6 space-y-2 rounded-xl border border-white/10 bg-black/25 p-4 text-sm">
        <div className="flex items-center justify-between text-muted-foreground">
          <span>Base points</span>
          <span className="tabular-nums text-foreground">+{basePoints}</span>
        </div>
        <div className="flex items-center justify-between text-muted-foreground">
          <span>Speed bonus</span>
          <span className="tabular-nums text-foreground">+{speedBonus}</span>
        </div>
        <div className="flex items-center justify-between border-t border-white/10 pt-2">
          <span className="font-display tracking-wider uppercase">Round total</span>
          <span className="font-display inline-flex items-center gap-1.5 text-lg tabular-nums">
            <Trophy size={15} className="text-violet" /> {basePoints + speedBonus}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onNext}
        className="glow-primary font-display mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base tracking-[0.15em] text-primary-foreground uppercase transition-transform hover:scale-[1.02]"
      >
        {isLast ? "See results" : "Next round"}
        <ArrowRight size={18} />
        <span className="text-primary-foreground/70 tabular-nums">({countdown})</span>
      </button>
    </motion.div>
  );
}
