import cx from "classnames";

interface IProps {
    label: string;
    className?: string;
    isDisabled?: boolean;
    onClick: () => void;
}

export const Button: React.FC<IProps> = ({
    label,
    className,
    isDisabled,
    onClick,
}) => (
    <button
        type="button"
        className={cx(
            "px-5 py-2 bg-white bg-opacity-20 disabled:opacity-50",
            className
        )}
        disabled={isDisabled}
        onClick={onClick}
    >
        {label}
    </button>
);
