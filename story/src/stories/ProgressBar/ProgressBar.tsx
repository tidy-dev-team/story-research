import React from "react";
import { cva } from "class-variance-authority";
import { TextDirection } from "../textDirection";

export interface ProgressBarProps {
  value: number;
  max?: number;
  min?: number;
  textDirection?: TextDirection;
  "aria-label"?: string;
  "aria-describedby"?: string;
}

const progressBarVariants = cva(
  [
    "relative",
    "w-full",
    "overflow-hidden",
    "rounded-pz-max",
    "h-1.5",
    // Slider progress styles
    "[&::-webkit-progress-bar]:bg-pz-system-bg-4",
    "[&::-webkit-progress-value]:bg-pz-system-bg-primary",
  ],
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

export const ProgressBar = ({
  value = 50,
  max = 100,
  min = 0,
  textDirection = TextDirection.Ltr,
}): React.ReactElement => {
  const clampedValue = Math.max(min, Math.min(max, value));
  const range = max - min;

  return (
    <progress
      className={progressBarVariants()}
      aria-valuenow={clampedValue}
      value={clampedValue}
      dir={textDirection}
      aria-valuemax={max}
      max={max}
    ></progress>
  );
};
