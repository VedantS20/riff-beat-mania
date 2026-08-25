import { motion } from "framer-motion";
import { Check, RotateCcw, Share2, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Track } from "@/data/tracks";

export type RoundResult = {
  track: Track;
  correct: boolean;
  points: number;
};

type Props = {
  results: RoundResult[];
  score: number;
  longestStreak: number;
  onPlayAgain: () => void;
  onShare: () => void;
  shared: boolean;
};

export function GameOverPanel({
  results,
  score,
  longestStreak,
  onPlayAgain,
  onShare,
  shared,
}: Props) {
  const total = results.length;
  const hits = results.filter((r) => r.correct).length;
  const accuracy = total ? Math.round((hits / total) * 100) : 0;

  const stats = [
    { label: "Score", value: score.toLocaleString() },
    { label: "Accuracy", value: `${accuracy}%` },
    { label: "Longest streak", value: `${longestStreak}` },
    { label: "Tracks", value: `${hits}/${total}` },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="glass glow-violet w-full max-w-2xl rounded-2xl p-6 sm:p-8"
    >
      <p className="text-center text-xs tracking-[0.4em] text-muted-foreground uppercase">
        Set complete
      </p>
      <h1 className="text-gradient-riff mt-2 text-center text-4xl tracking-[0.12em] uppercase sm:text-5xl">
        Game Over
      </h1>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-white/10 bg-black/25 px-3 py-4 text-center"
          >
            <div className="font-display text-2xl tabular-nums">{stat.value}</div>
            <div className="mt-1 text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 max-h-64 space-y-2 overflow-y-auto pr-1">
        {results.map((result, i) => (
          <div
            key={`${result.track.id}-${i}`}
            className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5"
          >
            <span
              className={`grid h-7 w-7 shrink-0 place-items-center rounded-md ${
                result.correct ? "bg-success/20 text-success" : "bg-primary/20 text-primary"
              }`}
            >
              {result.correct ? <Check size={15} /> : <X size={15} />}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate font-display text-sm tracking-wide uppercase">
                {result.track.band}
              </span>
              <span className="block truncate text-xs text-muted-foreground">
                {result.track.title} · {result.track.subgenre}
              </span>
            </span>
            <span className="font-display shrink-0 text-sm tabular-nums text-muted-foreground">
              +{result.points}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onPlayAgain}
          className="glow-primary font-display flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 tracking-[0.15em] text-primary-foreground uppercase transition-transform hover:scale-[1.02]"
        >
          <RotateCcw size={18} /> Play again
        </button>
        <button
          type="button"
          onClick={onShare}
          className="font-display flex flex-1 items-center justify-center gap-2 rounded-xl border border-violet/50 bg-violet/15 px-6 py-3.5 tracking-[0.15em] uppercase transition-colors hover:bg-violet/25"
        >
          <Share2 size={18} /> {shared ? "Copied!" : "Share score"}
        </button>
      </div>

      <div className="mt-4 text-center">
        <Link to="/" className="text-xs tracking-[0.2em] text-muted-foreground uppercase hover:text-foreground">
          Change difficulty
        </Link>
      </div>
    </motion.div>
  );
}
