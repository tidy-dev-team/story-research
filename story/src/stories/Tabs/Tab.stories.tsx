import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import React from "react";
import { Tab } from "./Tab";
import DashboardIcon from "@mui/icons-material/Dashboard";
type TabStoryArgs = ComponentProps<typeof Tab> & { hasLeadingIcon?: boolean };
const meta = {
  title: "Components/Tabs/Tab",
  component: Tab,
  args: {
    children: "Dashboard",
    childrenRtl: "לוח בקרה",
    hasLeadingIcon: false,
    rtl: false,
    disabled: false,
    "aria-selected": false,
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
    childrenRtl: {
      control: "text",
      description: "The text content for RTL languages.",
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
    "aria-selected": {
      control: "boolean",
      description: "If true, the tab will be displayed in a selected state.",
      table: { category: "State", defaultValue: { summary: "false" } },
    },
    onClick: {
      action: "clicked",
      description: "Optional click handler.",
      table: { category: "Events" },
    },
    className: {
      control: "text",
      description: "Additional CSS classes.",
      table: { category: "Appearance" },
    },
    "aria-controls": {
      control: "text",
      description: "ARIA controls attribute.",
      table: { category: "Accessibility" },
    },
    role: {
      control: "text",
      description: "ARIA role.",
      table: { category: "Accessibility", disable: true },
    },
    tabIndex: {
      control: "number",
      description: "Tab index for keyboard navigation.",
      table: { category: "Accessibility", disable: true },
    },
  },
} satisfies Meta<TabStoryArgs>;
export default meta;
type Story = StoryObj<TabStoryArgs>;
const renderIcon = (
  condition: boolean | undefined,
  Icon: typeof DashboardIcon
) => {
  return condition ? <Icon sx={{ fontSize: "12px" }} /> : undefined;
};
const renderStory = ({
  hasLeadingIcon,
  disabled,
  "aria-selected": ariaSelected,
  ...args
}: TabStoryArgs) => (
  <Tab
    {...args}
    disabled={disabled}
    aria-selected={ariaSelected}
    leadingIcon={renderIcon(hasLeadingIcon, DashboardIcon)}
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
export const Selected: Story = {
  args: {
    children: "Reports",
    "aria-selected": true,
    "aria-controls": "tabpanel-reports",
  },
  render: renderStory,
};
export const SelectedWithIcon: Story = {
  args: {
    children: "Settings",
    hasLeadingIcon: true,
    "aria-selected": true,
    "aria-controls": "tabpanel-settings",
  },
  render: renderStory,
};
export const Disabled: Story = {
  args: {
    children: "Archives",
    disabled: true,
    "aria-controls": "tabpanel-archives",
  },
  render: renderStory,
};
export const DisabledWithIcon: Story = {
  args: {
    children: "Profile",
    hasLeadingIcon: true,
    disabled: true,
    "aria-controls": "tabpanel-profile",
  },
  render: renderStory,
};
export const RTL: Story = {
  args: {
    children: "Dashboard",
    childrenRtl: "לוח בקרה",
    rtl: true,
    hasLeadingIcon: true,
    "aria-controls": "tabpanel-dashboard",
  },
  render: renderStory,
};
export const RTLSelected: Story = {
  args: {
    children: "Reports",
    childrenRtl: "דוחות",
    rtl: true,
    hasLeadingIcon: true,
    "aria-selected": true,
    "aria-controls": "tabpanel-reports",
  },
  render: renderStory,
};
export const Interactive: Story = {
  args: {
    children: "Click me",
    childrenRtl: "לחץ עלי",
    "aria-controls": "tabpanel-interactive",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive tab that responds to clicks and keyboard navigation.",
      },
    },
  },
  render: renderStory,
};
export const AllStates: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      {" "}
      <Tab aria-controls="panel-1">Idle</Tab>{" "}
      <Tab aria-selected={true} aria-controls="panel-2">
        {" "}
        Selected{" "}
      </Tab>{" "}
      <Tab disabled aria-controls="panel-3">
        {" "}
        Disabled{" "}
      </Tab>{" "}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All tab states displayed together. Hover and focus states are interactive - try hovering over or focusing the tabs.",
      },
    },
  },
};
