import { cva, type VariantProps } from "class-variance-authority";
import { ComponentProps, useState } from "react";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";

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
        true: "text-white/38 cursor-not-allowed hover:text-white/38 active:text-white/38",
        false: "",
      },
      focused: {
        true: "ring-3 ring-offset-1 rounded-xs ring-[#0E75B5]",
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
}

export const Checkbox = ({
  checked = false,
  indeterminate = false,
  rtl = false,
  disabled = false,
  focused = false,
  label,
  className,
  onChange,
  ...props
}: CheckboxProps) => {
  const [internalFocused, setInternalFocused] = useState(false);
  const showFocusRing = focused || internalFocused;

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

  return (
    <label className={containerClasses}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        className="sr-only focus:outline-none"
        tabIndex={disabled ? -1 : 0}
        onFocus={() => setInternalFocused(true)}
        onBlur={() => setInternalFocused(false)}
        onKeyDown={(e) => {
          if (e.key === "Space" || e.key === "Enter") {
            e.preventDefault();
            if (!disabled && onChange) {
              onChange(e as any);
            }
          }
        }}
        onChange={onChange}
        {...props}
      />
      {renderIcon()}
      {label && (
        <span
          className={labelStyles({
            className: disabled ? "text-gray-400 cursor-not-allowed" : "",
          })}
        >
          {label}
        </span>
      )}
    </label>
  );
};

export type { CheckboxProps };
