import { cn } from "@/utils/classNames";
import { formatPriceLabel } from "@/utils/format";

export interface ReviewPriceProps {
  price: number;
  compareAtPrice?: number;
  isMonthly?: boolean;
  className?: string;
}

export function ReviewPrice({
  price,
  compareAtPrice,
  isMonthly = false,
  className,
}: ReviewPriceProps) {
  const hasDiscount =
    typeof compareAtPrice === "number" && compareAtPrice > price;

  return (
    <div
      className={cn(
        "flex flex-col items-end text-right leading-tight",
        className,
      )}
    >
      {hasDiscount ? (
        <span className="text-xs text-[#9AA1AC] line-through">
          {formatPriceLabel(compareAtPrice, { isMonthly })}
        </span>
      ) : null}
      <span className="text-sm font-bold text-[#4E2FD2]">
        {formatPriceLabel(price, { isMonthly })}
      </span>
    </div>
  );
}
