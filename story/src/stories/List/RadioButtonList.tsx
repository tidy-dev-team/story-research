import React, { useState } from "react";
import { cva } from "class-variance-authority";
import RadioButton from "../Radio button/RadioButton";
import { TextDirection } from "../textDirection";

export enum RadioButtonListFlow {
    Vertical = "vertical",
    Horizontal = "horizontal",
}

export interface RadioButtonListProps {
    items: string[];
    flow?: RadioButtonListFlow;
    textDirection?: TextDirection;
}

const listStyles = cva("flex gap-pz-3xs", {
    variants: {
        flow: {
            [RadioButtonListFlow.Vertical]: "flex-col",
            [RadioButtonListFlow.Horizontal]: "",
        },
    },
    defaultVariants: {
        flow: RadioButtonListFlow.Vertical,
    },
});

export const RadioButtonList = ({
    items,
    flow = RadioButtonListFlow.Vertical,
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