import { formatMessageTime } from '../utils/formatTime';

export default function MessageBubble({ message, isOwn }) {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-2 px-4`}>
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
          isOwn
            ? 'bg-blue-600 text-white rounded-br-sm'
            : 'bg-gray-200 text-gray-900 rounded-bl-sm'
        }`}
      >
        <p className="text-sm break-words">{message.content}</p>
        <span
          className={`text-xs mt-1 block ${
            isOwn ? 'text-blue-100' : 'text-gray-500'
          }`}
        >
          {formatMessageTime(message.created_at)}
        </span>
      </div>
    </div>
  );
}
