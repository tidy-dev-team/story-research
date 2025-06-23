import React from "react";
import { cva } from "class-variance-authority";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { SeverityBadge } from "./SeverityBadge";
import { SeverityBar } from "./SeverityBar";
import { TextDirection } from "../textDirection";

export enum SeverityLevel {
  High = "high",
  Medium = "medium",
  Low = "low",
}
export enum SeverityType {
  Badge = "badge",
  Bar = "bar",
}

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const severityVariants = cva("inline-flex items-center gap-pz-4xs");

export interface SeverityProps extends React.HTMLAttributes<HTMLDivElement> {
  level: SeverityLevel;
  type: SeverityType;
  textDirection?: TextDirection;
}

const LEVEL_LABELS: Record<SeverityLevel, string> = {
  [SeverityLevel.High]: "High",
  [SeverityLevel.Medium]: "Medium",
  [SeverityLevel.Low]: "Low",
};

const LEVEL_LABELS_HE: Record<SeverityLevel, string> = {
  [SeverityLevel.High]: "גבוה",
  [SeverityLevel.Medium]: "בינוני",
  [SeverityLevel.Low]: "נמוך",
};

const Severity: React.FC<SeverityProps> = ({
  level,
  type,
  textDirection = TextDirection.Ltr,
  className,
  ...props
}) => {
  const isRtl = textDirection === TextDirection.Rtl;

  const indicator =
    type === SeverityType.Badge ? (
      <SeverityBadge level={level} />
    ) : (
      <SeverityBar level={level} />
    );

  return (
    <div
      className={cn(severityVariants(), className)}
      dir={textDirection}
      {...props}
    >
      {indicator}
      <div className={isRtl ? "text-right mt-0.5" : "text-left mt-0.5"}>
        <span className="text-pz-system-fg-1 pz-label-m">
          {isRtl ? LEVEL_LABELS_HE[level] : LEVEL_LABELS[level]}
        </span>
      </div>
    </div>
  );
};

export { Severity, severityVariants };
