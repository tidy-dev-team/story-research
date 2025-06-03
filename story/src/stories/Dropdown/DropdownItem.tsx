import React, { ReactElement } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { Checkbox } from "../Checkbox/Checkbox";

export enum DropdownSize {
  s = "s",
  m = "m",
  l = "l",
}

export interface DropdownItem {
  id: string;
  label: string;
  value: any;
  icon?: ReactElement;
  disabled?: boolean;
  severity?: boolean;
  selected?: boolean;
}

const dropdownItemStyles = cva(
  [
    "flex",
    "items-center",
    "cursor-pointer",
    "transition-all",
    "duration-200",
    "font-['Heebo',_sans-serif]",
    "border-none",
    "bg-transparent",
    "text-pz-base-white",
    "pz-label-m",
    "w-full",
    "box-border", // Ensures padding is included in width
    "overflow-hidden",
    "focus:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-[#0E75B5]",
    "ring-offset-2",
    "ring-offset-[#22272b]",
  ],
  {
    variants: {
      size: {
        [DropdownSize.s]: ["px-2", "py-1", "gap-2", "text-sm", "min-h-6"],
        [DropdownSize.m]: ["px-3", "py-2", "gap-2", "text-sm", "min-h-8"],
        [DropdownSize.l]: ["px-4", "py-3", "gap-3", "text-base", "min-h-10"],
      },
      state: {
        idle: "hover:enabled:bg-pz-base-white/12",
        hover: "bg-white/8 text-pz-base-white",
        selected: "bg-blue-500/12",
        focused: "bg-white/8 ring-2 ring-[#0E75B5] text-pz-base-white",
        disabled: [
          "opacity-38",
          "cursor-not-allowed",
          "hover:bg-transparent",
          "text-pz-base-white/38",
        ],
      },
      rtl: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      size: DropdownSize.m,
      state: "idle",
      rtl: false,
    },
  }
);

interface DropdownItemComponentProps
  extends VariantProps<typeof dropdownItemStyles> {
  item: DropdownItem;
  isSelected: boolean;
  multiSelect?: boolean;
  showCheckboxSeverity?: boolean;
  onSelect?: () => void;
  className?: string;
}

export const DropdownItemComponent = ({
  item,
  isSelected,
  multiSelect = false,
  showCheckboxSeverity = false,
  size,
  rtl,
  onSelect,
  className,
}: DropdownItemComponentProps): ReactElement => {
  const state = item.disabled ? "disabled" : isSelected ? "selected" : "idle";

  const handleClick = () => {
    if (!item.disabled && onSelect) {
      onSelect();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <button
      className={twMerge(dropdownItemStyles({ size, state, rtl }), className)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={item.disabled}
      type="button"
      role="option"
      aria-selected={isSelected}
      style={{ flexDirection: rtl ? "row-reverse" : "row" }}
    >
      {/* Checkbox for multi-select - always first in DOM order */}
      {multiSelect && (
        <span
          className={`flex items-center ${rtl ? "ml-2" : "mr-2"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <Checkbox
            checked={isSelected}
            disabled={item.disabled}
            severity={showCheckboxSeverity && !!item.severity}
            rtl={rtl || false}
            onChange={(e) => {
              e.stopPropagation();
              if (!item.disabled && onSelect) {
                onSelect();
              }
            }}
          />
        </span>
      )}

      {/* Icon - always second in DOM order */}
      {item.icon && (
        <span className="flex items-center flex-shrink-0">{item.icon}</span>
      )}

      <span
        className={`flex-1 truncate min-w-0 ${
          isSelected && !multiSelect ? "text-[#0093EE]" : "text-pz-base-white"
        }`}
        style={{
          textAlign: rtl ? "right" : "left",
          direction: rtl ? "rtl" : "ltr",
        }}
      >
        {item.label}
      </span>
    </button>
  );
};
