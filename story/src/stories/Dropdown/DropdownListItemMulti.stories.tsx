import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import { DropdownListItemMulti } from "./DropdownListItemMulti";
import { TextDirection } from "../textDirection";
import { SeverityLevel } from "../Severity/Severity";

const meta = {
  title: "Component/Dropdown/DropdownListItemMulti",
  component: DropdownListItemMulti,
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
    variant: {
      control: { type: "radio" },
      options: ["text", "severity"],
    },
    severityLevel: {
      control: { type: "select" },
      options: Object.values(SeverityLevel),
      if: { arg: "variant", eq: "severity" },
    },
    label: {
      control: { type: "text" },
      if: { arg: "variant", eq: "text" },
    },
    icon: {
      control: { type: "select" },
      options: ["none", "settings", "person", "home", "search", "notifications", "favorite", "delete"],
      mapping: {
        none: undefined,
        settings: <SettingsIcon sx={{ fontSize: 16 }} />,
        person: <PersonIcon sx={{ fontSize: 16 }} />,
        home: <HomeIcon sx={{ fontSize: 16 }} />,
        search: <SearchIcon sx={{ fontSize: 16 }} />,
        notifications: <NotificationsIcon sx={{ fontSize: 16 }} />,
        favorite: <FavoriteIcon sx={{ fontSize: 16 }} />,
        delete: <DeleteIcon sx={{ fontSize: 16, color: "#ef4444" }} />,
      },
      if: { arg: "variant", eq: "text" },
    },
    count: {
      control: { type: "number" },
    },
    isChecked: {
      control: { type: "boolean" },
    },
    isIndeterminate: {
      control: { type: "boolean" },
    },
    textDirection: {
      control: { type: "radio" },
      options: Object.values(TextDirection),
    },
    isDisabled: {
      control: { type: "boolean" },
    },
    onSelect: {
      control: false,
    },
  },
} satisfies Meta<typeof DropdownListItemMulti>;

export default meta;

type Story = StoryObj<typeof meta>;

// Interactive wrapper component with state management
const InteractiveDropdownListItemMulti = (args: React.ComponentProps<typeof DropdownListItemMulti>) => {
  const [isChecked, setIsChecked] = useState(args.isChecked || false);
  const [isIndeterminate, setIsIndeterminate] = useState(args.isIndeterminate || false);

  const handleSelect = (checked: boolean) => {
    setIsChecked(checked);
    setIsIndeterminate(false); // Clear indeterminate when explicitly checking/unchecking
    action("onSelect")(checked);
  };

  return (
    <DropdownListItemMulti
      {...args}
      isChecked={isChecked}
      isIndeterminate={isIndeterminate}
      onSelect={handleSelect}
    />
  );
};

export const Default: Story = {
  args: {
    variant: "text",
    label: "Sample Multi Item",
    icon: "none",
    isChecked: false,
    isIndeterminate: false,
    textDirection: TextDirection.Ltr,
    isDisabled: false,
  },
  render: InteractiveDropdownListItemMulti,
};

export const TextWithIcon: Story = {
  args: {
    variant: "text",
    label: "Settings",
    icon: "settings",
    isChecked: true,
    isIndeterminate: false,
    count: 3,
    textDirection: TextDirection.Ltr,
    isDisabled: false,
  },
  render: InteractiveDropdownListItemMulti,
};

export const IndeterminateState: Story = {
  args: {
    variant: "text",
    label: "Partially Selected",
    icon: "person",
    isChecked: false,
    isIndeterminate: true,
    count: 5,
    textDirection: TextDirection.Ltr,
    isDisabled: false,
  },
  render: InteractiveDropdownListItemMulti,
};

export const SeverityHigh: Story = {
  args: {
    variant: "severity",
    severityLevel: SeverityLevel.High,
    isChecked: false,
    isIndeterminate: false,
    count: 12,
    textDirection: TextDirection.Ltr,
    isDisabled: false,
  },
  render: InteractiveDropdownListItemMulti,
};

export const SeverityMedium: Story = {
  args: {
    variant: "severity",
    severityLevel: SeverityLevel.Medium,
    isChecked: true,
    isIndeterminate: false,
    count: 8,
    textDirection: TextDirection.Ltr,
    isDisabled: false,
  },
  render: InteractiveDropdownListItemMulti,
};

export const DisabledText: Story = {
  args: {
    variant: "text",
    label: "Disabled Item",
    icon: "person",
    isChecked: false,
    isIndeterminate: false,
    textDirection: TextDirection.Ltr,
    isDisabled: true,
  },
  render: InteractiveDropdownListItemMulti,
};

export const DisabledSeverity: Story = {
  args: {
    variant: "severity",
    severityLevel: SeverityLevel.Low,
    isChecked: true,
    isIndeterminate: false,
    textDirection: TextDirection.Ltr,
    isDisabled: true,
  },
  render: InteractiveDropdownListItemMulti,
};
