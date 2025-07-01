import type { Meta, StoryObj } from "@storybook/react";
import { ComponentProps, useState } from "react";
import { Search } from "./Search";
import { TextDirection } from "../textDirection";

type SearchStoryArgs = ComponentProps<typeof Search>;

const meta: Meta<SearchStoryArgs> = {
  title: "Components/Search",
  component: Search,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    placeholder: "Search",
    value: "",
    textDirection: TextDirection.Ltr,
    disabled: false,
    autoFocus: false,
  },
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text for the search input",
      table: {
        category: "Content",
        defaultValue: { summary: "Search" },
      },
    },
    value: {
      control: "text",
      description: "Current value of the search input",
      table: {
        category: "Content",
        defaultValue: { summary: "" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Whether the search input is disabled",
      table: {
        category: "State",
        defaultValue: { summary: "false" },
      },
    },
    textDirection: {
      control: "select",
      options: [TextDirection.Ltr, TextDirection.Rtl],
      description: "Text direction for the search component",
      table: {
        category: "Layout",
        defaultValue: { summary: TextDirection.Ltr },
      },
    },
    onChange: {
      action: "changed",
      description: "Callback fired when the input value changes",
      table: {
        category: "Events",
      },
    },
    onClear: {
      action: "cleared",
      description: "Callback fired when the clear button is clicked",
      table: {
        category: "Events",
      },
    },
    onFocus: {
      action: "focused",
      description: "Callback fired when the input receives focus",
      table: {
        category: "Events",
      },
    },
    onBlur: {
      action: "blurred",
      description: "Callback fired when the input loses focus",
      table: {
        category: "Events",
      },
    },
    autoFocus: {
      control: "boolean",
      description: "Whether the input should automatically receive focus",
      table: { category: "Behavior", defaultValue: { summary: "false" } },
    },
  },
};

export default meta;
type Story = StoryObj<SearchStoryArgs>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value || "");

    return (
      <div>
        <Search
          {...args}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            args.onChange?.(e);
          }}
          onClear={() => {
            setValue("");
            args.onClear?.();
          }}
        />
      </div>
    );
  },
  args: {
    placeholder: "Search",
    value: "",
    textDirection: TextDirection.Ltr,
    disabled: false,
  },
};

export const Filled: Story = {
  render: (args) => {
    const [value, setValue] = useState("Search query");

    return (
      <div>
        <Search
          {...args}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            args.onChange?.(e);
          }}
          onClear={() => {
            setValue("");
            args.onClear?.();
          }}
        />
      </div>
    );
  },
  args: {
    placeholder: "Search",
    textDirection: TextDirection.Ltr,
    disabled: false,
  },
};

export const Focused: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value || "");

    return (
      <div>
        <Search
          {...args}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            args.onChange?.(e);
          }}
          onClear={() => {
            setValue("");
            args.onClear?.();
          }}
          autoFocus
        />
      </div>
    );
  },
  args: {
    placeholder: "Search",
    value: "",
    textDirection: TextDirection.Ltr,
    disabled: false,
  },
};

export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value || "");

    return (
      <div>
        <Search
          {...args}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            args.onChange?.(e);
          }}
          onClear={() => {
            setValue("");
            args.onClear?.();
          }}
        />
      </div>
    );
  },
  args: {
    placeholder: "Search",
    value: "",
    textDirection: TextDirection.Ltr,
    disabled: true,
  },
};

export const DisabledFilled: Story = {
  render: (args) => {
    const [value, setValue] = useState("Disabled search");

    return (
      <div>
        <Search
          {...args}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            args.onChange?.(e);
          }}
          onClear={() => {
            setValue("");
            args.onClear?.();
          }}
        />
      </div>
    );
  },
  args: {
    placeholder: "Search",
    textDirection: TextDirection.Ltr,
    disabled: true,
  },
};

export const RTL: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value || "");

    return (
      <div>
        <Search
          {...args}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            args.onChange?.(e);
          }}
          onClear={() => {
            setValue("");
            args.onClear?.();
          }}
        />
      </div>
    );
  },
  args: {
    placeholder: "חיפוש",
    value: "",
    textDirection: TextDirection.Rtl,
    disabled: false,
  },
};

export const RTLFilled: Story = {
  render: (args) => {
    const [value, setValue] = useState("שאילתת חיפוש");

    return (
      <div>
        <Search
          {...args}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            args.onChange?.(e);
          }}
          onClear={() => {
            setValue("");
            args.onClear?.();
          }}
        />
      </div>
    );
  },
  args: {
    placeholder: "חיפוש",
    textDirection: TextDirection.Rtl,
    disabled: false,
  },
};

export const Interactive: Story = {
  render: () => {
    const [searchValue, setSearchValue] = useState("");
    const [rtlValue, setRtlValue] = useState("");

    return (
      <div className="space-y-6 bg-pz-system-bg-1 p-6 rounded-lg">
        <div className="space-y-4">
          <h3 className="text-pz-system-fg-1 text-lg font-medium">
            Interactive Search Components
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-pz-system-fg-1 text-sm font-medium mb-2 block">
                Standard Search (LTR)
              </label>
              <Search
                placeholder="Type to search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onClear={() => setSearchValue("")}
              />
            </div>

            <div>
              <label className="text-pz-system-fg-1 text-sm font-medium mb-2 block">
                RTL Search
              </label>
              <Search
                placeholder="הקלד לחיפוש..."
                value={rtlValue}
                onChange={(e) => setRtlValue(e.target.value)}
                onClear={() => setRtlValue("")}
                textDirection={TextDirection.Rtl}
              />
            </div>

            <div>
              <label className="text-pz-system-fg-1 text-sm font-medium mb-2 block">
                Disabled Search
              </label>
              <Search
                placeholder="Disabled search"
                value="Cannot edit this"
                disabled={true}
              />
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-400">
            <div>LTR Value: "{searchValue}"</div>
            <div>RTL Value: "{rtlValue}"</div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive search components demonstrating different states and RTL support. Try typing in the inputs to see the clear button appear.",
      },
    },
  },
};
