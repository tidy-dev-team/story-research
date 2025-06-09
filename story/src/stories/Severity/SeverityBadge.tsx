import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const severityBadgeVariants = cva("w-3 h-3 rounded-pz-3xs", {
  variants: {
    level: {
      high: "bg-pz-system-priority-high-3", // This is red
      medium: "bg-pz-system-priority-medium-3", // This is yellow
      low: "bg-pz-system-priority-low-1", // This is green
    },
  },
  defaultVariants: {
    level: "medium",
  },
});

export interface SeverityBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof severityBadgeVariants> {
  level: "high" | "medium" | "low";
}

const SeverityBadge: React.FC<SeverityBadgeProps> = ({
  level,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(severityBadgeVariants({ level }), className)}
      {...props}
      data-testid={`severity-badge-${level}`}
    />
  );
};

export { SeverityBadge, severityBadgeVariants };
