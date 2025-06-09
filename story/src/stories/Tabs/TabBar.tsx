import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export interface TabBarProps extends VariantProps<typeof tabBarVariants> {
  children?: React.ReactNode;
  className?: string;
}

const tabBarVariants = cva(
  [
    "flex",
    "items-center",
    "gap-1", // 4px gap between tabs
  ],
  {
    variants: {
      rtl: {
        true: "justify-end flex-row-reverse",
        false: "justify-start flex-row",
      },
    },
    defaultVariants: {
      rtl: false,
    },
  }
);

export const TabBar: React.FC<TabBarProps> = ({
  children,
  rtl,
  className,
  ...rest
}) => {
  const childrenArray = React.Children.toArray(children);
  const orderedChildren = rtl ? childrenArray.reverse() : childrenArray;

  return (
    <div
      className={twMerge(tabBarVariants({ rtl }), className)}
      role="tablist"
      style={{
        direction: rtl ? "rtl" : "ltr",
      }}
      {...rest}
    >
      {orderedChildren}
    </div>
  );
};
