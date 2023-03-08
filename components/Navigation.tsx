"use client";

import { useToggle } from "@react-hooks-library/core";
import { RxHamburgerMenu } from "react-icons/rx";
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
        {
            label: "About",
            href: "/about",
        },
    ];

    return (
        <div className="absolute top-0 right-0 z-10">
            <RxHamburgerMenu
                className="w-10 h-10 p-2 self-end ml-auto text-right relative z-20"
                onClick={toggle}
            />

            {isOpened && (
                <>
                    <div className="w-screen h-screen bg-slate-700 bg-opacity-50 backdrop-blur-sm absolute top-0 right-0 z-10" />

                    <nav className="w-[60vw] max-w-[400px] h-screen bg-black flex flex-col absolute top-0 right-0 z-10 p-2 pt-20">
                        {items.map(({ label, href }) => (
                            <Link
                                key={label}
                                label={label}
                                href={href}
                                className="mt-2"
                                onClick={close}
                            />
                        ))}

                        <Link
                            label="&copy; Jan Chalupa 2023"
                            href="https://janchalupa.dev/"
                            className="mt-auto bg-opacity-0"
                        />
                    </nav>
                </>
            )}
        </div>
    );
};
