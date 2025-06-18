import type { Meta, StoryObj } from "@storybook/react";
import Avatar from "./Avatar";
import { AvatarSize } from "./Avatar";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Avatar/Avatar",
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
      description: "First name of the person",
      table: {
        type: { summary: "string | null" },
        defaultValue: { summary: "undefined" },
      },
    },
    lastName: {
      control: {
        type: "text",
      },
      description: "Last name of the person",
      table: {
        type: { summary: "string | null" },
        defaultValue: { summary: "undefined" },
      },
    },
    size: {
      control: {
        type: "select",
      },
      options: Object.values(AvatarSize),
      description: "Size of the avatar",
      table: {
        type: { summary: "AvatarSize" },
        defaultValue: { summary: "AvatarSize.M" },
      },
    },
    filled: {
      control: {
        type: "boolean",
      },
      description:
        "Whether the avatar has a filled background (auto-determined based on initials)",
      table: {
        disable: true,
        type: { summary: "boolean" },
        defaultValue: { summary: "auto" },
      },
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    firstName: "John",
    lastName: "Doe",
    size: AvatarSize.M,
  },
};
