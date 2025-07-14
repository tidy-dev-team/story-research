import React from "react";
import { cva } from "class-variance-authority";
import { TextDirection } from "../textDirection";
import type { SvgIconComponent } from "@mui/icons-material";

export interface ListItem {
    label: string;
    icon?: SvgIconComponent;
}

export interface ListProps {
    items: ListItem[];
    textDirection?: TextDirection;
}

const listStyles = cva([
    "flex", "flex-col", "gap-pz-3xs", "pz-label-l", "w-[268px]",
]);

const listItemStyles = cva([
    "flex", "relative", "justify-between", "items-center", "overflow-hidden", "gap-2", "text-pz-gray-100", "px-pz-3xs", "py-pz-5xs", "min-h-pz-l", "rounded-pz-xs", "border-transparent", "border-2", "outline-none", "cursor-pointer", "hover:bg-pz-gray-950", "hover:after:absolute", "hover:after:bg-pz-system-bg-overlay-hover", "hover:after:inset-0", "active:after:bg-pz-system-bg-overlay-pressed", "focus-visible:border-pz-system-border-focused-1"
])

export const List = ({
    items,
    textDirection = TextDirection.Ltr,
}: ListProps) => {
    return (
        <ul className={listStyles()} dir={textDirection}>
            {items.map(({ label, icon: Icon }, idx) => (
                <li
                    key={idx}
                    tabIndex={0}
                    className={listItemStyles()}
                >
                    <span>{label}</span>
                    {Icon && <Icon color="inherit" fontSize="inherit" />}
                </li>
            ))}
        </ul>
    );
};
