import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import React from "react";
import { LinkButton } from "./LinkButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

type LinkButtonStoryArgs = ComponentProps<typeof LinkButton> & {
  hasTrailingIcon?: boolean;
};

const meta = {
  title: "Component/Button/LinkButton",
  component: LinkButton,
  args: {
    label: "Link Button",
    href: "https://www.example.com",
    hasTrailingIcon: false,
    rtl: false,
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
    hasTrailingIcon: {
      control: "boolean",
      description: "If true, a trailing icon is displayed.",
      table: {
        category: "Content",
        defaultValue: { summary: "false" },
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
    target: {
      control: "text",
      description:
        'Specifies where to open the linked document (e.g., "_blank").',
      table: {
        category: "Behavior",
      },
    },
    rel: {
      control: "text",
      description:
        "Specifies the relationship of the target object to the link object.",
      table: {
        category: "Behavior",
      },
    },
    rtl: {
      control: "boolean",
      description:
        "If true, the link button's text direction will be right-to-left.",
      table: {
        category: "Appearance",
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
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

const renderIcon = (
  condition: boolean | undefined,
  IconComponent: typeof ArrowForwardIcon
) => {
  return condition ? <IconComponent /> : undefined;
};

const renderStory = ({
  hasTrailingIcon,
  disabled,
  ...args
}: LinkButtonStoryArgs) => (
  <LinkButton
    {...args}
    disabled={disabled}
    trailingIcon={renderIcon(hasTrailingIcon, ArrowForwardIcon)}
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
    hasTrailingIcon: true,
  },
  render: renderStory,
};

export const RTL: Story = {
  args: {
    label: "קישור",
    href: "#",
    rtl: true,
    hasTrailingIcon: true,
  },
  render: renderStory,
};

export const Disabled: Story = {
  args: {
    label: "Disabled Link",
    href: "#",
    disabled: true,
    hasTrailingIcon: true,
  },
  render: renderStory,
};
