import type { Meta, StoryObj } from "@storybook/react";
import { Button, ButtonSize, ButtonType } from "./Button";
import { TextDirection } from "../textDirection";
import LanguageIcon from "@mui/icons-material/Language";
import SettingsIcon from "@mui/icons-material/Settings";

type ButtonStoryArgs = React.ComponentProps<typeof Button> & {
  showLeadingIcon?: boolean;
  showTrailingIcon?: boolean;
};

const meta: Meta<ButtonStoryArgs> = {
  title: "Component/Button/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: Object.values(ButtonType),
    },
    size: {
      control: "select",
      options: Object.values(ButtonSize),
    },
    textDirection: {
      control: "select",
      options: Object.values(TextDirection),
    },
    disabled: {
      control: "boolean",
    },
    type: {
      control: "select",
      options: ["button", "submit", "reset"],
    },
    showLeadingIcon: {
      control: "boolean",
      description: "Show leading icon",
      table: { category: "Icons" },
      defaultValue: false,
    },
    showTrailingIcon: {
      control: "boolean",
      description: "Show trailing icon",
      table: { category: "Icons" },
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<ButtonStoryArgs>;

export const Default: Story = {
  args: {
    label: "Button",
    variant: ButtonType.Primary,
    size: ButtonSize.Medium,
    textDirection: TextDirection.Ltr,
    disabled: false,
    type: "button",
    showLeadingIcon: false,
    showTrailingIcon: false,
  },
  render: (args) => {
    const { showLeadingIcon, showTrailingIcon, ...rest } = args;
    return (
      <Button
        {...rest}
        leadingIcon={showLeadingIcon ? <LanguageIcon /> : undefined}
        trailingIcon={showTrailingIcon ? <SettingsIcon /> : undefined}
      />
    );
  },
};
