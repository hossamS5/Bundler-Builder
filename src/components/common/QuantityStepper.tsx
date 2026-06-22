import { cn } from "@/utils/classNames";

export interface QuantityStepperProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  disabled?: boolean;
  label?: string;
  size?: "sm" | "md";
}

const MinusGlyph = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
    <path
      d="M5 12h14"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </svg>
);

const PlusGlyph = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
    <path
      d="M12 5v14M5 12h14"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </svg>
);

export function QuantityStepper({
  value,
  onIncrement,
  onDecrement,
  min = 0,
  disabled = false,
  label = "Quantity",
  size = "md",
}: QuantityStepperProps) {
  const isDecrementDisabled = disabled || value <= min;

  const buttonSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  const valueWidth = size === "sm" ? "w-2 text-sm" : "w-4 text-base";

  const buttonBase = cn(
    "flex items-center justify-center rounded-[4px] bg-[#F0F4F7] text-[#525963] text-xs transition-colors",
    "hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
    "disabled:cursor-not-allowed disabled:bg-white disabled:border-[2px] disabled:border-[#E6EBF0] disabled:text-slate-300 disabled:hover:bg-slate-50",
    buttonSize,
  );

  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex gap-2 items-center"
    >
      <button
        type="button"
        onClick={onDecrement}
        disabled={isDecrementDisabled}
        aria-label={`Decrease ${label}`}
        className={buttonBase}
      >
        <MinusGlyph />
      </button>

      <span
        aria-live="polite"
        className={cn("text-center select-none text-[#0B0D10]", valueWidth)}
      >
        {value}
      </span>

      <button
        type="button"
        onClick={onIncrement}
        disabled={disabled}
        aria-label={`Increase ${label}`}
        className={buttonBase}
      >
        <PlusGlyph />
      </button>
    </div>
  );
}
