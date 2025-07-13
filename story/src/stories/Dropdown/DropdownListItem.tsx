import React, { type ReactElement } from "react";
import { SvgIconComponent } from "@mui/icons-material";
import { Severity, SeverityLevel, SeverityType } from "../Severity/Severity";
import { TextDirection } from "../textDirection";
import {
  getDropdownListStyles,
  DropdownListItemPaddingVariant,
  DropdownListItemVariant,
} from "./dropdownListItemStyles";
import { IconFontSize } from "../iconFontSize";

interface BaseDropdownListItemProps {
  variant: DropdownListItemVariant;
  textDirection?: TextDirection;
  isDisabled?: boolean;
  onSelect?: () => void;
}

interface TextVariantProps extends BaseDropdownListItemProps {
  variant: DropdownListItemVariant.Text;
  label: string;
  icon?: SvgIconComponent;
}

interface SeverityVariantProps extends BaseDropdownListItemProps {
  variant: DropdownListItemVariant.Severity;
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
    if (!isDisabled && onSelect) {
      onSelect();
    }
  };

  return (
    <button
      className={getDropdownListStyles({
        isDisabled,
        isFocused: props.variant === DropdownListItemVariant.Severity,
        paddingVariant:
          props.variant === DropdownListItemVariant.Text
            ? DropdownListItemPaddingVariant.Simple
            : DropdownListItemPaddingVariant.Complex,
      })}
      onClick={handleClick}
      onKeyDown={(event) => {
        (event.key === "Enter" || event.key === " ") && !isDisabled && onSelect
          ? (event.preventDefault(), onSelect())
          : null;
      }}
      disabled={isDisabled}
      type="button"
      role="option"
      dir={textDirection}
    >
      {props.variant === DropdownListItemVariant.Text ? (
        <>
          {props.icon && (
            <span className="flex items-center leading-none">
              <props.icon fontSize={IconFontSize.Small} />
            </span>
          )}
          <span className="flex-1 truncate min-w-0 translate-y-px">
            {props.label}
          </span>
        </>
      ) : props.variant === DropdownListItemVariant.Severity ? (
        <Severity
          level={props.severityLevel}
          type={SeverityType.Badge}
          textDirection={textDirection}
        />
      ) : null}
    </button>
  );
};
