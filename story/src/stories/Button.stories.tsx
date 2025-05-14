import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import { Button } from "./Button";
import { ButtonSize, ButtonType } from "./Button";
import { GlobeIcon } from "./icons/GlobeIcon";
import { ArrowRightIcon } from "./icons/ArrowRightIcon";
import React from "react";

/**
 * Story args include Button props plus controls for leading/trailing icons
 */
type ButtonStoryArgs = ComponentProps<typeof Button> & {
  hasLeadingIcon?: boolean;
  hasTrailingIcon?: boolean;
};

const meta = {
  title: "Component/Button",
  component: Button,
  args: {
    label: "Button",
    hasLeadingIcon: false,
    hasTrailingIcon: false,
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: Object.values(ButtonSize),
    },
    type: {
      control: "select",
      options: Object.values(ButtonType),
    },
    rtl: {
      control: "boolean",
      description: "Right to left text direction",
    },
    hasLeadingIcon: {
      control: "boolean",
      description: "Show leading icon",
    },
    hasTrailingIcon: {
      control: "boolean",
      description: "Show trailing icon",
    },
    leadingIcon: {
      table: {
        disable: true,
      },
    },
    trailingIcon: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<ButtonStoryArgs>;

export default meta;

type Story = StoryObj<ButtonStoryArgs>;

const renderIcon = (
  condition: boolean | undefined,
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
) => {
  return condition ? <Icon /> : undefined;
};

export const Primary: Story = {
  args: {
    type: ButtonType.Primary,
    size: ButtonSize.Medium,
  },
  render: ({ hasLeadingIcon, hasTrailingIcon, ...args }) => (
    <Button
      {...args}
      leadingIcon={renderIcon(hasLeadingIcon, GlobeIcon)}
      trailingIcon={renderIcon(hasTrailingIcon, ArrowRightIcon)}
    />
  ),
};

export const Secondary: Story = {
  args: {
    type: ButtonType.Secondary,
    size: ButtonSize.Medium,
  },
  render: ({ hasLeadingIcon, hasTrailingIcon, ...args }) => (
    <Button
      {...args}
      leadingIcon={renderIcon(hasLeadingIcon, GlobeIcon)}
      trailingIcon={renderIcon(hasTrailingIcon, ArrowRightIcon)}
    />
  ),
};

export const Ghost: Story = {
  args: {
    type: ButtonType.Ghost,
    size: ButtonSize.Medium,
  },
  render: ({ hasLeadingIcon, hasTrailingIcon, ...args }) => (
    <Button
      {...args}
      leadingIcon={renderIcon(hasLeadingIcon, GlobeIcon)}
      trailingIcon={renderIcon(hasTrailingIcon, ArrowRightIcon)}
    />
  ),
};

export const WithLeadingIcon: Story = {
  args: {
    type: ButtonType.Primary,
    size: ButtonSize.Medium,
    label: "Visit Website",
    hasLeadingIcon: true,
  },
  render: ({ hasLeadingIcon, hasTrailingIcon, ...args }) => (
    <Button
      {...args}
      leadingIcon={renderIcon(hasLeadingIcon, GlobeIcon)}
      trailingIcon={renderIcon(hasTrailingIcon, ArrowRightIcon)}
    />
  ),
};

export const WithTrailingIcon: Story = {
  args: {
    type: ButtonType.Primary,
    size: ButtonSize.Medium,
    label: "Next Page",
    hasTrailingIcon: true,
  },
  render: ({ hasLeadingIcon, hasTrailingIcon, ...args }) => (
    <Button
      {...args}
      leadingIcon={renderIcon(hasLeadingIcon, GlobeIcon)}
      trailingIcon={renderIcon(hasTrailingIcon, ArrowRightIcon)}
    />
  ),
};

export const WithBothIcons: Story = {
  args: {
    type: ButtonType.Primary,
    size: ButtonSize.Medium,
    label: "Visit Website",
    hasLeadingIcon: true,
    hasTrailingIcon: true,
  },
  render: ({ hasLeadingIcon, hasTrailingIcon, ...args }) => (
    <Button
      {...args}
      leadingIcon={renderIcon(hasLeadingIcon, GlobeIcon)}
      trailingIcon={renderIcon(hasTrailingIcon, ArrowRightIcon)}
    />
  ),
};
