import { cn } from "@/utils/classNames";

export interface QuantityStepperProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  disabled?: boolean;
  label?: string;
  size?: "sm" | "md";
  variant?: "default" | "review";
}

const BUTTON_VARIANT_CLASSES = {
  default: {
    enabled: "bg-[#F0F4F7] hover:bg-slate-200",
    disabled: "bg-white border-[2px] border-[#E6EBF0] hover:bg-slate-50",
  },
  review: {
    enabled: "bg-white border border-[#E6EBF0] hover:bg-[#F8FAFC]",
    disabled: "bg-white border-[2px] border-[#E6EBF0] hover:bg-slate-50",
  },
} as const;

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
  variant = "default",
}: QuantityStepperProps) {
  const isDecrementDisabled = disabled || value <= min;

  const buttonSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  const valueWidth = size === "sm" ? "w-2 text-sm" : "w-4 text-base";
  const variantClasses = BUTTON_VARIANT_CLASSES[variant];

  const buttonBase = cn(
    "flex items-center justify-center rounded-[4px] text-[#525963] text-xs transition-colors",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
    "disabled:cursor-not-allowed disabled:text-slate-300",
    buttonSize,
  );

  const getButtonClassName = (isButtonDisabled: boolean) =>
    cn(
      buttonBase,
      isButtonDisabled ? variantClasses.disabled : variantClasses.enabled,
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
        className={getButtonClassName(isDecrementDisabled)}
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
        className={getButtonClassName(disabled)}
      >
        <PlusGlyph />
      </button>
    </div>
  );
}
