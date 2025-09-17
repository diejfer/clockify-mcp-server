import { AxiosInstance } from "axios";
import { api } from "../config/api";

function UsersService(api: AxiosInstance) {
  async function getCurrent(clockifyApiKey: string) {
    return api.get("user", {
      headers: {
        "X-Api-Key": clockifyApiKey,
      },
    });
  }

  return { getCurrent };
}

export const usersService = UsersService(api);
