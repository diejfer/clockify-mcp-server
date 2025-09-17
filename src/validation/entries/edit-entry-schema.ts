import { z } from "zod";

export const EditEntrySchema = z.object({
  clockifyApiKey: z.string(),
  workspaceId: z.string(),
  timeEntryId: z.string(),
  billable: z.boolean().optional(),
  description: z.string().optional(),
  start: z.union([z.coerce.date(), z.undefined()]).optional(),
  end: z.union([z.coerce.date(), z.undefined()]).optional(),
  projectId: z.string().optional(),
});
