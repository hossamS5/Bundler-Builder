import { getProductsForStep } from "@/data";
import { useCatalog } from "@/features/catalog";
import { selectSelectedCountPerStep, selectSteps } from "@/selectors";
import { useBundleStore } from "@/store";

import { Step } from "./Step";

export function BundleAccordion() {
  const catalog = useCatalog();
  const activeStep = useBundleStore((state) => state.activeStep);
  const selectedProducts = useBundleStore((state) => state.selectedProducts);
  const setActiveStep = useBundleStore((state) => state.setActiveStep);
  const goToNextStep = useBundleStore((state) => state.goToNextStep);

  const steps = selectSteps(catalog);
  const selectedCountPerStep = selectSelectedCountPerStep({
    catalog,
    selectedProducts,
  });

  const handleToggle = (index: number) => {
    setActiveStep(index === activeStep ? -1 : index);
  };

  return (
    <div className="flex flex-col gap-[13px]">
      {steps.map((step, index) => (
        <Step
          key={step.id}
          step={step}
          index={index}
          totalSteps={steps.length}
          products={getProductsForStep(catalog, index)}
          isOpen={index === activeStep}
          selectedCount={selectedCountPerStep[index] ?? 0}
          isLastStep={index === steps.length - 1}
          onToggle={handleToggle}
          onNext={goToNextStep}
        />
      ))}
    </div>
  );
}
