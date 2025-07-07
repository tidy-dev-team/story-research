import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Dropdown, type DropdownOption } from "./Dropdown";
import { DropdownListItemSingle } from "./DropdownListItemSingle";
import { DropdownListItemMulti } from "./DropdownListItemMulti";
import { action } from "@storybook/addon-actions";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { SeverityLevel } from "../Severity/Severity";
import { TextDirection } from "../textDirection";

const sampleOptions: DropdownOption[] = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
  { value: "settings", label: "Settings" },
  { value: "account", label: "Account" },
];

const meta = {
  title: "Component/Dropdown/Dropdown",
  component: Dropdown,
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
    placeholder: {
      control: "text",
      description: "Placeholder text when no option is selected",
      table: {
        category: "Content",
      },
    },
    isDisabled: {
      control: "boolean",
      description: "Whether the dropdown is disabled",
      table: {
        category: "State",
        defaultValue: { summary: "false" },
      },
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;

// Interactive story with state management
const InteractiveDropdown = (args: React.ComponentProps<typeof Dropdown>) => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleSelect = (option: DropdownOption) => {
    setSelectedValue(option.value);
    action("option-selected")(option);
  };

  return <Dropdown {...args} value={selectedValue} onSelect={handleSelect} />;
};

// Multi-select story component with state management
const MultiSelectDropdown = (args: React.ComponentProps<typeof Dropdown>) => {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const handleToggle = (key: string) => (isChecked: boolean) => {
    const newSelection = new Set(selectedItems);
    if (isChecked) {
      newSelection.add(key);
    } else {
      newSelection.delete(key);
    }
    setSelectedItems(newSelection);
    action("multi-select-changed")(Array.from(newSelection));
  };

  return (
    <div className="relative">
      <Dropdown {...args}>
        <DropdownListItemMulti
          variant="text"
          label="Option 1"
          icon={<SettingsIcon sx={{ fontSize: 16 }} />}
          isChecked={selectedItems.has("option1")}
          textDirection={TextDirection.Ltr}
          onSelect={handleToggle("option1")}
        />
        <DropdownListItemMulti
          variant="text"
          label="Option 2"
          icon={<AccountCircleIcon sx={{ fontSize: 16 }} />}
          isChecked={selectedItems.has("option2")}
          textDirection={TextDirection.Ltr}
          onSelect={handleToggle("option2")}
        />
        <DropdownListItemMulti
          variant="severity"
          severityLevel={SeverityLevel.High}
          isChecked={selectedItems.has("severity-high")}
          textDirection={TextDirection.Ltr}
          onSelect={handleToggle("severity-high")}
        />
      </Dropdown>
    </div>
  );
};

export const Default: StoryObj<typeof meta> = {
  args: {
    placeholder: "Select an option",
    options: sampleOptions,
    isDisabled: false,
  },
  render: InteractiveDropdown,
};

export const WithCustomChildren: StoryObj<typeof meta> = {
  args: {
    placeholder: "Choose action",
    options: [], // Not used when children are provided
    isDisabled: false,
  },
  render: (args) => {
    return (
      <div className="relative">
        <Dropdown {...args}>
          <DropdownListItemSingle
            variant="text"
            label="Settings"
            icon={<SettingsIcon sx={{ fontSize: 16 }} />}
            textDirection={TextDirection.Ltr}
            onSelect={() => action("settings-selected")()}
          />
          <DropdownListItemSingle
            variant="text"
            label="Account"
            icon={<AccountCircleIcon sx={{ fontSize: 16 }} />}
            textDirection={TextDirection.Ltr}
            onSelect={() => action("account-selected")()}
          />
          <DropdownListItemSingle
            variant="text"
            label="Delete"
            icon={<DeleteIcon sx={{ fontSize: 16, color: "#ef4444" }} />}
            textDirection={TextDirection.Ltr}
            onSelect={() => action("delete-selected")()}
          />
        </Dropdown>
      </div>
    );
  },
};

export const WithSeverityItems: StoryObj<typeof meta> = {
  args: {
    placeholder: "Select severity level",
    options: [],
    isDisabled: false,
  },
  render: (args) => {
    return (
      <div className="relative">
        <Dropdown {...args}>
          <DropdownListItemSingle
            variant="severity"
            severityLevel={SeverityLevel.High}
            textDirection={TextDirection.Ltr}
            onSelect={() => action("high-severity-selected")()}
          />
          <DropdownListItemSingle
            variant="severity"
            severityLevel={SeverityLevel.Medium}
            textDirection={TextDirection.Ltr}
            onSelect={() => action("medium-severity-selected")()}
          />
          <DropdownListItemSingle
            variant="severity"
            severityLevel={SeverityLevel.Low}
            textDirection={TextDirection.Ltr}
            onSelect={() => action("low-severity-selected")()}
          />
        </Dropdown>
      </div>
    );
  },
};

export const WithMultiSelectItems: StoryObj<typeof meta> = {
  args: {
    placeholder: "Multi-select options",
    options: [],
    isDisabled: false,
  },
  render: MultiSelectDropdown,
};
