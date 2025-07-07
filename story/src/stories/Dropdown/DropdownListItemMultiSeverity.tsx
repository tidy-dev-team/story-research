import React, { type ReactElement } from "react";
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
      <div className="pointer-events-none">
        <CheckboxSeverity
          isChecked={isChecked}
          isIndeterminate={isIndeterminate}
          severityLevel={severityLevel}
          textDirection={textDirection}
          count={count}
          onChange={() => {}}
          disabled={isDisabled}
        />
      </div>
    </button>
  );
};
