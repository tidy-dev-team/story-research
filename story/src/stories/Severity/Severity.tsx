import React from "react";
import { cva } from "class-variance-authority";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { SeverityBadge } from "./SeverityBadge";
import { SeverityBar } from "./SeverityBar";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const severityVariants = cva("inline-flex items-start gap-pz-4xs", {
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
  label: string;
  rtl?: boolean;
}

const Severity: React.FC<SeverityProps> = ({
  level,
  type,
  label,
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
      <div className={rtl ? "text-right" : "text-left"}>
        <span className="text-pz-system-fg-1 pz-label-m">{label}</span>
      </div>
    </div>
  );
};

export { Severity, severityVariants };
