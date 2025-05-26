// filepath: /Users/dmitridmitriev/Documents/prisma/story-research/story/src/stories/Radio button/RadioButton.tsx
import React, { ReactElement } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export enum RadioButtonType {
  Primary = "primary",
}

const radioButtonStyles = cva(
  [
    "w-4",
    "h-4",
    "rounded-full",
    "bg-transparent",
    "border-2",
    "relative",
    "transition-all",
    "duration-200",
    "cursor-pointer",
    "focus:outline-none",
    "focus-visible:ring-2",
    "ring-offset-2",
    "ring-offset-[#101010]",
    "bg-transparent",
    "focus-visible:ring-[#0E75B5]",
  ],
  {
    variants: {
      selected: {
        true: [
          "border-[#0093EE]",
          "hover:enabled:border-[#0081D1]",
          "active:enabled:border-[#005B94]",
          "active:shadow-inner",
          "before:content-['']",
          "before:absolute",
          "before:w-2",
          "before:h-2",
          "before:enabled:bg-[#0093EE]",
          "before:rounded-full",
          "before:top-1/2",
          "before:left-1/2",
          "before:transform",
          "before:-translate-x-1/2",
          "before:-translate-y-1/2",
          "before:scale-100",
          "before:transition-transform",
          "hover:enabled:before:bg-[#0081D1]",
          "hover:enabled:before:border-[#0081D1]",
          "active:enabled:before:bg-[#005B94]",
        ].join(" "),
        false: [
          "border-[#A8B0B8]",
          "hover:border-[#0081D1]",
          "active:border-[#005B94]",
        ].join(" "),
      },
      rtl: {
        true: "flex-row-reverse",
        false: "",
      },
      disabled: {
        true: "border-white/38 cursor-not-allowed opacity-50",
        false: "",
      },
      focused: {
        true: "ring-2 ring-blue-300 ring-offset-2",
        false: "",
      },
    },
    defaultVariants: {
      selected: false,
      rtl: false,
      disabled: false,
      focused: false,
    },
    compoundVariants: [
      {
        selected: true,
        disabled: true,
        className: "before:bg-white/38",
      },
    ],
  }
);

const labelStyles = cva(
  [
    "select-none",
    "transition-colors",
    "duration-200",
    "cursor-pointer",
    "font-medium",
  ],
  {
    variants: {
      type: {
        [RadioButtonType.Primary]: ["text-white"].join(" "),
      },
      disabled: {
        true: "text-gray-400 cursor-not-allowed",
        false: "",
      },
      rtl: {
        true: "mr-2",
        false: "ml-2",
      },
    },
    defaultVariants: {
      type: RadioButtonType.Primary,
      disabled: false,
      rtl: false,
    },
  }
);

interface RadioButtonProps
  extends Omit<VariantProps<typeof radioButtonStyles>, "disabled"> {
  label?: string;
  selected: boolean;
  onChange: () => void;
  disabled?: boolean;
  focused?: boolean;
}

export const RadioButton = ({
  label,
  selected,
  onChange,
  rtl,
  disabled,
  focused,
}: RadioButtonProps): ReactElement => {
  const radioClasses = twMerge(
    radioButtonStyles({ selected, rtl, disabled, focused })
  );
  const labelClasses = twMerge(labelStyles({ disabled, rtl }));

  return (
    <label
      className={`flex items-center gap-2 cursor-pointer ${rtl ? "flex-row-reverse" : ""} ${disabled ? "cursor-not-allowed" : ""}`}
    >
      <input
        type="radio"
        checked={selected}
        onChange={onChange}
        disabled={disabled}
        className="hidden"
      />
      <div className={radioClasses}></div>
      {label && <span className={labelClasses}>{label}</span>}
    </label>
  );
};
