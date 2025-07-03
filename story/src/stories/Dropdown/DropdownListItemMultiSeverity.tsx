import React, { type ReactElement } from "react";
import { cva } from "class-variance-authority";
import { CheckboxState } from "../Checkbox/Checkbox";
import { CheckboxSeverity } from "../Checkbox/CheckboxSeverity";
import { SeverityLevel, SeverityType } from "../Severity/Severity";
import { TextDirection } from "../textDirection";

const dropdownListItemMultiSeverityStyles = cva(
  [
    "flex items-center w-full box-border overflow-hidden",
    "p-pz-4xs gap-pz-4xs min-h-8",
    "border-none bg-transparent cursor-pointer",
    "text-pz-system-fg-1 pz-label-m",
    "rounded-pz-2xs",
    "transition-all duration-200",
    "hover:enabled:bg-pz-system-bg-overlay-hover",
    "active:enabled:bg-pz-system-bg-overlay-pressed",
    "focus:outline-none focus-visible:ring-2",
    "focus-visible:ring-pz-system-border-focused-1",
    "focus-visible:rounded-pz-2xs ring-offset-1 ring-offset-pz-gray-1000",
  ],
  {
    variants: {
      disabled: {
        true: "text-pz-system-fg-disabled cursor-not-allowed hover:bg-transparent",
        false: "",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
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
