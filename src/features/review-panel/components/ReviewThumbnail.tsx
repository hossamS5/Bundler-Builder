import type { ReactNode } from "react";

import { cn } from "@/utils/classNames";

export interface ReviewThumbnailProps {
  image?: string;
  alt?: string;
  children?: ReactNode;
  className?: string;
}

export function ReviewThumbnail({
  image,
  alt = "",
  children,
  className,
}: ReviewThumbnailProps) {
  return (
    <div
      className={cn(
        "flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#E3E9F4] bg-white",
        className,
      )}
    >
      {image ? (
        <img
          src={image}
          alt={alt}
          loading="lazy"
          className="h-9 w-9 object-contain"
        />
      ) : (
        children
      )}
    </div>
  );
}
