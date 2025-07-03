import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import React from "react";
import { action } from "@storybook/addon-actions";
import SettingsIcon from "@mui/icons-material/Settings";
import { DropdownListItem } from "./DropdownListItem";
import { TextDirection } from "../textDirection";

type DropdownListItemStoryArgs = ComponentProps<typeof DropdownListItem> & {
  showIcon?: boolean;
};

const meta: Meta<DropdownListItemStoryArgs> = {
  title: "Component/Dropdown/DropdownListItem",
  component: DropdownListItem,
  render: ({ showIcon, ...args }) => (
    <DropdownListItem
      {...args}
      icon={showIcon ? <SettingsIcon /> : undefined}
    />
  ),
  args: {
    label: "Sample List Item",
    textDirection: TextDirection.Ltr,
    showIcon: false,
    isDisabled: false,
    onSelect: action("onSelect"),
  },
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#22272B" },
        { name: "light", value: "#ffffff" },
      ],
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "The text to display in the list item",
      table: {
        category: "Content",
      },
    },
    textDirection: {
      control: "select",
      options: Object.values(TextDirection),
      description: "Text direction for RTL/LTR layout",
      table: {
        category: "Layout",
        defaultValue: { summary: TextDirection.Ltr },
      },
    },
    isDisabled: {
      control: "boolean",
      description: "Whether the item is disabled",
      table: {
        category: "State",
        defaultValue: { summary: "false" },
      },
    },
    onSelect: {
      action: "clicked",
      table: {
        category: "Events",
      },
    },
    showIcon: {
      control: "boolean",
      description: "Toggle the settings icon visibility",
      table: {
        category: "Content",
        defaultValue: { summary: "false" },
      },
    },
    icon: {
      table: { disable: true },
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<DropdownListItemStoryArgs>;

export const Default: Story = {
  args: {
    label: "Sample List Item",
  },
};

export const WithIcon: Story = {
  args: {
    label: "Settings",
    showIcon: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Option",
    isDisabled: true,
  },
};

export const RTL: Story = {
  args: {
    label: "Right-to-left",
    textDirection: TextDirection.Rtl,
  },
};
