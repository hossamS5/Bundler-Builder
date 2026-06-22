import type { ReviewCategoryGroup as ReviewCategoryGroupModel } from "@/types";

import { ReviewLineItem } from "./ReviewLineItem";
import { ReviewStaticRow } from "./ReviewStaticRow";

export interface ReviewCategoryGroupProps {
  group: ReviewCategoryGroupModel;
}

export function ReviewCategoryGroup({ group }: ReviewCategoryGroupProps) {
  const isPlan = group.category === "plan";

  return (
    <section className="border-t border-[#DFE5F2] py-1.5 first:border-t-0">
      <h3 className="pt-2 text-xs uppercase tracking-wide text-[#A8B2BD]">
        {group.label}
      </h3>

      {isPlan ? (
        <div>
          {group.items.map((item) => (
            <ReviewStaticRow
              key={`${item.productId}-${item.variantId}`}
              name={item.name}
              image={item.image}
              price={item.unitPrice}
              compareAtPrice={item.unitCompareAtPrice}
              isMonthly={item.isMonthly}
            />
          ))}
        </div>
      ) : (
        <ul>
          {group.items.map((item) => (
            <ReviewLineItem
              key={`${item.productId}-${item.variantId}`}
              item={item}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
