import React, { useState, useEffect } from "react";
import { cva } from "class-variance-authority";
import { Checkbox, CheckboxState } from "../Checkbox/Checkbox";
import { TextDirection } from "../textDirection";

export interface MultiSelectListProps {
    title?: string;
    items: string[];
    titleCount?: boolean;
    textDirection?: TextDirection;
}

const listStyles = cva(["flex", "flex-col", "gap-pz-3xs"]);

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
    items,
    titleCount = false,
    textDirection = TextDirection.Ltr,
}: MultiSelectListProps) => {
    const displayTitle = title ?? "Select All";
    const [states, setStates] = useState<CheckboxState[]>(
        [CheckboxState.Unchecked, ...items.map(() => CheckboxState.Unchecked)]
    );

    const isAllChecked = states.slice(1).every(s => s === CheckboxState.Checked);
    const isAllUnchecked = states.slice(1).every(s => s === CheckboxState.Unchecked);

    const masterState: CheckboxState =
        items.length === 1
            ? states[1]
            : isAllChecked
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

    useEffect(() => {
        setStates((prev) => {
            const newStates = [...prev];
            newStates[0] = masterState;
            return newStates;
        });
    }, [masterState]);

    return (
        <ul className={listStyles()} dir={textDirection}>
            <li className={checkboxClass({ isMaster: true })}>
                <Checkbox
                    label={displayTitle}
                    state={states[0]}
                    onChange={() => handleToggle(0)}
                    count={titleCount ? items.length : null}
                    textDirection={textDirection}
                />
            </li>

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