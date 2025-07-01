import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ProgressBar } from "./ProgressBar";
import { TextDirection } from "../textDirection";

const meta: Meta<typeof ProgressBar> = {
  title: "Components/ProgressBar",
  component: ProgressBar,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "300px" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  args: {
    value: 50,
    max: 100,
    textDirection: TextDirection.Ltr,
  },
  argTypes: {
    value: {
      control: { type: "range", max: 100, step: 1 },
      description:
        "Current progress value",
      table: {
        category: "Content",
      },
    },
    max: {
      control: { type: "number", step: 1 },
      description: "Maximum value",
      table: {
        category: "Content",
        defaultValue: { summary: "100" },
      },
    },
    textDirection: {
      control: "select",
      options: Object.values(TextDirection),
      description: "Text direction for RTL/LTR layout",
      table: {
        category: "Layout",
        defaultValue: { summary: "ltr" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
