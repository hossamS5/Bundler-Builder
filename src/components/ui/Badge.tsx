import * as React from "react";

import { cn } from "@/utils/classNames";

export type BadgeTone = "primary" | "success";

const TONE_CLASSES: Record<BadgeTone, string> = {
  primary: "bg-[#4E2FD2] text-white",
  success: "bg-emerald-600 text-white",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

export function Badge({ className, tone = "primary", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "flex justify-center items-center text-xs font-semibold rounded-full px-[6px] py-[2px]",
        TONE_CLASSES[tone],
        className,
      )}
      {...props}
    />
  );
}
