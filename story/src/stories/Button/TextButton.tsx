import React, { type ReactElement, cloneElement } from "react";
import { SvgIconProps } from "@mui/material/SvgIcon";
import { cva } from "class-variance-authority";
import { TextDirection } from "../textDirection";
import { IconFontSize } from "../iconFontSize";

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

interface TextButtonProps {
  label: string;
  leadingIcon?: MUIIcon;
  trailingIcon?: MUIIcon;
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  isDisabled?: boolean;
  textDirection?: TextDirection;
  onClick?: () => void;
}

const withIconSize = (icon: MUIIcon) => {
  return cloneElement(icon, {
    fontSize: IconFontSize.Small,
  });
};

export const TextButton = ({
  label,
  leadingIcon,
  trailingIcon,
  htmlType = "button",
  isDisabled = false,
  textDirection = TextDirection.Ltr,
  onClick,
}: TextButtonProps): ReactElement => {
  const handleClick = () => {
    if (!isDisabled) onClick?.();
  };

  return (
    <button
      className={buttonStyles()}
      type={htmlType}
      disabled={isDisabled}
      dir={textDirection}
      onClick={handleClick}
    >
      {leadingIcon && (
        <span className="flex items-center leading-none">
          {withIconSize(leadingIcon)}
        </span>
      )}
      <span className="leading-none translate-y-px">{label}</span>
      {trailingIcon && (
        <span className="flex items-center leading-none">
          {withIconSize(trailingIcon)}
        </span>
      )}
    </button>
  );
};
