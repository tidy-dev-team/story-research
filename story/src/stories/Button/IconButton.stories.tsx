import type { Meta, StoryObj } from "@storybook/react";
import { IconButton, ButtonSize, ButtonType } from "./IconButton";
import LanguageIcon from "@mui/icons-material/Language";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";

const iconMap = {
  Language: <LanguageIcon />,
  Settings: <SettingsIcon />,
  Headphones: <HeadphonesIcon />,
  Add: <AddIcon />,
};

type MuiIconName = keyof typeof iconMap;

type IconButtonStoryArgs = Omit<
  React.ComponentProps<typeof IconButton>,
  "icon"
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
    htmlType: {
      table: { disable: true },
      control: false,
    },
    textDirection: {
      table: { disable: true },
      control: false,
    },
    onClick: {
      action: "clicked",
      description: "Optional click handler.",
      table: {
        category: "Events",
      },
    },
    type: {
      control: { type: "radio" },
      options: Object.values(ButtonType),
    },
    size: {
      control: { type: "radio" },
      options: Object.values(ButtonSize),
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
    type: ButtonType.Primary,
    size: ButtonSize.Medium,
    isDisabled: false,
    muiIcon: "Language",
  },
  render: (args) => {
    const { muiIcon, ...rest } = args;
    return <IconButton {...rest} icon={iconMap[muiIcon]} />;
  },
};

export const Ghost: Story = {
  args: {
    type: ButtonType.Ghost,
    size: ButtonSize.Medium,
    isDisabled: false,
    muiIcon: "Language",
  },
  render: (args) => {
    const { muiIcon, ...rest } = args;
    return <IconButton {...rest} icon={iconMap[muiIcon]} />;
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
            <IconButton size={ButtonSize.XSmall} icon={<AddIcon />} />
            <span className="text-xs text-gray-500">12px</span>
            <IconButton size={ButtonSize.XSmall} icon={<SettingsIcon />} />
            <span className="text-xs text-gray-500">12px</span>
            <IconButton size={ButtonSize.XSmall} icon={<LanguageIcon />} />
            <span className="text-xs text-gray-500">12px</span>
          </div>
        </div>

        <div className="border-b pb-2">
          <h4 className="font-medium mb-2">Small Buttons (16px icons)</h4>
          <div className="flex gap-4 items-center">
            <IconButton size={ButtonSize.Small} icon={<AddIcon />} />
            <span className="text-xs text-gray-500">16px</span>
            <IconButton size={ButtonSize.Small} icon={<SettingsIcon />} />
            <span className="text-xs text-gray-500">16px</span>
            <IconButton size={ButtonSize.Small} icon={<LanguageIcon />} />
            <span className="text-xs text-gray-500">16px</span>
          </div>
        </div>

        <div className="border-b pb-2">
          <h4 className="font-medium mb-2">Medium Buttons (20px icons)</h4>
          <div className="flex gap-4 items-center">
            <IconButton size={ButtonSize.Medium} icon={<AddIcon />} />
            <span className="text-xs text-gray-500">20px</span>
            <IconButton size={ButtonSize.Medium} icon={<SettingsIcon />} />
            <span className="text-xs text-gray-500">20px</span>
            <IconButton size={ButtonSize.Medium} icon={<LanguageIcon />} />
            <span className="text-xs text-gray-500">20px</span>
          </div>
        </div>

        <div className="border-b pb-2">
          <h4 className="font-medium mb-2">Large Buttons (24px icons)</h4>
          <div className="flex gap-4 items-center">
            <IconButton size={ButtonSize.Large} icon={<AddIcon />} />
            <span className="text-xs text-gray-500">24px</span>
            <IconButton size={ButtonSize.Large} icon={<SettingsIcon />} />
            <span className="text-xs text-gray-500">24px</span>
            <IconButton size={ButtonSize.Large} icon={<LanguageIcon />} />
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
