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

// Common disabled styles
const disabledVariants = {
  true: "text-pz-system-fg-disabled cursor-not-allowed",
  false: "",
};

const checkboxIconStyles = cva(
  [
    "transition-all",
    "duration-200",
    "cursor-pointer",
    "focus:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-pz-system-border-focused-1",
    "focus-visible:ring-offset-0",
  ],
  {
    variants: {
      state: {
        unchecked: "",
        checked: "",
        indeterminate: "",
      },
      disabled: {
        true: "text-pz-system-fg-disabled cursor-not-allowed",
        false: "cursor-pointer",
      },
      focused: {
        true: "ring-2 ring-pz-system-border-focused-1 rounded-pz-3xs",
        false: "",
      },
    },
    compoundVariants: [
      {
        state: "unchecked",
        disabled: false,
        className:
          "text-pz-gray-300 hover:enabled:text-pz-system-fg-hover active:enabled:text-pz-system-fg-pressed",
      },
      {
        state: ["checked", "indeterminate"],
        disabled: false,
        className:
          "text-pz-blue-500 hover:enabled:text-pz-system-fg-hover active:enabled:text-pz-system-fg-pressed",
      },
    ],
    defaultVariants: {
      state: "unchecked",
      disabled: false,
      focused: false,
    },
  }
);

const containerStyles = cva("flex items-center gap-2", {
  variants: {
    rtl: {
      true: "flex-row-reverse",
      false: "flex-row",
    },
    disabled: disabledVariants,
  },
  defaultVariants: {
    rtl: false,
    disabled: false,
  },
});

const labelStyles = cva(
  ["select-none", "transition-colors", "duration-200", "pz-body-m400"],
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
  ["text-pz-system-fg-3", "transition-colors", "duration-200"],
  {
    variants: { disabled: disabledVariants },
    defaultVariants: { disabled: false },
  }
);

const countStyles = cva(
  ["pz-body-m400", "leading-[1.46875em]", "transition-colors", "duration-200"],
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
  focused?: boolean;
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
      focused = false,
      icon,
      label,
      alwaysShowCount = false,
      count = 0,
      className,
      onChange,
    },
    ref
  ): React.ReactElement => {
    // Ensure count is never negative
    const safeCount = Math.max(0, count || 0);
    const [internalFocused, setInternalFocused] = useState(false);
    const [isKeyboardFocus, setIsKeyboardFocus] = useState(false);
    const showFocusRing = focused || (internalFocused && isKeyboardFocus);

    const renderCheckboxIcon = () => {
      const iconSize = 20; // Standard size for checkbox icons
      const iconStyle = {
        fontSize: iconSize,
        width: iconSize,
        height: iconSize,
      };

      const iconClasses = checkboxIconStyles({
        state,
        disabled,
        focused: showFocusRing,
        className,
      });

      switch (state) {
        case CheckboxState.Indeterminate:
          return (
            <IndeterminateCheckBoxIcon
              className={iconClasses}
              style={iconStyle}
            />
          );
        case CheckboxState.Checked:
          return <CheckBoxIcon className={iconClasses} style={iconStyle} />;
        case CheckboxState.Unchecked:
        default:
          return (
            <CheckBoxOutlineBlankIcon
              className={iconClasses}
              style={iconStyle}
            />
          );
      }
    };

    const shouldShowCount = alwaysShowCount || safeCount > 0;

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
              if (!disabled && onChange) {
                setIsKeyboardFocus(true);
                // Create a synthetic change event with minimal properties
                const inputElement = e.target as HTMLInputElement;
                const changeEvent = {
                  target: {
                    checked: state !== CheckboxState.Checked,
                    value: inputElement.value,
                    name: inputElement.name,
                    type: inputElement.type,
                  },
                  currentTarget: inputElement,
                } as React.ChangeEvent<HTMLInputElement>;
                onChange(changeEvent);
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
export type { CheckboxProps };
