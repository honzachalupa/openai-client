import { Button, ContextMenu } from "@honzachalupa/design-system";
import { useContext } from "react";
import { ConversationContext } from "../../contexts/Conversation";
import { Item, LoadingItem } from "./Item";
import { IConversationItem } from "./Item/types";

export interface IConversationRef {
    handleSendMessage: () => void;
    handleGenerateImage: () => void;
}

export const Conversation: React.FC = () => {
    const { items, regenerate, removeGroup, isLoading } =
        useContext(ConversationContext);

    const groupedItems: {
        [key: string]: IConversationItem[];
    } = items.reduce((acc, item) => {
        const { groupId } = item;

        if (groupId) {
            // @ts-ignore
            const group = acc[groupId] || [];

            return {
                ...acc,
                [groupId]: [...group, item],
            };
        } else {
            return acc;
        }
    }, {});

    return (
        <section className="basis-full overflow-y-auto -m-3">
            {Object.entries(groupedItems).map(([groupId, items]) => (
                <div
                    key={groupId}
                    className="border-gray-600 border-b-[1px] border-dashed last:border-none last:pb-0 flex flex-col relative"
                >
                    {items.map((data, i) => (
                        <Item key={i} {...data} />
                    ))}

                    <ContextMenu
                        items={[
                            {
                                label: "Try again",
                                onClick: () => regenerate(items[0]),
                            },
                            {
                                label: "Remove",
                                onClick: () => removeGroup(groupId),
                            },
                        ]}
                        position="top-start"
                        className="self-end m-3"
                    >
                        <Button
                            label="More..."
                            size="small"
                            onClick={() => {}}
                        />
                    </ContextMenu>
                </div>
            ))}

            {isLoading && <LoadingItem />}
        </section>
    );
};
