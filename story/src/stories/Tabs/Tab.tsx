import React, { ReactNode, ReactElement } from "react";
import { cva, type VariantProps } from "class-variance-authority";

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
  children: ReactNode;
  leadingIcon?: ReactElement;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export const Tab = ({
  children,
  leadingIcon,
  rtl = false,
  selected = false,
  disabled = false,
  onClick,
}: TabProps): ReactElement => (
  <button
    type="button"
    role="tab"
    aria-selected={selected}
    disabled={disabled}
    className={tabStyles({ rtl })}
    onClick={onClick}
    onKeyDown={(event) => {
      if (!disabled && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        onClick?.();
      }
    }}
  >
    {leadingIcon && (
      <span className="flex items-center justify-center w-4 h-4 text-[16px] [&>*]:w-4 [&>*]:h-4">
        {leadingIcon}
      </span>
    )}
    <span>{children}</span>
  </button>
);
