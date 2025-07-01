import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import RadioButton from "./RadioButton";
import { TextDirection } from "../textDirection";

const meta: Meta<typeof RadioButton> = {
  title: "Components/RadioButton",
  component: RadioButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    label: "Option",
    selected: false,
    disabled: false,
    textDirection: TextDirection.Ltr,
  },
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
    textDirection: {
      control: "select",
      options: Object.values(TextDirection),
      description: "Text direction for RTL/LTR layout",
      table: {
        category: "Layout",
        defaultValue: { summary: "ltr" },
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
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Default Option",
  },
};

export const Group: Story = {
  render: (args) => {
    const [selected, setSelected] = useState("one");
    const options = ["one", "two", "three"];

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
        dir={args.textDirection}
      >
        {options.map((option) => (
          <RadioButton
            key={option}
            label={`Option ${option}`}
            selected={selected === option}
            onChange={() => setSelected(option)}
            disabled={args.disabled}
            textDirection={args.textDirection}
          />
        ))}
      </div>
    );
  },
};
