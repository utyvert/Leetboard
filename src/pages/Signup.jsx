import React from 'react'
import '../styles/Signup.css'

export default function Signup() {
  return (
    <div className="Signup">
      <h1>Welcome</h1>
      <div className="fnln">
        <div className="firstname">
          <label for="fname">First name</label><br></br>
          <input placeholder='Enter your first name' type="text" id="fname" name="fname"></input>
        </div>
        <div className="lastname">
          <label for="lname">Last name</label><br></br>
          <input placeholder='Enter your last name' type="text" id="lname" name="lname"></input>
        </div>
      </div>
      <div className="lc-username">
        <label for="username">Leetcode Username</label><br></br>
        <input placeholder='Enter your Leetcode username' type="text" id="username" name="username"></input>
      </div>
      <div className="password">
        <label for="password">Password</label><br></br>
        <input placeholder='Enter your password' type="password" id="password" name="password"></input>
      </div>
      <div className="signup-button">
        <button>Sign Up</button>
      </div>
      <h3>Login Link Here</h3>
    </div>
  )
}
