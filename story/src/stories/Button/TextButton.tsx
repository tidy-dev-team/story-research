import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const buttonStyles = cva(
  [
    "rounded-pz-2xs",
    "inline-flex",
    "justify-center",
    "items-center",
    "gap-2",
    "overflow-hidden",
    "bg-transparent",
    "focus:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-pz-system-border-focused-1",
    "focus-visible:ring-offset-0",
    "pz-body-m400",
    "cursor-pointer",
    "p-1",
    "text-pz-system-fg-primary",
    "hover:enabled:text-pz-system-fg-hover",
    "active:enabled:text-pz-system-fg-pressed",
    "disabled:text-pz-system-fg-disabled",
    "disabled:cursor-not-allowed",
    "disabled:pointer-events-none",
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

interface TextButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  label: string;
  leadingIcon?: React.ReactElement<any>;
  trailingIcon?: React.ReactElement<any>;
}

export const TextButton = ({
  rtl,
  disabled,
  label,
  leadingIcon,
  trailingIcon,
  className,
  ...rest
}: TextButtonProps) => {
  const iconSize = 16;

  const cloneIconWithSize = (icon: React.ReactElement<any> | undefined) =>
    icon
      ? React.cloneElement(icon, {
          style: {
            fontSize: iconSize,
            width: iconSize,
            height: iconSize,
            ...(icon.props?.style || {}),
          },
        })
      : null;

  const sizedLeadingIcon = cloneIconWithSize(leadingIcon);
  const sizedTrailingIcon = cloneIconWithSize(trailingIcon);

  return (
    <button
      className={twMerge(buttonStyles({ rtl }), className)}
      type="button"
      disabled={disabled}
      {...rest}
    >
      {sizedLeadingIcon && (
        <span className="flex items-center leading-none">
          {sizedLeadingIcon}
        </span>
      )}
      <span className="translate-y-px">{label}</span>
      {sizedTrailingIcon && (
        <span className="flex items-center leading-none">
          {sizedTrailingIcon}
        </span>
      )}
    </button>
  );
};
