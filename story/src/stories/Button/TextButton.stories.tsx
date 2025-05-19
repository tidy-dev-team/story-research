import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import React from "react";
import { TextButton } from "./TextButton";
import LanguageIcon from "@mui/icons-material/Language";
import HeadphonesIcon from "@mui/icons-material/Headphones";

/**
 * Story args include Button props plus controls for leading/trailing icons
 */
// 'type' was already removed by user, 'size' was removed previously.
// 'disabled' is now part of VariantProps for TextButton, so it's included.
// 'focused' is also part of VariantProps.
type TextButtonStoryArgs = ComponentProps<typeof TextButton> & {
  hasLeadingIcon?: boolean;
  hasTrailingIcon?: boolean;
  // disabled is now directly part of ComponentProps<typeof TextButton>
  // focused is now directly part of ComponentProps<typeof TextButton>
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
    focused: false, // Add focused to default args
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    // Remove 'type' from argTypes as it's no longer a prop
    // Remove 'size' from argTypes as it's no longer a prop
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
      description: "Disables the button", // Add description
      table: {
        category: "State", // Categorize under State
        defaultValue: { summary: "false" },
      },
    },
    focused: { // Add focused to argTypes
      control: "boolean",
      description: "Sets the focus state of the button",
      table: {
        category: "State",
        defaultValue: { summary: "false" },
      },
    },
    onClick: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<TextButtonStoryArgs>;

export default meta;

type Story = StoryObj<TextButtonStoryArgs>;

const renderIcon = (
  condition: boolean | undefined,
  Icon: typeof LanguageIcon // Assuming LanguageIcon is a SvgIconComponent
) => {
  return condition ? <Icon sx={{ fontSize: "14px" }} /> : undefined;
};

// Updated render function for all stories to handle focused and disabled state
const renderStory = ({ hasLeadingIcon, hasTrailingIcon, disabled, focused, ...args }: TextButtonStoryArgs) => (
  <TextButton
    {...args}
    disabled={disabled} // Pass disabled directly
    focused={disabled ? false : focused} // Ensure focused is false if disabled
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

export const Focused: Story = {
  args: {
    label: "Focused Button",
    focused: true,
    disabled: false, // Ensure not disabled for focused story
  },
  render: renderStory,
};

export const Disabled: Story = {
  args: {
    label: "Disabled Button",
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
  render: ({ hasLeadingIcon, hasTrailingIcon, disabled, focused, ...args }) => (
    <TextButton
      {...args}
      disabled={disabled}
      focused={disabled ? false : focused}
      leadingIcon={renderIcon(hasLeadingIcon, LanguageIcon)}
      trailingIcon={renderIcon(hasTrailingIcon, HeadphonesIcon)}
      onClick={(e) => console.log("Text button clicked", e)}
    />
  ),
};
