import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({ band: z.string().min(1), title: z.string().min(1) });

export type PreviewResult = {
  previewUrl: string | null;
  cover: string | null;
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/\(.*?\)|\[.*?\]/g, "")
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export const getPreview = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }): Promise<PreviewResult> => {
    const query = `artist:"${data.band}" track:"${data.title}"`;
    const attempts = [
      `https://api.deezer.com/search?limit=10&q=${encodeURIComponent(query)}`,
      `https://api.deezer.com/search?limit=10&q=${encodeURIComponent(`${data.band} ${data.title}`)}`,
    ];

    for (const url of attempts) {
      try {
        const res = await fetch(url, { headers: { accept: "application/json" } });
        if (!res.ok) continue;
        const json = (await res.json()) as {
          data?: Array<{
            preview?: string;
            title?: string;
            artist?: { name?: string };
            album?: { cover_big?: string; cover_xl?: string };
          }>;
        };
        const rows = json.data ?? [];
        const wantedBand = normalize(data.band);
        const wantedTitle = normalize(data.title);

        const scored = rows
          .filter((row) => Boolean(row.preview))
          .map((row) => {
            const band = normalize(row.artist?.name ?? "");
            const title = normalize(row.title ?? "");
            let score = 0;
            if (band === wantedBand) score += 3;
            else if (band.includes(wantedBand) || wantedBand.includes(band)) score += 1;
            if (title === wantedTitle) score += 3;
            else if (title.includes(wantedTitle) || wantedTitle.includes(title)) score += 1;
            return { row, score };
          })
          .sort((a, b) => b.score - a.score);

        const best = scored[0];
        if (best && best.score >= 2) {
          return {
            previewUrl: best.row.preview ?? null,
            cover: best.row.album?.cover_xl ?? best.row.album?.cover_big ?? null,
          };
        }
      } catch {
        // try the next query shape
      }
    }

    return { previewUrl: null, cover: null };
  });
