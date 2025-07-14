import React, { ReactElement } from "react";
import { cva } from "class-variance-authority";
import { TextDirection } from "../textDirection";
import { IconFontSize } from "../iconFontSize";
import { SvgIconComponent } from "@mui/icons-material";

const tabStyles = cva([
  "aria-selected:text-pz-system-fg-1",
  "bg-transparent",
  "border-none",
  "cursor-pointer",
  "disabled:cursor-not-allowed",
  "disabled:pointer-events-none",
  "disabled:text-pz-system-fg-disabled",
  "duration-150",
  "flex",
  "focus-visible:ring-2",
  "focus-visible:ring-pz-system-border-focused-1",
  "focus-visible:text-pz-system-fg-3",
  "focus:outline-none",
  "gap-2",
  "hover:enabled:text-pz-system-fg-1",
  "items-center",
  "justify-center",
  "px-2",
  "py-1",
  "pz-label-l",
  "text-pz-system-fg-4",
  "transition-colors",
  "whitespace-nowrap",
]);

export interface TabProps {
  label: string;
  leadingIcon?: SvgIconComponent;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  textDirection?: TextDirection;
}

export const Tab = ({
  label,
  leadingIcon,
  textDirection = TextDirection.Ltr,
  selected = false,
  disabled = false,
  onClick,
}: TabProps): ReactElement => {
  const Icon = leadingIcon;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={disabled ? false : selected}
      disabled={disabled}
      dir={textDirection}
      className={tabStyles()}
      onClick={onClick}
      onKeyDown={(event) => {
        if (!disabled && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          onClick?.();
        }
      }}
    >
      {Icon && (
        <span className="flex items-center justify-center">
          <Icon fontSize={IconFontSize.Inherit} />
        </span>
      )}
      <span>{label}</span>
    </button>
  );
};