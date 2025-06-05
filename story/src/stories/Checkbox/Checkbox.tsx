import { cva, type VariantProps } from "class-variance-authority";
import { ComponentProps, useState } from "react";
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
    "focus:outline-none",
    "focus-visible:ring-2",
    "ring-offset-1",
    "ring-offset-pz-gray-1000",
    "focus-visible:ring-pz-system-border-focused-1",
  ],
  {
    variants: {
      state: {
        unchecked: "",
        checked: "",
        indeterminate: "",
      },
      disabled: {
        true: "text-pz-system-fg-disabled cursor-not-allowed hover:text-pz-system-fg-disabled active:text-pz-system-fg-disabled focus:text-pz-system-fg-disabled",
        false: "cursor-pointer",
      },
      focused: {
        true: "ring-2 ring-offset-1 ring-pz-system-border-focused-1 rounded-pz-3xs",
        false: "",
      },
    },
    compoundVariants: [
      {
        state: "unchecked",
        disabled: false,
        className:
          "text-pz-gray-300 hover:text-pz-system-fg-hover active:text-pz-system-fg-pressed",
      },
      {
        state: "checked",
        disabled: false,
        className:
          "text-pz-blue-500 hover:text-pz-system-fg-hover active:text-pz-system-fg-pressed",
      },
      {
        state: "indeterminate",
        disabled: false,
        className:
          "text-pz-blue-500 hover:text-pz-system-fg-hover active:text-pz-system-fg-pressed",
      },
    ],
    defaultVariants: {
      state: "unchecked",
      disabled: false,
      focused: false,
    },
  }
);

const labelStyles = cva(
  [
    "select-none",
    "transition-colors",
    "duration-200",
    "font-['Heebo',_sans-serif]",
    "pz-body-m400",
  ],
  {
    variants: {
      disabled: {
        true: "text-pz-system-fg-disabled cursor-not-allowed",
        false: "text-pz-system-fg-1",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
);

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
        true: "text-pz-system-fg-disabled cursor-not-allowed",
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
        true: "text-pz-system-fg-disabled cursor-not-allowed",
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

  const containerClasses = `flex items-center ${rtl ? "flex-row-reverse" : ""} gap-2 ${
    disabled ? "cursor-not-allowed" : "cursor-pointer"
  }`;

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

  const renderSeverityIndicator = () => {
    if (!severity) return null;
    return <div className={severityIndicatorStyles({ level: severity })} />;
  };

  const renderCount = () => {
    if (!showCount && count === 0) return null;
    return <span className={countStyles({ disabled })}>({count})</span>;
  };

  const renderElements = () => {
    if (rtl) {
      // RTL: icon, severity, checkbox (due to flex-row-reverse, we reverse the order)
      return [
        renderIcon(), // checkbox (will appear rightmost)
        renderSeverityIndicator(), // severity (will appear middle)
        renderLabelIcon(), // icon (will appear leftmost)
      ];
    } else {
      // LTR: checkbox, severity, icon
      return [
        renderIcon(), // checkbox (appears leftmost)
        renderSeverityIndicator(), // severity (appears middle)
        renderLabelIcon(), // icon (appears after severity)
      ];
    }
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
      {renderElements()}
      {label && <span className={labelStyles({ disabled })}>{label}</span>}
      {renderCount()}
    </label>
  );
};

export type { CheckboxProps };
