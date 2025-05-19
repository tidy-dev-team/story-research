import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import React from "react";
import { Button, ButtonSize, ButtonType } from "./Button";
import LanguageIcon from "@mui/icons-material/Language";
import HeadphonesIcon from "@mui/icons-material/Headphones";

type ButtonStoryArgs = ComponentProps<typeof Button> & {
  hasLeadingIcon?: boolean;
  hasTrailingIcon?: boolean;
};

const meta = {
  title: "Component/Button/Button",
  component: Button,
  args: {
    label: "Button",
    type: ButtonType.Primary,
    size: ButtonSize.Medium,
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
      description: "The text content of the button",
      table: {
        category: "Content",
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
        [ButtonSize.Small]: "Small",
        [ButtonSize.Medium]: "Medium",
        [ButtonSize.Large]: "Large",
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
} satisfies Meta<ButtonStoryArgs>;

export default meta;

type Story = StoryObj<ButtonStoryArgs>;

const renderIcon = (
  condition: boolean | undefined,
  IconComponent: typeof LanguageIcon
) => {
  return condition ? <IconComponent sx={{ fontSize: "inherit" }} /> : undefined;
};

const renderStory = ({
  hasLeadingIcon,
  hasTrailingIcon,
  disabled,
  focused,
  ...args
}: ButtonStoryArgs) => (
  <Button
    {...args}
    disabled={disabled}
    focused={disabled ? false : focused}
    leadingIcon={renderIcon(hasLeadingIcon, LanguageIcon)}
    trailingIcon={renderIcon(hasTrailingIcon, HeadphonesIcon)}
  />
);

export const Primary: Story = {
  args: {
    type: ButtonType.Primary,
  },
  render: renderStory,
};

export const Secondary: Story = {
  args: {
    type: ButtonType.Secondary,
  },
  render: renderStory,
};

export const Ghost: Story = {
  args: {
    type: ButtonType.Ghost,
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
    disabled: false,
  },
  render: renderStory,
};

export const Disabled: Story = {
  args: {
    label: "Disabled Button",
    disabled: true,
    focused: false,
  },
  render: renderStory,
};

export const Interactive: Story = {
  args: {
    label: "Interactive Button",
    type: ButtonType.Primary,
    size: ButtonSize.Medium,
    hasLeadingIcon: true,
    hasTrailingIcon: false,
    rtl: false,
    disabled: false,
    focused: false,
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
  render: ({ hasLeadingIcon, hasTrailingIcon, disabled, focused, ...args }) => (
    <Button
      {...args}
      disabled={disabled}
      focused={disabled ? false : focused}
      leadingIcon={renderIcon(hasLeadingIcon, LanguageIcon)}
      trailingIcon={renderIcon(hasTrailingIcon, HeadphonesIcon)}
      onClick={(e) => console.log("Button clicked", e)}
    />
  ),
};
