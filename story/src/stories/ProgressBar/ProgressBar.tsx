import React from "react";
import { cva } from "class-variance-authority";
import { TextDirection } from "../textDirection";

export interface ProgressBarProps {
  value: number;
  max?: number;
  textDirection?: TextDirection;
}

const progressBarVariants = cva(
  [
    "relative",
    "w-full",
    "overflow-hidden",
    "rounded-pz-max",
    "h-1.5",
    "bg-pz-system-bg-4",
    // Slider progress styles
    "[&::-webkit-progress-bar]:bg-pz-system-bg-4",
    "[&::-webkit-progress-value]:duration-150",
    "[&::-webkit-progress-value]:bg-pz-system-bg-primary",
    "[&::-moz-progress-bar]:bg-pz-system-bg-primary",
  ],
);

export const ProgressBar = (props: ProgressBarProps): React.ReactElement => {
  const {
    value,
    max = 100,
    textDirection = TextDirection.Ltr,
  } = props;
  const clampedValue = Math.max(0, Math.min(max, value));

  return (
    <progress
      role="progressbar"
      className={progressBarVariants()}
      dir={textDirection}
      value={clampedValue}
      max={max}
      aria-valuenow={clampedValue}
      aria-valuemax={max}
    />
  );
};
