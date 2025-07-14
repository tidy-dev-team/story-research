import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { CheckboxList, CheckboxListFlow } from "./CheckboxList";
import { TextDirection } from "../textDirection";

const meta: Meta<typeof CheckboxList> = {
    title: "Components/List/Checkbox List",
    component: CheckboxList,
    parameters: {
        layout: "centered",
    },
    argTypes: {
        items: {
            control: { type: "object" },
            description: "Array of checkbox labels",
            defaultValue: ["Option 1", "Option 2", "Option 3"],
        },
        flow: {
            control: { type: "radio" },
            options: ["vertical", "horizontal"],
        },
        textDirection: {
            control: { type: "radio" },
            options: [TextDirection.Ltr, TextDirection.Rtl],
        },
    },
};

export default meta;

type Story = StoryObj<typeof CheckboxList>;

export const Vertical: Story = {
    args: {
        items: ["Option 1", "Option 2", "Option 3"],
        flow: CheckboxListFlow.Vertical,
        textDirection: TextDirection.Ltr,
    },
};

export const Horizontal: Story = {
    args: {
        items: ["Option 1", "Option 2", "Option 3"],
        flow: CheckboxListFlow.Horizontal,
        textDirection: TextDirection.Ltr,
    },
};

export const RTL: Story = {
    args: {
        items: ["אפשרות 1", "אפשרות 2", "אפשרות 3"],
        flow: CheckboxListFlow.Horizontal,
        textDirection: TextDirection.Rtl,
    },
};