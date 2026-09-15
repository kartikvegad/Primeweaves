"use client";

import { useEffect, useId, useRef, useState } from "react";

export type SelectOption = {
  value: string;
  label: string;
  hint?: string;
};

type CustomSelectProps = {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  name?: string;
  required?: boolean;
};

export function CustomSelect({
  label,
  value,
  options,
  onChange,
  name,
  required,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selected =
    options.find((option) => option.value === value) || options[0];

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative block">
      {name ? (
        <input type="hidden" name={name} value={value} required={required} />
      ) : null}
      <span className="text-[11px] uppercase tracking-[0.16em] text-muted">
        {label}
      </span>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((current) => !current)}
        className={`mt-2 flex w-full items-center justify-between border bg-white px-4 py-3.5 text-left text-sm text-forest transition-colors duration-200 ${
          open
            ? "border-forest bg-mist/40"
            : "border-forest/15 hover:border-forest hover:bg-mist/50"
        }`}
      >
        <span>
          <span className="block font-medium">{selected?.label}</span>
          {selected?.hint ? (
            <span className="mt-0.5 block text-xs text-muted">
              {selected.hint}
            </span>
          ) : null}
        </span>
        <span
          aria-hidden
          className={`ml-3 text-gold transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          ▾
        </span>
      </button>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-30 mt-1 max-h-64 w-full overflow-auto border border-forest/15 bg-cream shadow-[0_12px_40px_rgba(18,32,24,0.12)]"
        >
          {options.map((option) => {
            const active = option.value === value;
            return (
              <li key={option.value} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-start justify-between gap-3 px-4 py-3 text-left text-sm transition-colors duration-150 ${
                    active
                      ? "bg-forest text-cream"
                      : "text-forest hover:bg-mist hover:text-forest-deep"
                  }`}
                >
                  <span>
                    <span className="block font-medium">{option.label}</span>
                    {option.hint ? (
                      <span
                        className={`mt-0.5 block text-xs ${
                          active ? "text-cream/75" : "text-muted"
                        }`}
                      >
                        {option.hint}
                      </span>
                    ) : null}
                  </span>
                  {active ? (
                    <span aria-hidden className="text-gold">
                      ✓
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
