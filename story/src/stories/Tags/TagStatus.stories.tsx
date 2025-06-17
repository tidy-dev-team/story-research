import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { TagStatus, TagStatusType } from "./TagStatus";

const meta = {
  title: "Components/Tags/TagStatus",
  component: TagStatus,
  parameters: {
    layout: "centered",
    docs: {
      source: {
        state: "open",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: Object.values(TagStatusType),
      description: "The status type that determines the color scheme",
      table: {
        category: "Content",
        defaultValue: { summary: "TagStatusType.Ok" },
      },
    },
    label: {
      control: { type: "text" },
      description: "The text to display in the status tag",
      table: {
        category: "Content",
      },
    },
  },
} satisfies Meta<typeof TagStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: TagStatusType.Ok,
    label: "Success",
  },
};

export const Error: Story = {
  args: {
    type: TagStatusType.Error,
    label: "Error",
  },
};

export const Warning: Story = {
  args: {
    type: TagStatusType.Warning,
    label: "Warning",
  },
};

export const Caution: Story = {
  args: {
    type: TagStatusType.Caution,
    label: "Caution",
  },
};

export const Loading: Story = {
  args: {
    type: TagStatusType.Loading,
    label: "Loading",
  },
};

export const AllStatuses: Story = {
  args: {
    type: TagStatusType.Ok,
    label: "Default",
  },
  render: () => (
    <div className="flex gap-3 flex-wrap">
      <TagStatus type={TagStatusType.Error} label="Error" />
      <TagStatus type={TagStatusType.Warning} label="Warning" />
      <TagStatus type={TagStatusType.Caution} label="Caution" />
      <TagStatus type={TagStatusType.Ok} label="OK" />
      <TagStatus type={TagStatusType.Loading} label="Loading" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All available status types displayed together",
      },
    },
  },
};

export const CustomLabels: Story = {
  args: {
    type: TagStatusType.Error,
    label: "Default",
  },
  render: () => (
    <div className="flex flex-col gap-3">
      <TagStatus type={TagStatusType.Error} label="Connection Failed" />
      <TagStatus type={TagStatusType.Warning} label="Slow Response" />
      <TagStatus type={TagStatusType.Caution} label="Check Required" />
      <TagStatus type={TagStatusType.Ok} label="All Systems Operational" />
      <TagStatus type={TagStatusType.Loading} label="Synchronizing..." />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Examples with custom, descriptive labels",
      },
    },
  },
};

export const InternationalizationExample: Story = {
  args: {
    type: TagStatusType.Error,
    label: "Default",
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <h4
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
        >
          English
        </h4>
        <div className="flex gap-3">
          <TagStatus type={TagStatusType.Error} label="Error" />
          <TagStatus type={TagStatusType.Warning} label="Warning" />
          <TagStatus type={TagStatusType.Ok} label="Success" />
        </div>
      </div>
      <div>
        <h4
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
        >
          French
        </h4>
        <div className="flex gap-3">
          <TagStatus type={TagStatusType.Error} label="Erreur" />
          <TagStatus type={TagStatusType.Warning} label="Avertissement" />
          <TagStatus type={TagStatusType.Ok} label="Succès" />
        </div>
      </div>
      <div>
        <h4
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
        >
          Hebrew
        </h4>
        <div className="flex gap-3">
          <TagStatus type={TagStatusType.Error} label="שגיאה" />
          <TagStatus type={TagStatusType.Warning} label="אזהרה" />
          <TagStatus type={TagStatusType.Ok} label="הצלחה" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Examples showing how the component works with different languages. The application handles translations through i18n systems.",
      },
    },
  },
};

export const LongLabels: Story = {
  args: {
    type: TagStatusType.Error,
    label: "Default",
  },
  render: () => (
    <div className="flex flex-col gap-3 max-w-md">
      <TagStatus
        type={TagStatusType.Error}
        label="Connection timeout after multiple retries"
      />
      <TagStatus
        type={TagStatusType.Warning}
        label="Performance degradation detected"
      />
      <TagStatus
        type={TagStatusType.Loading}
        label="Synchronizing data with remote server"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Examples with longer text labels to show text wrapping behavior",
      },
    },
  },
};

export const ShortLabels: Story = {
  args: {
    type: TagStatusType.Error,
    label: "Default",
  },
  render: () => (
    <div className="flex gap-3">
      <TagStatus type={TagStatusType.Error} label="!" />
      <TagStatus type={TagStatusType.Warning} label="?" />
      <TagStatus type={TagStatusType.Ok} label="✓" />
      <TagStatus type={TagStatusType.Loading} label="..." />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Examples with very short labels including symbols",
      },
    },
  },
};
