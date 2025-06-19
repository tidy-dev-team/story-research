import type { Meta, StoryObj } from "@storybook/react";
import { DropdownListItemSeverity } from "./DropdownListItemSeverity";
import { TextDirection } from "../textDirection";

const meta = {
  title: "Component/Dropdown/DropdownListItemSeverity",
  component: DropdownListItemSeverity,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    level: {
      control: "select",
      options: ["high", "medium", "low"],
      description: "Severity level",
      table: {
        type: { summary: "'high' | 'medium' | 'low'" },
        defaultValue: { summary: "medium" },
      },
    },
    textDirection: {
      control: "select",
      options: Object.values(TextDirection),
      description: "Text direction for RTL/LTR layout",
      table: {
        type: { summary: "TextDirection" },
        defaultValue: { summary: TextDirection.Ltr },
      },
    },
  },
} satisfies Meta<typeof DropdownListItemSeverity>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    level: "high",
  },
};

export const RTL: Story = {
  args: {
    level: "high",
    textDirection: TextDirection.Rtl,
  },
};

export const Medium: Story = {
  args: {
    level: "medium",
  },
};

export const Low: Story = {
  args: {
    level: "low",
  },
};
