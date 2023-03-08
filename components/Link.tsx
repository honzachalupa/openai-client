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
            "px-5 py-2 bg-white bg-opacity-10 text-center",
            className
        )}
        onClick={onClick}
    >
        {label}
    </NextLink>
);
