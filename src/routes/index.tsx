import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Flame, Guitar, Infinity as InfinityIcon, Play, Skull, Zap } from "lucide-react";
import { Backdrop } from "@/components/game/Backdrop";
import { DIFFICULTY_LABELS, type Difficulty } from "@/data/tracks";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RiffSpot — Rock & Metal Song Guessing Game" },
      {
        name: "description",
        content:
          "Name the riff in 30 seconds. RiffSpot is a fast-paced rock and metal guessing game with thrash, grunge, nu-metal and prog rounds.",
      },
      { property: "og:title", content: "RiffSpot — Rock & Metal Song Guessing Game" },
      {
        property: "og:description",
        content: "Hear a riff, pick the band, watch the music video explode across your screen.",
      },
    ],
  }),
  component: SetupPage,
});

const DIFFICULTY_ICONS: Record<Difficulty, typeof Guitar> = {
  easy: Guitar,
  medium: Flame,
  hard: Skull,
};

const MODES = [
  { value: "5", label: "5 Rounds", hint: "Quick set", icon: Zap },
  { value: "10", label: "10 Rounds", hint: "Full setlist", icon: Play },
  { value: "endless", label: "Endless", hint: "Until you drop", icon: InfinityIcon },
] as const;

function SetupPage() {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [mode, setMode] = useState<"5" | "10" | "endless">("10");

  return (
    <main className="relative min-h-screen">
      <Backdrop />
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center px-5 py-14">
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] tracking-[0.35em] text-muted-foreground uppercase">
            <Flame size={12} className="text-primary" /> Rock & Metal only
          </span>
          <h1 className="text-gradient-riff mt-5 text-5xl leading-none tracking-[0.06em] uppercase sm:text-7xl">
            RiffSpot
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground sm:text-base">
            30 seconds of a riff. Four suspects. Guess fast for the speed bonus, then watch the
            official video take over your screen.
          </p>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10"
        >
          <h2 className="text-xs tracking-[0.3em] text-muted-foreground uppercase">Difficulty</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {(Object.keys(DIFFICULTY_LABELS) as Difficulty[]).map((key) => {
              const Icon = DIFFICULTY_ICONS[key];
              const active = difficulty === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setDifficulty(key)}
                  className={`glass rounded-xl px-4 py-5 text-left transition-all duration-200 ${
                    active
                      ? "glow-primary border-primary/60 bg-primary/10"
                      : "hover:-translate-y-0.5 hover:border-white/25"
                  }`}
                >
                  <Icon size={20} className={active ? "text-primary" : "text-muted-foreground"} />
                  <div className="font-display mt-3 text-lg tracking-[0.15em] uppercase">
                    {DIFFICULTY_LABELS[key].name}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {DIFFICULTY_LABELS[key].blurb}
                  </div>
                </button>
              );
            })}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8"
        >
          <h2 className="text-xs tracking-[0.3em] text-muted-foreground uppercase">Set length</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {MODES.map((option) => {
              const Icon = option.icon;
              const active = mode === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setMode(option.value)}
                  className={`glass flex items-center gap-3 rounded-xl px-4 py-4 transition-all duration-200 ${
                    active
                      ? "glow-violet border-violet/60 bg-violet/10"
                      : "hover:-translate-y-0.5 hover:border-white/25"
                  }`}
                >
                  <Icon size={18} className={active ? "text-violet" : "text-muted-foreground"} />
                  <span className="text-left">
                    <span className="font-display block text-sm tracking-[0.15em] uppercase">
                      {option.label}
                    </span>
                    <span className="block text-xs text-muted-foreground">{option.hint}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </motion.section>

        <motion.button
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
          type="button"
          onClick={() => navigate({ to: "/play", search: { difficulty, mode } })}
          className="glow-primary font-display mt-10 flex items-center justify-center gap-3 self-center rounded-xl bg-primary px-12 py-4 text-lg tracking-[0.2em] text-primary-foreground uppercase transition-transform hover:scale-[1.03]"
        >
          <Play size={20} /> Start playing
        </motion.button>

        <p className="mt-6 text-center text-[11px] tracking-[0.15em] text-muted-foreground uppercase">
          Tip: use keys 1 – 4 to lock in your answer
        </p>
      </div>
    </main>
  );
}
