import type { Meta, StoryObj } from "@storybook/react";
import { DropdownListItemMulti } from "./DropdownListItemMulti";
import { CheckboxState } from "../Checkbox/Checkbox";
import { TextDirection } from "../textDirection";
import { useState } from "react";
import LanguageIcon from "@mui/icons-material/Language";

const meta = {
  title: "Component/Dropdown/DropdownListItemMulti",
  component: DropdownListItemMulti,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  render: (args: any) => {
    const [checkboxState, setCheckboxState] = useState(
      args.checkboxState ?? CheckboxState.Unchecked
    );
    return (
      <DropdownListItemMulti
        {...args}
        checkboxState={checkboxState}
        onSelect={setCheckboxState}
      />
    );
  },
  argTypes: {
    label: {
      control: "text",
      description: "Label text for the dropdown item",
      table: {
        type: { summary: "string" },
      },
    },
    checkboxState: {
      control: "select",
      options: Object.values(CheckboxState),
      description: "The state of the checkbox",
      table: {
        type: { summary: "CheckboxState" },
        defaultValue: { summary: CheckboxState.Unchecked },
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
      description: "Count value to display in brackets after label",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "undefined" },
      },
    },
    icon: {
      table: { disable: true },
      control: false,
      description: "Icon to display after the checkbox label",
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
    checkboxState: CheckboxState.Checked,
  },
};

export const Indeterminate: Story = {
  args: {
    label: "Label",
    checkboxState: CheckboxState.Indeterminate,
  },
};

export const RTL: Story = {
  args: {
    label: "Label",
    textDirection: TextDirection.Rtl,
  },
};

export const RTLChecked: Story = {
  args: {
    label: "Label",
    textDirection: TextDirection.Rtl,
    checkboxState: CheckboxState.Checked,
  },
};

export const WithIcon: Story = {
  args: {
    label: "Enable multi-language support",
    icon: <LanguageIcon sx={{ fontSize: 16 }} />,
  },
};

export const WithCount: Story = {
  args: {
    label: "Items",
    count: 5,
  },
};

export const WithCountAndIcon: Story = {
  args: {
    label: "Language packs",
    count: 12,
    icon: <LanguageIcon sx={{ fontSize: 16 }} />,
    checkboxState: CheckboxState.Checked,
  },
};

export const RTLWithIcon: Story = {
  args: {
    label: "Enable multi-language support",
    textDirection: TextDirection.Rtl,
    icon: <LanguageIcon sx={{ fontSize: 16 }} />,
    checkboxState: CheckboxState.Checked,
  },
};

export const RTLWithCountAndIcon: Story = {
  args: {
    label: "Language packs",
    textDirection: TextDirection.Rtl,
    count: 8,
    icon: <LanguageIcon sx={{ fontSize: 16 }} />,
    checkboxState: CheckboxState.Indeterminate,
  },
};

export const AlwaysShowZeroCount: Story = {
  args: {
    label: "Empty items",
    count: 0,
  },
};

export const Playground: Story = {
  args: {
    label: "Interactive Label",
    checkboxState: CheckboxState.Unchecked,
  },
};
