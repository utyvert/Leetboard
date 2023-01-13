import React from 'react'
import { Router, Route, Link } from 'react-router-dom';
import Leaderboard from '../pages/Leaderboard';
import Profile from '../pages/Profile';
import '../styles/LeftNavbar.css';


export default function LeftNavbar(props) {

  const { currentUsername } = props;

  return (
    <div className="LeftNavbar">
      <h1> <a href="/leaderboard">Leetboard</a></h1>
      <div className="links">
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to={`/user/${currentUsername}`}>Your Profile</Link>
        <Link to="/signup">Link your account</Link>
      </div>
    </div>
  )
}
