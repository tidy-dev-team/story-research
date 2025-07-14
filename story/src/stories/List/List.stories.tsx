import type { Meta, StoryObj } from "@storybook/react";
import { List } from "./List";
import { TextDirection } from "../textDirection";
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import LanguageIcon from "@mui/icons-material/Language";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import SignalWifiStatusbarNullIcon from '@mui/icons-material/SignalWifiStatusbarNull';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';

const meta: Meta<typeof List> = {
    title: "Components/List/List",
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

export const LongList: Story = {
    args: {
        textDirection: TextDirection.Ltr,
        items: [
            { label: "Language", icon: LanguageIcon },
            { label: "Cloud Files", icon: CloudQueueIcon },
            { label: "Chats", icon: ChatBubbleOutlineIcon },
            { label: "Calendar", icon: CalendarTodayIcon },
            { label: "Copy/ Paste", icon: ContentCopyIcon },
            { label: "Error Management", icon: ErrorOutlineIcon },
            { label: "Favorites", icon: StarOutlineIcon },
            { label: "Networks", icon: SignalWifiStatusbarNullIcon },
            { label: "Interfaces", icon: WysiwygIcon },
        ],
    },
};

export const WithNoIcons: Story = {
    args: {
        textDirection: TextDirection.Ltr,
        items: [
            { label: "Language" },
            { label: "Cloud Files" },
            { label: "Chats" },
            { label: "Calendar" },
            { label: "Copy/ Paste" },
            { label: "Error Management" },
            { label: "Favorites" },
            { label: "Networks" },
            { label: "Interfaces" },
        ],
    },
};