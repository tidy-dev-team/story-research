import React, { type ReactElement } from "react";
import { CheckboxState } from "../Checkbox/Checkbox";
import { CheckboxSeverity } from "../Checkbox/CheckboxSeverity";
import { SeverityLevel, SeverityType } from "../Severity/Severity";
import { TextDirection } from "../textDirection";
import { createDropdownListItemStyles } from "./dropdownListItemStyles";

const dropdownListItemMultiSeverityStyles = createDropdownListItemStyles(
  "complex",
  "enhanced"
);

interface DropdownListItemMultiSeverityProps {
  severityLevel: SeverityLevel;
  severityType?: SeverityType;
  isChecked?: boolean;
  isIndeterminate?: boolean;
  textDirection?: TextDirection;
  count?: number;
  isDisabled?: boolean;
  onSelect?: (isChecked: boolean) => void;
}

export const DropdownListItemMultiSeverity = ({
  severityLevel,
  isChecked = false,
  isIndeterminate = false,
  textDirection = TextDirection.Ltr,
  count,
  isDisabled = false,
  onSelect,
}: DropdownListItemMultiSeverityProps): ReactElement => {
  const checkboxState = isIndeterminate
    ? CheckboxState.Indeterminate
    : isChecked
      ? CheckboxState.Checked
      : CheckboxState.Unchecked;

  const handleCheckboxChange = (checked: boolean) => {
    if (!isDisabled) {
      onSelect?.(checked);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if ((event.key === "Enter" || event.key === " ") && !isDisabled) {
      event.preventDefault();
      const newChecked = !isChecked;
      onSelect?.(newChecked);
    }
  };

  return (
    <button
      className={dropdownListItemMultiSeverityStyles({ disabled: isDisabled })}
      onClick={() => handleCheckboxChange(!isChecked)}
      onKeyDown={handleKeyDown}
      disabled={isDisabled}
      type="button"
      role="menuitemcheckbox"
      aria-checked={isIndeterminate ? "mixed" : isChecked}
      dir={textDirection}
    >
      <CheckboxSeverity
        state={checkboxState}
        severityLevel={severityLevel}
        textDirection={textDirection}
        count={count}
        onChange={handleCheckboxChange}
        disabled={isDisabled}
      />
    </button>
  );
};
