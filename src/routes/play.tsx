import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Flame, Loader2, SkipForward, TriangleAlert } from "lucide-react";
import { z } from "zod";

import { Backdrop } from "@/components/game/Backdrop";
import { AnswerCard } from "@/components/game/AnswerCard";
import { RevealCard } from "@/components/game/RevealCard";
import { GameOverPanel, type RoundResult } from "@/components/game/GameOverPanel";
import { SnippetStage, SNIPPET_SECONDS } from "@/components/game/SnippetStage";
import { VideoBackdrop } from "@/components/game/VideoBackdrop";
import { getPreview } from "@/lib/preview.functions";
import { buildQuestions, DIFFICULTY_LABELS, type Difficulty, type Question } from "@/data/tracks";

const searchSchema = z.object({
  difficulty: z.enum(["easy", "medium", "hard"]).default("medium"),
  mode: z.preprocess(String, z.enum(["5", "10", "endless"])).default("10"),
});

export const Route = createFileRoute("/play")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Now Playing — RiffSpot Rock & Metal Quiz" },
      {
        name: "description",
        content:
          "Guess the band and song from a 30-second riff, then watch the official music video fill the screen.",
      },
      { property: "og:title", content: "Now Playing — RiffSpot Rock & Metal Quiz" },
      {
        property: "og:description",
        content: "Four suspects, 30 seconds, one riff. How fast can you name it?",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PlayPage,
});

const BASE_POINTS = 100;
const NEXT_ROUND_SECONDS = 8;

