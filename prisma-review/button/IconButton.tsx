import React, { ReactElement, cloneElement } from "react";
import { SvgIconProps } from "@mui/material/SvgIcon";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { TextDirection } from "../textDirection";

export enum ButtonSize {
  XSmall = "XS",
  Small = "S",
  Medium = "M",
  Large = "L",
}

export enum ButtonType {
  Primary = "primary",
  Secondary = "secondary",
  Ghost = "ghost",
}

export const ICON_SIZES = {
  [ButtonSize.XSmall]: 12,
  [ButtonSize.Small]: 16,
  [ButtonSize.Medium]: 20,
  [ButtonSize.Large]: 24,
} as const;

const buttonStyles = cva(
  [
    "inline-flex items-center justify-center",
    "rounded-pz-2xs cursor-pointer",
    "disabled:cursor-not-allowed disabled:pointer-events-none",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-pz-system-border-focused-1",
  ],
  {
    variants: {
      type: {
        [ButtonType.Primary]: [
          "bg-pz-system-bg-primary",
          "text-pz-component-button-fg-primary-idle",
          "hover:enabled:bg-[linear-gradient(0deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.12)_100%)]",
          "active:enabled:bg-[linear-gradient(0deg,rgba(0,0,0,0.38)_0%,rgba(0,0,0,0.38)_100%)]",
          "disabled:bg-pz-system-bg-disabled disabled:text-pz-system-fg-disabled",
        ],
        [ButtonType.Secondary]: [
          "border border-pz-system-border-primary",
          "text-pz-system-fg-primary",
          "hover:enabled:bg-pz-component-button-bg-secondary-hover hover:enabled:border-pz-system-border-hover hover:enabled:text-pz-system-fg-hover",
          "active:enabled:bg-pz-component-button-bg-secondary-pressed active:enabled:border-pz-system-border-pressed active:enabled:text-pz-system-fg-pressed",
          "disabled:border-pz-system-border-disabled disabled:text-pz-system-fg-disabled",
        ],
        [ButtonType.Ghost]: [
          "text-pz-component-button-fg-ghost-idle",
          "hover:enabled:bg-pz-component-button-bg-ghost-hover hover:enabled:text-pz-component-button-fg-ghost-hover",
          "active:enabled:bg-pz-component-button-bg-ghost-pressed",
          "disabled:text-pz-system-fg-disabled",
        ],
      },
      size: {
        [ButtonSize.XSmall]: ["w-5 h-5 p-0.5"],
        [ButtonSize.Small]: ["w-6 h-6 p-1"],
        [ButtonSize.Medium]: ["w-8 h-8 p-1.5"],
        [ButtonSize.Large]: ["w-10 h-10 p-2"],
      },
    },
    defaultVariants: { type: ButtonType.Primary, size: ButtonSize.Medium },
  }
);

type MUIIcon = ReactElement<SvgIconProps>;

interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">,
    VariantProps<typeof buttonStyles> {
  icon: MUIIcon;
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  textDirection?: TextDirection;
}

const withIconSize = (icon: MUIIcon, size: ButtonSize) => {
  const px = ICON_SIZES[size];
  const fontSizeProp: SvgIconProps["fontSize"] =
    size === ButtonSize.XSmall
      ? "inherit"
      : size === ButtonSize.Small
        ? "small"
        : size === ButtonSize.Medium
          ? "medium"
          : "large";

  return cloneElement(icon, {
    fontSize: fontSizeProp,
    sx: { ...(icon.props.sx ?? {}), fontSize: px },
  });
};

export const IconButton: React.FC<IconButtonProps> = ({
  type,
  size = ButtonSize.Medium,
  htmlType = "button",
  icon,
  className,
  disabled,
  textDirection = TextDirection.Ltr,
  ...rest
}) => {
  return (
    <button
      className={twMerge(buttonStyles({ type, size }), className)}
      type={htmlType}
      disabled={disabled}
      dir={textDirection}
      {...rest}
    >
      {withIconSize(icon, size ?? ButtonSize.Medium)}
    </button>
  );
};
