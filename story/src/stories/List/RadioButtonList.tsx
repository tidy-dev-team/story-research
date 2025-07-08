import React, { useState } from "react";
import { cva } from "class-variance-authority";
import RadioButton from "../Radio button/RadioButton";
import { TextDirection } from "../textDirection";

export interface RadioButtonListProps {
    items: string[];
    flow?: "vertical" | "horizontal";
    textDirection?: TextDirection;
}

const listStyles = cva("flex gap-pz-3xs", {
    variants: {
        flow: {
            vertical: "flex-col",
            horizontal: "",
        },
    },
    defaultVariants: {
        flow: "vertical",
    },
});

export const RadioButtonList = ({
    items,
    flow = "vertical",
    textDirection = TextDirection.Ltr,
}: RadioButtonListProps) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const handleChange = (index: number) => {
        setSelectedIndex(index);
    };

    return (
        <ul className={listStyles({ flow })} dir={textDirection}>
            {items.map((label, idx) => (
                <li key={idx}>
                    <RadioButton
                        label={label}
                        selected={selectedIndex === idx}
                        onChange={() => handleChange(idx)}
                        textDirection={textDirection}
                    />
                </li>
            ))}
        </ul>
    );
};