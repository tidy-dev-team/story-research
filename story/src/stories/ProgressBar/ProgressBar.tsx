import React from "react";
import { cva } from "class-variance-authority";
import { TextDirection } from "../textDirection";

export interface ProgressBarProps {
  value: number;
  max?: number;
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
    "[&::-webkit-progress-value]:duration-150",
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
);

export const ProgressBar = ({
  value = 50,
  max = 100,
  textDirection = TextDirection.Ltr,
}): React.ReactElement => {
  const clampedValue = Math.max(0, Math.min(max, value));

  return (
    <progress
      className={progressBarVariants()}
      aria-valuenow={clampedValue}
      value={clampedValue}
      dir={textDirection}
      aria-valuemax={max}
      max={max}
    />
  );
};
