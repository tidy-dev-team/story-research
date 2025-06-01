import React, {
  ReactElement,
  ReactNode,
  useState,
  useRef,
  useEffect,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  DropdownItemComponent,
  DropdownSize,
  DropdownItem,
} from "./DropdownItem";

// Re-export everything that was in index.ts
export {
  DropdownSize,
  type DropdownItem,
  DropdownItemComponent,
} from "./DropdownItem";

const dropdownTriggerStyles = cva(
  [
    "relative",
    "inline-flex",
    "items-center",
    "justify-between",
    "border",
    "border-[#A8B0B8]",
    "rounded-lg",
    "bg-[#22272B]",
    "text-white",
    "font-['Heebo',_sans-serif]",
    "cursor-pointer",
    "transition-all",
    "duration-200",
    "focus:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-[#0E75B5]",
    "ring-offset-2",
    "ring-offset-[#22272b]",
    "hover:border-[#CCD1D5]",
    "active:border-[#0093EE]",
  ],
  {
    variants: {
      size: {
        [DropdownSize.s]: ["h-6", "px-2", "gap-2", "text-sm"],
        [DropdownSize.m]: ["h-8", "px-3", "gap-2", "text-sm"],
        [DropdownSize.l]: ["h-10", "px-4", "gap-3", "text-base"],
      },
      isOpen: {
        true: "border-[#0093EE]",
        false: "",
      },
      disabled: {
        true: [
          "cursor-not-allowed",
          "opacity-38",
          "border-white/38",
          "text-white/38",
          "hover:border-white/38",
        ],
        false: "",
      },
      rtl: {
        true: "flex-row-reverse",
        false: "",
      },
    },
    defaultVariants: {
      size: DropdownSize.m,
      isOpen: false,
      disabled: false,
      rtl: false,
    },
  }
);

const dropdownMenuStyles = cva(
  [
    "absolute",
    "z-50",
    "mt-1",
    "min-w-full",
    "max-h-64",
    "overflow-auto",
    "bg-[#22272B]",
    "border",
    "border-[#A8B0B8]",
    "rounded-lg",
    "shadow-lg",
    "py-1",
  ],
  {
    variants: {
      rtl: {
        true: "right-0",
        false: "left-0",
      },
    },
    defaultVariants: {
      rtl: false,
    },
  }
);

interface DropdownProps extends VariantProps<typeof dropdownTriggerStyles> {
  items: DropdownItem[];
  placeholder?: string;
  selectedValue?: any;
  onSelectionChange?: (selectedItems: DropdownItem[]) => void;
  multiSelect?: boolean;
  className?: string;
  menuClassName?: string;
  renderSelectedValue?: (selectedItems: DropdownItem[]) => ReactNode;
}

export const Dropdown = ({
  items,
  placeholder = "Select an option",
  selectedValue,
  onSelectionChange,
  multiSelect = false,
  size,
  disabled,
  rtl,
  className,
  menuClassName,
  renderSelectedValue,
}: DropdownProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<DropdownItem[]>(() => {
    if (multiSelect) {
      return items.filter((item) => item.selected);
    }
    const selected = items.find(
      (item) => item.value === selectedValue || item.selected
    );
    return selected ? [selected] : [];
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleItemSelect = (item: DropdownItem) => {
    if (item.disabled) return;

    let newSelectedItems: DropdownItem[];

    if (multiSelect) {
      const isSelected = selectedItems.some(
        (selected) => selected.id === item.id
      );
      if (isSelected) {
        newSelectedItems = selectedItems.filter(
          (selected) => selected.id !== item.id
        );
      } else {
        newSelectedItems = [...selectedItems, item];
      }
    } else {
      newSelectedItems = [item];
      setIsOpen(false);
    }

    setSelectedItems(newSelectedItems);
    onSelectionChange?.(newSelectedItems);
  };

  const getDisplayValue = (): ReactNode => {
    if (renderSelectedValue) {
      return renderSelectedValue(selectedItems);
    }

    if (selectedItems.length === 0) {
      return placeholder;
    }

    if (selectedItems.length === 1) {
      return selectedItems[0].label;
    }

    return `${selectedItems.length} items selected`;
  };

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <button
        className={twMerge(
          dropdownTriggerStyles({ size, isOpen, disabled, rtl }),
          className
        )}
        onClick={handleToggle}
        disabled={disabled || false}
        type="button"
      >
        <span className="truncate">{getDisplayValue()}</span>
        <KeyboardArrowDownIcon
          className={twMerge(
            "transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          sx={{ fontSize: "inherit" }}
        />
      </button>

      {isOpen && (
        <div className={twMerge(dropdownMenuStyles({ rtl }), menuClassName)}>
          {items.map((item) => (
            <DropdownItemComponent
              key={item.id}
              item={item}
              isSelected={selectedItems.some(
                (selected) => selected.id === item.id
              )}
              multiSelect={multiSelect}
              size={size || DropdownSize.m}
              rtl={rtl || false}
              onSelect={() => handleItemSelect(item)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
