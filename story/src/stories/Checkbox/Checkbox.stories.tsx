import type { Meta, StoryObj } from "@storybook/react";
import { ComponentProps, useState, useEffect } from "react";
import { Checkbox, SeverityLevel, iconMap, IconName } from "./Checkbox";

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
    severity: undefined,
    icon: undefined,
    label: "Checkbox label",
    showCount: false,
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
    severity: {
      control: "select",
      options: [
        undefined,
        SeverityLevel.High,
        SeverityLevel.Medium,
        SeverityLevel.Low,
      ],
      description: "Severity level indicator",
      table: {
        category: "Appearance",
        defaultValue: { summary: "undefined" },
      },
    },
    icon: {
      control: "select",
      options: [undefined, ...Object.keys(iconMap)],
      description: "Optional icon to display after severity indicator",
      table: {
        category: "Appearance",
        defaultValue: { summary: "undefined" },
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
    showCount: {
      control: "boolean",
      description: "Whether to show count even when count is 0",
      table: {
        category: "Content",
        defaultValue: { summary: "false" },
      },
    },
    count: {
      control: "number",
      description: "Count value to display in brackets after label",
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

export const Checked: Story = {
  render: renderInteractiveCheckbox,
  args: {
    checked: true,
    label: "Checked option",
  },
};

export const Indeterminate: Story = {
  render: renderInteractiveCheckbox,
  args: {
    indeterminate: true,
    label: "Indeterminate option",
  },
};

export const Disabled: Story = {
  render: renderInteractiveCheckbox,
  args: {
    disabled: true,
    label: "Disabled option",
  },
};

export const DisabledChecked: Story = {
  render: renderInteractiveCheckbox,
  args: {
    checked: true,
    disabled: true,
    label: "Disabled checked",
  },
};

export const Focused: Story = {
  render: renderInteractiveCheckbox,
  args: {
    focused: true,
    label: "Focused option",
  },
};

export const FocusedChecked: Story = {
  render: renderInteractiveCheckbox,
  args: {
    checked: true,
    focused: true,
    label: "Focused checked",
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

// Severity Stories
export const WithSeverityHigh: Story = {
  render: renderInteractiveCheckbox,
  args: {
    label: "Item with high severity",
    severity: SeverityLevel.High,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Checkbox with high severity indicator displayed as a red square.",
      },
    },
  },
};

export const WithSeverityMedium: Story = {
  render: renderInteractiveCheckbox,
  args: {
    label: "Item with medium severity",
    severity: SeverityLevel.Medium,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Checkbox with medium severity indicator displayed as a yellow square.",
      },
    },
  },
};

export const WithSeverityLow: Story = {
  render: renderInteractiveCheckbox,
  args: {
    label: "Item with low severity",
    severity: SeverityLevel.Low,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Checkbox with low severity indicator displayed as a white square.",
      },
    },
  },
};

export const WithIcon: Story = {
  render: renderInteractiveCheckbox,
  args: {
    label: "Item with info icon",
    icon: "info" as IconName,
  },
  parameters: {
    docs: {
      description: {
        story: "Checkbox with an info icon displayed after the label.",
      },
    },
  },
};

export const WithSeverityAndIcon: Story = {
  render: renderInteractiveCheckbox,
  args: {
    label: "High priority item with warning",
    severity: SeverityLevel.High,
    icon: "warning" as IconName,
  },
  parameters: {
    docs: {
      description: {
        story: "Checkbox with both high severity indicator and warning icon.",
      },
    },
  },
};

export const WithSeverityRTL: Story = {
  render: renderInteractiveCheckbox,
  args: {
    label: "פריט עם חומרה",
    severity: SeverityLevel.High,
    rtl: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Checkbox with high severity indicator displayed in RTL layout. The severity indicator appears on the left side.",
      },
    },
  },
};

export const SeverityComparison: Story = {
  render: () => {
    const [checkedStates, setCheckedStates] = useState<{
      normal: boolean;
      severityHigh: boolean;
      severityMedium: boolean;
      severityLow: boolean;
      severityRtl: boolean;
    }>({
      normal: false,
      severityHigh: false,
      severityMedium: false,
      severityLow: false,
      severityRtl: false,
    });

    return (
      <div className="space-y-4 p-4">
        <h3 className="text-pz-system-fg-1 text-lg font-medium mb-4">
          Severity Indicator Comparison
        </h3>

        <div className="space-y-3">
          <Checkbox
            label="Normal checkbox"
            checked={checkedStates.normal}
            onChange={(e) =>
              setCheckedStates((prev) => ({
                ...prev,
                normal: e.target.checked,
              }))
            }
          />

          <Checkbox
            label="High severity indicator (red)"
            severity={SeverityLevel.High}
            checked={checkedStates.severityHigh}
            onChange={(e) =>
              setCheckedStates((prev) => ({
                ...prev,
                severityHigh: e.target.checked,
              }))
            }
          />

          <Checkbox
            label="Medium severity indicator (yellow)"
            severity={SeverityLevel.Medium}
            checked={checkedStates.severityMedium}
            onChange={(e) =>
              setCheckedStates((prev) => ({
                ...prev,
                severityMedium: e.target.checked,
              }))
            }
          />

          <Checkbox
            label="Low severity indicator (white)"
            severity={SeverityLevel.Low}
            checked={checkedStates.severityLow}
            onChange={(e) =>
              setCheckedStates((prev) => ({
                ...prev,
                severityLow: e.target.checked,
              }))
            }
          />

          <Checkbox
            label="חומרה גבוהה (RTL)"
            severity={SeverityLevel.High}
            rtl={true}
            checked={checkedStates.severityRtl}
            onChange={(e) =>
              setCheckedStates((prev) => ({
                ...prev,
                severityRtl: e.target.checked,
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
        story:
          "Comparison of normal checkbox and checkboxes with different severity levels (high, medium, low), including RTL layout.",
      },
    },
  },
};

// Count Stories
export const WithCount: Story = {
  render: renderInteractiveCheckbox,
  args: {
    label: "Items",
    showCount: true,
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

export const WithCountZero: Story = {
  render: renderInteractiveCheckbox,
  args: {
    label: "Empty items",
    showCount: true,
    count: 0,
  },
  parameters: {
    docs: {
      description: {
        story: "Checkbox with count of 0 displayed when showCount is true.",
      },
    },
  },
};

export const WithSeverityIconAndCount: Story = {
  render: renderInteractiveCheckbox,
  args: {
    label: "Critical issues",
    severity: SeverityLevel.High,
    icon: "warning" as IconName,
    showCount: true,
    count: 12,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Checkbox with severity indicator, icon, and count all displayed together.",
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
          <h3 className="text-pz-system-fg-1 font-semibold">Count Variations</h3>
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
            showCount={true}
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
            showCount={true}
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
            showCount={true}
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
