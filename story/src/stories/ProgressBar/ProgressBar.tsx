import React from "react";
import { cva } from "class-variance-authority";
import { TextDirection } from "../textDirection";

export interface ProgressBarProps {
  value: number;
  max?: number;
  min?: number;
  size?: "small" | "medium" | "large";
  textDirection?: TextDirection;
  "aria-label"?: string;
  "aria-describedby"?: string;
}

const progressBarVariants = cva(
  [
    "relative",
    "w-full",
    "overflow-hidden",
    "bg-pz-system-bg-4",
    "rounded-pz-max",
  ],
  {
    variants: {
      size: {
        small: "h-1.5",
        medium: "h-2",
        large: "h-3",
      },
    },
    defaultVariants: {
      size: "small",
    },
  }
);

const progressFillVariants = cva(
  [
    "h-full",
    "transition-all",
    "duration-300",
    "ease-out",
    "rounded-pz-max",
    "bg-pz-system-bg-primary",
  ],
  {
    variants: {
      textDirection: {
        [TextDirection.Rtl]: "ml-auto",
        [TextDirection.Ltr]: "",
      },
    },
    defaultVariants: {
      textDirection: TextDirection.Ltr,
    },
  }
);

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  min = 0,
  size = "small",
  textDirection = TextDirection.Ltr,
  ...props
}) => {
  const clampedValue = Math.max(min, Math.min(max, value));
  const range = max - min;
  const percentage = range === 0 ? 0 : ((clampedValue - min) / range) * 100;

  return (
    <div
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={min}
      aria-valuemax={max}
      className={progressBarVariants({ size })}
      dir={textDirection}
      {...props}
    >
      <div
        className={progressFillVariants({ textDirection })}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};
