import Avatar from './Avatar';

export default function ChatHeader({ conversation, onBack, onProfileClick }) {
  return (
    <header className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 bg-white">
      <button
        onClick={onBack}
        className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={onProfileClick}
        className="flex items-center gap-3 flex-1 min-w-0 hover:opacity-80 transition-opacity"
      >
        <Avatar
          src={conversation?.avatar}
          alt={conversation?.name}
          size="sm"
          online={conversation?.online}
        />

        <div className="flex-1 min-w-0 text-left">
          <h2 className="font-semibold text-gray-900 truncate">
            {conversation?.name || 'Chat'}
          </h2>
          {conversation?.online && (
            <p className="text-xs text-green-600">Active now</p>
          )}
        </div>
      </button>

      <button className="p-2 -mr-2 hover:bg-gray-100 rounded-full transition-colors">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" />
        </svg>
      </button>
    </header>
  );
}
