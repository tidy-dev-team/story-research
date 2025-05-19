import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import React from "react";
import { Button } from "./Button";
import { ButtonSize, ButtonType } from "./Button";
import LanguageIcon from "@mui/icons-material/Language";
import HeadphonesIcon from "@mui/icons-material/Headphones";

/**
 * Story args include Button props plus controls for leading/trailing icons
 */
type ButtonStoryArgs = ComponentProps<typeof Button> & {
  hasLeadingIcon?: boolean;
  hasTrailingIcon?: boolean;
  disabled?: boolean;
};

const meta = {
  title: "Component/Button/Button",
  component: Button,
  args: {
    label: "Button",
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
    size: {
      control: "radio",
      options: Object.values(ButtonSize),
      defaultValue: ButtonSize.Medium,
      labels: {
        [ButtonSize.Small]: "Small",
        [ButtonSize.Medium]: "Medium",
        [ButtonSize.Large]: "Large",
      },
    },
    type: {
      control: "radio",
      options: Object.values(ButtonType),
      defaultValue: ButtonType.Primary,
      labels: {
        [ButtonType.Primary]: "Primary",
        [ButtonType.Secondary]: "Secondary",
        [ButtonType.Ghost]: "Ghost",
      },
    },
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
  return condition ? <Icon sx={{ fontSize: "inherit" }} /> : undefined;
};

export const Primary: Story = {
  args: {
    type: ButtonType.Primary,
    size: ButtonSize.Medium,
  },
  render: ({ hasLeadingIcon, hasTrailingIcon, ...args }) => (
    <Button
      {...args}
      leadingIcon={renderIcon(hasLeadingIcon, LanguageIcon)}
      trailingIcon={renderIcon(hasTrailingIcon, HeadphonesIcon)}
    />
  ),
};

export const Secondary: Story = {
  args: {
    type: ButtonType.Secondary,
    size: ButtonSize.Medium,
  },
  render: ({ hasLeadingIcon, hasTrailingIcon, ...args }) => (
    <Button
      {...args}
      leadingIcon={renderIcon(hasLeadingIcon, LanguageIcon)}
      trailingIcon={renderIcon(hasTrailingIcon, HeadphonesIcon)}
    />
  ),
};

export const Ghost: Story = {
  args: {
    type: ButtonType.Ghost,
    size: ButtonSize.Medium,
  },
  render: ({ hasLeadingIcon, hasTrailingIcon, ...args }) => (
    <Button
      {...args}
      leadingIcon={renderIcon(hasLeadingIcon, LanguageIcon)}
      trailingIcon={renderIcon(hasTrailingIcon, HeadphonesIcon)}
    />
  ),
};

export const WithLeadingIcon: Story = {
  args: {
    type: ButtonType.Primary,
    size: ButtonSize.Medium,
    label: "Visit Website",
    hasLeadingIcon: true,
  },
  render: ({ hasLeadingIcon, hasTrailingIcon, ...args }) => (
    <Button
      {...args}
      leadingIcon={renderIcon(hasLeadingIcon, LanguageIcon)}
      trailingIcon={renderIcon(hasTrailingIcon, HeadphonesIcon)}
    />
  ),
};

export const WithTrailingIcon: Story = {
  args: {
    type: ButtonType.Primary,
    size: ButtonSize.Medium,
    label: "Next Page",
    hasTrailingIcon: true,
  },
  render: ({ hasLeadingIcon, hasTrailingIcon, ...args }) => (
    <Button
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
    label: "Interactive Button",
    type: ButtonType.Primary,
    size: ButtonSize.Medium,
    hasLeadingIcon: true,
    hasTrailingIcon: false,
    rtl: false,
    disabled: false,
  },
  parameters: {
    docs: {
      source: {
        code: `<Button 
  label="Interactive Button"
  type={ButtonType.Primary} 
  size={ButtonSize.Medium}
  leadingIcon={<LanguageIcon sx={{ fontSize: "inherit" }} />}
  onClick={(e) => console.log('Button clicked', e)}
/>`,
      },
    },
  },
  render: ({ hasLeadingIcon, hasTrailingIcon, ...args }) => (
    <Button
      {...args}
      leadingIcon={renderIcon(hasLeadingIcon, LanguageIcon)}
      trailingIcon={renderIcon(hasTrailingIcon, HeadphonesIcon)}
      onClick={(e) => console.log("Button clicked", e)}
    />
  ),
};
