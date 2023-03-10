import { ContextWrapper } from "@/components/Conversation/Context";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { Navigation } from "@/components/Navigation";
import config from "@/config";
import "./layout.css";

export const metadata = {
    title: config.appName,
    description: config.description,
    keywords: config.keywords,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <link rel="manifest" href="/manifest.json" />

            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />

            <meta name="apple-mobile-web-app-capable" content="yes" />

            <html lang="en">
                <body className="px-5 bg-[#0a192f] text-slate-200 text-sm w-full h-full fixed overscroll-none">
                    <Navigation />

                    <ContextWrapper>{children}</ContextWrapper>
                </body>
            </html>

            <GoogleAnalytics />
        </>
    );
}
