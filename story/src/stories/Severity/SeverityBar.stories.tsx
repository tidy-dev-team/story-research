import type { Meta, StoryObj } from "@storybook/react";
import { SeverityBar } from "./SeverityBar";

const meta: Meta<typeof SeverityBar> = {
  title: "Components/Severity/SeverityBar",
  component: SeverityBar,
  tags: ["autodocs"],
  argTypes: {
    level: {
      control: "select",
      options: ["high", "medium", "low"],
    },
    size: {
      control: "select",
      options: ["s", "m"],
    },
    expired: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    level: "medium",
    size: "s",
    expired: false,
  },
};

export const HighSmall: Story = {
  args: {
    level: "high",
    size: "s",
    expired: false,
  },
};

export const MediumMedium: Story = {
  args: {
    level: "medium",
    size: "m",
    expired: false,
  },
};

export const LowSmallExpired: Story = {
  args: {
    level: "low",
    size: "s",
    expired: true,
  },
};

export const HighMediumExpired: Story = {
  args: {
    level: "high",
    size: "m",
    expired: true,
  },
};
