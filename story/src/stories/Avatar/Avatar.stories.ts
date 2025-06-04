import type { Meta, StoryObj } from "@storybook/react";
import Avatar from "./Avatar";
import { AvatarSize, AvatarType } from "./Avatar";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Component/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: {
        type: "text",
      },
      description: "Avatar label (automatically limited to max 2 characters)",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "AA" },
      },
    },
    size: {
      control: {
        type: "select", // Use a dropdown control
      },
      options: Object.values(AvatarSize),
    },
    type: {
      control: {
        type: "select", // Use a dropdown control
      },
      options: Object.values(AvatarType),
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultSmall: Story = {
  args: {
    label: "AA",
    size: AvatarSize.s,
    type: AvatarType.Default,
  },
};

export const EmptySmall: Story = {
  args: {
    size: AvatarSize.s,
    type: AvatarType.Empty,
  },
};

export const DefaultMedium: Story = {
  args: {
    label: "AA",
    size: AvatarSize.m,
    type: AvatarType.Default,
  },
};

export const EmptyMedium: Story = {
  args: {
    size: AvatarSize.m,
    type: AvatarType.Empty,
  },
};

export const DefaultLarge: Story = {
  args: {
    label: "AA",
    size: AvatarSize.l,
    type: AvatarType.Default,
  },
};

export const EmptyLarge: Story = {
  args: {
    size: AvatarSize.l,
    type: AvatarType.Empty,
  },
};
