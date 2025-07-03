import React, { useId, type ReactElement } from "react";
import { cva } from "class-variance-authority";

const dropdownStyles = cva([
  "flex flex-col",
  "w-full",
  "overflow-y-auto",
  "max-h-64",
  "rounded-pz-xs",
  "shadow-pz-down-level3",
  "border border-pz-system-border-1",
  "bg-pz-system-bg-4",
  "transition-all duration-200",
  "p-2",
]);

interface DropdownProps {
  children: React.ReactNode;
  isOpen?: boolean;
}

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  ({ children, isOpen = true }, ref): ReactElement | null => {
    const dropdownId = useId();

    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        id={dropdownId}
        role="listbox"
        aria-expanded={isOpen}
        className={dropdownStyles()}
      >
        {children}
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";
