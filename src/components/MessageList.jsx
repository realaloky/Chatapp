import MessageBubble from './MessageBubble';
import useScrollToBottom from '../hooks/useScrollToBottom';

export default function MessageList({ messages, currentUserId }) {
  const scrollRef = useScrollToBottom(messages.length);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        <p>No messages yet. Start the conversation!</p>
      </div>
    );
  }

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto scrollable py-4">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          isOwn={message.sender_id === currentUserId}
        />
      ))}
    </div>
  );
}
