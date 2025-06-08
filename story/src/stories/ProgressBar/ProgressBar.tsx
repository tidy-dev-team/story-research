import React from "react";
import { twMerge } from "tailwind-merge";

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
    // Clamp value between min and max
    const clampedValue = Math.max(min, Math.min(max, value));
    const percentage = ((clampedValue - min) / (max - min)) * 100;

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
        className={twMerge(
          "relative w-full overflow-hidden",
          "bg-pz-system-bg-4 rounded-pz-max h-1.5",
          className
        )}
        {...props}
      >
        <div
          className={twMerge(
            "h-full transition-all duration-300 ease-out rounded-pz-max",
            "bg-pz-system-bg-primary",
            rtl ? "ml-auto" : ""
          )}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    );
  }
);

ProgressBar.displayName = "ProgressBar";
