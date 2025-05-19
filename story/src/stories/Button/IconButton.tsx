import React, { ReactElement } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

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
    "focus:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-[#0E75B5]",
    "font-['Heebo',_sans-serif]",
  ],
  {
    variants: {
      type: {
        [ButtonType.Primary]: [
          "bg-[#0093EE]",
          "text-white",
          "hover:bg-[linear-gradient(0deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.12)_100%)]",
          "active:bg-[linear-gradient(0deg,rgba(0,0,0,0.38)_0%,rgba(0,0,0,0.38)_100%)]",
          "disabled:bg-white/12",
          "disabled:text-white/38",
        ].join(" "),
        [ButtonType.Secondary]: [
          "border",
          "border-[#0093EE]",
          "text-[#0093EE]",
          "hover:bg-[#0093EE]/12",
          "hover:border-[#2CB3FF]",
          "hover:text-[#2CB3FF]",
          "active:bg-[#0093EE]/12",
          "active:border-[#0093EE]",
          "active:text-[#0093EE]",
          "disabled:border-white/38",
          "disabled:text-white/38",
        ].join(" "),
        [ButtonType.Ghost]: [
          "text-[#CCD1D5]",
          "hover:bg-white/12",
          "hover:text-white",
          "active:bg-white/8",
          "disabled:text-white/38",
        ].join(" "),
      },
      size: {
        [ButtonSize.XSmall]: ["w-5", "h-5", "p-0.5", "text-xs"].join(" "),
        [ButtonSize.Small]: ["w-6", "h-6", "p-1", "text-sm"].join(" "),
        [ButtonSize.Medium]: ["w-8", "h-8", "p-1.5"].join(" "),
        [ButtonSize.Large]: ["w-10", "h-10", "p-2"].join(" "),
      },
      focused: {
        true: "ring-2 ring-[#0093EE]/70",
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
  icon: ReactElement;
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
  return (
    <button
      className={twMerge(buttonStyles({ type, size, focused }), className)}
      type="button"
      onClick={onClick}
      {...rest}
    >
      {icon}
    </button>
  );
};
