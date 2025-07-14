import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { RadioButtonList } from "./RadioButtonList";
import { TextDirection } from "../textDirection";

const meta: Meta<typeof RadioButtonList> = {
    title: "Components/List/RadioButton List",
    component: RadioButtonList,
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

type Story = StoryObj<typeof RadioButtonList>;

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