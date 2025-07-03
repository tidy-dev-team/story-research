import React, { type ReactElement } from "react";
import { cva } from "class-variance-authority";
import { Severity, SeverityLevel, SeverityType } from "../Severity/Severity";
import { TextDirection } from "../textDirection";

const dropdownListItemSeverityStyles = cva(
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
