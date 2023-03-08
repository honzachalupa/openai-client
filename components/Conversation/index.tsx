import { useContext } from "react";
import { Context } from "./Context";
import { Item, LoadingItem } from "./Item";

export interface IConversationRef {
    handleSendMessage: () => void;
    handleGenerateImage: () => void;
}

export const Conversation: React.FC = () => {
    const { items, isLoading } = useContext(Context);

    return (
        <section className="overflow-y-auto">
            {items.map((data, i) => (
                <Item key={i} data={data} isLastItem={items.length === i + 1} />
            ))}

            {isLoading && <LoadingItem />}
        </section>
    );
};
