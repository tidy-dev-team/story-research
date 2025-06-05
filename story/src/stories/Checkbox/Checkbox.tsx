import { cva, type VariantProps } from "class-variance-authority";
import { ComponentProps, useState, ReactElement } from "react";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import StarIcon from "@mui/icons-material/Star";

export enum SeverityLevel {
  High = "high",
  Medium = "medium",
  Low = "low",
}

const checkboxIconStyles = cva(
  [
    "transition-all",
    "duration-200",
    "cursor-pointer",
    "focus:outline-none",
    "focus-visible:ring-2",
    "ring-offset-1",
    "ring-offset-[#101010]",
    "focus-visible:ring-[#0E75B5]",
  ],
  {
    variants: {
      state: {
        unchecked: "text-[#A8B0B8] hover:text-[#0081D1] active:text-[#005B94]",
        checked: "text-[#0093EE] hover:text-[#0081D1] active:text-[#005B94]",
        indeterminate:
          "text-[#0093EE] hover:text-[#0081D1] active:text-[#005B94]",
      },
      disabled: {
        true: "text-pz-system-fg-disabled cursor-not-allowed hover:text-pz-system-fg-disabled active:text-pz-system-fg-disabled",
        false: "",
      },
      focused: {
        true: "ring-2 ring-offset-1 ring-pz-system-border-focused-1 rounded-pz-3xs",
        false: "",
      },
    },
    defaultVariants: {
      state: "unchecked",
      disabled: false,
      focused: false,
    },
  }
);

const labelStyles = cva([
  "select-none",
  "transition-colors",
  "duration-200",
  "text-white",
  "font-['Heebo',_sans-serif]",
]);

const severityIndicatorStyles = cva(["w-3", "h-3", "rounded-pz-3xs"], {
  variants: {
    level: {
      [SeverityLevel.High]: "bg-pz-system-priority-high-3",
      [SeverityLevel.Medium]: "bg-pz-system-priority-medium-3",
      [SeverityLevel.Low]: "bg-pz-system-priority-low-1",
    },
  },
  defaultVariants: {
    level: SeverityLevel.High,
  },
});

const iconStyles = cva(
  ["text-pz-system-fg-3", "transition-colors", "duration-200"],
  {
    variants: {
      disabled: {
        true: "text-pz-system-fg-disabled",
        false: "",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
);

const countStyles = cva(
  [
    "font-['Heebo',_sans-serif]",
    "pz-body-m400",
    "leading-[1.46875em]",
    "transition-colors",
    "duration-200",
  ],
  {
    variants: {
      disabled: {
        true: "text-pz-system-fg-disabled",
        false: "text-pz-system-fg-1",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
);

export const iconMap = {
  info: <InfoIcon sx={{ fontSize: 16 }} />,
  warning: <WarningIcon sx={{ fontSize: 16 }} />,
  error: <ErrorIcon sx={{ fontSize: 16 }} />,
  star: <StarIcon sx={{ fontSize: 16 }} />,
} as const;

export type IconName = keyof typeof iconMap;

interface CheckboxProps
  extends Omit<
      ComponentProps<"input">,
      "type" | "size" | "checked" | "disabled"
    >,
    VariantProps<typeof checkboxIconStyles> {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  rtl?: boolean;
  focused?: boolean;
  severity?: SeverityLevel;
  icon?: IconName;
  showCount?: boolean;
  count?: number;
}

export const Checkbox = ({
  checked = false,
  indeterminate = false,
  rtl = false,
  disabled = false,
  focused = false,
  severity,
  icon,
  label,
  showCount = false,
  count = 0,
  className,
  onChange,
  ...props
}: CheckboxProps) => {
  const [internalFocused, setInternalFocused] = useState(false);
  const [isKeyboardFocus, setIsKeyboardFocus] = useState(false);
  const showFocusRing = focused || (internalFocused && isKeyboardFocus);

  const containerClasses = `flex items-center ${
    rtl ? "flex-row-reverse gap-2" : "gap-2"
  } ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`;

  const getIconState = () => {
    if (indeterminate) return "indeterminate";
    if (checked) return "checked";
    return "unchecked";
  };

  const renderIcon = () => {
    const iconProps = {
      className: checkboxIconStyles({
        state: getIconState(),
        disabled,
        focused: showFocusRing,
        className,
      }),
      fontSize: "small" as const,
    };

    if (indeterminate) {
      return <IndeterminateCheckBoxIcon {...iconProps} />;
    }

    if (checked) {
      return <CheckBoxIcon {...iconProps} />;
    }

    return <CheckBoxOutlineBlankIcon {...iconProps} />;
  };

  const renderLabelIcon = () => {
    if (!icon) return null;

    const iconElement = iconMap[icon];
    return <span className={iconStyles({ disabled })}>{iconElement}</span>;
  };

  const renderCount = () => {
    if (!showCount && count === 0) return null;

    return <span className={countStyles({ disabled })}>({count})</span>;
  };

  return (
    <label
      className={containerClasses}
      onMouseDown={() => setIsKeyboardFocus(false)}
    >
      <input
        type="checkbox"
        checked={checked}
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
              onChange(e as any);
            }
          }
          if (e.key === "Tab") {
            setIsKeyboardFocus(true);
          }
        }}
        onChange={onChange}
        {...props}
      />
      {!rtl && renderIcon()}
      {!rtl && severity && (
        <div className={severityIndicatorStyles({ level: severity })} />
      )}
      {!rtl && renderLabelIcon()}
      {rtl && renderIcon()}
      {rtl && severity && (
        <div className={severityIndicatorStyles({ level: severity })} />
      )}
      {rtl && renderLabelIcon()}
      {label && (
        <span
          className={labelStyles({
            className: disabled
              ? "text-pz-system-fg-disabled cursor-not-allowed pz-body-m400"
              : "text-pz-system-fg-1 pz-body-m400",
          })}
        >
          {label}
        </span>
      )}
      {renderCount()}
    </label>
  );
};

export type { CheckboxProps };
