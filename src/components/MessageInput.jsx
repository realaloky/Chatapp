import { useState } from 'react';

export default function MessageInput({ onSend, disabled = false }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-gray-200 px-4 py-3 bg-white flex items-center gap-2"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message..."
        disabled={disabled}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
      />
      
      <button
        type="submit"
        disabled={!message.trim() || disabled}
        className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        Send
      </button>
    </form>
  );
}
