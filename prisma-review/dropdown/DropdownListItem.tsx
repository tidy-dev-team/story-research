import React, { type ReactElement } from "react";
import { SvgIconProps } from "@mui/material/SvgIcon";
import { Severity, SeverityLevel, SeverityType } from "../Severity/Severity";
import { TextDirection } from "../textDirection";
import { createDropdownListItemStyles } from "./dropdownListItemStyles";

type MUIIcon = ReactElement<SvgIconProps>;

interface BaseDropdownListItemProps {
  textDirection?: TextDirection;
  isDisabled?: boolean;
  onSelect?: () => void;
}

interface TextVariantProps extends BaseDropdownListItemProps {
  variant: "text";
  label: string;
  icon?: MUIIcon;
}

interface SeverityVariantProps extends BaseDropdownListItemProps {
  variant: "severity";
  severityLevel: SeverityLevel;
}

type DropdownListItemProps = TextVariantProps | SeverityVariantProps;

export const DropdownListItem = ({
  textDirection = TextDirection.Ltr,
  isDisabled = false,
  onSelect,
  ...props
}: DropdownListItemProps): ReactElement => {

  const handleClick = () => {
    if (!isDisabled) {
      onSelect?.();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if ((event.key === "Enter" || event.key === " ") && !isDisabled) {
      event.preventDefault();
      onSelect?.();
    }
  };

  const renderContent = () => {
    if (props.variant === "text") {
      return (
        <>
          {props.icon && (
            <span className="flex items-center leading-none">{props.icon}</span>
          )}
          <span className="flex-1 truncate min-w-0 translate-y-px">
            {props.label}
          </span>
        </>
      );
    }

    if (props.variant === "severity") {
      return (
        <Severity
          level={props.severityLevel}
          type={SeverityType.Badge}
          textDirection={textDirection}
        />
      );
    }
  };

  const styleVariant = props.variant === "text" ? "simple" : "complex";
  const focusVariant = props.variant === "text" ? "simple" : "enhanced";
  const dropdownListItemStyles = createDropdownListItemStyles(
    styleVariant,
    focusVariant
  );

  return (
    <button
      className={dropdownListItemStyles({ disabled: isDisabled })}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={isDisabled}
      type="button"
      role="option"
      dir={textDirection}
    >
      {renderContent()}
    </button>
  );
};
