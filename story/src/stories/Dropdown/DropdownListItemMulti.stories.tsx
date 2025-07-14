import type { Meta, StoryObj } from "@storybook/react";
import React, { useState, useEffect } from "react";
import { action } from "@storybook/addon-actions";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import { DropdownListItemMulti } from "./DropdownListItemMulti";
import { TextDirection } from "../textDirection";
import { SeverityLevel } from "../Severity/Severity";
import { CheckboxState } from "../Checkbox/Checkbox";
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

type DropdownListItemMultiStoryArgs = React.ComponentProps<
  typeof DropdownListItemMulti
> & {
  iconChoice?: IconOption;
};

const meta: Meta<DropdownListItemMultiStoryArgs> = {
  title: "Components/Dropdown/DropdownListItemMulti",
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
    count: {
      control: { type: "number" },
    },
    checkboxState: {
      control: { type: "radio" },
      options: Object.values(CheckboxState),
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
} satisfies Meta<DropdownListItemMultiStoryArgs>;

export default meta;

type Story = StoryObj<DropdownListItemMultiStoryArgs>;

// Interactive wrapper component with state management
const InteractiveDropdownListItemMulti = (
  args: DropdownListItemMultiStoryArgs
) => {
  const [checkboxState, setCheckboxState] = useState(
    args.checkboxState || CheckboxState.Unchecked
  );

  // Sync internal state with args when they change from Storybook controls
  useEffect(() => {
    if (args.checkboxState !== undefined) {
      setCheckboxState(args.checkboxState);
    }
  }, [args.checkboxState]);

  const handleSelect = (newState: CheckboxState) => {
    setCheckboxState(newState);
    action("onSelect")(newState);
  };

  const { iconChoice, ...rest } = args;
  const props = {
    ...rest,
    checkboxState,
    onSelect: handleSelect,
    ...(rest.variant === DropdownListItemVariant.Text && {
      icon: iconOptions[iconChoice || "none"],
    }),
  };

  return <DropdownListItemMulti {...props} />;
};

export const Default: Story = {
  args: {
    variant: DropdownListItemVariant.Text,
    label: "Sample Multi Item",
    iconChoice: "none",
    checkboxState: CheckboxState.Unchecked,
    textDirection: TextDirection.Ltr,
    isDisabled: false,
  },
  render: InteractiveDropdownListItemMulti,
};

export const TextWithIcon: Story = {
  args: {
    variant: DropdownListItemVariant.Text,
    label: "Settings",
    iconChoice: "settings",
    checkboxState: CheckboxState.Checked,
    count: 3,
    textDirection: TextDirection.Ltr,
    isDisabled: false,
  },
  render: InteractiveDropdownListItemMulti,
};

export const IndeterminateState: Story = {
  args: {
    variant: DropdownListItemVariant.Text,
    label: "Partially Selected",
    iconChoice: "person",
    checkboxState: CheckboxState.Indeterminate,
    count: 5,
    textDirection: TextDirection.Ltr,
    isDisabled: false,
  },
  render: InteractiveDropdownListItemMulti,
};

export const SeverityHigh: Story = {
  args: {
    variant: DropdownListItemVariant.Severity,
    severityLevel: SeverityLevel.High,
    checkboxState: CheckboxState.Unchecked,
    count: 12,
    textDirection: TextDirection.Ltr,
    isDisabled: false,
  },
  render: InteractiveDropdownListItemMulti,
};

export const SeverityMedium: Story = {
  args: {
    variant: DropdownListItemVariant.Severity,
    severityLevel: SeverityLevel.Medium,
    checkboxState: CheckboxState.Checked,
    count: 8,
    textDirection: TextDirection.Ltr,
    isDisabled: false,
  },
  render: InteractiveDropdownListItemMulti,
};

export const DisabledText: Story = {
  args: {
    variant: DropdownListItemVariant.Text,
    label: "Disabled Item",
    iconChoice: "person",
    checkboxState: CheckboxState.Unchecked,
    textDirection: TextDirection.Ltr,
    isDisabled: true,
  },
  render: InteractiveDropdownListItemMulti,
};

export const DisabledSeverity: Story = {
  args: {
    variant: DropdownListItemVariant.Severity,
    severityLevel: SeverityLevel.Low,
    checkboxState: CheckboxState.Checked,
    textDirection: TextDirection.Ltr,
    isDisabled: true,
  },
  render: InteractiveDropdownListItemMulti,
};
