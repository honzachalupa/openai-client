"use client";

import { ContextWrapper } from "@/components/Conversation/Context";
import "@honzachalupa/common/tailwind-globals.css";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export const Providers: React.FC<Props> = ({ children }) => {
    return <ContextWrapper>{children}</ContextWrapper>;
};
