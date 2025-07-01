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
      className={progressBarVariants()}
      aria-valuenow={clampedValue}
      value={clampedValue}
      dir={textDirection}
      aria-valuemax={max}
      max={max}
    />
  );
};
