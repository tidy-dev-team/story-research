import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import React from "react";
import {
  DropdownSize,
  DropdownItem,
  DropdownItemComponent,
} from "./DropdownItem";

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

const IconVariantsWrapper = (args: DropdownItemStoryArgs) => (
  <div className="w-64 bg-[#22272B] rounded-lg py-1 space-y-0">
    <DropdownItemComponent
      {...args}
      onSelect={() => {}}
      item={{
        id: "settings",
        label: "Settings",
        value: "settings",
        icon: <SettingsIcon sx={{ fontSize: "inherit" }} />,
      }}
    />
    <DropdownItemComponent
      {...args}
      onSelect={() => {}}
      item={{
        id: "bugs",
        label: "Bug Reports",
        value: "bugs",
        icon: <BugReportIcon sx={{ fontSize: "inherit" }} />,
      }}
    />
    <DropdownItemComponent
      {...args}
      onSelect={() => {}}
      item={{
        id: "errors",
        label: "Error Logs",
        value: "errors",
        icon: <ErrorIcon sx={{ fontSize: "inherit" }} />,
      }}
    />
  </div>
);

const IconVariantsRTLWrapper = (args: DropdownItemStoryArgs) => (
  <div className="w-64 bg-[#22272B] rounded-lg py-1 space-y-0" dir="rtl">
    <DropdownItemComponent
      {...args}
      rtl={true}
      multiSelect={true}
      onSelect={() => {}}
      item={{
        id: "settings",
        label: "הגדרות",
        value: "settings",
        icon: <SettingsIcon sx={{ fontSize: "inherit" }} />,
      }}
    />
    <DropdownItemComponent
      {...args}
      rtl={true}
      multiSelect={true}
      onSelect={() => {}}
      item={{
        id: "bugs",
        label: "דוחות באגים",
        value: "bugs",
        icon: <BugReportIcon sx={{ fontSize: "inherit" }} />,
      }}
    />
    <DropdownItemComponent
      {...args}
      rtl={true}
      multiSelect={true}
      onSelect={() => {}}
      item={{
        id: "errors",
        label: "יומני שגיאות",
        value: "errors",
        icon: <ErrorIcon sx={{ fontSize: "inherit" }} />,
      }}
    />
  </div>
);

export const IconVariants: Story = {
  render: (args) => <IconVariantsWrapper {...args} />,
  parameters: {
    controls: { disable: true },
  },
};

export const IconVariantsRTL: Story = {
  render: (args) => <IconVariantsRTLWrapper {...args} />,
  parameters: {
    controls: { disable: true },
  },
};
