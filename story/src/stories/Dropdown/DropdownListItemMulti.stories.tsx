import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { action } from "@storybook/addon-actions";
import SettingsIcon from "@mui/icons-material/Settings";
import { DropdownListItemMulti } from "./DropdownListItemMulti";
import { CheckboxState } from "../Checkbox/Checkbox";
import { TextDirection } from "../textDirection";

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
    label: {
      control: "text",
      description: "The text to display in the list item",
      table: {
        category: "Content",
      },
    },
    checkboxState: {
      control: "select",
      options: Object.values(CheckboxState),
      description: "The state of the checkbox",
      table: {
        category: "State",
        defaultValue: { summary: CheckboxState.Unchecked },
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
    count: {
      control: "number",
      description: "Optional count to display",
      table: {
        category: "Content",
      },
    },
  },
} satisfies Meta<typeof DropdownListItemMulti>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    label: "Multi-select Item",
    checkboxState: CheckboxState.Unchecked,
    textDirection: TextDirection.Ltr,
    isDisabled: false,
    onSelect: action("onSelect"),
  },
};
