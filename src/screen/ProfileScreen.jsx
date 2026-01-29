import Avatar from '../components/Avatar';

export default function ProfileScreen({ user, onBack }) {
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
        <h1 className="text-lg font-semibold ml-4">Profile</h1>
      </header>
      
      <div className="flex-1 overflow-y-auto scrollable">
        <div className="flex flex-col items-center pt-8 pb-6 border-b border-gray-200">
          <Avatar src={user?.avatar} alt={user?.name} size="xl" online={user?.online} />
          <h2 className="text-2xl font-bold mt-4">{user?.name}</h2>
          {user?.online && (
            <p className="text-sm text-green-600 mt-1">Active now</p>
          )}
        </div>
        
        <div className="p-4 space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">About</h3>
            <p className="text-gray-900">
              Hey there! I'm using Chat App.
            </p>
          </div>
          
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-medium">Audio Call</span>
            </button>
            
            <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className="font-medium">Video Call</span>
            </button>
            
            <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">View Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
                }
