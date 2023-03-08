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

    return (
        <nav className="absolute top-0 right-0 flex flex-col">
            <Button label="Toggle" onClick={toggle} />

            {isOpened && (
                <div className="w-[80vw] h-screen bg-black bg-opacity-70 backdrop-blur-sm">
                    <Link label="Conversation" href="/" onClick={close} />
                    <Link label="Settings" href="/settings" onClick={close} />
                </div>
            )}
        </nav>
    );
};
