import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import React from "react";
import { IconButton, ButtonSize, ButtonType } from "./IconButton";
import LanguageIcon from "@mui/icons-material/Language";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";

type IconButtonStoryArgs = ComponentProps<typeof IconButton>;

const meta = {
  title: "Component/Button/IconButton",
  component: IconButton,
  args: {
    type: ButtonType.Primary,
    size: ButtonSize.Medium,
    disabled: false,
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
    onClick: {
      action: "clicked",
      description: "Optional click handler",
      table: {
        disable: true,
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
    icon: <HeadphonesIcon />,
  },
};

export const Secondary: Story = {
  args: {
    type: ButtonType.Secondary,
    icon: <SettingsIcon />,
  },
};

export const Ghost: Story = {
  args: {
    type: ButtonType.Ghost,
    icon: <LanguageIcon />,
  },
};

export const XSmall: Story = {
  name: "Size xs",
  args: {
    size: ButtonSize.XSmall,
    icon: <AddIcon />,
  },
};

export const Small: Story = {
  name: "Size s",
  args: {
    size: ButtonSize.Small,
    icon: <LanguageIcon />,
  },
};

export const Large: Story = {
  name: "Size l",
  args: {
    size: ButtonSize.Large,
    icon: <HeadphonesIcon />,
  },
};

export const Disabled: Story = {
  args: {
    type: ButtonType.Primary,
    icon: <SettingsIcon />,
    disabled: true,
  },
};
