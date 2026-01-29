import Avatar from '../components/Avatar';

export default function ProfileScreen({ user, onBack }) {
  return (
    <div className="h-full flex flex-col">
      <button onClick={onBack} className="p-4">Back</button>
      <div className="flex flex-col items-center">
        <Avatar src={user?.avatar} alt={user?.name} size="xl" />
        <h2 className="mt-4 text-xl font-bold">{user?.name}</h2>
      </div>
    </div>
  );
}
