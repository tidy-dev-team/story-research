import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Tag, TagType } from "./Tag";

const meta = {
  title: "Components/Tags/Tag",
  component: Tag,
  args: {
    value: 42,
    type: TagType.Default,
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
      control: { type: "number", min: 0, max: 2000 },
      description:
        "The numeric value to display (will be clamped between 1-999)",
      table: {
        category: "Content",
        defaultValue: { summary: "1" },
      },
    },
    type: {
      control: { type: "select" },
      options: Object.values(TagType),
      description: "The visual style variant of the tag",
      table: {
        category: "Appearance",
        defaultValue: { summary: "TagType.Default" },
      },
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 42,
    type: TagType.Default,
  },
};

export const Geo: Story = {
  args: {
    value: 15,
    type: TagType.Geo,
  },
};

export const SmallValue: Story = {
  args: {
    value: 1,
    type: TagType.Default,
  },
};

export const LargeValue: Story = {
  args: {
    value: 999,
    type: TagType.Default,
  },
};

export const ZeroValue: Story = {
  args: {
    value: 0,
    type: TagType.Default,
  },
  parameters: {
    docs: {
      description: {
        story: "Zero values are clamped to 1",
      },
    },
  },
};

export const AllVariants: Story = {
  args: {
    value: 42,
    type: TagType.Default,
  },
  render: () => (
    <div className="flex gap-4 items-center">
      <Tag value={42} type={TagType.Default} />
      <Tag value={15} type={TagType.Geo} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All available tag variants displayed together",
      },
    },
  },
};
