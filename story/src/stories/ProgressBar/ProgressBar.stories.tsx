import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ProgressBar } from "./ProgressBar";

// Custom hook to dynamically update Storybook controls
const useDynamicValueRange = (min: number, max: number) => {
  React.useEffect(() => {
    // Try to update the control range in the Storybook UI
    const updateControl = () => {
      try {
        // Access Storybook's internal API if available
        if (typeof window !== "undefined") {
          const storybookAPI = (window as any).__STORYBOOK_CLIENT_API__;
          if (storybookAPI) {
            const currentStory = storybookAPI.getCurrentStoryData();
            if (currentStory?.parameters?.argTypes?.value?.control) {
              currentStory.parameters.argTypes.value.control.min = min;
              currentStory.parameters.argTypes.value.control.max = max;
            }
          }
        }
      } catch (error) {
        // Silently fail if Storybook API is not available
      }
    };

    updateControl();
  }, [min, max]);
};

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
      control: { type: "range", min: 1, max: 100, step: 1 },
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
        disable: true,
      },
    },
    min: {
      control: { type: "number", max: 100, step: 1 },
      description: "Minimum value",
      table: {
        category: "Content",
        defaultValue: { summary: "0" },
        disable: true,
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
  render: (args) => {
    const currentMin = args.min || 0;
    const currentMax = args.max || 100;
    const originalValue = args.value;
    const clampedValue = Math.max(
      currentMin,
      Math.min(currentMax, originalValue)
    );
    const isValueClamped = originalValue !== clampedValue;

    // Try to update the control range dynamically
    useDynamicValueRange(currentMin, currentMax);

    return (
      <div style={{ width: "300px" }}>
        <div style={{ marginBottom: "12px", fontSize: "12px", color: "#666" }}>
          <div>
            <strong>Range:</strong> {currentMin} - {currentMax}
          </div>
          <div>
            <strong>Value:</strong> {clampedValue}
            {isValueClamped && (
              <span style={{ color: "#f56565", marginLeft: "8px" }}>
                (clamped from {originalValue})
              </span>
            )}
          </div>
          <div
            style={{ fontSize: "11px", marginTop: "4px", fontStyle: "italic" }}
          >
            💡 Tip: The value slider should adapt to your min/max range
          </div>
        </div>
        <ProgressBar {...args} value={clampedValue} />
      </div>
    );
  },
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
