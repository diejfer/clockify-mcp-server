import axios from "axios";

export const api = axios.create({
  baseURL: process.env.CLOCKIFY_API_URL || "https://api.clockify.me/api/v1",
});

export const reportsApi = axios.create({
  baseURL: process.env.CLOCKIFY_REPORTS_API_URL || "https://reports.api.clockify.me/v1",
});

export const SERVER_CONFIG = {
  name: "Clockify MCP Server",
  version: "1.0.0",
  description:
    "A service that integrates with Clockify API to manage time entries",
};

export const TOOLS_CONFIG = {
  workspaces: {
    list: {
      name: "get-workspaces",
      description:
        "Get user available workspaces id and name, a workspace is required to manage time entries",
    },
  },
  projects: {
    list: {
      name: "get-projects",
      description:
        "Get workspace projects id and name, the projects can be associated with time entries",
    },
  },
  users: {
    current: {
      name: "get-current-user",
      description:
        "Get the current user id and name, to search for entries is required to have the user id",
    },
  },
  reports: {
    detailed: {
      name: "generate-detailed-report",
      description:
        "Generate a detailed time entry report for specific users in a workspace",
    },
  },
  entries: {
    create: {
      name: "create-time-entry",
      description:
        "Register a new time entry of a task or break in a workspace",
    },
    list: {
      name: "list-time-entries",
      description: "Get registered time entries from a workspace",
    },
    delete: {
      name: "delete-time-entry",
      description: "Delete a specific time entry from a workspace",
    },
    edit: {
      name: "edit-time-entry",
      description: "Edit an existing time entry in a workspace",
    },
  },
};
