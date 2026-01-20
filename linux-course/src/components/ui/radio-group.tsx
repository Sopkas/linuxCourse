import * as React from "react";
import { cn } from "@/lib/utils";

type RadioGroupContextType = {
  value?: string;
  onValueChange?: (val: string) => void;
};

const RadioGroupContext = React.createContext<RadioGroupContextType>({});

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (val: string) => void;
}

export function RadioGroup({ value, onValueChange, className, children, ...props }: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div role="radiogroup" className={cn("space-y-2", className)} {...props}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

export interface RadioGroupItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
}

export const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, value, id, ...props }, ref) => {
    const ctx = React.useContext(RadioGroupContext);
    const checked = ctx.value === value;

    return (
      <div className="inline-flex items-center gap-2">
        <input
          id={id}
          ref={ref}
          type="radio"
          className="peer sr-only"
          checked={checked}
          onChange={() => ctx.onValueChange?.(value)}
          value={value}
          {...props}
        />
        <label
          htmlFor={id}
          className={cn(
            "flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-slate-900/70 shadow-inner transition peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-amber-200/60",
            checked && "border-amber-300 bg-amber-300/20",
            className
          )}
        >
          <span
            className={cn(
              "h-2.5 w-2.5 rounded-full bg-amber-300 opacity-0 transition",
              checked && "opacity-100"
            )}
          />
        </label>
      </div>
    );
  }
);
RadioGroupItem.displayName = "RadioGroupItem";
