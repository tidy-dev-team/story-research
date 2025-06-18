import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import React from "react";
import { Tab } from "./Tab";
import LanguageIcon from "@mui/icons-material/Language";

type TabStoryArgs = ComponentProps<typeof Tab> & { hasLeadingIcon?: boolean };

const meta = {
  title: "Component/Tabs/Tab",
  component: Tab,
  args: {
    children: "Dashboard",
    hasLeadingIcon: false,
    rtl: false,
    disabled: false,
    selected: false,
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Individual Tab component with different states and RTL support. Used as a building block for tab navigation interfaces.",
      },
      source: { state: "open" },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "The text content of the tab.",
      table: { category: "Content" },
    },
    hasLeadingIcon: {
      control: "boolean",
      description: "If true, a leading icon is displayed.",
      table: { category: "Content", defaultValue: { summary: "false" } },
    },
    leadingIcon: {
      description:
        "The leading icon element. Used internally when `hasLeadingIcon` is true.",
      table: { category: "Content", disable: true },
    },
    rtl: {
      control: "boolean",
      description: "If true, the tab's text direction will be right-to-left.",
      table: { category: "Appearance", defaultValue: { summary: "false" } },
    },
    disabled: {
      control: "boolean",
      description: "If true, the tab will be disabled and non-interactive.",
      table: { category: "State", defaultValue: { summary: "false" } },
    },
    selected: {
      control: "boolean",
      description: "If true, the tab will be marked as selected.",
      table: { category: "State", defaultValue: { summary: "false" } },
    },
    onClick: {
      action: "clicked",
      description: "Optional click handler.",
      table: { category: "Events", disable: true },
    },
  },
} satisfies Meta<TabStoryArgs>;
export default meta;

type Story = StoryObj<TabStoryArgs>;
const renderIcon = (
  condition: boolean | undefined,
  Icon: typeof LanguageIcon
) => {
  return condition ? <Icon sx={{ fontSize: "12px" }} /> : undefined;
};
const renderStory = ({
  hasLeadingIcon,
  disabled,
  selected,
  ...args
}: TabStoryArgs) => (
  <Tab
    {...args}
    disabled={disabled}
    selected={selected}
    leadingIcon={renderIcon(hasLeadingIcon, LanguageIcon)}
  />
);
export const Default: Story = {
  args: { children: "Dashboard" },
  render: renderStory,
};
export const WithLeadingIcon: Story = {
  args: { children: "Analytics", hasLeadingIcon: true },
  render: renderStory,
};
export const RTL: Story = {
  args: {
    children: "Dashboard",
    rtl: true,
    hasLeadingIcon: true,
  },
  render: renderStory,
};
