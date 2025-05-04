import type { Meta, StoryObj } from '@storybook/react';
import Avatar from './Avatar';
import { AvatarSize } from './Avatar';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Example/Avatar',
    component: Avatar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: {
                type: 'select',
            },
            options: Object.values(AvatarSize)
        },
    },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
    args: {
        size: AvatarSize.Sm,
        label: '',
    },
};

export const Medium: Story = {
    args: {
        size: AvatarSize.Md,
        label: '',
    },
};

export const Large: Story = {
    args: {
        size: AvatarSize.Lg,
        label: '',
    },
};
