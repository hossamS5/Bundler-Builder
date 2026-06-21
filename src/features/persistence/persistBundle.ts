import type { PersistedBundleState } from "@/types";
import { BUNDLE_STORAGE_KEY, BUNDLE_STORAGE_VERSION } from "./constants";

interface StoredBundlePayload {
  version: number;
  savedAt: string;
  state: PersistedBundleState;
}

function isPersistedBundleState(
  value: PersistedBundleState,
): value is PersistedBundleState {
  return (
    typeof value.activeStep === "number" &&
    typeof value.selectedProducts === "object" &&
    value.selectedProducts !== null
  );
}

function isStoredBundlePayload(
  value: StoredBundlePayload,
): value is StoredBundlePayload {
  return (
    value.version === BUNDLE_STORAGE_VERSION &&
    typeof value.savedAt === "string" &&
    isPersistedBundleState(value.state)
  );
}

export function loadPersistedBundleState(): PersistedBundleState | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.localStorage.getItem(BUNDLE_STORAGE_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    const parsedValue = JSON.parse(rawValue) as StoredBundlePayload;

    if (!isStoredBundlePayload(parsedValue)) {
      return null;
    }

    return parsedValue.state;
  } catch {
    return null;
  }
}

export function savePersistedBundleState(state: PersistedBundleState): void {
  if (typeof window === "undefined") {
    return;
  }

  const payload: StoredBundlePayload = {
    version: BUNDLE_STORAGE_VERSION,
    savedAt: new Date().toISOString(),
    state,
  };

  window.localStorage.setItem(BUNDLE_STORAGE_KEY, JSON.stringify(payload));
}

export function clearPersistedBundleState(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(BUNDLE_STORAGE_KEY);
}

export function createPersistedSnapshot(
  activeStep: number,
  selectedProducts: PersistedBundleState["selectedProducts"],
): PersistedBundleState {
  return {
    activeStep,
    selectedProducts,
  };
}
