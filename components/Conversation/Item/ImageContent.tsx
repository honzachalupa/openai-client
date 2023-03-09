import Image from "next/image";

interface IProps {
    url: string;
    onLoaded: () => void;
}

export const ImageContent: React.FC<IProps> = ({ url, onLoaded }) => (
    <Image
        src={url}
        alt="Generated image"
        className="basis-full aspect-square"
        width={512}
        height={512}
        onLoad={onLoaded}
    />
);
