import React, { ReactElement } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const linkButtonStyles = cva(
  [
    "rounded-[4px]",
    "inline-flex",
    "items-center",
    "justify-center",
    "gap-1", // 4px gap from Figma
    "h-6", // 24px height from Figma
    "px-2", // Horizontal padding
    "bg-transparent",
    "focus:outline-none",
    "font-['Heebo',_sans-serif]",
    "text-sm", // 14px font size from Figma
    "font-normal", // 400 weight from Figma
    "underline", // Ensure text is underlined
    "transition-colors", // Smooth transition for color changes
    "text-[#0093EE]", // Idle color from Figma
    "hover:not([aria-disabled=true]):text-[#2CB3FF]", // Hover color from Figma
    "active:not([aria-disabled=true]):text-[#0093EE]", // Pressed color from Figma
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
        true: "ring-2 ring-[#0093EE]/70", // Focus ring from Figma
        false: "",
      },
      disabled: {
        true: "text-white/38 !cursor-not-allowed no-underline", // Disabled style, remove underline
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

type BaseLinkButtonProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" // Handled by our props
>;

interface LinkButtonProps
  extends BaseLinkButtonProps,
  VariantProps<typeof linkButtonStyles> {
  label: string;
  href: string;
  leadingIcon?: ReactElement;
  trailingIcon?: ReactElement;
}

export const LinkButton = ({
  rtl,
  focused,
  disabled,
  label,
  href,
  leadingIcon,
  trailingIcon,
  className,
  // onClick is removed from destructuring
  ...rest
}: LinkButtonProps): ReactElement => {
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

  // handleClick function is removed

  return (
    <a
      className={twMerge(
        linkButtonStyles({ rtl, focused, disabled }),
        className
      )}
      href={!disabled ? href : undefined} // Prevent navigation for disabled links
      // onClick attribute is removed
      aria-disabled={disabled || false} // Accessibility for disabled links
      {...rest}
    >
      {content}
    </a>
  );
};
