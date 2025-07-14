import React, { type ReactElement } from "react";
import { SvgIconComponent } from "@mui/icons-material";
import { Checkbox, CheckboxState } from "../Checkbox/Checkbox";
import { CheckboxSeverity } from "../Checkbox/CheckboxSeverity";
import { SeverityLevel, SeverityType } from "../Severity/Severity";
import { TextDirection } from "../textDirection";
import {
  getDropdownListStyles,
  DropdownListItemPaddingVariant,
  DropdownListItemVariant,
} from "./dropdownListItemStyles";

interface BaseDropdownListItemMultiProps {
  variant: DropdownListItemVariant;
  checkboxState?: CheckboxState;
  textDirection?: TextDirection;
  isDisabled?: boolean;
  onSelect?: (newState: CheckboxState) => void;
}

interface TextVariantProps extends BaseDropdownListItemMultiProps {
  variant: DropdownListItemVariant.Text;
  label: string;
  icon?: SvgIconComponent;
  count?: number | null;
}

interface SeverityVariantProps extends BaseDropdownListItemMultiProps {
  variant: DropdownListItemVariant.Severity;
  severityLevel: SeverityLevel;
  severityType?: SeverityType;
  count?: number;
}

type DropdownListItemMultiProps = TextVariantProps | SeverityVariantProps;

export const DropdownListItemMulti = ({
  checkboxState = CheckboxState.Unchecked,
  textDirection = TextDirection.Ltr,
  isDisabled = false,
  onSelect,
  ...props
}: DropdownListItemMultiProps): ReactElement => {
  const toggleCheckboxState = () => {
    if (!isDisabled && onSelect) {
      const newState =
        checkboxState === CheckboxState.Checked
          ? CheckboxState.Unchecked
          : CheckboxState.Checked;
      onSelect(newState);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    toggleCheckboxState();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleCheckboxState();
    }
  };

  const getAriaChecked = () => {
    switch (checkboxState) {
      case CheckboxState.Indeterminate:
        return "mixed";
      case CheckboxState.Checked:
        return true;
      case CheckboxState.Unchecked:
      default:
        return false;
    }
  };

  return (
    <button
      className={getDropdownListStyles({
        isDisabled,
        isFocused: true,
        paddingVariant: DropdownListItemPaddingVariant.Complex,
      })}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={isDisabled}
      type="button"
      role="menuitemcheckbox"
      aria-checked={getAriaChecked()}
      dir={textDirection}
    >
      {props.variant === DropdownListItemVariant.Text ? (
        <Checkbox
          label={props.label}
          textDirection={textDirection}
          state={checkboxState}
          icon={props.icon ? <props.icon fontSize="small" /> : undefined}
          count={props.count}
          onChange={() => {}}
          isDisabled={isDisabled}
        />
      ) : (
        <CheckboxSeverity
          isChecked={checkboxState === CheckboxState.Checked}
          isIndeterminate={checkboxState === CheckboxState.Indeterminate}
          severityLevel={props.severityLevel}
          textDirection={textDirection}
          count={props.count}
          onChange={() => {}}
          disabled={isDisabled}
        />
      )}
    </button>
  );
};
