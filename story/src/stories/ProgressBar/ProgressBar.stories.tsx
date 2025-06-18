import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ProgressBar } from "./ProgressBar";
import { TextDirection } from "../textDirection";

const meta: Meta<typeof ProgressBar> = {
  title: "Component/ProgressBar",
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
    min: 0,
    size: "small",
    textDirection: TextDirection.Ltr,
  },
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description:
        "Current progress value (will be clamped to fit min/max range)",
      table: {
        category: "Content",
      },
    },
    max: {
      control: { type: "number", min: 1, step: 1 },
      description: "Maximum value",
      table: {
        category: "Content",
        defaultValue: { summary: "100" },
      },
    },
    min: {
      control: { type: "number", min: 0, max: 99, step: 1 },
      description: "Minimum value",
      table: {
        category: "Content",
        defaultValue: { summary: "0" },
      },
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Size of the progress bar",
      table: {
        category: "Appearance",
        defaultValue: { summary: "small" },
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
    "aria-label": {
      control: "text",
      description: "Accessible label for screen readers",
      table: {
        category: "Accessibility",
      },
    },
    "aria-describedby": {
      control: "text",
      description: "ID of element that describes the progress bar",
      table: {
        category: "Accessibility",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
