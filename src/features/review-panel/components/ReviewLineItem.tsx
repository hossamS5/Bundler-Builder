import { QuantityStepper } from "@/components/common/QuantityStepper";
import type { ReviewLineItem as ReviewLineItemModel } from "@/types";

import { useReviewItemQuantity } from "../hooks/useReviewItemQuantity";
import { ReviewPrice } from "./ReviewPrice";
import { ReviewThumbnail } from "./ReviewThumbnail";

export interface ReviewLineItemProps {
  item: ReviewLineItemModel;
}

export function ReviewLineItem({ item }: ReviewLineItemProps) {
  const { onIncrement, onDecrement } = useReviewItemQuantity(
    item.productId,
    item.variantId,
  );

  const minQuantity = item.isRequired ? 1 : 0;

  return (
    <li className="flex items-center gap-3 py-2.5">
      <ReviewThumbnail image={item.image} alt={item.name} />

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold leading-snug text-[#0B0D10]">
          {item.name}
        </p>
        {item.metadata ? (
          <p className="text-xs text-[#8A93A4]">{item.metadata}</p>
        ) : null}
      </div>

      <QuantityStepper
        value={item.quantity}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        min={minQuantity}
        label={`${item.name} quantity`}
        variant="review"
      />

      <ReviewPrice
        price={item.linePrice}
        compareAtPrice={item.lineCompareAtPrice}
        className="w-16"
      />
    </li>
  );
}
