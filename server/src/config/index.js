const PORT = Number(process.env.PORT) || 4000;
const HOST = process.env.HOST || "localhost";

const PUBLIC_URL =
  process.env.PUBLIC_URL && process.env.PUBLIC_URL.trim().length > 0
    ? process.env.PUBLIC_URL.replace(/\/$/, "")
    : `http://${HOST}:${PORT}`;

const CORS_ORIGIN = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

export const config = {
  port: PORT,
  host: HOST,
  publicUrl: PUBLIC_URL,
  corsOrigin: CORS_ORIGIN,
  apiPrefix: "/api",
  staticAssetsRoute: "/products",
};
