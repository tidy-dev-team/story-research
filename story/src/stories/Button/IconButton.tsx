import React, { ReactElement } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { pzIconSizes } from "../../ui-kit/foundations/spacings";

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

type ButtonSizeType = (typeof ButtonSize)[keyof typeof ButtonSize];
type ButtonTypeType = (typeof ButtonType)[keyof typeof ButtonType];

const buttonStyles = cva(
  [
    "rounded-[4px]",
    "inline-flex",
    "justify-center",
    "items-center",
    "overflow-hidden",
    "cursor-pointer",
    "focus:outline-none",
    "focus-visible:ring-2",
    "ring-offset-1",
    "ring-offset-pz-gray-1000",
    "focus-visible:ring-pz-system-border-focused-1",
    "disabled:cursor-not-allowed",
    "disabled:pointer-events-none",
  ],
  {
    variants: {
      type: {
        [ButtonType.Primary]: [
          "bg-pz-system-bg-primary",
          "text-pz-system-fg-1",
          "hover:bg-[linear-gradient(0deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.12)_100%)]",
          "active:bg-[linear-gradient(0deg,rgba(0,0,0,0.38)_0%,rgba(0,0,0,0.38)_100%)]",
          "disabled:bg-pz-system-bg-disabled",
          "disabled:text-pz-system-fg-disabled",
        ].join(" "),
        [ButtonType.Secondary]: [
          "border",
          "border-pz-system-border-primary",
          "text-pz-system-fg-primary",
          "hover:bg-pz-system-fg-primary/12",
          "hover:border-pz-system-border-hover",
          "hover:text-pz-system-fg-hover",
          "active:bg-pz-system-fg-primary/12",
          "active:border-pz-system-border-pressed",
          "active:text-pz-system-fg-pressed",
          "disabled:border-pz-system-border-disabled",
          "disabled:text-pz-system-fg-disabled",
        ].join(" "),
        [ButtonType.Ghost]: [
          "text-pz-system-fg-2",
          "hover:bg-pz-system-fg-1/12",
          "hover:text-pz-system-fg-1",
          "active:bg-pz-system-fg-1/8",
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
  icon: ReactElement | React.ComponentType<any>;
}

export const IconButton = ({
  type,
  size,
  icon,
  className,
  disabled,
  ...rest
}: IconButtonProps) => {
  const getIconSize = (buttonSize: ButtonSizeType) => {
    switch (buttonSize) {
      case ButtonSize.XSmall:
        return pzIconSizes.s;
      case ButtonSize.Small:
        return pzIconSizes.m;
      case ButtonSize.Medium:
        return pzIconSizes.l;
      case ButtonSize.Large:
        return pzIconSizes.xl;
      default:
        return pzIconSizes.l;
    }
  };

  const iconSize = getIconSize(size || ButtonSize.Medium);

  const iconElement = React.isValidElement(icon)
    ? React.cloneElement(icon as React.ReactElement<any>, {
        sx: {
          width: iconSize,
          height: iconSize,
          fontSize: iconSize,
        },
      })
    : React.createElement(icon as React.ComponentType<any>, {
        sx: {
          width: iconSize,
          height: iconSize,
          fontSize: iconSize,
        },
      });

  return (
    <button
      className={twMerge(buttonStyles({ type, size }), className)}
      type="button"
      disabled={disabled}
      {...rest}
    >
      {iconElement}
    </button>
  );
};
