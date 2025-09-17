import { AxiosInstance } from "axios";
import { api } from "../config/api";
import {
  TCreateEntrySchema,
  TFindEntrySchema,
  TDeleteEntrySchema,
  TEditEntrySchema,
} from "../types";
import { URLSearchParams } from "node:url";

function withAuthHeader(clockifyApiKey: string) {
  return {
    headers: {
      "X-Api-Key": clockifyApiKey,
    },
  };
}

function EntriesService(api: AxiosInstance) {
  async function create(entry: TCreateEntrySchema) {
    const { workspaceId, clockifyApiKey, ...body } = entry;

    return api.post(
      `workspaces/${workspaceId}/time-entries`,
      body,
      withAuthHeader(clockifyApiKey)
    );
  }

  async function find(filters: TFindEntrySchema) {
    const { clockifyApiKey, workspaceId, userId, ...rest } = filters;
    const searchParams = new URLSearchParams();

    if (rest.description) searchParams.append("description", rest.description);

    if (rest.start) searchParams.append("start", rest.start.toISOString());

    if (rest.end) searchParams.append("end", rest.end.toISOString());

    if (rest.project) searchParams.append("project", rest.project);

    return api.get(
      `workspaces/${workspaceId}/user/${userId}/time-entries?${searchParams.toString()}`,
      withAuthHeader(clockifyApiKey)
    );
  }

  async function deleteEntry(params: TDeleteEntrySchema) {
    const { workspaceId, timeEntryId, clockifyApiKey } = params;
    return api.delete(
      `workspaces/${workspaceId}/time-entries/${timeEntryId}`,
      withAuthHeader(clockifyApiKey)
    );
  }

  async function update(params: TEditEntrySchema) {
    const { workspaceId, timeEntryId, clockifyApiKey, ...body } = params;

    return api.put(
      `workspaces/${workspaceId}/time-entries/${timeEntryId}`,
      body,
      withAuthHeader(clockifyApiKey)
    );
  }

  async function getById(
    workspaceId: string,
    timeEntryId: string,
    clockifyApiKey: string
  ) {
    return api.get(
      `workspaces/${workspaceId}/time-entries/${timeEntryId}`,
      withAuthHeader(clockifyApiKey)
    );
  }

  return { create, find, deleteEntry, update, getById };
}

export const entriesService = EntriesService(api);
