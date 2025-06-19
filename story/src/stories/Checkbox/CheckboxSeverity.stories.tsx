import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import React, { useState, useEffect } from "react";
import { action } from "@storybook/addon-actions";
import {
  CheckboxSeverity,
  SeverityLevel,
  SeverityType,
} from "./CheckboxSeverity";
import { CheckboxState } from "./Checkbox";
import { TextDirection } from "../textDirection";

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
    severityLevel: SeverityLevel.Medium,
    severityType: SeverityType.Badge,
    textDirection: TextDirection.Ltr,
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
      options: [SeverityLevel.High, SeverityLevel.Medium, SeverityLevel.Low],
      description: "The severity level",
      table: {
        category: "Severity",
        defaultValue: { summary: SeverityLevel.Medium },
      },
    },
    severityType: {
      control: "select",
      options: [SeverityType.Badge, SeverityType.Bar],
      description: "The type of severity indicator",
      table: {
        category: "Severity",
        defaultValue: { summary: SeverityType.Badge },
      },
    },
    textDirection: {
      control: "select",
      options: Object.values(TextDirection),
      description: "Text direction for RTL/LTR layout",
      table: {
        category: "Layout",
        defaultValue: { summary: "ltr" },
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
    severityLevel: SeverityLevel.Medium,
    severityType: SeverityType.Badge,
    count: 3,
  },
};

export const HighSeverityBadge: Story = {
  args: {
    state: CheckboxState.Checked,
    severityLevel: SeverityLevel.High,
    severityType: SeverityType.Badge,
    count: 12,
  },
};

export const LowSeverityBar: Story = {
  args: {
    state: CheckboxState.Indeterminate,
    severityLevel: SeverityLevel.Low,
    severityType: SeverityType.Bar,
    count: 2,
  },
};

export const RTLLayout: Story = {
  args: {
    state: CheckboxState.Checked,
    severityLevel: SeverityLevel.High,
    severityType: SeverityType.Badge,
    textDirection: TextDirection.Rtl,
    count: 5,
  },
};
