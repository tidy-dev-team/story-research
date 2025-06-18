import React, { ReactNode, ReactElement } from "react";
import { cva } from "class-variance-authority";
import { TextDirection } from "../textDirection";

const tabBarVariants = cva(["flex", "items-center", "gap-1"]);

export interface TabBarProps {
  children?: ReactNode;
  textDirection?: TextDirection;
}

export const TabBar = ({
  children,
  textDirection = TextDirection.Ltr,
}: TabBarProps): ReactElement => {
  return (
    <div role="tablist" dir={textDirection} className={tabBarVariants()}>
      {children}
    </div>
  );
};
