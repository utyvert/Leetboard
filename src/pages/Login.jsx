import React from 'react'
import '../styles/Login.css'

export default function Login() {
  return (
    <div className="Login">
    <h1>Welcome</h1>
    <div className="lc-username">
      <label for="username">Leetcode Username</label><br></br>
      <input placeholder='Enter your Leetcode username' type="text" id="username" name="username"></input>
    </div>
    <div className="password">
      <label for="password">Password</label><br></br>
      <input placeholder='Enter your Leetboard password' type="password" id="password" name="password"></input>
    </div>
    <div className="signin-button">
      <button>Sign In</button>
    </div>
  </div>
  )
}
