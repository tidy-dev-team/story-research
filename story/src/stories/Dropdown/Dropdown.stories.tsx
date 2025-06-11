import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "./Dropdown";
import { DropdownListItem } from "./DropdownListItem";
import { DropdownListItemSeverity } from "./DropdownListItemSeverity";
import { DropdownListItemMulti } from "./DropdownListItemMulti";
import { DropdownListItemMultiSeverity } from "./DropdownListItemMultiSeverity";
import { useState } from "react";
import {
  Button as IconButton,
  ButtonSize,
  ButtonType,
} from "../Button/IconButton";
import LanguageIcon from "@mui/icons-material/Language"; // Import LanguageIcon

const meta = {
  title: "Component/Dropdown/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    rtl: {
      control: "boolean",
      description: "Right-to-left layout",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    isOpen: {
      control: "boolean",
      description: "Whether the dropdown is visible",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <DropdownListItem label="Option 1" />
        <DropdownListItem label="Option 2" />
        <DropdownListItem label="Option 3" />
        <DropdownListItem label="Option 4" />
        <DropdownListItem label="Option 5" />
      </>
    ),
  },
};

export const WithSeverity: Story = {
  args: {
    children: (
      <>
        <DropdownListItemSeverity level="high" />
        <DropdownListItemSeverity level="medium" />
        <DropdownListItemSeverity level="low" />
      </>
    ),
  },
};

export const WithMultiSelect: Story = {
  render: (args) => {
    const [items, setItems] = useState([
      { label: "Option 1", checked: false, indeterminate: false },
      { label: "Option 2", checked: true, indeterminate: false },
      { label: "Option 3", checked: false, indeterminate: true },
      { label: "Option 4", checked: false, indeterminate: false },
    ]);

    const handleSelect = (index: number, isChecked: boolean) => {
      const newItems = [...items];
      newItems[index] = {
        ...newItems[index],
        checked: isChecked,
        indeterminate: false,
      };
      setItems(newItems);
    };

    return (
      <Dropdown {...args}>
        {items.map((item, index) => (
          <DropdownListItemMulti
            key={item.label}
            label={item.label}
            checked={item.checked}
            indeterminate={item.indeterminate}
            onSelect={(isChecked) => handleSelect(index, isChecked)}
          />
        ))}
      </Dropdown>
    );
  },
  args: {
    // Default args for the Dropdown itself
    rtl: false,
    isOpen: true,
    children: null, // Add children prop with null value as it's rendered dynamically
  },
};

export const WithMultiSelectSeverity: Story = {
  render: (args) => {
    const [items, setItems] = useState([
      {
        severityLabel: "High Severity",
        severityLevel: "high" as const,
        checked: false,
        indeterminate: false,
      },
      {
        severityLabel: "Medium Severity",
        severityLevel: "medium" as const,
        checked: true,
        indeterminate: false,
      },
      {
        severityLabel: "Low Severity",
        severityLevel: "low" as const,
        checked: false,
        indeterminate: true,
      },
    ]);

    const handleSelect = (index: number, isChecked: boolean) => {
      const newItems = [...items];
      newItems[index] = {
        ...newItems[index],
        checked: isChecked,
        indeterminate: false,
      };
      setItems(newItems);
    };

    return (
      <Dropdown {...args}>
        {items.map((item, index) => (
          <DropdownListItemMultiSeverity
            key={item.severityLabel}
            severityLabel={item.severityLabel}
            severityLevel={item.severityLevel}
            checked={item.checked}
            indeterminate={item.indeterminate}
            onSelect={(isChecked) => handleSelect(index, isChecked)}
          />
        ))}
      </Dropdown>
    );
  },
  args: {
    // Default args for the Dropdown itself
    rtl: false,
    isOpen: true,
    children: null, // Add children prop with null value as it's rendered dynamically
  },
};

export const WithIconButtonToggle: Story = {
  parameters: {
    layout: "padded", // Override layout for this specific story
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ position: "relative", display: "inline-block" }}>
        <IconButton
          icon={LanguageIcon} // Use LanguageIcon here
          type={ButtonType.Ghost}
          size={ButtonSize.Medium}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-controls="dropdown-menu"
        />
        <Dropdown {...args} isOpen={isOpen} id="dropdown-menu">
          <DropdownListItem label="English" onSelect={() => setIsOpen(false)} />
          <DropdownListItem label="French" onSelect={() => setIsOpen(false)} />
          <DropdownListItem label="German" onSelect={() => setIsOpen(false)} />
        </Dropdown>
      </div>
    );
  },
  args: {
    // Default args for the Dropdown itself, isOpen is controlled by state
    rtl: false,
    children: null, // Add children prop with null value as it's rendered dynamically
  },
};
