import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Dropdown, type DropdownOption } from "./Dropdown";
import { DropdownListItem } from "./DropdownListItem";
import { action } from "@storybook/addon-actions";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";

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
const InteractiveDropdown = (args: any) => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleSelect = (option: DropdownOption) => {
    setSelectedValue(option.value);
    action("option-selected")(option);
  };

  return <Dropdown {...args} value={selectedValue} onSelect={handleSelect} />;
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
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
      <div className="relative">
        <Dropdown {...args}>
          <DropdownListItem
            label="Settings"
            icon={<SettingsIcon />}
            onSelect={() => action("settings-selected")()}
          />
          <DropdownListItem
            label="Account"
            icon={<AccountCircleIcon />}
            onSelect={() => action("account-selected")()}
          />
          <DropdownListItem
            label="Delete"
            icon={<DeleteIcon sx={{ color: "#ef4444" }} />}
            onSelect={() => action("delete-selected")()}
          />
        </Dropdown>
      </div>
    );
  },
};
