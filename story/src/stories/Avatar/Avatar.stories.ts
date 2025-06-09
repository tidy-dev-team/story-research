import type { Meta, StoryObj } from "@storybook/react";
import Avatar from "./Avatar";
import { AvatarSize } from "./Avatar";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Component/Avatar/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    firstName: {
      control: {
        type: "text",
      },
      description: "First name",
      table: {
        type: { summary: "string | null" },
        defaultValue: { summary: "null" },
      },
    },
    lastName: {
      control: {
        type: "text",
      },
      description: "Last name",
      table: {
        type: { summary: "string | null" },
        defaultValue: { summary: "null" },
      },
    },
    size: {
      control: {
        type: "select", // Use a dropdown control
      },
      options: Object.values(AvatarSize),
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithBothNames: Story = {
  args: {
    firstName: "John",
    lastName: "Doe",
    size: AvatarSize.M,
  },
};

export const WithFirstNameOnly: Story = {
  args: {
    firstName: "Jane",
    size: AvatarSize.M,
  },
};

export const WithLastNameOnly: Story = {
  args: {
    lastName: "Smith",
    size: AvatarSize.M,
  },
};

export const Empty: Story = {
  args: {
    size: AvatarSize.M,
  },
};

export const SmallSize: Story = {
  args: {
    firstName: "A",
    lastName: "B",
    size: AvatarSize.S,
  },
};

export const LargeSize: Story = {
  args: {
    firstName: "John",
    lastName: "Doe",
    size: AvatarSize.L,
  },
};
