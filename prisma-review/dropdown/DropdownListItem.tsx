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
  variant,
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (
      (event.key === "Enter" || event.key === " ") &&
      !isDisabled &&
      onSelect
    ) {
      event.preventDefault();
      onSelect();
    }
  };

  return (
    <button
      className={getDropdownListStyles({
        isDisabled,
        isFocused: variant === DropdownListItemVariant.Severity,
        paddingVariant:
          variant === DropdownListItemVariant.Text
            ? DropdownListItemPaddingVariant.Simple
            : DropdownListItemPaddingVariant.Complex,
      })}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={isDisabled}
      type="button"
      role="option"
      dir={textDirection}
    >
      {variant === DropdownListItemVariant.Text ? (
        <>
          {"icon" in props && props.icon && (
            <span className="flex items-center leading-none">
              <props.icon fontSize={IconFontSize.Small} />
            </span>
          )}
          <span className="flex-1 truncate min-w-0 translate-y-px">
            {"label" in props ? props.label : ""}
          </span>
        </>
      ) : (
        <Severity
          level={
            "severityLevel" in props ? props.severityLevel : SeverityLevel.Low
          }
          type={SeverityType.Badge}
          textDirection={textDirection}
        />
      )}
    </button>
  );
};
