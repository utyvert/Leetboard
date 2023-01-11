import './App.css';
import { Route, Routes} from 'react-router-dom';
import LeftNavbar from './components/LeftNavbar';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useEffect, useState } from 'react';

function App() {

  const [authentication, setAuthentication] = useState(false);

  useEffect(() => {
    // check for cookies
    // if cookies exist, set authentication to true
  }, []);


  return (
    <div className="App">
      <div className="leftnav">
        <LeftNavbar />
      </div>
      {/* <Signup /> */}
      <div className="content">
        <Routes>
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

