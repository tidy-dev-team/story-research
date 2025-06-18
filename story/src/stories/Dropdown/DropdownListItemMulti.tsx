import { cva } from "class-variance-authority";
import { Checkbox, CheckboxState } from "../Checkbox/Checkbox";
import { TextDirection } from "../textDirection";

const dropdownListItemMultiStyles = cva([
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

interface DropdownListItemMultiProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onSelect"> {
  label: string;
  checked?: boolean;
  indeterminate?: boolean;
  icon?: React.ReactNode;
  count?: number;
  alwaysShowCount?: boolean;
  textDirection?: TextDirection;
  onSelect?: (isChecked: boolean) => void;
}

const DropdownListItemMulti: React.FC<DropdownListItemMultiProps> = ({
  label,
  checked = false,
  indeterminate = false,
  icon,
  count,
  alwaysShowCount = false,
  textDirection = TextDirection.Ltr,
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
      className={dropdownListItemMultiStyles()}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      type="button"
      role="menuitemcheckbox"
      aria-checked={indeterminate ? "mixed" : checked}
      dir={textDirection}
    >
      <Checkbox
        label={label}
        textDirection={textDirection}
        state={checkboxState}
        icon={icon}
        count={count}
        alwaysShowCount={alwaysShowCount}
        onChange={handleCheckboxChange}
      />
    </button>
  );
};

export { DropdownListItemMulti };
