import { cn } from "@/utils/classNames";
import { formatCurrency, formatPriceLabel } from "@/utils/format";

export interface PriceDisplayProps {
  price: number;
  compareAtPrice?: number;
  isMonthly?: boolean;
  align?: "left" | "right";
  className?: string;
}

export function PriceDisplay({
  price,
  compareAtPrice,
  isMonthly = false,
  align = "right",
  className,
}: PriceDisplayProps) {
  const hasDiscount =
    typeof compareAtPrice === "number" && compareAtPrice > price;

  return (
    <div
      className={cn(
        "flex flex-col",
        align === "right" ? "items-end text-right" : "items-start text-left",
        className,
      )}
    >
      {hasDiscount ? (
        <span className="text-base text-[#D8392B] line-through relative top-[4px]">
          {formatCurrency(compareAtPrice)}
        </span>
      ) : null}
      <span className="text-base text-[#575757]">
        {formatPriceLabel(price, { isMonthly })}
      </span>
    </div>
  );
}
