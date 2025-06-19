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
  checkboxState: CheckboxState;
  icon?: React.ReactNode;
  count?: number;
  textDirection?: TextDirection;
  onSelect?: (newState: CheckboxState) => void;
}

const DropdownListItemMulti: React.FC<DropdownListItemMultiProps> = ({
  label,
  checkboxState = CheckboxState.Unchecked,
  icon,
  count,
  textDirection = TextDirection.Ltr,
  onClick,
  onKeyDown,
  onSelect,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextState = event.target.checked
      ? CheckboxState.Checked
      : CheckboxState.Unchecked;
    onSelect?.(nextState);
  };

  return (
    <button
      className={dropdownListItemMultiStyles()}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      type="button"
      role="menuitemcheckbox"
      aria-checked={
        checkboxState === CheckboxState.Indeterminate
          ? "mixed"
          : checkboxState === CheckboxState.Checked
      }
      dir={textDirection}
    >
      <Checkbox
        label={label}
        textDirection={textDirection}
        state={checkboxState}
        icon={icon}
        count={count}
        onChange={handleCheckboxChange}
      />
    </button>
  );
};

export { DropdownListItemMulti };
