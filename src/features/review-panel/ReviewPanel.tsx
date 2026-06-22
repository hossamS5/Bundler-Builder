import { cn } from "@/utils/classNames";

import { ReviewCategoryGroup } from "./components/ReviewCategoryGroup";
import { ReviewEmptyState } from "./components/ReviewEmptyState";
import { ReviewHeader } from "./components/ReviewHeader";
import { ReviewStaticRow } from "./components/ReviewStaticRow";
import { ReviewSummary } from "./components/ReviewSummary";
import { useReviewPanel } from "./hooks/useReviewPanel";
import ShippingIcon from "@/assets/icons/plan-shipping.svg?react";

export interface ReviewPanelProps {
  className?: string;
}

export function ReviewPanel({ className }: ReviewPanelProps) {
  const {
    categoryGroups,
    hasItems,
    shipping,
    financing,
    guaranteeLabel,
    pricing,
  } = useReviewPanel();

  return (
    <aside
      aria-label="Your security system review"
      className={cn(
        "rounded-[10px] bg-[#EDF4FF] px-5 py-[15px] lg:sticky lg:top-6",
        className,
      )}
    >
      <ReviewHeader />

      <div className="flex flex-col gap-2 mt-4 md:flex-row lg:flex-col">
        <div className="flex-1 min-w-0">
          {hasItems ? (
            <div>
              {categoryGroups.map((group) => (
                <ReviewCategoryGroup key={group.category} group={group} />
              ))}
            </div>
          ) : (
            <ReviewEmptyState />
          )}

          <div className="border-t border-[#DFE5F2] pt-1.5">
            <ReviewStaticRow
              name={shipping.label}
              price={shipping.price}
              compareAtPrice={shipping.compareAtPrice}
              media={<ShippingIcon />}
            />
          </div>
        </div>

        <div className="md:w-[300px] md:shrink-0 lg:w-full">
          <ReviewSummary
            pricing={pricing}
            financing={financing}
            guaranteeLabel={guaranteeLabel}
            canCheckout={hasItems}
          />
        </div>
      </div>
    </aside>
  );
}
