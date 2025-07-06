import React, { useState, useRef, useEffect, type ReactElement } from "react";
import { cva } from "class-variance-authority";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const dropdownStyles = cva(["relative w-full max-w-[400px]"]);

const selectFieldStyles = cva([
  "flex items-center justify-between w-full h-8",
  "px-3 py-2 rounded border",
  "bg-pz-system-bg-component-field-idle",
  "border-pz-system-border-primary",
  "cursor-pointer transition-all duration-200",
  "focus:outline-none focus:ring-2 focus:ring-pz-system-border-focused-1",
]);

const menuStyles = cva([
  "absolute top-full left-0 right-0 mt-1 z-50",
  "bg-pz-system-bg-4 rounded-lg",
  "shadow-pz-down-level3 border border-pz-system-border-1",
  "max-h-64 overflow-y-auto",
  "p-2",
]);

const placeholderStyles = cva([
  "text-pz-system-fg-4 pz-label-m",
  "flex-1 text-left truncate",
]);

const valueStyles = cva([
  "text-pz-system-fg-1 pz-label-m",
  "flex-1 text-left truncate",
]);

const iconStyles = cva([
  "w-4 h-4 text-pz-system-fg-1",
  "transition-transform duration-200",
]);

export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  placeholder?: string;
  options: DropdownOption[];
  value?: string;
  isDisabled?: boolean;
  children?: React.ReactNode;
  onSelect?: (option: DropdownOption) => void;
}

export const Dropdown = ({
  placeholder = "Select an option",
  options,
  value,
  isDisabled = false,
  children,
  onSelect,
}: DropdownProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    if (!isDisabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionSelect = (option: DropdownOption) => {
    onSelect?.(option);
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleToggle();
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div ref={dropdownRef} className={dropdownStyles()}>
      <div
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        tabIndex={isDisabled ? -1 : 0}
        className={selectFieldStyles()}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
      >
        <span className={selectedOption ? valueStyles() : placeholderStyles()}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <div className={iconStyles({ className: isOpen ? "rotate-180" : "" })}>
          {isOpen ? (
            <KeyboardArrowUpIcon fontSize="inherit" />
          ) : (
            <KeyboardArrowDownIcon fontSize="inherit" />
          )}
        </div>
      </div>

      {isOpen && (
        <div className={menuStyles()} role="listbox">
          {children || (
            <>
              {options.map((option) => (
                <div
                  key={option.value}
                  role="option"
                  aria-selected={value === option.value}
                  className="flex items-center h-8 px-2 py-1 rounded cursor-pointer transition-colors duration-200 hover:bg-pz-system-bg-overlay-hover text-pz-system-fg-1 pz-label-m"
                  onClick={() => handleOptionSelect(option)}
                >
                  {option.label}
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};
