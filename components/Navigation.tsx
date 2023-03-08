"use client";

import { useToggle } from "@react-hooks-library/core";
import { Button } from "./Button";
import { Link } from "./Link";

export const Navigation: React.FC = () => {
    const {
        bool: isOpened,
        setFalse: close,
        setTrue: open,
        toggle,
    } = useToggle();

    const items = [
        {
            label: "Conversation",
            href: "/",
        },
        {
            label: "Settings",
            href: "/settings",
        },
    ];

    return (
        <div className="absolute top-0 right-0 flex flex-col">
            <Button label={isOpened ? "Close" : "Open"} onClick={toggle} />

            {isOpened && (
                <nav className="w-[80vw] max-w-[400px] h-screen bg-black bg-opacity-70 backdrop-blur-sm flex flex-col">
                    {items.map(({ label, href }) => (
                        <Link
                            key={label}
                            label={label}
                            href={href}
                            className="mt-2"
                            onClick={close}
                        />
                    ))}
                </nav>
            )}
        </div>
    );
};
