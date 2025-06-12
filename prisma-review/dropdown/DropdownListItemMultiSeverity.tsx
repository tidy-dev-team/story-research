import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckboxState } from "../Checkbox/Checkbox";
import { CheckboxSeverity } from "../Checkbox/CheckboxSeverity";

const dropdownListItemMultiSeverityStyles = cva(
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

interface DropdownListItemMultiSeverityProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onSelect">,
    VariantProps<typeof dropdownListItemMultiSeverityStyles> {
  severityLabel: string;
  severityLevel: "high" | "medium" | "low";
  severityType?: "badge" | "bar";
  checked?: boolean;
  indeterminate?: boolean;
  onSelect?: (isChecked: boolean) => void;
}

const DropdownListItemMultiSeverity: React.FC<
  DropdownListItemMultiSeverityProps
> = ({
  severityLabel,
  severityLevel,
  severityType = "badge",
  checked = false,
  indeterminate = false,
  className,
  rtl = false,
  onClick,
  onKeyDown,
  onSelect,
  ...props
}) => {
  const checkboxState = indeterminate
    ? CheckboxState.Indeterminate
    : checked
      ? CheckboxState.Checked
      : CheckboxState.Unchecked;

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSelect?.(event.target.checked);
  };

  return (
    <button
      {...props}
      className={dropdownListItemMultiSeverityStyles({ rtl, className })}
      type="button"
      role="menuitemcheckbox"
      aria-checked={indeterminate ? "mixed" : checked}
    >
      <span onClick={(e) => e.stopPropagation()}>
        <CheckboxSeverity
          state={checkboxState}
          severityLevel={severityLevel}
          severityType={severityType}
          rtl={rtl || false}
          onChange={handleCheckboxChange}
        />
      </span>
    </button>
  );
};

export { DropdownListItemMultiSeverity };
export type { DropdownListItemMultiSeverityProps };
