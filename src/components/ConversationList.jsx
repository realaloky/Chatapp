import ConversationItem from './ConversationItem';

export default function ConversationList({ conversations, onConversationClick }) {
  if (conversations.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        <p>No conversations yet</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto scrollable">
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
          onClick={() => onConversationClick(conversation)}
        />
      ))}
    </div>
  );
}
