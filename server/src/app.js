import cors from "cors";
import express from "express";

import { config } from "./config/index.js";
import { publicDir } from "./lib/paths.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./middleware/notFound.js";
import routes from "./routes/index.js";

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: config.corsOrigin,
    }),
  );
  app.use(express.json());

  // Static product images, served at /products/*
  app.use(
    config.staticAssetsRoute,
    express.static(`${publicDir}/products`, {
      maxAge: "1d",
    }),
  );

  // API routes, mounted under /api
  app.use(config.apiPrefix, routes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
