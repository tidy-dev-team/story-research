import React, { type ReactElement } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { TextDirection } from "../textDirection";

const dropdownListItemStyles = cva([
  "flex items-center w-full box-border overflow-hidden",
  "px-pz-4xs py-pz-3xs gap-pz-4xs min-h-8",

  // Reset button styles
  "border-none bg-transparent cursor-pointer",

  // Typography
  "text-pz-system-fg-1 pz-label-m",

  // Border radius
  "rounded-pz-2xs",

  // Transitions and interactions
  "transition-all duration-200",
  "hover:enabled:bg-pz-system-bg-overlay-hover",
  "active:enabled:bg-pz-system-bg-overlay-pressed",

  // Focus styles
  "focus:outline-none focus-visible:ring-2",
  "focus-visible:ring-pz-system-border-focused-1",

  // Disabled styles
  "disabled:text-pz-system-fg-disabled disabled:cursor-not-allowed",
  "disabled:hover:bg-transparent",
]);

interface DropdownListItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof dropdownListItemStyles> {
  label: string;
  icon?: ReactElement;
  textDirection?: TextDirection;
  onSelect?: () => void;
}

const DropdownListItem: React.FC<DropdownListItemProps> = ({
  label,
  icon,
  className,
  textDirection = TextDirection.Ltr,
  disabled,
  onSelect,
  onClick,
  onKeyDown,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (!disabled) {
      onSelect?.();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event);
    if ((event.key === "Enter" || event.key === " ") && !disabled) {
      event.preventDefault();
      onSelect?.();
    }
  };

  return (
    <button
      className={dropdownListItemStyles({ className })}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      type="button"
      role="option"
      dir={textDirection}
    >
      {icon}
      <span className="flex-1 truncate min-w-0 translate-y-px">{label}</span>
    </button>
  );
};

export { DropdownListItem };
