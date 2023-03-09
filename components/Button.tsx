import cx from "classnames";

type TSize = "small" | "medium";

interface IProps {
    label: string;
    size?: TSize;
    className?: string;
    isDisabled?: boolean;
    onClick: () => void;
}

export const Button: React.FC<IProps> = ({
    label,
    size = "medium",
    className,
    isDisabled,
    onClick,
}) => (
    <button
        type="button"
        className={cx(
            {
                "px-3 py-2 text-xs": size === "small",
                "px-5 py-3 text-sm": size === "medium",
            },
            "bg-black bg-opacity-40 disabled:opacity-50",
            className
        )}
        disabled={isDisabled}
        onClick={onClick}
    >
        {label}
    </button>
);
