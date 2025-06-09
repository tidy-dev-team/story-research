import React from "react";
import { cva, VariantProps, cx } from "class-variance-authority";
import { SeverityBadge } from "./SeverityBadge";
import { SeverityBar } from "./SeverityBar";

const severityVariants = cva("inline-flex items-flex-start", {
  variants: {
    rtl: {
      true: "flex-row-reverse gap-pz-4xs",
      false: "flex-row gap-pz-4xs",
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
        <span className="text-pz-system-fg-1 pz-label-m">{label}</span>
      </div>
    </div>
  );
};

export { Severity, severityVariants };
