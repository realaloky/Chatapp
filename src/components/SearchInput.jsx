export default function SearchInput({ value, onChange, placeholder = 'Search...' }) {
  return (
    <div className="px-4 py-3 border-b border-gray-200 bg-white">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2 bg-gray-100 rounded-full focus:outline-none"
        />
      </div>
    </div>
  );
}
