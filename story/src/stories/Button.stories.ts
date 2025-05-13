import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";
import { ButtonSize } from "./Button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: {
        type: "select", // Use a dropdown control
      },
      options: Object.values(ButtonSize),
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    label: "",
    size: ButtonSize.Sm,
  },
};

export const Medium: Story = {
  args: {
    label: "",
    size: ButtonSize.Md,
  },
};

export const Large: Story = {
  args: {
    label: "",
    size: ButtonSize.Lg,
  },
};
