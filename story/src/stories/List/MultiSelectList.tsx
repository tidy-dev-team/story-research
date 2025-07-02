import React, { useState } from "react";
import { cva } from "class-variance-authority";
import { Checkbox, CheckboxState } from "../Checkbox/Checkbox";
import { TextDirection } from "../textDirection";

export interface MultiSelectListProps {
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
    items,
    textDirection = TextDirection.Ltr,
}: MultiSelectListProps) => {
    const [states, setStates] = useState<CheckboxState[]>(
        () => items.map(() => CheckboxState.Unchecked)
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

            setStates((prev) =>
                prev.map((_, i) => (i === 0 ? newState : newState))
            );
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

    // Keep master checkbox state in sync with others
    React.useEffect(() => {
        setStates((prev) => {
            const newStates = [...prev];
            newStates[0] = masterState;
            return newStates;
        });
    }, [masterState]);

    return (
        <ul className={ListStyles()} dir={textDirection}>
            {items.map((label, idx) => (
                <li key={idx}
                    className={checkboxClass({ isMaster: idx === 0 })}
                >
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