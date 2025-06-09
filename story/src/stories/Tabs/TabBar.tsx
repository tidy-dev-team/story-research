import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export interface TabBarProps extends VariantProps<typeof tabBarVariants> {
  children?: React.ReactNode;
  className?: string;
  role?: string;
}

const tabBarVariants = cva(
  [
    // Base styles
    "flex",
    "items-center",
    "gap-1", // 4px gap between tabs
  ],
  {
    variants: {
      size: {
        s: "p-4", // 16px padding for small size
        l: "p-4", // 16px padding for large size (same as small in Figma)
      },
      rtl: {
        true: "justify-end", // RTL alignment
        false: "justify-start", // LTR alignment
      },
    },
    defaultVariants: {
      size: "l",
      rtl: false,
    },
  }
);

export const TabBar: React.FC<TabBarProps> = ({
  children,
  size,
  rtl = false,
  className,
  role = "tablist",
  ...rest
}) => {
  return (
    <div
      className={twMerge(tabBarVariants({ size, rtl }), className)}
      role={role}
      style={{
        direction: rtl ? "rtl" : "ltr",
      }}
      {...rest}
    >
      {children}
    </div>
  );
};
