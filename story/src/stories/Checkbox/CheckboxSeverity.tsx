import React from "react";
import { cva } from "class-variance-authority";
import { Checkbox, CheckboxState } from "./Checkbox";
import { Severity } from "../Severity/Severity";
import { TextDirection } from "../textDirection";

const checkboxSeverityVariants = cva("group flex items-center gap-pz-4xs");

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
  count?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckboxSeverity: React.FC<CheckboxSeverityProps> = ({
  state = CheckboxState.Unchecked,
  severityLevel,
  severityType = "badge",
  textDirection = TextDirection.Ltr,
  count = 0,
  onChange,
}) => {
  const safeCount = Math.max(0, count || 0);
  const shouldShowCount = safeCount > 0;

  return (
    <div className={checkboxSeverityVariants()} dir={textDirection}>
      <Checkbox
        state={state}
        textDirection={textDirection}
        onChange={onChange}
      />
      <Severity
        level={severityLevel}
        type={severityType}
        textDirection={textDirection}
      />
      {shouldShowCount && <span className={countStyles()}>({safeCount})</span>}
    </div>
  );
};
