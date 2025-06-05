import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import { RadioButton, RadioButtonType } from "./RadioButton";
import { useState } from "react";

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
    disabled: false,
    focused: false,
    rtl: false,
  },
};

export const Selected: Story = {
  args: {
    label: "Selected Option",
    selected: true,
    disabled: false,
    focused: false,
    rtl: false,
  },
};

export const WithoutLabel: Story = {
  args: {
    label: undefined,
    selected: false,
    disabled: false,
    focused: false,
    rtl: false,
  },
};

export const RTL: Story = {
  args: {
    label: "אפשרות",
    selected: false,
    rtl: true,
    disabled: false,
    focused: false,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Option",
    selected: false,
    disabled: true,
    focused: false,
    rtl: false,
  },
};

export const DisabledSelected: Story = {
  args: {
    label: "Disabled Selected",
    selected: true,
    disabled: true,
    focused: false,
    rtl: false,
  },
};

export const Focused: Story = {
  args: {
    label: "Focused Option",
    selected: false,
    focused: true,
    disabled: false,
    rtl: false,
  },
};

export const FocusedSelected: Story = {
  args: {
    label: "Focused Selected",
    selected: true,
    focused: true,
    disabled: false,
    rtl: false,
  },
};

export const KeyboardNavigation: Story = {
  render: () => {
    const [selectedOption, setSelectedOption] = useState<string>("option1");

    return (
      <div>
        <h3 className="text-pz-system-fg-1 text-lg font-medium mb-4">
          Use Up/Down arrows to select
        </h3>
        <div className="space-y-3">
          <RadioButton
            label="Option 1"
            selected={selectedOption === "option1"}
            onChange={() => setSelectedOption("option1")}
          />
          <RadioButton
            label="Option 2"
            selected={selectedOption === "option2"}
            onChange={() => setSelectedOption("option2")}
          />
          <RadioButton
            label="Option 3"
            selected={selectedOption === "option3"}
            onChange={() => setSelectedOption("option3")}
          />
          <RadioButton
            label="Disabled Option"
            selected={selectedOption === "option4"}
            disabled={true}
            onChange={() => setSelectedOption("option4")}
          />
        </div>
        <div className="mt-4 text-sm text-pz-system-fg-4">
          Selected: {selectedOption}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates keyboard accessibility. Use Up/Down arrows to navigate between radio buttons. Disabled radio buttons are skipped during keyboard navigation.",
      },
    },
  },
};
