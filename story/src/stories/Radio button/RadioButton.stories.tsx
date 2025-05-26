import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import { RadioButton, RadioButtonType } from "./RadioButton";

type RadioButtonStoryArgs = ComponentProps<typeof RadioButton>;

const meta = {
  title: "Component/RadioButton",
  component: RadioButton,
  args: {
    label: "Option",
    selected: false,
    rtl: false,
    disabled: false,
    focused: false,
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "The text label for the radio button (optional)",
      table: {
        category: "Content",
      },
    },
    selected: {
      control: "boolean",
      description: "Whether the radio button is selected",
      table: {
        category: "State",
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Whether the radio button is disabled",
      table: {
        category: "State",
        defaultValue: { summary: "false" },
      },
    },
    focused: {
      control: "boolean",
      description: "Whether the radio button shows focus state",
      table: {
        category: "State",
        defaultValue: { summary: "false" },
      },
    },
    rtl: {
      control: "boolean",
      description: "Right to left text direction",
      table: {
        category: "Appearance",
        defaultValue: { summary: "false" },
      },
    },
    onChange: {
      action: "changed",
      description: "Callback fired when the radio button is clicked",
      table: {
        category: "Events",
      },
    },
  },
} satisfies Meta<RadioButtonStoryArgs>;

export default meta;

type Story = StoryObj<RadioButtonStoryArgs>;

export const Default: Story = {
  args: {
    label: "Default Option",
    selected: false,
  },
};

export const Checked: Story = {
  args: {
    label: "Checked Option",
    selected: true,
  },
};

export const WithoutLabel: Story = {
  args: {
    label: "",
    selected: false,
  },
};

export const RTL: Story = {
  args: {
    label: "خيار",
    selected: false,
    rtl: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Option",
    selected: false,
    disabled: true,
  },
};

export const DisabledSelected: Story = {
  args: {
    label: "Disabled Selected",
    selected: true,
    disabled: true,
  },
};

export const Focused: Story = {
  args: {
    label: "Focused Option",
    selected: false,
    focused: true,
  },
};

export const FocusedSelected: Story = {
  args: {
    label: "Focused Selected",
    selected: true,
    focused: true,
  },
};
