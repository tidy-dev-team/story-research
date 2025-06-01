import React, { ReactElement } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

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
  severity?: {
    level: "low" | "medium" | "high" | "critical";
    text: string;
  };
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
    "text-white",
    "border-none",
    "bg-transparent",
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
        idle: "hover:bg-white/8 text-white",
        hover: "bg-white/8 text-white",
        selected: "bg-[#0093EE]/12",
        focused: "bg-white/8 ring-2 ring-[#0E75B5] text-white",
        disabled: [
          "opacity-38",
          "cursor-not-allowed",
          "hover:bg-transparent",
          "text-white/38",
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

const severityBadgeStyles = cva(
  ["px-2", "py-0.5", "rounded", "text-xs", "font-medium", "whitespace-nowrap"],
  {
    variants: {
      level: {
        low: "bg-green-600/20 text-green-400",
        medium: "bg-yellow-600/20 text-yellow-400",
        high: "bg-orange-600/20 text-orange-400",
        critical: "bg-red-600/20 text-red-400",
      },
    },
  }
);

interface DropdownItemComponentProps
  extends VariantProps<typeof dropdownItemStyles> {
  item: DropdownItem;
  isSelected: boolean;
  multiSelect?: boolean;
  onSelect?: () => void;
  className?: string;
}

export const DropdownItemComponent = ({
  item,
  isSelected,
  multiSelect = false,
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
        <span className="flex items-center">
          {isSelected ? (
            <CheckBoxIcon
              className="text-[#0093EE]"
              sx={{ fontSize: "inherit" }}
            />
          ) : (
            <CheckBoxOutlineBlankIcon
              className="text-[#A8B0B8]"
              sx={{ fontSize: "inherit" }}
            />
          )}
        </span>
      )}

      {/* Leading icon */}
      {item.icon && <span className="flex items-center">{item.icon}</span>}

      {/* Item label */}
      <span
        className={`flex-1 truncate ${isSelected && !multiSelect ? "text-[#0093EE]" : "text-white"}`}
      >
        {item.label}
      </span>

      {/* Severity badge */}
      {item.severity && (
        <span className={severityBadgeStyles({ level: item.severity.level })}>
          {item.severity.text}
        </span>
      )}
    </button>
  );
};
