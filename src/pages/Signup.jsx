import React, {useState, useRef} from 'react'
import { Routes, Route, useNavigate, Link } from 'react-router-dom'
import App from '../App'
import Modal from '../components/Modal'
import '../styles/Signup.css'

export default function Signup(props) {

  const { onSignup, handleSignIn } = props;
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();


  const [username , setUsername] = useState('');
  const fnameRef = useRef(null);
  const lnameRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const submitButton = useRef(null);

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  // function handleConfirm () {
  //   setModalOpen(false);
  //   navigate(`/user/${username}`);
  // };

  function onClickLink() {;


    // setModalOpen(true);
    // fetch request to backend
    submitButton.current.classList.add("expanded");
    
    
    fetch ('http://localhost:3001/create', {
      method: 'POST',
      body: JSON.stringify({
        firstname: fnameRef.current.value,
        lastname: lnameRef.current.value,
        username: usernameRef.current.value,
        password: passwordRef.current.value
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    onSignup({
      firstname: fnameRef.current.value,
      lastname: lnameRef.current.value,
      username: usernameRef.current.value,
      password: passwordRef.current.value
    })


    // navigate(`/user/${username}`);
  }
  
  
  return (
    <div className='Home'>
    <div className="Signup">
      <h1>Welcome</h1>
      <div className="fnln">
        <div className="firstname">
          <label for="fname">First name</label><br></br>
          <input ref={fnameRef} placeholder='Enter your first name' type="text" id="fname" name="fname"></input>
        </div>
        <div className="lastname">
          <label for="lname">Last name</label><br></br>
          <input ref={lnameRef} placeholder='Enter your last name' type="text" id="lname" name="lname"></input>
        </div>
      </div>
      <div className="lc-username">
        <label for="username">Leetcode Username</label><br></br>
        <input onChange={handleUsernameChange} ref={usernameRef} placeholder='Enter your Leetcode username' type="text" id="username" name="username"></input>
      </div>
      <div className="password">
        <label for="password">Unique Code</label><br></br>
        <input ref={passwordRef} placeholder='Enter your unique code' type="password" id="password" name="password"></input>
      </div>
      <div className="signup-button">
        <Link to = {`/linked`} ><button ref={submitButton} onClick={onClickLink}>Link</button></Link>
      </div>

      {/* <div className="alreadylinked-button">
      <Link to = '/leaderboard' ><button onClick={handleSignIn}>Already linked</button></Link>
      </div> */}
      
  </div>
  </div>
  )
}

// LEAD ONCLICK TO APP.JSX
// FIX STYLING
// ADD 'ALREADY LINKED' BUTTON LEADING TO APP.JSX