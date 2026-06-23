import { Router } from "express";

import catalogRoutes from "./catalog.routes.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

router.use("/", catalogRoutes);

export default router;
