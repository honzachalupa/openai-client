import { ERoleLabels, ETypeLabels } from "@/types/conversation";

export type TRole = keyof typeof ERoleLabels;
export type TType = keyof typeof ETypeLabels;

export interface IConversationItem {
    id: string;
    groupId: string | null;
    role: TRole;
    type: TType;
    content: string;
    imageUrl?: string;
    timestamp?: string;
    request?: IConversationItem;
}
