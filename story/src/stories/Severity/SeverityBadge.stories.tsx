import type { Meta, StoryObj } from "@storybook/react";
import { SeverityBadge } from "./SeverityBadge";

const meta: Meta<typeof SeverityBadge> = {
  title: "Components/Severity/SeverityBadge",
  component: SeverityBadge,
  tags: ["autodocs"],
  argTypes: {
    level: {
      control: "select",
      options: ["high", "medium", "low"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    level: "medium",
  },
};

export const High: Story = {
  args: {
    level: "high",
  },
};

export const Medium: Story = {
  args: {
    level: "medium",
  },
};

export const Low: Story = {
  args: {
    level: "low",
  },
};
