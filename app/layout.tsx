import config from "../config";
import "./layout.css";

export const metadata = {
    title: config.appName,
    description: "Better looking Chat GPT client.",
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
                <body className="p-5 bg-black text-slate-200 text-sm h-full">
                    {children}
                </body>
            </html>
        </>
    );
}
