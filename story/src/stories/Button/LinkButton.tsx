import React, { ReactElement } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const linkButtonStyles = cva(
  [
    "rounded-pz-2xs",
    "inline-flex",
    "items-center",
    "justify-center",
    "gap-1",
    "h-6",
    "px-2",
    "bg-transparent",
    "cursor-pointer",
    "focus:outline-none",
    "focus-visible:ring-2",
    "ring-offset-1",
    "ring-offset-pz-gray-1000",
    "focus-visible:ring-pz-system-border-focused-1",
    "pz-link400",
    "underline",
    "transition-colors",
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
        true: "text-pz-system-fg-disabled !cursor-not-allowed no-underline",
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

type BaseLinkButtonProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
>;

interface LinkButtonProps
  extends BaseLinkButtonProps,
    VariantProps<typeof linkButtonStyles> {
  label: string;
  href: string;
  trailingIcon?: ReactElement;
}

export const LinkButton = ({
  rtl,
  focused,
  disabled,
  label,
  href,
  trailingIcon,
  className,
  ...rest
}: LinkButtonProps): ReactElement => {
  const iconWrapper = (icon: ReactElement, key: string) => (
    <span key={key} className="flex items-center h-5 w-5">
      {icon}
    </span>
  );

  const content = [
    <span key="label" className="font-normal">
      {label}
    </span>,
    trailingIcon && iconWrapper(trailingIcon, "trailingIcon"),
  ].filter(Boolean);

  return (
    <a
      className={twMerge(
        linkButtonStyles({ rtl, focused, disabled }),
        className
      )}
      href={!disabled ? href : undefined}
      {...(disabled && { "aria-disabled": true })}
      {...rest}
    >
      {content}
    </a>
  );
};
