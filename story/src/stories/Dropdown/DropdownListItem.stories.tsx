import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { action } from "@storybook/addon-actions";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import { DropdownListItem } from "./DropdownListItem";
import { TextDirection } from "../textDirection";
import { SeverityLevel } from "../Severity/Severity";

const meta = {
  title: "Component/Dropdown/DropdownListItem",
  component: DropdownListItem,
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
} satisfies Meta<typeof DropdownListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "text",
    label: "Sample List Item",
    icon: "none",
    textDirection: TextDirection.Ltr,
    isDisabled: false,
    onSelect: action("onSelect"),
  },
};

export const TextWithIcon: Story = {
  args: {
    variant: "text",
    label: "Settings",
    icon: "settings",
    textDirection: TextDirection.Ltr,
    isDisabled: false,
    onSelect: action("onSelect"),
  },
};

export const SeverityHigh: Story = {
  args: {
    variant: "severity",
    severityLevel: SeverityLevel.High,
    textDirection: TextDirection.Ltr,
    isDisabled: false,
    onSelect: action("onSelect"),
  },
};

export const SeverityMedium: Story = {
  args: {
    variant: "severity",
    severityLevel: SeverityLevel.Medium,
    textDirection: TextDirection.Ltr,
    isDisabled: false,
    onSelect: action("onSelect"),
  },
};

export const SeverityLow: Story = {
  args: {
    variant: "severity",
    severityLevel: SeverityLevel.Low,
    textDirection: TextDirection.Ltr,
    isDisabled: false,
    onSelect: action("onSelect"),
  },
};

export const DisabledText: Story = {
  args: {
    variant: "text",
    label: "Disabled Item",
    icon: "person",
    textDirection: TextDirection.Ltr,
    isDisabled: true,
    onSelect: action("onSelect"),
  },
};

export const DisabledSeverity: Story = {
  args: {
    variant: "severity",
    severityLevel: SeverityLevel.Low,
    textDirection: TextDirection.Ltr,
    isDisabled: true,
    onSelect: action("onSelect"),
  },
};
