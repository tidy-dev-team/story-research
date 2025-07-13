import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { action } from "@storybook/addon-actions";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import { DropdownListItem } from "./DropdownListItem";
import { TextDirection } from "../textDirection";
import { SeverityLevel } from "../Severity/Severity";
import { DropdownListItemVariant } from "./dropdownListItemStyles";

const iconOptions = {
  none: undefined,
  settings: SettingsIcon,
  person: PersonIcon,
  home: HomeIcon,
  search: SearchIcon,
  notifications: NotificationsIcon,
  favorite: FavoriteIcon,
  delete: DeleteIcon,
} as const;

type IconOption = keyof typeof iconOptions;

type DropdownListItemStoryArgs = React.ComponentProps<
  typeof DropdownListItem
> & {
  iconChoice?: IconOption;
};

const meta: Meta<DropdownListItemStoryArgs> = {
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
    variant: {
      control: { type: "radio" },
      options: Object.values(DropdownListItemVariant),
    },
    severityLevel: {
      control: { type: "select" },
      options: Object.values(SeverityLevel),
      if: { arg: "variant", eq: DropdownListItemVariant.Severity },
    },
    label: {
      control: { type: "text" },
      if: { arg: "variant", eq: DropdownListItemVariant.Text },
    },
    iconChoice: {
      control: { type: "select" },
      options: Object.keys(iconOptions),
      description: "Choose an icon",
      table: { category: "Icons" },
      if: { arg: "variant", eq: DropdownListItemVariant.Text },
    },
    textDirection: {
      control: { type: "radio" },
      options: Object.values(TextDirection),
    },
    isDisabled: {
      control: { type: "boolean" },
    },
    onSelect: {
      control: false,
    },
  },
} satisfies Meta<DropdownListItemStoryArgs>;

export default meta;

type Story = StoryObj<DropdownListItemStoryArgs>;

export const Default: Story = {
  args: {
    variant: DropdownListItemVariant.Text,
    label: "Sample List Item",
    iconChoice: "none",
    textDirection: TextDirection.Ltr,
    isDisabled: false,
    onSelect: action("onSelect"),
  },
  render: (args: DropdownListItemStoryArgs) => {
    const { iconChoice, ...rest } = args;
    if (rest.variant === DropdownListItemVariant.Text) {
      return (
        <DropdownListItem {...rest} icon={iconOptions[iconChoice || "none"]} />
      );
    }
    return <DropdownListItem {...rest} />;
  },
};

export const TextWithIcon: Story = {
  args: {
    variant: DropdownListItemVariant.Text,
    label: "Settings",
    iconChoice: "settings",
    textDirection: TextDirection.Ltr,
    isDisabled: false,
    onSelect: action("onSelect"),
  },
  render: Default.render,
};

export const SeverityHigh: Story = {
  args: {
    variant: DropdownListItemVariant.Severity,
    severityLevel: SeverityLevel.High,
    textDirection: TextDirection.Ltr,
    isDisabled: false,
    onSelect: action("onSelect"),
  },
};

export const SeverityMedium: Story = {
  args: {
    variant: DropdownListItemVariant.Severity,
    severityLevel: SeverityLevel.Medium,
    textDirection: TextDirection.Ltr,
    isDisabled: false,
    onSelect: action("onSelect"),
  },
};

export const SeverityLow: Story = {
  args: {
    variant: DropdownListItemVariant.Severity,
    severityLevel: SeverityLevel.Low,
    textDirection: TextDirection.Ltr,
    isDisabled: false,
    onSelect: action("onSelect"),
  },
};

export const DisabledText: Story = {
  args: {
    variant: DropdownListItemVariant.Text,
    label: "Disabled Item",
    iconChoice: "person",
    textDirection: TextDirection.Ltr,
    isDisabled: true,
    onSelect: action("onSelect"),
  },
  render: Default.render,
};

export const DisabledSeverity: Story = {
  args: {
    variant: DropdownListItemVariant.Severity,
    severityLevel: SeverityLevel.Low,
    textDirection: TextDirection.Ltr,
    isDisabled: true,
    onSelect: action("onSelect"),
  },
};
