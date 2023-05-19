"use client";

import { ConversationContextProvider } from "@/contexts/Conversation";
import { AuthContextProvider } from "@honzachalupa/admin";
import { DesignSystemContextProvider } from "@honzachalupa/design-system";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export const Providers: React.FC<Props> = ({ children }) => (
    <DesignSystemContextProvider>
        <AuthContextProvider namespaceId="openai-client">
            <ConversationContextProvider>
                {children}
            </ConversationContextProvider>
        </AuthContextProvider>
    </DesignSystemContextProvider>
);
