import type { Meta, StoryObj } from "@storybook/react";
import { ComponentProps, useState, useEffect } from "react";
import { Checkbox } from "./Checkbox";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import StarIcon from "@mui/icons-material/Star";

// Icon map for Storybook demos
export const iconMap = {
  info: <InfoIcon sx={{ fontSize: 16 }} />,
  warning: <WarningIcon sx={{ fontSize: 16 }} />,
  error: <ErrorIcon sx={{ fontSize: 16 }} />,
  star: <StarIcon sx={{ fontSize: 16 }} />,
} as const;

export type IconName = keyof typeof iconMap;

type CheckboxStoryArgs = ComponentProps<typeof Checkbox>;

// Common render function to eliminate code duplication
const renderInteractiveCheckbox = (args: CheckboxStoryArgs) => {
  const [checked, setChecked] = useState(args.checked || false);

  // Update internal state when args change (from Storybook controls)
  useEffect(() => {
    setChecked(args.checked || false);
  }, [args.checked]);

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
};

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
    icon: undefined,
    label: "Checkbox label",
    alwaysShowCount: false,
    count: 0,
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
    icon: {
      control: "select",
      options: [undefined, ...Object.keys(iconMap)],
      description: "Optional icon to display",
      table: {
        category: "Appearance",
        defaultValue: { summary: "undefined" },
      },
      mapping: {
        undefined: undefined,
        info: iconMap.info,
        warning: iconMap.warning,
        error: iconMap.error,
        star: iconMap.star,
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
    alwaysShowCount: {
      control: "boolean",
      description: "Whether to always show count, even when count is 0",
      table: {
        category: "Content",
        defaultValue: { summary: "false" },
      },
    },
    count: {
      control: { type: "number", min: 0 },
      description: "Count value to display in brackets after label (minimum 0)",
      table: {
        category: "Content",
        defaultValue: { summary: "0" },
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
  render: renderInteractiveCheckbox,
  args: {
    label: "Checkbox option",
  },
};

export const WithoutLabel: Story = {
  render: renderInteractiveCheckbox,
  args: {
    label: undefined,
  },
};

export const RTL: Story = {
  render: renderInteractiveCheckbox,
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
      <div>
        <h3 className="text-pz-system-fg-1 text-lg font-medium mb-4">
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
          <div className="text-pz-system-fg-1">
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

export const WithIcon: Story = {
  render: renderInteractiveCheckbox,
  args: {
    label: "Item with info icon",
    icon: iconMap.info,
  },
  parameters: {
    docs: {
      description: {
        story: "Checkbox with an info icon displayed after the label.",
      },
    },
  },
};

// Count Stories
export const WithCount: Story = {
  render: renderInteractiveCheckbox,
  args: {
    label: "Items",
    alwaysShowCount: true,
    count: 5,
  },
  parameters: {
    docs: {
      description: {
        story: "Checkbox with count displayed in brackets after the label.",
      },
    },
  },
};

export const CountComparison: Story = {
  render: () => {
    const [checkedStates, setCheckedStates] = useState({
      noCount: false,
      withCount: false,
      zeroCount: false,
      largeCount: false,
    });

    return (
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <h3 className="text-pz-system-fg-1 font-semibold">
            Count Variations
          </h3>
          <Checkbox
            label="No count"
            checked={checkedStates.noCount}
            onChange={(e) =>
              setCheckedStates((prev) => ({
                ...prev,
                noCount: e.target.checked,
              }))
            }
          />
          <Checkbox
            label="With count"
            alwaysShowCount={true}
            count={5}
            checked={checkedStates.withCount}
            onChange={(e) =>
              setCheckedStates((prev) => ({
                ...prev,
                withCount: e.target.checked,
              }))
            }
          />
          <Checkbox
            label="Zero count (shown)"
            alwaysShowCount={true}
            count={0}
            checked={checkedStates.zeroCount}
            onChange={(e) =>
              setCheckedStates((prev) => ({
                ...prev,
                zeroCount: e.target.checked,
              }))
            }
          />
          <Checkbox
            label="Large count"
            alwaysShowCount={true}
            count={999}
            checked={checkedStates.largeCount}
            onChange={(e) =>
              setCheckedStates((prev) => ({
                ...prev,
                largeCount: e.target.checked,
              }))
            }
          />
        </div>
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Comparison of checkboxes with different count configurations.",
      },
    },
  },
};
