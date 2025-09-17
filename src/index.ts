import dotenv from "dotenv";
dotenv.config();
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { SERVER_CONFIG } from "./config/api";
import {
  createEntryTool,
  deleteEntryTool,
  editEntryTool,
  listEntriesTool,
} from "./tools/entries";
import { findProjectTool } from "./tools/projects";
import { getCurrentUserTool } from "./tools/users";
import { findWorkspacesTool } from "./tools/workspaces";
import { generateDetailedReportTool } from "./tools/reports";
import { z } from "zod";
import { argv } from "process";

export const configSchema = z
  .object({
    clockifyApiToken: z
      .string()
      .describe("Clockify API Token")
      .optional(),
  })
  .default({});

const server = new McpServer(SERVER_CONFIG);

export default function createStatelessServer({
  config: _config,
}: {
  config: z.infer<typeof configSchema>;
}) {
  server.tool(
    createEntryTool.name,
    createEntryTool.description,
    createEntryTool.parameters,
    createEntryTool.handler
  );

  server.tool(
    findProjectTool.name,
    findProjectTool.description,
    findProjectTool.parameters,
    findProjectTool.handler
  );

  server.tool(
    listEntriesTool.name,
    listEntriesTool.description,
    listEntriesTool.parameters,
    listEntriesTool.handler
  );

  server.tool(
    generateDetailedReportTool.name,
    generateDetailedReportTool.description,
    generateDetailedReportTool.parameters,
    generateDetailedReportTool.handler
  );

  server.tool(
    getCurrentUserTool.name,
    getCurrentUserTool.description,
    getCurrentUserTool.handler
  );

  server.tool(
    findWorkspacesTool.name,
    findWorkspacesTool.description,
    findWorkspacesTool.handler
  );

  server.tool(
    deleteEntryTool.name,
    deleteEntryTool.description,
    deleteEntryTool.parameters,
    deleteEntryTool.handler
  );

  server.tool(
    editEntryTool.name,
    editEntryTool.description,
    editEntryTool.parameters,
    editEntryTool.handler
  );
  return server.server;
}

(() => {
  if (argv.find((flag) => flag === "--local")) {
    const clockifyApiToken = process.env.CLOCKIFY_API_TOKEN;
    createStatelessServer({
      config: clockifyApiToken ? { clockifyApiToken } : {},
    });
    const transport = new StdioServerTransport();
    server.connect(transport);
  }
})();
