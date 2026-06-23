import { z } from "zod";

/**
 * Runtime validation for API responses. The frontend never trusts the shape of
 * data coming over the wire — every response is parsed through these schemas,
 * which also act as the single source of truth that the response matches the
 * domain types in `@/types`.
 */

const productCategorySchema = z.enum([
  "cameras",
  "sensors",
  "accessories",
  "plan",
]);

const variantSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string().optional(),
  swatchColor: z.string().optional(),
});

const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: productCategorySchema,
  description: z.string(),
  image: z.string(),
  price: z.number(),
  compareAtPrice: z.number().optional(),
  badge: z.string().optional(),
  learnMoreUrl: z.string().optional(),
  variants: z.array(variantSchema).optional(),
  metadata: z.string().optional(),
  isRequired: z.boolean().optional(),
  isMonthly: z.boolean().optional(),
});

const stepSchema = z.object({
  id: z.string(),
  title: z.string(),
  icon: z.string(),
  nextStepLabel: z.string(),
  productIds: z.array(z.string()),
});

const shippingSchema = z.object({
  label: z.string(),
  price: z.number(),
  compareAtPrice: z.number(),
});

const financingSchema = z.object({
  label: z.string(),
  monthlyAmount: z.number(),
});

const pricingSchema = z.object({
  shipping: shippingSchema,
  financing: financingSchema,
  satisfactionGuaranteeLabel: z.string(),
});

const initialStateSchema = z.object({
  activeStep: z.number(),
  selectedProducts: z.record(
    z.string(),
    z.object({ variants: z.record(z.string(), z.number()) }),
  ),
  activeVariants: z.record(z.string(), z.string()),
});

export const bundleCatalogSchema = z.object({
  products: z.array(productSchema),
  steps: z.array(stepSchema),
  pricing: pricingSchema,
  initialState: initialStateSchema,
});
