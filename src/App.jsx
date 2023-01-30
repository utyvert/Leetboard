import './App.css';
import { Route, Routes, useNavigate, useParams} from 'react-router-dom';
import LeftNavbar from './components/LeftNavbar';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Modal from './components/Modal';
import Signup from './pages/Signup';
import { useEffect, useState } from 'react';

function App() {

  const [isLoggedin , setIsLoggedin] = useState(false);
  const [appUsers, setAppUsers] = useState([]);
  const [currentUsername, setCurrentUsername] = useState('utkarshuppal');

  // useEffect(() => {
  //   // check for cookies
  //   // if cookies exist, set authentication to true and navigate to '/app'
  //   if () {
  //     setAuthentication(true);
  //     navigate('/leaderboard');
  //   }
  // }, []);

  function handleSignup(userinfo) {
    console.log('handleSignup', userinfo);
    setCurrentUsername(userinfo.username);
    setTimeout(() => {
      setIsLoggedin(true);
    }, 0);
  }

  function handleSignIn() {
    setIsLoggedin(true);
  }

  // if (!isLoggedin) {
  //   return <Signup handleSignIn = {handleSignIn} onSignup = {(userinfo) => handleSignup(userinfo)}/>
  // }



  return (
    <div className="App">
      <div className="leftnav">
        <LeftNavbar currentUsername = {currentUsername}/>
      </div>
      {/* <Signup /> */}
      {/* <Login /> */}
      <div className="content">
        <Routes>
          <Route path="/leaderboard" setAppUsers = {(arr) => setAppUsers(arr)} element={<Leaderboard />} />
          {/* <Route path= {`/user/${currentUsername}`} element={<Profile />} /> */}
          <Route path="/user/:username" element={<Profile />} />
          <Route path="/signup" element={<Signup onSignup = {(userinfo) => handleSignup(userinfo)} />} />
          <Route path="/linked" element={<Modal username={currentUsername} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

