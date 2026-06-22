import * as React from "react";

import { cn } from "@/utils/classNames";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("bg-white rounded-[10px]", className)}
      {...props}
    />
  ),
);
Card.displayName = "Card";
