import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { TagStatus } from "./TagStatus";

const meta = {
  title: "Component/Tags/TagStatus",
  component: TagStatus,
  args: {
    type: "error",
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
    type: {
      control: { type: "select" },
      options: ["error", "warning", "caution", "ok", "loading"],
      description:
        "The status type that determines the visual appearance and text",
      table: {
        category: "Content",
        defaultValue: { summary: "error" },
      },
    },
    rtl: {
      control: "boolean",
      description: "Whether to use right-to-left layout with Hebrew text",
      table: {
        category: "Appearance",
        defaultValue: { summary: "false" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS class name",
      table: {
        category: "Styling",
        disabled: true,
      },
    },
  },
} satisfies Meta<typeof TagStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
export const RTLExamples: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <span style={{ fontSize: "12px", color: "#666", minWidth: "80px" }}>
          LTR:
        </span>
        <TagStatus type="error" />
        <TagStatus type="warning" />
        <TagStatus type="caution" />
        <TagStatus type="ok" />
        <TagStatus type="loading" />
      </div>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <span style={{ fontSize: "12px", color: "#666", minWidth: "80px" }}>
          RTL:
        </span>
        <TagStatus type="error" rtl />
        <TagStatus type="warning" rtl />
        <TagStatus type="caution" rtl />
        <TagStatus type="ok" rtl />
        <TagStatus type="loading" rtl />
      </div>
    </div>
  ),
};
