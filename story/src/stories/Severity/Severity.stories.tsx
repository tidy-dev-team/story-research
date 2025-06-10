import type { Meta, StoryObj } from "@storybook/react";
import { Severity } from "./Severity";

const meta: Meta<typeof Severity> = {
  title: "Component/Severity",
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
    label: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    level: "medium",
    type: "badge",
    label: "Medium",
    rtl: false,
  },
};

export const BarHighSmall: Story = {
  args: {
    level: "high",
    type: "bar",
    label: "High",
    rtl: false,
    barExpired: false,
  },
};
