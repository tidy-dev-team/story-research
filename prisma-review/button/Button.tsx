import React, { type ReactElement, cloneElement } from "react";
import { SvgIconProps } from "@mui/material/SvgIcon";
import { cva, type VariantProps } from "class-variance-authority";
import { TextDirection } from "../textDirection";
import { IconFontSize } from "../iconFontSize";

export enum ButtonSize {
  Small = "S",
  Medium = "M",
  Large = "L",
}

export enum ButtonType {
  Primary = "primary",
  Secondary = "secondary",
  Ghost = "ghost",
}

export const ICON_FONT_SIZES = {
  [ButtonSize.Small]: IconFontSize.Small,
  [ButtonSize.Medium]: IconFontSize.Medium,
  [ButtonSize.Large]: IconFontSize.Large,
} as const;

const buttonStyles = cva(
  [
    "inline-flex items-center justify-center gap-2",
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
        [ButtonSize.Small]: ["h-6 px-3 py-0.5 pz-label-m"],
        [ButtonSize.Medium]: ["min-h-8 max-h-8 px-4 py-1 pz-label-l"],
        [ButtonSize.Large]: ["h-10 min-h-10 max-h-10 px-5 py-1 pz-label-l"],
      },
    },
    defaultVariants: {
      type: ButtonType.Primary,
      size: ButtonSize.Medium,
    },
  }
);

type MUIIcon = ReactElement<SvgIconProps>;

interface ButtonProps extends VariantProps<typeof buttonStyles> {
  label: string;
  leadingIcon?: MUIIcon;
  trailingIcon?: MUIIcon;
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  size?: ButtonSize;
  isDisabled?: boolean;
  textDirection?: TextDirection;
  onClick?: () => void;
}

const withIconSize = (icon: MUIIcon, size: ButtonSize) => {
  const fontSizeProp = ICON_FONT_SIZES[size];

  return cloneElement(icon, {
    fontSize: fontSizeProp,
  });
};

export const Button = ({
  label,
  leadingIcon,
  trailingIcon,
  htmlType = "button",
  type = ButtonType.Primary,
  size = ButtonSize.Medium,
  isDisabled = false,
  textDirection = TextDirection.Ltr,
  onClick,
}: ButtonProps): ReactElement => {
  const handleClick = () => {
    if (!isDisabled) {
      onClick?.();
    }
  };

  return (
    <button
      className={buttonStyles({ type, size })}
      type={htmlType}
      disabled={isDisabled}
      dir={textDirection}
      onClick={handleClick}
    >
      {leadingIcon && withIconSize(leadingIcon, size ?? ButtonSize.Medium)}
      <span className="leading-none translate-y-px">{label}</span>
      {trailingIcon && withIconSize(trailingIcon, size ?? ButtonSize.Medium)}
    </button>
  );
};
