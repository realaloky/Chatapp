import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import InboxScreen from './screens/InboxScreen';
import ChatScreen from './screens/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';
import SearchScreen from './screens/SearchScreen';

const supabase = createClient(
  'https://jbvyidqjbclilifdhmhc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpidnlpZHFqYmNsaWxpZmRobWhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2OTIxMjgsImV4cCI6MjA4NTI2ODEyOH0.LV5IUdRtieo8swVMeL0hbfUIhGUpjnvZoz6-DISSQkc'
);

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('inbox');
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const navigate = (screen, data = null) => {
    setCurrentScreen(screen);
    if (screen === 'chat') setSelectedConversation(data);
    if (screen === 'profile') setSelectedUser(data);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'inbox':
        return <InboxScreen onNavigate={navigate} supabase={supabase} />;
      case 'chat':
        return (
          <ChatScreen
            conversation={selectedConversation}
            onNavigate={navigate}
            onBack={() => navigate('inbox')}
            supabase={supabase}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            user={selectedUser}
            onBack={() => navigate('chat', selectedConversation)}
          />
        );
      case 'search':
        return (
          <SearchScreen
            onNavigate={navigate}
            onBack={() => navigate('inbox')}
            supabase={supabase}
          />
        );
      default:
        return <InboxScreen onNavigate={navigate} supabase={supabase} />;
    }
  };

  return (
    <div className="h-screen w-full bg-white overflow-hidden">
      {renderScreen()}
    </div>
  );
}
