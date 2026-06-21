export type ProductCategory = 'cameras' | 'sensors' | 'accessories' | 'plan';

export interface Variant {
  id: string;
  name: string;
  image?: string;
  swatchColor?: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  image: string;
  price: number;
  compareAtPrice?: number;
  badge?: string;
  learnMoreUrl?: string;
  variants?: Variant[];
  metadata?: string;
  isRequired?: boolean;
  isMonthly?: boolean;
}

export interface BundleStep {
  id: string;
  title: string;
  icon: string;
  nextStepLabel: string;
  productIds: string[];
}

export interface ShippingConfig {
  label: string;
  price: number;
  compareAtPrice: number;
}

export interface FinancingConfig {
  label: string;
  monthlyAmount: number;
}

export interface PricingConfig {
  shipping: ShippingConfig;
  financing: FinancingConfig;
  satisfactionGuaranteeLabel: string;
}

export interface ProductSelection {
  variants: Record<string, number>;
}

export type SelectedProducts = Record<string, ProductSelection>;

export interface BundleInitialState {
  activeStep: number;
  selectedProducts: SelectedProducts;
  activeVariants: Record<string, string>;
}

export interface BundleCatalog {
  products: Product[];
  steps: BundleStep[];
  pricing: PricingConfig;
  initialState: BundleInitialState;
}

export interface PersistedBundleState {
  activeStep: number;
  selectedProducts: SelectedProducts;
}

export interface ReviewLineItem {
  productId: string;
  variantId: string;
  name: string;
  category: ProductCategory;
  image: string;
  quantity: number;
  unitPrice: number;
  unitCompareAtPrice: number;
  linePrice: number;
  lineCompareAtPrice: number;
  metadata?: string;
  isRequired?: boolean;
  isMonthly?: boolean;
}

export interface ReviewCategoryGroup {
  category: ProductCategory;
  label: string;
  items: ReviewLineItem[];
}

export interface PricingSummary {
  subtotal: number;
  compareAtSubtotal: number;
  discount: number;
  total: number;
  savings: number;
}

export const DEFAULT_VARIANT_ID = 'default' as const;

export const REVIEW_CATEGORY_LABELS: Record<ProductCategory, string> = {
  cameras: 'Cameras',
  sensors: 'Sensors',
  accessories: 'Accessories',
  plan: 'Plan',
};

export const REVIEW_CATEGORY_ORDER: ProductCategory[] = [
  'cameras',
  'sensors',
  'accessories',
  'plan',
];
