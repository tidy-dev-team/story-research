import React, { type ReactElement } from "react";
import { Severity, SeverityLevel, SeverityType } from "../Severity/Severity";
import { TextDirection } from "../textDirection";
import { createDropdownListItemStyles } from "./dropdownListItemStyles";

const dropdownListItemSeverityStyles = createDropdownListItemStyles(
  "complex",
  "enhanced"
);

interface DropdownListItemSeverityProps {
  level: SeverityLevel;
  textDirection?: TextDirection;
  isDisabled?: boolean;
  onSelect?: () => void;
}

export const DropdownListItemSeverity = ({
  level,
  textDirection = TextDirection.Ltr,
  isDisabled = false,
  onSelect,
}: DropdownListItemSeverityProps): ReactElement => {
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

  return (
    <button
      className={dropdownListItemSeverityStyles({ disabled: isDisabled })}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={isDisabled}
      type="button"
      role="option"
      dir={textDirection}
    >
      <Severity
        level={level as SeverityLevel}
        type={SeverityType.Badge}
        textDirection={textDirection}
      />
    </button>
  );
};
