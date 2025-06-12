import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ComponentProps, useState } from "react";
import { twMerge } from "tailwind-merge";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

const radioButtonIconStyles = cva(
  ["transition-all", "duration-200", "cursor-pointer"],
  {
    variants: {
      selected: {
        true: "",
        false: "",
      },
      disabled: {
        true: "text-pz-system-fg-disabled cursor-not-allowed",
        false: "cursor-pointer",
      },
      focused: {
        true: "ring-2 ring-pz-system-border-focused-1 ring-offset-0 rounded-full",
        false: "",
      },
    },
    compoundVariants: [
      {
        selected: false,
        disabled: false,
        className:
          "text-pz-system-fg-2 group-hover:text-pz-system-fg-hover group-active:text-pz-system-fg-pressed",
      },
      {
        selected: true,
        disabled: false,
        className:
          "text-pz-system-fg-primary group-hover:text-pz-system-fg-hover group-active:text-pz-system-fg-pressed",
      },
    ],
    defaultVariants: {
      selected: false,
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
    "leading-none",
    "translate-y-px",
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

interface RadioButtonProps
  extends Omit<
      ComponentProps<"input">,
      "type" | "size" | "checked" | "disabled"
    >,
    VariantProps<typeof radioButtonIconStyles> {
  label?: string;
  selected?: boolean;
  disabled?: boolean;
  rtl?: boolean;
  onChange?: () => void;
}

export const RadioButton = ({
  selected = false,
  rtl = false,
  disabled = false,
  label,
  className,
  onChange,
  ...props
}: RadioButtonProps) => {
  const [internalFocused, setInternalFocused] = useState(false);
  const [isKeyboardFocus, setIsKeyboardFocus] = useState(false);
  const showFocusRing = internalFocused && isKeyboardFocus;

  const iconClasses = radioButtonIconStyles({
    selected,
    disabled,
    focused: showFocusRing,
    className,
  });
  const labelClasses = labelStyles({ disabled });

  const containerClasses = twMerge(
    "group flex items-center gap-2",
    rtl && "flex-row-reverse",
    disabled ? "cursor-not-allowed" : "cursor-pointer"
  );

  const renderIcon = () => {
    const iconSize = 20;
    const iconStyle = {
      fontSize: iconSize,
      width: iconSize,
      height: iconSize,
    };

    if (selected) {
      return (
        <RadioButtonCheckedIcon className={iconClasses} style={iconStyle} />
      );
    } else {
      return (
        <RadioButtonUncheckedIcon className={iconClasses} style={iconStyle} />
      );
    }
  };

  return (
    <label
      className={containerClasses}
      onMouseDown={() => setIsKeyboardFocus(false)}
    >
      <input
        type="radio"
        checked={selected}
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
            if (!disabled && !selected && onChange) {
              setIsKeyboardFocus(true);
              onChange();
            }
          }
          if (e.key === "Tab") {
            setIsKeyboardFocus(true);
          }
        }}
        onChange={onChange}
        {...props}
      />
      {renderIcon()}
      {label && <span className={labelClasses}>{label}</span>}
    </label>
  );
};

export type { RadioButtonProps };
