import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import React from "react";
import { action } from "@storybook/addon-actions";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { DropdownListItem } from "./DropdownListItem";
import { TextDirection } from "../textDirection";

type InteractiveStoryArgs = ComponentProps<typeof DropdownListItem> & {
  showIcon: boolean;
};

// Interactive wrapper for Default story to handle icon toggle
const InteractiveDropdownListItem = (args: InteractiveStoryArgs) => {
  const { showIcon, ...componentProps } = args;

  return (
    <DropdownListItem
      {...componentProps}
      icon={showIcon ? <SettingsIcon sx={{ fontSize: "small" }} /> : undefined}
    />
  );
};

const meta = {
  title: "Component/Dropdown/DropdownListItem",
  component: DropdownListItem,
  args: {
    label: "Sample List Item",
    textDirection: TextDirection.Ltr,
    disabled: false,
    onSelect: action("onSelect"),
  },
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
    label: {
      control: "text",
      description: "The text to display in the list item",
      table: {
        category: "Content",
      },
    },
    icon: {
      control: false,
      description:
        "Optional icon to display. Pass a React element like <SettingsIcon />",
      table: {
        category: "Content",
        type: { summary: "React.ReactNode" },
        defaultValue: { summary: "undefined" },
      },
    },
    textDirection: {
      control: "select",
      options: Object.values(TextDirection),
      description: "Text direction for RTL/LTR layout",
      table: {
        category: "Layout",
        defaultValue: { summary: TextDirection.Ltr },
      },
    },
    disabled: {
      control: "boolean",
      description: "Whether the item is disabled",
      table: {
        category: "State",
        defaultValue: { summary: "false" },
      },
    },
    onSelect: {
      action: "clicked",
      table: {
        category: "Events",
      },
    },
  },
} satisfies Meta<typeof DropdownListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic dropdown list item with icon toggle.
 *
 * Example usage:
 * ```tsx
 * import SettingsIcon from "@mui/icons-material/Settings";
 *
 * <DropdownListItem
 *   label="Sample List Item"
 *   icon={<SettingsIcon sx={{ fontSize: "inherit" }} />}
 *   onSelect={() => console.log("Item clicked")}
 * />
 * ```
 */
export const Default = {
  render: (args: any) => {
    const showIcon = args.showIcon;
    const { showIcon: _, ...componentProps } = args;

    return (
      <DropdownListItem
        {...componentProps}
        icon={
          showIcon ? <SettingsIcon sx={{ fontSize: "small" }} /> : undefined
        }
      />
    );
  },
  args: {
    label: "Sample List Item",
    showIcon: false,
    textDirection: TextDirection.Ltr,
    disabled: false,
    onSelect: action("onSelect"),
  },
  argTypes: {
    showIcon: {
      control: "boolean",
      description: "Show/hide the icon",
      table: {
        category: "Content",
        defaultValue: { summary: "false" },
      },
    },
    icon: {
      table: {
        disable: true,
      },
    },
  },
};

/**
 * Dropdown list item with a settings icon.
 *
 * Example usage:
 * ```tsx
 * import SettingsIcon from "@mui/icons-material/Settings";
 *
 * <DropdownListItem
 *   label="Settings"
 *   icon={<SettingsIcon sx={{ fontSize: "inherit" }} />}
 *   onSelect={() => console.log("Settings clicked")}
 * />
 * ```
 */
export const WithSettingsIcon: Story = {
  args: {
    label: "Settings",
    icon: <SettingsIcon sx={{ fontSize: "inherit" }} />,
  },
};

/**
 * Dropdown list item with a user account icon
 */
export const WithAccountIcon: Story = {
  args: {
    label: "Account",
    icon: <AccountCircleIcon sx={{ fontSize: "inherit" }} />,
  },
};

/**
 * Dropdown list item with a delete icon and destructive styling
 */
export const WithDeleteIcon: Story = {
  args: {
    label: "Delete Item",
    icon: <DeleteIcon sx={{ fontSize: "inherit", color: "#ef4444" }} />,
  },
};

/**
 * Disabled dropdown list item with icon
 */
export const DisabledWithIcon: Story = {
  args: {
    label: "Disabled Option",
    icon: <SettingsIcon sx={{ fontSize: "inherit" }} />,
    disabled: true,
  },
};

/**
 * Right-to-left layout with icon
 */
export const RTLWithIcon: Story = {
  args: {
    label: "הגדרות", // "Settings" in Hebrew
    icon: <SettingsIcon sx={{ fontSize: "inherit" }} fontSize="small" />,
    textDirection: TextDirection.Rtl,
  },
};
