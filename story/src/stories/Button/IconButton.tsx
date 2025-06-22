import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export const ButtonSize = {
  XSmall: "XS",
  Small: "S",
  Medium: "M",
  Large: "L",
} as const;

export const ButtonType = {
  Primary: "primary",
  Secondary: "secondary",
  Ghost: "ghost",
} as const;

const buttonStyles = cva(
  [
    "rounded-pz-2xs",
    "inline-flex",
    "justify-center",
    "items-center",
    "overflow-hidden",
    "cursor-pointer",
    "focus:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-pz-system-border-focused-1",
    "focus-visible:ring-offset-0",
    "disabled:cursor-not-allowed",
    "disabled:pointer-events-none",
  ],
  {
    variants: {
      type: {
        [ButtonType.Primary]: [
          "bg-pz-system-bg-primary",
          "text-pz-components-button-fg-primary-idle",
          "hover:enabled:bg-[linear-gradient(0deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.12)_100%)]",
          "active:enabled:bg-[linear-gradient(0deg,rgba(0,0,0,0.38)_0%,rgba(0,0,0,0.38)_100%)]",
          "disabled:bg-pz-system-bg-disabled",
          "disabled:text-pz-system-fg-disabled",
        ].join(" "),
        [ButtonType.Secondary]: [
          "border",
          "border-pz-system-border-primary",
          "text-pz-system-fg-primary",
          "hover:enabled:bg-pz-components-button-bg-secondary-hover",
          "hover:enabled:border-pz-system-border-hover",
          "hover:enabled:text-pz-system-fg-hover",
          "active:enabled:bg-pz-components-button-bg-secondary-pressed",
          "active:enabled:border-pz-system-border-pressed",
          "active:enabled:text-pz-system-fg-pressed",
          "disabled:border-pz-system-border-disabled",
          "disabled:text-pz-system-fg-disabled",
        ].join(" "),
        [ButtonType.Ghost]: [
          "text-pz-components-button-fg-ghost-idle",
          "hover:enabled:bg-pz-components-button-bg-ghost-hover",
          "hover:enabled:text-pz-components-button-fg-ghost-hover",
          "active:enabled:bg-pz-components-button-bg-ghost-pressed",
          "disabled:text-pz-system-fg-disabled",
        ].join(" "),
      },
      size: {
        [ButtonSize.XSmall]: ["w-5", "h-5", "p-0.5"].join(" "),
        [ButtonSize.Small]: ["w-6", "h-6", "p-1"].join(" "),
        [ButtonSize.Medium]: ["w-8", "h-8", "p-1.5"].join(" "),
        [ButtonSize.Large]: ["w-10", "h-10", "p-2"].join(" "),
      },
    },
    defaultVariants: {
      type: ButtonType.Primary,
      size: ButtonSize.Medium,
    },
  }
);

interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">,
    VariantProps<typeof buttonStyles> {
  icon: React.ReactElement<any>;
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

export const IconButton = ({
  type = ButtonType.Primary,
  htmlType = "button",
  size,
  icon,
  className,
  disabled,
  ...rest
}: IconButtonProps) => {
  const iconSize = {
    [ButtonSize.XSmall]: 12,
    [ButtonSize.Small]: 16,
    [ButtonSize.Medium]: 20,
    [ButtonSize.Large]: 24,
  }[size || ButtonSize.Medium];

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

  const iconElement = cloneIconWithSize(icon);

  return (
    <button
      className={twMerge(
        buttonStyles({ type, size }),
        "leading-none",
        className
      )}
      type={htmlType}
      disabled={disabled}
      {...rest}
    >
      {iconElement}
    </button>
  );
};
