import * as catalogService from "../services/catalog.service.js";

export async function getCatalog(_req, res) {
  const catalog = await catalogService.getCatalog();
  res.json(catalog);
}

export async function getProducts(_req, res) {
  const products = await catalogService.getProducts();
  res.json(products);
}

export async function getProductById(req, res) {
  const product = await catalogService.getProductById(req.params.id);
  res.json(product);
}
