import React, { type ReactElement } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { cva } from "class-variance-authority";
import { TextDirection } from "../textDirection";
import { IconFontSize } from "../iconFontSize";
import { SvgIconComponent } from "@mui/icons-material";

const linkButtonStyles = cva([
  "inline-flex items-center justify-center gap-1 h-6 px-2",
  "bg-transparent cursor-pointer",
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-pz-system-border-focused-1 focus-visible:ring-offset-0",
  "pz-link400 transition-colors",
  "text-pz-system-fg-primary hover:text-pz-system-fg-hover active:text-pz-system-fg-pressed",
  "[&[aria-disabled=true]]:text-pz-system-fg-disabled",
  "[&[aria-disabled=true]]:cursor-not-allowed",
  "[&[aria-disabled=true]]:pointer-events-none",
  "underline [&[aria-disabled=true]]:no-underline",
]);

interface LinkButtonProps {
  label: string;
  href: string;
  onClick: () => void;
  isDisabled?: boolean;
  trailingIcon?: SvgIconComponent;
  textDirection?: TextDirection;
}

export const LinkButton = ({
  label,
  href,
  onClick,
  isDisabled = false,
  trailingIcon,
  textDirection = TextDirection.Ltr,
}: LinkButtonProps): ReactElement => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (isDisabled) {
      event.preventDefault();
    } else {
      onClick();
    }
  };

  return (
    <a
      className={linkButtonStyles()}
      href={isDisabled ? undefined : href}
      aria-disabled={isDisabled}
      dir={textDirection}
      onClick={handleClick}
      tabIndex={isDisabled ? -1 : 0}
    >
      {label}
      {trailingIcon && (
        <span className="flex items-center leading-none">
          {textDirection === TextDirection.Rtl ? (
            <ArrowBackIcon fontSize={IconFontSize.Small} />
          ) : (
            <ArrowForwardIcon fontSize={IconFontSize.Small} />
          )}
        </span>
      )}
    </a>
  );
};
