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
  label: string;
  icon?: SvgIconComponent;
  count?: number | null;
}

interface SeverityVariantProps extends BaseDropdownListItemMultiProps {
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

  const Icon = "icon" in props ? props.icon : undefined;

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
          label={"label" in props ? props.label : ""}
          textDirection={textDirection}
          state={checkboxState}
          icon={Icon ? <Icon fontSize="small" /> : undefined}
          count={"count" in props ? props.count : undefined}
          onChange={() => {}}
          isDisabled={isDisabled}
        />
      ) : (
        <CheckboxSeverity
          isChecked={checkboxState === CheckboxState.Checked}
          isIndeterminate={checkboxState === CheckboxState.Indeterminate}
          severityLevel={
            "severityLevel" in props ? props.severityLevel : SeverityLevel.Low
          }
          textDirection={textDirection}
          count={"count" in props ? props.count : undefined}
          onChange={() => {}}
          disabled={isDisabled}
        />
      )}
    </button>
  );
};
