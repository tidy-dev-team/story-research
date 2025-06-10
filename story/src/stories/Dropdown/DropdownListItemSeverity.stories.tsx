import type { Meta, StoryObj } from "@storybook/react";
import { DropdownListItemSeverity } from "./DropdownListItemSeverity";

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
    rtl: {
      control: "boolean",
      description: "Right-to-left layout",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
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
    rtl: true,
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
