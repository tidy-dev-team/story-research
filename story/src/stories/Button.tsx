import React, { ReactElement, ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export enum ButtonSize {
  Small = "s",
  Medium = "m",
  Large = "l",
}

export enum ButtonType {
  Primary = "primary",
  Secondary = "secondary",
  Ghost = "ghost",
}

export enum ButtonState {
  Idle = "idle",
  Hover = "hover",
  Pressed = "pressed",
  Focused = "focused",
  // Disabled = "disabled"
}

const buttonStyles = cva(
  "flex justify-center items-center gap-2 rounded select-none transition-all",
  {
    variants: {
      type: {
        [ButtonType.Primary]:
          "bg-[#0093EE] text-white hover:bg-[#0093EE]/88 active:bg-[#0093EE]/62 disabled:bg-white/12 disabled:text-white/38",
        [ButtonType.Secondary]:
          "border border-[#0093EE] text-[#0093EE] hover:bg-[#0093EE]/12 hover:border-[#2CB3FF] hover:text-[#2CB3FF] active:bg-[#0093EE]/12 disabled:border-white/38 disabled:text-white/38",
        [ButtonType.Ghost]:
          "text-[#CCD1D5] hover:bg-white/12 hover:text-white active:bg-white/8 disabled:text-white/38",
      },
      size: {
        [ButtonSize.Small]: "px-3 py-0.5 h-6 text-sm",
        [ButtonSize.Medium]: "px-4 py-1 h-8 text-base",
        [ButtonSize.Large]: "px-5 py-1 h-10 text-base",
      },
      rtl: {
        true: "flex-row-reverse",
        false: "",
      },
      focused: {
        true: "ring-2 ring-[#0093EE]/70",
        false: "",
      },
    },
    defaultVariants: {
      type: ButtonType.Primary,
      size: ButtonSize.Medium,
      rtl: false,
      focused: false,
    },
  }
);

interface ButtonProps extends VariantProps<typeof buttonStyles> {
  type?: ButtonType;
  label: string;
  disabled?: boolean;
  className?: string;
}

const Button = ({
  type,
  size,
  rtl,
  focused,
  label = "Label",
  disabled = false,
  className,
  ...props
}: ButtonProps): ReactElement => {
  const displayText = rtl ? "טקסט" : label;
  const classes = twMerge(
    buttonStyles({ type, size, rtl, focused }),
    className
  );

  return (
    <button className={classes} disabled={disabled} {...props}>
      {displayText}
    </button>
  );
};

export default Button;
