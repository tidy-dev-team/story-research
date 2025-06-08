import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ProgressBar } from "./ProgressBar";

const meta = {
  title: "Component/ProgressBar",
  component: ProgressBar,
  args: {
    value: 50,
    max: 100,
    min: 0,
    rtl: false,
  },
  parameters: {
    layout: "centered",
    docs: {
      source: {
        state: "open",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Current progress value",
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
      control: { type: "number", min: 0, step: 1 },
      description: "Minimum value",
      table: {
        category: "Content",
        defaultValue: { summary: "0" },
      },
    },
    rtl: {
      control: "boolean",
      description: "Right-to-left direction",
      table: {
        category: "Appearance",
        defaultValue: { summary: "false" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS class",
      table: {
        category: "Styling",
      },
    },
    "aria-label": {
      control: false,
      table: {
        disable: true,
      },
    },
    "aria-describedby": {
      control: false,
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <div style={{ width: "300px" }}>
      <ProgressBar {...args} />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0;
          }
          return prev + 1;
        });
      }, 100);

      return () => clearInterval(timer);
    }, []);

    return (
      <div style={{ width: "300px" }}>
        <div style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
          Progress: {progress}%
        </div>
        <ProgressBar
          value={progress}
          aria-label={`Loading progress: ${progress}%`}
        />
      </div>
    );
  },
};
