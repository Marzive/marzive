import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand(); 
    console.log('User:', window.Telegram.WebApp.initDataUnsafe.user);
  }, []);

  return (
    <div>
      <h1>Telegram Mini App</h1>
      <p>Welcome, {window.Telegram.WebApp.initDataUnsafe?.user?.first_name || 'User'}!</p>
    </div>
  );
}

export default App;
