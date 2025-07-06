import React, { type ReactElement, cloneElement } from "react";
import { SvgIconProps } from "@mui/material/SvgIcon";
import { cva, type VariantProps } from "class-variance-authority";
import { TextDirection } from "../textDirection";
import { IconFontSize } from "../iconFontSize";

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

export const ICON_FONT_SIZES = {
  [ButtonSize.XSmall]: IconFontSize.Small,
  [ButtonSize.Small]: IconFontSize.Small,
  [ButtonSize.Medium]: IconFontSize.Medium,
  [ButtonSize.Large]: IconFontSize.Large,
} as const;

const buttonStyles = cva(
  [
    "inline-flex items-center justify-center",
    "rounded-pz-2xs",
    "cursor-pointer",
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
        [ButtonSize.XSmall]: "w-5 h-5 p-0.5",
        [ButtonSize.Small]: "w-6 h-6 p-1",
        [ButtonSize.Medium]: "w-8 h-8 p-1.5",
        [ButtonSize.Large]: "w-10 h-10 p-2",
      },
    },
    defaultVariants: {
      type: ButtonType.Primary,
      size: ButtonSize.Medium,
    },
  }
);

type MUIIcon = ReactElement<SvgIconProps>;

interface IconButtonProps extends VariantProps<typeof buttonStyles> {
  icon: MUIIcon;
  size?: ButtonSize;
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  isDisabled?: boolean;
  textDirection?: TextDirection;
  onClick?: () => void;
}

const withIconSize = (icon: MUIIcon, size: ButtonSize) => {
  const fontSizeProp = ICON_FONT_SIZES[size];
  return cloneElement(icon, { fontSize: fontSizeProp });
};

export const IconButton = ({
  icon,
  size = ButtonSize.Medium,
  type = ButtonType.Primary,
  isDisabled = false,
  htmlType = "button",
  textDirection = TextDirection.Ltr,
  onClick,
}: IconButtonProps): ReactElement => {
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
      {withIconSize(icon, size)}
    </button>
  );
};
