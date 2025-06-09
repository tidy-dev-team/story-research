import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { TabBar } from "./TabBar";
import { Tab } from "./Tab";

const meta = {
  title: "Component/Tabs/TabBar",
  component: TabBar,
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
    size: {
      control: { type: "select" },
      options: ["s", "l"],
      description: "The size variant of the tab bar",
      table: {
        category: "Appearance",
        defaultValue: { summary: "l" },
      },
    },
    rtl: {
      control: { type: "boolean" },
      description: "Whether to use right-to-left layout",
      table: {
        category: "Layout",
        defaultValue: { summary: "false" },
      },
    },
    children: {
      control: false,
      description: "Tab components to render inside the tab bar",
      table: {
        category: "Content",
      },
    },
    className: {
      control: "text",
      description: "Additional CSS class name",
      table: {
        disable: true,
      },
    },
    role: {
      control: "text",
      description: "ARIA role attribute",
      table: {
        category: "Accessibility",
        defaultValue: { summary: "tablist" },
      },
    },
  },
} satisfies Meta<typeof TabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/// Interactive story managing selected tab state
export const Interactive: Story = {
  args: {
    size: "l",
    rtl: false,
  },
  render: (args) => {
    const [selected, setSelected] = React.useState(0);
    const tabs = ["Home", "About", "Services", "Contact"];
    return (
      <TabBar {...args}>
        {tabs.map((label, idx) => (
          <Tab
            key={label}
            aria-selected={selected === idx}
            aria-controls={`panel-${idx}`}
            onClick={() => setSelected(idx)}
          >
            {label}
          </Tab>
        ))}
      </TabBar>
    );
  },
};
