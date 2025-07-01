import React, { useState } from "react";
import { cva } from "class-variance-authority";
import { TextDirection } from "../textDirection";
import { Checkbox, CheckboxState } from "../Checkbox/Checkbox";

export interface ListProps {
    items: string[];
}

const ListStyles = cva([
    "flex",
    "flex-col",
    "gap-pz-3xs",
]);

export const List = ({ items }: ListProps) => {
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
        <ul className={ListStyles()}>
            {items.map((label, idx) => (
                <li key={idx}>
                    <Checkbox
                        label={label}
                        state={states[idx]}
                        onChange={() => handleToggle(idx)}
                        count={null}
                    />
                </li>
            ))}
        </ul>
    );
};