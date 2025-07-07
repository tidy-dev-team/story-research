import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { action } from "@storybook/addon-actions";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import { DropdownListItem } from "./DropdownListItem";
import { TextDirection } from "../textDirection";

type DropdownListItemStoryArgs = React.ComponentProps<
  typeof DropdownListItem
> & {
  showIcon?: boolean;
  iconType?: "settings" | "person" | "home";
};

const iconMap = {
  settings: <SettingsIcon sx={{ fontSize: 16 }} />,
  person: <PersonIcon sx={{ fontSize: 16 }} />,
  home: <HomeIcon sx={{ fontSize: 16 }} />,
};

const meta = {
  title: "Component/Dropdown/DropdownListItem",
  component: DropdownListItem,
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
    showIcon: {
      control: "boolean",
      description: "Show an icon in the list item",
      table: {
        category: "Content",
        defaultValue: { summary: "false" },
      },
    },
    iconType: {
      control: "select",
      options: ["settings", "person", "home"],
      description: "Type of icon to display",
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
      action: "selected",
      description: "Callback when item is selected",
      table: {
        category: "Events",
      },
    },
  },
} satisfies Meta<DropdownListItemStoryArgs>;

export default meta;

type Story = StoryObj<DropdownListItemStoryArgs>;

export const Default: Story = {
  args: {
    label: "Sample List Item",
    showIcon: false,
    iconType: "settings",
    textDirection: TextDirection.Ltr,
    isDisabled: false,
    onSelect: action("onSelect"),
  },
  render: ({ showIcon, iconType, ...args }) => (
    <DropdownListItem
      {...args}
      icon={showIcon && iconType ? iconMap[iconType] : undefined}
    />
  ),
};

export const WithIcon: Story = {
  args: {
    label: "Settings",
    showIcon: true,
    iconType: "settings",
    textDirection: TextDirection.Ltr,
    isDisabled: false,
    onSelect: action("onSelect"),
  },
  render: ({ showIcon, iconType, ...args }) => (
    <DropdownListItem
      {...args}
      icon={showIcon && iconType ? iconMap[iconType] : undefined}
    />
  ),
};

export const Disabled: Story = {
  args: {
    label: "Disabled Item",
    showIcon: true,
    iconType: "person",
    textDirection: TextDirection.Ltr,
    isDisabled: true,
    onSelect: action("onSelect"),
  },
  render: ({ showIcon, iconType, ...args }) => (
    <DropdownListItem
      {...args}
      icon={showIcon && iconType ? iconMap[iconType] : undefined}
    />
  ),
};
