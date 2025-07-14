import React from "react";
import { cva } from "class-variance-authority";
import { TextDirection } from "../textDirection";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { IconButton, IconButtonType } from "../Button/IconButton";

export interface ListItem {
    label: string;
}

export interface ListProps {
    items: ListItem[];
    textDirection?: TextDirection;
    onEdit?: (label: string) => void;
    onDelete?: (label: string) => void;
}

const listStyles = cva([
    "flex", "flex-col", "gap-pz-3xs", "pz-label-m", "w-[268px]",
]);

const listItemStyles = cva([
    "flex", "relative", "justify-between", "items-center", "overflow-hidden", "gap-2", "bg-pz-gray-950", "text-pz-gray-100", "px-pz-3xs", "py-pz-4xs", "rounded-pz-xs", "border", "border-transparent", "border-2", "outline-none", "cursor-pointer", "hover:bg-pz-gray-950", "hover:before:absolute", "hover:before:bg-pz-system-bg-overlay-hover", "hover:before:inset-0", "hover:before:pointer-events-none", "active:before:bg-pz-system-bg-overlay-pressed", "focus-visible:border-pz-system-border-focused-1"
])

export const ListCard = ({
    items,
    textDirection = TextDirection.Ltr,
    onEdit,
    onDelete,
}: ListProps) => {
    return (
        <ul className={listStyles()} dir={textDirection}>
            {items.map(({ label }, idx) => (
                <li
                    key={idx}
                    tabIndex={0}
                    className={listItemStyles()}
                >
                    <p>{label}</p>
                    <span className="flex gap-pz-4xs">
                        <IconButton
                            Icon={EditOutlinedIcon}
                            onClick={() => onEdit?.(label)}
                            type={IconButtonType.Ghost}
                        />
                        <IconButton
                            Icon={DeleteOutlinedIcon}
                            onClick={() => onDelete?.(label)}
                            type={IconButtonType.Ghost}
                        />
                    </span>
                </li>
            ))}
        </ul>
    );
};
