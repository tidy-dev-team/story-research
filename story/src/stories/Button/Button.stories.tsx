import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Button, ButtonSize, ButtonType } from "./Button";
import { TextDirection } from "../textDirection";
import LanguageIcon from "@mui/icons-material/Language";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import HomeIcon from "@mui/icons-material/Home";
import StarIcon from "@mui/icons-material/Star";

const iconOptions = {
  none: undefined,
  language: LanguageIcon,
  settings: SettingsIcon,
  person: PersonIcon,
  delete: DeleteIcon,
  save: SaveIcon,
  edit: EditIcon,
  add: AddIcon,
  search: SearchIcon,
  download: DownloadIcon,
  upload: UploadIcon,
  home: HomeIcon,
  star: StarIcon,
} as const;

type IconOption = keyof typeof iconOptions;

type ButtonStoryArgs = React.ComponentProps<typeof Button> & {
  leadingIconChoice?: IconOption;
  trailingIconChoice?: IconOption;
};

const meta: Meta<ButtonStoryArgs> = {
  title: "Component/Button/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
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
    isDisabled: {
      control: "boolean",
    },
    htmlType: {
      control: "select",
      options: ["button", "submit", "reset"],
    },
    leadingIconChoice: {
      control: "select",
      options: Object.keys(iconOptions),
      description: "Choose a leading icon",
      table: { category: "Icons" },
    },
    trailingIconChoice: {
      control: "select",
      options: Object.keys(iconOptions),
      description: "Choose a trailing icon",
      table: { category: "Icons" },
    },
  },
};

export default meta;
type Story = StoryObj<ButtonStoryArgs>;

export const Default: Story = {
  args: {
    label: "Button",
    type: ButtonType.Primary,
    size: ButtonSize.Medium,
    textDirection: TextDirection.Ltr,
    isDisabled: false,
    htmlType: "button",
    leadingIconChoice: "none",
    trailingIconChoice: "none",
    onClick: action("button-clicked"),
  },
  render: (args) => {
    const { leadingIconChoice, trailingIconChoice, ...rest } = args;
    return (
      <Button
        {...rest}
        LeadingIcon={iconOptions[leadingIconChoice || "none"]}
        TrailingIcon={iconOptions[trailingIconChoice || "none"]}
        onClick={action("button-clicked")}
      />
    );
  },
};

export const WithLeadingIcon: Story = {
  args: {
    ...Default.args,
    label: "Save Document",
    leadingIconChoice: "save",
  },
  render: Default.render,
};

export const WithTrailingIcon: Story = {
  args: {
    ...Default.args,
    label: "Configure",
    trailingIconChoice: "settings",
  },
  render: Default.render,
};

export const WithBothIcons: Story = {
  args: {
    ...Default.args,
    label: "Download File",
    leadingIconChoice: "download",
    trailingIconChoice: "star",
  },
  render: Default.render,
};

export const ActionButtons: Story = {
  args: {
    ...Default.args,
    label: "Delete Item",
    type: ButtonType.Ghost,
    leadingIconChoice: "delete",
  },
  render: Default.render,
};
