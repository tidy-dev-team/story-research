import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export const ButtonSize = {
  Small: "S",
  Medium: "M",
  Large: "L",
} as const;

export const ButtonType = {
  Primary: "primary",
  Secondary: "secondary",
  Ghost: "ghost",
} as const;

export type ButtonSizeType = (typeof ButtonSize)[keyof typeof ButtonSize];
export type ButtonTypeType = (typeof ButtonType)[keyof typeof ButtonType];

const buttonStyles = cva(
  [
    "h-6",
    "min-w-20",
    "max-h-6",
    "min-h-6",
    "px-3",
    "py-0.5",
    "rounded-pz-2xs",
    "inline-flex",
    "justify-center",
    "items-center",
    "gap-2",
    "cursor-pointer",
    "overflow-hidden",
    "disabled:cursor-not-allowed",
    "disabled:pointer-events-none",
    "focus:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-pz-system-border-focused-1",
    "focus-visible:ring-offset-0",
  ],
  {
    variants: {
      type: {
        [ButtonType.Primary]: [
          "bg-pz-system-bg-primary",
          "text-pz-system-fg-1",
          "hover:enabled:bg-[linear-gradient(0deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.12)_100%)]",
          "active:enabled:bg-[linear-gradient(0deg,rgba(0,0,0,0.38)_0%,rgba(0,0,0,0.38)_100%)]",
          "disabled:bg-pz-system-bg-disabled",
          "disabled:text-pz-system-fg-disabled",
        ].join(" "),
        [ButtonType.Secondary]: [
          "border",
          "border-pz-system-border-primary",
          "text-pz-system-fg-primary",
          "hover:enabled:bg-pz-system-fg-primary/12",
          "hover:enabled:border-pz-system-border-hover",
          "hover:enabled:text-pz-system-fg-hover",
          "active:enabled:bg-pz-system-fg-primary/12",
          "active:enabled:border-pz-system-border-pressed",
          "active:enabled:text-pz-system-fg-pressed",
          "disabled:border-pz-system-border-disabled",
          "disabled:text-pz-system-fg-disabled",
        ].join(" "),
        [ButtonType.Ghost]: [
          "text-pz-system-fg-2",
          "hover:enabled:bg-pz-system-fg-1/12",
          "hover:enabled:text-pz-system-fg-1",
          "active:enabled:bg-pz-system-fg-1/8",
          "disabled:text-pz-system-fg-disabled",
        ].join(" "),
      },
      size: {
        [ButtonSize.Small]: ["px-3", "py-0.5", "h-6", "pz-label-m"].join(" "),
        [ButtonSize.Medium]: [
          "max-h-8",
          "min-h-8",
          "px-4 py-1",
          "pz-label-l",
        ].join(" "),
        [ButtonSize.Large]: [
          "h-10",
          "min-w-20",
          "max-h-10",
          "min-h-10",
          "px-5",
          "py-1",
          "pz-label-l",
        ].join(" "),
      },
      rtl: {
        true: "flex-row-reverse",
        false: "",
      },
    },
    defaultVariants: {
      type: ButtonType.Primary,
      size: ButtonSize.Medium,
      rtl: false,
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
  leadingIcon?: React.ReactElement;
  trailingIcon?: React.ReactElement;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({
  type,
  size,
  rtl,
  label,
  leadingIcon,
  trailingIcon,
  className,
  onClick,
  disabled,
  ...rest
}: ButtonProps) => {
  // Get the icon size based on button size
  const iconSize = {
    [ButtonSize.Small]: 16,
    [ButtonSize.Medium]: 20,
    [ButtonSize.Large]: 24,
  }[size || ButtonSize.Medium];

  // Clone icons with proper sizing
  const cloneIconWithSize = (icon: React.ReactElement | undefined) =>
    icon
      ? React.cloneElement(icon as React.ReactElement<any>, {
          style: {
            fontSize: iconSize,
            width: iconSize,
            height: iconSize,
            ...((icon as any)?.props?.style || {}),
          },
        })
      : null;

  const sizedLeadingIcon = cloneIconWithSize(leadingIcon);
  const sizedTrailingIcon = cloneIconWithSize(trailingIcon);

  return (
    <button
      className={twMerge(buttonStyles({ type, size, rtl }), className)}
      type="button"
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {sizedLeadingIcon && (
        <span key="leadingIcon" className="flex items-center leading-none">
          {sizedLeadingIcon}
        </span>
      )}
      <span
        key="label"
        className="text-sm font-normal leading-none translate-y-px"
      >
        {label}
      </span>
      {sizedTrailingIcon && (
        <span key="trailingIcon" className="flex items-center leading-none">
          {sizedTrailingIcon}
        </span>
      )}
    </button>
  );
};
