import { cva } from "class-variance-authority";
import { useState, ReactNode, ChangeEvent } from "react";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";

export enum CheckboxState {
  Unchecked = "unchecked",
  Checked = "checked",
  Indeterminate = "indeterminate",
}

const CHECKBOX_ICONS = {
  [CheckboxState.Indeterminate]: IndeterminateCheckBoxIcon,
  [CheckboxState.Checked]: CheckBoxIcon,
  [CheckboxState.Unchecked]: CheckBoxOutlineBlankIcon,
} as const;

const baseTextStyles = {
  true: "text-pz-system-fg-disabled",
  false: "text-pz-system-fg-1",
};

const containerStyles = cva("group flex items-center gap-2", {
  variants: {
    rtl: { true: "flex-row-reverse", false: "flex-row" },
    disabled: baseTextStyles,
  },
  defaultVariants: { rtl: false, disabled: false },
});

const checkboxIconStyles = cva(
  "transition-all duration-200 focus:outline-none",
  {
    variants: {
      disabled: baseTextStyles,
      focused: {
        true: "ring-2 ring-pz-system-border-focused-1 ring-offset-0 rounded-pz-3xs",
        false: "",
      },
    },
    defaultVariants: { disabled: false, focused: false },
  }
);

const labelStyles = cva(
  "select-none pz-body-m400 max-w-[480px] translate-y-px transition-colors duration-200",
  {
    variants: { disabled: baseTextStyles },
    defaultVariants: { disabled: false },
  }
);

const iconStyles = cva(
  "text-pz-system-fg-3 transition-colors duration-200 flex items-center justify-center",
  {
    variants: { disabled: baseTextStyles },
    defaultVariants: { disabled: false },
  }
);

const countStyles = cva(
  "pz-body-m400 leading-[1.46875em] transition-colors duration-200",
  {
    variants: { disabled: baseTextStyles },
    defaultVariants: { disabled: false },
  }
);

interface CheckboxProps {
  label?: string;
  state?: CheckboxState;
  disabled?: boolean;
  rtl?: boolean;
  icon?: ReactNode;
  alwaysShowCount?: boolean;
  count?: number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({
  state = CheckboxState.Unchecked,
  rtl = false,
  disabled = false,
  icon,
  label,
  alwaysShowCount = false,
  count = 0,
  onChange,
}: CheckboxProps): React.ReactElement => {
  const [internalFocused, setInternalFocused] = useState(false);
  const [isKeyboardFocus, setIsKeyboardFocus] = useState(false);
  const showFocusRing = internalFocused && isKeyboardFocus;
  const safeCount = Math.max(0, count || 0);
  const shouldShowCount = alwaysShowCount || safeCount > 0;

  const IconComponent = CHECKBOX_ICONS[state];
  const baseIconClasses = checkboxIconStyles({
    disabled,
    focused: showFocusRing,
  });
  const stateColorClass =
    state === CheckboxState.Unchecked ? "text-pz-gray-300" : "text-pz-blue-500";
  const iconClasses = `${baseIconClasses} ${stateColorClass}`;

  return (
    <label
      className={containerStyles({ rtl, disabled })}
      onMouseDown={() => setIsKeyboardFocus(false)}
    >
      <input
        type="checkbox"
        checked={state === CheckboxState.Checked}
        disabled={disabled}
        className="sr-only focus:outline-none"
        tabIndex={disabled ? -1 : 0}
        onFocus={(e) => {
          setInternalFocused(true);
          if (e.target.matches(":focus-visible")) setIsKeyboardFocus(true);
        }}
        onBlur={() => {
          setInternalFocused(false);
          setIsKeyboardFocus(false);
        }}
        onKeyDown={(e) => {
          if (["Space", "Enter"].includes(e.key)) {
            e.preventDefault();
            if (!disabled) {
              setIsKeyboardFocus(true);
              (e.target as HTMLInputElement).click();
            }
          } else if (e.key === "Tab") {
            setIsKeyboardFocus(true);
          }
        }}
        onChange={onChange}
      />
      <IconComponent className={iconClasses} fontSize="small" />
      {icon && <span className={iconStyles({ disabled })}>{icon}</span>}
      {label && <span className={labelStyles({ disabled })}>{label}</span>}
      {shouldShowCount && (
        <span className={countStyles({ disabled })}>({safeCount})</span>
      )}
    </label>
  );
};

export default Checkbox;
