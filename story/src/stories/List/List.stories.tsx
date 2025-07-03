import type { Meta, StoryObj } from "@storybook/react";
import { List } from "./List";
import { TextDirection } from "../textDirection";
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import LanguageIcon from "@mui/icons-material/Language";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const meta: Meta<typeof List> = {
    title: "Component/List/List",
    component: List,
    parameters: {
        layout: "centered",
    },
    argTypes: {
        textDirection: {
            control: { type: "radio" },
            options: [TextDirection.Ltr, TextDirection.Rtl],
        },
    },
};

export default meta;
type Story = StoryObj<typeof List>;

export const Default: Story = {
    args: {
        textDirection: TextDirection.Ltr,
        items: [
            { label: "Language", icon: LanguageIcon },
            { label: "Cloud Files", icon: CloudQueueIcon },
            { label: "Chats", icon: ChatBubbleOutlineIcon },
        ],
    },
};

export const RTL: Story = {
    args: {
        textDirection: TextDirection.Rtl,
        items: [
            { label: "בחירת שפה", icon: LanguageIcon },
            { label: "קבצי ענן", icon: CloudQueueIcon },
            { label: "שיחות", icon: ChatBubbleOutlineIcon },
        ],
    },
};