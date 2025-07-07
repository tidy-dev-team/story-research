import React from "react";
import { Checkbox, CheckboxState } from "./Checkbox";
import { Severity, SeverityLevel, SeverityType } from "../Severity/Severity";
import { TextDirection } from "../textDirection";

export interface CheckboxSeverityProps {
  isChecked?: boolean;
  isIndeterminate?: boolean;
  onChange: (checked: boolean) => void;
  count?: number | null;
  severityLevel: SeverityLevel;
  textDirection?: TextDirection;
  disabled?: boolean;
}

export const CheckboxSeverity = ({
  isChecked = false,
  isIndeterminate = false,
  onChange,
  count = 0,
  severityLevel = SeverityLevel.Medium,
  textDirection = TextDirection.Ltr,
  disabled = false,
}: CheckboxSeverityProps): React.ReactElement => {
  if (count !== null && (count < 0 || !Number.isInteger(count))) {
    console.warn(`CheckboxSeverity component: Invalid prop count: "${count}"`);
  }

  const state = isIndeterminate
    ? CheckboxState.Indeterminate
    : isChecked
      ? CheckboxState.Checked
      : CheckboxState.Unchecked;

  const handleToggle = () => onChange(state !== CheckboxState.Checked);

  return (
    <div
      className={"flex items-center gap-pz-4xs cursor-pointer"}
      dir={textDirection}
      onClickCapture={handleToggle}
    >
      <span className="pointer-events-none">
        <Checkbox
          state={state}
          textDirection={textDirection}
          isDisabled={disabled}
          count={null}
        />
      </span>
      <Severity
        className="cursor-pointer"
        level={severityLevel}
        type={SeverityType.Badge}
        textDirection={textDirection}
      />
      {count !== null && count !== undefined && (
        <span
          className={
            "pz-body-m400 transition-colors duration-200 text-pz-system-fg-1"
          }
        >
          ({count})
        </span>
      )}
    </div>
  );
};
