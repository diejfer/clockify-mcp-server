import dotenv from "dotenv";
dotenv.config();
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

export const TEST_WORKSPACE_ID = process.env.TEST_WORKSPACE_ID;
export const TEST_USER_ID = process.env.TEST_USER_ID;
export const TEST_PROJECT_ID = process.env.TEST_PROJECT_ID;

const clockifyApiKey = process.env.CLOCKIFY_API_TOKEN;

if (!clockifyApiKey) {
  throw new Error("CLOCKIFY_API_TOKEN environment variable is required for tests");
}

export const TEST_CLOCKIFY_API_KEY = clockifyApiKey;

export async function createMcpClient() {
  const transport = new StdioClientTransport({
    command: "ts-node",
    args: ["src/index.ts"],
  });

  const client = new Client({
    name: "clockify-test-mcp-client",
    version: "1.1.1",
  });

  await client.connect(transport);

  return client;
}
