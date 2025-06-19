import { cva } from "class-variance-authority";
import { CheckboxState } from "../Checkbox/Checkbox";
import {
  CheckboxSeverity,
  SeverityLevel,
  SeverityType,
} from "../Checkbox/CheckboxSeverity";
import { TextDirection } from "../textDirection";

const dropdownListItemMultiSeverityStyles = cva([
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
]);

interface DropdownListItemMultiSeverityProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onSelect"> {
  severityLevel: SeverityLevel;
  severityType?: SeverityType;
  checked?: boolean;
  indeterminate?: boolean;
  textDirection?: TextDirection;
  count?: number;
  onSelect?: (isChecked: boolean) => void;
}

const DropdownListItemMultiSeverity: React.FC<
  DropdownListItemMultiSeverityProps
> = ({
  severityLevel,
  severityType = SeverityType.Badge,
  checked = false,
  indeterminate = false,
  textDirection = TextDirection.Ltr,
  count,
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
      className={dropdownListItemMultiSeverityStyles()}
      type="button"
      role="menuitemcheckbox"
      aria-checked={indeterminate ? "mixed" : checked}
      dir={textDirection}
    >
      <CheckboxSeverity
        state={checkboxState}
        severityLevel={severityLevel}
        severityType={severityType}
        textDirection={textDirection}
        count={count}
        onChange={handleCheckboxChange}
      />
    </button>
  );
};

export { DropdownListItemMultiSeverity };
export type { DropdownListItemMultiSeverityProps };
