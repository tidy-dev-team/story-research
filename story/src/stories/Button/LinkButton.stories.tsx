import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import React from "react";
import { LinkButton } from "./LinkButton";
import LanguageIcon from "@mui/icons-material/Language";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

type LinkButtonStoryArgs = ComponentProps<typeof LinkButton> & {
  hasLeadingIcon?: boolean;
  hasTrailingIcon?: boolean;
};

const meta = {
  title: "Component/Button/LinkButton",
  component: LinkButton,
  args: {
    label: "Link Button",
    href: "https://www.example.com",
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
    focused: {
      control: "boolean",
      description:
        "If true, the link button will be displayed in a focused state.",
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
  IconComponent: typeof LanguageIcon
) => {
  return condition ? <IconComponent sx={{ fontSize: "14px" }} /> : undefined;
};

const renderStory = ({
  hasLeadingIcon,
  hasTrailingIcon,
  disabled,
  focused,
  ...args
}: LinkButtonStoryArgs) => (
  <LinkButton
    {...args}
    disabled={disabled}
    focused={disabled ? false : focused}
    leadingIcon={renderIcon(hasLeadingIcon, LanguageIcon)}
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

export const WithLeadingIcon: Story = {
  args: {
    label: "Visit Website",
    href: "#",
    hasLeadingIcon: true,
  },
  render: renderStory,
};

export const WithTrailingIcon: Story = {
  args: {
    label: "Read More",
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
    hasLeadingIcon: true,
  },
  render: renderStory,
};
