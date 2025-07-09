import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { IconButton, IconButtonSize, IconButtonType } from "./IconButton";
import LanguageIcon from "@mui/icons-material/Language";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";

const iconMap = {
  Language: LanguageIcon,
  Settings: SettingsIcon,
  Headphones: HeadphonesIcon,
  Add: AddIcon,
};

type MuiIconName = keyof typeof iconMap;

type IconButtonStoryArgs = Omit<
  React.ComponentProps<typeof IconButton>,
  "Icon"
> & {
  muiIcon: MuiIconName;
};

const meta: Meta<IconButtonStoryArgs> = {
  title: "Component/Button/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    textDirection: {
      table: { disable: true },
      control: false,
    },
    onClick: {
      action: "clicked",
      description: "Required click handler.",
      table: {
        category: "Events",
      },
    },
    type: {
      control: { type: "radio" },
      options: Object.values(IconButtonType),
    },
    size: {
      control: { type: "radio" },
      options: Object.values(IconButtonSize),
    },
    isDisabled: {
      control: { type: "boolean" },
    },
    muiIcon: {
      control: { type: "select" },
      options: Object.keys(iconMap),
      description: "Choose the icon to display",
      table: { category: "Icon" },
      defaultValue: "Language",
    },
  },
};

export default meta;
type Story = StoryObj<IconButtonStoryArgs>;

export const Default: Story = {
  args: {
    type: IconButtonType.Primary,
    size: IconButtonSize.Medium,
    isDisabled: false,
    muiIcon: "Language",
    onClick: action("icon-button-clicked"),
  },
  render: (args) => {
    const { muiIcon, ...rest } = args;
    return <IconButton {...rest} Icon={iconMap[muiIcon]} />;
  },
};

export const Ghost: Story = {
  args: {
    type: IconButtonType.Ghost,
    size: IconButtonSize.Medium,
    isDisabled: false,
    muiIcon: "Language",
    onClick: action("icon-button-clicked"),
  },
  render: (args) => {
    const { muiIcon, ...rest } = args;
    return <IconButton {...rest} Icon={iconMap[muiIcon]} />;
  },
};

// Icon sizing verification story
export const IconSizingTest: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-4">
      <h3 className="text-lg font-semibold">Icon Sizing Test</h3>

      <div className="flex flex-col gap-4">
        <div className="border-b pb-2">
          <h4 className="font-medium mb-2">XSmall Buttons (12px icons)</h4>
          <div className="flex gap-4 items-center">
            <IconButton
              size={IconButtonSize.XSmall}
              Icon={AddIcon}
              onClick={action("xsmall-add-clicked")}
            />
            <span className="text-xs text-gray-500">12px</span>
            <IconButton
              size={IconButtonSize.XSmall}
              Icon={SettingsIcon}
              onClick={action("xsmall-settings-clicked")}
            />
            <span className="text-xs text-gray-500">12px</span>
            <IconButton
              size={IconButtonSize.XSmall}
              Icon={LanguageIcon}
              onClick={action("xsmall-language-clicked")}
            />
            <span className="text-xs text-gray-500">12px</span>
          </div>
        </div>

        <div className="border-b pb-2">
          <h4 className="font-medium mb-2">Small Buttons (16px icons)</h4>
          <div className="flex gap-4 items-center">
            <IconButton
              size={IconButtonSize.Small}
              Icon={AddIcon}
              onClick={action("small-add-clicked")}
            />
            <span className="text-xs text-gray-500">16px</span>
            <IconButton
              size={IconButtonSize.Small}
              Icon={SettingsIcon}
              onClick={action("small-settings-clicked")}
            />
            <span className="text-xs text-gray-500">16px</span>
            <IconButton
              size={IconButtonSize.Small}
              Icon={LanguageIcon}
              onClick={action("small-language-clicked")}
            />
            <span className="text-xs text-gray-500">16px</span>
          </div>
        </div>

        <div className="border-b pb-2">
          <h4 className="font-medium mb-2">Medium Buttons (20px icons)</h4>
          <div className="flex gap-4 items-center">
            <IconButton
              size={IconButtonSize.Medium}
              Icon={AddIcon}
              onClick={action("medium-add-clicked")}
            />
            <span className="text-xs text-gray-500">20px</span>
            <IconButton
              size={IconButtonSize.Medium}
              Icon={SettingsIcon}
              onClick={action("medium-settings-clicked")}
            />
            <span className="text-xs text-gray-500">20px</span>
            <IconButton
              size={IconButtonSize.Medium}
              Icon={LanguageIcon}
              onClick={action("medium-language-clicked")}
            />
            <span className="text-xs text-gray-500">20px</span>
          </div>
        </div>

        <div className="border-b pb-2">
          <h4 className="font-medium mb-2">Large Buttons (24px icons)</h4>
          <div className="flex gap-4 items-center">
            <IconButton
              size={IconButtonSize.Large}
              Icon={AddIcon}
              onClick={action("large-add-clicked")}
            />
            <span className="text-xs text-gray-500">24px</span>
            <IconButton
              size={IconButtonSize.Large}
              Icon={SettingsIcon}
              onClick={action("large-settings-clicked")}
            />
            <span className="text-xs text-gray-500">24px</span>
            <IconButton
              size={IconButtonSize.Large}
              Icon={LanguageIcon}
              onClick={action("large-language-clicked")}
            />
            <span className="text-xs text-gray-500">24px</span>
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-600 mt-4">
        <p>
          <strong>Expected:</strong> XSmall = 12px, Small = 16px, Medium = 20px,
          Large = 24px
        </p>
        <p>
          Check the browser inspector to verify actual icon sizes match these
          values.
        </p>
        <p>
          <em>Note: Using custom style sizing for precise control.</em>
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Test story to verify that icons are properly sized based on button size. Icons should be 12px for XSmall, 16px for Small, 20px for Medium, and 24px for Large buttons.",
      },
    },
  },
};
