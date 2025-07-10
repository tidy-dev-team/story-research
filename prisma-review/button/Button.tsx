import React, { type ReactElement } from "react";
import { SvgIconComponent } from "@mui/icons-material";
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
  [ButtonSize.Medium]: IconFontSize.Small,
  [ButtonSize.Large]: IconFontSize.Medium,
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
          "hover:enabled:bg-gradient-to-r hover:from-pz-system-bg-overlay-hover-on-primary hover:to-pz-system-bg-overlay-hover-on-primary",
          "active:enabled:bg-gradient-to-r active:from-pz-system-bg-overlay-pressed-on-primary active:to-pz-system-bg-overlay-pressed-on-primary",
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

const iconWrapperStyles = cva("", {
  variants: {
    size: {
      [ButtonSize.Small]: "text-pz-size-icon-s",
      [ButtonSize.Medium]: "text-pz-size-icon-m",
      [ButtonSize.Large]: "text-pz-size-icon-l",
    },
  },
  defaultVariants: {
    size: ButtonSize.Medium,
  },
});

interface ButtonProps extends VariantProps<typeof buttonStyles> {
  label: string;
  onClick: () => void;
  LeadingIcon?: SvgIconComponent;
  TrailingIcon?: SvgIconComponent;
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  isDisabled?: boolean;
  textDirection?: TextDirection;
}

export const Button = ({
  label,
  onClick,
  LeadingIcon,
  TrailingIcon,
  htmlType = "button",
  type = ButtonType.Primary,
  size = ButtonSize.Medium,
  isDisabled = false,
  textDirection = TextDirection.Ltr,
}: ButtonProps): ReactElement => {
  const handleClick = () => {
    if (!isDisabled) {
      onClick();
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
      {!!LeadingIcon && (
        <div className={iconWrapperStyles({ size })}>
          <LeadingIcon fontSize={IconFontSize.Inherit} />
        </div>
      )}
      <span className="leading-none translate-y-px">{label}</span>
      {!!TrailingIcon && (
        <div className={iconWrapperStyles({ size })}>
          <TrailingIcon fontSize={IconFontSize.Inherit} />
        </div>
      )}
    </button>
  );
};
