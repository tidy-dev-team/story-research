import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "./Dropdown";
import { DropdownListItem } from "./DropdownListItem";
import { DropdownListItemSeverity } from "./DropdownListItemSeverity";
import { DropdownListItemMulti } from "./DropdownListItemMulti";
import { DropdownListItemMultiSeverity } from "./DropdownListItemMultiSeverity";
import { SeverityLevel } from "../Severity/Severity";
import { CheckboxState } from "../Checkbox/Checkbox";
import { useState } from "react";
import { IconButton, ButtonSize, ButtonType } from "../Button/IconButton";
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
      { label: "Option 1", checkboxState: CheckboxState.Unchecked },
      { label: "Option 2", checkboxState: CheckboxState.Checked },
      { label: "Option 3", checkboxState: CheckboxState.Indeterminate },
      { label: "Option 4", checkboxState: CheckboxState.Unchecked },
    ]);

    const handleSelect = (index: number, newState: CheckboxState) => {
      const newItems = [...items];
      newItems[index] = {
        ...newItems[index],
        checkboxState: newState,
      };
      setItems(newItems);
    };

    return (
      <Dropdown {...args}>
        {items.map((item, index) => (
          <DropdownListItemMulti
            key={item.label}
            label={item.label}
            checkboxState={item.checkboxState}
            onSelect={(newState) => handleSelect(index, newState)}
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
        severityLevel: SeverityLevel.High,
        checked: false,
        indeterminate: false,
      },
      {
        severityLevel: SeverityLevel.Medium,
        checked: true,
        indeterminate: false,
      },
      {
        severityLevel: SeverityLevel.Low,
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
            key={`severity-${item.severityLevel}-${index}`}
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
          icon={<LanguageIcon />}
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
