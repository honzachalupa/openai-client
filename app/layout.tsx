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
            <script src="public/sw.js" async />

            <html lang="en">
                <body className="p-5 bg-slate-800 text-slate-200 text-sm h-screen">
                    {children}
                </body>
            </html>
        </>
    );
}
