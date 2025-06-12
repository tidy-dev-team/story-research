import type { Meta, StoryObj } from "@storybook/react";
import { ComponentProps, useState, useEffect } from "react";
import Checkbox, { CheckboxState } from "./Checkbox";
import LanguageIcon from "@mui/icons-material/Language";

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
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        const newState = e.target.checked
          ? CheckboxState.Checked
          : CheckboxState.Unchecked;
        setState(newState);
        args.onChange?.(e);
      }}
    />
  );
};

const meta: Meta<CheckboxStoryArgs> = {
  title: "Component/Checkbox/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    state: CheckboxState.Unchecked,
    disabled: false,
    focused: false,
    rtl: false,
    showIcon: false,
    label: "Checkbox label",
    alwaysShowCount: false,
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
    disabled: false,
    focused: false,
    rtl: true,
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCheckedStates((prev) => ({
              ...prev,
              noCount: e.target.checked
                ? CheckboxState.Checked
                : CheckboxState.Unchecked,
            }))
          }
        />
        <Checkbox
          label="With count"
          alwaysShowCount={true}
          count={5}
          state={checkedStates.withCount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCheckedStates((prev) => ({
              ...prev,
              withCount: e.target.checked
                ? CheckboxState.Checked
                : CheckboxState.Unchecked,
            }))
          }
        />
        <Checkbox
          label="Zero count (shown)"
          alwaysShowCount={true}
          count={0}
          state={checkedStates.zeroCount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCheckedStates((prev) => ({
              ...prev,
              zeroCount: e.target.checked
                ? CheckboxState.Checked
                : CheckboxState.Unchecked,
            }))
          }
        />
        <Checkbox
          label="Large count"
          alwaysShowCount={true}
          count={999}
          state={checkedStates.largeCount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCheckedStates((prev) => ({
              ...prev,
              largeCount: e.target.checked
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
