import Header from '../components/Header';
import ConversationList from '../components/ConversationList';
import useConversations from '../hooks/useConversations';

export default function InboxScreen({ onNavigate, supabase }) {
  const { conversations, loading } = useConversations(supabase);

  return (
    <div className="h-full flex flex-col bg-white">
      <Header
        title="Messages"
        rightIcon="+"
        onRightClick={() => onNavigate('search')}
      />

      {loading ? (
        <div className="flex-1 flex items-center justify-center">Loading...</div>
      ) : (
        <ConversationList
          conversations={conversations}
          onConversationClick={(c) => onNavigate('chat', c)}
        />
      )}
    </div>
  );
}
