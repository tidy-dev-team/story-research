import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import React from "react";
import { LinkButton } from "./LinkButton";
import LanguageIcon from "@mui/icons-material/Language";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"; // Using a different icon for variety

/**
 * Story args include LinkButton props plus controls for leading/trailing icons
 */
type LinkButtonStoryArgs = ComponentProps<typeof LinkButton> & {
  hasLeadingIcon?: boolean;
  hasTrailingIcon?: boolean;
  // disabled and focused are part of ComponentProps<typeof LinkButton>
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
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "The text content of the link button",
      table: {
        category: "Content",
      },
    },
    href: {
      control: "text",
      description: "The URL the link button points to",
      table: {
        category: "Content",
      },
    },
    rtl: {
      control: "boolean",
      description: "Right to left text direction",
      table: {
        category: "Appearance",
        defaultValue: { summary: "false" },
      },
    },
    hasLeadingIcon: {
      control: "boolean",
      description: "Show leading icon",
      table: {
        category: "Content",
        defaultValue: { summary: "false" },
      },
    },
    hasTrailingIcon: {
      control: "boolean",
      description: "Show trailing icon",
      table: {
        category: "Content",
        defaultValue: { summary: "false" },
      },
    },
    leadingIcon: {
      table: {
        disable: true,
      },
    },
    trailingIcon: {
      table: {
        disable: true,
      },
    },
    disabled: {
      control: "boolean",
      description: "Disables the link button",
      table: {
        category: "State",
        defaultValue: { summary: "false" },
      },
    },
    focused: {
      control: "boolean",
      description: "Sets the focus state of the link button",
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
  IconComponent: typeof LanguageIcon // Type for MUI SvgIconComponent
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
    focused={disabled ? false : focused} // Ensure focused is false if disabled
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
    label: "קישור", // Example RTL text
    href: "#",
    rtl: true,
    hasLeadingIcon: true,
  },
  render: renderStory,
};

export const Focused: Story = {
  args: {
    label: "Focused Link",
    href: "#",
    focused: true,
    disabled: false, // Ensure not disabled for focused story
  },
  render: renderStory,
};

export const Disabled: Story = {
  args: {
    label: "Disabled Link",
    href: "#", // Href is present but link will be non-interactive
    disabled: true,
    focused: false, // Explicitly set focused to false for disabled story
  },
  render: renderStory,
};

/**
 * Interactive example for the documentation
 * This story allows users to modify props in real-time and see the changes
 */
export const Interactive: Story = {
  args: {
    label: "Interactive Link",
    href: "https://storybook.js.org",
    hasLeadingIcon: true,
    hasTrailingIcon: false,
    rtl: false,
    disabled: false,
    focused: false,
  },
  parameters: {
    docs: {
      source: {
        code: `<LinkButton 
  label="Interactive Link"
  href="https://storybook.js.org"
  leadingIcon={<LanguageIcon sx={{ fontSize: "14px" }} />}
/>`,
      },
    },
  },
  render: ({ hasLeadingIcon, hasTrailingIcon, disabled, focused, ...args }) => (
    <LinkButton
      {...args}
      disabled={disabled}
      focused={disabled ? false : focused}
      leadingIcon={renderIcon(hasLeadingIcon, LanguageIcon)}
      trailingIcon={renderIcon(hasTrailingIcon, ArrowForwardIcon)}
    />
  ),
};
