/**
 * Review panel feature boundary.
 *
 * Owns live summary rendering, grouped line items, and checkout actions.
 * Pricing and grouping are derived through selectors.
 */
export const REVIEW_PANEL_FEATURE = "review-panel";

export { ReviewPanel } from "./ReviewPanel";
export type { ReviewPanelProps } from "./ReviewPanel";

export * from "./components";

export { useReviewPanel } from "./hooks/useReviewPanel";
export type { ReviewPanelViewModel } from "./hooks/useReviewPanel";
export { useReviewItemQuantity } from "./hooks/useReviewItemQuantity";
export type { ReviewItemQuantityControls } from "./hooks/useReviewItemQuantity";

export type { ReviewPanelFeatureBoundary } from "./types";
