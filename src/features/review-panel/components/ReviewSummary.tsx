import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { useSaveBundle } from "@/hooks";
import type { FinancingConfig, PricingSummary } from "@/types";
import { cn } from "@/utils/classNames";
import { formatCurrency } from "@/utils/format";

import OfferBadgeIcon from "@/assets/icons/offer-badge.svg?react";

export interface ReviewSummaryProps {
  pricing: PricingSummary;
  financing: FinancingConfig;
  guaranteeLabel: string;
  canCheckout: boolean;
}

export function ReviewSummary({
  pricing,
  financing,
  canCheckout,
}: ReviewSummaryProps) {
  const saveBundle = useSaveBundle();
  const [isSaved, setIsSaved] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);

  const hasDiscount = pricing.compareAtSubtotal > pricing.total;

  const handleSave = () => {
    saveBundle();
    setIsSaved(true);
    window.setTimeout(() => setIsSaved(false), 2400);
  };

  const handleCheckout = () => {
    setIsCheckedOut(true);
    window.setTimeout(() => setIsCheckedOut(false), 2400);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <OfferBadgeIcon />

        <div className="flex flex-1 flex-col items-end gap-1.5">
          <span className="rounded-md bg-[#4E2FD2] px-2 py-1 text-xs font-semibold text-white">
            {financing.label}
          </span>
          <div className="flex gap-2 items-baseline">
            {hasDiscount ? (
              <span className="text-base text-[#9AA1AC] line-through">
                {formatCurrency(pricing.compareAtSubtotal)}
              </span>
            ) : null}
            <span className="text-2xl font-extrabold text-[#4E2FD2]">
              {formatCurrency(pricing.total)}
            </span>
          </div>
        </div>
      </div>

      {pricing.savings > 0 ? (
        <p className="text-xs font-medium text-center text-[#0AA288]">
          {`Congrats! You're saving ${formatCurrency(pricing.savings)} on your security bundle!`}
        </p>
      ) : null}

      <Button
        size="lg"
        onClick={handleCheckout}
        disabled={!canCheckout}
        className={cn(
          "h-12 w-full text-base !rounded-[4px] !mt-1",
          isCheckedOut && "bg-emerald-600",
        )}
      >
        {isCheckedOut ? "Order placed!" : "Checkout"}
      </Button>

      <button
        type="button"
        onClick={handleSave}
        className="block w-full !mt-2 !mb-4 text-center text-sm italic text-[#484848] underline underline-offset-2 transition-colors hover:text-[#4E2FD2] focus:outline-none focus-visible:text-[#4E2FD2]"
      >
        {isSaved ? "System saved!" : "Save my system for later"}
      </button>
    </div>
  );
}
