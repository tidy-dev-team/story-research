import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { action } from "@storybook/addon-actions";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import { DropdownListItemSingle } from "./DropdownListItemSingle";
import { TextDirection } from "../textDirection";
import { SeverityLevel } from "../Severity/Severity";

const meta = {
  title: "Component/Dropdown/DropdownListItemSingle",
  component: DropdownListItemSingle,
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
} satisfies Meta<typeof DropdownListItemSingle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TextVariant: Story = {
  args: {
    variant: "text",
    label: "Sample List Item",
    textDirection: TextDirection.Ltr,
    isDisabled: false,
    onSelect: action("onSelect"),
  },
};

export const TextWithIcon: Story = {
  args: {
    variant: "text",
    label: "Settings",
    icon: <SettingsIcon sx={{ fontSize: 16 }} />,
    textDirection: TextDirection.Ltr,
    isDisabled: false,
    onSelect: action("onSelect"),
  },
};

export const SeverityVariant: Story = {
  args: {
    variant: "severity",
    severityLevel: SeverityLevel.High,
    textDirection: TextDirection.Ltr,
    isDisabled: false,
    onSelect: action("onSelect"),
  },
};

export const DisabledText: Story = {
  args: {
    variant: "text",
    label: "Disabled Item",
    icon: <PersonIcon sx={{ fontSize: 16 }} />,
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
