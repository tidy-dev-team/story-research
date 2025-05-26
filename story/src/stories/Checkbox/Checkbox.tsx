import { cva, type VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";

const checkboxStyles = cva(
  [
    "w-4",
    "h-4",
    "rounded",
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
    "focus-visible:ring-[#0E75B5]",
  ],
  {
    variants: {
      checked: {
        true: [
          "border-[#0093EE]",
          "bg-[#0093EE]",
          "before:content-['✓']",
          "before:absolute",
          "before:text-white",
          "before:text-xs",
          "before:font-bold",
          "before:top-1/2",
          "before:left-1/2",
          "before:transform",
          "before:-translate-x-1/2",
          "before:-translate-y-1/2",
          "before:leading-none",
          "hover:border-[#0081D1]",
          "hover:bg-[#0081D1]",
          "active:border-[#005B94]",
          "active:bg-[#005B94]",
          "active:shadow-inner",
        ].join(" "),
        false: [
          "border-[#A8B0B8]",
          "hover:border-[#0081D1]",
          "active:border-[#005B94]",
        ].join(" "),
      },
      indeterminate: {
        true: [
          "border-[#0093EE]",
          "bg-[#0093EE]",
          "before:content-['−']",
          "before:absolute",
          "before:text-white",
          "before:text-sm",
          "before:font-bold",
          "before:top-1/2",
          "before:left-1/2",
          "before:transform",
          "before:-translate-x-1/2",
          "before:-translate-y-1/2",
          "before:leading-none",
          "hover:border-[#0081D1]",
          "hover:bg-[#0081D1]",
          "active:border-[#005B94]",
          "active:bg-[#005B94]",
        ].join(" "),
        false: "",
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
        true: "ring-2 ring-[#0E75B5] ring-offset-2",
        false: "",
      },
    },
    defaultVariants: {
      checked: false,
      indeterminate: false,
      rtl: false,
      disabled: false,
      focused: false,
    },
    compoundVariants: [
      {
        checked: true,
        disabled: true,
        className: "bg-white/38 before:text-white/60",
      },
      {
        indeterminate: true,
        disabled: true,
        className: "bg-white/38 before:text-white/60",
      },
      {
        disabled: true,
        className:
          "hover:border-white/38 hover:bg-white/38 active:border-white/38 active:bg-white/38 active:shadow-none",
      },
    ],
  }
);

const labelStyles = cva([
  "font-medium",
  "select-none",
  "transition-colors",
  "duration-200",
  "text-white",
]);

interface CheckboxProps
  extends Omit<
      ComponentProps<"input">,
      "type" | "size" | "checked" | "disabled"
    >,
    VariantProps<typeof checkboxStyles> {
  label?: string;
  labelSize?: "sm" | "md" | "lg";
  checked?: boolean;
  disabled?: boolean;
}

export const Checkbox = ({
  checked = false,
  indeterminate = false,
  rtl = false,
  disabled = false,
  focused = false,
  label,
  labelSize = "md",
  className,
  ...props
}: CheckboxProps) => {
  const containerClasses = `flex items-center ${
    rtl ? "flex-row-reverse gap-2" : "gap-2"
  } ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`;

  const labelSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <label className={containerClasses}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        className="sr-only"
        {...props}
      />
      <div
        className={checkboxStyles({
          checked: indeterminate ? false : checked,
          indeterminate,
          rtl,
          disabled,
          focused,
          className,
        })}
      />
      {label && (
        <span
          className={labelStyles({
            className: `${labelSizeClasses[labelSize]} ${
              disabled ? "text-gray-400 cursor-not-allowed" : ""
            }`,
          })}
        >
          {label}
        </span>
      )}
    </label>
  );
};

export type { CheckboxProps };
