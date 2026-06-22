import type { ReactNode } from "react";

import { ReviewPrice } from "./ReviewPrice";
import { ReviewThumbnail } from "./ReviewThumbnail";

export interface ReviewStaticRowProps {
  name: string;
  price: number;
  compareAtPrice?: number;
  isMonthly?: boolean;
  image?: string;
  media?: ReactNode;
}

/**
 * Read-only review row (plan / shipping) — fixed quantity, no stepper.
 */
export function ReviewStaticRow({
  name,
  price,
  compareAtPrice,
  isMonthly = false,
  image,
  media,
}: ReviewStaticRowProps) {
  return (
    <div className="flex items-center gap-3 py-2.5">
      <ReviewThumbnail image={image} alt={name}>
        {media}
      </ReviewThumbnail>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold leading-snug text-[#1F1F1F]">
          {name}
        </p>
      </div>

      <ReviewPrice
        price={price}
        compareAtPrice={compareAtPrice}
        isMonthly={isMonthly}
        className="w-20"
      />
    </div>
  );
}
