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
    "overflow-hidden",
    "focus:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-[#0E75B5]",
  ],
  {
    variants: {
      type: {
        [ButtonType.Primary]: [
          "bg-[#0093EE]",
          "text-white",
          "relative",
          "hover:bg-[#0081D1]",
          "active:bg-[#005B94]",
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
  ...rest
}: ButtonProps): ReactElement => {
  const content = [
    leadingIcon,
    <span key="label" className={["text-sm", "font-normal"].join(" ")}>
      {label}
    </span>,
    trailingIcon,
  ].filter(Boolean);

  return (
    <button
      className={twMerge(buttonStyles({ type, size, rtl, focused }), className)}
      type="button"
      {...rest}
    >
      {content}
    </button>
  );
};
