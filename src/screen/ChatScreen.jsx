import ChatHeader from '../components/ChatHeader';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import useMessages from '../hooks/useMessages';

const CURRENT_USER_ID = 'user-1';

export default function ChatScreen({ conversation, onNavigate, onBack, supabase }) {
  const { messages, loading, sendMessage } = useMessages(supabase, conversation?.id);

  const handleSend = async (content) => {
    await sendMessage(content, CURRENT_USER_ID);
  };

  const handleProfileClick = () => {
    onNavigate('profile', {
      id: conversation?.id,
      name: conversation?.name,
      avatar: conversation?.avatar,
      online: conversation?.online,
    });
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <ChatHeader
        conversation={conversation}
        onBack={onBack}
        onProfileClick={handleProfileClick}
      />
      
      {loading ? (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          <p>Loading messages...</p>
        </div>
      ) : (
        <MessageList messages={messages} currentUserId={CURRENT_USER_ID} />
      )}
      
      <MessageInput onSend={handleSend} disabled={loading} />
    </div>
  );
}