function PlayPage() {
  const { difficulty, mode } = Route.useSearch();
  const fetchPreview = useServerFn(getPreview);

  const roundTarget = mode === "endless" ? Infinity : Number(mode);
  const [seed, setSeed] = useState(0);
  const [questions, setQuestions] = useState<Question[]>(() =>
    buildQuestions(difficulty, mode === "endless" ? 30 : Number(mode)),
  );
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"playing" | "reveal" | "over">("playing");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [wasCorrect, setWasCorrect] = useState(false);
  const [roundPoints, setRoundPoints] = useState({ base: 0, speed: 0 });
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [results, setResults] = useState<RoundResult[]>([]);
  const [volume, setVolume] = useState(0.8);
  const [countdown, setCountdown] = useState(NEXT_ROUND_SECONDS);
  const [shared, setShared] = useState(false);
  const [revealAt, setRevealAt] = useState(0);
  const elapsedRef = useRef(0);

  // Reset when difficulty/mode changes or on replay
  useEffect(() => {
    setQuestions(buildQuestions(difficulty, mode === "endless" ? 30 : Number(mode)));
    setIndex(0);
    setPhase("playing");
    setSelectedId(null);
    setScore(0);
    setStreak(0);
    setLongestStreak(0);
    setResults([]);
    setShared(false);
    elapsedRef.current = 0;
  }, [difficulty, mode, seed]);

  const question = questions[index];
  const track = question?.track;

  const preview = useQuery({
    queryKey: ["preview", track?.id],
    enabled: Boolean(track),
    staleTime: 1000 * 60 * 30,
    retry: 1,
    queryFn: () => {
      if (!track) return Promise.resolve({ previewUrl: null, cover: null });
      return fetchPreview({ data: { band: track.band, title: track.title } });
    },
  });

  const previewUrl = preview.data?.previewUrl ?? null;
  const cover = preview.data?.cover ?? null;
  const audioUnavailable = preview.isSuccess && !previewUrl;

  const finishRound = useCallback(
    (correct: boolean) => {
      if (!track) return;
      const elapsed = elapsedRef.current;
      const remaining = Math.max(0, SNIPPET_SECONDS - elapsed);
      const base = correct ? BASE_POINTS : 0;
      const speed = correct ? Math.round(remaining * 10) : 0;

      setRevealAt(elapsed);
      setRoundPoints({ base, speed });
      setWasCorrect(correct);
      setScore((prev) => prev + base + speed);
      setStreak((prev) => {
        const next = correct ? prev + 1 : 0;
        setLongestStreak((longest) => Math.max(longest, next));
        return next;
      });
      setResults((prev) => [...prev, { track, correct, points: base + speed }]);
      setCountdown(NEXT_ROUND_SECONDS);
      setPhase("reveal");
    },
    [track],
  );

  const handleGuess = useCallback(
    (optionId: string) => {
      if (phase !== "playing" || !track) return;
      setSelectedId(optionId);
      finishRound(optionId === track.id);
    },
    [phase, track, finishRound],
  );

  const isLastRound = mode !== "endless" && index + 1 >= roundTarget;

  const goNext = useCallback(() => {
    if (isLastRound) {
      setPhase("over");
      return;
    }
    setSelectedId(null);
    elapsedRef.current = 0;
    setPhase("playing");
    setIndex((prev) => {
      const next = prev + 1;
      if (next >= questions.length) {
        setQuestions((current) => [...current, ...buildQuestions(difficulty, 15)]);
      }
      return next;
    });
  }, [isLastRound, questions.length, difficulty]);

  // Auto-advance countdown during reveal
  useEffect(() => {
    if (phase !== "reveal") return;
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          goNext();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase, index, goNext]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (phase === "reveal" && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        goNext();
        return;
      }
      if (phase !== "playing" || !question) return;
      const slot = Number(event.key);
      if (slot >= 1 && slot <= 4) {
        const option = question.options[slot - 1];
        if (option) handleGuess(option.id);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [phase, question, handleGuess, goNext]);

  // Swap out tracks with no available preview so a round never stalls
  useEffect(() => {
    if (!audioUnavailable || phase !== "playing" || !question) return;
    const timeout = setTimeout(() => {
      const used = new Set(questions.map((q) => q.track.id));
      const replacement = buildQuestions(difficulty, 12).find((q) => !used.has(q.track.id));
      if (!replacement) return;
      setQuestions((current) => current.map((q, i) => (i === index ? replacement : q)));
    }, 1200);
    return () => clearTimeout(timeout);
  }, [audioUnavailable, phase, question, questions, index, difficulty]);

  const handleShare = async () => {
    const total = results.length;
    const hits = results.filter((r) => r.correct).length;
    const text = `RiffSpot — ${DIFFICULTY_LABELS[difficulty].name} · ${score.toLocaleString()} pts · ${hits}/${total} riffs nailed · streak ${longestStreak}`;
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: "RiffSpot", text });
      } else {
        await navigator.clipboard.writeText(text);
      }
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    } catch {
      /* user dismissed the share sheet */
    }
  };

  const roundLabel = mode === "endless" ? `Round ${index + 1}` : `Round ${index + 1} / ${mode}`;

  if (phase === "over") {
    return (
      <main className="relative flex min-h-screen items-center justify-center px-5 py-12">
        <Backdrop />
        <GameOverPanel
          results={results}
          score={score}
          longestStreak={longestStreak}
          shared={shared}
          onShare={handleShare}
          onPlayAgain={() => setSeed((prev) => prev + 1)}
        />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen">
      {phase === "reveal" && track ? (
        <VideoBackdrop
          youtubeId={track.youtubeId}
          startSeconds={revealAt}
          cover={cover}
          overlay={0.55}
        />
      ) : (
        <Backdrop />
      )}

      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-5 py-6">
        <header className="flex items-center justify-between gap-3">
          <Link
            to="/"
            className="glass inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs tracking-[0.2em] text-muted-foreground uppercase transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} /> Exit
          </Link>
          <div className="flex items-center gap-2">
            <span className="glass rounded-full px-3 py-2 text-[10px] tracking-[0.2em] uppercase">
              {DIFFICULTY_LABELS[difficulty].name}
            </span>
            <span className="glass rounded-full px-3 py-2 text-[10px] tracking-[0.2em] uppercase">
              {roundLabel}
            </span>
            <span className="glass glow-primary font-display rounded-full px-3 py-2 text-sm tabular-nums">
              {score.toLocaleString()}
            </span>
          </div>
        </header>

        {streak >= 2 ? (
          <div className="mt-3 flex justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] tracking-[0.2em] text-primary uppercase">
              <Flame size={12} /> {streak} in a row
            </span>
          </div>
        ) : null}

        <AnimatePresence mode="wait">
          {phase === "playing" ? (
            <motion.section
              key={`play-${index}-${track?.id}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="flex flex-1 flex-col items-center justify-center gap-8 py-8"
            >
              {preview.isLoading ? (
                <div className="flex flex-col items-center gap-3 py-24 text-muted-foreground">
                  <Loader2 className="animate-spin" />
                  <p className="text-xs tracking-[0.25em] uppercase">Loading riff…</p>
                </div>
              ) : audioUnavailable ? (
                <div className="glass flex flex-col items-center gap-3 rounded-xl px-6 py-10 text-center">
                  <TriangleAlert className="text-primary" />
                  <p className="font-display text-sm tracking-[0.2em] uppercase">
                    Preview unavailable
                  </p>
                  <p className="text-xs text-muted-foreground">Swapping in another track…</p>
                </div>
              ) : (
                <>
                  <SnippetStage
                    previewUrl={previewUrl}
                    playing
                    volume={volume}
                    onVolumeChange={setVolume}
                    onElapsed={(seconds) => {
                      elapsedRef.current = seconds;
                    }}
                    onFinished={() => finishRound(false)}
                    cover={cover}
                  />

                  <div className="grid w-full gap-3 sm:grid-cols-2">
                    {question?.options.map((option, i) => (
                      <AnswerCard
                        key={option.id}
                        track={option}
                        index={i}
                        disabled={false}
                        state="idle"
                        onSelect={() => handleGuess(option.id)}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => finishRound(false)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-xs tracking-[0.2em] text-muted-foreground uppercase transition-colors hover:border-primary/50 hover:text-foreground"
                  >
                    <SkipForward size={14} /> Skip / Give up
                  </button>
                </>
              )}
            </motion.section>
          ) : (
            <motion.section
              key={`reveal-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-1 flex-col items-center justify-center py-10"
            >
              {track ? (
                <RevealCard
                  track={track}
                  correct={wasCorrect}
                  basePoints={roundPoints.base}
                  speedBonus={roundPoints.speed}
                  countdown={countdown}
                  isLast={isLastRound}
                  onNext={goNext}
                />
              ) : null}
              {selectedId && !wasCorrect ? (
                <p className="mt-4 text-xs tracking-[0.2em] text-muted-foreground uppercase">
                  You picked{" "}
                  {question?.options.find((option) => option.id === selectedId)?.band ?? "—"}
                </p>
              ) : null}
            </motion.section>
          )}
        </AnimatePresence>

        <footer className="pb-2 text-center text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
          Keys 1–4 to answer · Enter for next round
        </footer>
      </div>

    </main>
  );
}
