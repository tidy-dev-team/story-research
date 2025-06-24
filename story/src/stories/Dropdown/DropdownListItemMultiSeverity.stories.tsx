import type { Meta, StoryObj } from "@storybook/react";
import { DropdownListItemMultiSeverity } from "./DropdownListItemMultiSeverity";
import { SeverityLevel, SeverityType } from "../Severity/Severity";
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
    severityLevel: {
      control: "select",
      options: Object.values(SeverityLevel),
      description: "Severity level",
      table: { type: { summary: "SeverityLevel" } },
    },
    severityType: {
      control: "select",
      options: Object.values(SeverityType),
      description: "Severity indicator type",
      table: {
        type: { summary: "SeverityType" },
        defaultValue: { summary: "SeverityType.Badge" },
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
  },
} satisfies Meta<typeof DropdownListItemMultiSeverity>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    severityLevel: SeverityLevel.High,
  },
};

export const Checked: Story = {
  args: {
    severityLevel: SeverityLevel.Medium,
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    severityLevel: SeverityLevel.Low,
    indeterminate: true,
  },
};

export const BadgeType: Story = {
  args: {
    severityLevel: SeverityLevel.High,
    severityType: SeverityType.Badge,
    checked: true,
  },
};

export const BarType: Story = {
  args: {
    severityLevel: SeverityLevel.Medium,
    severityType: SeverityType.Bar,
    checked: true,
  },
};

export const RTL: Story = {
  args: {
    severityLevel: SeverityLevel.High,
    textDirection: TextDirection.Rtl,
  },
};

export const RTLChecked: Story = {
  args: {
    severityLevel: SeverityLevel.Medium,
    textDirection: TextDirection.Rtl,
    checked: true,
  },
};

export const RTLBarType: Story = {
  args: {
    severityLevel: SeverityLevel.High,
    severityType: SeverityType.Bar,
    textDirection: TextDirection.Rtl,
    indeterminate: true,
  },
};

export const WithCount: Story = {
  args: {
    severityLevel: SeverityLevel.High,
    severityType: SeverityType.Badge,
    count: 5,
    checked: true,
  },
};

export const WithCountBar: Story = {
  args: {
    severityLevel: SeverityLevel.Medium,
    severityType: SeverityType.Bar,
    count: 12,
  },
};

export const RTLWithCount: Story = {
  args: {
    severityLevel: SeverityLevel.High,
    severityType: SeverityType.Badge,
    textDirection: TextDirection.Rtl,
    count: 3,
    indeterminate: true,
  },
};

export const AlwaysShowZeroCount: Story = {
  args: {
    severityLevel: SeverityLevel.Low,
    count: 0,
  },
};

export const Playground = {
  args: {
    severityLevel: SeverityLevel.Medium,
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
