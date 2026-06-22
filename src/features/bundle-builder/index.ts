/**
 * Bundle builder feature boundary.
 *
 * Owns accordion flow, step navigation, and product selection UI.
 * Business logic lives in the store, selectors, and utils layers.
 */
export const BUNDLE_BUILDER_FEATURE = 'bundle-builder';

export { BundleBuilder } from './BundleBuilder';
export * from './components';
export { useProductSelection } from './hooks/useProductSelection';
export type { ProductSelectionState } from './hooks/useProductSelection';

export type { BundleBuilderFeatureBoundary } from './types';
