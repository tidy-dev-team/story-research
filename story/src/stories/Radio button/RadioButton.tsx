// filepath: /Users/dmitridmitriev/Documents/prisma/story-research/story/src/stories/Radio button/RadioButton.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { ComponentProps, useState } from "react";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

const radioButtonIconStyles = cva(
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
      selected: {
        true: "",
        false: "",
      },
      disabled: {
        true: "text-pz-system-fg-disabled cursor-not-allowed hover:text-pz-system-fg-disabled active:text-pz-system-fg-disabled",
        false: "cursor-pointer",
      },
      focused: {
        true: "ring-2 ring-offset-1 ring-pz-system-border-focused-1 rounded-full",
        false: "",
      },
    },
    compoundVariants: [
      {
        selected: false,
        disabled: false,
        className:
          "text-pz-gray-300 hover:text-pz-system-fg-hover active:text-pz-system-fg-pressed",
      },
      {
        selected: true,
        disabled: false,
        className:
          "text-pz-blue-500 hover:text-pz-system-fg-hover active:text-pz-system-fg-pressed",
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
  focused?: boolean;
  onChange?: () => void;
}

export const RadioButton = ({
  selected = false,
  rtl = false,
  disabled = false,
  focused = false,
  label,
  className,
  onChange,
  ...props
}: RadioButtonProps) => {
  const [internalFocused, setInternalFocused] = useState(false);
  const [isKeyboardFocus, setIsKeyboardFocus] = useState(false);
  const showFocusRing = focused || (internalFocused && isKeyboardFocus);

  const iconClasses = radioButtonIconStyles({
    selected,
    disabled,
    focused: showFocusRing,
    className,
  });
  const labelClasses = labelStyles({ disabled });

  const containerClasses = `flex items-center ${rtl ? "flex-row-reverse" : ""} gap-2 ${
    disabled ? "cursor-not-allowed" : "cursor-pointer"
  }`;

  const renderIcon = () => {
    const iconProps = {
      className: iconClasses,
      fontSize: "small" as const,
    };

    return selected ? (
      <RadioButtonCheckedIcon {...iconProps} sx={{ fontSize: 20 }} />
    ) : (
      <RadioButtonUncheckedIcon {...iconProps} sx={{ fontSize: 20 }} />
    );
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
