import React, { ReactNode, ReactElement } from "react";
import { cva } from "class-variance-authority";
import { TextDirection } from "../textDirection";

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
  children: ReactNode;
  leadingIcon?: ReactElement;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  textDirection?: TextDirection;
}

export const Tab = ({
  children,
  leadingIcon,
  textDirection = TextDirection.Ltr,
  selected = false,
  disabled = false,
  onClick,
}: TabProps): ReactElement => (
  <button
    type="button"
    role="tab"
    aria-selected={selected}
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
    {leadingIcon && (
      <span className="flex items-center justify-center h-pz-2xs w-pz-2xs scale-[0.6667] text-pz-2xs">
        {leadingIcon}
      </span>
    )}
    <span>{children}</span>
  </button>
);
