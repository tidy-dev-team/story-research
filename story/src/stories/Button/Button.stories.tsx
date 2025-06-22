import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import React from "react";
import { Button, ButtonSize, ButtonType } from "./Button";
import LanguageIcon from "@mui/icons-material/Language";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import AddIcon from "@mui/icons-material/Add";
import { TextDirection } from "../textDirection";

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
    textDirection: TextDirection.Ltr,
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
    textDirection: {
      control: "select",
      options: Object.values(TextDirection),
      description: "Text direction for RTL/LTR layout",
      table: {
        category: "Appearance",
        defaultValue: { summary: TextDirection.Ltr },
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
  return condition ? <IconComponent /> : undefined;
};

const renderStory = ({
  hasLeadingIcon,
  hasTrailingIcon,
  disabled,
  ...args
}: ButtonStoryArgs) => (
  <Button
    {...args}
    disabled={disabled}
    leadingIcon={renderIcon(hasLeadingIcon, LanguageIcon)}
    trailingIcon={renderIcon(hasTrailingIcon, HeadphonesIcon)}
  />
);

export const Primary: Story = {
  args: {
    type: ButtonType.Primary,
    label: "Primary Button",
  },
  render: renderStory,
};

export const Secondary: Story = {
  args: {
    type: ButtonType.Secondary,
    label: "Secondary Button",
  },
  render: renderStory,
};

export const Ghost: Story = {
  args: {
    type: ButtonType.Ghost,
    label: "Ghost Button",
  },
  render: renderStory,
};

export const WithLeadingIcon: Story = {
  args: {
    type: ButtonType.Primary,
    label: "With Leading Icon",
    hasLeadingIcon: true,
  },
  render: renderStory,
};

export const WithTrailingIcon: Story = {
  args: {
    type: ButtonType.Secondary,
    label: "With Trailing Icon",
    hasTrailingIcon: true,
  },
  render: renderStory,
};

export const WithBothIcons: Story = {
  args: {
    type: ButtonType.Ghost,
    label: "Both Icons",
    hasLeadingIcon: true,
    hasTrailingIcon: true,
  },
  render: renderStory,
};

export const SmallSize: Story = {
  name: "Size Small",
  args: {
    size: ButtonSize.Small,
    label: "Small Button",
    hasLeadingIcon: true,
  },
  render: renderStory,
};

export const MediumSize: Story = {
  name: "Size Medium",
  args: {
    size: ButtonSize.Medium,
    label: "Medium Button",
    hasLeadingIcon: true,
  },
  render: renderStory,
};

export const LargeSize: Story = {
  name: "Size Large",
  args: {
    size: ButtonSize.Large,
    label: "Large Button",
    hasLeadingIcon: true,
  },
  render: renderStory,
};

export const RTL: Story = {
  args: {
    type: ButtonType.Primary,
    label: "زر عربي",
    textDirection: TextDirection.Rtl,
    hasLeadingIcon: true,
    hasTrailingIcon: true,
  },
  render: renderStory,
};

export const Disabled: Story = {
  args: {
    type: ButtonType.Primary,
    label: "Disabled Button",
    disabled: true,
    hasLeadingIcon: true,
    hasTrailingIcon: true,
  },
  render: renderStory,
};

// Icon sizing verification story
export const IconSizingTest: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-4">
      <h3 className="text-lg font-semibold">Icon Sizing Test</h3>

      <div className="flex flex-col gap-4">
        <div className="border-b pb-2">
          <h4 className="font-medium mb-2">
            Small Buttons (Should be 16px icons)
          </h4>
          <div className="flex gap-4 items-center">
            <Button
              size={ButtonSize.Small}
              label="Small"
              leadingIcon={<AddIcon />}
            />
            <Button
              size={ButtonSize.Small}
              label="Small"
              trailingIcon={<AddIcon />}
            />
            <Button
              size={ButtonSize.Small}
              label="Both"
              leadingIcon={<AddIcon />}
              trailingIcon={<AddIcon />}
            />
          </div>
        </div>

        <div className="border-b pb-2">
          <h4 className="font-medium mb-2">
            Medium Buttons (Should be 20px icons)
          </h4>
          <div className="flex gap-4 items-center">
            <Button
              size={ButtonSize.Medium}
              label="Medium"
              leadingIcon={<AddIcon />}
            />
            <Button
              size={ButtonSize.Medium}
              label="Medium"
              trailingIcon={<AddIcon />}
            />
            <Button
              size={ButtonSize.Medium}
              label="Both"
              leadingIcon={<AddIcon />}
              trailingIcon={<AddIcon />}
            />
          </div>
        </div>

        <div className="border-b pb-2">
          <h4 className="font-medium mb-2">
            Large Buttons (Should be 24px icons)
          </h4>
          <div className="flex gap-4 items-center">
            <Button
              size={ButtonSize.Large}
              label="Large"
              leadingIcon={<AddIcon />}
            />
            <Button
              size={ButtonSize.Large}
              label="Large"
              trailingIcon={<AddIcon />}
            />
            <Button
              size={ButtonSize.Large}
              label="Both"
              leadingIcon={<AddIcon />}
              trailingIcon={<AddIcon />}
            />
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-600 mt-4">
        <p>
          <strong>Expected:</strong> Small = 16px, Medium = 20px, Large = 24px
        </p>
        <p>Check the browser inspector to verify actual icon sizes.</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Test story to verify that icons are properly sized based on button size. Icons should be 16px for Small, 20px for Medium, and 24px for Large buttons.",
      },
    },
  },
};
