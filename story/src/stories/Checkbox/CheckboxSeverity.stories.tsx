import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import React, { useState, useEffect } from "react";
import { action } from "@storybook/addon-actions";
import { CheckboxSeverity } from "./CheckboxSeverity";
import { CheckboxState } from "./Checkbox";

type CheckboxSeverityStoryArgs = ComponentProps<typeof CheckboxSeverity>;

const InteractiveCheckboxSeverity = (args: CheckboxSeverityStoryArgs) => {
  const [state, setState] = useState(args.state || CheckboxState.Unchecked);

  useEffect(() => {
    setState(args.state || CheckboxState.Unchecked);
  }, [args.state]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newState = event.target.checked
      ? CheckboxState.Checked
      : CheckboxState.Unchecked;
    setState(newState);
    action("onChange")(event);
  };

  return <CheckboxSeverity {...args} state={state} onChange={handleChange} />;
};

const meta = {
  title: "Component/Checkbox/CheckboxSeverity",
  component: InteractiveCheckboxSeverity,
  args: {
    state: CheckboxState.Unchecked,
    severityLevel: "medium",
    severityType: "badge",
    rtl: false,
    alwaysShowCount: false,
    count: 3,
    onChange: action("onChange"),
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
    count: 3,
  },
};

export const HighSeverityBadge: Story = {
  args: {
    state: CheckboxState.Checked,
    severityLevel: "high",
    severityType: "badge",
    count: 12,
  },
};

export const LowSeverityBar: Story = {
  args: {
    state: CheckboxState.Indeterminate,
    severityLevel: "low",
    severityType: "bar",
    count: 2,
  },
};

export const RTLLayout: Story = {
  args: {
    state: CheckboxState.Checked,
    severityLevel: "high",
    severityType: "badge",
    rtl: true,
    count: 5,
  },
};

export const WithAlwaysShowCount: Story = {
  args: {
    state: CheckboxState.Unchecked,
    severityLevel: "medium",
    severityType: "badge",
    alwaysShowCount: true,
    count: 0,
  },
};
