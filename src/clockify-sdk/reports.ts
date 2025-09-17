import { AxiosInstance } from "axios";
import { api } from "../config/api";
import { TGenerateDetailedReportSchema } from "../types";

function withAuthHeader(clockifyApiKey: string) {
  return {
    headers: {
      "X-Api-Key": clockifyApiKey,
    },
  };
}

function ReportsService(apiClient: AxiosInstance) {
  async function generateDetailedReport(
    params: TGenerateDetailedReportSchema
  ) {
    const {
      workspaceId,
      clockifyApiKey,
      dateRangeStart,
      dateRangeEnd,
      userIds,
      projectIds,
      tagIds,
      taskIds,
      clientIds,
      billable,
      page,
      pageSize,
      additionalFilters,
    } = params;

    const detailedFilter: Record<string, unknown> = {
      page: page ?? 1,
      pageSize: pageSize ?? 50,
    };

    const requestBody: Record<string, unknown> = {
      dateRangeStart: dateRangeStart.toISOString(),
      dateRangeEnd: dateRangeEnd.toISOString(),
      detailedFilter,
      sortOrder: "ASCENDING",
      sortColumn: "DATE",
      exportType: "JSON",
    };

    if (userIds?.length) {
      requestBody.users = {
        ids: userIds,
        contains: "CONTAINS",
      };
    }

    if (projectIds?.length) {
      requestBody.projects = {
        ids: projectIds,
        contains: "CONTAINS",
      };
    }

    if (tagIds?.length) {
      requestBody.tags = {
        ids: tagIds,
        contains: "CONTAINS",
      };
    }

    if (taskIds?.length) {
      requestBody.tasks = {
        ids: taskIds,
        contains: "CONTAINS",
      };
    }

    if (clientIds?.length) {
      requestBody.clients = {
        ids: clientIds,
        contains: "CONTAINS",
      };
    }

    if (billable) {
      requestBody.billable = billable;
    }

    if (additionalFilters) {
      Object.assign(requestBody, additionalFilters);
    }

    return apiClient.post(
      `workspaces/${workspaceId}/reports/detailed`,
      requestBody,
      withAuthHeader(clockifyApiKey)
    );
  }

  return { generateDetailedReport };
}

export const reportsService = ReportsService(api);
