import { after, describe, it } from "node:test";
import { createMcpClient, TEST_USER_ID, TEST_CLOCKIFY_API_KEY } from "./setup";
import assert from "node:assert";
import { ClockifyUser, McpResponse } from "../src/types";

describe("Users MCP Tests", async () => {
  const client = await createMcpClient();

  after(async () => {
    await client.close();
  });

  it("Retrieve current user info", async () => {
    const response = (await client.callTool({
      name: "get-current-user",
      arguments: {
        clockifyApiKey: TEST_CLOCKIFY_API_KEY,
      },
    })) as McpResponse;

    const user: ClockifyUser = JSON.parse(response.content[0].text as string);
    assert(user.id === TEST_USER_ID);
  });
});
