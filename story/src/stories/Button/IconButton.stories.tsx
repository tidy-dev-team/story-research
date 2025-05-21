import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Button, ButtonSize, ButtonType } from "./IconButton";
import LanguageIcon from "@mui/icons-material/Language";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";

interface IconButtonStoryArgs {
  type?: ButtonType;
  size?: ButtonSize;
  iconName: keyof typeof iconMap;
  disabled?: boolean;
  focused?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const iconMap = {
  language: <LanguageIcon sx={{ fontSize: "inherit" }} />,
  headphones: <HeadphonesIcon sx={{ fontSize: "inherit" }} />,
  settings: <SettingsIcon sx={{ fontSize: "inherit" }} />,
  add: <AddIcon sx={{ fontSize: "inherit" }} />,
};

const meta = {
  title: "Component/Button/IconButton",
  component: Button,
  args: {
    type: ButtonType.Primary,
    size: ButtonSize.Medium,
    iconName: "language",
    disabled: false,
    focused: false,
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    iconName: {
      control: "select",
      options: Object.keys(iconMap),
      description: "Select an icon for the button",
      table: {
        category: "Content",
        defaultValue: { summary: "language" },
      },
    },
    type: {
      control: "radio",
      options: Object.values(ButtonType),
      description: "The type of the button",
      table: {
        category: "Appearance",
        defaultValue: { summary: ButtonType.Primary },
      },
      labels: {
        [ButtonType.Primary]: "Primary",
        [ButtonType.Secondary]: "Secondary",
        [ButtonType.Ghost]: "Ghost",
      },
    },
    size: {
      control: "radio",
      options: Object.values(ButtonSize),
      description: "The size of the button",
      table: {
        category: "Appearance",
        defaultValue: { summary: ButtonSize.Medium },
      },
      labels: {
        [ButtonSize.XSmall]: "XSmall (20px)",
        [ButtonSize.Small]: "Small (24px)",
        [ButtonSize.Medium]: "Medium (32px)",
        [ButtonSize.Large]: "Large (40px)",
      },
    },
    disabled: {
      control: "boolean",
      description: "Disables the button",
      table: {
        category: "State",
        defaultValue: { summary: "false" },
      },
    },
    focused: {
      control: "boolean",
      description: "Sets the focus state of the button",
      table: {
        category: "State",
        defaultValue: { summary: "false" },
      },
    },
    onClick: {
      action: "clicked",
      description: "Optional click handler",
      table: {
        category: "Events",
      },
    },
  },
} satisfies Meta<IconButtonStoryArgs>;

export default meta;

type Story = StoryObj<IconButtonStoryArgs>;

const renderStory = ({
  iconName,
  disabled,
  focused,
  ...args
}: IconButtonStoryArgs) => (
  <Button
    {...args}
    icon={iconMap[iconName]}
    disabled={disabled}
    focused={disabled ? false : focused}
  />
);

export const Primary: Story = {
  args: {
    type: ButtonType.Primary,
    iconName: "headphones",
  },
  render: renderStory,
};

export const Secondary: Story = {
  args: {
    type: ButtonType.Secondary,
    iconName: "settings",
  },
  render: renderStory,
};

export const Ghost: Story = {
  args: {
    type: ButtonType.Ghost,
    iconName: "language",
  },
  render: renderStory,
};

export const XSmall: Story = {
  name: "Size XSmall",
  args: {
    size: ButtonSize.XSmall,
    iconName: "add",
  },
  render: renderStory,
};

export const Small: Story = {
  name: "Size Small",
  args: {
    size: ButtonSize.Small,
    iconName: "language",
  },
  render: renderStory,
};

export const Large: Story = {
  name: "Size Large",
  args: {
    size: ButtonSize.Large,
    iconName: "headphones",
  },
  render: renderStory,
};