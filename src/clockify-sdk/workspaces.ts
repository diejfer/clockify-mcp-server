import { AxiosInstance } from "axios";
import { api } from "../config/api";

function WorkspacesService(api: AxiosInstance) {
  async function fetchAll(clockifyApiKey: string) {
    return api.get(`workspaces`, {
      headers: {
        "X-Api-Key": clockifyApiKey,
      },
    });
  }

  return { fetchAll };
}

export const workspacesService = WorkspacesService(api);
