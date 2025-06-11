import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const progressBarVariants = cva(
  "relative w-full overflow-hidden bg-pz-system-bg-4 rounded-pz-max h-1.5"
);

const progressFillVariants = cva(
  "h-full transition-all duration-300 ease-out rounded-pz-max bg-pz-system-bg-primary",
  {
    variants: {
      rtl: {
        true: "ml-auto",
        false: "",
      },
    },
    defaultVariants: {
      rtl: false,
    },
  }
);

export interface ProgressBarProps {
  value: number;
  max?: number;
  min?: number;
  rtl?: boolean;
  className?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
}

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      value,
      max = 100,
      min = 0,
      rtl = false,
      className,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedby,
      ...props
    },
    ref
  ) => {
    const clampedValue = Math.max(min, Math.min(max, value));
    const range = max - min; // Prevent division by zero when max equals min
    const percentage = range === 0 ? 0 : ((clampedValue - min) / range) * 100;

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
        className={twMerge(progressBarVariants(), className)}
        {...props}
      >
        <div
          className={progressFillVariants({ rtl })}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    );
  }
);

ProgressBar.displayName = "ProgressBar";
