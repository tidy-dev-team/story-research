import React from "react";
import { Checkbox, CheckboxState } from "./Checkbox";
import { Severity, SeverityLevel, SeverityType } from "../Severity/Severity";
import { TextDirection } from "../textDirection";

export interface CheckboxSeverityProps {
  state: CheckboxState;
  onChange: (checked: boolean) => void;
  count?: number | null;
  severityLevel: SeverityLevel;
  textDirection?: TextDirection;
  disabled?: boolean;
}

export const CheckboxSeverity = ({
  state = CheckboxState.Unchecked,
  onChange,
  count = 0,
  severityLevel = SeverityLevel.Medium,
  textDirection = TextDirection.Ltr,
  disabled = false,
}: CheckboxSeverityProps): React.ReactElement => {
  if (count !== null && (count < 0 || !Number.isInteger(count))) {
    console.warn(`CheckboxSeverity component: Invalid prop count: "${count}"`);
  }

  const handleToggle = () => {
    const isChecked = state === CheckboxState.Checked;
    onChange(!isChecked);
  };

  return (
    <div
      className={"flex items-center gap-pz-4xs"}
      dir={textDirection}
      onClick={handleToggle}
      style={{ cursor: "pointer" }}
    >
      <Checkbox
        state={state}
        textDirection={textDirection}
        onChange={onChange}
        isDisabled={disabled}
        count={null}
      />
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
