import type { Meta, StoryObj } from "@storybook/react";
import { ComponentProps, useState } from "react";
import { Search } from "./Search";

type SearchStoryArgs = ComponentProps<typeof Search>;

const meta: Meta<SearchStoryArgs> = {
  title: "Component/Search",
  component: Search,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    placeholder: "Search",
    value: "",
    rtl: false,
    state: "idle",
    disabled: false,
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
    state: {
      control: "select",
      options: ["idle", "hover", "active", "focused", "disabled"],
      description: "Visual state of the search input",
      table: {
        category: "State",
        defaultValue: { summary: "idle" },
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
    rtl: {
      control: "boolean",
      description: "Whether to use right-to-left layout",
      table: {
        category: "Layout",
        defaultValue: { summary: "false" },
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
    rtl: false,
    state: "idle",
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
    rtl: false,
    state: "idle",
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
    rtl: false,
    state: "focused",
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
    rtl: false,
    state: "disabled",
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
    rtl: false,
    state: "disabled",
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
    rtl: true,
    state: "idle",
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
    rtl: true,
    state: "idle",
    disabled: false,
  },
};

export const Interactive: Story = {
  render: () => {
    const [searchValue, setSearchValue] = useState("");
    const [rtlValue, setRtlValue] = useState("");

    return (
      <div className="space-y-6 bg-[#101010] p-6 rounded-lg">
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
                rtl={true}
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
