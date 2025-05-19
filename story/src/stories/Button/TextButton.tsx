import React, { ReactElement } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export enum ButtonSize {
  Small = "S",
  Medium = "M",
  Large = "L",
}

// TextButton only has one type - text with blue color
export enum ButtonType {
  Primary = "primary",
}

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
  ],
  {
    variants: {
      type: {
        [ButtonType.Primary]: [
          "text-[#0093EE]", // Blue text color per Figma
          "hover:text-[#2CB3FF]", // Hover state from Figma
          "active:text-[#0093EE]", // Pressed state from Figma
          "disabled:text-white/38", // Disabled state from Figma
        ].join(" "),
      },
      size: {
        // TextButton doesn't have different visual sizes in the Figma design,
        // but we'll keep the API consistent with other button types
        [ButtonSize.Small]: ["text-sm"].join(" "),
        [ButtonSize.Medium]: ["text-sm"].join(" "),
        [ButtonSize.Large]: ["text-sm"].join(" "),
      },
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
      type: ButtonType.Primary,
      size: ButtonSize.Medium,
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
  type,
  size,
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
      className={twMerge(buttonStyles({ type, size, rtl, focused }), className)}
      type="button"
      onClick={onClick}
      {...rest}
    >
      {content}
    </button>
  );
};
