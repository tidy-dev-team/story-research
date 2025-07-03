import React, { type ReactElement } from "react";
import { cva } from "class-variance-authority";
import { Checkbox, CheckboxState } from "../Checkbox/Checkbox";
import { TextDirection } from "../textDirection";

const dropdownListItemMultiStyles = cva(
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

interface DropdownListItemMultiProps {
  label: string;
  checkboxState: CheckboxState;
  icon?: React.ReactNode;
  count?: number | null;
  textDirection?: TextDirection;
  isDisabled?: boolean;
  onSelect?: (newState: CheckboxState) => void;
}

export const DropdownListItemMulti = ({
  label,
  checkboxState = CheckboxState.Unchecked,
  icon,
  count,
  textDirection = TextDirection.Ltr,
  isDisabled = false,
  onSelect,
}: DropdownListItemMultiProps): ReactElement => {
  const handleClick = () => {
    if (!isDisabled) {
      const nextState = checkboxState === CheckboxState.Checked
        ? CheckboxState.Unchecked
        : CheckboxState.Checked;
      onSelect?.(nextState);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if ((event.key === "Enter" || event.key === " ") && !isDisabled) {
      event.preventDefault();
      const nextState = checkboxState === CheckboxState.Checked
        ? CheckboxState.Unchecked
        : CheckboxState.Checked;
      onSelect?.(nextState);
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    if (!isDisabled) {
      const nextState = checked ? CheckboxState.Checked : CheckboxState.Unchecked;
      onSelect?.(nextState);
    }
  };

  return (
    <button
      className={dropdownListItemMultiStyles({ disabled: isDisabled })}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={isDisabled}
      type="button"
      role="menuitemcheckbox"
      aria-checked={
        checkboxState === CheckboxState.Indeterminate
          ? "mixed"
          : checkboxState === CheckboxState.Checked
      }
      dir={textDirection}
    >
      <Checkbox
        label={label}
        textDirection={textDirection}
        state={checkboxState}
        icon={icon}
        count={count}
        onChange={handleCheckboxChange}
        isDisabled={isDisabled}
      />
    </button>
  );
};
