import { useState } from 'react';
import SearchInput from '../components/SearchInput';
import Avatar from '../components/Avatar';

export default function SearchScreen({ onNavigate, onBack, supabase }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    
    if (query.trim().length < 2) {
      setUsers([]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .ilike('name', `%${query}%`)
        .limit(10);

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error searching users:', error);
      setUsers([]);
    }
  };

  const handleUserClick = (user) => {
    onNavigate('chat', user);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <header className="flex items-center px-4 py-3 border-b border-gray-200">
        <button
          onClick={onBack}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold ml-4">New Message</h1>
      </header>
      
      <SearchInput
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search users..."
      />
      
      <div className="flex-1 overflow-y-auto scrollable">
        {searchQuery.trim().length < 2 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Type at least 2 characters to search</p>
          </div>
        ) : users.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>No users found</p>
          </div>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              onClick={() => handleUserClick(user)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors active:bg-gray-100"
            >
              <Avatar src={user.avatar} alt={user.name} size="md" online={user.online} />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{user.name}</h3>
                <p className="text-sm text-gray-600 truncate">
                  {user.last_message || 'Start a conversation'}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
