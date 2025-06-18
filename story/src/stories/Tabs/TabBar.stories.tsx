import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { TabBar } from "./TabBar";
import { Tab } from "./Tab";
import { TextDirection } from "../textDirection";

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
    textDirection: {
      control: { type: "select" },
      options: [TextDirection.Ltr, TextDirection.Rtl],
      description: "Text direction for the tab bar layout",
      table: {
        category: "Layout",
        defaultValue: { summary: "TextDirection.Ltr" },
      },
    },
    children: {
      control: false,
      description: "Tab components to render inside the tab bar",
      table: {
        category: "Content",
      },
    },
  },
} satisfies Meta<typeof TabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: {
    textDirection: TextDirection.Ltr,
  },
  render: (args) => {
    const [selected, setSelected] = React.useState(0);
    const tabs = ["Home", "About", "Services", "Contact"];
    return (
      <TabBar {...args}>
        {tabs.map((label, idx) => (
          <Tab
            key={label}
            selected={selected === idx}
            onClick={() => setSelected(idx)}
            textDirection={args.textDirection}
          >
            {label}
          </Tab>
        ))}
      </TabBar>
    );
  },
};
