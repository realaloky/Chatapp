import ChatHeader from '../components/ChatHeader';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import useMessages from '../hooks/useMessages';

const CURRENT_USER_ID = 'user-1';

export default function ChatScreen({ conversation, onBack, onNavigate, supabase }) {
  const { messages, loading, sendMessage } = useMessages(supabase, conversation?.id);

  return (
    <div className="h-full flex flex-col">
      <ChatHeader
        conversation={conversation}
        onBack={onBack}
        onProfileClick={() => onNavigate('profile', conversation)}
      />

      <MessageList messages={messages} currentUserId={CURRENT_USER_ID} />
      <MessageInput onSend={(msg) => sendMessage(msg, CURRENT_USER_ID)} />
    </div>
  );
}
