import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Checkbox, CheckboxState } from "../Checkbox/Checkbox";

const dropdownListItemMultiStyles = cva(
  [
    // Layout
    "flex items-center w-full box-border overflow-hidden",
    "p-pz-4xs gap-pz-4xs min-h-8",

    // Reset button styles
    "border-none bg-transparent cursor-pointer",

    // Typography
    "text-pz-system-fg-1 pz-label-m",

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

interface DropdownListItemMultiProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onSelect">,
    VariantProps<typeof dropdownListItemMultiStyles> {
  label: string;
  checked?: boolean;
  indeterminate?: boolean;
  onSelect?: (isChecked: boolean) => void;
}

const DropdownListItemMulti: React.FC<DropdownListItemMultiProps> = ({
  label,
  checked = false,
  indeterminate = false,
  className,
  rtl = false,
  onClick,
  onKeyDown,
  onSelect,
  ...props
}) => {
  // Determine the checkbox state
  const checkboxState = indeterminate
    ? CheckboxState.Indeterminate
    : checked
      ? CheckboxState.Checked
      : CheckboxState.Unchecked;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (!event.defaultPrevented) {
      onSelect?.(!checked);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event);
    if (
      (event.key === "Enter" || event.key === " ") &&
      !event.defaultPrevented
    ) {
      event.preventDefault();
      onSelect?.(!checked);
    }
  };

  // Checkbox change handler
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSelect?.(event.target.checked);
  };

  return (
    <button
      {...props}
      className={dropdownListItemMultiStyles({ rtl, className })}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      type="button"
      role="menuitemcheckbox"
      aria-checked={indeterminate ? "mixed" : checked}
    >
      <span onClick={(e) => e.stopPropagation()}>
        <Checkbox
          label={label}
          rtl={rtl || false}
          state={checkboxState}
          onChange={handleCheckboxChange}
        />
      </span>
    </button>
  );
};

export { DropdownListItemMulti };
export type { DropdownListItemMultiProps };
