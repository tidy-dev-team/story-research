import type { Meta, StoryObj } from "@storybook/react";
import {
  Severity,
  SEVERITY_LEVELS,
  SEVERITY_TYPES,
  SeverityLevel,
  SeverityType,
} from "./Severity";
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
      options: SEVERITY_LEVELS,
    },
    type: {
      control: "select",
      options: SEVERITY_TYPES,
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
    level: "medium",
    type: "badge",
    textDirection: TextDirection.Ltr,
  },
};
