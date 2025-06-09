import React from "react";
import { cva, VariantProps, cx } from "class-variance-authority";
import { SeverityBadge } from "./SeverityBadge";
import { SeverityBar } from "./SeverityBar";

const severityVariants = cva("inline-flex items-center", {
  variants: {
    rtl: {
      true: "flex-row-reverse gap-x-2", // Should reverse item order
      false: "flex-row gap-x-2",
    },
  },
  defaultVariants: {
    rtl: false,
  },
});

export interface SeverityProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof severityVariants> {
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
    <div className={cx(severityVariants({ rtl }), className)} {...props}>
      {indicator}
      <div className={rtl ? "text-right" : "text-left"}>
        <span className="text-sm text-pz-system-fg-1 font-normal font-heebo">
          {label}
        </span>
      </div>
    </div>
  );
};

export { Severity, severityVariants };
