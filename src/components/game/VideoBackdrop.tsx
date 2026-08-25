import { useEffect, useRef, useState } from "react";

type Props = {
  youtubeId: string;
  startSeconds: number;
  cover: string | null;
  overlay: number;
};

type YTPlayer = { destroy: () => void };
type YTNamespace = {
  Player: new (
    el: HTMLElement,
    opts: Record<string, unknown>,
  ) => YTPlayer;
};

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<YTNamespace> | null = null;

function loadYouTubeApi(): Promise<YTNamespace> {
  if (typeof window === "undefined") return Promise.reject(new Error("no window"));
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;

  apiPromise = new Promise<YTNamespace>((resolve, reject) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      if (window.YT?.Player) resolve(window.YT);
      else reject(new Error("YouTube API unavailable"));
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    script.onerror = () => reject(new Error("YouTube API failed to load"));
    document.head.appendChild(script);
  });
  return apiPromise;
}

export function VideoBackdrop({ youtubeId, startSeconds, cover, overlay }: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setReady(false);
    setFailed(false);

    loadYouTubeApi()
      .then((YT) => {
        if (cancelled || !hostRef.current) return;
        playerRef.current = new YT.Player(hostRef.current, {
          videoId: youtubeId,
          playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
            disablekb: 1,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            fs: 0,
            iv_load_policy: 3,
            start: Math.max(0, Math.floor(startSeconds)),
          },
          events: {
            onReady: (event: { target: { playVideo: () => void; mute: () => void } }) => {
              event.target.mute();
              event.target.playVideo();
              if (!cancelled) setReady(true);
            },
            onError: () => {
              if (!cancelled) setFailed(true);
            },
          },
        });
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
      try {
        playerRef.current?.destroy();
      } catch {
        /* ignore */
      }
      playerRef.current = null;
    };
  }, [youtubeId, startSeconds]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      {cover ? (
        <img
          src={cover}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-60 blur-xl"
        />
      ) : null}

      {!failed ? (
        <div
          className="absolute top-1/2 left-1/2 h-[115vh] w-[205vh] min-w-[115vw] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700"
          style={{ opacity: ready ? 1 : 0 }}
        >
          <div ref={hostRef} className="h-full w-full" />
        </div>
      ) : null}

      <div
        className="absolute inset-0 bg-background transition-opacity duration-500"
        style={{ opacity: overlay }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/70" />
    </div>
  );
}
