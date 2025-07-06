import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import React from "react";
import { LinkButton } from "./LinkButton";
import { TextDirection } from "../textDirection";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

type LinkButtonStoryArgs = ComponentProps<typeof LinkButton> & {
  showTrailingIcon?: boolean;
};

const meta = {
  title: "Component/Button/LinkButton",
  component: LinkButton,
  args: {
    label: "Link Button",
    href: "https://www.example.com",
    showTrailingIcon: false,
    textDirection: TextDirection.Ltr,
    isDisabled: false,
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
      description: "The text content of the link button.",
      table: {
        category: "Content",
      },
    },
    href: {
      control: "text",
      description: "The URL that the link button points to.",
      table: {
        category: "Content",
      },
    },
    showTrailingIcon: {
      control: "boolean",
      description: "If true, a trailing icon is displayed.",
      table: {
        category: "Content",
        defaultValue: { summary: "false" },
      },
    },
    trailingIcon: {
      description:
        "The trailing icon element. Used internally when `showTrailingIcon` is true.",
      table: {
        category: "Content",
        disable: true,
      },
    },
    onClick: {
      action: "clicked",
      description: "Callback fired when the link button is clicked.",
      table: {
        category: "Events",
      },
    },
    textDirection: {
      control: "select",
      options: Object.values(TextDirection),
      description: "The text direction of the link button.",
      table: {
        category: "Appearance",
        defaultValue: { summary: "TextDirection.Ltr" },
      },
    },
    isDisabled: {
      control: "boolean",
      description:
        "If true, the link button will be disabled and non-interactive.",
      table: {
        category: "State",
        defaultValue: { summary: "false" },
      },
    },
  },
} satisfies Meta<LinkButtonStoryArgs>;

export default meta;

type Story = StoryObj<LinkButtonStoryArgs>;

const renderStory = ({
  showTrailingIcon,
  isDisabled,
  ...args
}: LinkButtonStoryArgs) => (
  <LinkButton
    {...args}
    isDisabled={isDisabled}
    trailingIcon={showTrailingIcon ? <ArrowForwardIcon /> : undefined}
  />
);

export const Default: Story = {
  args: {
    label: "Link Button",
    href: "#",
  },
  render: renderStory,
};

export const WithTrailingIcon: Story = {
  args: {
    label: "Visit Website",
    href: "#",
    showTrailingIcon: true,
  },
  render: renderStory,
};

export const RTL: Story = {
  args: {
    label: "קישור",
    href: "#",
    textDirection: TextDirection.Rtl,
    showTrailingIcon: true,
  },
  render: renderStory,
};

export const Disabled: Story = {
  args: {
    label: "Disabled Link",
    href: "#",
    isDisabled: true,
    showTrailingIcon: true,
  },
  render: renderStory,
};
