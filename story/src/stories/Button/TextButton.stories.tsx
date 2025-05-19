import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import React from "react";
import { TextButton } from "./TextButton";
import LanguageIcon from "@mui/icons-material/Language";
import HeadphonesIcon from "@mui/icons-material/Headphones";

/**
 * Story args include Button props plus controls for leading/trailing icons
 */
type ButtonStoryArgs = ComponentProps<typeof TextButton> & {
  hasLeadingIcon?: boolean;
  hasTrailingIcon?: boolean;
  disabled?: boolean;
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
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    rtl: {
      control: "boolean",
      description: "Right to left text direction",
      table: {
        category: "Content",
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
      table: {
        defaultValue: { summary: "false" },
      },
    },
    onClick: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<ButtonStoryArgs>;

export default meta;

type Story = StoryObj<ButtonStoryArgs>;

const renderIcon = (
  condition: boolean | undefined,
  Icon: typeof LanguageIcon
) => {
  return condition ? <Icon sx={{ fontSize: "14px" }} /> : undefined;
};

export const Default: Story = {
  args: {
    label: "Text Button",
  },
  render: ({ hasLeadingIcon, hasTrailingIcon, ...args }) => (
    <TextButton
      {...args}
      leadingIcon={renderIcon(hasLeadingIcon, LanguageIcon)}
      trailingIcon={renderIcon(hasTrailingIcon, HeadphonesIcon)}
    />
  ),
};

export const WithLeadingIcon: Story = {
  args: {
    label: "Visit Website",
    hasLeadingIcon: true,
  },
  render: ({ hasLeadingIcon, hasTrailingIcon, ...args }) => (
    <TextButton
      {...args}
      leadingIcon={renderIcon(hasLeadingIcon, LanguageIcon)}
      trailingIcon={renderIcon(hasTrailingIcon, HeadphonesIcon)}
    />
  ),
};

export const WithTrailingIcon: Story = {
  args: {
    label: "Next Page",
    hasTrailingIcon: true,
  },
  render: ({ hasLeadingIcon, hasTrailingIcon, ...args }) => (
    <TextButton
      {...args}
      leadingIcon={renderIcon(hasLeadingIcon, LanguageIcon)}
      trailingIcon={renderIcon(hasTrailingIcon, HeadphonesIcon)}
    />
  ),
};

export const RTL: Story = {
  args: {
    label: "טקסט",
    rtl: true,
    hasLeadingIcon: true,
  },
  render: ({ hasLeadingIcon, hasTrailingIcon, ...args }) => (
    <TextButton
      {...args}
      leadingIcon={renderIcon(hasLeadingIcon, LanguageIcon)}
      trailingIcon={renderIcon(hasTrailingIcon, HeadphonesIcon)}
    />
  ),
};

export const Focused: Story = {
  args: {
    label: "Focused Button",
    focused: true,
  },
  render: ({ hasLeadingIcon, hasTrailingIcon, ...args }) => (
    <TextButton
      {...args}
      leadingIcon={renderIcon(hasLeadingIcon, LanguageIcon)}
      trailingIcon={renderIcon(hasTrailingIcon, HeadphonesIcon)}
    />
  ),
};

export const Disabled: Story = {
  args: {
    label: "Disabled Button",
    disabled: true,
  },
  render: ({ hasLeadingIcon, hasTrailingIcon, ...args }) => (
    <TextButton
      {...args}
      leadingIcon={renderIcon(hasLeadingIcon, LanguageIcon)}
      trailingIcon={renderIcon(hasTrailingIcon, HeadphonesIcon)}
    />
  ),
};

/**
 * Interactive example for the documentation
 * This story allows users to modify props in real-time and see the changes
 */
export const Interactive: Story = {
  args: {
    label: "Interactive Text Button",
    hasLeadingIcon: true,
    hasTrailingIcon: false,
    rtl: false,
    disabled: false,
    focused: false,
  },
  parameters: {
    docs: {
      source: {
        code: `<TextButton 
  label="Interactive Text Button"
  leadingIcon={<LanguageIcon sx={{ fontSize: "14px" }} />}
  onClick={(e) => console.log('Text button clicked', e)}
/>`,
      },
    },
  },
  render: ({ hasLeadingIcon, hasTrailingIcon, ...args }) => (
    <TextButton
      {...args}
      leadingIcon={renderIcon(hasLeadingIcon, LanguageIcon)}
      trailingIcon={renderIcon(hasTrailingIcon, HeadphonesIcon)}
      onClick={(e) => console.log("Text button clicked", e)}
    />
  ),
};
