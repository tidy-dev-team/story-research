import type { Meta, StoryObj } from "@storybook/react";
import AvatarLabel from "./AvatarLabel";
import { AvatarType } from "../Avatar/Avatar";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Component/Avatar/AvatarLabel",
  component: AvatarLabel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    avatarLabel: {
      control: {
        type: "text",
      },
      description: "Avatar label (automatically limited to max 2 characters)",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    avatarType: {
      control: {
        type: "select",
      },
      options: Object.values(AvatarType),
      description: "Avatar type (Default or Empty)",
    },
    textLabel: {
      control: {
        type: "text",
      },
      description: "Text label displayed next to the avatar",
    },
    rtl: {
      control: {
        type: "boolean",
      },
      description: "Right-to-left layout (reverses flex direction)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: {
        type: "boolean",
      },
      description: "Disable the dropdown button",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onIconClick: {
      action: "dropdown clicked",
      description: "Callback function when dropdown arrow is clicked",
    },
  },
} satisfies Meta<typeof AvatarLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultWithUser: Story = {
  args: {
    avatarLabel: "JS",
    avatarType: AvatarType.Default,
    textLabel: "John Smith",
  },
};

export const EmptyAvatar: Story = {
  args: {
    avatarType: AvatarType.Empty,
    textLabel: "No User",
  },
};

export const ShortName: Story = {
  args: {
    avatarLabel: "AB",
    avatarType: AvatarType.Default,
    textLabel: "Alex Brown",
  },
};

export const LongName: Story = {
  args: {
    avatarLabel: "Christopher Williams",
    avatarType: AvatarType.Default,
    textLabel: "Christopher Williams",
  },
};

export const RTLLayout: Story = {
  args: {
    avatarLabel: "דמ",
    avatarType: AvatarType.Default,
    textLabel: "דוד מלכה",
    rtl: true,
  },
};
