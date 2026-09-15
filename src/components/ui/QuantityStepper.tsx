"use client";

type QuantityStepperProps = {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
};

export function QuantityStepper({
  label = "Quantity",
  value,
  onChange,
  min = 1,
  max = 999,
}: QuantityStepperProps) {
  return (
    <div>
      {label ? (
        <span className="text-[11px] uppercase tracking-[0.16em] text-muted">
          {label}
        </span>
      ) : null}
      <div
        className={`flex items-stretch border border-forest/15 bg-white ${
          label ? "mt-2" : ""
        }`}
      >
        <button
          type="button"
          aria-label="Decrease quantity"
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
          className="min-w-12 px-4 py-3.5 text-forest transition-colors duration-200 hover:bg-mist hover:text-leaf disabled:cursor-not-allowed disabled:opacity-40"
        >
          −
        </button>
        <div
          className="flex min-w-14 flex-1 items-center justify-center border-x border-forest/10 bg-cream/40 px-3 text-center text-sm font-semibold text-forest"
          aria-live="polite"
        >
          {value}
        </div>
        <button
          type="button"
          aria-label="Increase quantity"
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
          className="min-w-12 px-4 py-3.5 text-forest transition-colors duration-200 hover:bg-mist hover:text-leaf disabled:cursor-not-allowed disabled:opacity-40"
        >
          +
        </button>
      </div>
    </div>
  );
}
