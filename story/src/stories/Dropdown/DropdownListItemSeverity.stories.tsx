import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { action } from "@storybook/addon-actions";
import { DropdownListItemSeverity } from "./DropdownListItemSeverity";
import { SeverityLevel } from "../Severity/Severity";
import { TextDirection } from "../textDirection";

const meta = {
  title: "Component/Dropdown/DropdownListItemSeverity",
  component: DropdownListItemSeverity,
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
    level: {
      control: "select",
      options: Object.values(SeverityLevel),
      description: "The severity level",
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
} satisfies Meta<typeof DropdownListItemSeverity>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    level: SeverityLevel.High,
    textDirection: TextDirection.Ltr,
    isDisabled: false,
    onSelect: action("onSelect"),
  },
};
