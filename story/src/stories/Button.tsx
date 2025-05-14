import React, { ReactElement } from "react";
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

const buttonStyles = cva(
  [
    "flex",
    "justify-center",
    "items-center",
    "gap-2",
    "rounded",
    "select-none",
    "transition-all",
  ].join(" "),
  {
    variants: {
      type: {
        [ButtonType.Primary]: [
          "bg-[#0093EE]",
          "text-white",
          "hover:bg-[#0093EE]/88",
          "active:bg-[#0093EE]/62",
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
        [ButtonSize.Medium]: ["px-4", "py-1", "h-8", "text-base"].join(" "),
        [ButtonSize.Large]: ["px-5", "py-1", "h-10", "text-base"].join(" "),
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
    <span key="label">{label}</span>,
    trailingIcon,
  ].filter(Boolean);

  return (
    <button
      className={twMerge(buttonStyles({ type, size, rtl, focused }), className)}
      type="button"
      {...rest}
    >
      {rtl ? content.reverse() : content}
    </button>
  );
};
