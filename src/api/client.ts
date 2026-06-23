import axios, { AxiosError, type AxiosInstance } from "axios";

import { env } from "@/config/env";

export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/** Shared axios instance — single place for base URL, headers, timeouts. */
export const httpClient: AxiosInstance = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 15000,
  headers: { Accept: "application/json" },
});

function toApiError(error: unknown): ApiError {
  if (error instanceof AxiosError) {
    const status = error.response?.status ?? 0;
    const serverMessage = (
      error.response?.data as { error?: { message?: string } } | undefined
    )?.error?.message;

    return new ApiError(status, serverMessage ?? error.message);
  }

  return new ApiError(
    0,
    error instanceof Error ? error.message : "Network request failed",
  );
}

/**
 * Typed GET helper. Centralizes error normalization so feature code only ever
 * deals with `ApiError`, never raw axios errors.
 */
export async function apiGet<T>(path: string, signal?: AbortSignal): Promise<T> {
  try {
    const response = await httpClient.get<T>(path, { signal });
    return response.data;
  } catch (error) {
    throw toApiError(error);
  }
}
