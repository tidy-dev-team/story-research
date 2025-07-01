import type { Meta, StoryObj } from "@storybook/react";
import { ComponentProps, useState, useEffect } from "react";
import { Checkbox, CheckboxState } from "./Checkbox";
import LanguageIcon from "@mui/icons-material/Language";
import { TextDirection } from "../textDirection";

type CheckboxStoryArgs = ComponentProps<typeof Checkbox> & {
  showIcon?: boolean;
};

// Interactive component that properly uses hooks
const InteractiveCheckbox = (args: CheckboxStoryArgs) => {
  const [state, setState] = useState(args.state || CheckboxState.Unchecked);

  // Update internal state when args change (from Storybook controls)
  useEffect(() => {
    setState(args.state || CheckboxState.Unchecked);
  }, [args.state]);

  const { showIcon, ...checkboxProps } = args;

  return (
    <Checkbox
      {...checkboxProps}
      icon={showIcon ? <LanguageIcon sx={{ fontSize: 16 }} /> : undefined}
      state={state}
      onChange={(checked: boolean) => {
        // Handle state transitions properly
        let newState: CheckboxState;

        if (state === CheckboxState.Indeterminate) {
          // If indeterminate, always go to checked when clicked
          newState = CheckboxState.Checked;
        } else {
          // Normal toggle between checked/unchecked
          newState = checked ? CheckboxState.Checked : CheckboxState.Unchecked;
        }

        setState(newState);
        args.onChange?.(checked);
      }}
    />
  );
};

const meta: Meta<CheckboxStoryArgs> = {
  title: "Components/Checkbox/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    state: CheckboxState.Unchecked,
    isDisabled: false,
    textDirection: TextDirection.Ltr,
    showIcon: false,
    label: "Checkbox label",
    count: 0,
  },
  argTypes: {
    state: {
      control: "select",
      options: Object.values(CheckboxState),
      description: "The checkbox state",
      table: {
        category: "State",
        defaultValue: { summary: "CheckboxState.Unchecked" },
      },
    },
    isDisabled: {
      control: "boolean",
      description: "Whether the checkbox is disabled",
      table: {
        category: "State",
        defaultValue: { summary: "false" },
      },
    },
    textDirection: {
      control: "select",
      options: Object.values(TextDirection),
      description: "Whether to use right-to-left layout",
      table: {
        category: "Layout",
        defaultValue: { summary: "ltr" },
      },
    },
    showIcon: {
      control: "boolean",
      description: "Whether to show the language icon",
      table: {
        category: "Appearance",
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
    count: {
      control: { type: "number", min: 0 },
      description: "Count value to display in brackets after label (minimum 0)",
      table: {
        category: "Content",
        defaultValue: { summary: "0" },
      },
    },
    icon: {
      table: { disable: true },
      control: false,
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
  render: InteractiveCheckbox,
  args: {
    label: "Checkbox option",
  },
};

export const WithoutLabel: Story = {
  render: InteractiveCheckbox,
  args: {
    label: undefined,
  },
};

export const RTL: Story = {
  render: InteractiveCheckbox,
  args: {
    state: CheckboxState.Checked,
    isDisabled: false,
    textDirection: TextDirection.Rtl,
    label: "Right-to-left",
  },
};

export const WithLanguageIcon: Story = {
  render: InteractiveCheckbox,
  args: {
    label: "Enable multi-language support",
    icon: <LanguageIcon sx={{ fontSize: 16 }} />,
  },
  parameters: {
    docs: {
      description: {
        story: "Checkbox with a language icon displayed after the label.",
      },
    },
  },
};

// Count Stories
export const WithCount: Story = {
  render: InteractiveCheckbox,
  args: {
    label: "Items",
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

// Count comparison component
const CountComparisonDemo = () => {
  const [checkedStates, setCheckedStates] = useState({
    noCount: CheckboxState.Unchecked,
    withCount: CheckboxState.Unchecked,
    zeroCount: CheckboxState.Unchecked,
    largeCount: CheckboxState.Unchecked,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <h3 className="text-pz-system-fg-1 font-semibold">Count Variations</h3>
        <Checkbox
          label="No count"
          state={checkedStates.noCount}
          onChange={(checked: boolean) =>
            setCheckedStates((prev) => ({
              ...prev,
              noCount: checked
                ? CheckboxState.Checked
                : CheckboxState.Unchecked,
            }))
          }
        />
        <Checkbox
          label="With count"
          count={5}
          state={checkedStates.withCount}
          onChange={(checked: boolean) =>
            setCheckedStates((prev) => ({
              ...prev,
              withCount: checked
                ? CheckboxState.Checked
                : CheckboxState.Unchecked,
            }))
          }
        />
        <Checkbox
          label="Zero count (hidden)"
          count={0}
          state={checkedStates.zeroCount}
          onChange={(checked: boolean) =>
            setCheckedStates((prev) => ({
              ...prev,
              zeroCount: checked
                ? CheckboxState.Checked
                : CheckboxState.Unchecked,
            }))
          }
        />
        <Checkbox
          label="Large count"
          count={999}
          state={checkedStates.largeCount}
          onChange={(checked: boolean) =>
            setCheckedStates((prev) => ({
              ...prev,
              largeCount: checked
                ? CheckboxState.Checked
                : CheckboxState.Unchecked,
            }))
          }
        />
      </div>
    </div>
  );
};

export const CountComparison: Story = {
  render: CountComparisonDemo,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Comparison of checkboxes with different count configurations.",
      },
    },
  },
};
