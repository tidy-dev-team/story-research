import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Dropdown } from "./Dropdown";
import { DropdownListItem } from "./DropdownListItem";
import { TextDirection } from "../textDirection";
import { action } from "@storybook/addon-actions";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

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
    textDirection: {
      control: "select",
      options: Object.values(TextDirection),
      description: "Text direction for RTL/LTR layout",
      table: {
        category: "Layout",
        defaultValue: { summary: TextDirection.Ltr },
      },
    },
    isOpen: {
      control: "boolean",
      description: "Whether the dropdown is open",
      table: {
        category: "State",
        defaultValue: { summary: "true" },
      },
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    textDirection: TextDirection.Ltr,
    isOpen: true,
    children: (
      <>
        <DropdownListItem
          label="Settings"
          icon={<SettingsIcon />}
          onSelect={action("settings-selected")}
        />
        <DropdownListItem
          label="Account"
          icon={<AccountCircleIcon />}
          onSelect={action("account-selected")}
        />
        <DropdownListItem
          label="Simple Item"
          onSelect={action("simple-selected")}
        />
      </>
    ),
  },
};
