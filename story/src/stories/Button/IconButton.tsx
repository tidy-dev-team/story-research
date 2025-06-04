import React, { ReactElement } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { pzIconSizes } from "../../ui-kit/foundations/spacings";

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
    "focus-visible:ring-pz-system-border-focused",
    "font-['Heebo',_sans-serif]",
    "ring-offset-2",
    "ring-offset-pz-system-bg-3",
  ],
  {
    variants: {
      type: {
        [ButtonType.Primary]: [
          "bg-pz-system-bg-primary",
          "text-pz-system-fg-1",
          "hover:enabled:bg-[linear-gradient(0deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.12)_100%),var(--pz-system-bg-primary)]",
          "active:enabled:bg-[linear-gradient(0deg,rgba(0,0,0,0.38)_0%,rgba(0,0,0,0.38)_100%),var(--pz-system-bg-primary)]",
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
        [ButtonSize.XSmall]: ["w-5", "h-5", "p-0.5"].join(" "),
        [ButtonSize.Small]: ["w-6", "h-6", "p-1"].join(" "),
        [ButtonSize.Medium]: ["w-8", "h-8", "p-1.5"].join(" "),
        [ButtonSize.Large]: ["w-10", "h-10", "p-2"].join(" "),
      },
      focused: {
        true: "ring-2 ring-pz-system-border-focused",
        false: "",
      },
    },
    defaultVariants: {
      type: ButtonType.Primary,
      size: ButtonSize.Medium,
      focused: false,
    },
  }
);

type BaseButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "type"
>;

interface IconButtonProps
  extends BaseButtonProps,
    VariantProps<typeof buttonStyles> {
  // Support both ReactElement and component reference
  icon: ReactElement | React.ComponentType<any>;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({
  type,
  size,
  focused,
  icon,
  className,
  onClick,
  ...rest
}: IconButtonProps): ReactElement => {
  // Get the appropriate icon size based on button size
  const getIconSize = (buttonSize: ButtonSize) => {
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

  // Handle both React element and component reference cases
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
      className={twMerge(buttonStyles({ type, size, focused }), className)}
      type="button"
      onClick={onClick}
      {...rest}
    >
      <span className="flex items-center justify-center">{iconElement}</span>
    </button>
  );
};
