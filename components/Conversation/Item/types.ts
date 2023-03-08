import { ERoleLabels, ETypeLabels } from "@/types/conversation";

export interface IConversationItem {
    role: keyof typeof ERoleLabels;
    type: keyof typeof ETypeLabels;
    content: string;
    imageUrl?: string;
    timestamp?: string;
    request?: IConversationItem;
}
