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

//Note for code review. We use "type" in component in figma, maybe we can use "variant" or something else instead of "type" in the code to avoid confusion with HTML button type attribute.
interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">,
    Omit<VariantProps<typeof buttonStyles>, "type"> {
  icon: React.ReactElement<any>;
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  type?: VariantProps<typeof buttonStyles>["type"];
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
