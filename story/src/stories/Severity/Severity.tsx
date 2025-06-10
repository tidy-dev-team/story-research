import React from "react";
import { cva } from "class-variance-authority";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { SeverityBadge } from "./SeverityBadge";
import { SeverityBar } from "./SeverityBar";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const severityVariants = cva("inline-flex items-center gap-pz-4xs", {
  variants: {
    rtl: {
      true: "flex-row-reverse",
      false: "flex-row",
    },
  },
  defaultVariants: {
    rtl: false,
  },
});

export interface SeverityProps extends React.HTMLAttributes<HTMLDivElement> {
  level: "high" | "medium" | "low";
  type: "badge" | "bar";
  rtl?: boolean;
}

const LEVEL_LABELS: Record<"high" | "medium" | "low", string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

const LEVEL_LABELS_HE: Record<"high" | "medium" | "low", string> = {
  high: "גבוה",
  medium: "בינוני",
  low: "נמוך",
};

const Severity: React.FC<SeverityProps> = ({
  level,
  type,
  rtl = false,
  className,
  ...props
}) => {
  const indicator =
    type === "badge" ? (
      <SeverityBadge level={level} />
    ) : (
      <SeverityBar level={level} />
    );

  return (
    <div className={cn(severityVariants({ rtl }), className)} {...props}>
      {indicator}
      <div className={rtl ? "text-right mt-0.75" : "text-left mt-0.75"}>
        <span className="text-pz-system-fg-1 pz-label-m">
          {rtl ? LEVEL_LABELS_HE[level] : LEVEL_LABELS[level]}
        </span>
      </div>
    </div>
  );
};

export { Severity, severityVariants };
