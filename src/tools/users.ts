import { TOOLS_CONFIG } from "../config/api";
import { usersService } from "../clockify-sdk/users";
import { ClockifyUser, McpResponse, McpToolConfig } from "../types";
import { z } from "zod";

export const getCurrentUserTool: McpToolConfig = {
  name: TOOLS_CONFIG.users.current.name,
  description: TOOLS_CONFIG.users.current.description,
  parameters: {
    clockifyApiKey: z
      .string()
      .describe("Clockify API key used to authenticate the request"),
  },
  handler: async ({ clockifyApiKey }: { clockifyApiKey: string }): Promise<McpResponse> => {
    const response = await usersService.getCurrent(clockifyApiKey);

    const user: ClockifyUser = {
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,
    };

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(user),
        },
      ],
    };
  },
};
