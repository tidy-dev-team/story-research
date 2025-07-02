import React, { useState, useEffect } from "react";
import { cva } from "class-variance-authority";
import { Checkbox, CheckboxState } from "../Checkbox/Checkbox";
import { TextDirection } from "../textDirection";

export interface MultiSelectListProps {
    title: string;
    titleCount?: number | null;
    items: string[];
    textDirection?: TextDirection;
}

const ListStyles = cva(["flex", "flex-col", "gap-pz-3xs"]);

const checkboxClass = cva("", {
    variants: {
        isMaster: {
            true: "",
            false: "ms-pz-3xs",
        },
    },
});

export const MultiSelectList = ({
    title,
    titleCount = null,
    items,
    textDirection = TextDirection.Ltr,
}: MultiSelectListProps) => {
    const [states, setStates] = useState<CheckboxState[]>(
        () => [CheckboxState.Unchecked, ...items.map(() => CheckboxState.Unchecked)]
    );

    const isAllChecked = states.slice(1).every(s => s === CheckboxState.Checked);
    const isAllUnchecked = states.slice(1).every(s => s === CheckboxState.Unchecked);

    const masterState: CheckboxState = isAllChecked
        ? CheckboxState.Checked
        : isAllUnchecked
            ? CheckboxState.Unchecked
            : CheckboxState.Indeterminate;

    const handleToggle = (index: number) => {
        if (index === 0) {
            const newState =
                masterState === CheckboxState.Checked
                    ? CheckboxState.Unchecked
                    : CheckboxState.Checked;

            setStates(Array(states.length).fill(newState));
        } else {
            setStates((prev) => {
                const newStates = [...prev];
                newStates[index] =
                    prev[index] === CheckboxState.Checked
                        ? CheckboxState.Unchecked
                        : CheckboxState.Checked;
                return newStates;
            });
        }
    };

    // Sync master checkbox
    useEffect(() => {
        setStates((prev) => {
            const newStates = [...prev];
            newStates[0] = masterState;
            return newStates;
        });
    }, [masterState]);

    return (
        <ul className={ListStyles()} dir={textDirection}>
            {/* Master checkbox */}
            <li className={checkboxClass({ isMaster: true })}>
                <Checkbox
                    label={title}
                    state={states[0]}
                    onChange={() => handleToggle(0)}
                    count={titleCount}
                    textDirection={textDirection}
                />
            </li>

            {/* Sub checkboxes */}
            {items.map((label, idx) => (
                <li key={idx} className={checkboxClass({ isMaster: false })}>
                    <Checkbox
                        label={label}
                        state={states[idx + 1]}
                        onChange={() => handleToggle(idx + 1)}
                        count={null}
                        textDirection={textDirection}
                    />
                </li>
            ))}
        </ul>
    );
};