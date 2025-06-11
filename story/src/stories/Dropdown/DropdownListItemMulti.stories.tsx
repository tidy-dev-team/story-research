import type { Meta, StoryObj } from "@storybook/react";
import { DropdownListItemMulti } from "./DropdownListItemMulti";
import { useState } from "react";

const meta = {
  title: "Component/Dropdown/DropdownListItemMulti",
  component: DropdownListItemMulti,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Label text for the dropdown item",
      table: {
        type: { summary: "string" },
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
} satisfies Meta<typeof DropdownListItemMulti>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Label",
  },
};

export const Checked: Story = {
  args: {
    label: "Label",
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: "Label",
    indeterminate: true,
  },
};

export const RTL: Story = {
  args: {
    label: "Label",
    rtl: true,
  },
};

export const RTLChecked: Story = {
  args: {
    label: "Label",
    rtl: true,
    checked: true,
  },
};

export const Playground = {
  args: {
    label: "Interactive Label",
    checked: false,
  },
  render: (args: any) => {
    const [checked, setChecked] = useState(args.checked ?? false);
    return (
      <DropdownListItemMulti
        {...args}
        checked={checked}
        onSelect={setChecked}
      />
    );
  },
};
