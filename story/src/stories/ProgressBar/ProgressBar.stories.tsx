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
      control: "text",
      description: "Accessible label",
      table: {
        category: "Accessibility",
      },
    },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {},
  render: (args) => (
    <div style={{ width: "300px" }}>
      <ProgressBar {...args} />
    </div>
  ),
};

// Different progress values
export const Empty: Story = {
  args: {
    value: 0,
    "aria-label": "Loading progress",
  },
  render: (args) => (
    <div style={{ width: "300px" }}>
      <ProgressBar {...args} />
    </div>
  ),
};

export const Quarter: Story = {
  args: {
    value: 25,
    "aria-label": "Loading progress",
  },
  render: (args) => (
    <div style={{ width: "300px" }}>
      <ProgressBar {...args} />
    </div>
  ),
};

export const Half: Story = {
  args: {
    value: 50,
    "aria-label": "Loading progress",
  },
  render: (args) => (
    <div style={{ width: "300px" }}>
      <ProgressBar {...args} />
    </div>
  ),
};

export const ThreeQuarters: Story = {
  args: {
    value: 75,
    "aria-label": "Loading progress",
  },
  render: (args) => (
    <div style={{ width: "300px" }}>
      <ProgressBar {...args} />
    </div>
  ),
};

export const Complete: Story = {
  args: {
    value: 100,
    "aria-label": "Loading progress",
  },
  render: (args) => (
    <div style={{ width: "300px" }}>
      <ProgressBar {...args} />
    </div>
  ),
};

// RTL direction
export const RightToLeft: Story = {
  args: {
    value: 60,
    rtl: true,
    "aria-label": "Loading progress (RTL)",
  },
  render: (args) => (
    <div style={{ width: "300px" }}>
      <ProgressBar {...args} />
    </div>
  ),
};

// Custom range
export const CustomRange: Story = {
  args: {
    value: 150,
    min: 100,
    max: 200,
    "aria-label": "Custom range progress",
  },
  render: (args) => (
    <div style={{ width: "300px" }}>
      <ProgressBar {...args} />
    </div>
  ),
};

// Multiple progress bars showcase
export const Showcase: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        width: "400px",
      }}
    >
      <div>
        <h3
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "500" }}
        >
          Different Progress Values
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <span
              style={{
                fontSize: "12px",
                color: "#666",
                marginBottom: "4px",
                display: "block",
              }}
            >
              0%
            </span>
            <ProgressBar value={0} aria-label="0% progress" />
          </div>
          <div>
            <span
              style={{
                fontSize: "12px",
                color: "#666",
                marginBottom: "4px",
                display: "block",
              }}
            >
              25%
            </span>
            <ProgressBar value={25} aria-label="25% progress" />
          </div>
          <div>
            <span
              style={{
                fontSize: "12px",
                color: "#666",
                marginBottom: "4px",
                display: "block",
              }}
            >
              50%
            </span>
            <ProgressBar value={50} aria-label="50% progress" />
          </div>
          <div>
            <span
              style={{
                fontSize: "12px",
                color: "#666",
                marginBottom: "4px",
                display: "block",
              }}
            >
              75%
            </span>
            <ProgressBar value={75} aria-label="75% progress" />
          </div>
          <div>
            <span
              style={{
                fontSize: "12px",
                color: "#666",
                marginBottom: "4px",
                display: "block",
              }}
            >
              100%
            </span>
            <ProgressBar value={100} aria-label="100% progress" />
          </div>
        </div>
      </div>

      <div>
        <h3
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "500" }}
        >
          Right-to-Left Direction
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <span
              style={{
                fontSize: "12px",
                color: "#666",
                marginBottom: "4px",
                display: "block",
              }}
            >
              RTL 30%
            </span>
            <ProgressBar value={30} rtl aria-label="30% progress (RTL)" />
          </div>
          <div>
            <span
              style={{
                fontSize: "12px",
                color: "#666",
                marginBottom: "4px",
                display: "block",
              }}
            >
              RTL 70%
            </span>
            <ProgressBar value={70} rtl aria-label="70% progress (RTL)" />
          </div>
        </div>
      </div>

      <div>
        <h3
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "500" }}
        >
          Custom Range (0-200)
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <span
              style={{
                fontSize: "12px",
                color: "#666",
                marginBottom: "4px",
                display: "block",
              }}
            >
              Value: 50 (25% of range)
            </span>
            <ProgressBar
              value={50}
              min={0}
              max={200}
              aria-label="50 out of 200"
            />
          </div>
          <div>
            <span
              style={{
                fontSize: "12px",
                color: "#666",
                marginBottom: "4px",
                display: "block",
              }}
            >
              Value: 150 (75% of range)
            </span>
            <ProgressBar
              value={150}
              min={0}
              max={200}
              aria-label="150 out of 200"
            />
          </div>
        </div>
      </div>
    </div>
  ),
};

// Interactive example with state
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
