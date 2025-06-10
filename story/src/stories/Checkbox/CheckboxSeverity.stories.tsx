import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import React from "react";
import { CheckboxSeverity } from "./CheckboxSeverity";
import { CheckboxState } from "./Checkbox";

type CheckboxSeverityStoryArgs = ComponentProps<typeof CheckboxSeverity>;

const meta = {
  title: "Component/Checkbox/CheckboxSeverity",
  component: CheckboxSeverity,
  args: {
    state: CheckboxState.Unchecked,
    severityLevel: "medium",
    severityType: "badge",
    severityLabel: "Medium Issue",
    disabled: false,
    rtl: false,
    alwaysShowCount: false,
    count: 3,
    onChange: () => {},
  },
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#22272B" },
        { name: "light", value: "#ffffff" },
      ],
    },
  },
  tags: ["autodocs"],
  argTypes: {
    state: {
      control: "select",
      options: Object.values(CheckboxState),
      description: "The state of the checkbox",
      table: {
        category: "Checkbox",
        defaultValue: { summary: CheckboxState.Unchecked },
      },
    },
    severityLevel: {
      control: "select",
      options: ["high", "medium", "low"],
      description: "The severity level",
      table: {
        category: "Severity",
        defaultValue: { summary: "medium" },
      },
    },
    severityType: {
      control: "select",
      options: ["badge", "bar"],
      description: "The type of severity indicator",
      table: {
        category: "Severity",
        defaultValue: { summary: "badge" },
      },
    },
    severityLabel: {
      control: "text",
      description: "The label text for the severity",
      table: {
        category: "Severity",
      },
    },
    disabled: {
      control: "boolean",
      description: "Whether the component is disabled",
      table: {
        category: "State",
        defaultValue: { summary: "false" },
      },
    },
    rtl: {
      control: "boolean",
      description: "Right-to-left layout",
      table: {
        category: "Layout",
        defaultValue: { summary: "false" },
      },
    },
    alwaysShowCount: {
      control: "boolean",
      description: "Always show count even if 0",
      table: {
        category: "Count",
        defaultValue: { summary: "false" },
      },
    },
    count: {
      control: "number",
      description: "Count number to display",
      table: {
        category: "Count",
        defaultValue: { summary: "0" },
      },
    },
    onChange: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<CheckboxSeverityStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    state: CheckboxState.Unchecked,
    severityLevel: "medium",
    severityType: "badge",
    severityLabel: "Medium Issue",
    count: 3,
  },
};
