import Avatar from './Avatar';
import { formatTime } from '../utils/formatTime';

export default function ConversationItem({ conversation, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors active:bg-gray-100"
    >
      <Avatar
        src={conversation.avatar}
        alt={conversation.name}
        size="md"
        online={conversation.online}
      />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2 mb-1">
          <h3 className="font-semibold text-gray-900 truncate">
            {conversation.name}
          </h3>
          <span className="text-xs text-gray-500 flex-shrink-0">
            {formatTime(conversation.last_message_at)}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 truncate">
          {conversation.last_message || 'No messages yet'}
        </p>
      </div>
      
      {conversation.unread_count > 0 && (
        <div className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
          {conversation.unread_count}
        </div>
      )}
    </div>
  );
}
