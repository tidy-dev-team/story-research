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

const checkboxSeverityStyles = cva("flex items-center gap-pz-4xs");

const countStyles = cva(
  "pz-body-m400 transition-colors duration-200 text-pz-system-fg-1"
);

export interface CheckboxSeverityProps {
  state: CheckboxState;
  severityLevel: SeverityLevel;
  severityType?: SeverityType;
  textDirection?: TextDirection;
  count?: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

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

  const handleChange = (event: any) => {
    if (typeof onChange === 'function') {
      onChange(event);
    }
  };



  return (
    <div className={checkboxSeverityStyles()} dir={textDirection}>
      <Checkbox
        state={state}
        textDirection={textDirection}
        onChange={handleChange}
        isDisabled={false}
      />
      <Severity
        className="cursor-pointer"
        level={severityLevel}
        type={severityType}
        textDirection={textDirection}
        onClick={() => {
          const isChecked = state === CheckboxState.Checked;
          const fakeEvent = { target: { checked: !isChecked } };
          onChange(fakeEvent as unknown as React.ChangeEvent<HTMLInputElement>);
        }}
      />
      {!!count && <span className={countStyles()}>({count})</span>}
    </div>
  );
};
