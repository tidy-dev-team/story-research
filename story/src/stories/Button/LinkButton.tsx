import React, { ReactElement } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { TextDirection } from "../textDirection";

const linkButtonStyles = cva([
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
  "focus-visible:ring-pz-system-border-focused-1",
  "focus-visible:ring-offset-0",
  "pz-link400",
  "underline",
  "transition-colors",
  "text-pz-system-fg-primary",
  "hover:text-pz-system-fg-hover",
  "active:text-pz-system-fg-pressed",
  "aria-disabled:text-pz-system-fg-disabled",
  "aria-disabled:cursor-not-allowed",
  "aria-disabled:no-underline",
  "aria-disabled:pointer-events-none",
]);

interface LinkButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string;
  href: string;
  disabled?: boolean;
  trailingIcon?: React.ReactElement<any>;
  textDirection?: TextDirection;
}

export const LinkButton = ({
  disabled,
  label,
  href,
  trailingIcon,
  className,
  textDirection = TextDirection.Ltr,
  ...rest
}: LinkButtonProps) => {
  const iconSize = 20;

  const cloneIconWithSize = (icon: React.ReactElement<any> | undefined) =>
    icon
      ? React.cloneElement(icon, {
          style: {
            fontSize: iconSize,
            width: iconSize,
            height: iconSize,
            ...(icon.props?.style || {}),
          },
        })
      : null;

  const sizedTrailingIcon = cloneIconWithSize(trailingIcon);

  return (
    <a
      className={twMerge(linkButtonStyles(), className)}
      href={!disabled ? href : undefined}
      {...(disabled && { "aria-disabled": true })}
      dir={textDirection}
      {...rest}
    >
      <span>{label}</span>
      {sizedTrailingIcon && (
        <span className="flex items-center leading-none">
          {sizedTrailingIcon}
        </span>
      )}
    </a>
  );
};
