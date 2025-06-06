import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import React from "react";
import {
  DropdownSize,
  DropdownItem,
  DropdownItemComponent,
} from "./DropdownItem";
import { SeverityLevel } from "../Checkbox/Checkbox";

import SettingsIcon from "@mui/icons-material/Settings";
import BugReportIcon from "@mui/icons-material/BugReport";
import ErrorIcon from "@mui/icons-material/Error";

type DropdownItemStoryArgs = ComponentProps<typeof DropdownItemComponent>;

const sampleItem: DropdownItem = {
  id: "1",
  label: "Sample Item",
  value: "sample",
};

const itemWithIcon: DropdownItem = {
  id: "2",
  label: "Settings",
  value: "settings",
  icon: <SettingsIcon sx={{ fontSize: "inherit" }} />,
};

const itemWithSeverity: DropdownItem = {
  id: "3",
  label: "Critical Issue",
  value: "critical",
  icon: <ErrorIcon sx={{ fontSize: "inherit" }} />,
  severity: SeverityLevel.High,
};

const disabledItem: DropdownItem = {
  id: "4",
  label: "Disabled Option",
  value: "disabled",
  icon: <SettingsIcon sx={{ fontSize: "inherit" }} />,
  disabled: true,
};

const meta = {
  title: "Component/Dropdown/DropdownItem",
  component: DropdownItemComponent,
  args: {
    item: sampleItem,
    isSelected: false,
    multiSelect: false,
    size: DropdownSize.m,
    rtl: false,
    onSelect: () => {}, // Provide a default empty function
  },
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#22272B" },
        { name: "light", value: "#ffffff" },
      ],
    },
  },
  tags: ["autodocs"],
  argTypes: {
    item: {
      table: {
        disable: true,
      },
    },
    isSelected: {
      control: "boolean",
      description: "Whether the item is selected",
      table: {
        category: "State",
        defaultValue: { summary: "false" },
      },
    },
    multiSelect: {
      control: "boolean",
      description: "Show checkbox for multi-selection",
      table: {
        category: "Behavior",
        defaultValue: { summary: "false" },
      },
    },
    size: {
      control: "radio",
      options: Object.values(DropdownSize),
      description: "The size of the dropdown item",
      table: {
        category: "Appearance",
        defaultValue: { summary: DropdownSize.m },
      },
      labels: {
        [DropdownSize.s]: "s",
        [DropdownSize.m]: "m",
        [DropdownSize.l]: "l",
      },
    },
    rtl: {
      control: "boolean",
      description: "Right to left layout",
      table: {
        category: "Appearance",
        defaultValue: { summary: "false" },
      },
    },
    onSelect: {
      action: "selected",
      table: {
        category: "Events",
      },
    },
    className: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-64 bg-[#375064] rounded-lg p-2">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<DropdownItemStoryArgs>;

export default meta;

type Story = StoryObj<DropdownItemStoryArgs>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: {
    item: itemWithIcon,
  },
};

export const WithSeverityBadge: Story = {
  args: {
    item: itemWithSeverity,
  },
};

export const MultiSelectUnselected: Story = {
  args: {
    item: itemWithIcon,
    multiSelect: true,
    isSelected: false,
  },
};

export const MultiSelectSelected: Story = {
  args: {
    item: itemWithIcon,
    multiSelect: true,
    isSelected: true,
  },
};

export const MultiSelectWithSeverity: Story = {
  args: {
    item: itemWithSeverity,
    multiSelect: true,
    isSelected: false,
  },
};

export const MultiSelectWithSeveritySelected: Story = {
  args: {
    item: itemWithSeverity,
    multiSelect: true,
    isSelected: true,
  },
};

export const Selected: Story = {
  args: {
    item: itemWithIcon,
    isSelected: true,
  },
};

export const Disabled: Story = {
  args: {
    item: disabledItem,
  },
};

export const SmallSize: Story = {
  args: {
    item: itemWithIcon,
    size: DropdownSize.s,
  },
};

export const LargeSize: Story = {
  args: {
    item: itemWithIcon,
    size: DropdownSize.l,
  },
};

export const RTL: Story = {
  args: {
    item: {
      ...itemWithIcon,
      label: "הגדרות",
    },
    rtl: true,
  },
};

export const RTLMultiSelectWithSeverity: Story = {
  args: {
    item: {
      ...itemWithSeverity,
      label: "בעיה קריטית",
    },
    multiSelect: true,
    rtl: true,
  },
};

export const RTLMultiSelectWithSeveritySelected: Story = {
  args: {
    item: {
      ...itemWithSeverity,
      label: "בעיה קריטית נבחרת",
    },
    multiSelect: true,
    isSelected: true,
    rtl: true,
  },
};

const SeverityLevelsWrapper = (args: DropdownItemStoryArgs) => (
  <div className="w-64 bg-[#22272B] rounded-lg py-1 space-y-0">
    <DropdownItemComponent
      {...args}
      onSelect={() => {}}
      item={{
        id: "low",
        label: "Low Priority Issue",
        value: "low",
        icon: <BugReportIcon sx={{ fontSize: "inherit" }} />,
        severity: SeverityLevel.Low,
      }}
    />
    <DropdownItemComponent
      {...args}
      onSelect={() => {}}
      item={{
        id: "medium",
        label: "Medium Priority Issue",
        value: "medium",
        icon: <BugReportIcon sx={{ fontSize: "inherit" }} />,
        severity: SeverityLevel.Medium,
      }}
    />
    <DropdownItemComponent
      {...args}
      onSelect={() => {}}
      item={{
        id: "high",
        label: "High Priority Issue",
        value: "high",
        icon: <BugReportIcon sx={{ fontSize: "inherit" }} />,
        severity: SeverityLevel.High,
      }}
    />
    <DropdownItemComponent
      {...args}
      onSelect={() => {}}
      item={{
        id: "critical",
        label: "Critical Priority Issue",
        value: "critical",
        icon: <ErrorIcon sx={{ fontSize: "inherit" }} />,
        severity: SeverityLevel.High,
      }}
    />
  </div>
);

const SeverityLevelsRTLWrapper = (args: DropdownItemStoryArgs) => (
  <div className="w-64 bg-[#22272B] rounded-lg py-1 space-y-0" dir="rtl">
    <DropdownItemComponent
      {...args}
      rtl={true}
      multiSelect={true}
      onSelect={() => {}}
      item={{
        id: "low",
        label: "בעיה עדיפות נמוכה",
        value: "low",
        icon: <BugReportIcon sx={{ fontSize: "inherit" }} />,
        severity: SeverityLevel.Low,
      }}
    />
    <DropdownItemComponent
      {...args}
      rtl={true}
      multiSelect={true}
      onSelect={() => {}}
      item={{
        id: "medium",
        label: "בעיה עדיפות בינונית",
        value: "medium",
        icon: <BugReportIcon sx={{ fontSize: "inherit" }} />,
        severity: SeverityLevel.Medium,
      }}
    />
    <DropdownItemComponent
      {...args}
      rtl={true}
      multiSelect={true}
      onSelect={() => {}}
      item={{
        id: "high",
        label: "בעיה עדיפות גבוהה",
        value: "high",
        icon: <BugReportIcon sx={{ fontSize: "inherit" }} />,
        severity: SeverityLevel.High,
      }}
    />
    <DropdownItemComponent
      {...args}
      rtl={true}
      multiSelect={true}
      onSelect={() => {}}
      item={{
        id: "critical",
        label: "בעיה קריטית",
        value: "critical",
        icon: <ErrorIcon sx={{ fontSize: "inherit" }} />,
        severity: SeverityLevel.High,
      }}
    />
  </div>
);

export const SeverityLevels: Story = {
  render: (args) => <SeverityLevelsWrapper {...args} />,
  parameters: {
    controls: { disable: true },
  },
};

export const SeverityLevelsRTL: Story = {
  render: (args) => <SeverityLevelsRTLWrapper {...args} />,
  parameters: {
    controls: { disable: true },
  },
};
