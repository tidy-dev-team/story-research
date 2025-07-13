import React, { useState } from "react";
import { cva } from "class-variance-authority";
import { Checkbox, CheckboxState } from "../Checkbox/Checkbox";
import { TextDirection } from "../textDirection";

export enum CheckboxListFlow {
    Vertical = "vertical",
    Horizontal = "horizontal",
}

export interface CheckboxListProps {
    items: string[];
    flow?: CheckboxListFlow;
    textDirection?: TextDirection;
}

const listStyles = cva("flex gap-pz-3xs", {
    variants: {
        flow: {
            [CheckboxListFlow.Vertical]: "flex-col",
            [CheckboxListFlow.Horizontal]: "",
        },
    },
    defaultVariants: {
        flow: CheckboxListFlow.Vertical,
    },
});

export const CheckboxList = ({
    items,
    flow = CheckboxListFlow.Vertical,
    textDirection = TextDirection.Ltr,
}: CheckboxListProps) => {
    const [states, setStates] = useState<CheckboxState[]>(
        items.map(() => CheckboxState.Unchecked)
    );

    const handleToggle = (index: number) => {
        setStates((prev) => {
            const newStates = [...prev]; // shallow copy
            newStates[index] =
                prev[index] === CheckboxState.Checked
                    ? CheckboxState.Unchecked
                    : CheckboxState.Checked;
            return newStates;
        });
    };

    return (
        <ul className={listStyles({ flow })} dir={textDirection}>
            {items.map((label, idx) => (
                <li key={idx}>
                    <Checkbox
                        label={label}
                        state={states[idx]}
                        onChange={() => handleToggle(idx)}
                        count={null}
                        textDirection={textDirection}
                    />
                </li>
            ))}
        </ul>
    );
};