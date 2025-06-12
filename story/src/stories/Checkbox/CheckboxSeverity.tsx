import React from "react";
import { cva } from "class-variance-authority";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Checkbox, { CheckboxState } from "./Checkbox";
import { Severity } from "../Severity/Severity";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const checkboxSeverityVariants = cva("group flex items-center", {
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

const countStyles = cva([
  "pz-body-m400",
  "leading-[1.46875em]",
  "transition-colors",
  "duration-200",
  "text-pz-system-fg-1",
]);

export interface CheckboxSeverityProps
  extends React.HTMLAttributes<HTMLDivElement> {
  state?: CheckboxState;
  severityLevel: "high" | "medium" | "low";
  severityType?: "badge" | "bar";
  rtl?: boolean;
  alwaysShowCount?: boolean;
  count?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckboxSeverity: React.FC<CheckboxSeverityProps> = ({
  state = CheckboxState.Unchecked,
  severityLevel,
  severityType = "badge",
  rtl = false,
  alwaysShowCount = false,
  count = 0,
  className,
  onChange,
  ...props
}) => {
  const safeCount = Math.max(0, count || 0);
  const shouldShowCount = alwaysShowCount || safeCount > 0;

  return (
    <div
      className={cn(checkboxSeverityVariants({ rtl }), className)}
      {...props}
    >
      <Checkbox state={state} rtl={rtl} onChange={onChange} />
      <Severity level={severityLevel} type={severityType} rtl={rtl} />
      {shouldShowCount && <span className={countStyles()}>({safeCount})</span>}
    </div>
  );
};
