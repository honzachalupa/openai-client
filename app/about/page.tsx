"use client";

export default function About() {
    return (
        <div className="flex flex-col h-screen">
            <h1 className="text-xl pt-3 pb-2">About</h1>

            <p className="text-sm opacity-70 my-2">
                This is open-source client combining ChatGPT and DALL·E 2
                engines capabilities into simple mobile-first application.
            </p>

            <p className="text-sm opacity-70 my-2">
                <a
                    href="https://github.com/honzachalupa/chat-gpt-client"
                    target="_blank"
                    className="underline"
                >
                    GitHub
                </a>
            </p>
        </div>
    );
}
