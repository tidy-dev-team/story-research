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
        items.map(() => CheckboxState.Unchecked)
    );

    const [selectAllState, setSelectAllState] = useState<CheckboxState>(
        CheckboxState.Unchecked
    );

    const handleToggle = (index: number) => {
        if (index === -1) {
            const newState =
                selectAllState === CheckboxState.Checked
                    ? CheckboxState.Unchecked
                    : CheckboxState.Checked;

            setStates(states.map(() => newState));
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
        const isAllChecked = states.every(s => s === CheckboxState.Checked);
        const isAllUnchecked = states.every(s => s === CheckboxState.Unchecked);

        const newState = isAllChecked
            ? CheckboxState.Checked
            : isAllUnchecked
                ? CheckboxState.Unchecked
                : CheckboxState.Indeterminate;

        setSelectAllState(newState);
    }, [states]);

    return (
        <ul className={listStyles()} dir={textDirection}>
            <li className={checkboxClass({ isMaster: true })}>
                <Checkbox
                    label={displayTitle}
                    state={selectAllState}
                    onChange={() => handleToggle(-1)}
                    count={titleCount ? items.length : null}
                    textDirection={textDirection}
                />
            </li>

            {items.map((label, idx) => (
                <li key={idx} className={checkboxClass({ isMaster: false })}>
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