import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";
import { ButtonSize, ButtonType } from "./Button";

const meta = {
  title: "Example/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: Object.values(ButtonSize),
    },
    type: {
      control: "select",
      options: Object.values(ButtonType),
    },
    rtl: {
      control: "boolean",
      description: "Right to left text direction",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: ButtonType.Primary,
    label: "Button",
    size: ButtonSize.Medium,
  },
};

export const Secondary: Story = {
  args: {
    type: ButtonType.Secondary,
    label: "Button",
    size: ButtonSize.Medium,
  },
};

export const Ghost: Story = {
  args: {
    type: ButtonType.Ghost,
    label: "Button",
    size: ButtonSize.Medium,
  },
};

export const RightToLeft: Story = {
  args: {
    type: ButtonType.Primary,
    label: "טקסט",
    size: ButtonSize.Medium,
    rtl: true,
  },
};
