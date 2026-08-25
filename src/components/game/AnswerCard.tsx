import type { Track } from "@/data/tracks";

type Props = {
  track: Track;
  index: number;
  disabled: boolean;
  state: "idle" | "correct" | "wrong" | "dim";
  onSelect: () => void;
};

export function AnswerCard({ track, index, disabled, state, onSelect }: Props) {
  const stateClasses =
    state === "correct"
      ? "glow-success border-success/60 bg-success/10"
      : state === "wrong"
        ? "glow-primary border-primary/60 bg-primary/10"
        : state === "dim"
          ? "opacity-40"
          : "hover:border-primary/60 hover:bg-white/[0.06] hover:-translate-y-0.5 hover:glow-primary";

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      className={`glass group flex w-full items-center gap-4 rounded-xl px-4 py-4 text-left transition-all duration-200 disabled:cursor-default ${stateClasses}`}
    >
      <span className="font-display grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/15 bg-white/5 text-sm text-muted-foreground transition-colors group-hover:border-primary/50 group-hover:text-foreground">
        {index + 1}
      </span>
      <span className="min-w-0">
        <span className="block truncate font-display text-base tracking-wide uppercase sm:text-lg">
          {track.band}
        </span>
        <span className="block truncate text-sm text-muted-foreground">{track.title}</span>
      </span>
    </button>
  );
}
