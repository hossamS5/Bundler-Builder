import { Router } from "express";

import * as catalogController from "../controllers/catalog.controller.js";
import { asyncHandler } from "../lib/asyncHandler.js";

const router = Router();

router.get("/catalog", asyncHandler(catalogController.getCatalog));
router.get("/products", asyncHandler(catalogController.getProducts));
router.get("/products/:id", asyncHandler(catalogController.getProductById));

export default router;
