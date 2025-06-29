import React, { ReactElement, cloneElement } from "react";
import { SvgIconProps } from "@mui/material/SvgIcon";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { TextDirection } from "../textDirection";

const ICON_SIZE = 16;

type MUIIcon = ReactElement<SvgIconProps>;

const buttonStyles = cva([
  "inline-flex",
  "justify-center",
  "items-center",
  "gap-2",
  "overflow-hidden",
  "bg-transparent",
  "focus:outline-none",
  "focus-visible:ring-2",
  "focus-visible:ring-pz-system-border-focused-1",
  "focus-visible:ring-offset-0",
  "pz-body-m400",
  "cursor-pointer",
  "p-1",
  "text-pz-system-fg-primary",
  "hover:enabled:text-pz-system-fg-hover",
  "active:enabled:text-pz-system-fg-pressed",
  "disabled:text-pz-system-fg-disabled",
  "disabled:cursor-not-allowed",
  "disabled:pointer-events-none",
]);

interface TextButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  leadingIcon?: MUIIcon;
  trailingIcon?: MUIIcon;
  textDirection?: TextDirection;
}

const withIconSize = (icon: MUIIcon) => {
  return cloneElement(icon, {
    fontSize: "small",
    sx: { ...(icon.props.sx ?? {}), fontSize: ICON_SIZE },
  });
};

export const TextButton = ({
  disabled,
  label,
  leadingIcon,
  trailingIcon,
  className,
  textDirection = TextDirection.Ltr,
  ...rest
}: TextButtonProps) => {
  return (
    <button
      className={twMerge(buttonStyles(), className)}
      type="button"
      disabled={disabled}
      dir={textDirection}
      {...rest}
    >
      {leadingIcon && (
        <span className="flex items-center leading-none">
          {withIconSize(leadingIcon)}
        </span>
      )}
      <span className="translate-y-px">{label}</span>
      {trailingIcon && (
        <span className="flex items-center leading-none">
          {withIconSize(trailingIcon)}
        </span>
      )}
    </button>
  );
};
