import React, { useId } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

export interface DropdownProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dropdownStyles> {
  children: React.ReactNode;
  isOpen?: boolean;
}

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  ({ children, className, rtl = false, isOpen = true, ...props }, ref) => {
    const dropdownId = useId();

    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        role="listbox"
        id={dropdownId}
        className={cn(dropdownStyles({ rtl }), className)}
        dir={rtl ? "rtl" : "ltr"}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";

export default Dropdown;
