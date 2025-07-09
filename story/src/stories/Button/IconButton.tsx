import React, { type ReactElement } from "react";
import { SvgIconComponent } from "@mui/icons-material";
import { cva, type VariantProps } from "class-variance-authority";
import { TextDirection } from "../textDirection";
import { IconFontSize } from "../iconFontSize";

export enum IconButtonSize {
  XSmall = "XS",
  Small = "S",
  Medium = "M",
  Large = "L",
}

export enum IconButtonType {
  Primary = "primary",
  Secondary = "secondary",
  Ghost = "ghost",
}

export const ICON_FONT_SIZES = {
  [IconButtonSize.XSmall]: IconFontSize.Small,
  [IconButtonSize.Small]: IconFontSize.Small,
  [IconButtonSize.Medium]: IconFontSize.Small,
  [IconButtonSize.Large]: IconFontSize.Medium,
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
        [IconButtonType.Primary]: [
          "bg-pz-system-bg-primary",
          "text-pz-component-button-fg-primary-idle",
          "hover:enabled:bg-gradient-to-r hover:from-pz-system-bg-overlay-hover-on-primary hover:to-pz-system-bg-overlay-hover-on-primary",
          "active:enabled:bg-gradient-to-r active:from-pz-system-bg-overlay-pressed-on-primary active:to-pz-system-bg-overlay-pressed-on-primary",
          "disabled:bg-pz-system-bg-disabled disabled:text-pz-system-fg-disabled",
        ],
        [IconButtonType.Secondary]: [
          "border border-pz-system-border-primary",
          "text-pz-system-fg-primary",
          "hover:enabled:bg-pz-component-button-bg-secondary-hover hover:enabled:border-pz-system-border-hover hover:enabled:text-pz-system-fg-hover",
          "active:enabled:bg-pz-component-button-bg-secondary-pressed active:enabled:border-pz-system-border-pressed active:enabled:text-pz-system-fg-pressed",
          "disabled:border-pz-system-border-disabled disabled:text-pz-system-fg-disabled",
        ],
        [IconButtonType.Ghost]: [
          "text-pz-component-button-fg-ghost-idle",
          "hover:enabled:bg-pz-component-button-bg-ghost-hover hover:enabled:text-pz-component-button-fg-ghost-hover",
          "active:enabled:bg-pz-component-button-bg-ghost-pressed",
          "disabled:text-pz-system-fg-disabled",
        ],
      },
      size: {
        [IconButtonSize.XSmall]: "w-5 h-5 p-0.5",
        [IconButtonSize.Small]: "w-6 h-6 p-1",
        [IconButtonSize.Medium]: "w-8 h-8 p-1.5",
        [IconButtonSize.Large]: "w-10 h-10 p-2",
      },
    },
    defaultVariants: {
      type: IconButtonType.Primary,
      size: IconButtonSize.Medium,
    },
  }
);

interface IconButtonProps extends VariantProps<typeof buttonStyles> {
  Icon: SvgIconComponent;
  onClick: () => void;
  size?: IconButtonSize;
  isDisabled?: boolean;
  textDirection?: TextDirection;
}

export const IconButton = ({
  Icon,
  onClick,
  size = IconButtonSize.Medium,
  isDisabled = false,
  textDirection = TextDirection.Ltr,
  type = IconButtonType.Primary,
}: IconButtonProps): ReactElement => {
  const handleClick = () => {
    if (!isDisabled) {
      onClick();
    }
  };

  return (
    <button
      className={buttonStyles({ type, size })}
      type="button"
      disabled={isDisabled}
      dir={textDirection}
      onClick={handleClick}
    >
      <Icon
        fontSize={ICON_FONT_SIZES[size]}
        sx={
          size === IconButtonSize.XSmall
            ? { fontSize: 12 }
            : size === IconButtonSize.Small
              ? { fontSize: 16 }
              : undefined
        }
      />
    </button>
  );
};
