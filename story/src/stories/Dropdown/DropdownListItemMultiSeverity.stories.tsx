import type { Meta, StoryObj } from "@storybook/react";
import { DropdownListItemMultiSeverity } from "./DropdownListItemMultiSeverity";
import { TextDirection } from "../textDirection";
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
    textDirection: {
      control: "select",
      options: [TextDirection.Ltr, TextDirection.Rtl],
      description: "Text direction for layout",
      table: {
        type: { summary: "TextDirection" },
        defaultValue: { summary: "TextDirection.Ltr" },
      },
    },
    count: {
      control: { type: "number", min: 0 },
      description: "Count value to display in brackets after severity",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "undefined" },
      },
    },
    alwaysShowCount: {
      control: "boolean",
      description: "Whether to always show count, even when count is 0",
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

export const Checked: Story = {
  args: {
    severityLabel: "Medium Severity",
    severityLevel: "medium",
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    severityLabel: "Low Severity",
    severityLevel: "low",
    indeterminate: true,
  },
};

export const BadgeType: Story = {
  args: {
    severityLabel: "Critical Issue",
    severityLevel: "high",
    severityType: "badge",
    checked: true,
  },
};

export const BarType: Story = {
  args: {
    severityLabel: "Warning",
    severityLevel: "medium",
    severityType: "bar",
    checked: true,
  },
};

export const RTL: Story = {
  args: {
    severityLabel: "High Severity",
    severityLevel: "high",
    textDirection: TextDirection.Rtl,
  },
};

export const RTLChecked: Story = {
  args: {
    severityLabel: "Medium Severity",
    severityLevel: "medium",
    textDirection: TextDirection.Rtl,
    checked: true,
  },
};

export const RTLBarType: Story = {
  args: {
    severityLabel: "Critical Alert",
    severityLevel: "high",
    severityType: "bar",
    textDirection: TextDirection.Rtl,
    indeterminate: true,
  },
};

export const WithCount: Story = {
  args: {
    severityLabel: "Security Issues",
    severityLevel: "high",
    severityType: "badge",
    count: 5,
    alwaysShowCount: true,
    checked: true,
  },
};

export const WithCountBar: Story = {
  args: {
    severityLabel: "Warnings",
    severityLevel: "medium",
    severityType: "bar",
    count: 12,
    alwaysShowCount: true,
  },
};

export const RTLWithCount: Story = {
  args: {
    severityLabel: "Critical Issues",
    severityLevel: "high",
    severityType: "badge",
    textDirection: TextDirection.Rtl,
    count: 3,
    alwaysShowCount: true,
    indeterminate: true,
  },
};

export const AlwaysShowZeroCount: Story = {
  args: {
    severityLabel: "Resolved Issues",
    severityLevel: "low",
    count: 0,
    alwaysShowCount: true,
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
