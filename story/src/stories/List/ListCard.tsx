import React from "react";
import { cva } from "class-variance-authority";
import { TextDirection } from "../textDirection";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export interface ListItem {
    label: string;
}

export interface ListProps {
    items: ListItem[];
    textDirection?: TextDirection;
}

const ListStyles = cva([
    "flex", "flex-col", "gap-pz-2xs", "pz-label-l", "w-[268px]",
]);

const ListItemStyles = cva([
    "flex", "relative", "justify-between", "items-center", "overflow-hidden", "gap-2", "text-pz-gray-100", "px-pz-3xs", "py-pz-5xs", "min-h-pz-l", "rounded-pz-xs", "border", "border-transparent", "border-2", "outline-none", "cursor-pointer", "hover:bg-pz-gray-950", "hover:after:absolute", "hover:after:bg-pz-system-bg-overlay-hover", "hover:after:inset-0", "active:after:bg-pz-system-bg-overlay-pressed", "focus-visible:border-pz-system-border-focused-1"
])

export const ListCard = ({
    items,
    textDirection = TextDirection.Ltr,
}: ListProps) => {
    return (
        <ul className={ListStyles()} dir={textDirection}>
            {items.map(({ label }, idx) => (
                <li
                    key={idx}
                    tabIndex={0}
                    className={ListItemStyles()}
                >
                    <p>{label}</p>
                    <span className="flex gap-pz-4xs">
                        <EditOutlinedIcon color="inherit" fontSize="inherit" />
                        <DeleteOutlinedIcon color="inherit" fontSize="inherit" />
                    </span>
                </li>
            ))}
        </ul>
    );
};