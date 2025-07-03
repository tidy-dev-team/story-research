import React, { useId, type ReactElement } from "react";
import { cva } from "class-variance-authority";
import { TextDirection } from "../textDirection";

const dropdownStyles = cva(
  [
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
  ],
  {
    variants: {
      textDirection: {
        [TextDirection.Rtl]: "text-right",
        [TextDirection.Ltr]: "text-left",
      },
    },
    defaultVariants: {
      textDirection: TextDirection.Ltr,
    },
  }
);

interface DropdownProps {
  children: React.ReactNode;
  textDirection?: TextDirection;
  isOpen?: boolean;
  className?: string;
}

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  ({ children, textDirection = TextDirection.Ltr, isOpen = true, className }, ref): ReactElement | null => {
    const dropdownId = useId();

    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        role="listbox"
        id={dropdownId}
        className={dropdownStyles({ textDirection, className })}
        dir={textDirection}
      >
        {children}
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";
