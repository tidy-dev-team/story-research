import React, { ReactElement } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const linkButtonStyles = cva(
  [
    "rounded-pz-2xs",
    "inline-flex",
    "items-center",
    "justify-center",
    "gap-1",
    "h-6",
    "px-2",
    "bg-transparent",
    "cursor-pointer",
    "focus:outline-none",
    "focus-visible:ring-2",
    "ring-offset-1",
    "ring-offset-pz-gray-1000",
    "focus-visible:ring-pz-system-border-focused-1",
    "pz-link400",
    "underline",
    "transition-colors",
    "text-pz-system-fg-primary",
    "hover:text-pz-system-fg-hover",
    "active:text-pz-system-fg-pressed",
    "aria-disabled:text-pz-system-fg-disabled",
    "aria-disabled:cursor-not-allowed",
    "aria-disabled:no-underline",
    "aria-disabled:pointer-events-none",
  ],
  {
    variants: {
      rtl: {
        true: "flex-row-reverse",
        false: "",
      },
    },
    defaultVariants: {
      rtl: false,
    },
  }
);

interface LinkButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkButtonStyles> {
  label: string;
  href: string;
  disabled?: boolean;
  trailingIcon?: ReactElement;
}

export const LinkButton = ({
  rtl,
  disabled,
  label,
  href,
  trailingIcon,
  className,
  ...rest
}: LinkButtonProps) => {
  return (
    <a
      className={twMerge(linkButtonStyles({ rtl }), className)}
      href={!disabled ? href : undefined}
      {...(disabled && { "aria-disabled": true })}
      {...rest}
    >
      <span>{label}</span>
      {trailingIcon && (
        <span className="flex items-center h-5 w-5">{trailingIcon}</span>
      )}
    </a>
  );
};
