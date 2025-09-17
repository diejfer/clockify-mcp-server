import { z } from "zod";
import { TOOLS_CONFIG } from "../config/api";
import { reportsService } from "../clockify-sdk/reports";
import { McpResponse, McpToolConfig, TGenerateDetailedReportSchema } from "../types";

export const generateDetailedReportTool: McpToolConfig = {
  name: TOOLS_CONFIG.reports.detailed.name,
  description: TOOLS_CONFIG.reports.detailed.description,
  parameters: {
    clockifyApiKey: z
      .string()
      .describe("Clockify API key used to authenticate the request"),
    workspaceId: z
      .string()
      .describe("The id of the workspace that owns the report"),
    dateRangeStart: z
      .coerce.date()
      .describe("The inclusive start date for the report range"),
    dateRangeEnd: z
      .coerce.date()
      .describe("The inclusive end date for the report range"),
    userIds: z
      .array(z.string())
      .optional()
      .describe("Filter report by one or more Clockify user ids"),
    projectIds: z
      .array(z.string())
      .optional()
      .describe("Filter report by specific project ids"),
    tagIds: z
      .array(z.string())
      .optional()
      .describe("Filter report by tag ids"),
    taskIds: z
      .array(z.string())
      .optional()
      .describe("Filter report by task ids"),
    clientIds: z
      .array(z.string())
      .optional()
      .describe("Filter report by client ids"),
    billable: z
      .enum(["BILLABLE", "NON_BILLABLE", "BOTH"])
      .optional()
      .describe("Filter report by billable state"),
    page: z
      .number()
      .int()
      .positive()
      .optional()
      .describe("The page number to request from the detailed report"),
    pageSize: z
      .number()
      .int()
      .positive()
      .optional()
      .describe("Number of entries to fetch per page"),
    additionalFilters: z
      .record(z.unknown())
      .optional()
      .describe(
        "Advanced report filters that are passed directly to the Clockify API"
      ),
  },
  handler: async (
    params: TGenerateDetailedReportSchema
  ): Promise<McpResponse> => {
    try {
      const result = await reportsService.generateDetailedReport(params);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result.data),
          },
        ],
      };
    } catch (error: any) {
      throw new Error(`Failed to generate detailed report: ${error.message}`);
    }
  },
};
