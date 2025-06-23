import React from "react";
import { Checkbox, CheckboxState } from "./Checkbox";
import { Severity, SeverityLevel, SeverityType } from "../Severity/Severity";
import { TextDirection } from "../textDirection";

export interface CheckboxSeverityProps {
  state: CheckboxState;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  count?: number | null;
  severityLevel: SeverityLevel;
  severityType?: SeverityType;
  textDirection?: TextDirection;
  disabled?: boolean;
}

export const CheckboxSeverity = ({
  state = CheckboxState.Unchecked,
  onChange,
  count = 0,
  severityLevel = "medium",
  severityType = "badge",
  textDirection = TextDirection.Ltr,
  disabled = false,
}: CheckboxSeverityProps): React.ReactElement => {
  if (count !== null && (count < 0 || !Number.isInteger(count))) {
    console.warn(`CheckboxSeverity component: Invalid prop count: "${count}"`);
  }

  return (
    <div className={"flex items-center gap-pz-4xs"} dir={textDirection}>
      <Checkbox
        state={state}
        textDirection={textDirection}
        onChange={onChange}
        isDisabled={disabled}
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
