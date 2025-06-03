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
    size: AvatarSize.S,
    type: AvatarType.Default,
  },
};

export const EmptySmall: Story = {
  args: {
    size: AvatarSize.S,
    type: AvatarType.Empty,
  },
};

export const DefaultMedium: Story = {
  args: {
    label: "AA",
    size: AvatarSize.M,
    type: AvatarType.Default,
  },
};

export const EmptyMedium: Story = {
  args: {
    size: AvatarSize.M,
    type: AvatarType.Empty,
  },
};

export const DefaultLarge: Story = {
  args: {
    label: "AA",
    size: AvatarSize.L,
    type: AvatarType.Default,
  },
};

export const EmptyLarge: Story = {
  args: {
    size: AvatarSize.L,
    type: AvatarType.Empty,
  },
};
