/**
 * Centralized, typed access to build-time environment configuration.
 *
 * `VITE_API_URL` defaults to `/api`, which is proxied to the backend by Vite
 * during development (see vite.config.ts). In production set it to the
 * deployed API origin, e.g. `https://api.example.com/api`.
 */
export const env = {
  apiBaseUrl: import.meta.env.VITE_API_URL ?? "/api",
} as const;
