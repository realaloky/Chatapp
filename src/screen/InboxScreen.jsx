import Header from '../components/Header';
import ConversationList from '../components/ConversationList';
import useConversations from '../hooks/useConversations';

export default function InboxScreen({ onNavigate, supabase }) {
  const { conversations, loading } = useConversations(supabase);

  const handleConversationClick = (conversation) => {
    onNavigate('chat', conversation);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <Header
        title="Messages"
        leftIcon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        }
        rightIcon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        }
        onRightClick={() => onNavigate('search')}
      />
      
      {loading ? (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          <p>Loading conversations...</p>
        </div>
      ) : (
        <ConversationList
          conversations={conversations}
          onConversationClick={handleConversationClick}
        />
      )}
    </div>
  );
}
