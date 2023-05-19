"use client";

import { Conversation } from "@/components/Conversation";
import { Form } from "@/components/Form";
import { Layout_Primary, useServiceWorker } from "@honzachalupa/design-system";

export default function Home() {
    useServiceWorker();

    return (
        <Layout_Primary>
            <div className="h-full flex flex-col">
                <Conversation />

                <Form />
            </div>
        </Layout_Primary>
    );
}
