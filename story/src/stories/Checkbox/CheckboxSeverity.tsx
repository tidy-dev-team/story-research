import React from "react";
import { cva } from "class-variance-authority";
import { Checkbox, CheckboxState } from "./Checkbox";
import { Severity } from "../Severity/Severity";
import { TextDirection } from "../textDirection";

export enum SeverityLevel {
  High = "high",
  Medium = "medium",
  Low = "low",
}

export enum SeverityType {
  Badge = "badge",
  Bar = "bar",
}

export interface CheckboxSeverityProps {
  state?: CheckboxState;
  severityLevel: SeverityLevel;
  severityType?: SeverityType;
  textDirection?: TextDirection;
  count?: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const checkboxSeverityStyles = cva("flex items-center gap-pz-4xs");

const countStyles = cva(
  "pz-body-m400 transition-colors duration-200 text-pz-system-fg-1"
);

export const CheckboxSeverity: React.FC<CheckboxSeverityProps> = ({
  count = 0,
  onChange,
  severityLevel = SeverityLevel.Medium,
  severityType = SeverityType.Badge,
  state = CheckboxState.Unchecked,
  textDirection = TextDirection.Ltr,
}) => {
  if (count !== null && (count < 0 || !Number.isInteger(count))) {
    console.warn(`CheckboxSeverity component: Invalid prop count: "${count}"`);
  }

  const shouldShowCount = count > 0;

  return (
    <div className={checkboxSeverityStyles()} dir={textDirection}>
      <Checkbox
        state={state}
        textDirection={textDirection}
        onChange={onChange || (() => {})}
        isDisabled={false}
      />
      <Severity
        level={severityLevel}
        type={severityType}
        textDirection={textDirection}
      />
      {shouldShowCount && <span className={countStyles()}>({count})</span>}
    </div>
  );
};
