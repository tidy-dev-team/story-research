import React, { ReactNode, ReactElement } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const tabBarVariants = cva(["flex", "items-center", "gap-1"], {
  variants: {
    rtl: {
      true: "justify-end flex-row-reverse",
      false: "justify-start flex-row",
    },
  },
  defaultVariants: {
    rtl: false,
  },
});

export interface TabBarProps extends VariantProps<typeof tabBarVariants> {
  children?: ReactNode;
}

export const TabBar = ({
  children,
  rtl = false,
}: TabBarProps): ReactElement => {
  const childrenArray = React.Children.toArray(children);
  const orderedChildren = rtl ? childrenArray.reverse() : childrenArray;

  return (
    <div
      role="tablist"
      dir={rtl ? "rtl" : "ltr"}
      className={tabBarVariants({ rtl })}
    >
      {orderedChildren}
    </div>
  );
};
