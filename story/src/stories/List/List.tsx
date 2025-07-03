import React, { useState } from "react";
import { cva } from "class-variance-authority";
import { TextDirection } from "../textDirection";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

export interface ListProps {
    items: string[];
    textDirection?: TextDirection;
}

const ListStyles = cva(["flex", "flex-col", "gap-pz-3xs",]);

export const List = ({
    items,
    textDirection = TextDirection.Ltr,
}: ListProps) => {
    const [selected, setSelected] = useState<boolean[]>(() =>
        items.map(() => false)
    );

    const handleToggle = (index: number) => {
        setSelected((prev) =>
            prev.map((val, i) => (i === index ? !val : val))
        );
    };

    return (
        <ul className={ListStyles()} dir={textDirection}>
            {items.map((label, idx) => (
                <li
                    key={idx}
                    onClick={() => handleToggle(idx)}
                    className="flex items-center gap-2 cursor-pointer select-none text-pz-system-bg-primary"
                >
                    {selected[idx] ? (
                        <CheckCircleIcon color="inherit" />
                    ) : (
                        <RadioButtonUncheckedIcon color="inherit" />
                    )}
                    <p>{label}</p>
                </li>
            ))}
        </ul>
    );
};