import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Tag } from "./Tag";

const meta = {
  title: "Component/Tags/Tag",
  component: Tag,
  args: {
    value: 1,
    type: "default",
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
      control: { type: "number", min: 1, max: 999, step: 1 },
      description: "The numeric value to display (1-999)",
      table: {
        category: "Content",
        defaultValue: { summary: "1" },
      },
    },
    type: {
      control: { type: "select" },
      options: ["default", "geo"],
      description: "The variant type that determines the visual appearance",
      table: {
        category: "Appearance",
        defaultValue: { summary: "default" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS class name",
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const DefaultType: Story = {
  args: {
    value: 5,
    type: "default",
  },
};

export const GeoType: Story = {
  args: {
    value: 3,
    type: "geo",
  },
};

export const SmallNumbers: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <Tag value={1} />
      <Tag value={5} />
      <Tag value={9} />
      <Tag value={1} type="geo" />
      <Tag value={5} type="geo" />
      <Tag value={9} type="geo" />
    </div>
  ),
};

export const MediumNumbers: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <Tag value={10} />
      <Tag value={50} />
      <Tag value={99} />
      <Tag value={10} type="geo" />
      <Tag value={50} type="geo" />
      <Tag value={99} type="geo" />
    </div>
  ),
};

export const LargeNumbers: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <Tag value={100} />
      <Tag value={500} />
      <Tag value={999} />
      <Tag value={100} type="geo" />
      <Tag value={500} type="geo" />
      <Tag value={999} type="geo" />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <span style={{ fontSize: "12px", color: "#666", minWidth: "80px" }}>
          Default:
        </span>
        <Tag value={1} />
        <Tag value={10} />
        <Tag value={100} />
        <Tag value={999} />
      </div>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <span style={{ fontSize: "12px", color: "#666", minWidth: "80px" }}>
          Geo:
        </span>
        <Tag value={1} type="geo" />
        <Tag value={10} type="geo" />
        <Tag value={100} type="geo" />
        <Tag value={999} type="geo" />
      </div>
    </div>
  ),
};

export const BoundaryValues: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <span style={{ fontSize: "12px", color: "#666", minWidth: "120px" }}>
          Min value (1):
        </span>
        <Tag value={1} />
        <Tag value={1} type="geo" />
      </div>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <span style={{ fontSize: "12px", color: "#666", minWidth: "120px" }}>
          Max value (999):
        </span>
        <Tag value={999} />
        <Tag value={999} type="geo" />
      </div>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <span style={{ fontSize: "12px", color: "#666", minWidth: "120px" }}>
          Clamped (1200→999):
        </span>
        <Tag value={1200} />
        <Tag value={1200} type="geo" />
      </div>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <span style={{ fontSize: "12px", color: "#666", minWidth: "120px" }}>
          Clamped (0→1):
        </span>
        <Tag value={0} />
        <Tag value={0} type="geo" />
      </div>
    </div>
  ),
};
