export type PreviewResult = {
  previewUrl: string | null;
  cover: string | null;
};

type DeezerTrack = {
  preview?: string;
  title?: string;
  artist?: { name?: string };
  album?: { cover_big?: string; cover_xl?: string };
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/\(.*?\)|\[.*?\]/g, "")
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function scoreTrack(row: DeezerTrack, wantedBand: string, wantedTitle: string) {
  const band = normalize(row.artist?.name ?? "");
  const title = normalize(row.title ?? "");
  let score = 0;
  if (band === wantedBand) score += 3;
  else if (band.includes(wantedBand) || wantedBand.includes(band)) score += 1;
  if (title === wantedTitle) score += 3;
  else if (title.includes(wantedTitle) || wantedTitle.includes(title)) score += 1;
  return score;
}

export async function fetchTrackPreview(band: string, title: string): Promise<PreviewResult> {
  const query = `artist:"${band}" track:"${title}"`;
  const attempts = [
    `https://api.deezer.com/search?limit=10&q=${encodeURIComponent(query)}`,
    `https://api.deezer.com/search?limit=10&q=${encodeURIComponent(`${band} ${title}`)}`,
  ];
  const wantedBand = normalize(band);
  const wantedTitle = normalize(title);

  for (const url of attempts) {
    try {
      const response = await fetch(url, {
        headers: { accept: "application/json", "user-agent": "RiffSpot/1.0" },
        signal: AbortSignal.timeout(8_000),
      });
      if (!response.ok) continue;
      const payload = (await response.json()) as { data?: DeezerTrack[] };
      const best = (payload.data ?? [])
        .filter((row) => Boolean(row.preview))
        .map((row) => ({ row, score: scoreTrack(row, wantedBand, wantedTitle) }))
        .sort((a, b) => b.score - a.score)[0];

      if (best && best.score >= 2) {
        return {
          previewUrl: best.row.preview ?? null,
          cover: best.row.album?.cover_xl ?? best.row.album?.cover_big ?? null,
        };
      }
    } catch {
      // Try the broader query before reporting this track as unavailable.
    }
  }
  return { previewUrl: null, cover: null };
}