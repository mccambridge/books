import { Toaster } from 'react-hot-toast'

import { UserContext, ActivityContext } from '../lib/context';
import { useUserData, useActivity } from '../lib/hooks';
import '../styles/globals.css';
import '../styles/weather-icons.css';
import '../styles/weather-icons-wind.css';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  const activity = useActivity();

  return (
    <UserContext.Provider value={userData}>
      <ActivityContext.Provider value={activity}>
        <div className="container">
          <Component {...pageProps} />
        </div>
        <Navbar />
        <Toaster />
      </ActivityContext.Provider>
    </UserContext.Provider>
  )
}

export default MyApp;
