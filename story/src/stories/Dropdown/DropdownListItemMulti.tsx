import React, { type ReactElement } from "react";
import { SvgIconComponent } from "@mui/icons-material";
import { Checkbox, CheckboxState } from "../Checkbox/Checkbox";
import { CheckboxSeverity } from "../Checkbox/CheckboxSeverity";
import { SeverityLevel, SeverityType } from "../Severity/Severity";
import { TextDirection } from "../textDirection";
import {
  getDropdownListStyles,
  DropdownListItemPaddingVariant,
} from "./dropdownListItemStyles";

export enum DropdownListItemVariant {
  Text = "text",
  Severity = "severity",
}

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
  const handleClick = () => {
    if (!isDisabled && onSelect) {
      const newState =
        checkboxState === CheckboxState.Checked
          ? CheckboxState.Unchecked
          : CheckboxState.Checked;
      onSelect(newState);
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
      onKeyDown={(event) => {
        (event.key === "Enter" || event.key === " ") && !isDisabled && onSelect
          ? (event.preventDefault(),
            onSelect(
              checkboxState === CheckboxState.Checked
                ? CheckboxState.Unchecked
                : CheckboxState.Checked
            ))
          : null;
      }}
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
      ) : props.variant === DropdownListItemVariant.Severity ? (
        <CheckboxSeverity
          isChecked={checkboxState === CheckboxState.Checked}
          isIndeterminate={checkboxState === CheckboxState.Indeterminate}
          severityLevel={props.severityLevel}
          textDirection={textDirection}
          count={props.count}
          onChange={() => {}}
          disabled={isDisabled}
        />
      ) : null}
    </button>
  );
};
