import type { Meta, StoryObj } from "@storybook/react";
import { Severity } from "./Severity";

const meta: Meta<typeof Severity> = {
  title: "Component/Severity",
  parameters: {
    layout: "centered",
  },
  component: Severity,
  tags: ["autodocs"],
  argTypes: {
    level: {
      control: "select",
      options: ["high", "medium", "low"],
    },
    type: {
      control: "select",
      options: ["badge", "bar"],
    },
    rtl: {
      control: "boolean",
    },
    // label removed: label is now static and based on level
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    level: "medium",
    type: "badge",
    // label removed: label is now static and based on level
    rtl: false,
  },
};
