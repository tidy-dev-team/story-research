import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const tabStyles = cva(
  [
    "flex",
    "items-center",
    "justify-center",
    "gap-1",
    "px-2",
    "py-1",
    "pz-body-l400",
    "cursor-pointer",
    "transition-colors",
    "duration-150",
    "focus:outline-none",
    "border-none",
    "bg-transparent",
    "whitespace-nowrap",
    "text-pz-system-fg-3",
    "hover:enabled:text-pz-system-fg-1",
    "hover:enabled:bg-pz-system-bg-overlay-hover",
    "focus-visible:text-pz-system-fg-3",
    "focus-visible:rounded-pz-2xs",
    "focus-visible:ring-2",
    "focus-visible:ring-pz-system-border-focused-1",
    "disabled:text-pz-system-fg-disabled",
    "disabled:cursor-not-allowed",
    "disabled:pointer-events-none",
    "aria-selected:text-pz-system-fg-1",
  ],
  {
    variants: {
      rtl: {
        true: "text-right",
        false: "text-left",
      },
    },
    defaultVariants: {
      rtl: false,
    },
  }
);

export interface TabProps extends VariantProps<typeof tabStyles> {
  children: React.ReactNode;
  childrenRtl?: React.ReactNode;
  leadingIcon?: React.ReactElement;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  "aria-selected"?: boolean;
  "aria-controls"?: string;
  role?: string;
  tabIndex?: number;
}

export const Tab: React.FC<TabProps> = ({
  children,
  childrenRtl,
  leadingIcon,
  rtl = false,
  disabled = false,
  onClick,
  className = "",
  "aria-selected": ariaSelected,
  "aria-controls": ariaControls,
  role = "tab",
  tabIndex = 0,
  ...rest
}) => {
  const displayContent = rtl && childrenRtl ? childrenRtl : children;

  return (
    <button
      className={twMerge(tabStyles({ rtl }), className)}
      role={role}
      aria-selected={ariaSelected}
      aria-controls={ariaControls}
      tabIndex={disabled ? -1 : tabIndex}
      disabled={disabled}
      onClick={onClick}
      onKeyDown={(event) => {
        if (!disabled && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          onClick?.();
        }
      }}
      type="button"
      {...rest}
    >
      {leadingIcon && (
        <span className="flex items-center justify-center w-4 h-4 text-[12px] [&>*]:w-3 [&>*]:h-3">
          {leadingIcon}
        </span>
      )}
      <span>{displayContent}</span>
    </button>
  );
};
