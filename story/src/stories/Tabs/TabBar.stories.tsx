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
  },
} satisfies Meta<typeof TabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: {
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
            rtl={args.rtl}
          >
            {label}
          </Tab>
        ))}
      </TabBar>
    );
  },
};
