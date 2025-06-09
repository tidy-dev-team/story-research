import type { Meta, StoryObj } from "@storybook/react";
import AvatarLabel from "./AvatarLabel";

const meta = {
  title: "Component/Avatar/AvatarLabel",
  component: AvatarLabel,
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
    firstName: "John",
    lastName: "Smith",
    textLabel: "John Smith",
  },
};

export const EmptyAvatar: Story = {
  args: {
    textLabel: "No User",
  },
};

export const ShortName: Story = {
  args: {
    firstName: "Alex",
    lastName: "Brown",
    textLabel: "Alex Brown",
  },
};

export const FirstNameOnly: Story = {
  args: {
    firstName: "Christopher",
    textLabel: "Christopher",
  },
};

export const LastNameOnly: Story = {
  args: {
    lastName: "Williams",
    textLabel: "Williams",
  },
};

export const RTLLayout: Story = {
  args: {
    firstName: "דוד",
    lastName: "מלכה",
    textLabel: "דוד מלכה",
    rtl: true,
  },
};
