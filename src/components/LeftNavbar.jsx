import React from 'react'
import { Router, Route, Link } from 'react-router-dom';
import Leaderboard from '../pages/Leaderboard';
import Profile from '../pages/Profile';
import '../styles/LeftNavbar.css';


export default function LeftNavbar() {
  return (
    <div className="LeftNavbar">
      <h1> <a href="/leaderboard">Leetboard</a></h1>
      <div className="links">
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/profile">Your Profile</Link>
      </div>
    </div>
  )
}
