import React, { type ReactElement } from "react";
import { Checkbox, CheckboxState } from "../Checkbox/Checkbox";
import { CheckboxSeverity } from "../Checkbox/CheckboxSeverity";
import { SeverityLevel, SeverityType } from "../Severity/Severity";
import { TextDirection } from "../textDirection";
import { createDropdownListItemStyles } from "./dropdownListItemStyles";

interface BaseDropdownListItemMultiProps {
  isChecked?: boolean;
  isIndeterminate?: boolean;
  textDirection?: TextDirection;
  isDisabled?: boolean;
  onSelect?: (isChecked: boolean) => void;
}

interface TextVariantProps extends BaseDropdownListItemMultiProps {
  variant: "text";
  label: string;
  icon?: React.ReactNode;
  count?: number | null;
}

interface SeverityVariantProps extends BaseDropdownListItemMultiProps {
  variant: "severity";
  severityLevel: SeverityLevel;
  severityType?: SeverityType;
  count?: number;
}

type DropdownListItemMultiProps = TextVariantProps | SeverityVariantProps;


export const DropdownListItemMulti = ({
  isChecked = false,
  isIndeterminate = false,
  textDirection = TextDirection.Ltr,
  isDisabled = false,
  onSelect,
  ...props
}: DropdownListItemMultiProps): ReactElement => {
  const handleClick = () => {
    if (!isDisabled) {
      onSelect?.(!isChecked);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if ((event.key === "Enter" || event.key === " ") && !isDisabled) {
      event.preventDefault();
      onSelect?.(!isChecked);
    }
  };

  const renderContent = () => {
    if (props.variant === "text") {
      const checkboxState = isIndeterminate
        ? CheckboxState.Indeterminate
        : isChecked
          ? CheckboxState.Checked
          : CheckboxState.Unchecked;

      return (
        <Checkbox
          label={props.label}
          textDirection={textDirection}
          state={checkboxState}
          icon={props.icon}
          count={props.count}
          onChange={() => {}}
          isDisabled={isDisabled}
        />
      );
    }

    if (props.variant === "severity") {
      return (
        <CheckboxSeverity
          isChecked={isChecked}
          isIndeterminate={isIndeterminate}
          severityLevel={props.severityLevel}
          textDirection={textDirection}
          count={props.count}
          onChange={() => {}}
          disabled={isDisabled}
        />
      );
    }
  };

  const dropdownListItemStyles = createDropdownListItemStyles(
    "complex",
    "enhanced"
  );

  return (
    <button
      className={dropdownListItemStyles({ disabled: isDisabled })}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={isDisabled}
      type="button"
      role="menuitemcheckbox"
      aria-checked={isIndeterminate ? "mixed" : isChecked}
      dir={textDirection}
    >
      {renderContent()}
    </button>
  );
};
