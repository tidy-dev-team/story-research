import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { CheckboxList } from "./CheckboxList";
import { RadioButtonList } from "./RadioButtonList";
import { TextDirection } from "../textDirection";

const meta: Meta<typeof CheckboxList> = {
    title: "Component/List/Checkbox List",
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
        flow: "vertical",
        textDirection: TextDirection.Ltr,
    },
};

export const Horizontal: Story = {
    args: {
        items: ["Option 1", "Option 2", "Option 3"],
        flow: "horizontal",
        textDirection: TextDirection.Ltr,
    },
};

export const RTL: Story = {
    args: {
        items: ["אפשרות 1", "אפשרות 2", "אפשרות 3"],
        flow: "horizontal",
        textDirection: TextDirection.Rtl,
    },
};

type Story1 = StoryObj<typeof RadioButtonList>;

export const VerticalRadio: Story1 = {
    args: {
        items: ["Option 1", "Option 2", "Option 3"],
        flow: "vertical",
        textDirection: TextDirection.Ltr,
    },
};

export const HorizontalRadio: Story1 = {
    args: {
        items: ["Option 1", "Option 2", "Option 3"],
        flow: "horizontal",
        textDirection: TextDirection.Ltr,
    },
};

export const RTLRadio: Story1 = {
    args: {
        items: ["אפשרות 1", "אפשרות 2", "אפשרות 3"],
        flow: "horizontal",
        textDirection: TextDirection.Rtl,
    },
};