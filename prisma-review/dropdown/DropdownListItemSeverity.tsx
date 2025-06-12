import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Severity } from "../Severity/Severity";

const dropdownListItemSeverityStyles = cva(
  [
    // Layout
    "flex items-center w-full box-border overflow-hidden",
    "p-pz-4xs gap-pz-4xs min-h-8",

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

interface DropdownListItemSeverityProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof dropdownListItemSeverityStyles> {
  level: "high" | "medium" | "low";
  onSelect?: () => void;
}

const DropdownListItemSeverity: React.FC<DropdownListItemSeverityProps> = ({
  level,
  className,
  rtl = false,
  onSelect,
  onClick,
  onKeyDown,
  ...props
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    onSelect?.();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event);
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect?.();
    }
  };

  return (
    <button
      {...props}
      className={dropdownListItemSeverityStyles({ rtl, className })}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      type="button"
      role="option"
    >
      <Severity level={level} type="badge" rtl={rtl || false} />
    </button>
  );
};

export { DropdownListItemSeverity };
export type { DropdownListItemSeverityProps };
