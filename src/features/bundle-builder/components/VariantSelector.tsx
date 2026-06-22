import type { Variant } from "@/types";
import { cn } from "@/utils/classNames";

export interface VariantSelectorProps {
  variants: Variant[];
  activeVariantId: string;
  onSelect: (variantId: string) => void;
  productName: string;
}

export function VariantSelector({
  variants,
  activeVariantId,
  onSelect,
  productName,
}: VariantSelectorProps) {
  if (variants.length === 0) {
    return null;
  }

  return (
    <div
      className="flex flex-wrap gap-2"
      role="radiogroup"
      aria-label={`${productName} color`}
    >
      {variants.map((variant) => {
        const isActive = variant.id === activeVariantId;

        return (
          <button
            key={variant.id}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onSelect(variant.id)}
            className={cn(
              "flex items-center gap-[1px] rounded-[2px] border-[0.5px] py-[1px] pl-[2px] pr-[6px] text-[10px] transition-colors",
              isActive
                ? "border-[#0AA288] bg-[#1DF0BB0A] text-slate-900"
                : "border-slate bg-white text-[#1F1F1F] hover:border-slate-300",
            )}
          >
            <img src={variant.image} alt={variant.name} className="w-6 h-6" />
            {variant.name}
          </button>
        );
      })}
    </div>
  );
}
