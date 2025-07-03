import React, { type ReactElement } from "react";
import { cva } from "class-variance-authority";
import { TextDirection } from "../textDirection";

const dropdownListItemStyles = cva(
  [
    "flex items-center w-full box-border overflow-hidden",
    "px-pz-4xs py-pz-3xs gap-pz-4xs h-8",
    "border-none bg-transparent cursor-pointer",
    "text-pz-system-fg-1 pz-label-m",
    "rounded-pz-2xs",
    "transition-all duration-200",
    "hover:enabled:bg-pz-system-bg-overlay-hover",
    "active:enabled:bg-pz-system-bg-overlay-pressed",
    "focus:outline-none focus-visible:ring-2",
    "focus-visible:ring-pz-system-border-focused-1",
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

interface DropdownListItemProps {
  label: string;
  icon?: ReactElement;
  textDirection?: TextDirection;
  isDisabled?: boolean;
  onSelect?: () => void;
}

export const DropdownListItem = ({
  label,
  icon,
  textDirection = TextDirection.Ltr,
  isDisabled = false,
  onSelect,
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
      {icon && <span className="scale-[.6667]">{icon}</span>}
      <span className="flex-1 truncate min-w-0 translate-y-px">{label}</span>
    </button>
  );
};
