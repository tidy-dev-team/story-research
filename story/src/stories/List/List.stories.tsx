import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { List } from "./List";
import { TextDirection } from "../textDirection";

const meta: Meta<typeof List> = {
  title: "Component/List/List",
  component: List,
  argTypes: {
    textDirection: {
      control: { type: "radio" },
      options: [TextDirection.Ltr, TextDirection.Rtl],
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof List>;

export const Default: Story = {
  args: {
    items: ["First item", "Second item", "Third item"],
    textDirection: TextDirection.Ltr,
  },
};

export const RTLDirection: Story = {
  args: {
    items: ["פריט ראשון", "פריט שני", "פריט שלישי"],
    textDirection: TextDirection.Rtl,
  },
};