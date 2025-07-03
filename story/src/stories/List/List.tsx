import React from "react";
import { cva } from "class-variance-authority";
import { TextDirection } from "../textDirection";
import type { SvgIconComponent } from "@mui/icons-material";

export interface ListItem {
    label: string;
    icon: SvgIconComponent;
}

export interface ListProps {
    items: ListItem[];
    textDirection?: TextDirection;
}

const ListStyles = cva(["flex", "flex-col", "gap-pz-2xs", "pz-label-l", "w-[268px]"]);

export const List = ({
    items,
    textDirection = TextDirection.Ltr,
}: ListProps) => {
    return (
        <ul className={ListStyles()} dir={textDirection}>
            {items.map(({ label, icon: Icon }, idx) => (
                <li
                    key={idx}
                    className="flex items-center gap-2 text-pz-gray-100 justify-between"
                >
                    <p>{label}</p>
                    <Icon color="inherit" />
                </li>
            ))}
        </ul>
    );
};