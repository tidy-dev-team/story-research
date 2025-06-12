import { cva } from "class-variance-authority";
import { useState, ReactNode, forwardRef } from "react";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";

export enum CheckboxState {
  Unchecked = "unchecked",
  Checked = "checked",
  Indeterminate = "indeterminate",
}

// Icon mapping for cleaner rendering
const CHECKBOX_ICONS = {
  [CheckboxState.Indeterminate]: IndeterminateCheckBoxIcon,
  [CheckboxState.Checked]: CheckBoxIcon,
  [CheckboxState.Unchecked]: CheckBoxOutlineBlankIcon,
} as const;

// Common styles for consistent theming
const DISABLED_STYLES = "text-pz-system-fg-disabled cursor-not-allowed";
const ENABLED_CURSOR = "cursor-pointer";
const TRANSITION_STYLES = "transition-colors duration-200";

const checkboxIconStyles = cva(
  ["transition-all", "duration-200", "focus:outline-none"],
  {
    variants: {
      state: {
        unchecked: "",
        checked: "",
        indeterminate: "",
      },
      disabled: {
        true: DISABLED_STYLES,
        false: ENABLED_CURSOR,
      },
      focused: {
        true: "ring-2 ring-pz-system-border-focused-1 ring-offset-0 rounded-pz-3xs",
        false: "",
      },
    },
    compoundVariants: [
      {
        state: "unchecked",
        disabled: false,
        className:
          "text-pz-gray-300 group-hover:text-pz-system-fg-hover group-active:text-pz-system-fg-pressed",
      },
      {
        state: ["checked", "indeterminate"],
        disabled: false,
        className:
          "text-pz-blue-500 group-hover:text-pz-system-fg-hover group-active:text-pz-system-fg-pressed",
      },
    ],
    defaultVariants: {
      state: "unchecked",
      disabled: false,
      focused: false,
    },
  }
);

const containerStyles = cva("group flex items-start gap-2", {
  variants: {
    rtl: {
      true: "flex-row-reverse",
      false: "flex-row",
    },
    disabled: {
      true: DISABLED_STYLES,
      false: ENABLED_CURSOR,
    },
  },
  defaultVariants: {
    rtl: false,
    disabled: false,
  },
});

const labelStyles = cva(
  [
    "select-none",
    TRANSITION_STYLES,
    "pz-body-m400",
    "-translate-y-px",
    "max-w-[480px]",
    "leading-6",
  ],
  {
    variants: {
      disabled: {
        true: "text-pz-system-fg-disabled",
        false: "text-pz-system-fg-1",
      },
    },
    defaultVariants: { disabled: false },
  }
);

const iconStyles = cva(
  [
    "text-pz-system-fg-3",
    TRANSITION_STYLES,
    "flex",
    "items-center",
    "justify-center",
    "translate-y-0.5",
  ],
  {
    variants: {
      disabled: {
        true: "text-pz-system-fg-disabled",
        false: "text-pz-system-fg-3",
      },
    },
    defaultVariants: { disabled: false },
  }
);

const countStyles = cva(
  ["pz-body-m400", "leading-[1.46875em]", TRANSITION_STYLES],
  {
    variants: {
      disabled: {
        true: "text-pz-system-fg-disabled",
        false: "text-pz-system-fg-1",
      },
    },
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
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      state = CheckboxState.Unchecked,
      rtl = false,
      disabled = false,
      icon,
      label,
      alwaysShowCount = false,
      count = 0,
      className,
      onChange,
    },
    ref
  ): React.ReactElement => {
    const safeCount = Math.max(0, count || 0);
    const [internalFocused, setInternalFocused] = useState(false);
    const [isKeyboardFocus, setIsKeyboardFocus] = useState(false);
    const showFocusRing = internalFocused && isKeyboardFocus;

    const renderCheckboxIcon = () => {
      const iconClasses = checkboxIconStyles({
        state,
        disabled,
        focused: showFocusRing,
        className,
      });

      const IconComponent = CHECKBOX_ICONS[state];
      return (
        <IconComponent
          className={iconClasses}
          style={{ fontSize: 20, width: 20, height: 20 }}
        />
      );
    };

    const shouldShowCount = alwaysShowCount || safeCount > 0;

    return (
      <label
        className={containerStyles({ rtl, disabled })}
        onMouseDown={() => setIsKeyboardFocus(false)}
      >
        <input
          ref={ref}
          type="checkbox"
          checked={state === CheckboxState.Checked}
          disabled={disabled}
          className="sr-only focus:outline-none"
          tabIndex={disabled ? -1 : 0}
          onFocus={(e) => {
            setInternalFocused(true);
            if (e.target.matches(":focus-visible")) {
              setIsKeyboardFocus(true);
            }
          }}
          onBlur={() => {
            setInternalFocused(false);
            setIsKeyboardFocus(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Space" || e.key === "Enter") {
              e.preventDefault();
              if (!disabled) {
                setIsKeyboardFocus(true);
                (e.target as HTMLInputElement).click();
              }
            }
            if (e.key === "Tab") {
              setIsKeyboardFocus(true);
            }
          }}
          onChange={onChange}
        />
        {renderCheckboxIcon()}
        {icon && <span className={iconStyles({ disabled })}>{icon}</span>}
        {label && <span className={labelStyles({ disabled })}>{label}</span>}
        {shouldShowCount && (
          <span className={countStyles({ disabled })}>({safeCount})</span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
export { Checkbox };
export type { CheckboxProps };
