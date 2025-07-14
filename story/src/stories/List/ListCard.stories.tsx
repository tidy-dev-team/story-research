import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ListCard, ListProps } from "./ListCard";
import { TextDirection } from "../textDirection";

const meta: Meta<typeof ListCard> = {
    title: "Components/List/ListCard",
    component: ListCard,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        textDirection: {
            control: { type: "radio" },
            options: [TextDirection.Ltr, TextDirection.Rtl],
        },
    },
};

export default meta;

type Story = StoryObj<typeof ListCard>;

export const Default: Story = {
    args: {
        items: [
            { label: "First item" },
            { label: "Second item" },
            { label: "Third item" },
        ],
        textDirection: TextDirection.Ltr,
        onEdit: () => { console.log('edit') },
        onDelete: () => { console.log('delete') },
    },
};

export const RTL: Story = {
    args: {
        items: [
            { label: "פריט ראשון" },
            { label: "פריט שני" },
            { label: "פריט שלישי" },
        ],
        textDirection: TextDirection.Rtl,
    },
};