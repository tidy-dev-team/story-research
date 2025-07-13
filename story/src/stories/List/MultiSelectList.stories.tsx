import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MultiSelectList } from "./MultiSelectList";
import { TextDirection } from "../textDirection";

const meta: Meta<typeof MultiSelectList> = {
    title: "Component/List/MultiSelect List",
    component: MultiSelectList,
    parameters: {
        layout: "centered",
    },
    argTypes: {
        title: {
            control: { type: "text" },
            description: "Label for the master checkbox",
            defaultValue: "List Title",
        },
        titleCount: {
            control: { type: "radio" },
            options: [true, false],
        },
        items: {
            control: { type: "object" },
            description: "Array of checkbox labels",
            defaultValue: ["Option 1", "Option 2", "Option 3"],
        },
        textDirection: {
            control: { type: "radio" },
            options: [TextDirection.Ltr, TextDirection.Rtl],
        },
    },
};

export default meta;

type Story = StoryObj<typeof MultiSelectList>;

export const Default: Story = {
    args: {
        title: "List Title",
        items: ["Option 1", "Option 2", "Option 3"],
        textDirection: TextDirection.Ltr,
    },
};
export const NoTitle: Story = {
    args: {
        items: ["Option 1", "Option 2", "Option 3"],
        textDirection: TextDirection.Ltr,
    },
};

export const WithCount: Story = {
    args: {
        title: "List Title",
        titleCount: true,
        items: ["Option 1", "Option 2", "Option 3"],
        textDirection: TextDirection.Ltr,
    },
};

export const RTL: Story = {
    args: {
        title: "בחר הכל",
        titleCount: true,
        items: ["אפשרות 1", "אפשרות 2", "אפשרות 3"],
        textDirection: TextDirection.Rtl,
    },
};