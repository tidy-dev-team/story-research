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
    "w-full",
    "text-left",
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
        idle: "hover:bg-white/8 text-pz-base-white",
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
        true: "flex-row-reverse text-right",
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
    >
      {/* Checkbox for multi-select */}
      {multiSelect && (
        <span
          className="flex items-center mr-2"
          onClick={(e) => e.stopPropagation()}
        >
          {" "}
          <Checkbox
            checked={isSelected}
            disabled={item.disabled}
            severity={showCheckboxSeverity && !!item.severity}
            onChange={(e) => {
              e.stopPropagation();
              if (!item.disabled && onSelect) {
                onSelect();
              }
            }}
          />
        </span>
      )}

      {item.icon && <span className="flex items-center">{item.icon}</span>}

      <span
        className={`flex-1 truncate ${isSelected && !multiSelect ? "text-[#0093EE]" : "text-pz-base-white"}`}
      >
        {item.label}
      </span>
    </button>
  );
};
