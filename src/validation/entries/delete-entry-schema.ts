import { z } from "zod";

export const DeleteEntrySchema = z.object({
  clockifyApiKey: z.string(),
  workspaceId: z.string(),
  timeEntryId: z.string(),
});
