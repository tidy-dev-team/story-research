import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import React from "react";
import { TextButton } from "./TextButton";
import LanguageIcon from "@mui/icons-material/Language";
import HeadphonesIcon from "@mui/icons-material/Headphones";

type TextButtonStoryArgs = ComponentProps<typeof TextButton> & {
  hasLeadingIcon?: boolean;
  hasTrailingIcon?: boolean;
};

const meta = {
  title: "Component/Button/TextButton",
  component: TextButton,
  args: {
    label: "Text Button",
    hasLeadingIcon: false,
    hasTrailingIcon: false,
    rtl: false,
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
    label: {
      control: "text",
      description: "The text content of the button.",
      table: {
        category: "Content",
      },
    },
    hasLeadingIcon: {
      control: "boolean",
      description: "If true, a leading icon is displayed.",
      table: {
        category: "Content",
        defaultValue: { summary: "false" },
      },
    },
    hasTrailingIcon: {
      control: "boolean",
      description: "If true, a trailing icon is displayed.",
      table: {
        category: "Content",
        defaultValue: { summary: "false" },
      },
    },
    leadingIcon: {
      description:
        "The leading icon element. Used internally when `hasLeadingIcon` is true.",
      table: {
        category: "Content",
        disable: true,
      },
    },
    trailingIcon: {
      description:
        "The trailing icon element. Used internally when `hasTrailingIcon` is true.",
      table: {
        category: "Content",
        disable: true,
      },
    },
    rtl: {
      control: "boolean",
      description:
        "If true, the button's text direction will be right-to-left.",
      table: {
        category: "Appearance",
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: "boolean",
      description: "If true, the button will be disabled and non-interactive.",
      table: {
        category: "State",
        defaultValue: { summary: "false" },
      },
    },
    focused: {
      control: "boolean",
      description: "If true, the button will be displayed in a focused state.",
      table: {
        category: "State",
        defaultValue: { summary: "false" },
      },
    },
    onClick: {
      action: "clicked",
      description: "Optional click handler.",
      table: {
        category: "Events",
      },
    },
  },
} satisfies Meta<TextButtonStoryArgs>;

export default meta;

type Story = StoryObj<TextButtonStoryArgs>;

const renderIcon = (
  condition: boolean | undefined,
  Icon: typeof LanguageIcon
) => {
  return condition ? <Icon sx={{ fontSize: "14px" }} /> : undefined;
};

const renderStory = ({
  hasLeadingIcon,
  hasTrailingIcon,
  disabled,
  focused,
  ...args
}: TextButtonStoryArgs) => (
  <TextButton
    {...args}
    disabled={disabled}
    focused={disabled ? false : focused}
    leadingIcon={renderIcon(hasLeadingIcon, LanguageIcon)}
    trailingIcon={renderIcon(hasTrailingIcon, HeadphonesIcon)}
  />
);

export const Default: Story = {
  args: {
    label: "Text Button",
  },
  render: renderStory,
};

export const WithLeadingIcon: Story = {
  args: {
    label: "Visit Website",
    hasLeadingIcon: true,
  },
  render: renderStory,
};

export const WithTrailingIcon: Story = {
  args: {
    label: "Next Page",
    hasTrailingIcon: true,
  },
  render: renderStory,
};

export const RTL: Story = {
  args: {
    label: "טקסט",
    rtl: true,
    hasLeadingIcon: true,
  },
  render: renderStory,
};
