import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { action } from "@storybook/addon-actions";
import { DropdownListItemMultiSeverity } from "./DropdownListItemMultiSeverity";
import { SeverityLevel } from "../Severity/Severity";
import { TextDirection } from "../textDirection";
const meta = {
  title: "Component/Dropdown/DropdownListItemMultiSeverity",
  component: DropdownListItemMultiSeverity,
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
    severityLevel: {
      control: "select",
      options: Object.values(SeverityLevel),
      description: "The severity level",
      table: { category: "Content" },
    },
    isChecked: {
      control: "boolean",
      description: "Whether the item is checked",
      table: { category: "State", defaultValue: { summary: "false" } },
    },
    isIndeterminate: {
      control: "boolean",
      description: "Whether the checkbox is in indeterminate state",
      table: { category: "State", defaultValue: { summary: "false" } },
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
      table: { category: "State", defaultValue: { summary: "false" } },
    },
    count: {
      control: "number",
      description: "Optional count to display",
      table: { category: "Content" },
    },
  },
} satisfies Meta<typeof DropdownListItemMultiSeverity>;
export default meta;
export const Default: StoryObj<typeof meta> = {
  args: {
    severityLevel: SeverityLevel.High,
    isChecked: false,
    isIndeterminate: false,
    textDirection: TextDirection.Ltr,
    isDisabled: false,
    onSelect: action("onSelect"),
  },
};
