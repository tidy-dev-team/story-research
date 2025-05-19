import type { Meta, StoryObj } from "@storybook/react";
// import type { ComponentProps } from "react"; // No longer needed directly for Omit if IconButtonProps is imported
import React from "react";
import { Button, ButtonSize, ButtonType } from "./IconButton"; // Assuming Button is the exported component name from IconButton.tsx
import LanguageIcon from "@mui/icons-material/Language";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add"; // Example for XSmall

// Define a type for the props of the IconButton component if not directly exported or to augment
// For this story, we'll define what's needed.
interface IconButtonStoryArgs {
  type?: ButtonType;
  size?: ButtonSize;
  iconName: keyof typeof iconMap;
  disabled?: boolean;
  focused?: boolean; // Added focused to argTypes if controllable
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const iconMap = {
  language: <LanguageIcon sx={{ fontSize: "inherit" }} />,
  headphones: <HeadphonesIcon sx={{ fontSize: "inherit" }} />,
  settings: <SettingsIcon sx={{ fontSize: "inherit" }} />,
  add: <AddIcon sx={{ fontSize: "inherit" }} />,
};

const meta = {
  title: "Component/Button/Icon Button",
  component: Button, // Use the exported name from IconButton.tsx
  args: {
    disabled: false,
    focused: false,
    iconName: "language",
    type: ButtonType.Primary,
    size: ButtonSize.Medium,
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "radio",
      options: Object.values(ButtonType),
      defaultValue: ButtonType.Primary,
    },
    size: {
      control: "radio",
      options: Object.values(ButtonSize),
      defaultValue: ButtonSize.Medium,
      labels: {
        [ButtonSize.XSmall]: "XSmall (20px)",
        [ButtonSize.Small]: "Small (24px)",
        [ButtonSize.Medium]: "Medium (32px)",
        [ButtonSize.Large]: "Large (40px)",
      },
    },
    iconName: {
      control: "select",
      options: Object.keys(iconMap),
      description: "Select an icon for the button",
      table: {
        category: "Content",
        defaultValue: { summary: "language" },
      },
    },
    disabled: {
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    focused: {
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
    // Removed argTypes for label, rtl, hasLeadingIcon, hasTrailingIcon, leadingIcon, trailingIcon
  },
} satisfies Meta<IconButtonStoryArgs>;

export default meta;

type Story = StoryObj<IconButtonStoryArgs>;

export const Primary: Story = {
  args: {
    type: ButtonType.Primary,
    iconName: "headphones",
  },
  render: ({ iconName, ...args }) => (
    <Button {...args} icon={iconMap[iconName]} />
  ),
};

export const Secondary: Story = {
  args: {
    type: ButtonType.Secondary,
    iconName: "settings",
  },
  render: ({ iconName, ...args }) => (
    <Button {...args} icon={iconMap[iconName]} />
  ),
};

export const Ghost: Story = {
  args: {
    type: ButtonType.Ghost,
    iconName: "language",
  },
  render: ({ iconName, ...args }) => (
    <Button {...args} icon={iconMap[iconName]} />
  ),
};

export const XSmallIconButton: Story = {
  args: {
    size: ButtonSize.XSmall,
    iconName: "add",
  },
  render: ({ iconName, ...args }) => (
    <Button {...args} icon={iconMap[iconName]} />
  ),
};

export const SmallIconButton: Story = {
  args: {
    size: ButtonSize.Small,
    iconName: "language",
  },
  render: ({ iconName, ...args }) => (
    <Button {...args} icon={iconMap[iconName]} />
  ),
};

export const LargeIconButton: Story = {
  args: {
    size: ButtonSize.Large,
    iconName: "headphones",
  },
  render: ({ iconName, ...args }) => (
    <Button {...args} icon={iconMap[iconName]} />
  ),
};

export const FocusedButton: Story = {
  args: {
    focused: true,
    iconName: "settings",
  },
  render: ({ iconName, ...args }) => (
    <Button {...args} icon={iconMap[iconName]} />
  ),
};

export const DisabledButton: Story = {
  args: {
    disabled: true,
    iconName: "language",
    type: ButtonType.Primary,
  },
  render: ({ iconName, ...args }) => (
    <Button {...args} icon={iconMap[iconName]} />
  ),
};

/**
 * Interactive example for the documentation
 * This story allows users to modify props in real-time and see the changes
 */
export const Interactive: Story = {
  args: {
    iconName: "settings",
    type: ButtonType.Primary,
    size: ButtonSize.Medium,
    disabled: false,
    focused: false,
  },
  parameters: {
    docs: {
      source: {
        code: `<Button 
  icon={SettingsIcon}
  type={ButtonType.Primary} 
  size={ButtonSize.Medium}
  onClick={(e) => console.log('Icon button clicked', e)}
/>`,
      },
    },
  },
  render: ({ iconName, ...args }) => (
    <Button
      {...args}
      icon={iconMap[iconName]}
      onClick={(e) => console.log("Icon button clicked", e)}
    />
  ),
};
