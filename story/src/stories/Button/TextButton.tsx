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
    "font-['Heebo',_sans-serif]",
    "pz-body-m400",
    "cursor-pointer",
    "p-1",
    "text-pz-system-fg-primary",
  ],
  {
    variants: {
      rtl: {
        true: "flex-row-reverse",
        false: "",
      },
      focused: {
        true: "ring-2 ring-offset-1 ring-pz-system-border-focused-1 rounded-pz-2xs",
        false: "",
      },
      disabled: {
        true: "text-pz-system-fg-disabled !cursor-not-allowed pointer-events-none",
        false: "hover:text-pz-system-fg-hover active:text-pz-system-fg-pressed",
      },
    },
    defaultVariants: {
      rtl: false,
      focused: false,
      disabled: false,
    },
  }
);

type BaseTextButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "disabled"
>;

interface TextButtonProps
  extends BaseTextButtonProps,
    VariantProps<typeof buttonStyles> {
  label: string;
  leadingIcon?: ReactElement;
  trailingIcon?: ReactElement;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const TextButton = ({
  rtl,
  focused,
  disabled,
  label,
  leadingIcon,
  trailingIcon,
  className,
  onClick,
  ...rest
}: TextButtonProps): ReactElement => {
  const iconWrapper = (icon: ReactElement, key: string) => (
    <span
      key={key}
      className="flex items-center justify-center h-4 w-4 [&>*]:w-4 [&>*]:h-4 [&>*]:text-[16px] [&>*]:leading-none"
    >
      {icon}
    </span>
  );

  const content = [
    leadingIcon && iconWrapper(leadingIcon, "leadingIcon"),
    <span key="label" className="font-normal translate-y-px">
      {label}
    </span>,
    trailingIcon && iconWrapper(trailingIcon, "trailingIcon"),
  ].filter(Boolean);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    onClick?.(event);
  };

  return (
    <button
      className={twMerge(
        buttonStyles({ rtl, focused, disabled: !!disabled }),
        className
      )}
      type="button"
      onClick={handleClick}
      disabled={!!disabled}
      {...rest}
    >
      {content}
    </button>
  );
};
