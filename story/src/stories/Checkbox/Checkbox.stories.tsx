import type { Meta, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";
import { Checkbox } from "./Checkbox";

type CheckboxStoryArgs = ComponentProps<typeof Checkbox>;

const meta: Meta<CheckboxStoryArgs> = {
  title: "Component/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    focused: false,
    rtl: false,
    label: "Checkbox option",
    labelSize: "md",
  },
  argTypes: {
    checked: {
      control: "boolean",
      description: "Whether the checkbox is checked",
      table: {
        category: "State",
        defaultValue: { summary: "false" },
      },
    },
    indeterminate: {
      control: "boolean",
      description: "Whether the checkbox is in indeterminate state",
      table: {
        category: "State",
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Whether the checkbox is disabled",
      table: {
        category: "State",
        defaultValue: { summary: "false" },
      },
    },
    focused: {
      control: "boolean",
      description: "Whether the checkbox shows focus state",
      table: {
        category: "State",
        defaultValue: { summary: "false" },
      },
    },
    rtl: {
      control: "boolean",
      description: "Whether to use right-to-left layout",
      table: {
        category: "Layout",
        defaultValue: { summary: "false" },
      },
    },
    label: {
      control: "text",
      description: "Optional label text for the checkbox",
      table: {
        category: "Content",
        defaultValue: { summary: "undefined" },
      },
    },
    labelSize: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the label text",
      table: {
        category: "Appearance",
        defaultValue: { summary: "md" },
      },
    },
    onChange: {
      action: "changed",
      description: "Callback fired when the checkbox is clicked",
      table: {
        category: "Events",
      },
    },
  },
};

export default meta;
type Story = StoryObj<CheckboxStoryArgs>;

export const Default: Story = {
  render: (args) => {
    const { useState } = require("react");
    const [checked, setChecked] = useState(args.checked || false);

    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked);
          args.onChange?.(e);
        }}
      />
    );
  },
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    focused: false,
    rtl: false,
    label: "Checkbox option",
    labelSize: "md",
  },
};

export const WithoutLabel: Story = {
  render: (args) => {
    const { useState } = require("react");
    const [checked, setChecked] = useState(args.checked || false);

    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked);
          args.onChange?.(e);
        }}
      />
    );
  },
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    focused: false,
    rtl: false,
    label: undefined,
    labelSize: "md",
  },
};

export const Checked: Story = {
  render: (args) => {
    const { useState } = require("react");
    const [checked, setChecked] = useState(args.checked || false);

    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked);
          args.onChange?.(e);
        }}
      />
    );
  },
  args: {
    checked: true,
    indeterminate: false,
    disabled: false,
    focused: false,
    rtl: false,
    label: "Checked option",
    labelSize: "md",
  },
};

export const Indeterminate: Story = {
  render: (args) => {
    const { useState } = require("react");
    const [checked, setChecked] = useState(args.checked || false);

    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked);
          args.onChange?.(e);
        }}
      />
    );
  },
  args: {
    checked: false,
    indeterminate: true,
    disabled: false,
    focused: false,
    rtl: false,
    label: "Indeterminate option",
    labelSize: "md",
  },
};

export const Disabled: Story = {
  render: (args) => {
    const { useState } = require("react");
    const [checked, setChecked] = useState(args.checked || false);

    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked);
          args.onChange?.(e);
        }}
      />
    );
  },
  args: {
    checked: false,
    indeterminate: false,
    disabled: true,
    focused: false,
    rtl: false,
    label: "Disabled option",
    labelSize: "md",
  },
};

export const DisabledChecked: Story = {
  render: (args) => {
    const { useState } = require("react");
    const [checked, setChecked] = useState(args.checked || false);

    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked);
          args.onChange?.(e);
        }}
      />
    );
  },
  args: {
    checked: true,
    indeterminate: false,
    disabled: true,
    focused: false,
    rtl: false,
    label: "Disabled checked",
    labelSize: "md",
  },
};

export const Focused: Story = {
  render: (args) => {
    const { useState } = require("react");
    const [checked, setChecked] = useState(args.checked || false);

    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked);
          args.onChange?.(e);
        }}
      />
    );
  },
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    focused: true,
    rtl: false,
    label: "Focused option",
    labelSize: "md",
  },
};

export const FocusedChecked: Story = {
  render: (args) => {
    const { useState } = require("react");
    const [checked, setChecked] = useState(args.checked || false);

    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked);
          args.onChange?.(e);
        }}
      />
    );
  },
  args: {
    checked: true,
    indeterminate: false,
    disabled: false,
    focused: true,
    rtl: false,
    label: "Focused checked",
    labelSize: "md",
  },
};

export const SmallLabel: Story = {
  render: (args) => {
    const { useState } = require("react");
    const [checked, setChecked] = useState(args.checked || false);

    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked);
          args.onChange?.(e);
        }}
      />
    );
  },
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    focused: false,
    rtl: false,
    label: "Small label",
    labelSize: "sm",
  },
};

export const LargeLabel: Story = {
  render: (args) => {
    const { useState } = require("react");
    const [checked, setChecked] = useState(args.checked || false);

    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked);
          args.onChange?.(e);
        }}
      />
    );
  },
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    focused: false,
    rtl: false,
    label: "Large label",
    labelSize: "lg",
  },
};

export const RTL: Story = {
  render: (args) => {
    const { useState } = require("react");
    const [checked, setChecked] = useState(args.checked || false);

    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked);
          args.onChange?.(e);
        }}
      />
    );
  },
  args: {
    checked: true,
    indeterminate: false,
    disabled: false,
    focused: false,
    rtl: true,
    label: "Right-to-left",
    labelSize: "md",
  },
};
