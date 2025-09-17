import { TOOLS_CONFIG } from "../config/api";
import { workspacesService } from "../clockify-sdk/workspaces";
import { ClockifyWorkspace, McpResponse, McpToolConfig } from "../types";
import { z } from "zod";

export const findWorkspacesTool: McpToolConfig = {
  name: TOOLS_CONFIG.workspaces.list.name,
  description: TOOLS_CONFIG.workspaces.list.description,
  parameters: {
    clockifyApiKey: z
      .string()
      .describe("Clockify API key used to authenticate the request"),
  },
  handler: async ({ clockifyApiKey }: { clockifyApiKey: string }): Promise<McpResponse> => {
    const response = await workspacesService.fetchAll(clockifyApiKey);

    const workspaces = response.data.map((workspace: ClockifyWorkspace) => ({
      name: workspace.name,
      id: workspace.id,
    }));

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(workspaces),
        },
      ],
    };
  },
};
