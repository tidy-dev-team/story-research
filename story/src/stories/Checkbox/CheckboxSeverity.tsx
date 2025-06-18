import React from "react";
import { cva } from "class-variance-authority";
import { Checkbox, CheckboxState } from "./Checkbox";
import { Severity } from "../Severity/Severity";
import { TextDirection } from "../textDirection";

const checkboxSeverityVariants = cva("group flex items-center", {
  variants: {
    textDirection: {
      [TextDirection.Rtl]: "flex-row-reverse gap-pz-4xs",
      [TextDirection.Ltr]: "flex-row gap-pz-4xs",
    },
  },
  defaultVariants: {
    textDirection: TextDirection.Ltr,
  },
});

const countStyles = cva([
  "pz-body-m400",
  "transition-colors",
  "duration-200",
  "text-pz-system-fg-1",
]);

export interface CheckboxSeverityProps {
  state?: CheckboxState;
  severityLevel: "high" | "medium" | "low";
  severityType?: "badge" | "bar";
  textDirection?: TextDirection;
  alwaysShowCount?: boolean;
  count?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckboxSeverity: React.FC<CheckboxSeverityProps> = ({
  state = CheckboxState.Unchecked,
  severityLevel,
  severityType = "badge",
  textDirection = TextDirection.Ltr,
  alwaysShowCount = false,
  count = 0,
  onChange,
}) => {
  const safeCount = Math.max(0, count || 0);
  const shouldShowCount = alwaysShowCount || safeCount > 0;

  return (
    <div
      className={checkboxSeverityVariants({ textDirection })}
      dir={textDirection}
    >
      <Checkbox
        state={state}
        textDirection={textDirection}
        onChange={onChange}
      />
      <Severity
        level={severityLevel}
        type={severityType}
        rtl={textDirection === TextDirection.Rtl}
      />
      {shouldShowCount && <span className={countStyles()}>({safeCount})</span>}
    </div>
  );
};
