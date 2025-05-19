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
    "leading-[1.46875em]", // Matches Figma text style
    "p-2", // Add some padding for better clickability
    "text-[#0093EE]", // Blue text color per Figma
    "hover:enabled:text-[#2CB3FF]", // Hover state only when enabled
    "active:enabled:text-[#0093EE]", // Pressed state only when enabled
    "disabled:text-white/38", // Disabled state from Figma
  ],
  {
    variants: {
      // TextButton doesn't have different visual sizes in the Figma design
      rtl: {
        true: "flex-row-reverse",
        false: "",
      },
      focused: {
        true: "ring-2 ring-[#0093EE]/70", // Focus ring per Figma
        false: "",
      },
    },
    defaultVariants: {
      rtl: false,
      focused: false,
    },
  }
);

type BaseButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "type"
>;

interface ButtonProps
  extends BaseButtonProps,
    VariantProps<typeof buttonStyles> {
  label: string;
  leadingIcon?: ReactElement;
  trailingIcon?: ReactElement;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const TextButton = ({
  rtl,
  focused,
  label,
  leadingIcon,
  trailingIcon,
  className,
  onClick,
  ...rest
}: ButtonProps): ReactElement => {
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
      className={twMerge(buttonStyles({ rtl, focused }), className)}
      type="button"
      onClick={onClick}
      {...rest}
    >
      {content}
    </button>
  );
};
