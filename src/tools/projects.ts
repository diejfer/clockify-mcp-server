import { projectsService } from "../clockify-sdk/projects";
import { TOOLS_CONFIG } from "../config/api";
import { z } from "zod";
import { McpResponse, McpToolConfig, TFindProjectSchema } from "../types";

export const findProjectTool: McpToolConfig = {
  name: TOOLS_CONFIG.projects.list.name,
  description: TOOLS_CONFIG.projects.list.description,
  parameters: {
    clockifyApiKey: z
      .string()
      .describe("Clockify API key used to authenticate the request"),
    workspaceId: z
      .string()
      .describe(
        "The ID of the workspace that you need to get the projects from"
      ),
  },
  handler: async ({
    workspaceId,
    clockifyApiKey,
  }: TFindProjectSchema): Promise<McpResponse> => {
    if (!workspaceId && typeof workspaceId === "string")
      throw new Error("Workspace ID required to fetch projects");

    const response = await projectsService.fetchAll(
      workspaceId as string,
      clockifyApiKey
    );
    const projects = response.data.map((project: any) => ({
      name: project.name,
      clientName: project.clientName,
      id: project.id,
    }));

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(projects),
        },
      ],
    };
  },
};
