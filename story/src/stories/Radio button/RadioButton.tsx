// filepath: /Users/dmitridmitriev/Documents/prisma/story-research/story/src/stories/Radio button/RadioButton.tsx
import React, { ReactElement, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

export enum RadioButtonType {
  Primary = "primary",
}

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
      rtl: {
        true: "mr-2",
        false: "ml-2",
      },
    },
    defaultVariants: {
      disabled: false,
      rtl: false,
    },
  }
);

interface RadioButtonProps
  extends Omit<VariantProps<typeof radioButtonIconStyles>, "disabled"> {
  label?: string;
  selected: boolean;
  onChange: () => void;
  disabled?: boolean;
  focused?: boolean;
  rtl?: boolean;
}

export const RadioButton = ({
  label,
  selected,
  onChange,
  rtl,
  disabled,
  focused,
}: RadioButtonProps): ReactElement => {
  const [internalFocused, setInternalFocused] = useState(false);
  const [isKeyboardFocus, setIsKeyboardFocus] = useState(false);
  const showFocusRing = focused || (internalFocused && isKeyboardFocus);

  const iconClasses = twMerge(
    radioButtonIconStyles({ selected, disabled, focused: showFocusRing })
  );
  const labelClasses = twMerge(labelStyles({ disabled, rtl }));

  const containerClasses = [
    "flex",
    "items-center",
    "gap-2",
    rtl ? "flex-row-reverse" : "",
    disabled ? "cursor-not-allowed" : "cursor-pointer",
  ]
    .filter(Boolean)
    .join(" ");

  const renderIcon = () => {
    const iconProps = {
      className: iconClasses,
      sx: { fontSize: 20 },
    };

    return selected ? (
      <RadioButtonCheckedIcon {...iconProps} />
    ) : (
      <RadioButtonUncheckedIcon {...iconProps} />
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
        onChange={onChange}
        disabled={disabled}
        className="sr-only focus:outline-none"
        tabIndex={disabled ? -1 : 0}
        onFocus={(e) => {
          setInternalFocused(true);
          // Only show focus ring if focus came from keyboard navigation
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
            if (!disabled && !selected) {
              setIsKeyboardFocus(true);
              onChange();
            }
          }
          if (e.key === "Tab") {
            setIsKeyboardFocus(true);
          }
        }}
      />
      {renderIcon()}
      {label && <span className={labelClasses}>{label}</span>}
    </label>
  );
};
