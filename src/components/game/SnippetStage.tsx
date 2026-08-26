import { useEffect, useRef, useState } from "react";
import { Disc3, Play, Volume1, Volume2, VolumeX } from "lucide-react";

const SNIPPET_SECONDS = 30;
const BAR_COUNT = 40;

type Props = {
  previewUrl: string | null;
  playing: boolean;
  volume: number;
  onVolumeChange: (value: number) => void;
  onElapsed: (seconds: number) => void;
  onFinished: () => void;
  cover: string | null;
};

export function SnippetStage({
  previewUrl,
  playing,
  volume,
  onVolumeChange,
  onElapsed,
  onFinished,
  cover,
}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataRef = useRef<Uint8Array | null>(null);
  const rafRef = useRef<number | null>(null);
  const finishedRef = useRef(false);
  const onElapsedRef = useRef(onElapsed);
  const onFinishedRef = useRef(onFinished);
  onElapsedRef.current = onElapsed;
  onFinishedRef.current = onFinished;

  const [elapsed, setElapsed] = useState(0);
  const [levels, setLevels] = useState<number[]>(() => new Array(BAR_COUNT).fill(0.08));
  const [playbackBlocked, setPlaybackBlocked] = useState(false);

  // Volume
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // Play / stop the snippet
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    finishedRef.current = false;
    setPlaybackBlocked(false);
    setElapsed(0);
    onElapsedRef.current(0);

    if (!playing || !previewUrl) {
      audio.pause();
      return;
    }

    audio.currentTime = 0;
    audio.volume = volume;
    void audio.play().catch(() => setPlaybackBlocked(true));

    // Web Audio analyser (best effort — CORS may block it)
    try {
      const Ctx =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (Ctx && !analyserRef.current) {
        const ctx = new Ctx();
        const source = ctx.createMediaElementSource(audio);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 128;
        source.connect(analyser);
        analyser.connect(ctx.destination);
        analyserRef.current = analyser;
        dataRef.current = new Uint8Array(analyser.frequencyBinCount);
      }
      void (analyserRef.current?.context as AudioContext | undefined)?.resume?.();
    } catch {
      analyserRef.current = null;
    }

    const tick = () => {
      const current = audioRef.current;
      if (current) {
        const t = Math.min(current.currentTime, SNIPPET_SECONDS);
        setElapsed(t);
        onElapsedRef.current(t);
        if (!finishedRef.current && t >= SNIPPET_SECONDS - 0.05) {
          finishedRef.current = true;
          current.pause();
          onFinishedRef.current();
        }
      }

      const analyser = analyserRef.current;
      const data = dataRef.current;
      if (analyser && data) {
        analyser.getByteFrequencyData(data as Uint8Array<ArrayBuffer>);
        const step = Math.max(1, Math.floor(data.length / BAR_COUNT));
        setLevels(
          Array.from({ length: BAR_COUNT }, (_, i) => {
            const value = data[i * step] ?? 0;
            return Math.max(0.08, value / 255);
          }),
        );
      } else {
        const now = performance.now() / 1000;
        setLevels(
          Array.from({ length: BAR_COUNT }, (_, i) => {
            const wave = Math.sin(now * 6 + i * 0.5) * 0.5 + 0.5;
            const wave2 = Math.sin(now * 3.3 + i * 1.1) * 0.5 + 0.5;
            return Math.max(0.1, wave * 0.6 + wave2 * 0.4);
          }),
        );
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      audio.pause();
    };
  }, [playing, previewUrl]);

  const resumePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;
    void audio.play().then(() => setPlaybackBlocked(false));
  };

  const ended = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    onFinishedRef.current();
  };

  const progress = Math.min(1, elapsed / SNIPPET_SECONDS);
  const remaining = Math.max(0, Math.ceil(SNIPPET_SECONDS - elapsed));
  const radius = 132;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex flex-col items-center gap-6">
      <audio
        ref={audioRef}
        src={previewUrl ?? undefined}
        crossOrigin="anonymous"
        onEnded={ended}
        preload="auto"
      />

      <div className="relative h-72 w-72 sm:h-80 sm:w-80">
        <svg viewBox="0 0 300 300" className="absolute inset-0 h-full w-full -rotate-90">
          <circle
            cx="150"
            cy="150"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-white/10"
          />
          <circle
            cx="150"
            cy="150"
            r={radius}
            fill="none"
            stroke="url(#riffRing)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            style={{ transition: "stroke-dashoffset 120ms linear" }}
          />
          <defs>
            <linearGradient id="riffRing" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--primary)" />
              <stop offset="100%" stopColor="var(--violet)" />
            </linearGradient>
          </defs>
        </svg>

        {/* vinyl */}
        <div className="absolute inset-8 grid place-items-center">
          <div
            className={`relative h-full w-full overflow-hidden rounded-full border border-white/10 bg-[radial-gradient(circle_at_center,#26262c_0%,#101014_60%,#08080a_100%)] ${playing ? "animate-vinyl" : ""}`}
          >
            {[0.86, 0.72, 0.58, 0.44].map((scale) => (
              <div
                key={scale}
                className="absolute rounded-full border border-white/5"
                style={{
                  inset: `${((1 - scale) / 2) * 100}%`,
                }}
              />
            ))}
            <div className="absolute inset-[32%] overflow-hidden rounded-full border border-white/20 bg-primary/80 shadow-inner">
              {cover ? (
                <img
                  src={cover}
                  alt=""
                  aria-hidden
                  className="h-full w-full object-cover opacity-40 blur-md"
                />
              ) : null}
            </div>
            <div className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background" />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="glass flex flex-col items-center rounded-2xl px-4 py-2">
            <span className="font-display text-3xl leading-none tabular-nums">{remaining}s</span>
            <span className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
              left
            </span>
          </div>
        </div>
        {playbackBlocked ? (
          <button
            type="button"
            onClick={resumePlayback}
            className="glow-primary absolute inset-0 m-auto flex h-20 w-20 items-center justify-center rounded-full border border-primary/60 bg-background/90 text-primary"
            aria-label="Play riff"
          >
            <Play size={28} fill="currentColor" />
          </button>
        ) : null}
      </div>

      {/* visualizer */}
      <div className="flex h-16 w-full max-w-xl items-end justify-center gap-[3px]">
        {levels.map((level, i) => (
          <div
            key={i}
            className="w-full max-w-2 rounded-full bg-gradient-to-t from-primary to-violet"
            style={{
              height: `${Math.max(6, level * 100)}%`,
              opacity: playing ? 0.55 + level * 0.45 : 0.25,
              transition: "height 90ms linear",
            }}
          />
        ))}
      </div>

      {/* volume */}
      <div className="glass flex w-full max-w-xs items-center gap-3 rounded-full px-4 py-2">
        <button
          type="button"
          onClick={() => onVolumeChange(volume > 0 ? 0 : 0.8)}
          className="text-muted-foreground transition-colors hover:text-foreground"
          aria-label={volume > 0 ? "Mute" : "Unmute"}
        >
          {volume === 0 ? (
            <VolumeX size={18} />
          ) : volume < 0.5 ? (
            <Volume1 size={18} />
          ) : (
            <Volume2 size={18} />
          )}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => onVolumeChange(Number(e.target.value))}
          aria-label="Volume"
          className="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-primary"
        />
        <Disc3 size={16} className="shrink-0 text-muted-foreground" />
      </div>
    </div>
  );
}

export { SNIPPET_SECONDS };
