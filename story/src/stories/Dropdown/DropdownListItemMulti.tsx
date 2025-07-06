import React, { type ReactElement } from "react";
import { Checkbox, CheckboxState } from "../Checkbox/Checkbox";
import { TextDirection } from "../textDirection";
import { createDropdownListItemStyles } from "./dropdownListItemStyles";

const dropdownListItemMultiStyles = createDropdownListItemStyles(
  "complex",
  "enhanced"
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
      const nextState =
        checkboxState === CheckboxState.Checked
          ? CheckboxState.Unchecked
          : CheckboxState.Checked;
      onSelect?.(nextState);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if ((event.key === "Enter" || event.key === " ") && !isDisabled) {
      event.preventDefault();
      const nextState =
        checkboxState === CheckboxState.Checked
          ? CheckboxState.Unchecked
          : CheckboxState.Checked;
      onSelect?.(nextState);
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    if (!isDisabled) {
      const nextState = checked
        ? CheckboxState.Checked
        : CheckboxState.Unchecked;
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
