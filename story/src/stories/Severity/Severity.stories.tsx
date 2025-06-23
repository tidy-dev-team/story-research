import type { Meta, StoryObj } from "@storybook/react";
import { Severity, SeverityLevel, SeverityType } from "./Severity";
import { TextDirection } from "../textDirection";

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
      options: Object.values(SeverityLevel),
    },
    type: {
      control: "select",
      options: Object.values(SeverityType),
    },
    textDirection: {
      control: "select",
      options: Object.values(TextDirection),
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    level: SeverityLevel.Medium,
    type: SeverityType.Badge,
    textDirection: TextDirection.Ltr,
  },
};
