import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { TextButton } from "./TextButton";
import { TextDirection } from "../textDirection";

const meta: Meta<React.ComponentProps<typeof TextButton>> = {
  title: "Components/Button/TextButton",
  component: TextButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "The text content of the button.",
      table: {
        category: "Content",
      },
    },
    onClick: {
      action: "clicked",
      description: "Required click handler.",
      table: {
        category: "Events",
      },
    },
    textDirection: {
      control: "select",
      options: Object.values(TextDirection),
      description: "The text direction of the button.",
      table: {
        category: "Appearance",
        defaultValue: { summary: "TextDirection.Ltr" },
      },
    },
    isDisabled: {
      control: "boolean",
      description: "If true, the button will be disabled and non-interactive.",
      table: {
        category: "State",
        defaultValue: { summary: "false" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Text Button",
    textDirection: TextDirection.Ltr,
    isDisabled: false,
    onClick: action("text-button-clicked"),
  },
};

export const RTL: Story = {
  args: {
    ...Default.args,
    label: "טקסט",
    textDirection: TextDirection.Rtl,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    label: "Disabled Button",
    isDisabled: true,
  },
};

export const LongText: Story = {
  args: {
    ...Default.args,
    label: "This is a very long text button to test wrapping behavior",
  },
};
