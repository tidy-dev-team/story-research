import type { Meta, StoryObj } from "@storybook/react";
import { DropdownListItemMultiSeverity } from "./DropdownListItemMultiSeverity";
import { useState } from "react";

const meta = {
  title: "Component/Dropdown/DropdownListItemMultiSeverity",
  component: DropdownListItemMultiSeverity,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    severityLabel: {
      control: "text",
      description: "Label for the severity",
      table: { type: { summary: "string" } },
    },
    severityLevel: {
      control: "select",
      options: ["high", "medium", "low"],
      description: "Severity level",
      table: { type: { summary: '"high" | "medium" | "low"' } },
    },
    severityType: {
      control: "select",
      options: ["badge", "bar"],
      description: "Severity indicator type",
      table: {
        type: { summary: '"badge" | "bar"' },
        defaultValue: { summary: '"badge"' },
      },
    },
    checked: {
      control: "boolean",
      description: "Whether the checkbox is checked",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    indeterminate: {
      control: "boolean",
      description: "Whether the checkbox is in indeterminate state",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
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
} satisfies Meta<typeof DropdownListItemMultiSeverity>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    severityLabel: "High Severity",
    severityLevel: "high",
  },
};

export const Playground = {
  args: {
    severityLabel: "Interactive Severity",
    severityLevel: "medium",
    checked: false,
  },
  render: (args: any) => {
    const [checked, setChecked] = useState(args.checked ?? false);
    return (
      <DropdownListItemMultiSeverity
        {...args}
        checked={checked}
        onSelect={setChecked}
      />
    );
  },
};
