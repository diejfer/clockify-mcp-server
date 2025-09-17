# Clockify MCP Server

[![smithery badge](https://smithery.ai/badge/@https-eduardo/clockify-mcp-server)](https://smithery.ai/server/@https-eduardo/clockify-mcp-server)

This MCP Server integrates with AI Tools to manage your time entries in Clockify, so you can register your time entries just sending an prompt to LLM.

## Next implementations

- Implement tags for entries

## Using in Claude Desktop

### Installing via Smithery

To install clockify-mcp-server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@https-eduardo/clockify-mcp-server):

```bash
npx -y @smithery/cli install @https-eduardo/clockify-mcp-server --client claude
```

### Installing Manually

First, install tsx globally

`npm i -g tsx`

Then insert the MCP server in `claude_desktop_config`

```json
{
  "mcpServers": {
    "clockify-time-entries": {
      "command": "tsx",
      "args": ["ABSOLUTE_PATH/src/index.ts", "--local"],
      "env": {
        "CLOCKIFY_API_URL": "https://api.clockify.me/api/v1"
      }
    }
  }
}
```

### Available tools

Each tool now accepts the Clockify API key as part of the call arguments. This allows a single MCP server instance to serve
multiple Clockify accounts by injecting the API key per request instead of relying on global configuration.

- `create-time-entry`: create a new time entry in the selected workspace.
- `edit-time-entry`: update an existing time entry.
- `delete-time-entry`: remove an existing time entry.
- `list-time-entries`: list entries for a workspace/user.
- `get-workspaces`: list accessible workspaces.
- `get-projects`: fetch projects in a workspace.
- `get-current-user`: retrieve the authenticated Clockify user for the provided API key.
- `generate-detailed-report`: request the Clockify detailed report with optional filters and pagination.
