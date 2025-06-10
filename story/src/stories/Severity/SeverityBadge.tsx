import React from "react";
import { cva } from "class-variance-authority";

const severityBadgeVariants = cva("w-3 h-3 rounded-pz-3xs", {
  variants: {
    level: {
      high: "bg-pz-system-priority-high-3",
      medium: "bg-pz-system-priority-medium-3",
      low: "bg-pz-system-priority-low-1",
    },
  },
  defaultVariants: {
    level: "medium",
  },
});

export interface SeverityBadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  level: "high" | "medium" | "low";
}

const SeverityBadge: React.FC<SeverityBadgeProps> = ({
  level,
  className,
  ...props
}) => {
  return (
    <div className={severityBadgeVariants({ level, className })} {...props} />
  );
};

export { SeverityBadge, severityBadgeVariants };
