import React, { ReactElement, cloneElement } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { TextDirection } from "../textDirection";

// ——— Size & Type enums ———
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

export const ICON_SIZES = {
  [ButtonSize.Small]: 16,
  [ButtonSize.Medium]: 20,
  [ButtonSize.Large]: 24,
} as const;

// ——— CVA Styles ———
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
    defaultVariants: { type: ButtonType.Primary, size: ButtonSize.Medium },
  }
);

// ——— Props ———
interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">,
    VariantProps<typeof buttonStyles> {
  label: string;
  leadingIcon?: ReactElement;
  trailingIcon?: ReactElement;
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  textDirection?: TextDirection;
}

// ——— Icon helper ———
function withIconSize(icon: ReactElement, size: number) {
  return cloneElement(icon, {
    style: {
      ...(icon.props as any).style,
      fontSize: size,
      width: size,
      height: size,
    },
  } as any);
}

// ——— Button Component ———
export const Button: React.FC<ButtonProps> = ({
  type,
  size,
  htmlType = "button",
  label,
  leadingIcon,
  trailingIcon,
  className,
  disabled,
  textDirection = TextDirection.Ltr,
  ...rest
}) => {
  const px = ICON_SIZES[size || ButtonSize.Medium];

  return (
    <button
      className={twMerge(buttonStyles({ type, size }), className)}
      type={htmlType}
      disabled={disabled}
      dir={textDirection}
      {...rest}
    >
      {leadingIcon && withIconSize(leadingIcon, px)}
      <span className="leading-none translate-y-px">{label}</span>
      {trailingIcon && withIconSize(trailingIcon, px)}
    </button>
  );
};
