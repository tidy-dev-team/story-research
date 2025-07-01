import React, { useState } from "react";
import { cva } from "class-variance-authority";
import { Checkbox, CheckboxState } from "../Checkbox/Checkbox";
import { TextDirection } from "../textDirection";

export interface ListProps {
    items: string[];
    flow?: "vertical" | "horizontal";
    textDirection?: TextDirection;
}

const ListStyles = cva("flex", {
    variants: {
        flow: {
            vertical: "flex-col gap-pz-3xs",
            horizontal: "gap-pz-3xs",
        },
    },
    defaultVariants: {
        flow: "vertical",
    },
});

export const List = ({
    items,
    flow = "vertical",
    textDirection = TextDirection.Ltr,
}: ListProps) => {
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