import { ContextWrapper } from "@/components/Conversation/Context";
import { Navigation } from "@/components/Navigation";
import config from "@/config";
import "./layout.css";

export const metadata = {
    title: config.appName,
    description: "Better looking Chat GPT client.",
    keywords: [],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <link rel="manifest" href="/manifest.json" />

            <html lang="en">
                <body className="px-3 bg-black text-slate-200 text-sm h-full">
                    <Navigation />

                    <ContextWrapper>{children}</ContextWrapper>
                </body>
            </html>
        </>
    );
}
