import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Severity } from "../Severity/Severity";
import { TextDirection } from "../textDirection";

const dropdownListItemSeverityStyles = cva([
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
]);

interface DropdownListItemSeverityProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof dropdownListItemSeverityStyles> {
  level: "high" | "medium" | "low";
  textDirection?: TextDirection;
  onSelect?: () => void;
}

const DropdownListItemSeverity: React.FC<DropdownListItemSeverityProps> = ({
  level,
  className,
  textDirection = TextDirection.Ltr,
  onSelect,
  onClick,
  onKeyDown,
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
      className={dropdownListItemSeverityStyles({ className })}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      type="button"
      role="option"
      dir={textDirection}
    >
      <Severity level={level} type="badge" textDirection={textDirection} />
    </button>
  );
};

export { DropdownListItemSeverity };
