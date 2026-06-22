import { PriceDisplay } from "@/components/common/PriceDisplay";
import { QuantityStepper } from "@/components/common/QuantityStepper";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { Product } from "@/types";
import { cn } from "@/utils/classNames";
import { getVariantImage } from "@/utils/selection";

import { useProductSelection } from "../hooks/useProductSelection";
import { VariantSelector } from "./VariantSelector";

export interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const {
    activeVariantId,
    quantity,
    isSelected,
    selectVariant,
    increment,
    decrement,
  } = useProductSelection(product);

  const hasVariants = Boolean(product.variants && product.variants.length > 0);
  const imageSrc = getVariantImage(product, activeVariantId);

  console.log(product, "product");

  return (
    <Card
      className={cn(
        "relative p-[11px] h-full transition-all duration-150",
        isSelected
          ? "border-2 border-[#4E2FD2B2] shadow-card"
          : "border-2 border-transparent shadow-card hover:shadow-card-hover",
      )}
    >
      {product.badge ? (
        <Badge className="absolute top-[11px] left-[11px] z-10 shadow-sm">
          <span className="relative top-[-1px]">{product.badge}</span>
        </Badge>
      ) : null}

      <div className="flex gap-[19px] h-full">
        <div className="flex justify-center items-center w-[101px] shrink-0 sm:w-28">
          <img
            src={imageSrc}
            alt={product.name}
            loading="lazy"
            className="object-contain w-full h-[101px] rounded-xl sm:h-28"
          />
        </div>

        <div className="flex flex-col flex-1 gap-[10px] min-w-0">
          <div>
            <h3 className="text-base font-bold text-[#1F1F1F]">
              {product.name}
            </h3>
            <p className="mt-2 text-xs leading-snug text-[#1F1F1FBF]">
              {product.description}{" "}
              {product.learnMoreUrl ? (
                <a
                  href={product.learnMoreUrl}
                  className="font-medium text-indigo-600 underline underline-offset-2 hover:text-indigo-700"
                >
                  Learn More
                </a>
              ) : null}
            </p>
          </div>

          {hasVariants && product.variants ? (
            <VariantSelector
              variants={product.variants}
              activeVariantId={activeVariantId}
              onSelect={selectVariant}
              productName={product.name}
            />
          ) : null}

          <div className="flex gap-3 justify-between items-center">
            <QuantityStepper
              value={quantity}
              onIncrement={increment}
              onDecrement={decrement}
              label={`${product.name} quantity`}
            />
            <PriceDisplay
              price={product.price}
              compareAtPrice={product.compareAtPrice}
              isMonthly={product.isMonthly}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
