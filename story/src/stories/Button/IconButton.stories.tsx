import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import React from "react";
import { Button, ButtonSize, ButtonType } from "./IconButton";
import LanguageIcon from "@mui/icons-material/Language";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";

type IconButtonStoryArgs = ComponentProps<typeof Button>;

const meta = {
  title: "Component/Button/IconButton",
  component: Button,
  args: {
    type: ButtonType.Primary,
    size: ButtonSize.Medium,
    disabled: false,
    focused: false,
  },
  parameters: {
    layout: "centered",
    docs: {
      source: {
        state: "open",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
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

export const Primary: Story = {
  args: {
    type: ButtonType.Primary,
    icon: <HeadphonesIcon sx={{ fontSize: "inherit" }} />,
  },
};

export const Secondary: Story = {
  args: {
    type: ButtonType.Secondary,
    icon: <SettingsIcon sx={{ fontSize: "inherit" }} />,
  },
};

export const Ghost: Story = {
  args: {
    type: ButtonType.Ghost,
    icon: <LanguageIcon sx={{ fontSize: "inherit" }} />,
  },
};

export const XSmall: Story = {
  name: "Size xs",
  args: {
    size: ButtonSize.XSmall,
    icon: <AddIcon sx={{ fontSize: "inherit" }} />,
  },
};

export const Small: Story = {
  name: "Size s",
  args: {
    size: ButtonSize.Small,
    icon: <LanguageIcon sx={{ fontSize: "inherit" }} />,
  },
};

export const Large: Story = {
  name: "Size l",
  args: {
    size: ButtonSize.Large,
    icon: <HeadphonesIcon sx={{ fontSize: "inherit" }} />,
  },
};
