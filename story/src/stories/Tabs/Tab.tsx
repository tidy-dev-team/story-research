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
    "pz-label-l",
    "cursor-pointer",
    "transition-colors",
    "duration-150",
    "focus:outline-none",
    "border-none",
    "bg-transparent",
    "whitespace-nowrap",
    "text-pz-system-fg-4",
    "hover:enabled:text-pz-system-fg-1",
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
        true: "text-right flex-row-reverse",
        false: "text-left flex-row",
      },
    },
    defaultVariants: {
      rtl: false,
    },
  }
);

export interface TabProps extends VariantProps<typeof tabStyles> {
  children: React.ReactNode;
  leadingIcon?: React.ReactElement;
  disabled?: boolean;
  className?: string;
  tabIndex?: number;
  onClick?: () => void;
  "aria-selected"?: boolean;
  "aria-controls"?: string;
}

export const Tab: React.FC<TabProps> = ({
  children,
  leadingIcon,
  rtl = false,
  disabled = false,
  onClick,
  className = "",
  tabIndex = 0,
  "aria-selected": ariaSelected,
  "aria-controls": ariaControls,
  ...rest
}) => {
  return (
    <button
      className={twMerge(tabStyles({ rtl }), className)}
      role="tab"
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
      <span>{children}</span>
    </button>
  );
};
