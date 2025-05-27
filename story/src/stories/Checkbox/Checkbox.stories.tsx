import type { Meta, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";
import { Checkbox } from "./Checkbox";
import { useState } from "react";

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
    label: "Checkbox label",
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
  },
};

export const KeyboardNavigation: Story = {
  render: () => {
    const [checkboxStates, setCheckboxStates] = useState({
      checkbox1: false,
      checkbox2: true,
      checkbox3: false,
      checkbox4: false,
    });

    return (
      <div className="space-y-4 bg-[#101010] p-6 rounded-lg">
        <h3 className="text-white text-lg font-medium mb-4">
          Use Tab to navigate and Space to toggle
        </h3>
        <div className="space-y-3">
          <Checkbox
            label="Option 1"
            checked={checkboxStates.checkbox1}
            onChange={(e) =>
              setCheckboxStates((prev) => ({
                ...prev,
                checkbox1: e.target.checked,
              }))
            }
          />
          <Checkbox
            label="Option 2 (initially checked)"
            checked={checkboxStates.checkbox2}
            onChange={(e) =>
              setCheckboxStates((prev) => ({
                ...prev,
                checkbox2: e.target.checked,
              }))
            }
          />
          <Checkbox
            label="Option 3"
            checked={checkboxStates.checkbox3}
            onChange={(e) =>
              setCheckboxStates((prev) => ({
                ...prev,
                checkbox3: e.target.checked,
              }))
            }
          />
          <Checkbox
            label="Disabled Option"
            checked={checkboxStates.checkbox4}
            disabled={true}
            onChange={(e) =>
              setCheckboxStates((prev) => ({
                ...prev,
                checkbox4: e.target.checked,
              }))
            }
          />
        </div>
        <div className="mt-4 text-sm text-gray-400">
          <div>
            Checked:{" "}
            {Object.entries(checkboxStates)
              .filter(([_, checked]) => checked)
              .map(([key]) => key)
              .join(", ") || "none"}
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates keyboard accessibility. Use Tab to navigate between checkboxes and Space or Enter to toggle them. Disabled checkboxes are skipped during keyboard navigation.",
      },
    },
  },
};
