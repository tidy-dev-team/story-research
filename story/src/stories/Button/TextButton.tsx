import React, { ReactElement } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

// TextButton only has one style - text with blue color

const buttonStyles = cva(
  [
    "rounded-[4px]", // Per Figma design
    "inline-flex",
    "justify-center",
    "items-center",
    "gap-2",
    "overflow-hidden",
    "bg-transparent", // Text button has no background
    "focus:outline-none",
    "font-['Heebo',_sans-serif]",
    "text-sm",
    "font-normal",
    "cursor-pointer",
    "leading-[1.46875em]", // Matches Figma text style
    "p-1", // Add some padding for better clickability
    "text-[#0093EE]", // Blue text color per Figma
    "hover:enabled:text-[#2CB3FF]", // Hover state only when enabled
    "active:enabled:text-[#0093EE]", // Pressed state only when enabled
    "focus-visible:ring-2",
    "focus-visible:ring-[#0E75B5]",
    "ring-offset-2",
    "ring-offset-[#22272b]",
  ],
  {
    variants: {
      rtl: {
        true: "flex-row-reverse",
        false: "",
      },
      focused: {
        true: "ring-2 ring-[#0093EE]/70", // Focus ring per Figma
        false: "",
      },
      disabled: {
        true: "text-white/38", // Disabled state from Figma
        false: "",
      },
    },
    defaultVariants: {
      rtl: false,
      focused: false,
      disabled: false,
    },
  }
);

// Remove "type" from Omit, as the native button "type" attribute is still relevant.
type BaseTextButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "disabled" // Handled by our props and cva variant
>;

interface TextButtonProps
  extends BaseTextButtonProps,
  VariantProps<typeof buttonStyles> {
  label: string;
  leadingIcon?: ReactElement;
  trailingIcon?: ReactElement;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  // focused and disabled props are implicitly handled by VariantProps<typeof buttonStyles>
}

export const TextButton = ({
  rtl,
  focused,
  disabled,
  label,
  leadingIcon,
  trailingIcon,
  className,
  onClick,
  ...rest
}: TextButtonProps): ReactElement => {
  // Create icon wrappers with consistent styling
  const iconWrapper = (icon: ReactElement, key: string) => (
    <span key={key} className="flex items-center text-[14px]">
      {icon}
    </span>
  );

  const content = [
    leadingIcon && iconWrapper(leadingIcon, "leadingIcon"),
    <span key="label" className="font-normal">
      {label}
    </span>,
    trailingIcon && iconWrapper(trailingIcon, "trailingIcon"),
  ].filter(Boolean);

  return (
    <button
      className={twMerge(
        buttonStyles({ rtl, focused, disabled: !!disabled }),
        className
      )}
      type="button" // Default to "button" type for accessibility unless overridden by ...rest
      onClick={onClick}
      disabled={!!disabled} // Ensure disabled is a boolean
      {...rest}
    >
      {content}
    </button>
  );
};
