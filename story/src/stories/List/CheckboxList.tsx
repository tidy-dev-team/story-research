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

const ListStyles = cva("flex", {
    variants: {
        flow: {
            [CheckboxListFlow.Vertical]: "flex-col gap-pz-3xs",
            [CheckboxListFlow.Horizontal]: "gap-pz-3xs",
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
        () => items.map(() => CheckboxState.Unchecked)
    );

    const handleToggle = (index: number) => {
        setStates((prev) =>
            prev.map((state, idx) =>
                idx === index
                    ? state === CheckboxState.Checked
                        ? CheckboxState.Unchecked
                        : CheckboxState.Checked
                    : state
            )
        );
    };

    return (
        <ul className={ListStyles({ flow })} dir={textDirection}>
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