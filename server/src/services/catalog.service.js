import { config } from "../config/index.js";
import { readJson } from "../lib/jsonDb.js";
import { HttpError } from "../lib/httpError.js";

const CATALOG_COLLECTION = "bundle";

function toAbsoluteAssetUrl(path) {
  if (!path) {
    return path;
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${config.publicUrl}${normalizedPath}`;
}

function withAbsoluteImages(product) {
  return {
    ...product,
    image: toAbsoluteAssetUrl(product.image),
    variants: product.variants?.map((variant) => ({
      ...variant,
      image: toAbsoluteAssetUrl(variant.image),
    })),
  };
}

async function loadCatalog() {
  return readJson(CATALOG_COLLECTION);
}

/**
 * Returns the full catalog with every image resolved to an absolute URL,
 * so the frontend can render `product.image` directly regardless of host.
 */
export async function getCatalog() {
  const catalog = await loadCatalog();

  return {
    ...catalog,
    products: catalog.products.map(withAbsoluteImages),
  };
}

export async function getProducts() {
  const catalog = await loadCatalog();
  return catalog.products.map(withAbsoluteImages);
}

export async function getProductById(productId) {
  const catalog = await loadCatalog();
  const product = catalog.products.find((item) => item.id === productId);

  if (!product) {
    throw HttpError.notFound(`Product "${productId}" was not found`);
  }

  return withAbsoluteImages(product);
}
