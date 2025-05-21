import React, { ReactElement } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

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

const buttonStyles = cva(
  [
    "h-6",
    "min-w-20",
    "max-h-6",
    "min-h-6",
    "px-3",
    "py-0.5",
    "bg-systemColors-bg-primary",
    "rounded",
    "inline-flex",
    "justify-center",
    "items-center",
    "gap-2",
    "cursor-pointer",
    "overflow-hidden",
    "focus:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-[#0E75B5]",
    "ring-offset-2",
    "ring-offset-[#22272b]",
    "font-['Heebo',_sans-serif]",
  ],
  {
    variants: {
      type: {
        [ButtonType.Primary]: [
          "bg-[#0093EE]",
          "text-white",
          "relative",
          "hover:enabled:bg-[linear-gradient(0deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.12)_100%)]",
          "active:enabled:bg-[linear-gradient(0deg,rgba(0,0,0,0.38)_0%,rgba(0,0,0,0.38)_100%)]",
          "disabled:bg-white/12",
          "disabled:text-white/38",
        ].join(" "),
        [ButtonType.Secondary]: [
          "border",
          "border-[#0093EE]",
          "text-[#0093EE]",
          "hover:enabled:bg-[#0093EE]/12",
          "hover:enabled:border-[#2CB3FF]",
          "hover:enabled:text-[#2CB3FF]",
          "active:enabled:bg-[#0093EE]/12",
          "active:enabled:border-[#0093EE]",
          "active:enabled:text-[#0093EE]",
          "disabled:border-white/38",
          "disabled:text-white/38",
        ].join(" "),
        [ButtonType.Ghost]: [
          "text-[#CCD1D5]",
          "hover:enabled:bg-white/12",
          "hover:enabled:text-white",
          "active:enabled:bg-white/8",
          "disabled:text-white/38",
        ].join(" "),
      },
      size: {
        [ButtonSize.Small]: ["px-3", "py-0.5", "h-6", "text-sm"].join(" "),
        [ButtonSize.Medium]: ["max-h-8", " min-h-8", "px-4 py-1"].join(" "),
        [ButtonSize.Large]: [
          "h-10",
          "min-w-20",
          "max-h-10",
          "min-h-10",
          "px-5",
          "py-1",
        ].join(" "),
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

type BaseButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "type"
>;

interface ButtonProps
  extends BaseButtonProps,
  VariantProps<typeof buttonStyles> {
  label: string;
  leadingIcon?: ReactElement;
  trailingIcon?: ReactElement;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({
  type,
  size,
  rtl,
  focused,
  label,
  leadingIcon,
  trailingIcon,
  className,
  onClick,
  ...rest
}: ButtonProps): ReactElement => {
  const content = [
    leadingIcon && (
      <span key="leadingIcon" className="flex items-center">
        {leadingIcon}
      </span>
    ),
    <span key="label" className="text-sm font-normal leading-none">
      {label}
    </span>,
    trailingIcon && (
      <span key="trailingIcon" className="flex items-center">
        {trailingIcon}
      </span>
    ),
  ].filter(Boolean);

  return (
    <button
      className={twMerge(buttonStyles({ type, size, rtl, focused }), className)}
      type="button"
      onClick={onClick}
      {...rest}
    >
      {content}
    </button>
  );
};
