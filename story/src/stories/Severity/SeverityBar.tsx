import React from "react";
import { cva } from "class-variance-authority";
import { SeverityLevel } from "./Severity";

const severityBarVariants = cva("rounded-full", {
  variants: {
    level: {
      high: "bg-pz-system-priority-high-3",
      medium: "bg-pz-system-priority-medium-3",
      low: "bg-pz-system-priority-low-1",
    },
    size: {
      s: "w-1 h-3.5",
      m: "w-1 h-12",
    },
    expired: {
      true: "opacity-30",
      false: "opacity-100",
    },
  },
  defaultVariants: {
    level: "medium",
    size: "s",
    expired: false,
  },
});

export interface SeverityBarProps extends React.HTMLAttributes<HTMLDivElement> {
  level: SeverityLevel;
  size?: "s" | "m";
  expired?: boolean;
}

const SeverityBar: React.FC<SeverityBarProps> = ({
  level,
  size,
  expired,
  className,
  ...props
}) => {
  return (
    <div
      className={severityBarVariants({ level, size, expired, className })}
      {...props}
    />
  );
};

export { SeverityBar, severityBarVariants };
