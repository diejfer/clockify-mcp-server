import { z } from "zod";

export const GenerateDetailedReportSchema = z.object({
  clockifyApiKey: z.string(),
  workspaceId: z.string(),
  dateRangeStart: z.coerce.date(),
  dateRangeEnd: z.coerce.date(),
  userIds: z.array(z.string()).min(1).optional(),
  projectIds: z.array(z.string()).optional(),
  tagIds: z.array(z.string()).optional(),
  taskIds: z.array(z.string()).optional(),
  clientIds: z.array(z.string()).optional(),
  billable: z.enum(["BILLABLE", "NON_BILLABLE", "BOTH"]).optional(),
  page: z.number().int().positive().optional(),
  pageSize: z.number().int().positive().optional(),
  additionalFilters: z.record(z.unknown()).optional(),
});
