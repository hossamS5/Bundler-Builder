import { useCallback } from "react";

import {
  createPersistedSnapshot,
  savePersistedBundleState,
} from "@/features/persistence";
import { useBundleStore } from "@/store";

export function useSaveBundle() {
  const activeStep = useBundleStore((state) => state.activeStep);
  const selectedProducts = useBundleStore((state) => state.selectedProducts);

  return useCallback(() => {
    const snapshot = createPersistedSnapshot(activeStep, selectedProducts);
    savePersistedBundleState(snapshot);
  }, [activeStep, selectedProducts]);
}
