import cx from "classnames";
import { default as NextLink } from "next/link";

interface IProps {
    label: string;
    href: string;
    className?: string;
    onClick?: () => void;
}

export const Link: React.FC<IProps> = ({ label, href, className, onClick }) => (
    <NextLink
        href={href}
        className={cx(
            "px-5 py-3 bg-black bg-opacity-40 text-center",
            className
        )}
        onClick={onClick}
    >
        {label}
    </NextLink>
);
