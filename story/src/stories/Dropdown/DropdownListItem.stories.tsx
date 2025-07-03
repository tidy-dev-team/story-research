import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { action } from "@storybook/addon-actions";
import SettingsIcon from "@mui/icons-material/Settings";
import { DropdownListItem } from "./DropdownListItem";
import { TextDirection } from "../textDirection";

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
    label: {
      control: "text",
      description: "The text to display in the list item",
      table: {
        category: "Content",
      },
    },
    textDirection: {
      control: "select",
      options: Object.values(TextDirection),
      description: "Text direction for RTL/LTR layout",
      table: {
        category: "Layout",
        defaultValue: { summary: TextDirection.Ltr },
      },
    },
    isDisabled: {
      control: "boolean",
      description: "Whether the item is disabled",
      table: {
        category: "State",
        defaultValue: { summary: "false" },
      },
    },
  },
} satisfies Meta<typeof DropdownListItem>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    label: "Sample List Item",
    textDirection: TextDirection.Ltr,
    isDisabled: false,
    onSelect: action("onSelect"),
  },
};
