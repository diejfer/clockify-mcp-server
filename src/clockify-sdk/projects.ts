import { AxiosInstance } from "axios";
import { api } from "../config/api";

function ProjectsService(api: AxiosInstance) {
  async function fetchAll(workspaceId: string, clockifyApiKey: string) {
    return api.get(`workspaces/${workspaceId}/projects?archived=false`, {
      headers: {
        "X-Api-Key": clockifyApiKey,
      },
    });
  }

  return { fetchAll };
}

export const projectsService = ProjectsService(api);
