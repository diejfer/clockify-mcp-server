import { z } from "zod";

export const FindEntrySchema = z.object({
  clockifyApiKey: z.string(),
  workspaceId: z.string(),
  userId: z.string(),
  description: z.string().optional(),
  start: z.coerce.date().optional(),
  end: z.coerce.date().optional(),
  project: z.string().optional(),
});
