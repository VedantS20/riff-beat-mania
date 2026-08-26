import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { fetchTrackPreview, type PreviewResult } from "./preview.server";

export const getPreview = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) =>
    z.object({ band: z.string().min(1), title: z.string().min(1) }).parse(data),
  )
  .handler(async ({ data }): Promise<PreviewResult> => {
    return fetchTrackPreview(data.band, data.title);
  });
