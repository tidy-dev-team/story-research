import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { TabBar } from "./TabBar";
import { Tab } from "./Tab";
import { TextDirection } from "../textDirection";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";

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
            label={label}
            key={label}
            selected={selected === idx}
            onClick={() => setSelected(idx)}
            textDirection={args.textDirection}
          />
        ))}
      </TabBar>
    );
  },
};

export const TabBarWithIcons: Story = {
  args: {
    textDirection: TextDirection.Ltr,
  },
  render: (args) => {
    const [selected, setSelected] = React.useState(0);
    const tabs = ["Home", "About", "Services", "Contact"];
    const icons = [HomeIcon, AccountCircleIcon, SettingsIcon, MailIcon];
    return (
      <TabBar {...args}>
        {tabs.map((label, idx) => (
          <Tab
            label={label}
            key={label}
            selected={selected === idx}
            onClick={() => setSelected(idx)}
            textDirection={args.textDirection}
            leadingIcon={icons[idx]}
          />
        ))}
      </TabBar>
    );
  },
};
