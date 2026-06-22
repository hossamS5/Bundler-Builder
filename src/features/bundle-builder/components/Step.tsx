import { StepIcon } from "@/components/icons/StepIcon";
import { Button } from "@/components/ui/Button";
import type { BundleStep, Product } from "@/types";
import { cn } from "@/utils/classNames";
import ArrowIcon from "@/assets/icons/arrow.svg?react";

import { ProductCard } from "./ProductCard";

export interface StepProps {
  step: BundleStep;
  index: number;
  totalSteps: number;
  products: Product[];
  isOpen: boolean;
  selectedCount: number;
  isLastStep: boolean;
  onToggle: (index: number) => void;
  onNext: () => void;
}

export function Step({
  step,
  index,
  totalSteps,
  products,
  isOpen,
  selectedCount,
  isLastStep,
  onToggle,
  onNext,
}: StepProps) {
  const panelId = `step-panel-${step.id}`;
  const headerId = `step-header-${step.id}`;
  const productCount = products.length;

  return (
    <div
      className={cn(
        "overflow-hidden transition-colors duration-150",
        isOpen ? " bg-[#EDF4FF] rounded-[10px] py-[15px]" : "bg-transparent ",
      )}
    >
      <span className="block px-[15px] mb-[5px] text-[10px] font-semibold uppercase  text-[#484848]">
        {`Step ${index + 1} of ${totalSteps}`}
      </span>

      <div
        className={`px-[15px] py-5 border-[0.5px] border-l-0 border-r-0 border-t-[#1F1F1F] ${!isOpen ? " border-b-[#1F1F1F]" : ""}`}
      >
        <button
          id={headerId}
          type="button"
          onClick={() => onToggle(index)}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className={cn(
            "flex w-full items-center gap-2 text-left transition-colors",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500",
          )}
        >
          <span
            className={cn(
              "shrink-0",
              isOpen ? "text-indigo-600" : "text-slate-400",
            )}
          >
            <StepIcon name={step.icon} />
          </span>

          <h2 className="block truncate text-[#0B0D10] text-[22px]">
            {step.title}
          </h2>

          <span className="flex shrink-0 items-center gap-2 ml-auto">
            {isOpen ? (
              <span className="whitespace-nowrap text-sm font-semibold text-indigo-600">
                {`${selectedCount} selected`}
              </span>
            ) : null}
            <ArrowIcon className={cn(isOpen ? "rotate-180" : "rotate-0")} />
          </span>
        </button>
      </div>

      {isOpen ? (
        <div
          id={panelId}
          role="region"
          aria-labelledby={headerId}
          className="px-5 pb-6 pt-1"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {products.map((product, productIndex) => {
              const isLoneLast =
                productIndex === productCount - 1 && productCount % 2 === 1;

              return (
                <div
                  key={product.id}
                  className={cn(
                    isLoneLast &&
                      "sm:col-span-2 sm:mx-auto sm:w-[calc(50%-0.5rem)]",
                  )}
                >
                  <ProductCard product={product} />
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex justify-center">
            <Button
              variant="outline"
              size="lg"
              onClick={onNext}
              disabled={isLastStep}
              className="min-w-[240px]"
            >
              {step.nextStepLabel}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
