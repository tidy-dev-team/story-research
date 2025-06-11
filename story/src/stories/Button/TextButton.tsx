import React, { ReactElement } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const buttonStyles = cva(
  [
    "rounded-pz-2xs",
    "inline-flex",
    "justify-center",
    "items-center",
    "gap-2",
    "overflow-hidden",
    "bg-transparent",
    "focus:outline-none",
    "focus-visible:ring-2",
    "ring-offset-1",
    "ring-offset-pz-gray-1000",
    "focus-visible:ring-pz-system-border-focused-1",
    "pz-body-m400",
    "cursor-pointer",
    "p-1",
    "text-pz-system-fg-primary",
    "hover:text-pz-system-fg-hover",
    "active:text-pz-system-fg-pressed",
    "disabled:text-pz-system-fg-disabled",
    "disabled:cursor-not-allowed",
    "disabled:pointer-events-none",
  ],
  {
    variants: {
      rtl: {
        true: "flex-row-reverse",
        false: "",
      },
    },
    defaultVariants: {
      rtl: false,
    },
  }
);

interface TextButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  label: string;
  leadingIcon?: ReactElement;
  trailingIcon?: ReactElement;
}

export const TextButton = ({
  rtl,
  disabled,
  label,
  leadingIcon,
  trailingIcon,
  className,
  ...rest
}: TextButtonProps) => {
  return (
    <button
      className={twMerge(buttonStyles({ rtl }), className)}
      type="button"
      disabled={disabled}
      {...rest}
    >
      {leadingIcon && (
        <span className="flex items-center justify-center h-4 w-4 [&>*]:w-4 [&>*]:h-4 [&>*]:text-[16px] [&>*]:leading-none">
          {leadingIcon}
        </span>
      )}
      <span className="translate-y-px">{label}</span>
      {trailingIcon && (
        <span className="flex items-center justify-center h-4 w-4 [&>*]:w-4 [&>*]:h-4 [&>*]:text-[16px] [&>*]:leading-none">
          {trailingIcon}
        </span>
      )}
    </button>
  );
};
