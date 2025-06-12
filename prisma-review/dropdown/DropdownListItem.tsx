import React, { type ReactElement } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const dropdownListItemStyles = cva(
  [
    // Layout
    "flex items-center w-full box-border overflow-hidden",
    "px-pz-4xs py-pz-2xs gap-pz-4xs min-h-8",

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
    "focus-visible:rounded-pz-2xs ring-offset-1 ring-offset-pz-gray-1000",

    // Disabled styles
    "disabled:text-pz-system-fg-disabled disabled:cursor-not-allowed",
    "disabled:hover:bg-transparent",
  ],
  {
    variants: {
      rtl: {
        true: "flex-row-reverse text-right",
        false: "flex-row text-left",
      },
    },
    defaultVariants: {
      rtl: false,
    },
  }
);

interface DropdownListItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof dropdownListItemStyles> {
  label: string;
  icon?: ReactElement;
  onSelect?: () => void;
}

const DropdownListItem: React.FC<DropdownListItemProps> = ({
  label,
  icon,
  className,
  rtl,
  disabled,
  onSelect,
  onClick,
  onKeyDown,
  ...props
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
      className={dropdownListItemStyles({ rtl, className })}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      type="button"
      role="option"
      {...props}
    >
      {icon}
      <span className="flex-1 truncate min-w-0 translate-y-px">{label}</span>
    </button>
  );
};

export { DropdownListItem, dropdownListItemStyles };
export type { DropdownListItemProps };
