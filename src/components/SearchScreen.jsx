import { useState } from 'react';
import SearchInput from '../components/SearchInput';
import Avatar from '../components/Avatar';

export default function SearchScreen({ onNavigate, onBack, supabase }) {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);

  const search = async (q) => {
    setQuery(q);
    if (q.length < 2) return setUsers([]);

    const { data } = await supabase
      .from('conversations')
      .select('*')
      .ilike('name', `%${q}%`);

    setUsers(data || []);
  };

  return (
    <div className="h-full flex flex-col">
      <button onClick={onBack} className="p-4">Back</button>
      <SearchInput value={query} onChange={search} />

      {users.map((u) => (
        <div
          key={u.id}
          onClick={() => onNavigate('chat', u)}
          className="flex items-center gap-3 p-4 cursor-pointer"
        >
          <Avatar src={u.avatar} alt={u.name} />
          <span>{u.name}</span>
        </div>
      ))}
    </div>
  );
}
