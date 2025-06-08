import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import React from "react";
import { Button, ButtonSize, ButtonType } from "./IconButton";
import LanguageIcon from "@mui/icons-material/Language";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";

type IconButtonStoryArgs = ComponentProps<typeof Button> & {
  iconType?: keyof typeof iconMap;
};

const iconMap = {
  language: LanguageIcon,
  headphones: HeadphonesIcon,
  settings: SettingsIcon,
  add: AddIcon,
};

const meta = {
  title: "Component/Button/IconButton",
  component: Button,
  args: {
    type: ButtonType.Primary,
    size: ButtonSize.Medium,
    iconType: "language",
    disabled: false,
    focused: false,
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    iconType: {
      control: "select",
      options: Object.keys(iconMap),
      description: "Select an icon for the button",
      table: {
        category: "Content",
        defaultValue: { summary: "language" },
      },
      labels: {
        language: "Language",
        headphones: "Headphones",
        settings: "Settings",
        add: "Add",
      },
    },
    icon: {
      table: {
        disable: true,
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
        [ButtonSize.XSmall]: "xs",
        [ButtonSize.Small]: "s",
        [ButtonSize.Medium]: "m",
        [ButtonSize.Large]: "l",
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

const renderIcon = (iconType: keyof typeof iconMap | undefined) => {
  if (!iconType) return LanguageIcon;
  return iconMap[iconType];
};

const renderStory = ({
  iconType,
  disabled,
  focused,
  ...args
}: IconButtonStoryArgs) => (
  <Button
    {...args}
    icon={renderIcon(iconType)}
    disabled={disabled}
    focused={disabled ? false : focused}
  />
);

export const Primary: Story = {
  args: {
    type: ButtonType.Primary,
    iconType: "headphones",
  },
  render: renderStory,
};

export const Secondary: Story = {
  args: {
    type: ButtonType.Secondary,
    iconType: "settings",
  },
  render: renderStory,
};

export const Ghost: Story = {
  args: {
    type: ButtonType.Ghost,
    iconType: "language",
  },
  render: renderStory,
};

export const XSmall: Story = {
  name: "Size xs",
  args: {
    size: ButtonSize.XSmall,
    iconType: "add",
  },
  render: renderStory,
};

export const Small: Story = {
  name: "Size s",
  args: {
    size: ButtonSize.Small,
    iconType: "language",
  },
  render: renderStory,
};

export const Large: Story = {
  name: "Size l",
  args: {
    size: ButtonSize.Large,
    iconType: "headphones",
  },
  render: renderStory,
};
