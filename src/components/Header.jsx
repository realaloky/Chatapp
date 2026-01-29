export default function Header({ title, leftIcon, rightIcon, onLeftClick, onRightClick }) {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
      <button
        onClick={onLeftClick}
        className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        {leftIcon}
      </button>
      
      <h1 className="text-lg font-semibold truncate flex-1 text-center">
        {title}
      </h1>
      
      <button
        onClick={onRightClick}
        className="p-2 -mr-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        {rightIcon}
      </button>
    </header>
  );
}
