import type { Meta, StoryObj } from "@storybook/react";
import { DropdownListItemMulti } from "./DropdownListItemMulti";
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
    alwaysShowCount: {
      control: "boolean",
      description: "Whether to always show count, even when count is 0",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
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
    textDirection: TextDirection.Rtl,
  },
};

export const RTLChecked: Story = {
  args: {
    label: "Label",
    textDirection: TextDirection.Rtl,
    checked: true,
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
    alwaysShowCount: true,
  },
};

export const WithCountAndIcon: Story = {
  args: {
    label: "Language packs",
    count: 12,
    alwaysShowCount: true,
    icon: <LanguageIcon sx={{ fontSize: 16 }} />,
    checked: true,
  },
};

export const RTLWithIcon: Story = {
  args: {
    label: "Enable multi-language support",
    textDirection: TextDirection.Rtl,
    icon: <LanguageIcon sx={{ fontSize: 16 }} />,
    checked: true,
  },
};

export const RTLWithCountAndIcon: Story = {
  args: {
    label: "Language packs",
    textDirection: TextDirection.Rtl,
    count: 8,
    alwaysShowCount: true,
    icon: <LanguageIcon sx={{ fontSize: 16 }} />,
    indeterminate: true,
  },
};

export const AlwaysShowZeroCount: Story = {
  args: {
    label: "Empty items",
    count: 0,
    alwaysShowCount: true,
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
