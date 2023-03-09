import cx from "classnames";
import { useEffect, useRef, useState } from "react";

interface IProps<T> {
    defaultValue?: T;
    options: {
        value: T;
        label: string;
    }[];
    className?: string;
    onChange: (value: T) => void;
}

export function SwitchButton<T>({
    defaultValue,
    options,
    className,
    onChange,
}: IProps<T>) {
    const containerRef = useRef<HTMLDivElement>(null);

    const [selectedValue, setSelectedValue] = useState<T | undefined>();
    const [backgroundStyle, setBackgroundStyle] = useState<{
        width: number;
        left: number;
    }>();

    const setDefaultBackgroundStyle = (defaultValue: T) => {
        const selectedIndex = options.findIndex(
            ({ value }) => value === defaultValue
        );

        const element = containerRef.current?.children[selectedIndex];

        setBackgroundStyle({
            // @ts-ignore
            width: element.offsetWidth,
            // @ts-ignore
            left: element.offsetLeft,
        });
    };

    useEffect(() => {
        if (defaultValue) {
            setSelectedValue(defaultValue);
            setDefaultBackgroundStyle(defaultValue);
        }
    }, []);

    useEffect(() => {
        if (selectedValue) {
            onChange(selectedValue);
        }
    }, [selectedValue]);

    return (
        <div className={cx("relative bg-white bg-opacity-10", className)}>
            {backgroundStyle && (
                <div
                    className="bg-white opacity-10 h-full absolute top-0 -z-10 transition-all"
                    style={{
                        width: backgroundStyle.width,
                        left: backgroundStyle.left,
                    }}
                />
            )}

            <div ref={containerRef} className="w-ful flex">
                {options.map(({ value, label }) => (
                    <button
                        key={value as string}
                        type="button"
                        className={cx("basis-full p-2", {
                            "font-semibold": value === selectedValue,
                        })}
                        onClick={(e) => {
                            setSelectedValue(value);

                            setBackgroundStyle({
                                // @ts-ignore
                                width: e.target.offsetWidth,
                                // @ts-ignore
                                left: e.target.offsetLeft,
                            });
                        }}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
}
