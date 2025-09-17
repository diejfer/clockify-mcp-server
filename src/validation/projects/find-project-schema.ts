import { z } from "zod";

export const FindProjectSchema = z.object({
  clockifyApiKey: z.string(),
  workspaceId: z.string(),
});
