import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { LinkButton } from "./LinkButton";
import { TextDirection } from "../textDirection";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LanguageIcon from "@mui/icons-material/Language";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";

const iconOptions = {
  none: undefined,
  arrowForward: ArrowForwardIcon,
  language: LanguageIcon,
  settings: SettingsIcon,
  person: PersonIcon,
} as const;

type IconOption = keyof typeof iconOptions;

type LinkButtonStoryArgs = React.ComponentProps<typeof LinkButton> & {
  trailingIconChoice?: IconOption;
};

const meta: Meta<LinkButtonStoryArgs> = {
  title: "Components/Button/LinkButton",
  component: LinkButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "The text content of the link button.",
      table: {
        category: "Content",
      },
    },
    href: {
      control: "text",
      description: "The URL that the link button points to.",
      table: {
        category: "Content",
      },
    },
    trailingIconChoice: {
      control: "select",
      options: Object.keys(iconOptions),
      description: "Choose a trailing icon",
      table: { category: "Icons" },
    },
    trailingIcon: {
      description: "The trailing icon component.",
      table: {
        category: "Content",
        disable: true,
      },
    },
    onClick: {
      action: "clicked",
      description: "Callback fired when the link button is clicked.",
      table: {
        category: "Events",
      },
    },
    textDirection: {
      control: "select",
      options: Object.values(TextDirection),
      description: "The text direction of the link button.",
      table: {
        category: "Appearance",
        defaultValue: { summary: "TextDirection.Ltr" },
      },
    },
    isDisabled: {
      control: "boolean",
      description:
        "If true, the link button will be disabled and non-interactive.",
      table: {
        category: "State",
        defaultValue: { summary: "false" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<LinkButtonStoryArgs>;

export const Default: Story = {
  args: {
    label: "Link Button",
    href: "#",
    trailingIconChoice: "none",
    textDirection: TextDirection.Ltr,
    isDisabled: false,
    onClick: action("link-button-clicked"),
  },
  render: (args) => {
    const { trailingIconChoice, ...rest } = args;
    return (
      <LinkButton
        {...rest}
        trailingIcon={iconOptions[trailingIconChoice || "none"]}
      />
    );
  },
};

export const WithTrailingIcon: Story = {
  args: {
    ...Default.args,
    label: "Visit Website",
    trailingIconChoice: "arrowForward",
  },
  render: Default.render,
};

export const RTL: Story = {
  args: {
    ...Default.args,
    label: "קישור",
    textDirection: TextDirection.Rtl,
    trailingIconChoice: "arrowForward",
  },
  render: Default.render,
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    label: "Disabled Link",
    isDisabled: true,
    trailingIconChoice: "arrowForward",
  },
  render: Default.render,
};
