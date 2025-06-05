import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import React, { useState } from "react";
import { Dropdown, DropdownSize, DropdownItem } from "./Dropdown";
import LanguageIcon from "@mui/icons-material/Language";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import BugReportIcon from "@mui/icons-material/BugReport";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";

type DropdownStoryArgs = ComponentProps<typeof Dropdown> & {
  hasIcons?: boolean;
  hasSeverityBadges?: boolean;
};

// Sample data for different scenarios
const basicItems: DropdownItem[] = [
  { id: "1", label: "Option 1", value: "option1" },
  { id: "2", label: "Option 2", value: "option2" },
  { id: "3", label: "Option 3", value: "option3" },
  { id: "4", label: "Option 4", value: "option4", disabled: true },
];

const itemsWithIcons: DropdownItem[] = [
  {
    id: "1",
    label: "Profile",
    value: "profile",
    icon: <PersonIcon sx={{ fontSize: "inherit" }} />,
  },
  {
    id: "2",
    label: "Settings",
    value: "settings",
    icon: <SettingsIcon sx={{ fontSize: "inherit" }} />,
  },
  {
    id: "3",
    label: "Language",
    value: "language",
    icon: <LanguageIcon sx={{ fontSize: "inherit" }} />,
  },
  {
    id: "4",
    label: "Disabled Option",
    value: "disabled",
    icon: <SettingsIcon sx={{ fontSize: "inherit" }} />,
    disabled: true,
  },
];

const itemsWithSeverity: DropdownItem[] = [
  {
    id: "1",
    label: "Critical Security Issue",
    value: "critical",
    icon: <ErrorIcon sx={{ fontSize: "inherit" }} />,
    severity: { level: "critical", text: "Critical" },
  },
  {
    id: "2",
    label: "High Priority Bug",
    value: "high",
    icon: <BugReportIcon sx={{ fontSize: "inherit" }} />,
    severity: { level: "high", text: "High" },
  },
  {
    id: "3",
    label: "Medium Warning",
    value: "medium",
    icon: <WarningIcon sx={{ fontSize: "inherit" }} />,
    severity: { level: "medium", text: "Medium" },
  },
  {
    id: "4",
    label: "Low Impact Issue",
    value: "low",
    icon: <BugReportIcon sx={{ fontSize: "inherit" }} />,
    severity: { level: "low", text: "Low" },
  },
];

const meta = {
  title: "Component/Dropdown/Dropdown",
  component: Dropdown,
  args: {
    items: basicItems,
    placeholder: "Select an option",
    size: DropdownSize.m,
    multiSelect: false,
    disabled: false,
    rtl: false,
    hasIcons: false,
    hasSeverityBadges: false,
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    items: {
      table: {
        disable: true,
      },
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when no option is selected",
      table: {
        category: "Content",
      },
    },
    size: {
      control: "radio",
      options: Object.values(DropdownSize),
      description: "The size of the dropdown",
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
    multiSelect: {
      control: "boolean",
      description: "Allow multiple item selection",
      table: {
        category: "Behavior",
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disable the dropdown",
      table: {
        category: "State",
        defaultValue: { summary: "false" },
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
    hasIcons: {
      control: "boolean",
      description: "Show items with icons",
      table: {
        category: "Content",
        defaultValue: { summary: "false" },
      },
    },
    hasSeverityBadges: {
      control: "boolean",
      description: "Show items with severity badges",
      table: {
        category: "Content",
        defaultValue: { summary: "false" },
      },
    },
    onSelectionChange: {
      table: {
        category: "Events",
      },
    },
    selectedValue: {
      table: {
        disable: true,
      },
    },
    className: {
      table: {
        disable: true,
      },
    },
    menuClassName: {
      table: {
        disable: true,
      },
    },
    renderSelectedValue: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<DropdownStoryArgs>;

export default meta;

type Story = StoryObj<DropdownStoryArgs>;

const DropdownWrapper = ({
  hasIcons,
  hasSeverityBadges,
  multiSelect,
  ...args
}: DropdownStoryArgs) => {
  const [selectedItems, setSelectedItems] = useState<DropdownItem[]>([]);

  let items = basicItems;
  if (hasSeverityBadges) {
    items = itemsWithSeverity;
  } else if (hasIcons) {
    items = itemsWithIcons;
  }

  return (
    <div className="w-64">
      <Dropdown
        {...args}
        items={items}
        multiSelect={multiSelect}
        onSelectionChange={setSelectedItems}
      />
      {selectedItems.length > 0 && (
        <div className="mt-4 p-2 bg-gray-800 rounded text-pz-system-fg-1 text-sm">
          <strong>Selected:</strong>{" "}
          {selectedItems.map((item) => item.label).join(", ")}
        </div>
      )}
    </div>
  );
};

const renderStory = (args: DropdownStoryArgs) => <DropdownWrapper {...args} />;

export const Default: Story = {
  render: renderStory,
};

export const WithIcons: Story = {
  args: {
    hasIcons: true,
  },
  render: renderStory,
};

export const WithSeverityBadges: Story = {
  args: {
    hasSeverityBadges: true,
  },
  render: renderStory,
};

export const MultiSelect: Story = {
  args: {
    multiSelect: true,
    hasIcons: true,
  },
  render: renderStory,
};

export const SmallSize: Story = {
  args: {
    size: DropdownSize.s,
    hasIcons: true,
  },
  render: renderStory,
};

export const LargeSize: Story = {
  args: {
    size: DropdownSize.l,
    hasIcons: true,
  },
  render: renderStory,
};

export const RTL: Story = {
  args: {
    rtl: true,
    hasIcons: true,
    placeholder: "בחר אפשרות",
  },
  render: renderStory,
};

export const Disabled: Story = {
  args: {
    disabled: true,
    hasIcons: true,
  },
  render: renderStory,
};

const CustomRenderWrapper = ({
  multiSelect,
  hasIcons,
  ...args
}: DropdownStoryArgs) => {
  const [selectedItems, setSelectedItems] = useState<DropdownItem[]>([]);

  const items = hasIcons ? itemsWithIcons : basicItems;

  return (
    <div className="w-64">
      <Dropdown
        {...args}
        items={items}
        multiSelect={multiSelect}
        onSelectionChange={setSelectedItems}
        renderSelectedValue={(selected) => {
          if (selected.length === 0) return "Nothing selected";
          if (selected.length === 1) return `Selected: ${selected[0].label}`;
          return `${selected.length} items selected`;
        }}
      />
      {selectedItems.length > 0 && (
        <div className="mt-4 p-2 bg-gray-800 rounded text-pz-system-fg-1 text-sm">
          <strong>Selected items:</strong>
          <ul className="list-disc list-inside mt-1">
            {selectedItems.map((item) => (
              <li key={item.id}>{item.label}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export const CustomRender: Story = {
  args: {
    multiSelect: true,
    hasIcons: true,
  },
  render: (args) => <CustomRenderWrapper {...args} />,
};
