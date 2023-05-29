"use client";

import { Conversation } from "@/components/Conversation";
import { Form } from "@/components/Form";
import { Layout, useServiceWorker } from "@honzachalupa/design-system";
import { useContext } from "react";
import { ConversationContext } from "../contexts/Conversation";

export default function Home() {
    useServiceWorker();

    const { removeAll } = useContext(ConversationContext);

    return (
        <Layout.WithNavigation
            title="OpenAI Client"
            navigation={{
                right: {
                    title: "Options",
                    items: [
                        {
                            label: "Remove all",
                            onClick: removeAll,
                        },
                    ],
                },
            }}
        >
            <Conversation />

            <Form />
        </Layout.WithNavigation>
    );
}
